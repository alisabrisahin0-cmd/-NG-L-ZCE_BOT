# 🎓 Flalingo İnteraktif İngilizce Öğrenme Platformu
## Kapsamlı Proje Planı ve Mimari Tasarım

---

## 📋 1. PROJE GEREKSİNİMLERİ

### 1.1 Kullanıcı İhtiyaçları
**Hedef Kullanıcı:** Ali Sabri Şahin - A2 seviye, Dış Ticaret Uzmanı
**Ana Hedef:** A2 → B1/B2 seviyesine ulaşmak
**Kullanım Senaryosu:** Günlük 45-60 dakika, düzenli pratik

### 1.2 Fonksiyonel Gereksinimler

#### 🤖 **Modül 1: AI Konuşma Partneri**
- Metin tabanlı chatbot (İngilizce pratik)
- Çoklu AI desteği (Gemini, OpenAI, Claude)
- Bağlam farkındalığı (önceki konuşmaları hatırla)
- Hata düzeltme ve öneriler
- Konuşma konuları: İş İngilizcesi, Tekstil, Lojistik

#### 🗣️ **Modül 2: Speaking Practice**
- Mikrofon kaydı (Web Speech API)
- Ses kaydını oynatma
- Kelime/cümle tekrar pratiği
- Kayıtları saklama (LocalStorage)
- Minimal pairs pratiği (/w/ vs /v/)

#### 📢 **Modül 3: Pronunciation Trainer**
- İnteraktif telaffuz egzersizleri
- /w/ vs /v/ minimal pairs
- Dental fricatives (/θ/, /ð/)
- Kelime vurgusu (stress) pratiği
- -teen vs -ty sayı ayrımı
- Görsel feedback (dalga formu)

#### 📝 **Modül 4: Vocabulary Flashcards**
- 3 kategori: İK, Tekstil, Lojistik
- Flashcard sistemi (ön/arka)
- Spaced repetition algoritması
- İlerleme takibi (öğrenilen/öğrenilmeyen)
- Google Keep entegrasyonu (kelime import)
- Ses çıkışı (Text-to-Speech)

#### 🎯 **Modül 5: Grammar Quiz**
- Past Simple dönüşüm egzersizleri
- Yardımcı fiiller (do/does/did)
- Zamir pratiği (he/she)
- Edat (preposition) quizleri
- Anında feedback
- Puan sistemi

#### ✅ **Modül 6: Daily Checklist**
- Günlük görevler (sabah/öğle/akşam)
- Checkbox sistemi
- Haftalık tema (Pazartesi: Lojistik, vb.)
- Streak takibi (kaç gün üst üste)
- Bildirimler (opsiyonel)

#### 📊 **Modül 7: Progress Dashboard**
- Günlük/haftalık/aylık istatistikler
- Grafik gösterimleri (Chart.js)
- Öğrenilen kelime sayısı
- Tamamlanan egzersiz sayısı
- Zaman harcama analizi
- Başarı rozetleri

### 1.3 Teknik Gereksinimler

#### Frontend
- **Teknoloji:** HTML5, CSS3, JavaScript (Vanilla)
- **Responsive:** Mobil, tablet, desktop uyumlu
- **Offline:** LocalStorage ile çevrimdışı çalışma
- **Performans:** Hızlı yükleme (<2 saniye)

#### API Entegrasyonları
- **Gemini API:** Ücretsiz tier (60 istek/dakika)
- **OpenAI API:** Opsiyonel (ücretli)
- **Claude API:** Opsiyonel (ücretli)
- **Web Speech API:** Tarayıcı yerleşik
- **Text-to-Speech API:** Tarayıcı yerleşik

#### Veri Depolama
- **LocalStorage:** Kullanıcı verileri, ilerleme
- **IndexedDB:** Ses kayıtları (büyük dosyalar)
- **JSON:** Kelime listeleri, quiz verileri

---

## 🏗️ 2. TEKNİK MİMARİ TASARIM

### 2.1 Sistem Mimarisi

```
┌─────────────────────────────────────────────────────────┐
│                   KULLANICI ARAYÜZÜ                      │
│  (Single Page Application - SPA)                         │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
┌───────▼────────┐ ┌──────▼──────┐ ┌───────▼────────┐
│  AI Chatbot    │ │  Speaking   │ │  Vocabulary    │
│    Module      │ │   Module    │ │    Module      │
└───────┬────────┘ └──────┬──────┘ └───────┬────────┘
        │                 │                 │
┌───────▼────────┐ ┌──────▼──────┐ ┌───────▼────────┐
│ Pronunciation  │ │   Grammar   │ │    Progress    │
│    Module      │ │    Module   │ │    Module      │
└───────┬────────┘ └──────┬──────┘ └───────┬────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
┌───────▼────────┐ ┌──────▼──────┐ ┌───────▼────────┐
│  LocalStorage  │ │  IndexedDB  │ │   External     │
│   (Settings)   │ │  (Audio)    │ │     APIs       │
└────────────────┘ └─────────────┘ └────────────────┘
```

### 2.2 Dosya Yapısı

