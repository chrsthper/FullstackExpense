# Expense Tracker Documentation

Nama Anggota dari Kelompok 3:

* Ahmad Fauzan Rinaufaldi (5026221143)
* Christopher C. Pangaribuan (5026221150)
* Andika Insan Patria (5026221211)
* Edward Yosafat Sirait (5026221091)

## Deskripsi

![Landing Page Screenshot](docs/images/landing_page.png) FullstackExpense adalah aplikasi web yang dirancang untuk membantu pengguna mengelola keuangan pribadi mereka dengan melacak pendapatan dan pengeluaran secara efektif. Proyek ini mengadopsi pendekatan *full-stack*, mengombinasikan *backend* yang kuat yang dibangun dengan Node.js dan Express.js untuk melayani *frontend* yang interaktif yang dikembangkan menggunakan HTML, CSS, dan JavaScript murni.

Pusat dari aplikasi ini adalah integrasinya dengan Google Firebase, yang menyediakan layanan autentikasi pengguna yang aman dan kemampuan basis data NoSQL (Firestore) untuk menyimpan data transaksi secara *real-time*. Ini memastikan bahwa data keuangan pengguna selalu terbaru dan aman.

Selain fungsionalitas inti pelacakan keuangan, FullstackExpense juga menonjolkan *pipeline* DevOps yang komprehensif. Ini mencakup konfigurasi *Continuous Integration* (CI) menggunakan GitHub Actions untuk otomatisasi linting kode (ESLint), pengujian unit (Jest), dan analisis kualitas kode (SonarCloud). Untuk *Continuous Deployment* (CD), aplikasi secara otomatis membangun citra Docker dan menyebarkannya ke Google Cloud Run, memastikan *deployment* yang efisien dan andal.

Secara keseluruhan, FullstackExpense bertujuan untuk menyediakan alat yang *user-friendly* dan andal bagi individu untuk memvisualisasikan dan mengelola kesehatan finansial mereka, didukung oleh infrastruktur yang modern dan otomatis.

