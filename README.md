# Situs Jasun Marju — Panduan Singkat

Situs statis 6 halaman (HTML5 + CSS3 + Vanilla JS murni, tanpa React/Next.js), tema
dark bernuansa "pop Jawa" (kuningan gamelan + aksen batik tipis), dibangun mengikuti
tata letak referensi `38769.jpg`.

## Struktur folder
```
jasun-marju/
├── index.html          # Home (Hero, About, Videos, News, Music, Merch, Jagongan, Gallery)
├── videos.html          # Koleksi video penuh (Swiper besar)
├── news.html             # Semua berita + modal "Baca Selengkapnya"
├── discography.html      # Semua embed Spotify
├── merch.html             # Katalog merch lengkap
├── gallery.html           # Galeri penuh + Lightbox (GLightbox)
├── css/style.css          # Satu stylesheet untuk semua halaman
├── js/main.js              # Navbar, transisi halaman, scroll-reveal, Swiper, Lightbox, modal
└── README.md
```

## Yang WAJIB diganti sebelum situs live

1. **Foto** — semua gambar sekarang memakai `picsum.photos` (foto acak) sebagai
   placeholder, ditandai komentar `<!-- GANTI: ... -->` di source code. Ganti `src`
   pada tiap `<img>` dengan foto asli Jasun Marju (taruh di folder `assets/img/`
   lalu ubah path-nya).
2. **ID lagu Spotify** — di `index.html` (bagian Music) dan `discography.html`,
   cari teks `ID_TRACK_SPOTIFY_x` / `ID_ALBUM_SPOTIFY_x` di dalam atribut `src`
   iframe, ganti dengan ID asli. Cara ambil ID: buka lagu di aplikasi Spotify →
   Share → Copy Link, ID ada di antara `track/` dan tanda tanya.
3. **ID video YouTube** — cari atribut `data-id="dQw4w9WgXcQ"` di `index.html`
   dan `videos.html`, ganti dengan ID video asli (11 karakter setelah `v=` di URL
   YouTube).
4. **Tautan sosial media & TikTok Shop** — ganti semua `https://instagram.com/jasunmarju`,
   `tiktok.com/@jasunmarju`, dst. (muncul di navbar & footer setiap halaman) dan
   tautan "Beli di TikTok Shop" di bagian Merch.
5. **Link grup WhatsApp** — di bagian Jagongan (`index.html`), ganti
   `https://chat.whatsapp.com/GANTI_LINK_GRUP` dengan tautan undangan grup asli.
6. **Teks/bio/berita/harga merch** — semua copy saat ini adalah draf contoh
   (bio, 6 berita, 10 produk merch, 10 lagu). Edit langsung teksnya sesuai data asli.

## Cara preview
Karena font, Swiper.js, dan GLightbox dimuat lewat CDN, cukup buka `index.html`
langsung di browser (perlu koneksi internet). Untuk pengalaman paling akurat
(termasuk path relatif), jalankan local server sederhana, misalnya:
```
npx serve jasun-marju
```
lalu buka `http://localhost:3000`.

## Catatan teknis
- **Animasi**: hanya `transform` & `opacity` (fade-in saat scroll pakai
  IntersectionObserver, transisi antar-halaman pakai fade pada `<body>`).
- **Swiper.js**: dipakai di `index.html` (carousel video) & `videos.html`
  (slider besar).
- **GLightbox**: dipakai di `gallery.html` untuk pembesaran foto yang mulus.
- **Grain film 90-an** pada galeri: dibuat murni CSS (SVG noise + filter), tanpa
  file gambar tambahan.
- **Bagian Jagongan**: watermark tulisan "JAGONGAN" + scanline + label "REC" ala
  CCTV dibuat murni CSS sebagai placeholder tekstur — ganti dengan logo/foto asli
  Jagongan bila sudah tersedia.
- Responsif penuh sampai layar kecil, `prefers-reduced-motion` dihormati, dan
  seluruh elemen interaktif punya `:focus-visible` untuk aksesibilitas keyboard.

## Deploy
Situs ini statis sepenuhnya — bisa langsung di-deploy ke Vercel, Netlify, atau
GitHub Pages tanpa proses build.
