# 🔧 Sorun Giderme Rehberi

## ✅ Düzeltilen Sorunlar

### 1. Chart.js Kütüphanesi Eksikliği
**Sorun:** Dashboard'daki haftalık ilerleme grafiği görünmüyordu.
**Çözüm:** [`index.html`](index.html:12) dosyasına Chart.js CDN eklendi:
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

### 2. API Anahtarı Yapısı Uyumsuzluğu
**Sorun:** [`storage.js`](utils/storage.js:42) çoklu API anahtarı sistemi kullanıyordu ama [`app.js`](app.js:49) tek anahtar bekliyordu.
**Çözüm:** 
- [`app.js`](app.js:48) içinde `aiProvider.setStorage(storage)` eklendi
- [`saveSettings()`](app.js:645) fonksiyonu hem eski hem yeni sistemi destekleyecek şekilde güncellendi

### 3. Storage Referansı Eksikliği
**Sorun:** AI Provider, storage'dan API anahtarlarını okuyamıyordu.
**Çözüm:** [`loadUserData()`](app.js:48) içinde `aiProvider.setStorage(storage)` çağrısı eklendi.

### 4. Dashboard Chart Başlatma
**Sorun:** Dashboard yüklendiğinde chart başlatılmıyordu.
**Çözüm:** [`renderDashboard()`](app.js:175) içinde `setTimeout` ile chart başlatma eklendi.

---

## 🚀 Nasıl Kullanılır

### 1. Projeyi Başlatma
```bash
# Basit HTTP sunucusu ile çalıştırın
python -m http.server 8000
# veya
npx serve
```

Tarayıcıda açın: `http://localhost:8000`

### 2. API Anahtarı Ayarlama
1. Sağ üstteki ⚙️ ayarlar butonuna tıklayın
2. AI Sağlayıcı seçin (Gemini önerilir - ücretsiz)
3. API anahtarınızı girin
4. "Ayarları Kaydet" butonuna tıklayın

### 3. Gemini API Anahtarı Alma
1. [Google AI Studio](https://makersuite.google.com/app/apikey) adresine gidin
2. "Create API Key" butonuna tıklayın
3. Anahtarı kopyalayın ve uygulamaya yapıştırın

---

## 🐛 Yaygın Sorunlar ve Çözümleri

### Sorun: "API anahtarı ayarlanmamış" Hatası
**Çözüm:**
1. Ayarlar menüsünden API anahtarınızı girin
2. Sayfayı yenileyin (F5)
3. LocalStorage'ı kontrol edin: `localStorage.getItem('flalingo_data')`

### Sorun: Chart Görünmüyor
**Çözüm:**
1. Tarayıcı konsolunu açın (F12)
2. Chart.js yüklenmiş mi kontrol edin: `typeof Chart`
3. Hata varsa sayfayı yenileyin

### Sorun: Modüller Yüklenmiyor
**Çözüm:**
1. Tarayıcı konsolunda hata var mı kontrol edin
2. Dosya yollarının doğru olduğundan emin olun
3. CORS hatası varsa HTTP sunucusu kullanın (file:// protokolü yerine)

### Sorun: Ses Tanıma Çalışmıyor
**Çözüm:**
1. HTTPS veya localhost kullanın (HTTP'de çalışmaz)
2. Mikrofon izni verin
3. Chrome veya Edge kullanın (Safari'de sınırlı destek)

### Sorun: LocalStorage Dolu
**Çözüm:**
1. Ayarlar → "Verileri Sıfırla" butonuna tıklayın
2. Veya tarayıcı konsolunda: `localStorage.clear()`

---

## 🔍 Hata Ayıklama

### Konsol Komutları

```javascript
// Tüm veriyi görüntüle
console.log(JSON.parse(localStorage.getItem('flalingo_data')));

// API anahtarını kontrol et
const data = JSON.parse(localStorage.getItem('flalingo_data'));
console.log(data.settings.apiKey);

// Storage'ı sıfırla
localStorage.removeItem('flalingo_data');
location.reload();

// App instance'ına eriş
console.log(window.app);

// AI Provider'ı test et
window.app.loadUserData();
```

### Tarayıcı Uyumluluğu

| Özellik | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| ES6 Modules | ✅ | ✅ | ✅ | ✅ |
| Speech Recognition | ✅ | ❌ | ⚠️ | ✅ |
| Speech Synthesis | ✅ | ✅ | ✅ | ✅ |
| MediaRecorder | ✅ | ✅ | ✅ | ✅ |
| LocalStorage | ✅ | ✅ | ✅ | ✅ |

**Önerilen Tarayıcı:** Chrome veya Edge (en iyi uyumluluk)

---

## 📝 Geliştirme Notları

### Dosya Yapısı
```
flalingo_speaking_app/
├── index.html          # Ana HTML dosyası
├── app.js              # Ana uygulama mantığı
├── styles.css          # Tüm stiller
├── utils/
│   ├── api.js         # AI API yönetimi
│   ├── storage.js     # LocalStorage yönetimi
│   ├── audio.js       # Ses işlemleri
│   └── charts.js      # Grafik yönetimi
├── modules/
│   ├── ai-chatbot.js  # AI sohbet modülü
│   ├── vocabulary.js  # Kelime modülü
│   ├── grammar.js     # Gramer modülü
│   ├── pronunciation.js # Telaffuz modülü
│   └── speaking.js    # Konuşma modülü
└── data/
    └── vocabulary.json # Kelime veritabanı
```

### Önemli Değişkenler
- `window.app` - Ana uygulama instance'ı
- `storage` - LocalStorage yöneticisi
- `aiProvider` - AI API yöneticisi
- `audioManager` - Ses yöneticisi
- `chartsManager` - Grafik yöneticisi

---

## 🆘 Yardım

Sorun devam ediyorsa:
1. Tarayıcı konsolundaki hata mesajını kontrol edin
2. LocalStorage'daki veriyi kontrol edin
3. Sayfayı hard refresh yapın (Ctrl+Shift+R)
4. Tarayıcı cache'ini temizleyin

---

## ✨ Yeni Özellikler

### Çoklu API Anahtarı Desteği
Artık her AI sağlayıcı için 3 farklı API anahtarı kaydedebilirsiniz. Quota aşıldığında otomatik olarak bir sonraki anahtara geçer.

### Otomatik Yedekleme
Verileriniz otomatik olarak LocalStorage'da yedeklenir. Son 5 yedek saklanır.

### Offline Çalışma
Uygulama tamamen tarayıcıda çalışır, internet bağlantısı sadece AI API çağrıları için gereklidir.

---

**Son Güncelleme:** 2026-05-07
**Versiyon:** 1.0.0
