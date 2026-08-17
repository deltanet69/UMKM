### Contoh Penerapan GrowUMKM

Bayangkan pengguna membuka GrowUMKM dan profil usahanya sudah terdaftar sebagai:

Why Donuts
Kategori: Kuliner
Jenis Produk: Donat/Bakery
Model Penjualan: Online & Offline
Area Pemasaran: Lokal
Delivery: Tersedia

Dari sini user masuk ke fitur baru:

# Cari Strategi yang Cocok untuk Usahamu

1. Why Donuts mengisi "Analisis Kondisi Usaha"
Aplikasi tidak meminta user memahami SAW atau SWOT. Pertanyaannya dibuat sederhana.

Pertanyaan di aplikasi                                    |   Contoh jawaban Why Donuts
Berapa anggaran pemasaran digital yang tersedia?          |   Terbatas
Siapa yang mengelola pemasaran digital?                   |   Pemilik sendiri
Seberapa siap membuat foto/video secara rutin?            |   Cukup siap
Apa tujuan pemasaran utama?                               |   Meningkatkan penjualan
Siapa target konsumen utama?                              |   Remaja & keluarga
Seberapa luas jangkauan penjualan?                        |   Lokal
Seberapa aktif menggunakan digital marketing?             |   Cukup aktif
Bagaimana karakter produk?                                |   Visual menarik & cocok delivery


UI-nya bisa dibuat seperti questionnaire/card, bukan tabel seperti di atas.

Misalnya:
Apa tujuan utama pemasaran Why Donuts saat ini?
○ Meningkatkan awareness
● Meningkatkan penjualan
○ Mendapatkan pelanggan baru
○ Meningkatkan repeat order
○ Memperluas pasar

2. Jawaban tersebut menjadi input SAW
Di sinilah pekerjaan sistem dimulai.
User tidak melihat bagian ini.

Secara sederhana:
Jawaban Why Donuts
↓
Dikonversi menjadi nilai kriteria
↓
Dibandingkan dengan karakteristik masing-masing strategi
↓
SAW menghitung tingkat kesesuaian
↓
Strategi diranking

Sebagai contoh sementara, misalnya kriterianya:
C1 Anggaran
C2 SDM
C3 Kesiapan Konten
C4 Target Konsumen
C5 Tujuan Pemasaran
C6 Jangkauan Pasar
C7 Kesiapan Digital
C8 Karakteristik Produk Kuliner
Tim IT nantinya perlu membuat parameter tersebut fleksibel karena C1–C8 final masih bisa
berubah


3. Alternatif yang dibandingkan
GrowUMKM kemudian tidak langsung mengatakan "pakai Instagram".
Sistem membandingkan beberapa alternatif.

Misalnya:
A1 — Instagram Organic
A2 — Instagram Ads
A3 — TikTok Organic
A4 — WhatsApp Business
A5 — Food Delivery Platform
A6 — Marketplace
A7 — Collaboration/Endorsement
SAW menghitung alternatif mana yang paling sesuai dengan kondisi Why Donuts.



4. Contoh hasil SAW
Untuk kebutuhan demo, misalnya sistem memperoleh:

Ranking Alternatif                       | Nilai SAW | Tingkat Kesesuaian
1 Instagram Organic                      |  0,87     | Sangat Tinggi
2 WhatsApp Business                      |  0,82     | Sangat Tinggi
3 Food Delivery Platform                 |  0,78     | Tinggi
4 TikTok Organic                         |  0,72     | Tinggi
5 Instagram Ads                          |  0,61     | Sedang
6 Collaboration/Endorsement              |  0,55     | Sedang
7 Marketplace                            |  0,49     | Rendah

Penting: angka ini hanya dummy.
Tim IT boleh menggunakan dummy value untuk membangun UI/flow, tetapi jangan dianggap
sebagai bobot atau hasil penelitian final.


5. Yang dilihat pengguna
Nah, user tidak perlu melihat tabel SAW tadi.

Halaman GrowUMKM cukup menampilkan:
Strategi Terbaik untuk Why Donuts
Berdasarkan kondisi usahamu saat ini, GrowUMKM menemukan beberapa strategi yang
paling sesuai.

// Instagram Organic
Sangat Sesuai

Produk Why Donuts memiliki karakter visual yang kuat dan sesuai untuk dipromosikan
melalui konten foto/video. Strategi organik juga lebih sesuai dengan kondisi anggaran dan
kesiapan pemasaran saat ini.

// WhatsApp Business
Sangat Sesuai

Cocok untuk membantu komunikasi pelanggan, pemesanan, promosi kepada pelanggan
lama, dan mendorong repeat order.

// Food Delivery Platform
Tinggi
Karena Why Donuts sudah melayani delivery, penggunaan platform makanan online dapat
membantu menjangkau pasar yang lebih luas tanpa perlu membangun sistem delivery
sendiri.

6. Kemudian SWOT ikut menjelaskan hasilnya
Ini yang akan membuat GrowUMKM milikmu berbeda.

Setelah hasil SAW, tampilkan:
Kondisi Why Donuts

# Kekuatan Usahamu
Produk memiliki tampilan visual yang menarik dan cocok dijadikan konten digital.

