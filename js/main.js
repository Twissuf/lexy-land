const page = document.body.dataset.page;
if (page === "index") loadHomePage();
if (page === "video") loadVideoPage();
if (page === "quiz") startQuiz();
if (page === "quiz2") startAudioQuiz();


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

// ========== QUIZ FUNCTION ==========
function startQuiz() {
    const params = new URLSearchParams(location.search);
    let letter = params.get('letter') || 'a';
    letter = letter.toLowerCase();

    const quizData = {
        a: { img: "Ayam.png", answer: "Ayam", options: ["Ayam", "Maya", "Yam", "Sayam"] },
        b: { img: "Bebek.png", answer: "Bebek", options: ["Bebek", "Bola", "Boleh", "Beli"] },
        c: { img: "Cikak.png", answer: "Cicak", options: ["Cicak", "Cucu", "Coklat", "Cita"] },
        d: { img: "Dadu.png", answer: "Dadu", options: ["Dada", "Dudu", "Dadu", "Doni"] },
        e: { img: "Elang.png", answer: "Elang", options: ["Elang", "Endang", "Ekor", "Emas"] },
        f: { img: "Film.png", answer: "Film", options: ["Film", "Firkoh", "Fitroh", "Foli"] },
        g: { img: "Gajah.png", answer: "Gajah", options: ["Gajah", "Galak", "Gor", "Gofur"] },
        h: { img: "Hiu.png", answer: "Hiu", options: ["Hiu", "Hati", "Hilman", "Hitam"] },
        i: { img: "Ikan.png", answer: "Ikan", options: ["Ikan", "Ilham", "Ilang", "Itik"] },
        j: { img: "Jagung.png", answer: "Jagung", options: ["Jagung", "Jerman", "Jakun", "Jarang"] },
        k: { img: "Kakek.png", answer: "Kakek", options: ["Kakek", "Kaku", "Kaki", "Kuku"] },
        l: { img: "Lampu.png", answer: "Lampu", options: ["Lampu", "Lampau", "Lumpia", "Lampung"] },
        m: { img: "Membaca.png", answer: "Membaca", options: ["Membaca", "Memakan", "Mandi", "Merangkak"] },
        n: { img: "Nyamuk.png", answer: "Nyamuk", options: ["Nyamuk", "Nyanyi", "Nitip", "Ngantuk"] },
        o: { img: "Ombak.png", answer: "Ombak", options: ["Ombak", "Oppa", "Otot", "Onta"] },
        p: { img: "Panda.png", answer: "Panda", options: ["Panda", "Pantai", "Parmo", "Pasir"] },
        q: { img: "Queen.jpg", answer: "Queen", options: ["Queen", "King", "Jester", "Queue"] },
        r: { img: "Rumah.jpg", answer: "Rumah", options: ["Rumah", "Retno", "Rawan", "Ramah"] },
        s: { img: "Sepatu.jpg", answer: "Sepatu", options: ["Sepatu", "Sakti", "Sapi", "Sri"] },
        t: { img: "Tengkorak.jpg", answer: "Tengkorak", options: ["Tengkorak", "Tangkisan", "Tongkol", "Taring"] },
        u: { img: "Uang.jpg", answer: "Uang", options: ["Uang", "Utang", "Ulfah", "Ustad"] },
        v: { img: "Ventilasi.jpg", answer: "Ventilasi", options: ["Ventilasi", "Vivi", "Vaksin", "Veteran"] },
        w: { img: "Wastafel.png", answer: "Wastafel", options: ["Wastafel", "Wakil", "Willy", "Watak"] },
        x: { img: "X-ray.png", answer: "Xray", options: ["Xray", "Xiomi", "Xylophone", "Xerox"] },
        y: { img: "Yoyo.png", answer: "Yoyo", options: ["Yoyo", "Yulianto", "Yang", "Yin"] },
        z: { img: "Zebra.jpg", answer: "Zebra", options: ["Zebra", "Zikir", "Zaky", "Zedaa"] },
    };

    const data = quizData[letter] || quizData['a'];
    const imgEl = document.getElementById('quizImage');
    const optionsEl = document.getElementById('quizOptions');

    // set gambar
    imgEl.src = `assets/images/${data.img}`;

    // acak urutan opsi
    const shuffled = data.options.sort(() => Math.random() - 0.5);
    const feedback = document.getElementById("feedback");
    const nextQuizBtn = document.getElementById("nextQuizBtn");

    optionsEl.innerHTML = "";
    shuffled.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quiz-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
            if (opt === data.answer) {
                btn.classList.add('correct');
                feedback.textContent = `🎉 Betul! Itu benar!`;
                feedback.style.color = "#4CAF50";
                nextQuizBtn.style.display = "inline-block"
            } else {
                btn.classList.add('wrong');
                feedback.textContent = `😅 Salah, coba lagi ya!`;
                feedback.style.color = "#E53935";
            }
        });
        optionsEl.appendChild(btn);
    });
}

