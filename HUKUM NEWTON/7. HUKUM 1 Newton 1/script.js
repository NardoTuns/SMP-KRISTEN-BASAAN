document.addEventListener("DOMContentLoaded", function() {

    // 1. Pilih semua elemen
    const mobil = document.getElementById('mobil');
    const gayaDorong = document.getElementById('gaya-dorong');
    const gayaGesek = document.getElementById('gaya-gesek');
    const infoStatus = document.getElementById('info-status');
    const penjelasanArea = document.getElementById('penjelasan-area'); // <-- Target scroll

    // Tombol
    const btnSkenario1 = document.getElementById('btn-skenario1');
    const btnSkenario2 = document.getElementById('btn-skenario2');
    const btnSkenario3 = document.getElementById('btn-skenario3');
    const btnReset = document.getElementById('btn-reset');
    const allButtons = document.querySelectorAll('.btn-skenario');

    // 2. Variabel status
    let sedangBergerak = false;

    // 3. Event Listeners untuk Tombol
    
    // SKENARIO 1: BENDA DIAM
    btnSkenario1.addEventListener('click', function() {
        if (sedangBergerak) return;
        
        resetMobil(); // Panggil reset dulu
        infoStatus.innerHTML = "Status: DIAM<br>Total Gaya ($\Sigma F$) = 0";
        tampilkanPenjelasan("<b>Skenario 1: Benda Diam</b><br>Benda yang diam akan tetap diam jika tidak ada total gaya (resultan gaya) yang bekerja padanya.");
    });

    // SKENARIO 2: BERGERAK IDEAL (TANPA GESEKAN)
    btnSkenario2.addEventListener('click', function() {
        if (sedangBergerak) return;
        sedangBergerak = true;
        disableAllButtons(true);
        
        resetMobil();
        tampilkanPenjelasan("<b>Skenario 2: Bergerak Ideal (Tanpa Gesekan)</b><br>1. Sebuah gaya dorong diberikan...");

        // Fase A: Dipercepat (1.5 detik)
        infoStatus.innerHTML = "Status: DIPERCEPAT<br>Total Gaya ($\Sigma F$) > 0";
        gayaDorong.classList.add('visible');
        mobil.style.transition = 'left 1.5s ease-in';
        gayaDorong.style.transition = 'opacity 0.5s, left 1.5s ease-in';
        gayaGesek.style.transition = 'opacity 0.5s, left 1.5s ease-in';
        
        // Pindahkan semua (mobil & panah)
        const pos1 = '120px';
        mobil.style.left = pos1;
        gayaDorong.style.left = `calc(${pos1} + 115px)`;
        gayaGesek.style.left = `calc(${pos1} - 100px)`;

        // Fase B: Bergerak Konstan (Ideal) (3 detik)
        setTimeout(() => {
            infoStatus.innerHTML = "Status: GERAK KONSTAN (Ideal)<br>Total Gaya ($\Sigma F$) = 0";
            gayaDorong.classList.remove('visible'); // Hilangkan gaya dorong
            tampilkanPenjelasan("2. Gaya dorong hilang. Di dunia ideal (tanpa gesekan), mobil terus bergerak lurus beraturan.");

            mobil.style.transition = 'left 3s linear';
            gayaDorong.style.transition = 'opacity 0.5s, left 3s linear';
            gayaGesek.style.transition = 'opacity 0.5s, left 3s linear';
            
            // Pindahkan ke ujung
            const pos2 = 'calc(100% - 110px)';
            mobil.style.left = pos2;
            gayaDorong.style.left = `calc(${pos2} + 115px)`;
            gayaGesek.style.left = `calc(${pos2} - 100px)`;

            // Selesai
            setTimeout(() => {
                sedangBergerak = false;
                disableAllButtons(false);
            }, 3000);
        }, 1500);
    });

    // SKENARIO 3: BERGERAK REALISTIS (DENGAN GESEKAN)
    btnSkenario3.addEventListener('click', function() {
        if (sedangBergerak) return;
        sedangBergerak = true;
        disableAllButtons(true);
        
        resetMobil();
        tampilkanPenjelasan("<b>Skenario 3: Bergerak Realistis (Dunia Nyata)</b><br>1. Sebuah gaya dorong diberikan...");

        // Fase A: Dipercepat (1.5 detik)
        infoStatus.innerHTML = "Status: DIPERCEPAT<br>Total Gaya ($\Sigma F$) > 0";
        gayaDorong.classList.add('visible');
        mobil.style.transition = 'left 1.5s ease-in';
        gayaDorong.style.transition = 'opacity 0.5s, left 1.5s ease-in';
        gayaGesek.style.transition = 'opacity 0.5s, left 1.5s ease-in';
        
        const pos1 = '120px';
        mobil.style.left = pos1;
        gayaDorong.style.left = `calc(${pos1} + 115px)`;
        gayaGesek.style.left = `calc(${pos1} - 100px)`;

        // Fase B: Diperlambat (Gesekan) (2.5 detik)
        setTimeout(() => {
            infoStatus.innerHTML = "Status: DIPERLAMBAT<br>Total Gaya ($\Sigma F$) < 0";
            gayaDorong.classList.remove('visible'); // Hilangkan gaya dorong
            gayaGesek.classList.add('visible'); // MUNCULKAN gaya gesek
            tampilkanPenjelasan("2. Gaya dorong hilang. Di dunia nyata, <b>Gaya Gesek</b> (gaya luar) menghentikan mobil.");

            mobil.style.transition = 'left 2.5s ease-out';
            gayaDorong.style.transition = 'opacity 0.5s, left 2.5s ease-out';
            gayaGesek.style.transition = 'opacity 0.5s, left 2.5s ease-out';
            
            // Berhenti di tengah
            const pos2 = '200px'; 
            mobil.style.left = pos2;
            gayaDorong.style.left = `calc(${pos2} + 115px)`;
            gayaGesek.style.left = `calc(${pos2} - 100px)`;

            // Fase C: Berhenti
            setTimeout(() => {
                infoStatus.innerHTML = "Status: DIAM<br>Total Gaya ($\Sigma F$) = 0";
                gayaGesek.classList.remove('visible');
                sedangBergerak = false;
                disableAllButtons(false);
                tampilkanPenjelasan("<b>Hukum 1 Newton:</b> Benda akan mempertahankan keadaannya (diam atau GLB) <b>KECUALI</b> ada total gaya luar yang bekerja padanya.", 'highlight');
            }, 2500);
        }, 1500);
    });
    
    // TOMBOL RESET
    btnReset.addEventListener('click', function() {
        if (sedangBergerak) return;
        resetMobil();
        penjelasanArea.innerHTML = "<p>Silakan tekan salah satu tombol skenario untuk memulai.</p>";
    });


    // 4. Fungsi Helper
    function resetMobil() {
        mobil.style.transition = 'none';
        gayaDorong.style.transition = 'none';
        gayaGesek.style.transition = 'none';
        
        mobil.style.left = '10px';
        gayaDorong.style.left = '115px'; // Posisi awal dorong
        gayaGesek.style.left = '-100px'; // Posisi awal gesek
        
        gayaDorong.classList.remove('visible');
        gayaGesek.classList.remove('visible');
        
        infoStatus.innerHTML = "Status: SIAP<br>Tekan tombol skenario.";
        
        // Memaksa browser render ulang posisi
        mobil.offsetHeight; 
    }

    function disableAllButtons(disabled) {
        allButtons.forEach(button => {
            button.disabled = disabled;
        });
    }

    // --- FUNGSI DIPERBAIKI ---
    function tampilkanPenjelasan(teks, tipe = 'normal') {
        // Hapus teks placeholder jika ada
        if (penjelasanArea.childElementCount === 1 && penjelasanArea.firstChild.textContent.includes("Silakan tekan")) {
            penjelasanArea.innerHTML = '';
        }

        const p = document.createElement('p');
        p.innerHTML = teks;
        p.classList.add('penjelasan-teks');

        if (tipe === 'highlight') {
            p.classList.add('penjelasan-highlight');
        }

        penjelasanArea.appendChild(p);
        
        // --- PERUBAHAN DI SINI ---
        // Ganti p.scrollIntoView dengan ini:
        // Ini akan men-scroll div 'penjelasanArea' ke paling bawah
        penjelasanArea.scrollTop = penjelasanArea.scrollHeight;
        // ------------------------
    }

    // Panggil reset saat pertama kali memuat
    resetMobil();
    disableAllButtons(false);

});