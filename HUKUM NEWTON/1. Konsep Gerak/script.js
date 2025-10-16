document.addEventListener("DOMContentLoaded", function() {

    // 1. Pilih semua elemen
    const mobil = document.getElementById('mobil');
    const btnJalankan = document.getElementById('btn-jalankan');
    const btnPenjelasan = document.getElementById('btn-penjelasan');
    
    const posAwal = document.getElementById('posisi-awal');
    const posAkhir = document.getElementById('posisi-akhir');
    
    const penjelasanArea = document.getElementById('penjelasan-area');

    // 2. Daftar teks penjelasan
    const teksPenjelasan = [
        "Ketika Mobil Bergerak maka mobil berpindah Posisi",
        "Posisi Awal mobil berbeda dengan posisi akhir mobil",
        "maka gerak bisa diartikan : Perubahan Posisi Benda",
        "GERAK ADALAH PERUBAHAN POSISI BENDA"
    ];

    // 3. Variabel status
    let sedangBergerak = false;
    let langkahPenjelasan = 0; 

    // 4. Fungsi "Jalankan Mobil" (SUDAH DIPERBARUI)
    btnJalankan.addEventListener('click', function() {
        if (sedangBergerak) {
            return;
        }
        sedangBergerak = true;
        
        // Nonaktifkan tombol dan beri icon loading
        btnJalankan.disabled = true;
        btnJalankan.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Bergerak...';

        // (posAwal TIDAK ditampilkan di sini lagi)

        // Tambahkan kelas 'bergerak' untuk memulai animasi CSS
        mobil.classList.add('bergerak');

        // Tunggu animasi selesai (2 detik)
        setTimeout(function() {
            
            // --- PERUBAHAN UTAMA DI SINI ---
            // Tampilkan "Posisi Akhir" dan "Posisi Awal" SETELAH mobil berhenti
            posAkhir.classList.add('visible');
            posAwal.classList.add('visible');
            
            // Sembunyikan tombol "Jalankan"
            btnJalankan.classList.add('hidden');
            
            // Tampilkan tombol "Tampilkan Penjelasan"
            btnPenjelasan.classList.remove('hidden');
            
            sedangBergerak = false;
        }, 2000); // 2000 ms = 2 detik
    });

    // 5. Fungsi "Tampilkan Penjelasan" (Update ikon)
    btnPenjelasan.addEventListener('click', function() {
        if (langkahPenjelasan < teksPenjelasan.length) {
            
            const p = document.createElement('p');
            p.textContent = teksPenjelasan[langkahPenjelasan];
            p.classList.add('penjelasan-teks');

            if (langkahPenjelasan === teksPenjelasan.length - 1) {
                p.classList.add('penjelasan-highlight');
            }

            penjelasanArea.appendChild(p);
            langkahPenjelasan++;
            
        } else {
            // Update tombol Selesai dengan ikon
            btnPenjelasan.innerHTML = '<i class="fas fa-check"></i> Selesai!';
            btnPenjelasan.disabled = true;
        }
    });

});