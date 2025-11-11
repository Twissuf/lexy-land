// main.js
function createAlphabetButtons(containerId, useQuery = true) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const A = 'A'.charCodeAt(0);
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(A + i);
        const btn = document.createElement('button');
        btn.className = 'kid-btn';
        btn.innerHTML = `<div>${letter}</div><span class="small">Huruf ${letter}</span>`;
        // navigation: open video.html?letter=a
        btn.addEventListener('click', () => {
            if (useQuery) {
                location.href = `video.html?letter=${letter.toLowerCase()}`;
            } else {
                // alternative: localStorage or sessionStorage
                sessionStorage.setItem('selectedLetter', letter.toLowerCase());
                location.href = 'video.html';
            }
        });
        container.appendChild(btn);
    }
}

// mapping default file path pattern: assets/videos/<letter>.mp4
function loadVideoFromQuery(videoElementId, letterElementId) {
    const params = new URLSearchParams(location.search);
    let letter = params.get('letter');
    if (!letter) {
        // fallback to sessionStorage if used
        letter = sessionStorage.getItem('selectedLetter') || 'a';
    }
    letter = (letter + '').toLowerCase();
    // sanitize: only a-z
    if (!/^[a-z]$/.test(letter)) letter = 'a';
    const videoEl = document.getElementById(videoElementId);
    const letterEl = document.getElementById(letterElementId);
    // set big letter
    if (letterEl) letterEl.textContent = letter.toUpperCase();
    // set video src (adjust path/naming jika berbeda)
    const src = `assets/videos/${letter}.mp4`;
    // fallback: if video absent, you can show a placeholder video or image
    videoEl.src = src;
    videoEl.load();
    // play automatically on mobile may be restricted; leave controls on
}