```
flalingo_speaking_app/
│
├── index.html                 # Ana sayfa (SPA)
├── styles.css                 # Global stiller
├── app.js                     # Ana uygulama mantığı
│
├── modules/
│   ├── ai-chatbot.js         # AI konuşma modülü
│   ├── speaking.js           # Speaking practice
│   ├── pronunciation.js      # Pronunciation trainer
│   ├── vocabulary.js         # Flashcard sistemi
│   ├── grammar.js            # Grammar quiz
│   ├── checklist.js          # Daily checklist
│   └── progress.js           # Progress dashboard
│
├── data/
│   ├── vocabulary.json       # Kelime listeleri
│   ├── grammar-exercises.json # Gramer egzersizleri
│   ├── pronunciation-pairs.json # Minimal pairs
│   └── daily-tasks.json      # Günlük görevler
│
├── utils/
│   ├── storage.js            # LocalStorage yönetimi
│   ├── api.js                # API çağrıları
│   ├── audio.js              # Ses işleme
│   └── charts.js             # Grafik oluşturma
│
├── assets/
│   ├── icons/                # SVG ikonlar
│   ├── sounds/               # Ses efektleri
│   └── images/               # Görseller
│
└── docs/
    ├── PROJECT_PLAN.md       # Bu dosya
    ├── API_SETUP.md          # API kurulum rehberi
    └── USER_GUIDE.md         # Kullanıcı kılavuzu
```

### 2.3 Veri Modeli

#### LocalStorage Şeması

```javascript
{
  // Kullanıcı Profili
  "user": {
    "name": "Ali Sabri Şahin",
    "level": "A2",
    "targetLevel": "B1",
    "startDate": "2026-05-07",
    "streak": 5
  },
  
  // İlerleme
  "progress": {
    "totalDays": 30,
    "vocabularyMastered": ["resign", "polyester", "freight"],
    "grammarCompleted": ["past-simple-1", "auxiliaries-1"],
    "pronunciationScore": 75,
    "lastStudyDate": "2026-05-07"
  },
  
  // Günlük Kontrol
  "dailyChecklist": {
    "2026-05-07": {
      "morning": true,
      "midday": false,
      "evening": false
    }
  },
  
  // Ayarlar
  "settings": {
    "aiProvider": "gemini",
    "apiKey": "YOUR_API_KEY",
    "voiceEnabled": true,
    "notifications": true
  }
}
```

---

## 🎨 3. KULLANICI ARAYÜZÜ (UI/UX) TASARIMI

### 3.1 Renk Paleti

```css
:root {
  --primary: #4F46E5;      /* İndigo - Ana renk */
  --secondary: #10B981;    /* Yeşil - Başarı */
  --accent: #F59E0B;       /* Turuncu - Vurgu */
  --danger: #EF4444;       /* Kırmızı - Hata */
  --dark: #1F2937;         /* Koyu gri - Metin */
  --light: #F3F4F6;        /* Açık gri - Arka plan */
  --white: #FFFFFF;        /* Beyaz */
}
```

### 3.2 Layout Yapısı

```
┌─────────────────────────────────────────────────────┐
│  HEADER (Logo, Profil, Ayarlar)                     │
├─────────────────────────────────────────────────────┤
│  NAVIGATION (Dashboard, AI Chat, Speaking, etc.)    │
├──────────────┬──────────────────────────────────────┤
│              │                                       │
│   SIDEBAR    │        MAIN CONTENT AREA             │
│              │                                       │
│  - Dashboard │  ┌─────────────────────────────┐    │
│  - AI Chat   │  │                             │    │
│  - Speaking  │  │     Active Module           │    │
│  - Vocab     │  │                             │    │
│  - Grammar   │  │                             │    │
│  - Progress  │  └─────────────────────────────┘    │
│              │                                       │
├──────────────┴──────────────────────────────────────┤
│  FOOTER (İstatistikler, Streak, Son Aktivite)       │
└─────────────────────────────────────────────────────┘
```

### 3.3 Responsive Breakpoints

- **Mobile:** < 768px (Tek sütun, hamburger menü)
- **Tablet:** 768px - 1024px (İki sütun)
- **Desktop:** > 1024px (Üç sütun, sidebar)

---

## 🔌 4. API ENTEGRASYONLARI

### 4.1 Gemini API (Öncelikli)

**Avantajlar:**
- ✅ Ücretsiz tier (60 istek/dakika)
- ✅ Güçlü dil modeli
- ✅ Kolay entegrasyon

**Kullanım:**
```javascript
const API_KEY = 'YOUR_GEMINI_API_KEY';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

async function chatWithAI(message) {
  const response = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: message }]
      }]
    })
  });
  return await response.json();
}
```

### 4.2 OpenAI API (Opsiyonel)

**Avantajlar:**
- ✅ En iyi dil modeli (GPT-4)
- ✅ Detaylı feedback

**Dezavantajlar:**
- ❌ Ücretli ($0.03/1K token)

### 4.3 Claude API (Opsiyonel)

