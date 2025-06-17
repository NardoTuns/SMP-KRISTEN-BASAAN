const spreadsheetId = "1zsC8Hout2uDCsIz8P1PlVs5WSk1_xdIvkHghmHZY3nQ";
const sheetName = "Sheet1";
const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

let dataRows = [];

fetch(url)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;

    dataRows = rows.map(r => r.c.map(c => (c ? c.v : "")));

    populateKelasDropdown();
  });

function populateKelasDropdown() {
  const kelasSelect = document.getElementById("kelas");
  const rombels = [...new Set(dataRows.map(r => r[13]))].sort();
  kelasSelect.innerHTML = `<option value="">-- Pilih Kelas --</option>` +
    rombels.map(r => `<option value="${r}">${r}</option>`).join("");

  kelasSelect.addEventListener("change", handleKelasChange);
}

function handleKelasChange() {
  const kelas = document.getElementById("kelas").value;
  const namaSelect = document.getElementById("nama");
  const siswaKelas = dataRows.filter(r => r[13] === kelas);

  namaSelect.innerHTML = `<option value="">-- Pilih Nama --</option>` +
    siswaKelas.map(r => `<option value="${r[1]}">${r[1]}</option>`).join("");

  namaSelect.onchange = () => showProfil(siswaKelas.find(r => r[1] === namaSelect.value));
}

function showProfil(siswa) {
  if (!siswa) return;

  const profil = document.getElementById("profil");
  const labels = [
    "No", "Nama", "NIPD", "JK", "NISN", "Tempat Lahir", "Tanggal Lahir", "NIK", "Agama",
    "Ayah", "Ibu", "Wali", "Kelas", "KIP", "Nomor KIP", "Sekolah SD", "Berat", "Tinggi"
  ];

  profil.innerHTML = labels.map((label, i) => 
    `<p><strong>${label}:</strong> ${siswa[i] || "-"}</p>`
  ).join("");
}
