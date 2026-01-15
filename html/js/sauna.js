document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".saunaArea .sc");
  const footerTop = document.querySelector("footer").offsetTop;
  const winH = window.innerHeight;

  // --- テキストのフェードイン ---
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const st = entry.target.closest(".sc").querySelector(".st");
      if (entry.isIntersecting) {
        st.classList.add("visible");
      }
    });
  }, {
    threshold: 0.4  // sImg の40%が見えたら発火（かなり自然）
  });

  sections.forEach(sec => {
    textObserver.observe(sec.querySelector(".sImg"));
  });

  // --- 背景固定パララックス ---
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    sections.forEach((sec, i) => {
      const img = sec.querySelector(".sImg img");
      const secTop = sec.offsetTop;
      const secBottom = secTop + sec.offsetHeight;

      // footer前では背景固定しない
      if (scrollY + winH > footerTop) {
        img.style.position = "absolute";
        return;
      }

      // セクション内にいるときだけ固定
      if (scrollY >= secTop && scrollY < secBottom) {
        img.style.position = "fixed";
        img.style.top = "0";
      } else {
        img.style.position = "absolute";
        img.style.top = "0";
      }

      // --- なめらかに切り替わるように透明度補正 ---
      const nextSec = sections[i + 1];
      if (nextSec) {
        const nextTop = nextSec.offsetTop;

        // 次の画像が少し見え始めたら現在画像を薄く
        if (scrollY > nextTop - winH * 0.3) {
          img.style.opacity = 0.6;
        } else {
          img.style.opacity = 1;
        }
      }
    });
  });
});
