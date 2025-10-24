document.addEventListener("DOMContentLoaded", function() {

    // 1. Pilih semua elemen
    const bolaMerah = document.getElementById('bola-merah');
    const bolaBiru = document.getElementById('bola-biru');
    const gayaAksi = document.getElementById('gaya-aksi');
    const gayaReaksi = document.getElementById('gaya-reaksi');
    const infoStatus = document.getElementById('info-status');
    const penjelasanArea = document.getElementById('penjelasan-area');
    const suaraTumbukan = document.getElementById('suara-tumbukan');

    // Tombol
    const btnJalankan = document.getElementById('btn-jalankan');
    const btnReset = document.getElementById('btn-reset');
    const allButtons = document.querySelectorAll('.btn-skenario');

    // 2. Variabel status & Konstanta (TIMING BARU)
    let sedangBergerak = false;
    const DURASI_ANIMASI = 3000; // 3 detik (sesuai CSS)
    
    // Tumbukan terjadi di 50% dari 3000ms = 1500ms
    const WAKTU_TUMBUKAN = DURASI_ANIMASI * 0.5; // 1500ms
    // Kita akan tunjukkan panah 100ms sebelum & 100ms sesudah tumbukan
    const WAKTU_MULAI_AKSI = WAKTU_TUMBUKAN - 100; // 1400ms
    const WAKTU_SELESAI_AKSI = WAKTU_TUMBUKAN + 100; // 1600ms

    // 3. Event Listeners untuk Tombol
    
    // TOMBOL JALANKAN
    btnJalankan.addEventListener('click', function() {
        if (sedangBergerak) return;
        sedangBergerak = true;
        disableAllButtons(true);
        
        resetAnimasi();
        tampilkanPenjelasan("Bola merah dan biru saling mendekat...");

        // Mulai animasi CSS
        bolaMerah.classList.add('bergerak');
        bolaBiru.classList.add('bergerak');
        infoStatus.innerHTML = "Status: BERGERAK";

        // Tepat sesaat SEBELUM tumbukan (1.4s)
        setTimeout(() => {
            infoStatus.innerHTML = "Status: TUMBUKAN!";
            gayaAksi.classList.add('visible');
            gayaReaksi.classList.add('visible');
            
            // Mainkan suara
            suaraTumbukan.currentTime = 0; // Reset suara
            suaraTumbukan.play(); 
            
            tampilkanPenjelasan("<b>TUMBUKAN!</b> Bola biru memberi Gaya Aksi ke bola merah.");
            tampilkanPenjelasan("Bola merah memberi Gaya Reaksi ke bola biru.");
        }, WAKTU_MULAI_AKSI);
        
        // Sesaat SETELAH tumbukan (1.6s)
        setTimeout(() => {
            infoStatus.innerHTML = "Status: MEMANTUL";
            // Sembunyikan panah SANGAT CEPAT
            gayaAksi.classList.remove('visible');
            gayaReaksi.classList.remove('visible');
            tampilkanPenjelasan("Kedua bola memantul...");
        }, WAKTU_SELESAI_AKSI);


        // Selesai animasi (3s)
        setTimeout(() => {
            infoStatus.innerHTML = "Status: SELESAI";
            tampilkanPenjelasan("<b>Hukum III Newton:</b> Gaya aksi dan gaya reaksi sama besar, namun berlawanan arah.", 'highlight');
            sedangBergerak = false;
            disableAllButtons(false);
            
            // Hapus kelas agar bisa di-reset
            bolaMerah.classList.remove('bergerak');
            bolaBiru.classList.remove('bergerak');
        }, DURASI_ANIMASI);
    });

    // TOMBOL RESET
    btnReset.addEventListener('click', function() {
        if (sedangBergerak) return;
        resetAnimasi();
        penjelasanArea.innerHTML = "<p>Tekan 'Mulai Tumbukan' untuk melihat Hukum Aksi-Reaksi.</p>";
    });


    // 4. Fungsi Helper
    function resetAnimasi() {
        // Hapus kelas animasi
        bolaMerah.classList.remove('bergerak');
        bolaBiru.classList.remove('bergerak');
        
        // Hentikan transisi/animasi yg sedang berjalan
        bolaMerah.style.animation = 'none';
        bolaBiru.style.animation = 'none';
        
        // Paksa browser render ulang posisi
        bolaMerah.offsetHeight; 
        
        // Kembalikan animasi (agar bisa play lagi)
        bolaMerah.style.animation = null;
        bolaBiru.style.animation = null;
        
        // Sembunyikan gaya
        gayaAksi.classList.remove('visible');
        gayaReaksi.classList.remove('visible');
        
        infoStatus.innerHTML = "Status: SIAP";
    }

    function disableAllButtons(disabled) {
        allButtons.forEach(button => {
            button.disabled = disabled;
        });
    }

    function tampilkanPenjelasan(teks, tipe = 'normal') {
        // Hapus teks placeholder
        if (penjelasanArea.childElementCount === 1 && penjelasanArea.firstChild.textContent.includes("Tekan 'Mulai Tumbukan'")) {
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