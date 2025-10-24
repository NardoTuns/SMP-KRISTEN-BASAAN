document.addEventListener("DOMContentLoaded", function () {

    const mobilKecil = document.getElementById('mobil-kecil');
    const trukBesar = document.getElementById('truk-besar');
    const gayaMobil = document.getElementById('gaya-mobil');
    const gayaTruk = document.getElementById('gaya-truk');
    const infoStatus = document.getElementById('info-status');
    const penjelasanArea = document.getElementById('penjelasan-area');

    const btnMulai = document.getElementById('btn-mulai');
    const btnReset = document.getElementById('btn-reset');
    const allButtons = document.querySelectorAll('.btn-skenario');

    let sedangBergerak = false;

    btnMulai.addEventListener('click', function () {
        if (sedangBergerak) return;
        sedangBergerak = true;
        disableAllButtons(true);

        resetSimulasi();
        tampilkanPenjelasan("Gaya dorong (F) yang sama diberikan...");
        gayaMobil.classList.add('visible');
        gayaTruk.classList.add('visible');
        infoStatus.innerHTML = "Status: DIPERCEPAT";

        // Mulai animasi setelah 0.5 detik
        setTimeout(() => {
            mobilKecil.style.transition = "left 3s ease-in";
            trukBesar.style.transition = "left 5s ease-in";

            mobilKecil.style.left = "80%";  // Gerak ke kanan
            trukBesar.style.left = "65%";   // Gerak lebih lambat
        }, 500);

        // Tunggu truk selesai
        setTimeout(selesaiAnimasi, 5500);
    });

    btnReset.addEventListener('click', function () {
        if (sedangBergerak) return;
        resetSimulasi();
        penjelasanArea.innerHTML =
            "<p>Tekan 'Mulai Balapan' untuk melihat perbandingan percepatan.</p>";
    });

    function selesaiAnimasi() {
        infoStatus.innerHTML = "Status: SELESAI";
        gayaMobil.classList.remove('visible');
        gayaTruk.classList.remove('visible');

        tampilkanPenjelasan("Mobil (massa kecil) melaju cepat.<br>Truk (massa besar) melaju lambat.");
        tampilkanPenjelasan("Gaya sama, massa berbeda → percepatan berbeda.", 'highlight');
        tampilkanPenjelasan("Rumus Hukum II Newton:", 'normal');
        tampilkanPenjelasan("F = m × a", 'rumus');
        tampilkanPenjelasan("<b>F</b> = Gaya (N)", 'satuan');
        tampilkanPenjelasan("<b>m</b> = Massa (kg)", 'satuan');
        tampilkanPenjelasan("<b>a</b> = Percepatan (m/s²)", 'satuan');
        tampilkanPenjelasan("Semakin kecil massa, semakin besar percepatan (jika F sama).", 'highlight');

        sedangBergerak = false;
        disableAllButtons(false);
    }

    function resetSimulasi() {
        mobilKecil.style.transition = "none";
        trukBesar.style.transition = "none";
        mobilKecil.style.left = "120px";
        trukBesar.style.left = "120px";
        gayaMobil.classList.remove('visible');
        gayaTruk.classList.remove('visible');
        infoStatus.innerHTML = "Status: SIAP";

        // Paksa browser render ulang posisi awal
        mobilKecil.offsetHeight;
        trukBesar.offsetHeight;
    }

    function disableAllButtons(disabled) {
        allButtons.forEach(button => button.disabled = disabled);
    }

    function tampilkanPenjelasan(teks, tipe = 'normal') {
        const p = document.createElement('p');
        p.innerHTML = teks;
        p.classList.add('penjelasan-teks');
        if (tipe === 'highlight') p.classList.add('penjelasan-highlight');
        penjelasanArea.appendChild(p);
        penjelasanArea.scrollTop = penjelasanArea.scrollHeight;
    }

    resetSimulasi();
});
