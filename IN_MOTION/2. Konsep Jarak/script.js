document.addEventListener("DOMContentLoaded", function() {

    // 1. Pilih semua elemen
    const mobil = document.getElementById('mobil');
    const mobilContainer = document.getElementById('mobil-container');
    const btnJalankan = document.getElementById('btn-jalankan');
    const btnPenjelasan = document.getElementById('btn-penjelasan');
    
    // Penanda A-E
    const markers = document.querySelectorAll('.posisi-marker');
    
    // Garis lintasan
    const pathSegments = document.querySelectorAll('.path-segment');
    const garisPerpindahan = document.getElementById('garis-perpindahan');

    // Area output
    const hasilArea = document.getElementById('hasil-jarak');
    const penjelasanArea = document.getElementById('penjelasan-area');

    // 2. Daftar teks penjelasan
    const teksPenjelasan = [
        "JARAK adalah total panjang lintasan yang ditempuh mobil.",
        "Sedangkan PERPINDAHAN adalah perubahan posisi, diukur lurus dari titik Awal (A) ke titik Akhir (E)."
    ];
    
    // 3. Konstanta
    const ANIMATION_DURATION = 8000; // 8 detik (sesuai CSS)
    const JARAK_AB = 210;
    const JARAK_BC = 150;
    const JARAK_CD = 210;
    const JARAK_DE = 120;
    const TOTAL_JARAK = JARAK_AB + JARAK_BC + JARAK_CD + JARAK_DE;
    const TOTAL_PERPINDAHAN = 150 + 120; // Jarak lurus A ke E

    // 4. Variabel status
    let sedangBergerak = false;
    let langkahPenjelasan = 0; 

    // 5. Fungsi "Jalankan Mobil"
    btnJalankan.addEventListener('click', function() {
        if (sedangBergerak) return;
        sedangBergerak = true;
        
        // Nonaktifkan tombol dan beri icon loading
        btnJalankan.disabled = true;
        btnJalankan.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Bergerak...';

        // Tampilkan semua penanda A-E
        markers.forEach(marker => marker.classList.add('visible'));

        // Tambahkan kelas 'bergerak' untuk memulai animasi CSS
        mobilContainer.classList.add('bergerak');
        mobil.classList.add('bergerak');

        // Tunggu animasi selesai
        setTimeout(function() {
            
            // Tampilkan garis lintasan (putus-putus)
            pathSegments.forEach(seg => seg.classList.add('visible'));
            
            // Tampilkan hasil perhitungan jarak
            tampilkanHasilJarak();

            // Sembunyikan tombol "Jalankan"
            btnJalankan.classList.add('hidden');
            
            // Tampilkan tombol "Tampilkan Penjelasan"
            btnPenjelasan.classList.remove('hidden');
            
            sedangBergerak = false;
        }, ANIMATION_DURATION);
    });

    // 6. Fungsi "Tampilkan Penjelasan"
    btnPenjelasan.addEventListener('click', function() {
        if (langkahPenjelasan < teksPenjelasan.length) {
            
            const p = document.createElement('p');
            p.textContent = teksPenjelasan[langkahPenjelasan];
            p.classList.add('penjelasan-teks');

            // Jadikan teks terakhir sebagai highlight
            if (langkahPenjelasan === teksPenjelasan.length - 1) {
                p.classList.add('penjelasan-highlight');
                // TAMPILKAN GARIS PERPINDAHAN (A ke E)
                garisPerpindahan.classList.add('visible');
            }

            penjelasanArea.appendChild(p);
            langkahPenjelasan++;
            
        } else {
            // Update tombol Selesai
            btnPenjelasan.innerHTML = '<i class="fas fa-check"></i> Selesai!';
            btnPenjelasan.disabled = true;
        }
    });
    
    // 7. Fungsi untuk menampilkan hasil jarak
    function tampilkanHasilJarak() {
        hasilArea.innerHTML = `
            <h3><i class="fas fa-route"></i> Rincian Lintasan:</h3>
            <p>Jarak A ke B: ${JARAK_AB} m</p>
            <p>Jarak B ke C: ${JARAK_BC} m</p>
            <p>Jarak C ke D: ${JARAK_CD} m</p>
            <p>Jarak D ke E: ${JARAK_DE} m</p>
            <p class="hasil-total">TOTAL JARAK = ${TOTAL_JARAK} m</p>
        `;
        hasilArea.classList.remove('hidden');
        // Memicu animasi fade-in sederhana untuk area hasil
        const p = document.createElement('p'); 
        p.textContent = ' ';
        p.classList.add('penjelasan-teks'); // Memakai animasi yg sudah ada
        hasilArea.appendChild(p);
        setTimeout(() => p.remove(), 500);
    }

});