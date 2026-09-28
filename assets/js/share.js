(() => {
  const translate = (text) => window.MOA_I18N?.t(text) || text;
  const dialog = document.createElement("dialog");
  dialog.className = "share-dialog";
  dialog.setAttribute("aria-labelledby", "share-dialog-title");
  dialog.innerHTML = `
    <div class="share-dialog__content">
      <button class="share-dialog__close" type="button" data-share-close aria-label="닫기">×</button>
      <span class="eyebrow-text">MOLGGA · SHARE</span>
      <h2 id="share-dialog-title">결과 공유</h2>
      <p>공유 문구를 확인한 뒤 원하는 방법을 선택하세요.</p>
      <label class="share-dialog__label" for="share-message">공유 문구</label>
      <textarea id="share-message" class="share-dialog__message" readonly rows="5"></textarea>
      <div class="share-dialog__actions">
        <button class="button button-quiet" type="button" data-share-copy>공유 문구 복사</button>
        <button class="button share-dialog__kakao" type="button" data-share-kakao>카카오톡 공유</button>
      </div>
      <p class="share-dialog__status" role="status" aria-live="polite"></p>
    </div>`;
  document.body.append(dialog);

  let current = { title: "molgga", description: "", text: "", url: "https://molgga.com/ko/", imageUrl: "https://molgga.com/image/og/molgga-og.jpg", buttonTitle: "결과 확인하기" };
  const publicUrl = (value) => {
    try {
      const resolved = new URL(value || "https://molgga.com/image/og/molgga-og.jpg", window.location.href);
      return resolved.origin === window.location.origin ? `${resolved.origin}${resolved.pathname}` : resolved.href;
    } catch {
      return "https://molgga.com/image/og/molgga-og.jpg";
    }
  };
  const message = dialog.querySelector(".share-dialog__message");
  const status = dialog.querySelector(".share-dialog__status");
  const closeButton = dialog.querySelector("[data-share-close]");

  const copy = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      const temporary = document.createElement("textarea");
      temporary.value = value;
      temporary.setAttribute("readonly", "");
      temporary.style.position = "fixed";
      temporary.style.opacity = "0";
      document.body.append(temporary);
      temporary.select();
      const copied = document.execCommand("copy");
      temporary.remove();
      return copied;
    }
  };

  window.MOLGGA_SHARE = {
    open(payload) {
      current = { ...current, ...payload };
      message.value = current.text;
      status.textContent = "";
      if (!dialog.open) dialog.showModal();
      closeButton.focus();
    }
  };

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.querySelector("[data-share-copy]").addEventListener("click", async () => {
    status.textContent = await copy(current.text) ? translate("공유 문구를 복사했어요.") : translate("복사할 수 없어요.");
  });
  dialog.querySelector("[data-share-kakao]").addEventListener("click", () => {
    const key = window.MOLGGA_KAKAO_JAVASCRIPT_KEY?.trim();
    if (!key) {
      status.textContent = translate("카카오 JavaScript 키를 설정한 뒤 사용할 수 있어요.");
      return;
    }
    if (!window.Kakao || typeof window.Kakao.init !== "function") {
      status.textContent = translate("카카오톡 공유를 준비하지 못했어요. 설정을 확인해 주세요.");
      return;
    }
    try {
      if (!window.Kakao.isInitialized()) window.Kakao.init(key);
      const kakaoShare = window.Kakao.Share;
      if (!kakaoShare || typeof kakaoShare.sendDefault !== "function") {
        throw new Error("Kakao Share module is unavailable after SDK initialization.");
      }
      kakaoShare.sendDefault({
        objectType: "feed",
        content: {
          title: current.title,
          description: current.description || current.text,
          imageUrl: publicUrl(current.imageUrl),
          link: { mobileWebUrl: current.url, webUrl: current.url }
        },
        buttons: [{ title: translate(current.buttonTitle || "결과 확인하기"), link: { mobileWebUrl: current.url, webUrl: current.url } }]
      });
    } catch (error) {
      console.error("Kakao share failed", error);
      status.textContent = translate("카카오톡 공유를 준비하지 못했어요. 설정을 확인해 주세요.");
    }
  });
})();
