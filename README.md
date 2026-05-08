# 🎓 ÜSTAT APP - AI Destekli İngilizce Öğrenme Platformu

Ali Sabri Şahin için özel olarak tasarlanmış, A2 seviyesinden B1/B2 seviyesine geçiş için kapsamlı İngilizce öğrenme platformu.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-success)

## 🚀 Hızlı Başlangıç

### Canlı Demo
**Uygulamayı hemen kullan**: `https://KULLANICI_ADINIZ.github.io/ustat-app/`

### Kendi Versiyonunuzu Deploy Edin
```bash
# 1. Repository'yi fork edin veya klonlayın
git clone https://github.com/KULLANICI_ADINIZ/ustat-app.git
cd ustat-app

# 2. GitHub'a yükleyin
git add .
git commit -m "Initial commit"
git push origin main

# 3. GitHub Pages'i aktif edin
# Settings → Pages → Source: main branch → Save
```

⏳ 2-5 dakika sonra uygulamanız `https://KULLANICI_ADINIZ.github.io/ustat-app/` adresinde yayında!

📱 **Mobil Kullanım**: Chrome/Safari'de "Add to Home Screen" ile native app gibi kullanın!

Detaylı kurulum için: [`QUICK_START.md`](QUICK_START.md)

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Modüller](#-modüller)
- [API Kurulumu](#-api-kurulumu)
- [Teknolojiler](#-teknolojiler)
- [Proje Yapısı](#-proje-yapısı)
- [Katkıda Bulunma](#-katkıda-bulunma)

## ✨ Özellikler

### 🤖 AI Konuşma Partneri
- **Gemini AI** entegrasyonu ile doğal konuşma pratiği
- Bağlam farkındalığı (önceki konuşmaları hatırlar)
- Gerçek zamanlı hata düzeltme ve öneriler
- İş İngilizcesi, Tekstil ve Lojistik odaklı konuşmalar
- Sesli giriş desteği (Web Speech API)

### 🗣️ Speaking Practice
- Mikrofon ile ses kaydı
- Telaffuz analizi ve geri bildirim
- Örnek cümleleri dinleme
- Kayıtları saklama ve tekrar dinleme
- Gerçek zamanlı skorlama sistemi

### 📢 Pronunciation Trainer
- **/w/ vs /v/** minimal pairs pratiği
- Dental fricatives (**/θ/, /ð/**) egzersizleri
- Kelime vurgusu (stress) çalışmaları
- **-teen vs -ty** sayı ayrımı
- İnteraktif ses örnekleri

### 📝 Vocabulary Flashcards
- **3 Kategori:**
  - İK & Kurumsal (resign, terminate, severance package...)
  - Tekstil Üretimi (polyester, viscose, warp, weft...)
  - Lojistik & İhracat (Bill of Lading, F.O.B., freight...)
- Flashcard sistemi (ön/arka çevirme)
- Spaced repetition algoritması
- İlerleme takibi (öğrenilen/öğrenilmeyen)
- Text-to-Speech ses çıkışı

### ✅ Grammar Quiz
- Past Simple transformation drills
- Yardımcı fiiller (do/does/did) pratiği
- Zamir (he/she) egzersizleri
- Edat (preposition) quizleri
- Anında feedback ve açıklamalar

### 📅 Daily Checklist
- Günlük görevler (sabah/öğle/akşam)
- Haftalık tema sistemi
- Streak takibi (kaç gün üst üste)
- Motivasyon artırıcı bildirimler

### 📊 Progress Dashboard
- Günlük/haftalık/aylık istatistikler
- Grafik gösterimleri (Chart.js)
- Öğrenilen kelime sayısı
- Tamamlanan egzersiz sayısı
- Zaman harcama analizi

## 🚀 Kurulum

### Gereksinimler
- Modern web tarayıcı (Chrome, Firefox, Safari, Edge)
- Mikrofon erişimi (speaking practice için)
- İnternet bağlantısı (AI özellikleri için)

### Adım 1: Dosyaları İndirin
```bash
# Projeyi klonlayın veya ZIP olarak indirin
git clone https://github.com/yourusername/flalingo-speaking-app.git
cd flalingo-speaking-app
```

### Adım 2: Tarayıcıda Açın
```bash
# Basit bir HTTP sunucusu başlatın (Python 3)
python -m http.server 8000

# Veya Node.js ile
npx http-server -p 8000
```

Tarayıcınızda `http://localhost:8000` adresine gidin.

### Adım 3: API Anahtarı Ayarlayın
1. Sağ üstteki **⋮ (Ayarlar)** butonuna tıklayın
2. **AI Sağlayıcı** seçin (Gemini önerilir - ücretsiz)
3. **API Anahtarı** girin
4. **Ayarları Kaydet** butonuna tıklayın

## 🔑 API Kurulumu

### Google Gemini API (Önerilen - Ücretsiz)

1. [Google AI Studio](https://makersuite.google.com/app/apikey) adresine gidin
2. Google hesabınızla giriş yapın
3. **"Get API Key"** butonuna tıklayın
4. **"Create API key in new project"** seçin
5. API anahtarınızı kopyalayın
6. Flalingo ayarlarına yapıştırın

**Ücretsiz Tier Limitleri:**
- 60 istek/dakika
- Günlük kullanım limiti yok
- Mükemmel performans

### OpenAI API (Opsiyonel - Ücretli)

1. [OpenAI Platform](https://platform.openai.com/api-keys) adresine gidin
2. Hesap oluşturun ve giriş yapın
3. **"Create new secret key"** butonuna tıklayın
4. API anahtarınızı kopyalayın
5. Flalingo ayarlarına yapıştırın

**Fiyatlandırma:**
- GPT-4: ~$0.03/1K token
- GPT-3.5-turbo: ~$0.002/1K token

### Claude API (Opsiyonel - Ücretli)

1. [Anthropic Console](https://console.anthropic.com/) adresine gidin
2. Hesap oluşturun
3. API anahtarı oluşturun
4. Flalingo ayarlarına yapıştırın

## 📖 Kullanım

### İlk Kullanım

1. **Dashboard'u İnceleyin**
   - Günlük hedeflerinizi görün
   - İlerleme grafiklerinizi kontrol edin
   - Hızlı erişim butonlarını kullanın

2. **Günlük Planınızı Takip Edin**
   - Sabah: Telaffuz çalışması (10 dk)
   - Öğle: Gramer egzersizi (15-20 dk)
   - Akşam: Kelime + Flalingo (20-30 dk)

3. **Modülleri Keşfedin**
   - Her modülü en az bir kez deneyin
   - Kendi öğrenme tarzınıza uygun olanları belirleyin

### Günlük Rutin Önerisi

#### 🌅 Sabah (10 dakika)
```
1. Pronunciation Trainer'a gidin
2. /w/ vs /v/ minimal pairs çalışın
3. 5 kelime çifti pratik yapın
4. Kayıt yapıp kendinizi dinleyin
```

#### 🌞 Öğle (15-20 dakika)
```
1. Grammar Quiz'e gidin
2. Past Simple transformation yapın
3. 5-10 egzersiz tamamlayın
4. Hataları not alın
```

#### 🌙 Akşam (20-30 dakika)
```
1. Vocabulary Flashcards açın
2. Bir kategori seçin (İK/Tekstil/Lojistik)
3. 10-15 kelime çalışın
4. AI Chat ile pratik yapın
5. Flalingo canlı derse katılın
```

### Modül Detayları

#### 🤖 AI Konuşma Partneri
**Ne zaman kullanmalı:**
- Serbest konuşma pratiği yapmak istediğinizde
- Gramer hatalarınızı düzeltmek istediğinizde
- İş İngilizcesi pratiği yapmak istediğinizde

**İpuçları:**
- Tam cümleler kurun (tek kelime cevaplar vermeyin)
- He/she kullanmadan önce duraklamayı deneyin
- Hata yaptığınızda AI'ın açıklamasını okuyun

**Örnek Konuşma Başlatıcıları:**
```
"Tell me about your work in textile export."
"I want to practice Past Simple. Can you help?"
"What's the difference between resign and terminate?"
```

#### 🗣️ Speaking Practice
**Nasıl kullanılır:**
1. Ekranda görünen cümleyi okuyun
2. 🎤 **Kaydet** butonuna basın
3. Cümleyi net bir şekilde söyleyin
4. ⏹️ **Durdur** butonuna basın
5. Telaffuz skorunuzu görün

**Skorlama:**
- 90-100%: Mükemmel! 🎉
- 80-89%: Çok iyi! 👍
- 60-79%: İyi, biraz daha pratik 💪
- 40-59%: Tekrar dene 🔄
- 0-39%: Tekrar dinle ve dene 🎧

#### 📝 Vocabulary Flashcards
**Öğrenme Stratejisi:**
1. Kartın önünü görün (İngilizce kelime)
2. Türkçe karşılığını tahmin edin
3. Karta tıklayarak çevirin
4. Doğru bildiniz mi?
   - ✅ **Biliyorum** → Öğrenildi listesine ekle
   - ❌ **Bilmiyorum** → Öğreniliyor listesine ekle

**Spaced Repetition:**
- Yeni kelimeler: Her gün tekrar
- Öğreniliyor: 2-3 günde bir
- Öğrenildi: Haftalık gözden geçirme

#### 📢 Pronunciation Trainer
**Odak Alanları:**

1. **/w/ vs /v/ Minimal Pairs**
   - west/vest, wine/vine, wary/very
   - Öpücük (w) vs Gülümseme (v) tekniği

2. **Dental Fricatives**
   - think, then, birth
   - Dili dişlerin arasına yerleştirme

3. **Word Stress**
   - um-BREL-la, ec-o-NOM-ics
   - Vurgulu heceyi daha yüksek sesle söyleyin

4. **-teen vs -ty**
   - thir-TEEN vs THIR-ty
   - Vurgu farkına dikkat edin

#### ✅ Grammar Quiz
**Egzersiz Türleri:**

1. **Transformation (Dönüştürme)**
   ```
   Present → Past
   "I wake up at 7" → "I woke up at 7"
   ```

2. **Correction (Düzeltme)**
   ```
   Yanlış: "I not like coffee"
   Doğru: "I don't like coffee"
   ```

3. **Pronoun Practice**
   ```
   Yanlış: "My grandmother... He is ill"
   Doğru: "My grandmother... She is ill"
   ```

**Hata Yaptığınızda:**
- Açıklamayı dikkatlice okuyun
- Neden yanlış olduğunu anlayın
- Tekrar deneyin
- Doğru yapana kadar pratik edin

## 🛠️ Teknolojiler

### Frontend
- **HTML5** - Semantik yapı
- **CSS3** - Modern tasarım ve animasyonlar
- **JavaScript (ES6+)** - Modüler mimari
- **Web Speech API** - Ses tanıma ve TTS
- **LocalStorage** - Veri saklama
- **Chart.js** - Grafik görselleştirme (CDN)

### AI Entegrasyonları
- **Google Gemini API** - Ücretsiz, güçlü dil modeli
- **OpenAI GPT-4** - Opsiyonel, premium özellikler
- **Anthropic Claude** - Opsiyonel, uzun bağlam

### Tarayıcı API'leri
- **MediaRecorder API** - Ses kaydı
- **SpeechRecognition API** - Ses tanıma
- **SpeechSynthesis API** - Text-to-Speech
- **LocalStorage API** - Veri kalıcılığı

## 📁 Proje Yapısı

```
flalingo_speaking_app/
│
├── index.html                 # Ana sayfa
├── styles.css                 # Global stiller
├── app.js                     # Ana uygulama mantığı
│
├── modules/                   # Modül dosyaları
│   ├── ai-chatbot.js         # AI konuşma modülü
│   ├── speaking.js           # Speaking practice
│   ├── pronunciation.js      # Pronunciation trainer
│   ├── vocabulary.js         # Flashcard sistemi
│   └── grammar.js            # Grammar quiz
│
├── utils/                     # Yardımcı araçlar
│   ├── storage.js            # LocalStorage yönetimi
│   ├── api.js                # AI API çağrıları
│   ├── audio.js              # Ses işleme
│   └── charts.js             # Grafik oluşturma
│
├── data/                      # Veri dosyaları
│   └── vocabulary.json       # Kelime listeleri ve egzersizler
│
├── assets/                    # Medya dosyaları
│   ├── icons/                # SVG ikonlar
│   ├── sounds/               # Ses efektleri
│   └── images/               # Görseller
│
└── docs/                      # Dokümantasyon
    ├── PROJECT_PLAN.md       # Proje planı
    ├── API_SETUP.md          # API kurulum rehberi
    └── README.md             # Bu dosya
```

## 🎯 Öğrenme Hedefleri

### Kısa Vadeli (1-2 Ay)
- [ ] 200+ yeni kelime öğren
- [ ] Past Simple'ı otomatikleştir
- [ ] /w/ vs /v/ ayrımını netleştir
- [ ] He/she zamir hatalarını azalt
- [ ] 30 günlük streak oluştur

### Orta Vadeli (3-6 Ay)
- [ ] 500+ kelime dağarcığı
- [ ] Tüm gramer egzersizlerini tamamla
- [ ] Telaffuz skorunu %80+ yap
- [ ] Günlük 60 dakika çalışma rutini
- [ ] A2 → B1 geçişi

### Uzun Vadeli (6-12 Ay)
- [ ] 1000+ kelime dağarcığı
- [ ] B1 → B2 seviyesine ulaş
- [ ] Akıcı iş İngilizcesi konuşma
- [ ] Flalingo sertifikası al
- [ ] İş görüşmelerinde rahat konuş

## 📊 İlerleme Takibi

### Günlük Metrikler
- ✅ Tamamlanan görevler (sabah/öğle/akşam)
- 📚 Öğrenilen yeni kelimeler
- ✏️ Tamamlanan egzersizler
- ⏱️ Toplam çalışma süresi

### Haftalık Analiz
- 📈 Haftalık ilerleme grafiği
- 🎯 Hedef tamamlama oranı
- 🔥 Streak durumu
- 💪 En çok çalışılan alan

### Aylık Rapor
- 📊 Aylık istatistikler
- 🏆 Başarılar ve rozetler
- 📝 Öğrenilen toplam kelime
- 🎓 Seviye değerlendirmesi

## 🔒 Gizlilik ve Güvenlik

- ✅ Tüm veriler **tarayıcınızda** saklanır (LocalStorage)
- ✅ API anahtarları **sadece sizin cihazınızda**
- ✅ Ses kayıtları **sunucuya gönderilmez**
- ✅ Kişisel veriler **yerel kalır**
- ✅ GDPR uyumlu

## 🐛 Sorun Giderme

### Mikrofon Çalışmıyor
```
1. Tarayıcı izinlerini kontrol edin
2. HTTPS veya localhost kullandığınızdan emin olun
3. Mikrofon bağlantısını kontrol edin
4. Başka bir tarayıcı deneyin
```

### AI Yanıt Vermiyor
```
1. API anahtarının doğru girildiğini kontrol edin
2. İnternet bağlantınızı kontrol edin
3. API limitlerini kontrol edin (Gemini: 60/dk)
4. Tarayıcı konsolunu kontrol edin (F12)
```

### Ses Çıkışı Yok
```
1. Ayarlardan "Ses Çıkışını Etkinleştir" seçeneğini kontrol edin
2. Tarayıcı ses ayarlarını kontrol edin
3. Sistem ses seviyesini kontrol edin
4. Başka bir tarayıcı deneyin
```

### Veriler Kayboldu
```
1. Tarayıcı geçmişini/cache'i temizlemeyin
2. Gizli mod kullanmayın (veriler silinir)
3. Düzenli olarak "Verileri Dışa Aktar" yapın
4. Aynı tarayıcıyı kullanın
```

## 💡 İpuçları ve Püf Noktaları

### Maksimum Verimlilik İçin
1. **Tutarlı Olun** - Her gün aynı saatte çalışın
2. **Küçük Hedefler** - Günlük 45-60 dakika yeterli
3. **Çeşitlilik** - Tüm modülleri kullanın
4. **Tekrar** - Öğrenilen kelimeleri gözden geçirin
5. **Pratik** - Flalingo canlı derslerle pekiştirin

### Hızlı İlerleme İçin
1. **AI Chat'i Aktif Kullanın** - Günde en az 10 mesaj
2. **Sesli Pratik** - Her gün 10 dakika kayıt yapın
3. **Flashcard Rutini** - Sabah 5, akşam 5 kelime
4. **Hata Defteri** - Yaptığınız hataları not alın
5. **Gerçek Hayat** - Öğrendiklerinizi işte kullanın

### Motivasyon İçin
1. **Streak'i Kırma** - Her gün en az 1 görev tamamla
2. **Küçük Kazanımlar** - Her 10 kelimede kendinizi ödüllendirin
3. **İlerlemeyi Gör** - Haftalık grafiklerinizi inceleyin
4. **Hedef Belirle** - Aylık hedefler koyun
5. **Paylaş** - İlerlemeni arkadaşlarınla paylaş

## 🤝 Katkıda Bulunma

Bu proje açık kaynak değildir ancak önerilerinizi memnuniyetle karşılarız!

### Geri Bildirim
- 🐛 Bug bildirimi
- 💡 Özellik önerisi
- 📝 Dokümantasyon iyileştirmesi
- 🎨 Tasarım önerileri

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Ali Sabri Şahin** için özel olarak geliştirilmiştir.

---

## 🎉 Başarılar

Flalingo ile İngilizce öğrenme yolculuğunuzda başarılar dileriz! 🚀

**Unutmayın:** Tutarlılık, mükemmellikten daha önemlidir. Her gün küçük adımlar atın! 💪

---

**Son Güncelleme:** 7 Mayıs 2026  
**Versiyon:** 1.0.0  
**Durum:** ✅ Aktif Geliştirme
