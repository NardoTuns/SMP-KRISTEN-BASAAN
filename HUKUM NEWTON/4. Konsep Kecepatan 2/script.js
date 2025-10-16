document.addEventListener("DOMContentLoaded", function() {

    // 1. Pilih semua elemen
    const rina = document.getElementById('rina');
    const budi = document.getElementById('budi');
    
    const btnJalankan = document.getElementById('btn-jalankan');
    const btnUbah = document.getElementById('btn-ubah');
    const btnPenjelasan = document.getElementById('btn-penjelasan');
    
    // Area Info
    const infoWaktu = document.getElementById('info-waktu');
    const waktuRinaEl = document.getElementById('waktu-rina');
    const waktuBudiEl = document.getElementById('waktu-budi');

    // Area Grafik
    const graphContainer = document.getElementById('graph-container');
    const grafikRina = document.getElementById('grafik-rina');
    const grafikBudi = document.getElementById('grafik-budi');
    
    // Area Penjelasan
    const penjelasanArea = document.getElementById('penjelasan-area');

    // 2. Konstanta & Variabel Status
    const KECEPATAN_CEPAT_MS = 3000; // 3 detik
    const KECEPATAN_LAMBAT_MS = 5000; // 5 detik
    
    let isRinaFast = true; // Rina cepat, Budi lambat
    let sedangBergerak = false;
    let langkahPenjelasan = 0;
    let timerRina = 0;
    let timerBudi = 0;
    let intervalRina, intervalBudi;

    // 3. Fungsi "Jalankan"
    btnJalankan.addEventListener('click', function() {
        if (sedangBergerak) return;
        sedangBergerak = true;
        
        resetSimulasi(); // Bersihkan simulasi sebelumnya

        // Tentukan waktu animasi
        const waktuAnimasiRina = isRinaFast ? KECEPATAN_CEPAT_MS : KECEPATAN_LAMBAT_MS;
        const waktuAnimasiBudi = isRinaFast ? KECEPATAN_LAMBAT_MS : KECEPATAN_CEPAT_MS;

        // Atur durasi transisi CSS
        rina.style.transitionDuration = waktuAnimasiRina + 'ms';
        budi.style.transitionDuration = waktuAnimasiBudi + 'ms';
        
        // Tampilkan info waktu
        infoWaktu.classList.remove('hidden');

        // Mulai timer visual
        startTimer(waktuRinaEl, waktuAnimasiRina, 'rina');
        startTimer(waktuBudiEl, waktuAnimasiBudi, 'budi');
        
        // Nonaktifkan tombol
        btnJalankan.disabled = true;
        btnJalankan.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Berlangsung...';

        // Mulai animasi
        rina.classList.add('bergerak');
        budi.classList.add('bergerak');

        // Tunggu animasi TERLAMA selesai
        const waktuTerlama = Math.max(waktuAnimasiRina, waktuAnimasiBudi);
        setTimeout(function() {
            selesaiAnimasi(waktuAnimasiRina, waktuAnimasiBudi);
        }, waktuTerlama);
    });

    // 4. Fungsi Timer Visual
    function startTimer(element, durasiTotal, siapa) {
        let startTime = Date.now();
        let interval = setInterval(function() {
            let elapsedTime = Date.now() - startTime;
            
            if (elapsedTime >= durasiTotal) {
                element.textContent = (durasiTotal / 1000).toFixed(1); // Tampilkan waktu final
                clearInterval(interval);
                return;
            }
            
            element.textContent = (elapsedTime / 1000).toFixed(1);
        }, 100); // Update setiap 0.1 detik

        if (siapa === 'rina') intervalRina = interval;
        if (siapa === 'budi') intervalBudi = interval;
    }

    // 5. Fungsi "Selesai Animasi"
    function selesaiAnimasi(waktuRina, waktuBudi) {
        sedangBergerak = false;
        
        // Tampilkan tombol "Ubah" dan "Penjelasan"
        btnUbah.classList.remove('hidden');
        btnPenjelasan.classList.remove('hidden');
        btnJalankan.innerHTML = '<i class="fas fa-play"></i> Mulai Lomba'; // Reset teks tombol
        
        // Tampilkan grafik
        gambarGrafik(waktuRina, waktuBudi);
    }

    // 6. Fungsi "Gambar Grafik" (SVG)
    function gambarGrafik(waktuRina, waktuBudi) {
        graphContainer.classList.remove('hidden');
        
        // Koordinat SVG (Y terbalik, 0 di atas)
        const y_start = 220; // Bawah
        const y_end = 20;    // Atas
        const x_start = 30;  // Kiri
        const x_end_max = 280; // Kanan (batas waktu terlama)

        const waktuTerlama = Math.max(waktuRina, waktuBudi);
        
        // Hitung posisi X akhir berdasarkan rasio waktu
        // (waktu / waktuTerlama) * (lebar_grafik) + x_start
        const x_end_rina = (waktuRina / waktuTerlama) * (x_end_max - x_start) + x_start;
        const x_end_budi = (waktuBudi / waktuTerlama) * (x_end_max - x_start) + x_start;

        // Atur atribut garis SVG
        // Keduanya menempuh jarak penuh (y_end)
        grafikRina.setAttribute('x2', x_end_rina);
        grafikRina.setAttribute('y2', y_end);
        
        grafikBudi.setAttribute('x2', x_end_budi);
        grafikBudi.setAttribute('y2', y_end);

        // Tampilkan garis dengan animasi (transisi di CSS)
        // Diberi sedikit delay agar terlihat
        setTimeout(() => {
            grafikRina.style.opacity = 1;
            grafikBudi.style.opacity = 1;
        }, 100);
    }

    // 7. Fungsi "Ubah Kecepatan"
    btnUbah.addEventListener('click', function() {
        isRinaFast = !isRinaFast; // Balik status kecepatan
        
        // Ganti label di tombol
        const status = isRinaFast ? "Rina Cepat" : "Budi Cepat";
        btnUbah.innerHTML = `<i class="fas fa-retweet"></i> Status: ${status}`;
        
        resetSimulasi();
        
        // Aktifkan kembali tombol jalankan
        btnJalankan.disabled = false;
    });

    // 8. Fungsi "Reset Simulasi"
    function resetSimulasi() {
        // Hentikan timer
        clearInterval(intervalRina);
        clearInterval(intervalBudi);
        
        // Reset posisi karakter
        rina.classList.remove('bergerak');
        budi.classList.remove('bergerak');
        // Reset durasi transisi agar 'lompat' kembali
        rina.style.transitionDuration = '0ms';
        budi.style.transitionDuration = '0ms';
        
        // Sembunyikan elemen
        graphContainer.classList.add('hidden');
        btnPenjelasan.classList.add('hidden');
        btnUbah.classList.add('hidden');
        infoWaktu.classList.add('hidden');
        
        // Reset grafik
        grafikRina.style.opacity = 0;
        grafikBudi.style.opacity = 0;
        grafikRina.setAttribute('x2', 30); // Kembali ke x_start
        grafikRina.setAttribute('y2', 220); // Kembali ke y_start
        grafikBudi.setAttribute('x2', 30);
        grafikBudi.setAttribute('y2', 220);
        
        // Reset penjelasan
        penjelasanArea.innerHTML = '';
        langkahPenjelasan = 0;
        btnPenjelasan.innerHTML = '<i class="fas fa-chalkboard-teacher"></i> Tampilkan Penjelasan';
        btnPenjelasan.disabled = false;
    }

    // 9. Fungsi "Tampilkan Penjelasan"
    btnPenjelasan.addEventListener('click', function() {
        // Tentukan siapa yang cepat (pemenang)
        const pemenang = isRinaFast ? "Rina" : "Budi";
        const pecundang = isRinaFast ? "Budi" : "Rina";
        const waktuPemenang = (isRinaFast ? KECEPATAN_CEPAT_MS : KECEPATAN_LAMBAT_MS) / 1000;
        const waktuPecundang = (isRinaFast ? KECEPATAN_LAMBAT_MS : KECEPATAN_CEPAT_MS) / 1000;

        const teksPenjelasan = [
            `Kedua siswa menempuh <strong>Jarak (s)</strong> yang sama menuju sekolah.`,
            `${pemenang} sampai dalam <strong>${waktuPemenang} detik</strong>.`,
            `${pecundang} sampai dalam <strong>${waktuPecundang} detik</strong>.`,
            `Karena ${pemenang} menempuh jarak yang sama dalam waktu yang lebih singkat, maka <strong>${pemenang} memiliki kecepatan (v) lebih besar</strong>.`,
            `Lihat pada grafik! Garis milik ${pemenang} terlihat <strong>lebih CURAM</strong>.`,
            `<strong>KESIMPULAN:</strong> Semakin besar kecepatan, semakin curam grafik Jarak (s) terhadap Waktu (t).`
        ];

        if (langkahPenjelasan < teksPenjelasan.length) {
            const p = document.createElement('p');
            p.innerHTML = teksPenjelasan[langkahPenjelasan];
            p.classList.add('penjelasan-teks');

            if (langkahPenjelasan === teksPenjelasan.length - 1) {
                p.classList.add('penjelasan-highlight');
            }

            penjelasanArea.appendChild(p);
            langkahPenjelasan++;
            
        } else {
            btnPenjelasan.innerHTML = '<i class="fas fa-check"></i> Selesai!';
            btnPenjelasan.disabled = true;
        }
    });

});