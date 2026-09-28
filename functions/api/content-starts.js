const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": status === 200 ? "public, max-age=60, stale-while-revalidate=300" : "no-store"
  }
});

export async function onRequestGet({ env }) {
  if (!env.MOLGGA_DB) return json({ error: "ranking_not_configured" }, 503);

  try {
    const result = await env.MOLGGA_DB.prepare(
      "SELECT content_id AS contentId, starts FROM content_start_counts ORDER BY starts DESC, content_id ASC"
    ).all();
    const counts = (result.results || []).map(({ contentId, starts }) => ({
      contentId,
      starts: Number(starts)
    })).filter(({ contentId, starts }) => typeof contentId === "string" && Number.isSafeInteger(starts) && starts >= 0);
    return json({ counts });
  } catch {
    return json({ error: "counts_unavailable" }, 503);
  }
}