Link Repository kami: [https://github.com/chrsthper/FullstackExpense](https://github.com/chrsthper/FullstackExpense)

## Tools dan Software yang Digunakan

Proyek FullstackExpense memanfaatkan kombinasi *tools* dan *software* modern untuk memfasilitasi pengembangan, pengujian, dan *deployment* aplikasi. Berikut adalah rinciannya:

### Pengembangan Aplikasi

* **Node.js**: Lingkungan *runtime* JavaScript *open-source* yang digunakan untuk membangun *backend* aplikasi.
* **Express.js**: *Framework* aplikasi web minimalis dan fleksibel untuk Node.js, digunakan untuk mengelola rute server dan menyajikan file statis.
* **HTML, CSS, JavaScript**: Bahasa dasar untuk membangun *frontend* aplikasi web.
* **Visual Studio Code (VS Code)**: *Code editor* yang digunakan untuk pengembangan.

### Manajemen Basis Data dan Autentikasi

* **Google Firebase**: Platform pengembangan aplikasi seluler dan web dari Google yang menyediakan berbagai layanan.
    * **Firebase Authentication**: Digunakan untuk pendaftaran dan *login* pengguna yang aman.
    * **Cloud Firestore**: Basis data NoSQL berbasis *cloud* yang digunakan untuk menyimpan data transaksi dan informasi pengguna secara *real-time*.

### Version Control

* **Git**: Sistem kontrol versi terdistribusi yang digunakan untuk melacak perubahan kode sumber.
* **GitHub Repository**: Platform *hosting* kode berbasis Git untuk kolaborasi dan manajemen repositori.

### Pengujian dan Kualitas Kode

* **Jest**: *Framework* pengujian JavaScript yang digunakan untuk tes unit dan integrasi.
* **ESLint**: Alat analisis kode statis untuk mengidentifikasi pola bermasalah yang ditemukan dalam kode JavaScript.
* **SonarCloud**: Platform kualitas kode yang digunakan untuk analisis statis, keamanan, dan cakupan kode.

### DevOps (CI/CD)

* **GitHub Actions**: Alat otomatisasi CI/CD terintegrasi GitHub yang digunakan untuk mengotomatiskan alur kerja pengembangan *software*.
* **Docker**: Platform untuk mengembangkan, mengirim, dan menjalankan aplikasi dalam wadah (kontainer). Digunakan untuk membangun dan mengemas aplikasi ke dalam citra Docker.
* **Google Cloud Platform (GCP)**: Layanan *cloud* yang digunakan untuk *deployment* aplikasi.
    * **Google Cloud Build**: Digunakan untuk membangun citra Docker dari kode sumber.
    * **Google Artifact Registry**: Digunakan untuk menyimpan citra Docker yang telah dibangun.
    * **Google Cloud Run**: Layanan komputasi terkelola tanpa server yang memungkinkan *deployment* aplikasi dalam kontainer yang dapat diskalakan.
    * **Cloud Logging & Monitoring**: Digunakan untuk memantau dan mencatat aktivitas aplikasi setelah *deployment*.

## Penjelasan Tools

### Google Spreadsheet

![Google Spreadsheet Screenshot](docs/images/google_spreadsheet.jpg) Google Spreadsheet digunakan sebagai alat bantu kolaboratif yang fundamental dalam mengelola proyek DevOps secara efisien. Dengan fleksibilitas dan kemampuan kolaborasi *real-time*, Google Spreadsheet memfasilitasi pencatatan dan pemantauan tugas (*task*), linimasa (*timeline*), serta status pekerjaan secara transparan. Spreadsheet ini dirancang secara khusus untuk mendukung prinsip DevOps yang menekankan integrasi yang erat antara tim pengembangan (*development*) dan tim operasional (*operations*).

Dalam penggunaannya, kami mengadopsi format tabular untuk menyusun tugas berdasarkan kategori status, seperti *backlog*, *in progress*, *testing*, dan *done*, yang sangat serupa dengan pendekatan Kanban. Setiap entri tugas di dalam *spreadsheet* ini mencakup informasi penting, termasuk deskripsi tugas, penanggung jawab, prioritas, tenggat waktu, dan status terkini. Melalui fitur-fitur bawaan Google Spreadsheet seperti filter, *conditional formatting*, dan kemampuan kolaborasi simultan, seluruh tim dapat menjaga visibilitas proyek yang tinggi dan meningkatkan akuntabilitas antar anggota tim. Ini memungkinkan pemangku kepentingan untuk melihat kemajuan proyek secara sekilas, mengidentifikasi hambatan, dan membuat keputusan yang tepat waktu.

### GitHub

![GitHub Repository Screenshot](docs/images/github_repo.png) GitHub adalah platform *hosting* repositori Git berbasis *cloud* yang memainkan peran sentral dalam proyek FullstackExpense untuk manajemen kontrol versi, kolaborasi tim, dan integrasi dengan alur kerja DevOps. Penggunaan GitHub memastikan bahwa semua perubahan kode terlacak, terdokumentasi, dan dapat dikelola dengan efisien sepanjang siklus pengembangan.

Berikut adalah aspek-aspek utama dari penggunaan GitHub dalam proyek ini:

* **Kontrol Versi Terdistribusi**: GitHub menyimpan repositori Git proyek, yang memungkinkan tim untuk melacak setiap perubahan pada *codebase*, kembali ke versi sebelumnya jika diperlukan, dan mengelola berbagai fitur secara paralel menggunakan *branching*.
* **Kolaborasi Tim**: Platform ini memfasilitasi kolaborasi yang lancar antar pengembang. Anggota tim dapat bekerja pada fitur yang berbeda secara bersamaan, menggabungkan perubahan mereka melalui *pull request* (*merge request*), dan melakukan *code review* untuk memastikan kualitas kode.
* **Manajemen Repositori**: GitHub menyediakan antarmuka yang intuitif untuk mengelola repositori, termasuk fitur untuk isu (*issues*), *pull request*, dan *wiki*, meskipun fokus utama di sini adalah kontrol versi dan CI/CD.
* **Integrasi CI/CD dengan GitHub Actions**: Salah satu penggunaan paling krusial dari GitHub dalam proyek ini adalah integrasinya dengan GitHub Actions. Ini adalah fitur CI/CD bawaan GitHub yang memungkinkan otomatisasi alur kerja pembangunan, pengujian, dan *deployment* langsung dari repositori. Setiap *push* atau *pull request* memicu *workflow* otomatis untuk memastikan kode memenuhi standar kualitas dan siap untuk *deployment*.

## Langkah Proses

Pada bagian ini, akan dijelaskan langkah-langkah dalam mempersiapkan dan mengimplementasikan masing-masing *tools* dalam *DevOps pipeline* proyek FullstackExpense.

### GitHub
GitHub adalah platform *hosting* repositori Git berbasis *cloud* yang memainkan peran sentral dalam proyek FullstackExpense untuk manajemen kontrol versi, kolaborasi tim, dan integrasi dengan alur kerja DevOps.

* **Membuat akun GitHub**: Pastikan Anda memiliki akun GitHub yang terdaftar di [https://github.com/](https://github.com/).
* **Membuat Repositori Baru**: Setelah *login*, buat repositori baru untuk proyek FullstackExpense Anda.
* **Melakukan *Clone* Repositori**: *Clone* repositori yang telah dibuat ke mesin lokal Anda.
* **Pengembangan Kode**: Setelah proses *cloning*, Anda dapat memulai pengembangan aplikasi. Penting untuk menerapkan *best practice* untuk *branching* dan *commit naming* agar kontrol versi berjalan rapi dan efektif.
    * Pada proyek FullstackExpense, kami menggunakan *branch* `main` sebagai *branch* utama yang menyimpan kode yang siap untuk *deployment*.
    * Cabang pengembangan lainnya seperti `dev`, `staging`, dan `stage` juga digunakan untuk siklus pengembangan dan pengujian yang berbeda.
* **Melakukan *Pull Request***: Setelah menyelesaikan pengembangan fitur pada *branch* tertentu (misalnya `dev` atau `staging`), Anda akan membuat *pull request* (*merge request*) ke *branch* `main` untuk mengintegrasikan perubahan kode. Proses ini akan memicu *workflow* CI/CD otomatis.

### Node.js & Express.js

Node.js dan Express.js membentuk inti dari *backend* aplikasi FullstackExpense, menyediakan server web dan API yang diperlukan.

* **Instalasi Node.js**: Pastikan Node.js sudah terinstal di mesin lokal Anda. Anda dapat mengunduhnya dari situs resmi Node.js.
* **Inisiasi Proyek**:
    * Buat folder baru untuk proyek Anda (jika belum ada).
    * Inisiasi proyek Node.js dengan perintah `npm init -y` di terminal.
* **Instalasi Express.js**: Di dalam folder proyek, instal Express.js dengan perintah `npm install express`.
* **Dependencies Tambahan**:
    * Instal dependensi lain yang diperlukan untuk proyek Anda, seperti `firebase` untuk interaksi dengan layanan Firebase.
* **Struktur Kode Backend**:
    * Proyek ini menggunakan `app.js` untuk mengonfigurasi Express.js, termasuk penyajian file statis dari direktori `public` dan mendefinisikan rute utama.
    * `server.js` berfungsi sebagai titik masuk untuk memulai server Node.js dan mendengarkan permintaan masuk.

**Gambar X.X: Tampilan File `server.js` sebagai Titik Masuk Aplikasi Node.js**
![server.js screenshot](docs/images/server_js.png) **Gambar X.X: Tampilan File `app.js` untuk Konfigurasi Express.js**
![app.js screenshot](docs/images/app_js.png) ### Firebase
Firebase adalah platform *backend-as-a-service* yang digunakan untuk autentikasi dan basis data *real-time* (Cloud Firestore) di FullstackExpense.

* **Membuat Proyek Firebase**:
    * Kunjungi Firebase Console ([console.firebase.google.com](https://console.firebase.google.com/)) dan buat proyek baru.
    * Ikuti langkah-langkah untuk menambahkan aplikasi web ke proyek Firebase Anda.
* **Mengonfigurasi Firebase SDK**:
    * Dapatkan konfigurasi Firebase Anda (apiKey, authDomain, projectId, dll.) dari pengaturan proyek di Firebase Console.
    * Masukkan konfigurasi ini ke dalam file `public/js/firebase-config.js` di proyek Anda. Meskipun ada nilai *placeholder* di file tersebut, disarankan untuk mengelola detail sensitif menggunakan variabel lingkungan untuk *deployment*.
* **Mengaktifkan Layanan Autentikasi**: Di Firebase Console, aktifkan penyedia autentikasi yang Anda inginkan (misalnya, *Email/Password*) di bagian *Authentication*.
* **Mengaktifkan Cloud Firestore**: Di Firebase Console, atur Cloud Firestore dan buat koleksi `users` dan `entries` untuk menyimpan data aplikasi.

**Gambar X.X: Tampilan File `firebase-config.js` untuk Konfigurasi Firebase**
![firebase-config.js screenshot](docs/images/firebase_config_js.png) **Gambar X.X: Contoh Penggunaan Firebase Authentication di `signup.js`**
![signup.js auth screenshot](docs/images/signup_js_auth.png) **Gambar X.X: Contoh Penggunaan Cloud Firestore di `expense.js`**
![expense.js firestore screenshot](docs/images/expense_js_firestore.png) ### GitHub Actions
GitHub Actions digunakan untuk mengotomatisasi *pipeline* CI/CD, memastikan setiap perubahan kode diuji dan di-deploy secara otomatis.

* **Membuat Folder *Workflows***: Di repositori GitHub Anda, buat folder `.github/workflows`.
* **Membuat File YAML untuk *Pipeline***:
    * Buat file `ci.yml` di dalam folder `.github/workflows`. File ini mendefinisikan *pipeline Continuous Integration*.
    * Buat file `cd.yml` di dalam folder `.github/workflows`. File ini mendefinisikan *pipeline Continuous Deployment*.
* **Konfigurasi CI (`ci.yml`)**:
    * **Pemicu**: Akan dijalankan pada `push` dan `pull_request` ke *branch* `main`, `dev`, `staging`, dan `stage`.
    * **Jobs**:
        * **ESLint Linting**: Melakukan pemeriksaan ESLint untuk memastikan kualitas dan konsistensi kode.
        * **Jest Testing**: Menjalankan semua tes unit dan integrasi menggunakan Jest.
        * **SonarCloud Analysis**: Melakukan pemindaian SonarCloud untuk analisis kualitas dan keamanan kode, termasuk pengumpulan cakupan kode.
        * **Docker Build and Push to GCR**: Membangun citra Docker dan mendorongnya ke Google Container Registry (GCR).
* **Konfigurasi CD (`cd.yml`)**:
    * **Pemicu**: Akan dijalankan setelah *workflow* CI selesai dengan sukses, khususnya jika berasal dari *branch* `main`.
    * **Job**:
        * **Deploy to Cloud Run**: Menerapkan citra Docker terbaru dari GCR ke Google Cloud Run.

**Gambar X.X: Tampilan File `ci.yml` (Continuous Integration Workflow)**
![ci.yml screenshot](docs/images/ci_yml.png) **Gambar X.X: Tampilan File `cd.yml` (Continuous Deployment Workflow)**
![cd.yml screenshot](docs/images/cd_yml.png) ### Docker
Docker digunakan untuk mengemas aplikasi dan lingkungannya ke dalam kontainer, memastikan konsistensi dan portabilitas.

* **Instalasi Docker Desktop**: Unduh dan instal Docker Desktop dari [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/).
* **Membuat Dockerfile**: Di *root* repositori Anda, buat file bernama `Dockerfile`. File ini berisi instruksi untuk membangun citra Docker aplikasi Anda. Dockerfile akan menyalin kode sumber, menginstal dependensi, dan mengatur perintah untuk menjalankan aplikasi.
* **Penggunaan Variabel Lingkungan**: Untuk mengelola variabel lingkungan (seperti kunci API Firebase), pastikan aplikasi Anda dapat membaca dari lingkungan saat runtime di dalam kontainer Docker. Dalam proyek ini, variabel lingkungan dikelola melalui GitHub Actions *secrets* dan kemudian diakses oleh aplikasi saat di-deploy ke Cloud Run.
* **Integrasi dengan CI/CD**: Proses pembangunan dan pendorongan citra Docker sepenuhnya diotomatisasi dalam *workflow* CI GitHub Actions (`ci.yml`) setelah semua pemeriksaan kualitas kode dan pengujian berhasil.

**Gambar X.X: Tampilan File `Dockerfile`**
![Dockerfile screenshot](docs/images/Dockerfile.png) ### SonarCloud
SonarCloud diintegrasikan untuk analisis kualitas kode berkelanjutan dan pelaporan keamanan.

* **Membuat Akun SonarCloud**: Kunjungi [https://sonarcloud.io/](https://sonarcloud.io/) dan *login* menggunakan akun GitHub Anda.
* **Menghasilkan Token SonarCloud**: Di SonarCloud, masuk ke **My Account > Security** dan buat *generate* token baru. Simpan token ini dengan aman.
* **Menambahkan Secret di GitHub**: Di repositori GitHub Anda, buka **Settings > Secrets and variables > Actions**. Tambahkan *secret* baru dengan nama `SONAR_TOKEN` dan tempelkan token SonarCloud yang telah Anda hasilkan sebagai nilainya.
* **Mengonfigurasi `sonar-project.properties`**: Buat file `sonar-project.properties` di *root* repositori Anda. Konfigurasikan detail proyek Anda (projectKey, organization, sources, exclusions, dan reportPaths untuk cakupan kode LCOV).
* **Integrasi ke GitHub Actions**: Pastikan *workflow* `ci.yml` Anda menyertakan langkah untuk menjalankan pemindaian SonarCloud setelah pengujian selesai, menggunakan `SonarSource/sonarqube-scan-action` dan `SONAR_TOKEN`.

**Gambar X.X: Tampilan File `sonar-project.properties`**
![sonar-project.properties screenshot](docs/images/sonar_project_properties.png) ### Google Cloud Platform (GCP)
GCP adalah *cloud provider* tempat aplikasi FullstackExpense di-deploy dan dijalankan.

* **Membuat Akun dan Proyek di Google Cloud**:
    * Kunjungi Google Cloud Console ([console.cloud.google.com](https://console.cloud.google.com/)) dan daftar/masuk.
    * Buat proyek baru di GCP. Catat Project ID Anda.
* **Membuat *Service Account***:
    * Di GCP, buat *service account* baru.
    * Berikan peran yang diperlukan kepada *service account* ini, seperti `Storage Admin`, `Cloud Run Admin`, dan `Service Account User`, agar GitHub Actions memiliki izin yang cukup untuk membangun dan mendeploy.
    * Buat kunci JSON untuk *service account* ini dan unduh file JSON-nya. Simpan konten JSON ini sebagai *secret* GitHub (`GCP_CREDENTIALS`).
* **Mengaktifkan API yang Diperlukan**: Pastikan API seperti **Cloud Build API**, **Artifact Registry API**, dan **Cloud Run API** diaktifkan di proyek GCP Anda.
* **Google Artifact Registry**:
    * Di GCP Console, navigasikan ke **Artifact Registry** dan buat repositori Docker baru untuk menampung citra aplikasi Anda.
    * Citra Docker akan secara otomatis didorong ke repositori ini oleh *workflow* CI GitHub Actions.
* **Google Cloud Run**:
    * Di GCP Console, navigasikan ke **Cloud Run**.
    * *Deployment* aplikasi ke Cloud Run akan diotomatisasi oleh *workflow* CD GitHub Actions (`cd.yml`). *Workflow* tersebut akan memilih citra terbaru dari Artifact Registry dan mendeploy-nya sebagai layanan Cloud Run baru.
    * Konfigurasi *deployment* akan mencakup wilayah (`GCP_REGION`) dan pengaturan akses (misalnya, `--allow-unauthenticated` untuk akses publik).
* **Cloud Logging & Monitoring**:
    * Setelah di-deploy ke Cloud Run, aplikasi Anda akan secara otomatis mengirim log ke Cloud Logging, dan metrik kinerja akan tersedia di Cloud Monitoring.
    * Anda dapat mengakses *dashboard* di GCP Console untuk memantau log aplikasi, metrik seperti latensi dan penggunaan CPU, serta mengatur *alert* untuk insiden.

**Gambar X.X: Tampilan Google Cloud Console Dashboard**
![GCP Dashboard screenshot](docs/images/gcp_dashboard.png) **Gambar X.X: Tampilan Google Cloud IAM & Admin (Service Accounts)**
![GCP Service Accounts screenshot](docs/images/gcp_service_accounts.png) **Gambar X.X: Tampilan Google Artifact Registry**
![GCP Artifact Registry screenshot](docs/images/gcp_artifact_registry.png) **Gambar X.X: Tampilan Google Cloud Run Services**
![GCP Cloud Run Services screenshot](docs/images/gcp_cloud_run_services.png) **Gambar X.X: Tampilan Google Cloud Logging**
![GCP Cloud Logging screenshot](docs/images/gcp_cloud_logging.png) **Gambar X.X: Tampilan Google Cloud Monitoring**
![GCP Cloud Monitoring screenshot](docs/images/gcp_cloud_monitoring.png) ## Penjelasan Pipeline CI/CD

Proyek FullstackExpense mengimplementasikan *Continuous Integration/Continuous Deployment* (CI/CD) yang komprehensif melalui GitHub Actions, yang mengotomatiskan seluruh siklus dari *commit* kode hingga *deployment* aplikasi. *Pipeline* ini dirancang untuk memastikan kualitas, keamanan, dan pengiriman *software* yang efisien.

Berikut adalah rincian tahapan *pipeline* yang dikonfigurasi dalam proyek ini:

### 1. Fase Continuous Integration (CI)

Fase CI diatur dalam *workflow* `ci.yml`. Ini terpicu secara otomatis pada setiap tindakan `push` atau `pull_request` ke *branch* pengembangan (`dev`, `staging`, `stage`) serta *branch* utama (`main`). Tujuan utama dari fase ini adalah untuk memvalidasi setiap perubahan kode, memastikan tidak ada regresi, dan menghasilkan artefak yang siap untuk *deployment*.

**Tahapan (Jobs) dalam CI Pipeline:**

1.  **ESLint Linting (`lint`)**:
    * **Tujuan**: Memastikan kode JavaScript mematuhi standar gaya yang ditetapkan dan mendeteksi potensi masalah sintaksis atau *bug* awal.
    * **Proses**:
        * Kode repositori di-*checkout*.
        * Lingkungan Node.js (v18) disiapkan.
        * Dependensi proyek diinstal (`npm install`).
        * Perintah `npm run lint` dijalankan, yang mengeksekusi ESLint berdasarkan konfigurasi di `eslint.config.mjs`. Jika ada pelanggaran aturan, *job* ini akan gagal.

2.  **Jest Testing (`test`)**:
    * **Tujuan**: Melakukan pengujian unit dan integrasi untuk memverifikasi fungsionalitas aplikasi di kedua sisi (*frontend* dan *backend*).
    * **Ketergantungan**: `lint` (hanya berjalan jika linting berhasil).
    * **Proses**:
        * Kode repositori di-*checkout*.
        * Lingkungan Node.js (v18) disiapkan.
        * Dependensi proyek, termasuk `supertest` untuk pengujian API *backend*, diinstal.
        * Perintah `npm run test` dijalankan, yang mengeksekusi semua tes Jest yang terletak di direktori `__tests__/`. Jika ada tes yang gagal, *job* ini akan gagal.

3.  **SonarCloud Analysis (`sonarcloud`)**:
    * **Tujuan**: Melakukan analisis kode statis yang mendalam untuk mengidentifikasi *bug*, *vulnerability*, *code smells*, dan mengukur cakupan kode, memastikan kualitas dan keamanan *codebase*.
    * **Ketergantungan**: `test` (hanya berjalan jika pengujian berhasil).
    * **Proses**:
        * Kode repositori di-*checkout*.
        * Lingkungan Node.js (v18) disiapkan, dan dependensi diinstal.
        * Tes dijalankan lagi dengan opsi `--coverage` (`npm run test -- --coverage`) untuk menghasilkan laporan cakupan kode (`lcov.info`) yang dibutuhkan oleh SonarCloud.
        * `SonarSource/sonarqube-scan-action@v5` digunakan untuk memicu pemindaian SonarCloud, menggunakan `SONAR_TOKEN` yang disimpan sebagai *secret* GitHub untuk autentikasi. Konfigurasi pemindaian diatur dalam `sonar-project.properties`, termasuk pengecualian untuk `node_modules/`, `public/`, dan `__tests__/**`.

4.  **Docker Build and Push to GCR (`docker-build-and-push`)**:
    * **Tujuan**: Mengemas aplikasi ke dalam kontainer Docker yang portabel dan mendorongnya ke repositori citra *cloud* (Google Container Registry).
    * **Ketergantungan**: `sonarcloud` (hanya berjalan jika analisis SonarCloud berhasil).
    * **Proses**:
        * Kode repositori di-*checkout*.
        * Autentikasi ke Google Cloud dilakukan menggunakan kredensial JSON (`GCP_CREDENTIALS`) yang disimpan sebagai *secret* GitHub.
        * Docker dikonfigurasi untuk menggunakan Google Cloud Registry (`gcloud auth configure-docker`).
        * Citra Docker aplikasi dibangun menggunakan `Dockerfile` yang ada di *root* proyek. Citra ini diberi *tag* `expense-app:latest` dan juga *tag* dengan SHA *commit* (`${{ github.sha }}`) untuk penelusuran versi yang unik.
        * Kedua citra yang di-*tag* (`latest` dan `commit-sha`) kemudian didorong ke Google Artifact Registry (GCR).

### 2. Fase Continuous Deployment (CD)

Fase CD diatur dalam *workflow* `cd.yml`. Ini terpicu secara otomatis hanya setelah *workflow* CI (`ci.yml`) berhasil diselesaikan dan *branch* yang memicunya adalah `main`.

**Tahapan (Job) dalam CD Pipeline:**

1.  **Deploy to Cloud Run (`deploy`)**:
    * **Tujuan**: Menyebarkan aplikasi yang telah diuji dan dikontainerisasi ke lingkungan produksi di Google Cloud Run.
    * **Kondisi**: `if: ${{ github.event.workflow_run.conclusion == 'success' && github.event.workflow_run.head_branch == 'main' }}` memastikan *deployment* hanya terjadi jika CI berhasil pada *branch* `main`.
    * **Proses**:
        * Kode repositori di-*checkout* (meskipun ini opsional karena citra sudah ada di GCR, namun umum dilakukan).
        * Autentikasi ke Google Cloud dilakukan menggunakan kredensial JSON (`GCP_CREDENTIALS`).
        * Google Cloud SDK disiapkan.
        * Perintah `gcloud run deploy` dijalankan untuk menyebarkan layanan `expense-app`.
        * Citra yang di-deploy adalah `gcr.io/${{ env.GCP_PROJECT_ID }}/${{ env.APP_NAME }}:latest` dari Google Artifact Registry.
        * Layanan dikonfigurasi sebagai `--platform managed` (layanan terkelola sepenuhnya oleh Google), di `--region` yang ditentukan oleh *secret* (`GCP_REGION`), dan dengan `--allow-unauthenticated` untuk akses publik.

Dengan *pipeline* CI/CD ini, setiap perubahan yang berhasil diintegrasikan ke *branch* `main` akan secara otomatis melewati serangkaian pemeriksaan kualitas ketat dan kemudian disebarkan ke lingkungan produksi, memungkinkan pengiriman fitur baru yang cepat dan andal.
hehehehehehehehehehehehehhehehehehhehehehehehehehehehehehe