// ========== QUIZ 2: DENGAR SUARA ==========
function startAudioQuiz() {
    const params = new URLSearchParams(location.search);
    let letter = params.get('letter') || 'a';
    letter = letter.toLowerCase();

    // daftar soal: tiap huruf punya 1 suara & 4 pilihan
    const quizData = {
        a: {
            sound: "assets/sounds/Ayam.mp3",
            correct: "ayam",
            options: ["ayam", "maya", "yama", "amya"]
        },
        b: {
            sound: "assets/sounds/Bebek.mp3",
            correct: "bebek",
            options: ["bebek", "boba", "bibi", "boke"]
        },
        c: {
            sound: "assets/sounds/Cicak.mp3",
            correct: "cicak",
            options: ["cicak", "cici", "coklat", "cak"]
        }
        // dst bisa ditambah
    };

    const quiz = quizData[letter] || quizData.a;
    const playSoundBtn = document.getElementById("playSoundBtn");
    const choicesContainer = document.getElementById("choices");
    const feedback = document.getElementById("feedback");

    // TOMBOL PUTAR SUARA
    const audio = new Audio(quiz.sound);
    playSoundBtn.addEventListener("click", () => {
        audio.play();
        playSoundBtn.style.transform = "scale(1.05)"
        playSoundBtn.style.background = "#FFCA28"
        feedback.textContent = "🎧 Dengarkan baik-baik...";
        feedback.style.color = "#555";
    });

    // TAMPIL PILIHAN
    choicesContainer.innerHTML = "";
    quiz.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "btn option";
        btn.textContent = option;
        btn.addEventListener("click", () => {
            if (option === quiz.correct) {
                feedback.textContent = `🎉 Betul! Itu kata "${quiz.correct.toUpperCase()}"!`;
                feedback.style.color = "#4CAF50";
                btn.style.background = "#81C784";
            } else {
                feedback.textContent = `😅 Salah, coba lagi ya!`;
                feedback.style.color = "#E53935";
                btn.style.background = "#FFCDD2";
            }
        });
        choicesContainer.appendChild(btn);
    });
}

// ========== HALAMAN VIDEO ==========
function loadVideoPage() {
    const params = new URLSearchParams(location.search);
    let letter = params.get('letter') || 'a';
    letter = letter.toLowerCase();

    const letterDisplay = document.getElementById('letterDisplay');
    const videoPlayer = document.getElementById('videoPlayer');
    const quizBtn = document.getElementById('quizBtn');

    // tampilkan huruf besar
    letterDisplay.textContent = letter.toUpperCase();

    videoPlayer.src = "assets/videos/"+letter+".mov";
    
    // tombol kuis (ke halaman quiz.html)
    quizBtn.addEventListener("click", () => {
        // pindah ke halaman quiz pertama (pilihan gambar)
        window.location.href = `quiz.html?letter=${letter}`;
    });
}

// Tombol untuk pindah ke quiz2.html
const nextQuizBtn = document.getElementById('nextQuizBtn');

if (nextQuizBtn) {
    const params = new URLSearchParams(location.search);
    const letter = params.get('letter') || 'a';

    nextQuizBtn.addEventListener("click", () => {
        window.location.href = `quiz2.html?letter=${letter}`;
    });
}

