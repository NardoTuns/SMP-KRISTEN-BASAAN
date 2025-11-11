// !!! PENTING: GANTI DENGAN URL WEB APP ANDA (HARUS SAMA DENGAN login.js) !!!
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyC0rL42XdUs0zHtzd79Q4351BpC-USLPBI5a5dv9OxxjBNZ-m9SMYpoSOgP6lkRhkP7Q/exec'; // <--- PASTE URL ANDA DI SINI

document.addEventListener('DOMContentLoaded', () => {
    const judulUjian = document.getElementById('judul-ujian');
    const infoSiswa = document.getElementById('info-siswa');
    const pdfViewer = document.getElementById('pdf-viewer');
    const lembarJawabanDiv = document.getElementById('lembar-jawaban');
    const selesaiBtn = document.getElementById('selesai-btn');

    // 1. Ambil data dari localStorage
    const ujianDataString = localStorage.getItem('ujianData');
    if (!ujianDataString) {
        alert('Anda belum login! Silakan login terlebih dahulu.');
        window.location.href = 'index.html';
        return;
    }

    const ujianData = JSON.parse(ujianDataString);
    const { nama, kelas, mapel, kunci } = ujianData;
    const kunciArray = kunci.split(',');
    const jumlahSoal = kunciArray.length;

    // 2. Setel info halaman
    judulUjian.textContent = `Ujian Mata Pelajaran: ${mapel}`;
    infoSiswa.textContent = `Siswa: ${nama} (${kelas})`;
    
    // Setel sumber PDF (pastikan nama file PDF sama dengan 'mapel')
    pdfViewer.src = `${mapel}.pdf`;

    // 3. Buat lembar jawaban
    generateLembarJawaban(jumlahSoal);

    function generateLembarJawaban(totalSoal) {
        let html = '';
        for (let i = 1; i <= totalSoal; i++) {
            html += `
                <div class="soal-item">
                    <span class="nomor-soal">${i}.</span>
                    <label><input type="radio" name="soal${i}" value="A"> A</label>
                    <label><input type="radio" name="soal${i}" value="B"> B</label>
                    <label><input type="radio" name="soal${i}" value="C"> C</label>
                    <label><input type="radio" name="soal${i}" value="D"> D</label>
                    <label><input type="radio" name="soal${i}" value="E"> E</label>
                </div>
            `;
        }
        lembarJawabanDiv.innerHTML = html;
    }

    // 4. Saat tombol selesai diklik
    selesaiBtn.addEventListener('click', () => {
        if (!confirm('Apakah Anda yakin ingin menyelesaikan ujian ini? Jawaban tidak dapat diubah lagi.')) {
            return;
        }

        // Kumpulkan jawaban
        const jawabanSiswa = [];
        for (let i = 1; i <= jumlahSoal; i++) {
            const jawaban = document.querySelector(`input[name="soal${i}"]:checked`);
            jawabanSiswa.push(jawaban ? jawaban.value : null);
        }

        // Hitung skor
        let benar = 0;
        let salah = 0;
        let tidakDijawab = 0;

        for (let i = 0; i < jumlahSoal; i++) {
            if (jawabanSiswa[i] == null) {
                tidakDijawab++;
            } else if (jawabanSiswa[i] === kunciArray[i]) {
                benar++;
            } else {
                salah++;
            }
        }

        const skor = (benar / jumlahSoal) * 100;

        // Siapkan data untuk dikirim
        const hasilData = {
            action: 'submitHasil',
            nama: nama,
            kelas: kelas,
            mapel: mapel,
            benar: benar,
            salah: salah,
            tidakDijawab: tidakDijawab,
            skor: parseFloat(skor.toFixed(2)) // Skor 2 angka desimal
        };
        
        selesaiBtn.disabled = true;
        selesaiBtn.textContent = 'Mengirim hasil...';

        // Kirim hasil ke Google Apps Script
        fetch(GAS_URL, {
            method: 'POST',
            body: JSON.stringify(hasilData),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            }
        })
        .then(response => response.json())
        .then(result => {
            if (result.status === 'sukses') {
                alert(`Ujian Selesai!\n\nSkor Anda: ${hasilData.skor}\nBenar: ${benar}\nSalah: ${salah}\nTidak Dijawab: ${tidakDijawab}`);
                // Hapus data dari localStorage
                localStorage.removeItem('ujianData');
                // Kembali ke halaman login
                window.location.href = 'index.html';
            } else {
                alert('Gagal menyimpan hasil: ' + result.message);
                selesaiBtn.disabled = false;
                selesaiBtn.textContent = 'Selesai & Kumpulkan';
            }
        })
        .catch(error => {
            alert('Error: ' + error.message);
            selesaiBtn.disabled = false;
            selesaiBtn.textContent = 'Selesai & Kumpulkan';
        });
    });
});