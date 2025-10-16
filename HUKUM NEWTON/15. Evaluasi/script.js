document.addEventListener("DOMContentLoaded", function() {

    // --- 1. DATA KUIS ---
    const quizData = [
        // (Materi: Gerak)
        {
            question: "Sebuah mobil bergerak ke Utara 8 meter, lalu ke Timur 6 meter. Berapakah Jarak dan Perpindahan mobil tersebut?",
            options: ["Jarak 14m, Perpindahan 10m", "Jarak 10m, Perpindahan 14m", "Jarak 14m, Perpindahan 14m", "Jarak 10m, Perpindahan 10m"],
            correct: 0,
            explanation: `
                <p><strong>Jarak:</strong> Adalah total lintasan yang ditempuh. Jarak = 8m + 6m = 14m.</p>
                <p><strong>Perpindahan:</strong> Jarak lurus dari awal ke akhir. Gunakan Pythagoras:</p>
                <div class="rumus-final">Perpindahan² = 8² + 6²<br>Perpindahan² = 64 + 36 = 100<br>Perpindahan = $\sqrt{100}$ = 10m</div>
            `
        },
        {
            question: "Budi berlari mengelilingi lapangan 1 putaran penuh (400m) dalam 100 detik. Berapa Kelajuan dan Kecepatan rata-rata Budi?",
            options: ["Kelajuan 4 m/s, Kecepatan 4 m/s", "Kelajuan 0 m/s, Kecepatan 4 m/s", "Kelajuan 4 m/s, Kecepatan 0 m/s", "Kelajuan 0 m/s, Kecepatan 0 m/s"],
            correct: 2,
            explanation: `
                <p><strong>Kelajuan:</strong> Total jarak / waktu.<br>Kelajuan = 400m / 100s = 4 m/s.</p>
                <p><strong>Kecepatan:</strong> Total perpindahan / waktu.<br>Karena Budi kembali ke titik awal, perpindahannya adalah 0 meter.</p>
                <div class="rumus-final">Kecepatan = 0m / 100s = 0 m/s</div>
            `
        },
        // (Materi: Kecepatan)
        {
            question: "Sebuah kereta api menempuh jarak 60 km dalam 30 menit. Berapa kecepatannya dalam satuan m/s?",
            options: ["2 m/s", "20.5 m/s", "33.3 m/s", "60 m/s"],
            correct: 2,
            explanation: `
                <p>Ubah semua satuan ke m dan s:</p>
                <p>Jarak (s) = 60 km = 60.000 m</p>
                <p>Waktu (t) = 30 menit = 1800 s</p>
                <div class="rumus-final">v = s / t<br>v = 60.000 m / 1800 s = 33.3 m/s</div>
            `
        },
        {
            question: "Grafik Gerak Lurus Beraturan (GLB) yang menunjukkan kecepatan (v) terhadap waktu (t) adalah...",
            options: ["Garis lurus miring ke atas", "Garis lurus horizontal (datar)", "Garis lurus miring ke bawah", "Garis melengkung (parabola)"],
            correct: 1,
            explanation: `
                <p><strong>GLB (Gerak Lurus Beraturan)</strong> berarti kecepatan (v) benda <strong>konstan</strong> atau <strong>tetap</strong>.</p>
                <p>Grafik yang menunjukkan nilai yang tetap terhadap waktu (t) adalah garis lurus horizontal (datar).</p>
            `
        },
        {
            question: "Mobil balap bergerak dari keadaan diam hingga mencapai 20 m/s dalam 5 detik. Berapa percepatannya (a)?",
            options: ["4 m/s²", "5 m/s²", "15 m/s²", "100 m/s²"],
            correct: 0,
            explanation: `
                <p>Percepatan (a) adalah perubahan kecepatan (Δv) dibagi waktu (t).</p>
                <p>v0 (awal) = 0 m/s (diam)</p>
                <p>vt (akhir) = 20 m/s</p>
                <p>t = 5 s</p>
                <div class="rumus-final">a = (vt - v0) / t<br>a = (20 - 0) / 5 = 4 m/s²</div>
            `
        },
        // (Materi: Hukum Newton I)
        {
            question: "Saat bus yang melaju kencang tiba-tiba direm, penumpang akan terdorong ke depan. Ini adalah contoh dari...",
            options: ["Hukum I Newton (Kelembaman)", "Hukum II Newton (F=ma)", "Hukum III Newton (Aksi-Reaksi)", "Gaya Gesek"],
            correct: 0,
            explanation: `
                <p>Ini adalah <strong>Hukum I Newton (Inersia/Kelembaman)</strong>.</p>
                <p>Tubuh Anda cenderung <strong>mempertahankan keadaan geraknya</strong> (tetap ingin maju), meskipun bus sudah berhenti. Itulah mengapa Anda terdorong ke depan.</p>
            `
        },
        // (Materi: Hukum Newton II)
        {
            question: "Sebuah balok 10 kg didorong dengan gaya 20 N. Berapa percepatan balok tersebut?",
            options: ["0.5 m/s²", "2 m/s²", "30 m/s²", "200 m/s²"],
            correct: 1,
            explanation: `
                <p>Gunakan rumus Hukum II Newton:</p>
                <p>F = 20 N</p>
                <p>m = 10 kg</p>
                <div class="rumus-final">a = F / m<br>a = 20 N / 10 kg = 2 m/s²</div>
            `
        },
        {
            question: "Mobil 500 kg didorong sehingga percepatannya 3 m/s². Berapa gaya (F) yang bekerja pada mobil?",
            options: ["150 N", "503 N", "1500 N", "166.7 N"],
            correct: 2,
            explanation: `
                <p>Gunakan rumus Hukum II Newton:</p>
                <p>m = 500 kg</p>
                <p>a = 3 m/s²</p>
                <div class="rumus-final">F = m &times; a<br>F = 500 kg &times; 3 m/s² = 1500 N</div>
            `
        },
        // (Materi: Hukum Newton III)
        {
            question: "Pasangan gaya Aksi-Reaksi memiliki sifat...",
            options: ["Sama besar, searah, pada 1 benda", "Berbeda besar, berlawanan arah, pada 1 benda", "Sama besar, berlawanan arah, pada 2 benda", "Berbeda besar, searah, pada 2 benda"],
            correct: 2,
            explanation: `
                <p>Ciri-ciri pasangan Aksi-Reaksi adalah:</p>
                <ol>
                    <li>Besar gaya <strong>sama</strong>.</li>
                    <li>Arah gaya <strong>berlawanan</strong>.</li>
                    <li>Terjadi pada <strong>dua benda yang berbeda</strong>.</li>
                </ol>
            `
        },
        {
            question: "Peluncuran roket adalah contoh Hukum III Newton. Mana yang merupakan pasangan Aksi-Reaksi yang benar?",
            options: ["Aksi: Roket ke atas, Reaksi: Gas ke bawah", "Aksi: Gas ke bawah, Reaksi: Roket ke atas", "Aksi: Gravitasi ke bawah, Reaksi: Roket ke atas", "Aksi: Roket ke atas, Reaksi: Gravitasi ke bawah"],
            correct: 1,
            explanation: `
                <p><strong>Gaya Aksi:</strong> Roket mendorong gas panas ke bawah.</p>
                <p><strong>Gaya Reaksi:</strong> Gas panas (sebagai balasan) mendorong roket ke atas.</p>
            `
        }
    ];

    // --- 2. PILIH ELEMEN DOM ---
    
    // Layar
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const reviewModal = document.getElementById('review-modal');
    
    // Tombol Mulai
    const nameInput = document.getElementById('name-input');
    const btnMulai = document.getElementById('btn-mulai');
    
    // Layar Kuis
    const questionCounter = document.getElementById('question-counter');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    
    // Layar Hasil
    const userNameDisplay = document.getElementById('user-name-display');
    const scoreDisplay = document.getElementById('score-display');
    const btnLihatPembahasan = document.getElementById('btn-lihat-pembahasan');
    const btnMulaiLagi = document.getElementById('btn-mulai-lagi');
    
    // Layar Review (Modal)
    const reviewQuestionNumber = document.getElementById('review-question-number');
    const reviewQuestionText = document.getElementById('review-question-text');
    const reviewExplanation = document.getElementById('review-explanation');
    const btnPrevReview = document.getElementById('btn-prev-review');
    const btnNextReview = document.getElementById('btn-next-review');
    const btnCloseReview = document.getElementById('btn-close-review');

    // --- 3. VARIABEL STATUS ---
    let currentQuestionIndex = 0;
    let score = 0;
    let userName = "";
    let reviewQuestionIndex = 0;

    // --- 4. EVENT LISTENERS ---
    btnMulai.addEventListener('click', startGame);
    btnMulaiLagi.addEventListener('click', resetQuiz);
    btnLihatPembahasan.addEventListener('click', showReview);
    btnCloseReview.addEventListener('click', closeReview);
    btnNextReview.addEventListener('click', nextReview);
    btnPrevReview.addEventListener('click', prevReview);

    // --- 5. FUNGSI-FUNGSI ---

    function startGame() {
        userName = nameInput.value.trim();
        if (userName === "") {
            alert("Silakan masukkan nama Anda!");
            return;
        }
        
        startScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        loadQuestion(currentQuestionIndex);
    }

    function loadQuestion(index) {
        // Reset tombol
        optionsContainer.innerHTML = '';
        
        const soal = quizData[index];
        questionCounter.textContent = `Soal ${index + 1} / ${quizData.length}`;
        questionText.textContent = soal.question;
        
        soal.options.forEach((option, i) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.dataset.index = i; // Simpan indeks jawaban
            button.addEventListener('click', selectAnswer);
            optionsContainer.appendChild(button);
        });
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const selectedIndex = parseInt(selectedButton.dataset.index);
        const correctIndex = quizData[currentQuestionIndex].correct;

        // Cek jawaban
        if (selectedIndex === correctIndex) {
            score++;
            selectedButton.classList.add('correct');
        } else {
            selectedButton.classList.add('incorrect');
            // Tampilkan jawaban yang benar
            optionsContainer.children[correctIndex].classList.add('correct');
        }
        
        // Nonaktifkan semua tombol
        Array.from(optionsContainer.children).forEach(btn => {
            btn.disabled = true;
        });

        // Jeda 1.5 detik lalu lanjut
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion(currentQuestionIndex);
            } else {
                showResults();
            }
        }, 1500); // 1.5 detik
    }

    function showResults() {
        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        
        const finalScore = (score / quizData.length) * 100;
        userNameDisplay.textContent = userName;
        scoreDisplay.textContent = finalScore.toFixed(0);
    }
    
    function resetQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        userName = "";
        nameInput.value = "";
        
        resultScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    }

    // Fungsi untuk Pembahasan
    function showReview() {
        reviewQuestionIndex = 0;
        loadReview(reviewQuestionIndex);
        reviewModal.classList.remove('hidden');
    }
    
    function closeReview() {
        reviewModal.classList.add('hidden');
    }
    
    function loadReview(index) {
        const soal = quizData[index];
        reviewQuestionNumber.textContent = `Pembahasan Soal ${index + 1}`;
        reviewQuestionText.textContent = soal.question;
        reviewExplanation.innerHTML = soal.explanation;
        
        // Atur tombol navigasi
        btnPrevReview.disabled = index === 0;
        btnNextReview.disabled = index === quizData.length - 1;
    }
    
    function nextReview() {
        if (reviewQuestionIndex < quizData.length - 1) {
            reviewQuestionIndex++;
            loadReview(reviewQuestionIndex);
        }
    }

    function prevReview() {
        if (reviewQuestionIndex > 0) {
            reviewQuestionIndex--;
            loadReview(reviewQuestionIndex);
        }
    }

});