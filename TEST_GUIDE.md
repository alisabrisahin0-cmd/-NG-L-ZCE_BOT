# ⚡ Hızlı Test ve Kurulum Rehberi

## 🚀 3 Farklı Yöntemle Çalıştırma

### Yöntem 1: VSCode Live Server (ÖNERİLEN)

#### Adım 1: Live Server Eklentisini Yükleyin
1. VSCode'da **Extensions** (Ctrl+Shift+X) açın
2. "Live Server" arayın
3. **Ritwick Dey** tarafından geliştirilen eklentiyi yükleyin

#### Adım 2: Projeyi Açın
1. VSCode'da `flalingo_speaking_app` klasörünü açın
2. [`index.html`](index.html:1) dosyasına sağ tıklayın
3. **"Open with Live Server"** seçin
4. Tarayıcınızda otomatik açılacak!

✅ **Avantajlar:**
- Otomatik yenileme
- CORS sorunları yok
- Kolay kullanım

---

### Yöntem 2: Doğrudan Tarayıcıda Aç (HIZLI TEST)

#### ⚠️ Önemli Not
Bu yöntem bazı özelliklerde CORS hatası verebilir (özellikle modül import'ları).

#### Adımlar:
1. `flalingo_speaking_app` klasörüne gidin
2. [`index.html`](index.html:1) dosyasına çift tıklayın
3. Varsayılan tarayıcınızda açılacak

#### CORS Hatası Alırsanız:
**Chrome için:**
```bash
# Windows
"C:\Program Files\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files --disable-web-security --user-data-dir="C:\temp\chrome_dev"
```

**Firefox için:**
1. `about:config` adresine gidin
2. `security.fileuri.strict_origin_policy` ayarını `false` yapın

---

### Yöntem 3: Python HTTP Server (Eğer Python Varsa)

```bash
# Python 3
cd flalingo_speaking_app
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Tarayıcıda: `http://localhost:8000`

---

### Yöntem 4: Node.js HTTP Server (Eğer Node.js Varsa)

```bash
# npx ile (Node.js 5.2+)
cd flalingo_speaking_app
npx http-server -p 8000

# veya global yükle
npm install -g http-server
http-server -p 8000
```

Tarayıcıda: `http://localhost:8000`

---

## 🧪 İlk Test Adımları

### 1. Sayfa Açıldı mı Kontrol Edin
✅ Flalingo logosu görünüyor mu?
✅ Navigation menüsü var mı?
✅ Dashboard yüklendi mi?

### 2. Console Hatalarını Kontrol Edin
1. **F12** tuşuna basın (Developer Tools)
2. **Console** sekmesine gidin
3. Kırmızı hatalar var mı?

**Yaygın Hatalar:**
- `CORS error` → Live Server kullanın
- `Module not found` → Dosya yollarını kontrol edin
- `Cannot read property` → JavaScript hatası, console'da detay var

### 3. Temel Özellikleri Test Edin

#### Dashboard Testi
- [ ] Günlük istatistikler görünüyor mu?
- [ ] Haftalık grafik yüklendi mi?
- [ ] Bugünkü hedefler listesi var mı?

#### Navigation Testi
- [ ] Her modül butonuna tıklayın
- [ ] Sayfa değişiyor mu?
- [ ] Hata almadan açılıyor mu?

#### Settings Testi
1. Sağ üstteki **⋮** (üç nokta) butonuna tıklayın
2. Ayarlar modal'ı açıldı mı?
3. AI Sağlayıcı seçenekleri var mı?

---

## 🔑 API Anahtarı Ekleme (Test İçin)

### Gemini API Anahtarı Alın (Ücretsiz)

1. **Google AI Studio'ya gidin:**
   🔗 https://makersuite.google.com/app/apikey

2. **Google hesabınızla giriş yapın**

3. **"Get API Key" → "Create API key in new project"**

4. **API anahtarını kopyalayın:**
   ```
   Örnek: AIzaSyB1234567890abcdefghijklmnopqrstuv
   ```

5. **Flalingo'ya ekleyin:**
   - Ayarlar (⋮) → AI Sağlayıcı: `Google Gemini`
   - API Anahtarı alanına yapıştırın
   - **Ayarları Kaydet**

### 3 API Anahtarı Sistemi

**Neden 3 anahtar?**
- Biri dolduğunda otomatik diğerine geçer
- Kesintisiz kullanım
- Günlük limitleri aşmamak için

**Nasıl eklerim?**
```
API Anahtarı 1: AIzaSy... (ana)
API Anahtarı 2: AIzaSy... (yedek 1)
API Anahtarı 3: AIzaSy... (yedek 2)
```

---

## 🧪 Modül Testleri

### AI Konuşma Testi
1. **AI Konuşma** modülüne gidin
2. Mesaj yazın: `Hello! Can you help me practice English?`
3. **Gönder** butonuna tıklayın
4. AI yanıt veriyor mu?

**Beklenen Sonuç:** AI İngilizce yanıt vermeli

**Hata Alırsanız:**
- API anahtarı doğru mu?
- İnternet bağlantınız var mı?
- Console'da hata mesajı var mı?

### Vocabulary Testi
1. **Kelime** modülüne gidin
2. Bir kategori seçin (İK, Tekstil, Lojistik)
3. Flashcard görünüyor mu?
4. **🔊 Dinle** butonuna tıklayın
5. Ses çıkıyor mu?

**Beklenen Sonuç:** Kelime kartı görünmeli, ses çalmalı

### Speaking Testi
1. **Speaking** modülüne gidin
2. **🎤 Kaydet** butonuna tıklayın
3. Mikrofon izni isteği geldi mi?
4. İzin verin ve bir şey söyleyin
5. **⏹️ Durdur** butonuna tıklayın

**Beklenen Sonuç:** Kayıt yapılmalı, telaffuz skoru gösterilmeli

**Mikrofon çalışmıyorsa:**
- Tarayıcı izinlerini kontrol edin
- HTTPS veya localhost kullanıyor musunuz?
- Başka bir tarayıcı deneyin

### Grammar Testi
1. **Gramer** modülüne gidin
2. Cevap yazın
3. **Kontrol Et** butonuna tıklayın
4. Feedback görünüyor mu?

**Beklenen Sonuç:** Doğru/yanlış feedback ve açıklama

---

## 🐛 Yaygın Sorunlar ve Çözümler

### 1. Sayfa Boş Görünüyor
**Çözüm:**
- F12 → Console → Hataları kontrol edin
- Live Server kullanıyor musunuz?
- Dosya yolları doğru mu?

### 2. "Module not found" Hatası
**Çözüm:**
- HTTP sunucusu kullanın (Live Server)
- Doğrudan dosya açmayın (file://)

### 3. API Yanıt Vermiyor
**Çözüm:**
- API anahtarı doğru mu?
- İnternet bağlantınız var mı?
- Gemini API limiti aşıldı mı? (60/dakika)

### 4. Mikrofon Çalışmıyor
**Çözüm:**
- Tarayıcı izinlerini kontrol edin
- HTTPS veya localhost kullanın
- Mikrofon bağlı mı?

### 5. Ses Çıkmıyor
**Çözüm:**
- Ayarlar → "Ses Çıkışını Etkinleştir" işaretli mi?
- Sistem ses seviyesi açık mı?
- Tarayıcı ses izni verildi mi?

---

## ✅ Test Checklist

Tüm özellikleri test etmek için:

### Temel Özellikler
- [ ] Sayfa açılıyor
- [ ] Dashboard yükleniyor
- [ ] Navigation çalışıyor
- [ ] Ayarlar açılıyor

### AI Özellikleri
- [ ] API anahtarı kaydediliyor
- [ ] AI Konuşma çalışıyor
- [ ] Mesaj gönderme/alma

### Ses Özellikleri
- [ ] Mikrofon kaydı çalışıyor
- [ ] Text-to-Speech çalışıyor
- [ ] Telaffuz analizi yapılıyor

### Veri Özellikleri
- [ ] Kelimeler kaydediliyor
- [ ] İlerleme takip ediliyor
- [ ] Streak sayılıyor
- [ ] Yedekleme çalışıyor

### Modüller
- [ ] AI Konuşma
- [ ] Speaking Practice
- [ ] Pronunciation Trainer
- [ ] Vocabulary Flashcards
- [ ] Grammar Quiz
- [ ] Daily Checklist
- [ ] Progress Dashboard

---

## 🎉 Başarılı Test!

Tüm testler başarılı ise, Flalingo kullanıma hazır! 🚀

**Sonraki Adımlar:**
1. Günlük rutininizi oluşturun
2. İlk 10 kelimeyi öğrenin
3. AI ile ilk konuşmanızı yapın
4. 7 günlük streak hedefleyin

**Başarılar! 💪**

---

## 📞 Yardım

**Hala sorun mu yaşıyorsunuz?**

1. [`README.md`](README.md:1) dosyasını okuyun
2. Console hatalarını kontrol edin (F12)
3. Tarayıcı uyumluluğunu kontrol edin
4. Farklı tarayıcı deneyin (Chrome önerilir)

---

**Son Güncelleme:** 7 Mayıs 2026  
**Test Versiyonu:** 1.0.0
