/* fade-in
---------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  const fadeTargets = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.3
  });

  fadeTargets.forEach(target => observer.observe(target));
});

/* preloader
---------------------------------------------------*/
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const preloaderText = document.getElementById("preloader-text");

 // 初回訪問チェック
  if (sessionStorage.getItem("loadedBefore")) {
    // 2回目以降は非表示
    if (preloader) preloader.style.display = "none";
    return;
  }

  // 初回訪問の場合
  sessionStorage.setItem("loadedBefore", "true"); // 記録

  let loaded = 0;

  const increment = () => {
    if (loaded < 100) {
      loaded += 3 + Math.random(); // 1〜2%ずつ増加
      if (loaded > 100) loaded = 100;
      preloaderText.textContent = `${Math.floor(loaded)}%`;

      // 次の更新まで 80ms 空ける → ゆっくり感
      setTimeout(increment, 70);
    } else {
      // 完了したらフェードアウト
      preloader.style.opacity = 0;
      setTimeout(() => {
        preloader.style.display = "none";
      }, 1000);
    }
  };

  increment();
});
