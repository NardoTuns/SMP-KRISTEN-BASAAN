document.addEventListener("DOMContentLoaded", function() {

    // 1. Pilih semua elemen
    const mobil = document.getElementById('mobil');
    const btnJalankan = document.getElementById('btn-jalankan');
    const btnPenjelasan = document.getElementById('btn-penjelasan');
    
    const posAwal = document.getElementById('posisi-awal');
    const posAkhir = document.getElementById('posisi-akhir');
    
    // Elemen Info Real-time
    const infoWaktu = document.getElementById('info-waktu');
    const infoJarak = document.getElementById('info-jarak');
    
    // Area Output
    const hasilKalkulasi = document.getElementById('hasil-kalkulasi');
    const penjelasanArea = document.getElementById('penjelasan-area');

    // 2. Konstanta Simulasi
    const JARAK_TOTAL = 100; // meter
    const WAKTU_TOTAL = 5;   // detik
    const KECEPATAN = JARAK_TOTAL / WAKTU_TOTAL; // 20 m/s

    // 3. Daftar Teks Penjelasan (Struktur Baru)
    const teksPenjelasan = [
        { type: 'normal', text: `Mobil menempuh jarak <strong>${JARAK_TOTAL} meter</strong> dalam <strong>${WAKTU_TOTAL} detik</strong>.` },
        { type: 'normal', text: 'Jarak yang ditempuh setiap detik (setiap 1 sekon) disebut <strong>KECEPATAN</strong>.' },
        { type: 'highlight', text: `Kecepatan = ${JARAK_TOTAL}m / ${WAKTU_TOTAL}s = ${KECEPATAN} m/s` },
        { type: 'normal', text: 'Dalam fisika, besaran-besaran ini memiliki simbol:' },
        { type: 'list', text: '<strong>Kecepatan</strong> disimbolkan dengan huruf <strong>(v)</strong>' },
        { type: 'list', text: '<strong>Jarak</strong> disimbolkan dengan huruf <strong>(s)</strong>' },
        { type: 'list', text: '<strong>Waktu</strong> disimbolkan dengan huruf <strong>(t)</strong>' },
        { type: 'normal', text: 'Sehingga, kecepatan dapat dirumuskan:' },
        { type: 'rumus', text: 'v = s / t' },
        { type: 'satuan-header', text: 'Satuan Standar (SI) untuk besaran:' },
        { type: 'satuan-item', text: 'Satuan Jarak (s) adalah <strong>meter (m)</strong>' },
        { type: 'satuan-item', text: 'Satuan Waktu (t) adalah <strong>sekon (s)</strong>' },
        { type: 'satuan-item', text: 'Satuan Kecepatan (v) adalah <strong>meter/sekon (m/s)</strong>' }
    ];

    // 4. Variabel status
    let sedangBergerak = false;
    let langkahPenjelasan = 0; 
    let waktuTimer = 0;
    let timerInterval = null;

    // 5. Fungsi "Jalankan Mobil"
    btnJalankan.addEventListener('click', function() {
        if (sedangBergerak) return;
        sedangBergerak = true;
        
        // Reset timer & info
        waktuTimer = 0;
        infoWaktu.textContent = '0';
        infoJarak.textContent = '0';
        
        // Nonaktifkan tombol dan beri icon loading
        btnJalankan.disabled = true;
        btnJalankan.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Bergerak...';

        // Tampilkan Posisi Awal
        posAwal.classList.add('visible');

        // Tambahkan kelas 'bergerak' untuk memulai animasi CSS
        mobil.classList.add('bergerak');

        // Mulai Timer (Interval 1 detik)
        timerInterval = setInterval(updateTimer, 1000);

        // Tunggu animasi CSS selesai (5 detik)
        setTimeout(function() {
            selesaiAnimasi();
        }, WAKTU_TOTAL * 1000); 
    });

    // 6. Fungsi untuk update Timer setiap detik
    function updateTimer() {
        waktuTimer++;
        if (waktuTimer <= WAKTU_TOTAL) {
            let jarakSekarang = KECEPATAN * waktuTimer;
            infoWaktu.textContent = waktuTimer;
            infoJarak.textContent = jarakSekarang;
        } else {
            // Hentikan interval jika waktu sudah melebihi (jaga-jaga)
            clearInterval(timerInterval);
        }
    }

    // 7. Fungsi setelah animasi selesai
    function selesaiAnimasi() {
        // Hentikan timer
        clearInterval(timerInterval);
        
        // Pastikan nilai akhir benar
        infoWaktu.textContent = WAKTU_TOTAL;
        infoJarak.textContent = JARAK_TOTAL;

        // Tampilkan "Posisi Akhir"
        posAkhir.classList.add('visible');
        
        // Tampilkan Hasil Kalkulasi
        tampilkanHasilKalkulasi();

        // Sembunyikan tombol "Jalankan"
        btnJalankan.classList.add('hidden');
        
        // Tampilkan tombol "Tampilkan Penjelasan"
        btnPenjelasan.classList.remove('hidden');
        
        sedangBergerak = false;
    }
    
    // 8. Fungsi untuk menampilkan hasil kalkulasi
    function tampilkanHasilKalkulasi() {
        hasilKalkulasi.innerHTML = `
            <h3><i class="fas fa-calculator"></i> Kalkulasi Akhir:</h3>
            <p>Jarak Total (s): ${JARAK_TOTAL} m</p>
            <p>Waktu Total (t): ${WAKTU_TOTAL} s</p>
            <p class="hasil-total">v = s / t = ${KECEPATAN} m/s</p>
        `;
        hasilKalkulasi.classList.remove('hidden');
    }

    // 9. Fungsi "Tampilkan Penjelasan"
    btnPenjelasan.addEventListener('click', function() {
        if (langkahPenjelasan < teksPenjelasan.length) {
            
            const item = teksPenjelasan[langkahPenjelasan];
            const p = document.createElement('p');
            
            // Tambahkan kelas dasar
            p.classList.add('penjelasan-teks');
            
            // Tambahkan kelas spesifik berdasarkan tipe
            if (item.type === 'highlight') p.classList.add('penjelasan-highlight');
            if (item.type === 'rumus') p.classList.add('penjelasan-rumus');
            if (item.type === 'list') p.classList.add('penjelasan-list-item');
            if (item.type === 'satuan-header') p.classList.add('penjelasan-satuan-header');
            if (item.type === 'satuan-item') p.classList.add('penjelasan-satuan-item');
            
            p.innerHTML = item.text; // Gunakan innerHTML agar tag <strong> terbaca
            penjelasanArea.appendChild(p);
            
            langkahPenjelasan++;
            
        } else {
            // Update tombol Selesai
            btnPenjelasan.innerHTML = '<i class="fas fa-check"></i> Selesai!';
            btnPenjelasan.disabled = true;
        }
    });

});