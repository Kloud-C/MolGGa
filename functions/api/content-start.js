import { CONTENT_START_IDS } from "../_shared/content-start-config.js";

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
});
const MAX_BODY_BYTES = 256;

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return json({ error: "origin_not_allowed" }, 403);
  if (!env.MOLGGA_DB) return json({ error: "counts_not_configured" }, 503);

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) return json({ error: "request_too_large" }, 413);

  let data;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ error: "invalid_json" }, 400);
    const chunks = [];
    let byteLength = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      byteLength += value.byteLength;
      if (byteLength > MAX_BODY_BYTES) {
        await reader.cancel();
        return json({ error: "request_too_large" }, 413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(byteLength);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    data = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const contentId = data?.contentId;
  if (typeof contentId !== "string" || !CONTENT_START_IDS.includes(contentId)) {
    return json({ error: "unknown_content" }, 400);
  }

  try {
    await env.MOLGGA_DB.prepare(
      "INSERT INTO content_start_counts (content_id, starts) VALUES (?, 1) ON CONFLICT(content_id) DO UPDATE SET starts = starts + 1"
    ).bind(contentId).run();
    return json({ accepted: true });
  } catch {
    return json({ error: "counts_unavailable" }, 503);
  }
}
