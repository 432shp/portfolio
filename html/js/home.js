// スライドショーのロジック
        window.onload = function() {
            const slides = document.querySelectorAll('.slide-image');
            let currentSlide = 0;
            const slideInterval = 5000; // 5秒ごとに切り替え

            /**
             * 現在のスライドの非表示と次のスライドの表示を制御する
             */
            function nextSlide() {
                // 現在のスライドを非表示にする
                slides[currentSlide].classList.remove('active');
                
                // 次のスライドのインデックスを計算
                currentSlide = (currentSlide + 1) % slides.length;
                
                // 次のスライドを表示する
                slides[currentSlide].classList.add('active');
            }

            // 初回実行後、指定した間隔で nextSlide 関数を呼び出す
            setInterval(nextSlide, slideInterval);
        };