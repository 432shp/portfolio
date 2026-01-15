document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".iText");

  // IntersectionObserver（フェードイン用）
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        // 1回表示したら監視解除（既存コードに影響なし）
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  // 順番に遅延をつける + 監視開始
  targets.forEach((target, index) => {
    target.style.transitionDelay = `${index * 0.3}s`; // 0.3秒ずつ遅らせる
    observer.observe(target);
  });
});
