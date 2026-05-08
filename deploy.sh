#!/bin/bash

# ÜSTAT APP - GitHub Pages Deploy Script
# Bu script uygulamanızı GitHub'a yükler

echo "🚀 ÜSTAT APP Deploy Başlıyor..."
echo ""

# Git kontrolü
if ! command -v git &> /dev/null; then
    echo "❌ Git yüklü değil! Lütfen Git'i yükleyin."
    exit 1
fi

# Değişiklikleri kontrol et
if [[ -z $(git status -s) ]]; then
    echo "✅ Değişiklik yok, deploy gerekmiyor."
    exit 0
fi

# Kullanıcıdan commit mesajı al
echo "📝 Commit mesajı girin (boş bırakırsanız otomatik oluşturulur):"
read -r commit_message

if [ -z "$commit_message" ]; then
    commit_message="Update: $(date '+%Y-%m-%d %H:%M:%S')"
fi

echo ""
echo "📦 Değişiklikler ekleniyor..."
git add .

echo "💾 Commit yapılıyor: $commit_message"
git commit -m "$commit_message"

echo "🚀 GitHub'a yükleniyor..."
git push origin main

echo ""
echo "✅ Deploy tamamlandı!"
echo ""
echo "🌐 Uygulamanız 2-5 dakika içinde güncellenecek:"
echo "   https://KULLANICI_ADINIZ.github.io/ustat-app/"
echo ""
echo "💡 İpucu: GitHub Actions'da deploy durumunu kontrol edebilirsiniz"
echo "   Repository → Actions sekmesi"
echo ""
