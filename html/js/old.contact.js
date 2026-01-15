document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const modalOverlay = document.getElementById('errorModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    const requiredFields = [
        { id: 'name', label: '氏名' },
        { id: 'email', label: 'メールアドレス' },
        { id: 'topic', label: 'お問い合わせ内容' },
        { id: 'message', label: 'メッセージ（ご質問・ご要望の詳細）' },
        { id: 'privacy', label: 'プライバシーポリシーへの同意' }
    ];

    const showModal = (title, message) => {
        modalTitle.textContent = title;
        modalMessage.innerHTML = message;
        modalOverlay.classList.add('active');
    };

    window.closeModal = () => {
        modalOverlay.classList.remove('active');
    };

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;
        let missingField = '';

        for (const field of requiredFields) {
            const element = document.getElementById(field.id);
            let isFilled = false;

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
            showModal(
                '入力エラー',
                `恐れ入ります、<strong>「${missingField}」</strong>が未入力または未選択です。<br>すべての必須項目をご記入ください。`
            );
        } else {
            showModal(
                'お問い合わせありがとうございます',
                'ご入力いただいた内容で送信を受け付けました。<br>後日、担当者よりご連絡させていただきます。'
            );
        }
    });

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
