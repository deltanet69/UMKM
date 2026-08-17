### Revisi Prototype GrowUMKM

Berdasarkan pengembangan penelitian terbaru, GrowUMKM akan difokuskan sebagai
Sistem Pendukung Keputusan (SPK) *pemasaran digital untuk UMK sektor kuliner*.

Secara desain utama tidak perlu diubah total. Namun, diperlukan penyesuaian pada alur
sistem agar rekomendasi yang diberikan bukan hanya berupa tips pemasaran, tetapi
merupakan hasil analisis kondisi usaha dan pemeringkatan strategi menggunakan metode
*Simple Additive Weighting (SAW)*.

## Flow yang diharapkan:
Profil Usaha → Analisis Kondisi Usaha → Proses SAW → Ranking Strategi → Detail
Rekomendasi → Task/Action Plan

## Revisi yang dibutuhkan:

1. Profil Usaha
Pertahankan halaman profil yang sudah ada, tetapi fokuskan kategori pada UMK Kuliner.
Tambahkan informasi dasar seperti jenis usaha kuliner, model penjualan, lokasi/jangkauan
pemasaran, dan layanan pemesanan/delivery.

2. Tambahkan halaman “Analisis Kondisi Usaha”
Halaman ini berupa questionnaire sederhana untuk mendapatkan input yang akan
digunakan dalam perhitungan SAW. Kriteria sementara mencakup anggaran pemasaran,
SDM, kesiapan konten, target konsumen, tujuan pemasaran, jangkauan pasar, kesiapan
digital, dan karakteristik produk kuliner.

Detail pertanyaan, skala nilai, serta bobot akan diberikan setelah hasil analisis penelitian
difinalisasi, sehingga untuk sementara struktur UI dapat dibuat fleksibel/dinamis.

3. Tambahkan proses perhitungan SAW di backend
Jawaban pengguna dikonversi menjadi nilai kriteria. Sistem kemudian melakukan
perhitungan SAW untuk membandingkan beberapa alternatif strategi pemasaran digital dan
menghasilkan nilai preferensi serta ranking.
Pengguna tidak perlu melihat matriks dan proses matematis SAW pada interface utama.

4. Tambahkan halaman “Hasil Rekomendasi”
Sistem menampilkan minimal 3 strategi dengan ranking tertinggi. Contoh tampilan:
- Instagram Organic — Kecocokan Tinggi
- WhatsApp Business — Kecocokan Tinggi
- Food Delivery Platform — Kecocokan Sedang

Jika diperlukan untuk kebutuhan penelitian/admin, nilai SAW dapat disimpan di database, tetapi tidak harus ditampilkan secara teknis kepada pengguna.
