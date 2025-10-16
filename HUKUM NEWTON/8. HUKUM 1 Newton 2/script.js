document.addEventListener("DOMContentLoaded", function() {

    // 1. Pilih semua elemen
    const siswa = document.getElementById('siswa');
    const gayaGesek = document.getElementById('gaya-gesek');
    const infoStatus = document.getElementById('info-status');
    const penjelasanArea = document.getElementById('penjelasan-area');
    const animationArea = document.getElementById('animation-area'); // Area animasi

    // Tombol
    const btnSkenarioEs = document.getElementById('btn-skenario-es');
    const btnSkenarioLantai = document.getElementById('btn-skenario-lantai');
    const btnReset = document.getElementById('btn-reset');
    const allButtons = document.querySelectorAll('.btn-skenario');

    // 2. Variabel status
    let sedangBergerak = false;

    // 3. Event Listeners untuk Tombol
    
    // SKENARIO 1: ES LICIN
    btnSkenarioEs.addEventListener('click', function() {
        if (sedangBergerak) return;
        sedangBergerak = true;
        disableAllButtons(true);
        
        resetSimulasi();
        animationArea.classList.add('lantai-es'); // Ganti latar
        
        tampilkanPenjelasan("<b>Skenario 1: Es Licin (Tanpa Gesekan)</b><br>1. Siswa diberi dorongan awal dan meluncur...");

        infoStatus.innerHTML = "Status: MELUNCUR (Konstan)<br>Gaya Gesek $\approx$ 0";
        
        // Animasi (Lama & Konstan)
        const durasiAnimasi = 4000; // 4 detik
        siswa.style.transition = `left ${durasiAnimasi}ms linear`;
        gayaGesek.style.transition = `opacity 0.5s, left ${durasiAnimasi}ms linear`;

        const pos1 = 'calc(100% - 90px)'; // 80px lebar siswa + 10px padding
        siswa.style.left = pos1;
        gayaGesek.style.left = `calc(${pos1} - 100px)`; // Ikut di belakang (tapi tetap hidden)

        // Selesai
        setTimeout(() => {
            tampilkanPenjelasan("2. Di permukaan es yang sangat licin (dianggap tanpa gesekan), siswa terus bergerak lurus beraturan.");
            sedangBergerak = false;
            disableAllButtons(false);
        }, durasiAnimasi);
    });

    // SKENARIO 2: LANTAI KASAR
    btnSkenarioLantai.addEventListener('click', function() {
        if (sedangBergerak) return;
        sedangBergerak = true;
        disableAllButtons(true);
        
        resetSimulasi();
        animationArea.classList.add('lantai-kasar'); // Ganti latar

        tampilkanPenjelasan("<b>Skenario 2: Lantai Kasar (Ada Gesekan)</b><br>1. Siswa diberi dorongan awal yang sama...");
        
        infoStatus.innerHTML = "Status: DIPERLAMBAT<br>Gaya Gesek bekerja!";
        gayaGesek.classList.add('visible'); // Tampilkan gaya gesek

        // Animasi (Cepat berhenti & Melambat)
        const durasiAnimasi = 2500; // 2.5 detik
        siswa.style.transition = `left ${durasiAnimasi}ms ease-out`; // ease-out = melambat
        gayaGesek.style.transition = `opacity 0.5s, left ${durasiAnimasi}ms ease-out`;

        const pos1 = '180px'; // Berhenti di tengah
        siswa.style.left = pos1;
        gayaGesek.style.left = `calc(${pos1} - 100px)`;

        // Selesai
        setTimeout(() => {
            infoStatus.innerHTML = "Status: DIAM";
            gayaGesek.classList.remove('visible');
            tampilkanPenjelasan("2. Gaya gesek (gaya luar) melawan arah gerak dan menghentikan siswa.");
            tampilkanPenjelasan("<b>Kesimpulan:</b> Gerak siswa berubah (dari bergerak menjadi diam) karena ada gaya luar, yaitu <b>Gaya Gesek</b>.", 'highlight');
            sedangBergerak = false;
            disableAllButtons(false);
        }, durasiAnimasi);
    });
    
    // TOMBOL RESET
    btnReset.addEventListener('click', function() {
        if (sedangBergerak) return;
        resetSimulasi();
        penjelasanArea.innerHTML = "<p>Pilih salah satu skenario untuk membandingkan gerak dengan dan tanpa gaya gesek.</p>";
    });


    // 4. Fungsi Helper
    function resetSimulasi() {
        siswa.style.transition = 'none';
        gayaGesek.style.transition = 'none';
        
        siswa.style.left = '10px';
        gayaGesek.style.left = '-100px';
        
        gayaGesek.classList.remove('visible');
        animationArea.classList.remove('lantai-es', 'lantai-kasar');
        
        infoStatus.innerHTML = "Status: SIAP";
        
        // Memaksa browser render ulang posisi
        siswa.offsetHeight; 
    }

    function disableAllButtons(disabled) {
        allButtons.forEach(button => {
            button.disabled = disabled;
        });
    }

    function tampilkanPenjelasan(teks, tipe = 'normal') {
        // Hapus teks placeholder
        if (penjelasanArea.childElementCount === 1 && penjelasanArea.firstChild.textContent.includes("Pilih salah satu")) {
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