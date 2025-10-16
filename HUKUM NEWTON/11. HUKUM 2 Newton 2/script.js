document.addEventListener("DOMContentLoaded", function() {

    // 1. Pilih semua elemen
    const rigContainer = document.getElementById('rig-container');
    const gerobak = document.getElementById('gerobak');
    const taliGaya = document.getElementById('tali-gaya');
    const infoStatus = document.getElementById('info-status');
    const penjelasanArea = document.getElementById('penjelasan-area');

    // Kontrol
    const sliderGaya = document.getElementById('slider-gaya');
    const labelGaya = document.getElementById('label-gaya');
    const sliderMassa = document.getElementById('slider-massa');
    const labelMassa = document.getElementById('label-massa');
    
    // Output
    const nilaiPercepatan = document.getElementById('nilai-percepatan');
    
    // Tombol
    const btnTarik = document.getElementById('btn-tarik');
    const btnReset = document.getElementById('btn-reset');
    const allControls = [sliderGaya, sliderMassa, btnTarik, btnReset];

    // 2. Variabel & Konstanta
    let sedangBergerak = false;
    const POSISI_AWAL = '10px';
    const GAYA_MIN = 10, GAYA_MAKS = 100;
    const MASSA_MIN = 20, MASSA_MAKS = 200;

    // 3. Event Listeners
    sliderGaya.addEventListener('input', updateNilai);
    sliderMassa.addEventListener('input', updateNilai);
    btnTarik.addEventListener('click', tarikGerobak);
    btnReset.addEventListener('click', resetSimulasi);


    // 4. Fungsi Utama
    function updateNilai() {
        // Jangan update jika sedang bergerak
        if (sedangBergerak) return;
        
        let gaya = parseFloat(sliderGaya.value);
        let massa = parseFloat(sliderMassa.value);
        let percepatan = (gaya / massa).toFixed(2);

        // Update Label
        labelGaya.textContent = `${gaya.toFixed(0)} N`;
        labelMassa.textContent = `${massa.toFixed(0)} kg`;
        
        // Update Output
        nilaiPercepatan.textContent = percepatan;

        // Update Visual (Tali Gaya & Beban Massa)
        // Panjang tali: min 30px, max 80px
        const lebarTali = 30 + ((gaya - GAYA_MIN) / (GAYA_MAKS - GAYA_MIN)) * 50;
        taliGaya.style.width = `${lebarTali}px`;

        // Tinggi beban: min 5px, max 40px
        const tinggiBeban = 5 + ((massa - MASSA_MIN) / (MASSA_MAKS - MASSA_MIN)) * 35;
        // Kita set CSS Custom Property '--load-height'
        // CSS akan membacanya: gerobak::before { height: var(--load-height); }
        gerobak.style.setProperty('--load-height', `${tinggiBeban}px`);
    }

    function tarikGerobak() {
        if (sedangBergerak) return;
        sedangBergerak = true;
        disableControls(true);
        
        infoStatus.innerHTML = "Status: BERGERAK";
        tampilkanPenjelasan("Percepatan meningkat jika <b>Gaya (F)</b> diperbesar atau <b>Massa (m)</b> dikurangi.");

        // Hitung percepatan & durasi
        let gaya = parseFloat(sliderGaya.value);
        let massa = parseFloat(sliderMassa.value);
        let percepatan = gaya / massa;

        // Hitung durasi: Durasi = K / percepatan
        // Semakin besar percepatan, semakin singkat durasinya
        const SKALA_DURASI = 8000; // Konstanta kalibrasi
        let durasi = SKALA_DURASI / percepatan;
        
        // Batasi durasi agar tidak terlalu cepat/lambat
        if (durasi < 1500) durasi = 1500; // Minimal 1.5 detik
        if (durasi > 10000) durasi = 10000; // Maksimal 10 detik

        // Terapkan animasi (ease-in = percepatan)
        rigContainer.style.transition = `left ${durasi}ms ease-in`;
        rigContainer.style.left = `calc(100% - 200px)`; // Posisi akhir

        // Selesai
        setTimeout(() => {
            infoStatus.innerHTML = "Status: SELESAI";
            sedangBergerak = false;
            disableControls(false);
        }, durasi);
    }

    function resetSimulasi() {
        sedangBergerak = false;
        
        // Reset posisi
        rigContainer.style.transition = 'none';
        rigContainer.style.left = POSISI_AWAL;
        rigContainer.offsetHeight; // Paksa browser render posisi
        
        infoStatus.innerHTML = "Status: SIAP";
        penjelasanArea.innerHTML = "<p>Atur slider <b>Gaya (F)</b> dan <b>Massa (m)</b>, lalu tekan 'Tarik Gerobak' untuk melihat percepatannya (a).</p>";
        
        disableControls(false);
        updateNilai(); // Update visual ke nilai slider saat ini
    }

    // 5. Fungsi Helper
    function disableControls(disabled) {
        allControls.forEach(control => {
            control.disabled = disabled;
        });
    }

    function tampilkanPenjelasan(teks) {
        penjelasanArea.innerHTML = ''; // Hapus penjelasan lama
        const p = document.createElement('p');
        p.innerHTML = teks;
        p.classList.add('penjelasan-teks');
        penjelasanArea.appendChild(p);
        
        penjelasanArea.scrollTop = penjelasanArea.scrollHeight;
    }

    // Panggil reset saat pertama kali memuat
    resetSimulasi();

});