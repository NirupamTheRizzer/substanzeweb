const emails = [];

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newsletter-form');
    const input = document.querySelector('.newsletter-input');

    input.addEventListener('input', () => {
        if (input.validity.valid) {
            input.style.borderColor = '#38bdf8';
        } else {
            input.style.borderColor = '#f87171';
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.validity.valid) {
            // Send to Google Apps Script
            fetch('https://script.google.com/macros/s/AKfycbxcvFHH9m11nzgkMJ5PBecUOK9xqmV2OO591OMwYC60705QKGB8NTtSg2yuy-K34KSiSg/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `email=${encodeURIComponent(input.value)}`
            });
            showCustomPopup('Thank you for subscribing to Substanze!<br>Stay tuned for updates.');
            input.value = '';
            input.style.borderColor = '#38bdf8';
        } else {
            input.style.borderColor = '#f87171';
            input.focus();
        }
    });
});

function showCustomPopup(message) {
    // Remove existing popup if present
    const existing = document.getElementById('custom-popup');
    if (existing) existing.remove();

    const popup = document.createElement('div');
    popup.id = 'custom-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <span class="popup-title">🎉 Thank You!</span>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add('show');
    }, 10);

    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 400);
    }, 2500);
}