# ULU Creative Media — Web Sitesi

Sosyal medya & kreatif ajans (drone çekim, sosyal medya yönetimi, reklam, video/fotoğraf) için statik portfolyo sitesi. Saf HTML/CSS/JS — build adımı yok, bağımlılık yok.

## Yapı

```
portfolyo/
├── site/              ← Canlı site (yayınlanan klasör)
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── logo.png
└── site.zip           ← site/ klasörünün deploy için paketlenmiş hali
```

## Yerelde Açma

`site/index.html` dosyasını tarayıcıda aç — sunucu/build gerekmez.

## Yayın

- **Cloudflare (asıl):** `tight-voice-0af9` adlı Worker, statik-asset olarak. Güncelleme: Cloudflare panelinde **New deployment** → `site.zip`'i yükle.
- **Vercel / Netlify / tiiny.host (geçici):** `site/` klasörünü (veya `site.zip`'i) yükle. Vercel'de repo kökü `site/` değilse **Root Directory = site** ayarla, build command boş, framework "Other".

## Domain

`ulucreativemedia.com` — Cloudflare üzerinden yönetiliyor (nameserver'lar Cloudflare). Aktifleşince Worker'a Custom Domain olarak bağlanacak.

## İletişim / Form

- Instagram: [@ulucreativemedia](https://www.instagram.com/ulucreativemedia)
- Telefon: 0 507 887 24 48 · Afyonkarahisar / Merkez
- "Fiyat Al" formu **FormSubmit** ile `info@ulucreativemedia.com` adresine mail atar (ilk gönderimde tek seferlik aktivasyon maili onaylanmalı).

## Yapılacaklar

- [ ] Showreel videosu (YouTube embed) eklenecek — şu an "Yakında".
- [ ] Hakkımızda görseli gerçek fotoğrafla değiştirilecek (şu an stok).
- [ ] Marka logoları (şu an isimler metin olarak).
- [ ] `info@ulucreativemedia.com` için Cloudflare Email Routing kurulumu (ücretsiz, Gmail'e yönlendirme).
