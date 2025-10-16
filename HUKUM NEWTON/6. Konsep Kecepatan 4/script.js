document.addEventListener("DOMContentLoaded", function () {
    const mobil = document.getElementById("mobil");
    const btnJalankan = document.getElementById("btn-jalankan");
    const posAwal = document.getElementById("posisi-awal");
    const posAkhir = document.getElementById("posisi-akhir");
    const quizArea = document.getElementById("quiz-area");
    const penjelasanArea = document.getElementById("penjelasan-area");
    const pilihanButtons = document.querySelectorAll("button.pilihan");

    const JARAK = 50;
    const WAKTU = 4;
    const KECEPATAN_BENAR = JARAK / WAKTU;
    const ANIMATION_DURATION_MS = WAKTU * 1000;

    let sedangBergerak = false;
    let sudahMenjawab = false;

    btnJalankan.addEventListener("click", function () {
        if (sedangBergerak) return;
        sedangBergerak = true;

        resetSimulasi();

        btnJalankan.disabled = true;
        btnJalankan.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Bergerak...';
        posAwal.classList.add("visible");

        // Pastikan posisi awal benar-benar dirender sebelum bergerak
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                mobil.classList.add("bergerak");
            });
        });

        // Setelah durasi animasi, tampilkan kuis
        setTimeout(selesaiAnimasi, ANIMATION_DURATION_MS);
    });

    function resetSimulasi() {
        sudahMenjawab = false;

        btnJalankan.disabled = false;
        btnJalankan.classList.remove("hidden");
        btnJalankan.innerHTML = '<i class="fas fa-play"></i> Jalankan Mobil';

        posAwal.classList.remove("visible");
        posAkhir.classList.remove("visible");
        quizArea.classList.add("hidden");
        penjelasanArea.classList.add("hidden");

        pilihanButtons.forEach((btn) => {
            btn.disabled = false;
            btn.classList.remove("benar", "salah");
        });

        // Reset posisi mobil
        mobil.classList.remove("bergerak");
    }

    function selesaiAnimasi() {
        posAkhir.classList.add("visible");
        btnJalankan.classList.add("hidden");
        quizArea.classList.remove("hidden");
        sedangBergerak = false;
    }

    pilihanButtons.forEach((button) => {
        button.addEventListener("click", function () {
            if (sudahMenjawab) return;
            sudahMenjawab = true;
            cekJawaban(button);
        });
    });

    function cekJawaban(tombolYangDipilih) {
        const jawabanBenar = tombolYangDipilih.dataset.correct === "true";
        pilihanButtons.forEach((btn) => (btn.disabled = true));

        if (jawabanBenar) {
            tombolYangDipilih.classList.add("benar");
        } else {
            tombolYangDipilih.classList.add("salah");
            document
                .querySelector('button.pilihan[data-correct="true"]')
                .classList.add("benar");
        }

        setTimeout(tampilkanPenjelasan, 1500);
    }

    function tampilkanPenjelasan() {
        penjelasanArea.innerHTML = `
            <div class="kalkulasi-box">
                <h3><i class="fas fa-calculator"></i> Mari kita hitung!</h3>
                <p><strong>Diketahui:</strong></p>
                <p>Jarak (s) = ${JARAK} m</p>
                <p>Waktu (t) = ${WAKTU} s</p>
                <br>
                <p><strong>Ditanya:</strong> Kecepatan (v)?</p>
                <br>
                <p><strong>Rumus:</strong></p>
                <div class="rumus-final">v = s / t</div>
                <p><strong>Perhitungan:</strong></p>
                <div class="rumus-final">
                    v = ${JARAK} m / ${WAKTU} s<br>
                    v = ${KECEPATAN_BENAR} m/s
                </div>
            </div>
        `;
        penjelasanArea.classList.remove("hidden");
        penjelasanArea.scrollIntoView({ behavior: "smooth" });
    }

    resetSimulasi();
});
