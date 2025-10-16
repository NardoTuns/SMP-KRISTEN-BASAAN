document.addEventListener("DOMContentLoaded", function() {

    // 1. Pilih Elemen
    const mobil1 = document.getElementById('mobil-1');
    const mobil2 = document.getElementById('mobil-2');
    const label1 = document.getElementById('label-mobil-1');
    const label2 = document.getElementById('label-mobil-2');
    
    const speedometer = document.getElementById('speed-value');
    
    const grafikMobil1 = document.getElementById('grafik-mobil-1');
    const grafikMobil2 = document.getElementById('grafik-mobil-2');
    const graphContainer = document.getElementById('graph-container');
    
    const btnJalankan = document.getElementById('btn-jalankan');
    const btnPenjelasan = document.getElementById('btn-penjelasan');
    const penjelasanArea = document.getElementById('penjelasan-area');

    // 2. Variabel Kontrol Animasi
    let animationInterval = null;
    let sedangBergerak = false;
    let langkahPenjelasan = 0;
    
    const ANIMATION_DURATION_S = 8; // Total durasi 8 detik
    const STEPS_PER_SECOND = 20; // 20 update per detik
    const TOTAL_STEPS = ANIMATION_DURATION_S * STEPS_PER_SECOND;
    const TIME_STEP_S = 1 / STEPS_PER_SECOND; // Waktu per langkah (0.05s)
    
    const JARAK_MAKS_PIXEL = mobil1.parentElement.offsetWidth - mobil1.offsetWidth - 10;
    const KECEPATAN_KONSTAN_V = 60; // km/j

    // Koordinat Grafik SVG
    const G_X_START = 40;
    const G_Y_START = 220;
    const G_WIDTH = 260; // 300 - 40
    const G_HEIGHT = 200; // 220 - 20
    const G_V_MAX = 100; // Kecepatan maks di grafik (100 km/j)

    // 3. Fungsi "Jalankan Animasi"
    btnJalankan.addEventListener('click', function() {
        if (sedangBergerak) return;
        sedangBergerak = true;
        
        resetAnimasi();
        
        btnJalankan.disabled = true;
        btnJalankan.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Bergerak...';

        let currentStep = 0;
        let path1_data = `M${G_X_START},${G_Y_START - (KECEPATAN_KONSTAN_V / G_V_MAX) * G_HEIGHT}`; // Mulai di v=60
        let path2_data = `M${G_X_START},${G_Y_START}`; // Mulai di v=0

        animationInterval = setInterval(function() {
            currentStep++;
            const currentTimeS = currentStep * TIME_STEP_S;
            
            // --- Kalkulasi Mobil 1 (Konstan) ---
            const v1 = KECEPATAN_KONSTAN_V;
            // Posisi = (waktu / total_waktu) * jarak_maks
            const pos1 = (currentTimeS / ANIMATION_DURATION_S) * JARAK_MAKS_PIXEL;
            
            // --- Kalkulasi Mobil 2 (Berubah) ---
            const v2 = hitungKecepatanBerubah(currentTimeS);
            // Posisi = integral(v). Kita simulasikan dengan menjumlahkan kecepatan tiap langkah
            // Kita gunakan fungsi easing untuk posisi agar terlihat mulus
            const pos2_percent = easeInOutQuad(currentTimeS / ANIMATION_DURATION_S);
            const pos2 = pos2_percent * JARAK_MAKS_PIXEL;
            
            // --- Update Visual ---
            // Update Posisi Mobil
            mobil1.style.left = (pos1 + 10) + 'px';
            label1.style.left = (pos1 + 115) + 'px';
            
            mobil2.style.left = (pos2 + 10) + 'px';
            label2.style.left = (pos2 + 115) + 'px';
            
            // Update Speedometer
            speedometer.textContent = v2.toFixed(0);
            
            // Update Grafik (Tambah titik baru ke path)
            const g_x = G_X_START + (currentTimeS / ANIMATION_DURATION_S) * G_WIDTH;
            const g_y1 = G_Y_START - (v1 / G_V_MAX) * G_HEIGHT;
            const g_y2 = G_Y_START - (v2 / G_V_MAX) * G_HEIGHT;
            
            path1_data += ` L${g_x},${g_y1}`;
            path2_data += ` L${g_x},${g_y2}`;
            grafikMobil1.setAttribute('d', path1_data);
            grafikMobil2.setAttribute('d', path2_data);

            // --- Cek Selesai ---
            if (currentStep >= TOTAL_STEPS) {
                selesaiAnimasi();
            }
            
        }, 1000 / STEPS_PER_SECOND); // Interval (misal 50ms)
    });

    // 4. Fungsi bantu
    
    // Menghitung kecepatan Mobil 2 (GLBB)
    function hitungKecepatanBerubah(t) {
        if (t < 3) { // 0-3s: Dipercepat (0 -> 90 km/j)
            return (t / 3) * 90;
        } else if (t < 6) { // 3-6s: Diperlambat (90 -> 40 km/j)
            return 90 - ((t - 3) / 3) * 50;
        } else { // 6-8s: Dipercepat lagi (40 -> 60 km/j)
            return 40 + ((t - 6) / 2) * 20;
        }
    }
    
    // Fungsi easing untuk posisi Mobil 2 (agar terlihat alami)
    function easeInOutQuad(t) {
        // t adalah progres 0-1
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function selesaiAnimasi() {
        clearInterval(animationInterval);
        sedangBergerak = false;
        btnJalankan.disabled = false;
        btnJalankan.innerHTML = '<i class="fas fa-play"></i> Jalankan Animasi';
        btnPenjelasan.classList.remove('hidden');
        speedometer.textContent = "0"; // Reset speedometer
    }

    function resetAnimasi() {
        langkahPenjelasan = 0;
        penjelasanArea.innerHTML = '';
        btnPenjelasan.classList.add('hidden');
        btnPenjelasan.disabled = false;
        btnPenjelasan.innerHTML = '<i class="fas fa-chalkboard-teacher"></i> Tampilkan Penjelasan';
        
        mobil1.style.left = '10px';
        mobil2.style.left = '10px';
        label1.style.left = '115px';
        label2.style.left = '115px';
        speedometer.textContent = '0';
        
        // Reset path grafik
        grafikMobil1.setAttribute('d', `M${G_X_START},${G_Y_START - (KECEPATAN_KONSTAN_V / G_V_MAX) * G_HEIGHT}`);
        grafikMobil2.setAttribute('d', `M${G_X_START},${G_Y_START}`);
    }

    // 5. Fungsi "Tampilkan Penjelasan"
    btnPenjelasan.addEventListener('click', function() {
        const teksPenjelasan = [
            `<strong>Mobil A (Konstan):</strong> Bergerak dengan kecepatan tetap <strong>${KECEPATAN_KONSTAN_V} km/j</strong>. Ini disebut Gerak Lurus Beraturan (GLB).`,
            "Lihat grafiknya! Garis kecepatan (v) Mobil A lurus horizontal, menunjukkan kecepatannya tidak berubah terhadap waktu (t).",
            `<strong>Mobil B (Berubah):</strong> Kecepatannya berubah-ubah (naik dan turun), seperti yang ditunjukkan speedometer. Ini disebut Gerak Lurus Berubah Beraturan (GLBB).`,
            "Saat garis grafik Mobil B miring ke atas, artinya mobil <strong>dipercepat</strong> (kecepatan bertambah).",
            "Saat garis grafik Mobil B miring ke bawah, artinya mobil <strong>diperlambat</strong> (kecepatan berkurang).",
            `<strong>PERCEPATAN</strong> adalah perubahan kecepatan setiap satuan waktu.`
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