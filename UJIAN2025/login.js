// !!! PENTING: GANTI DENGAN URL WEB APP ANDA !!!
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyC0rL42XdUs0zHtzd79Q4351BpC-USLPBI5a5dv9OxxjBNZ-m9SMYpoSOgP6lkRhkP7Q/exec'; // <--- PASTE URL ANDA DI SINI

const kelasSelect = document.getElementById('kelas');
const namaSelect = document.getElementById('nama');
const mapelSelect = document.getElementById('mapel');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const loadingDiv = document.getElementById('loading');

let allSiswa = [];

// 1. Saat halaman dimuat, ambil data siswa
document.addEventListener('DOMContentLoaded', () => {
    // Hapus data ujian lama jika ada
    localStorage.removeItem('ujianData');

    fetch(GAS_URL + "?action=getSiswa")
        .then(response => response.json())
        .then(data => {
            allSiswa = data;
            populateKelas(data);
        })
        .catch(error => {
            console.error('Error fetching siswa:', error);
            kelasSelect.innerHTML = '<option value="">Gagal memuat data</option>';
        });
});

// 2. Isi dropdown kelas
function populateKelas(siswaData) {
    const kelasSet = new Set(siswaData.map(siswa => siswa.kelas));
    const unikKelas = [...kelasSet].sort();
    
    kelasSelect.innerHTML = '<option value="">-- Pilih Kelas --</option>';
    unikKelas.forEach(kelas => {
        const option = document.createElement('option');
        option.value = kelas;
        option.textContent = kelas;
        kelasSelect.appendChild(option);
    });
}

// 3. Saat kelas dipilih, isi dropdown nama
kelasSelect.addEventListener('change', () => {
    const selectedKelas = kelasSelect.value;
    namaSelect.innerHTML = '<option value="">-- Pilih Nama --</option>';
    
    if (selectedKelas) {
        const siswaDiKelas = allSiswa
            .filter(siswa => siswa.kelas === selectedKelas && siswa.status === 'Aktif')
            .sort((a, b) => a.nama.localeCompare(b.nama)); // Urutkan nama
            
        siswaDiKelas.forEach(siswa => {
            const option = document.createElement('option');
            option.value = siswa.nama;
            option.textContent = siswa.nama;
            namaSelect.appendChild(option);
        });
        namaSelect.disabled = false;
    } else {
        namaSelect.disabled = true;
    }
});

// 4. Saat tombol login diklik
loginBtn.addEventListener('click', () => {
    const nama = namaSelect.value;
    const kelas = kelasSelect.value;
    const mapel = mapelSelect.value;
    const password = passwordInput.value;

    if (!nama || !kelas || !mapel || !password) {
        alert('Semua field harus diisi!');
        return;
    }

    loadingDiv.classList.remove('hidden');
    loginBtn.disabled = true;

    const data = {
        action: 'login',
        nama: nama,
        kelas: kelas,
        password: password,
        mapel: mapel
    };

    fetch(GAS_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'text/plain;charset=utf-8',
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === 'sukses') {
            // Simpan data ujian ke localStorage untuk dibawa ke halaman ujian
            localStorage.setItem('ujianData', JSON.stringify({
                nama: nama,
                kelas: kelas,
                mapel: mapel,
                kunci: result.kunci // Kunci jawaban dari GAS
            }));
            // Pindah ke halaman ujian
            window.location.href = 'ujian.html';
        } else {
            alert('Login Gagal: ' + result.message);
            loadingDiv.classList.add('hidden');
            loginBtn.disabled = false;
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
        loadingDiv.classList.add('hidden');
        loginBtn.disabled = false;
    });
});