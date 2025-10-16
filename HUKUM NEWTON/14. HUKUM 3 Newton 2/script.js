document.addEventListener("DOMContentLoaded", function() {

    // 1. Pilih semua elemen
    const roket = document.getElementById('roket');
    const gayaAksi = document.getElementById('gaya-aksi');
    const gayaReaksi = document.getElementById('gaya-reaksi');
    const efekApi = document.getElementById('efek-api');
    const infoStatus = document.getElementById('info-status');
    const penjelasanArea = document.getElementById('penjelasan-area');
    const suaraRoket = document.getElementById('suara-roket');

    // Tombol
    const btnLuncurkan = document.getElementById('btn-luncurkan');
    const btnReset = document.getElementById('btn-reset');
    const allButtons = document.querySelectorAll('.btn-skenario');

    // 2. Variabel status & Konstanta
    let sedangBergerak = false;
    const POSISI_AWAL_ROKET = '30px'; // Di atas landasan
    const POSISI_AWAL_REAKSI = '110px'; // Di atas roket
    const DURASI_LUNCUR = 3000; // 3 detik
    const WAKTU_TUNDA = 1000; // 1 detik (ignisi)

    // 3. Event Listeners untuk Tombol
    
    // TOMBOL LUNCURKAN
    btnLuncurkan.addEventListener('click', function() {
        if (sedangBergerak) return;
        sedangBergerak = true;
        disableAllButtons(true);
        
        resetAnimasi();
        tampilkanPenjelasan("Mesin menyala... (Ignisi)");

        // Fase 1: Ignisi (1 detik)
        infoStatus.innerHTML = "Status: MENYALA...";
        efekApi.classList.remove('hidden');
        gayaAksi.classList.add('visible');
        gayaReaksi.classList.add('visible');
        
        // Mainkan suara
        suaraRoket.currentTime = 0;
        suaraRoket.play(); 

        // Fase 2: Meluncur (setelah 1 detik ignisi)
        setTimeout(() => {
            infoStatus.innerHTML = "Status: MELUNCUR!";
            tampilkanPenjelasan("<b>Gaya Aksi:</b> Roket mendorong gas panas ke bawah.");
            
            // Gerakkan roket dan panah reaksi ke atas
            roket.style.transition = `bottom ${DURASI_LUNCUR}ms ease-in`;
            gayaReaksi.style.transition = `bottom ${DURASI_LUNCUR}ms ease-in, opacity 0.5s`;
            
            roket.style.bottom = '300px'; // Meluncur ke luar layar
            gayaReaksi.style.bottom = '380px'; // Ikut meluncur

            tampilkanPenjelasan("<b>Gaya Reaksi:</b> Gas mendorong roket ke atas.");

        }, WAKTU_TUNDA);


        // Fase 3: Selesai (setelah 1d + 3d = 4d)
        setTimeout(() => {
            infoStatus.innerHTML = "Status: SELESAI";
            tampilkanPenjelasan("Gaya Aksi dan Reaksi sama besar, berlawanan arah.", 'highlight');
            sedangBergerak = false;
            disableAllButtons(false);
            efekApi.classList.add('hidden'); // Matikan api
        }, DURASI_LUNCUR + WAKTU_TUNDA);
    });

    // TOMBOL RESET
    btnReset.addEventListener('click', function() {
        if (sedangBergerak) return;
        resetAnimasi();
        penjelasanArea.innerHTML = "<p>Tekan 'Luncurkan Roket' untuk melihat Hukum Aksi-Reaksi.</p>";
        suaraRoket.pause();
        suaraRoket.currentTime = 0;
    });


    // 4. Fungsi Helper
    function resetAnimasi() {
        // Hentikan transisi
        roket.style.transition = 'none';
        gayaReaksi.style.transition = 'none';
        
        // Kembalikan ke posisi awal
        roket.style.bottom = POSISI_AWAL_ROKET;
        gayaReaksi.style.bottom = POSISI_AWAL_REAKSI;
        
        // Sembunyikan elemen
        efekApi.classList.add('hidden');
        gayaAksi.classList.remove('visible');
        gayaReaksi.classList.remove('visible');
        
        infoStatus.innerHTML = "Status: SIAP";
        
        // Paksa browser render posisi reset
        roket.offsetHeight; 
    }

    function disableAllButtons(disabled) {
        allButtons.forEach(button => {
            button.disabled = disabled;
        });
    }

    function tampilkanPenjelasan(teks, tipe = 'normal') {
        // Hapus teks placeholder
        if (penjelasanArea.childElementCount === 1 && penjelasanArea.firstChild.textContent.includes("Tekan 'Luncurkan Roket'")) {
            penjelasanArea.innerHTML = '';
        }

        const p = document.createElement('p');
        p.innerHTML = teks;
        
        if (tipe === 'highlight') {
            p.classList.add('penjelasan-highlight');
        } else {
            p.classList.add('penjelasan-teks');
        }

        penjelasanArea.appendChild(p);
        
        // Scroll ke paling bawah
        penjelasanArea.scrollTop = penjelasanArea.scrollHeight;
    }

    // Panggil reset saat pertama kali memuat
    resetAnimasi();
    disableAllButtons(false);

});