**Avantajlar:**
- ✅ Uzun bağlam penceresi
- ✅ İyi eğitim feedback'i

**Dezavantajlar:**
- ❌ Ücretli

### 4.4 Web Speech API (Yerleşik)

```javascript
// Ses tanıma
const recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';
recognition.start();

// Text-to-Speech
const utterance = new SpeechSynthesisUtterance('Hello');
utterance.lang = 'en-US';
speechSynthesis.speak(utterance);
```

---

## 📅 5. GELİŞTİRME YOL HARİTASI

### Faz 1: Temel Altyapı (1-2 gün)
- [x] Proje yapısı oluştur
- [ ] HTML/CSS temel layout
- [ ] Navigation sistemi
- [ ] LocalStorage yönetimi
- [ ] Responsive tasarım

### Faz 2: Core Modüller (3-4 gün)
- [ ] AI Chatbot entegrasyonu
- [ ] Speaking Practice (mikrofon)
- [ ] Vocabulary Flashcards
- [ ] Daily Checklist

### Faz 3: İleri Özellikler (2-3 gün)
- [ ] Pronunciation Trainer
- [ ] Grammar Quiz
- [ ] Progress Dashboard
- [ ] Grafik ve istatistikler

### Faz 4: Polish & Test (1-2 gün)
- [ ] UI/UX iyileştirmeleri
- [ ] Bug fixes
- [ ] Performans optimizasyonu
- [ ] Kullanıcı testleri

**Toplam Süre:** 7-11 gün

---

## 🎯 6. ÖNCELİKLENDİRME

### Must Have (MVP)
1. ✅ AI Chatbot (Gemini)
2. ✅ Daily Checklist
3. ✅ Vocabulary Flashcards
4. ✅ Progress Tracking

### Should Have
5. Speaking Practice
6. Pronunciation Trainer
7. Grammar Quiz

### Nice to Have
8. Google Keep entegrasyonu
9. Ses dalga formu görselleştirme
10. Başarı rozetleri

---

## 🚀 7. İMPLEMENTASYON PLANI

### Adım 1: Temel HTML Yapısı
```html
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flalingo - İnteraktif İngilizce Öğrenme</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header><!-- Logo, Profil --></header>
    <nav><!-- Modül linkleri --></nav>
    <main>
        <aside><!-- Sidebar --></aside>
        <section id="content"><!-- Dinamik içerik --></section>
    </main>
    <footer><!-- İstatistikler --></footer>
    <script src="app.js" type="module"></script>
</body>
</html>
```

### Adım 2: Modüler JavaScript Yapısı
```javascript
// app.js
import AIChat from './modules/ai-chatbot.js';
import Speaking from './modules/speaking.js';
import Vocabulary from './modules/vocabulary.js';
// ...

class App {
  constructor() {
    this.modules = {
      aiChat: new AIChat(),
      speaking: new Speaking(),
      vocabulary: new Vocabulary()
    };
    this.init();
  }
  
  init() {
    this.setupNavigation();
    this.loadUserData();
    this.renderDashboard();
  }
}

new App();
```

### Adım 3: API Entegrasyonu
```javascript
// utils/api.js
export class AIProvider {
  constructor(provider = 'gemini') {
    this.provider = provider;
    this.apiKey = localStorage.getItem('apiKey');
  }
  
  async chat(message) {
    switch(this.provider) {
      case 'gemini':
        return await this.geminiChat(message);
      case 'openai':
        return await this.openaiChat(message);
      case 'claude':
        return await this.claudeChat(message);
    }
  }
}
```

---

## 📊 8. BAŞARI KRİTERLERİ

### Teknik Kriterler
- ✅ Tüm tarayıcılarda çalışır (Chrome, Firefox, Safari)
- ✅ Mobil uyumlu (responsive)
- ✅ Hızlı yükleme (<2 saniye)
- ✅ Offline çalışma (LocalStorage)

### Kullanıcı Deneyimi
- ✅ Sezgisel arayüz
- ✅ Anında feedback
- ✅ Görsel ilerleme takibi
- ✅ Motivasyon artırıcı (streak, rozetler)

### Eğitim Etkinliği
- ✅ Günlük 45-60 dakika kullanım
- ✅ Haftalık ilerleme görünür
- ✅ Raporlara dayalı içerik
- ✅ Kişiselleştirilmiş öneriler

---

## 🔐 9. GÜVENLİK VE GİZLİLİK

- API anahtarları LocalStorage'da (kullanıcı kontrolü)
- Ses kayıtları sadece tarayıcıda (sunucuya gönderilmez)
- Kişisel veriler yerel (GDPR uyumlu)
- HTTPS zorunlu (production)

---

## 📝 10. SONRAKI ADIMLAR

1. **Hemen:** Temel HTML/CSS yapısını oluştur
2. **Bugün:** AI Chatbot modülünü entegre et
3. **Yarın:** Speaking ve Vocabulary modüllerini ekle
4. **Bu Hafta:** Tüm modülleri tamamla ve test et

---

**Hazır mısınız? Code moduna geçip implementasyona başlayalım! 🚀**