function startFillQuiz() {
    const params = new URLSearchParams(location.search);
    const letter = params.get("letter") || "a";

    // daftar soal berdasarkan huruf
    // kalimat asli → template → jawaban benar
    const fillData = {
        a: {
            sound: "assets/sounds/a.mp3",
            template: "__ __ __ makan __ __ __",
            answers: ["aku", "ayam"]
        },
        b: {
            sound: "assets/sounds/b.mp3",
            template: "__ e __ __ k <br> __ a l __",
            answers: ["bebek", "lala"]
        },
        c: {
            sound: "assets/sounds/c.mp3",
            template: "__ a __ i __ __ <br> t __ n a __",
            answers: ["cia", "cicak"]
        },
        d: {
            sound: "assets/sounds/d.mp3",
            template: "__ __ __ __ main __ __ __ __",
            answers: ["dinda", "dadu"]
        },
        e: {
            sound: "assets/sounds/e.mp3",
            template: "__ __ __ makan __ __ krim",
            answers: ["eka", "es"]
        },
        f: {
            sound: "assets/sounds/f.mp3",
            template: "__ __ __ __ __ petik __ __ __ __ __",
            answers: ["fajar", "bunga"]
        },
        g: {
            sound: "assets/sounds/g.mp3",
            template: "__ __ __ __ gajah __ __ __ __ __",
            answers: ["gigi", "besar"]
        },
        h: {
            sound: "assets/sounds/h.mp3",
            template: "__ __ __ __ hitung __ __ __ __",
            answers: ["hana", "uang"]
        },
        i: {
            sound: "assets/sounds/i.mp3",
            template: "__ __ __  __ __ berenang di __ __ __ __",
            answers: ["ikan", "laut"]
        },
        j: {
            sound: "assets/sounds/j.mp3",
            template: "__ __ __ __ __ __ direbus  __ __ __",
            answers: ["jagung", "ibu"]
        },
        k: {
            sound: "assets/sounds/k.mp3",
            template: "__ __ __ __ __ membaca __ __ __ __ __",
            answers: ["kakek", "koran"]
        },
        l: {
            sound: "assets/sounds/l.mp3",
            template: "__ __ __ __ __ dinyalakan __ __ __ __ __",
            answers: ["lampu", "ayah"]
        },
        m: {
            sound: "assets/sounds/m.mp3",
            template: "kami __ __ __ __ bersama __ __ __ __ __ __ __ __",
            answers: ["makan", "keluarga"]
        },
        n: {
            sound: "assets/sounds/n.mp3",
            template: "seorang __ __ __ __ __ __ __ menangkap __ __ __ __ di laut",
            answers: ["nelayan", "ikan"]
        },
        o: {
            sound: "assets/sounds/o.mp3",
            template: "__ __ __ __ __ itu sangat __ __ __ __ hati",
            answers: ["orang", "baik"]
        },
        p: {
            sound: "assets/sounds/p.mp3",
            template: "para __ __ __ __ __ __ itu sedang menanam __ __ __ __",
            answers: ["petani", "padi"]
        },
        q: {
            sound: "assets/sounds/q.mp3",
            template: "Data Tidak Ada",
            answers: ["q", "q"]
        },
        r: {
            sound: "assets/sounds/r.mp3",
            template: "__ __ __ __ __ itu __ __ __ __ __ __",
            answers: ["rumah", "runtuh"]
        },
        s: {
            sound: "assets/sounds/s.mp3",
            template: "__ __ __ __ sapi __ __ __ __",
            answers: ["susu", "enak"]
        },
        t: {
            sound: "assets/sounds/t.mp3",
            template: "__ __ __ __ tidak __ __ __ __",
            answers: ["toti", "tahu"]
        },
        u: {
            sound: "assets/sounds/u.mp3",
            template: "__ __ __ __ __ __ dan __ __ __ __ __ __",
            answers: ["untung", "hutang"]
        },
        v: {
            sound: "assets/sounds/v.mp3",
            template: "__ __ __ __ sedang  __ __ __ __ __ __ __",
            answers: ["vina", "memasak"]
        },
        w: {
            sound: "assets/sounds/w.mp3",
            template: "__ __ __ __ __ sedang __ __ __ __ __",
            answers: ["wawan", "mandi"]
        },
        x: {
            sound: "assets/sounds/x.mp3",
            template: "huruf __ itu __ __ __ __ __",
            answers: ["x", "keren"]
        },
        y: {
            sound: "assets/sounds/y.mp3",
            template: "__ __ __ __ __ belajar __ __ __ __ __",
            answers: ["yusuf", "matematika"]
        },
        z: {
            sound: "assets/sounds/z.mp3",
            template: "__ __ __ __ menaiki __ __ __ __ __",
            answers: ["zaki", "zebra"]
        }
    };

    const quiz = fillData[letter] || fillData.a;

    // elemen
    const playSoundBtn = document.getElementById("playSoundBtn");
    const sentenceTemplate = document.getElementById("sentenceTemplate");
    const inputsDiv = document.getElementById("inputs");
    const checkBtn = document.getElementById("checkBtn");
    const feedback = document.getElementById("feedback");

    // tampil template
    sentenceTemplate.innerHTML = quiz.template;

    // buat input sesuai jumlah jawaban
    inputsDiv.innerHTML = "";
    quiz.answers.forEach((ans, i) => {
        const inp = document.createElement("input");
        inp.type = "text";
        inp.placeholder = `Isi kata ${i + 1}`;
        inp.className = "fill-input";
        inp.dataset.index = i;
        inputsDiv.appendChild(inp);
    });

    // tombol play suara
    const audio = new Audio(quiz.sound);
    playSoundBtn.onclick = () => {
        audio.play();
        feedback.textContent = "";
    };

    // tombol cek
    checkBtn.onclick = () => {
        const inputs = document.querySelectorAll(".fill-input");
        let correct = true;

        inputs.forEach(inp => {
            const i = inp.dataset.index;
            const correctWord = quiz.answers[i].toLowerCase().trim();
            const userWord = inp.value.toLowerCase().trim();

            if (correctWord !== userWord) {
                correct = false;
                inp.style.background = "#FFCDD2"; // merah
            } else {
                inp.style.background = "#C8E6C9"; // hijau
            }
        });

        if (correct) {
            feedback.textContent = "🎉 Hebat! Semua jawaban benar!";
            feedback.style.color = "#2E7D32";
        } else {
            feedback.textContent = "😅 Ada yang salah, coba lagi ya!";
            feedback.style.color = "#C62828";
        }
    };
}

