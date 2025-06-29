Aturan Prompt untuk AI (GEMINI.md)
Dokumen ini berisi panduan dan aturan yang harus diikuti oleh AI selama proses pengembangan aplikasi.

1. Prinsip Umum
   Bahasa: Gunakan Bahasa Indonesia untuk semua penjelasan dan instruksi. Gunakan Bahasa Inggris untuk semua penulisan kode.

Asumsi: Jangan membuat asumsi secara mandiri. Semua keputusan pengembangan harus didasarkan pada data dan instruksi yang telah diberikan (misalnya, file JSON API, daftar tugas, dll).

Referensi Dependensi: Selalu periksa file package.json untuk mengetahui package apa saja yang didukung dan tersedia dalam proyek sebelum menambahkan atau menggunakan dependensi baru.

Referensi ke folder context:

- UI.json
- API.json
- taks.json
- monitoring-taks.json

Output Akhir: Selalu berikan hasil akhir secara lengkap, termasuk struktur folder dan semua file yang relevan.

2. Alur Kerja & Struktur Proyek
   Urutan Pengerjaan: Ikuti urutan pengerjaan berikut secara ketat:

Buat Store terlebih dahulu.

Buat Component jika diperlukan.

Buat Page sebagai langkah terakhir setelah store dan komponen siap.

Struktur Folder: Patuhi struktur folder yang telah ditentukan:

/store ➡️ Semua state management non-global atau yang spesifik untuk fitur.

/context ➡️ (Referensi Utama) Kumpulan context untuk state global aplikasi. Folder ini adalah sumber kebenaran bagi AI untuk memahami alur aplikasi, seperti otentikasi, informasi pengguna, dan tema.

/components ➡️ Komponen UI yang dapat digunakan kembali.

/pages atau /app ➡️ Halaman utama aplikasi.

/utils ➡️ Fungsi-fungsi yang dapat digunakan kembali (helper functions).

Penamaan File:

Store: camelCase atau useCamelCase.js / .ts

Component: PascalCase, contoh: MyComponent.jsx / .tsx

3. Penanganan Error & Dependensi
   Koreksi Error: Jika terjadi error pada kode, AI wajib memperbaikinya terlebih dahulu sebelum melanjutkan ke tugas berikutnya.

Pemeriksaan Import: Pastikan semua dependency atau import sudah sesuai dan tidak ada yang kurang.

Penggunaan Context API: Jika proyek memiliki context API, AI harus membaca file context-api.txt (jika ada) sebelum mulai membuat kode untuk memahami implementasi yang sudah ada.

4. Prosedur & Output
   Update monitoring-tasks.json:

Setelah menyelesaikan sebuah tugas, AI wajib memperbarui file monitoring-tasks.json.

Ubah status tugas yang relevan (misalnya, dari in-progress menjadi completed).

Tetapkan tugas berikutnya dalam antrian ke status in-progress.

Perbarui timestamp lastUpdated ke waktu saat ini.

Hitung ulang bagian summary (total, completed, inProgress, pending).
