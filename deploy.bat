@echo off
REM ÜSTAT APP - GitHub Pages Deploy Script (Windows)
REM Bu script uygulamanızı GitHub'a yükler

echo 🚀 ÜSTAT APP Deploy Başlıyor...
echo.

REM Git kontrolü
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Git yüklü değil! Lütfen Git'i yükleyin.
    pause
    exit /b 1
)

REM Değişiklikleri kontrol et
git status --short >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Değişiklikler tespit edildi
) else (
    echo ✅ Değişiklik yok, deploy gerekmiyor.
    pause
    exit /b 0
)

REM Kullanıcıdan commit mesajı al
set /p commit_message="📝 Commit mesajı girin (Enter = otomatik): "

if "%commit_message%"=="" (
    for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set mydate=%%c-%%b-%%a
    for /f "tokens=1-2 delims=: " %%a in ('time /t') do set mytime=%%a:%%b
    set commit_message=Update: %mydate% %mytime%
)

echo.
echo 📦 Değişiklikler ekleniyor...
git add .

echo 💾 Commit yapılıyor: %commit_message%
git commit -m "%commit_message%"

echo 🚀 GitHub'a yükleniyor...
git push origin main

echo.
echo ✅ Deploy tamamlandı!
echo.
echo 🌐 Uygulamanız 2-5 dakika içinde güncellenecek:
echo    https://KULLANICI_ADINIZ.github.io/ustat-app/
echo.
echo 💡 İpucu: GitHub Actions'da deploy durumunu kontrol edebilirsiniz
echo    Repository → Actions sekmesi
echo.
pause
