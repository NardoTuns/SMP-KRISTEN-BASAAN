document.addEventListener("DOMContentLoaded", function() {

    // 1. Pilih semua elemen
    const astronot = document.getElementById('astronot');
    const bola = document.getElementById('bola');
    const gayaDorong = document.getElementById('gaya-dorong');
    const infoStatus = document.getElementById('info-status');
    const penjelasanArea = document.getElementById('penjelasan-area');

    // Tombol
    const btnLempar = document.getElementById('btn-lempar');
    const btnReset = document.getElementById('btn-reset');
    const allButtons = document.querySelectorAll('.btn-skenario');

    // 2. Variabel status
    let sedangBergerak = false;

    // 3. Event Listeners untuk Tombol
    
    // TOMBOL LEMPAR
    btnLempar.addEventListener('click', function() {
        if (sedangBergerak) return;
        sedangBergerak = true;
        disableAllButtons(true);
        
        resetSimulasi();
        
        tampilkanPenjelasan("1. Astronot memberikan <b>Gaya Awal</b> (dorongan) pada bola...");

        // Fase A: Mendorong (Dipercepat) - 0.5 detik
        // --- PERBAIKAN DI SINI ---
        infoStatus.innerHTML = "Status: MENDORONG<br>Total Gaya > 0";
        gayaDorong.classList.add('visible');
        
        const durasiDorong = 500; // 0.5 detik
        bola.style.transition = `left ${durasiDorong}ms ease-in`;
        gayaDorong.style.transition = `opacity 0.3s, left ${durasiDorong}ms ease-in`;

        const pos1 = '140px';
        bola.style.left = pos1;
        gayaDorong.style.left = `calc(${pos1} + 30px)`; // Panah di depan bola

        // Fase B: Meluncur (Konstan) - 3.5 detik
        setTimeout(() => {
            // --- PERBAIKAN DI SINI ---
            infoStatus.innerHTML = "Status: MELUNCUR (Konstan)<br>Total Gaya = 0";
            gayaDorong.classList.remove('visible'); // Hilangkan gaya dorong
            
            tampilkanPenjelasan("2. Gaya dorong hilang. Di luar angkasa (tanpa gesekan), bola <b>terus bergerak lurus beraturan</b>.");

            const durasiLuncur = 3500; // 3.5 detik
            bola.style.transition = `left ${durasiLuncur}ms linear`; // linear = kecepatan konstan
            gayaDorong.style.transition = `opacity 0.3s, left ${durasiLuncur}ms linear`;
            
            // Pindahkan ke luar layar
            const pos2 = 'calc(100% + 50px)';
            bola.style.left = pos2;
            gayaDorong.style.left = `calc(${pos2} + 30px)`; // Panah ikut (tapi tidak terlihat)

            // Selesai
            setTimeout(() => {
                tampilkanPenjelasan("<b>Pesan Akhir:</b> Kelembaman (Inersia) adalah sifat alami benda untuk mempertahankan keadaan geraknya (diam atau bergerak lurus beraturan).", 'highlight');
                sedangBergerak = false;
                disableAllButtons(false);
            }, durasiLuncur);
        }, durasiDorong);
    });

    // TOMBOL RESET
    btnReset.addEventListener('click', function() {
        if (sedangBergerak) return;
        resetSimulasi();
        penjelasanArea.innerHTML = "<p>Tekan tombol 'Lemparkan Bola' untuk melihat konsep Kelembaman di luar angkasa.</p>";
    });


    // 4. Fungsi Helper
    function resetSimulasi() {
        bola.style.transition = 'none';
        gayaDorong.style.transition = 'none';
        
        bola.style.left = '90px'; // Posisi awal bola
        gayaDorong.style.left = '120px'; // Posisi awal panah
        
        gayaDorong.classList.remove('visible');
        
        infoStatus.innerHTML = "Status: SIAP";
        
        // Memaksa browser render ulang posisi
        bola.offsetHeight; 
    }

    function disableAllButtons(disabled) {
        allButtons.forEach(button => {
            button.disabled = disabled;
        });
    }

    function tampilkanPenjelasan(teks, tipe = 'normal') {
        // Hapus teks placeholder
        if (penjelasanArea.childElementCount === 1 && penjelasanArea.firstChild.textContent.includes("Tekan tombol")) {
            penjelasanArea.innerHTML = '';
        }

        const p = document.createElement('p');
        p.innerHTML = teks;
        p.classList.add('penjelasan-teks');

        if (tipe === 'highlight') {
            p.classList.add('penjelasan-highlight');
        }

        penjelasanArea.appendChild(p);
        
        // Scroll ke paling bawah
        penjelasanArea.scrollTop = penjelasanArea.scrollHeight;
    }

    // Panggil reset saat pertama kali memuat
    resetSimulasi();
    disableAllButtons(false);

});