# Yang Perlu Ditingkatkan
Pengelolaan pemasaran masih dilakukan sendiri sehingga konsistensi konten perlu
disesuaikan dengan kemampuan SDM.

# Peluang yang Bisa Dimanfaatkan
Karakter konsumen dan produk memungkinkan pemasaran melalui media sosial serta
layanan pemesanan digital.
 
# Hal yang Perlu Diantisipasi
Promosi berbayar membutuhkan anggaran dan evaluasi performa sehingga belum perlu
menjadi strategi utama jika sumber daya masih terbatas.

Secara akademis:

Kekuatan Usahamu = Strength
Yang Perlu Ditingkatkan = Weakness
Peluang = Opportunity
Perlu Diantisipasi = Threat
Tapi kata SWOT tidak harus muncul di UI.


7. GrowUMKM menjawab SWOT dengan rekomendasi
Jangan berhenti pada diagnosis.

Misalnya:

*Strength*: Produk visual menarik
→ Leverage: prioritaskan Instagram/Reels.
*Weakness*: SDM terbatas
→ Improve: pilih strategi yang masih dapat dikelola pemilik dan sederhanakan jadwal
konten.
*Opportunity*: Konsumen digital + delivery
→ Capture: kombinasikan social media dengan kanal pemesanan.
(Threat): biaya promosi/persaingan
→ Mitigate: jangan langsung menjadikan paid ads sebagai strategi utama.
Jadi pengguna melihat bahwa rekomendasi GrowUMKM punya alasan.


8. Detail rekomendasi Instagram Organic

Ketika user menekan:
[Lihat Strategi]

muncul:
- Instagram Organic
Rekomendasi Utama Why Donuts

Kenapa strategi ini cocok?
Produk Why Donuts memiliki karakter visual yang kuat, target konsumennya sesuai dengan
pemasaran berbasis media sosial, dan strategi organik relatif memungkinkan dijalankan
dengan kondisi sumber daya saat ini.

Kemudian:
- Fokus Strategi
- Awareness → Engagement → Order
- Lalu tombol: [Buat Action Plan]


9. Masuk ke "Tugas UMKM"
Nah, halaman yang sudah ada di prototype sekarang bisa digunakan.
Hanya logic-nya yang berubah.

GrowUMKM menghasilkan contoh:

*Task Minggu Ini*

Prioritas Utama
☐ Buat 3 konten Reels Why Donuts
☐ Buat foto produk/best seller
☐ Tambahkan CTA pemesanan WhatsApp
☐ Upload Story produk secara berkala
☐ Evaluasi konten dengan engagement tertinggi

Kemudian:
# Target
- 3 Reels
- 2/3 selesai
- 5 Instagram Stories
- 3/5 selesai

*Jadi task bukan random.*

Task muncul karena:
SAW → Instagram Organic #1 → action plan Instagram.


10. Dashboard Why Donuts ikut berubah
Dashboard yang sekarang sudah kamu punya tidak perlu dibuang.

Bagian tengah dapat tetap:
# Kondisi Usaha Saat Ini
27 Stok Tersedia
10 Produk Terjual
43% Performa

Kemudian di bawahnya:
# Rekomendasi Utama
- Instagram Organic
Strategi paling sesuai berdasarkan analisis kondisi Why Donuts.
[Lihat Detail]

Di bawahnya:
# Task Minggu Ini
3 dari 5 tugas selesai

Kemudian bisa ada:
Analisis terakhir: 11 Agustus 2026
[Analisis Ulang]


11. Bagaimana jika kondisi Why Donuts berubah?
Ini justru menunjukkan fungsi DSS.

Misalnya tiga bulan kemudian:
Why Donuts sudah memiliki admin marketing, konten sangat siap, anggaran pemasaran
meningkat, organic reach sudah bagus, dan ingin mendapatkan pelanggan baru.

User klik:
[Analisis Ulang]
SAW menghitung ulang.

Hasilnya bisa berubah, misalnya:
1. Instagram Ads
2. Instagram Organic
3. TikTok Organic

Artinya GrowUMKM tidak mengatakan:
"Semua UMK kuliner harus menggunakan Instagram Organic."

Tetapi:
strategi dipilih berdasarkan kondisi masing-masing UMK.
Ini menurutku inti GrowUMKM yang harus benar-benar terlihat dalam prototype.

12. Tampilan flow Why Donuts untuk diberikan ke IT
Kamu bisa kirim diagram sederhana ini:
WHY DONUTS
Profil Usaha
Kuliner • Donat/Bakery • Lokal
↓
Analisis Kondisi Usaha
Anggaran • SDM • Konten • Tujuan • Target • Jangkauan • Digital • Produk
↓
PROCESS SAW
(berjalan di sistem)
↓
Ranking Strategi
 Instagram Organic
 WhatsApp Business
 Food Delivery
↓
Mengapa Direkomendasikan?
↓
Kondisi Usaha
 Kekuatan
 Perlu Ditingkatkan
 Peluang
 Perlu Diantisipasi
↓
Action Plan
↓
Tugas UMKM
↓
Monitoring Dashboard
↓
Analisis Ulang