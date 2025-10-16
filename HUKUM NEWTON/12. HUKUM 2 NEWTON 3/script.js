document.addEventListener("DOMContentLoaded", function() {

    // 1. Data Kuis
    const quizData = [
        {
            // --- SOAL 1 ---
            question: "Sebuah kotak bermassa 10 kg didorong dengan gaya 50 N. Berapa percepatannya? (Abaikan gesekan)",
            answers: [
                { text: "2 m/s²", correct: false },
                { text: "5 m/s²", correct: true },
                { text: "50 m/s²", correct: false },
                { text: "500 m/s²", correct: false }
            ],
            setupAnimation: function() {
                // Ilustrasi: Kotak didorong gaya
                animObjek.className = 'anim-objek'; // Reset ke default (kotak)
                animGaya.classList.add('visible');
                animGaya.querySelector('span').textContent = 'F = 50 N';
                animObjek.innerHTML = '<span style="color:white; font-weight:900; font-size:1.2em; padding:5px;">m = 10 kg</span>';
                animInfo.classList.remove('visible');
            },
            explanation: `
                <h3><i class="fas fa-calculator"></i> Perhitungan:</h3>
                <p><strong>Diketahui:</strong></p>
                <p>Gaya (F) = 50 N</p>
                <p>Massa (m) = 10 kg</p>
                <p><strong>Ditanya:</strong> Percepatan (a)?</p>
                <p><strong>Rumus:</strong> a = F / m</p>
                <div class="rumus-final">
                    a = 50 N / 10 kg<br>
                    a = 5 m/s²
                </div>
            `
        },
        {
            // --- SOAL 2 ---
            question: "Sebuah mobil bermassa 1000 kg bergerak dengan percepatan 2 m/s². Berapa besar gaya yang dibutuhkan?",
            answers: [
                { text: "500 N", correct: false },
                { text: "1000 N", correct: false },
                { text: "2000 N", correct: true },
                { text: "20 N", correct: false }
            ],
            setupAnimation: function() {
                // Ilustrasi: Mobil bergerak dengan percepatan
                animObjek.className = 'anim-objek mobil'; // Ganti jadi mobil
                animObjek.innerHTML = '<span style="color:black; background:white; font-weight:700; padding:2px; border-radius:3px; position:absolute; top: -25px; left: 10px;">m = 1000 kg</span>';
                animInfo.classList.add('visible');
                animInfo.innerHTML = 'a = 2 m/s²';
                animGaya.classList.remove('visible');
            },
            explanation: `
                <h3><i class="fas fa-calculator"></i> Perhitungan:</h3>
                <p><strong>Diketahui:</strong></p>
                <p>Massa (m) = 1000 kg</p>
                <p>Percepatan (a) = 2 m/s²</p>
                <p><strong>Ditanya:</strong> Gaya (F)?</p>
                <p><strong>Rumus:</strong> F = m &times; a</p>
                <div class="rumus-final">
                    F = 1000 kg &times; 2 m/s²<br>
                    F = 2000 N
                </div>
            `
        },
        {
            // --- SOAL 3 ---
            question: "Budi menendang bola dengan gaya 20 N. Bola tersebut melesat dengan percepatan 40 m/s². Berapa massa bola tersebut?",
            answers: [
                { text: "0.5 kg", correct: true },
                { text: "2 kg", correct: false },
                { text: "20 kg", correct: false },
                { text: "800 kg", correct: false }
            ],
            setupAnimation: function() {
                // Ilustrasi: Bola ditendang gaya, mendapat percepatan
                animObjek.className = 'anim-objek bola';
                animObjek.innerHTML = '';
                animGaya.classList.add('visible');
                animGaya.querySelector('span').textContent = 'F = 20 N';
                animInfo.classList.add('visible');
                animInfo.innerHTML = 'a = 40 m/s²';
            },
            explanation: `
                <h3><i class="fas fa-calculator"></i> Perhitungan:</h3>
                <p><strong>Diketahui:</strong></p>
                <p>Gaya (F) = 20 N</p>
                <p>Percepatan (a) = 40 m/s²</p>
                <p><strong>Ditanya:</strong> Massa (m)?</p>
                <p><strong>Rumus:</strong> m = F / a</p>
                <div class="rumus-final">
                    m = 20 N / 40 m/s²<br>
                    m = 0.5 kg
                </div>
            `
        }
    ];

    // 2. Pilih Elemen DOM
    const questionArea = document.getElementById('question-area');
    const resultArea = document.getElementById('result-area');
    
    const questionNumber = document.getElementById('question-number');
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');
    
    const resultTitle = document.getElementById('result-title');
    const resultExplanation = document.getElementById('result-explanation');
    const btnNext = document.getElementById('btn-next');
    
    // Elemen Animasi
    const animObjek = document.getElementById('anim-objek');
    const animGaya = document.getElementById('anim-gaya');
    const animInfo = document.getElementById('anim-info');

    // 3. Variabel Status Kuis
    let currentQuestionIndex = 0;

    // 4. Mulai Kuis
    loadQuestion(currentQuestionIndex);

    // 5. Fungsi Load Soal
    function loadQuestion(index) {
        // Sembunyikan hasil, tampilkan soal
        questionArea.classList.remove('hidden');
        resultArea.classList.add('hidden');
        
        // Ambil data soal
        const soal = quizData[index];
        
        // Set Ilustrasi/Animasi
        soal.setupAnimation();
        
        // Set Teks Soal
        questionNumber.textContent = `Soal ${index + 1} dari ${quizData.length}`;
        questionText.textContent = soal.question;
        
        // Buat Tombol Pilihan
        answerButtons.innerHTML = ''; // Kosongkan tombol lama
        soal.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer.text;
            button.classList.add('pilihan');
            if (answer.correct) {
                button.dataset.correct = true;
            }
            button.addEventListener('click', selectAnswer);
            answerButtons.appendChild(button);
        });
    }

    // 6. Fungsi Saat Memilih Jawaban
    function selectAnswer(e) {
        const selectedButton = e.target;
        const isCorrect = selectedButton.dataset.correct === 'true';
        
        // Tandai jawaban benar/salah
        if (isCorrect) {
            selectedButton.classList.add('benar');
            resultTitle.textContent = "Jawaban Benar!";
        } else {
            selectedButton.classList.add('salah');
            resultTitle.textContent = "Jawaban Salah";
            // Tampilkan juga jawaban yang benar
            Array.from(answerButtons.children).forEach(btn => {
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('benar');
                }
            });
        }
        
        // Nonaktifkan semua tombol
        Array.from(answerButtons.children).forEach(btn => {
            btn.disabled = true;
        });
        
        // Tampilkan Penjelasan
        resultExplanation.innerHTML = quizData[currentQuestionIndex].explanation;
        questionArea.classList.add('hidden'); // Sembunyikan soal
        resultArea.classList.remove('hidden'); // Tampilkan penjelasan
        
        // Update tombol "Next"
        if (currentQuestionIndex < quizData.length - 1) {
            btnNext.textContent = "Soal Berikutnya";
        } else {
            btnNext.textContent = "Selesai! Mulai Lagi?";
        }
    }

    // 7. Fungsi Tombol Next
    btnNext.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion(currentQuestionIndex);
        } else {
            // Kuis selesai, mulai lagi dari awal
            currentQuestionIndex = 0;
            loadQuestion(currentQuestionIndex);
        }
    });

});