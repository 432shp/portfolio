document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------------------
    // 1. アニメーション（IntersectionObserver）のセットアップ
    // ----------------------------------------------------------------
    const contentsList = document.querySelectorAll(".contents");

    const options = {
        threshold: 0.005 // 0.5% 見えたら発火
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio >= 0.005) { 
                entry.target.classList.add("show");
            }
        });
    }, options);

    contentsList.forEach(content => observer.observe(content));

    // ----------------------------------------------------------------
    // 2. フォーム処理（バリデーションと送信）のセットアップ
    // ----------------------------------------------------------------
    const form = document.getElementById('contactForm');
    
    // モーダル関連の要素を定義 (エラー表示用)
    const modalOverlay = document.getElementById('errorModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    // 必須項目リスト
    const requiredFields = [
        { id: 'name', label: '氏名' },
        { id: 'email', label: 'メールアドレス' },
        { id: 'topic', label: 'お問い合わせ内容' },
        { id: 'message', label: 'メッセージ（ご質問・ご要望の詳細）' },
        { id: 'privacy', label: 'プライバシーポリシーへの同意' }
    ];

    // モーダル表示関数
    const showModal = (title, message) => {
        if (modalOverlay && modalTitle && modalMessage) {
            modalTitle.textContent = title;
            modalMessage.innerHTML = message;
            modalOverlay.classList.add('active');
        } else {
            // モーダル要素がない場合の代替表示
            alert(`【${title}】\n${message.replace(/<br>/g, '\n').replace(/<\/?strong>/g, '')}`);
        }
    };

    // モーダルを閉じる関数
    window.closeModal = () => {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    };

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // ★重要: まずHTMLのデフォルト送信をブロック

        let isValid = true;
        let missingField = '';

        // 二重送信防止チェック
        if (form.getAttribute('data-submitting') === 'true') {
            return;
        }

        // バリデーション処理
        for (const field of requiredFields) {
            const element = document.getElementById(field.id);
            let isFilled = false;

            if (!element) continue; 

            if (element.type === 'checkbox') {
                isFilled = element.checked;
            } else if (element.tagName === 'SELECT') {
                isFilled = element.value !== "";
            } else {
                isFilled = element.value.trim() !== "";
            }

            if (!isFilled) {
                isValid = false;
                missingField = field.label;
                element.focus();
                break;
            }
        }

        if (!isValid) {
            // バリデーション失敗: エラーモーダルを表示
            showModal(
                '入力エラー',
                `恐れ入ります、<strong>「${missingField}」</strong>が未入力または未選択です。<br>すべての必須項目をご記入ください。`
            );
        } else {
            // バリデーション成功:
            // サーバーにデータが送信され、ページ遷移するようにJavaScriptで強制的にフォームを送信
            
            form.setAttribute('data-submitting', 'true'); // 二重送信防止フラグを設定
            form.submit(); // ★ページ遷移を発生させる処理
        }
    });

    // ----------------------------------------------------------------
    // 3. アコーディオンのセットアップ
    // ----------------------------------------------------------------
    const setupAccordion = () => {
        const questions = document.querySelectorAll('.accordion-question');

        questions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isExpanded = question.getAttribute('aria-expanded') === 'true';

                if (!isExpanded) {
                    question.setAttribute('aria-expanded', 'true');
                    answer.classList.add('open');
                } else {
                    question.setAttribute('aria-expanded', 'false');
                    answer.classList.remove('open');
                }
            });
        });
    };

    setupAccordion();
});