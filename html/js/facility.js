// facility.js - スクロール→フェードイン & カルーセル

document.addEventListener('DOMContentLoaded', function() {

    /*--------------------------------
        スクロールフェードイン
    --------------------------------*/
    const facilityItems = document.querySelectorAll('.fc');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    facilityItems.forEach(item => observer.observe(item));



    /*--------------------------------
        カルーセル（枚数自動対応）
    --------------------------------*/
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.slide');
        const total = slides.length;

        if (total === 0) return;

        // 1周のアニメ時間（CSS と揃える）
        const duration = 18; // 秒

        slides.forEach((slide, index) => {
            // ずらす時間を自動計算
            const delay = (duration / total) * index;
            slide.style.animationDelay = `${delay}s`;
        });
    });

});


document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll(".fImg.carousel");

    carousels.forEach((carousel) => {
        const slides = carousel.querySelectorAll(".slide");
        if (slides.length <= 1) return; // 1枚なら何もしない

        let current = 0;

        // 最初のスライドをアクティブに
        slides[current].classList.add("slide-active");

        setInterval(() => {
            // 現在のスライドを非表示
            slides[current].classList.remove("slide-active");

            // 次のスライド番号
            current = (current + 1) % slides.length;

            // 次のスライドを表示
            slides[current].classList.add("slide-active");

        }, 4000); // 切り替え間隔（6秒）
    });
});
