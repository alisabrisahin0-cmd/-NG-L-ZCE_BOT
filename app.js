// ===== Main Application =====
// ÜSTAT APP - AI-Powered English Learning Platform

import storage from './utils/storage.js';
import aiProvider from './utils/api.js';
import audioManager from './utils/audio.js';
import chartsManager from './utils/charts.js';

// YENİ: AI-Powered Features
import { appExtensions, grammarGuardian, aiLearningEngine, googleKeepParser, gamification } from './utils/app-extensions.js';

class FlalingoApp {
  constructor() {
    this.currentModule = 'dashboard';
    this.modules = {};
    this.userData = null;
    this.progressData = null;
    this.settings = null;
    
    this.init();
  }

  // Initialize application
  async init() {
    console.log('🚀 ÜSTAT APP başlatılıyor...');
    
    // Load user data
    this.loadUserData();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Load initial module
    await this.loadModule('dashboard');
    
    // Update UI
    this.updateUI();
    
    // Check and update streak
    this.checkStreak();
    
    console.log('✅ ÜSTAT APP hazır!');
  }

  // Load user data from storage
  loadUserData() {
    this.userData = storage.getUser();
    this.progressData = storage.getProgress();
    this.settings = storage.getSettings();
    
    // Set storage reference for AI provider
    aiProvider.setStorage(storage);
    
    // Configure AI provider
    aiProvider.setProvider(this.settings.aiProvider);
    
    // For backward compatibility, check if old apiKey exists
    if (this.settings.apiKey) {
      aiProvider.setApiKey(this.settings.apiKey);
    }
  }

  // Setup event listeners
  setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const module = e.currentTarget.dataset.module;
        this.switchModule(module);
      });
    });

    // Settings button
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => this.openSettings());
    }

    // Settings modal
    const closeSettings = document.getElementById('closeSettings');
    if (closeSettings) {
      closeSettings.addEventListener('click', () => this.closeSettings());
    }

    const saveSettings = document.getElementById('saveSettings');
    if (saveSettings) {
      saveSettings.addEventListener('click', () => this.saveSettings());
    }

    const resetData = document.getElementById('resetData');
    if (resetData) {
      resetData.addEventListener('click', () => this.resetData());
    }

    // Quick actions
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        this.handleQuickAction(action);
      });
    });

    // Close modal on outside click
    const modal = document.getElementById('settingsModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeSettings();
        }
      });
    }
  }

  // Switch to different module
  async switchModule(moduleName) {
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.module === moduleName) {
        item.classList.add('active');
      }
    });

    // Load module
    await this.loadModule(moduleName);
    this.currentModule = moduleName;
  }

  // Load module dynamically
  async loadModule(moduleName) {
    this.showLoading();

    try {
      const content = document.getElementById('mainContent');
      
      switch (moduleName) {
        case 'dashboard':
          content.innerHTML = this.renderDashboard();
          // Chart is initialized in renderDashboard via setTimeout
          break;
        case 'ai-chat':
          content.innerHTML = this.renderAIChat();
          await this.initAIChat();
          break;
        case 'speaking':
          content.innerHTML = this.renderSpeaking();
          await this.initSpeaking();
          break;
        case 'pronunciation':
          content.innerHTML = this.renderPronunciation();
          await this.initPronunciation();
          break;
        case 'vocabulary':
          content.innerHTML = this.renderVocabulary();
          await this.initVocabulary();
          break;
        case 'grammar':
          content.innerHTML = this.renderGrammar();
          await this.initGrammar();
          break;
        case 'checklist':
          content.innerHTML = this.renderChecklist();
          this.initChecklist();
          break;
        case 'progress':
          content.innerHTML = this.renderProgress();
          await this.initProgress();
          break;
        default:
          content.innerHTML = '<p>Modül bulunamadı</p>';
      }
    } catch (error) {
      console.error('Module load error:', error);
      this.showToast('Modül yüklenirken hata oluştu: ' + error.message, 'error');
    } finally {
      this.hideLoading();
    }
  }

  // Render Dashboard
  renderDashboard() {
    const today = new Date().toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // After rendering, initialize the chart
    setTimeout(() => {
      this.initDashboardChart();
    }, 100);

    return `
      <div class="dashboard">
        <div class="dashboard-header">
          <h2>Hoş Geldin, ${this.userData.name}! 👋</h2>
          <p class="text-muted">${today}</p>
        </div>

        <div class="grid grid-3 mt-3">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">📚 Kelime Dağarcığı</h3>
            </div>
            <div class="card-body">
              <div class="stat-large">
                <span class="stat-value">${this.progressData.vocabularyMastered.length}</span>
                <span class="stat-label">Öğrenilen Kelime</span>
              </div>
              <button class="btn btn-primary mt-2" onclick="app.switchModule('vocabulary')">
                Kelime Çalış
              </button>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">✅ Gramer</h3>
            </div>
            <div class="card-body">
              <div class="stat-large">
                <span class="stat-value">${this.progressData.grammarCompleted.length}</span>
                <span class="stat-label">Tamamlanan Egzersiz</span>
              </div>
              <button class="btn btn-primary mt-2" onclick="app.switchModule('grammar')">
                Gramer Çalış
              </button>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">🗣️ Telaffuz</h3>
            </div>
            <div class="card-body">
              <div class="stat-large">
                <span class="stat-value">${this.progressData.pronunciationScore}%</span>
                <span class="stat-label">Telaffuz Skoru</span>
              </div>
              <button class="btn btn-primary mt-2" onclick="app.switchModule('pronunciation')">
                Telaffuz Çalış
              </button>
            </div>
          </div>
        </div>

        <div class="grid grid-2 mt-3">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">📊 Haftalık İlerleme</h3>
            </div>
            <div class="card-body">
              <canvas id="weeklyChart" height="200"></canvas>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">🎯 Bugünkü Hedefler</h3>
            </div>
            <div class="card-body">
              <div class="checklist-preview">
                <div class="checklist-item">
                  <input type="checkbox" id="morning-preview" disabled>
                  <label>Sabah: Telaffuz Çalışması (10 dk)</label>
                </div>
                <div class="checklist-item">
                  <input type="checkbox" id="midday-preview" disabled>
                  <label>Öğle: Gramer Egzersizi (15 dk)</label>
                </div>
                <div class="checklist-item">
                  <input type="checkbox" id="evening-preview" disabled>
                  <label>Akşam: Kelime + Flalingo (30 dk)</label>
                </div>
              </div>
              <button class="btn btn-primary mt-2" onclick="app.switchModule('checklist')">
                Detaylı Plan
              </button>
            </div>
          </div>
        </div>

        <div class="card mt-3">
          <div class="card-header">
            <h3 class="card-title">💡 Bugünün Önerisi</h3>
          </div>
          <div class="card-body">
            <p><strong>Odak:</strong> ${this.getDailyFocus()}</p>
            <p class="text-muted mt-1">${this.getDailyTip()}</p>
          </div>
        </div>
      </div>
    `;
  }

  // Initialize dashboard chart
  initDashboardChart() {
    const weeklyData = chartsManager.generateWeeklyData(this.progressData.dailyStats || {});
    chartsManager.createLineChart('weeklyChart', weeklyData, {
      label: 'Çalışma Süresi (dk)',
      color: '#4F46E5'
    });
  }

  // Render AI Chat (placeholder)
  renderAIChat() {
    return `
      <div class="ai-chat-module">
        <h2>🤖 AI Konuşma Partneri</h2>
        <p class="text-muted">Gemini AI ile İngilizce pratik yapın</p>
        
        <div class="chat-container" id="chatContainer">
          <div class="chat-messages" id="chatMessages">
            <div class="chat-message assistant">
              <p>Hello! I'm your AI English practice partner. Let's practice English together! 
              Feel free to talk about your work in textile export, or any topic you'd like. 
              I'll help you with grammar, vocabulary, and pronunciation. 😊</p>
            </div>
          </div>
          
          <div class="chat-input-container">
            <textarea id="chatInput" placeholder="Mesajınızı yazın..." rows="3"></textarea>
            <div class="chat-actions">
              <button class="btn btn-secondary" id="voiceInputBtn">🎤 Sesli</button>
              <button class="btn btn-primary" id="sendMessageBtn">Gönder</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Render Speaking Practice (placeholder)
  renderSpeaking() {
    return `
      <div class="speaking-module">
        <h2>🗣️ Speaking Practice</h2>
        <p class="text-muted">Mikrofon ile konuşma pratiği yapın</p>
        
        <div class="card mt-3">
          <div class="card-body text-center">
            <p><strong>Şu cümleyi söyleyin:</strong></p>
            <p class="text-primary" style="font-size: 1.5rem;" id="practiceText">I work in textile export.</p>
            
            <div class="mt-3">
              <button class="btn btn-primary" id="recordBtn">🎤 Kaydet</button>
              <button class="btn btn-secondary" id="playbackBtn" disabled>▶️ Dinle</button>
              <button class="btn btn-secondary" id="speakBtn">🔊 Örnek Dinle</button>
            </div>
            
            <div id="recordingStatus" class="mt-2"></div>
            <div id="pronunciationResult" class="mt-3"></div>
          </div>
        </div>
      </div>
    `;
  }

  // Render Pronunciation (placeholder)
  renderPronunciation() {
    return `
      <div class="pronunciation-module">
        <h2>📢 Pronunciation Trainer</h2>
        <p class="text-muted">Telaffuz egzersizleri ve minimal pairs pratiği</p>
        
        <div class="card mt-3">
          <div class="card-header">
            <h3 class="card-title">/w/ vs /v/ Minimal Pairs</h3>
          </div>
          <div class="card-body">
            <div class="minimal-pairs-grid" id="minimalPairs">
              <p class="text-muted">Yükleniyor...</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Render Vocabulary (placeholder)
  renderVocabulary() {
    return `
      <div class="vocabulary-module">
        <h2>📝 Vocabulary Flashcards</h2>
        <p class="text-muted">Kelime kartları ile çalışın</p>
        
        <div class="vocabulary-categories mt-3">
          <button class="btn btn-primary" data-category="corporate_hr">İK & Kurumsal</button>
          <button class="btn btn-primary" data-category="textile_production">Tekstil Üretimi</button>
          <button class="btn btn-primary" data-category="logistics_export">Lojistik & İhracat</button>
        </div>
        
        <div id="flashcardContainer" class="mt-3">
          <p class="text-muted text-center">Bir kategori seçin</p>
        </div>
      </div>
    `;
  }

  // Render Grammar (placeholder)
  renderGrammar() {
    return `
      <div class="grammar-module">
        <h2>✅ Grammar Quiz</h2>
        <p class="text-muted">Gramer egzersizleri ve quizler</p>
        
        <div class="card mt-3">
          <div class="card-body">
            <h3>Past Simple Transformation</h3>
            <p>Aşağıdaki cümleyi Past Simple'a çevirin:</p>
            <p class="text-primary"><strong>I wake up at 7 a.m.</strong></p>
            
            <input type="text" class="form-control mt-2" id="grammarAnswer" placeholder="Cevabınızı yazın...">
            <button class="btn btn-primary mt-2" id="checkGrammarBtn">Kontrol Et</button>
            
            <div id="grammarFeedback" class="mt-3"></div>
          </div>
        </div>
      </div>
    `;
  }

  // Render Checklist (placeholder)
  renderChecklist() {
    const today = new Date().toISOString().split('T')[0];
    const checklist = storage.getChecklist(today);
    
    return `
      <div class="checklist-module">
        <h2>✅ Günlük Çalışma Planı</h2>
        <p class="text-muted">Bugünkü hedeflerinizi tamamlayın</p>
        
        <div class="card mt-3">
          <div class="card-body">
            <div class="checklist-item-large">
              <input type="checkbox" id="morning" ${checklist.morning ? 'checked' : ''}>
              <div>
                <label for="morning"><strong>Sabah (10 dakika)</strong></label>
                <p class="text-muted">Telaffuz çalışması: /w/ vs /v/ minimal pairs</p>
              </div>
            </div>
            
            <div class="checklist-item-large">
              <input type="checkbox" id="midday" ${checklist.midday ? 'checked' : ''}>
              <div>
                <label for="midday"><strong>Öğle (15-20 dakika)</strong></label>
                <p class="text-muted">Gramer: Past Simple transformation drills</p>
              </div>
            </div>
            
            <div class="checklist-item-large">
              <input type="checkbox" id="evening" ${checklist.evening ? 'checked' : ''}>
              <div>
                <label for="evening"><strong>Akşam (20-30 dakika)</strong></label>
                <p class="text-muted">Kelime çalışması + Flalingo canlı ders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Render Progress (placeholder)
  renderProgress() {
    return `
      <div class="progress-module">
        <h2>📊 İlerleme Raporu</h2>
        <p class="text-muted">Öğrenme istatistikleriniz</p>
        
        <div class="grid grid-3 mt-3">
          <div class="card">
            <div class="card-body text-center">
              <h3 class="text-primary">${this.progressData.totalDays}</h3>
              <p class="text-muted">Toplam Gün</p>
            </div>
          </div>
          <div class="card">
            <div class="card-body text-center">
              <h3 class="text-primary">${this.progressData.totalWords}</h3>
              <p class="text-muted">Öğrenilen Kelime</p>
            </div>
          </div>
          <div class="card">
            <div class="card-body text-center">
              <h3 class="text-primary">${this.progressData.totalExercises}</h3>
              <p class="text-muted">Tamamlanan Egzersiz</p>
            </div>
          </div>
        </div>
        
        <div class="card mt-3">
          <div class="card-header">
            <h3 class="card-title">Aylık İlerleme</h3>
          </div>
          <div class="card-body">
            <canvas id="monthlyChart" height="250"></canvas>
          </div>
        </div>
      </div>
    `;
  }

  // Initialize modules (placeholders for now)
  async initAIChat() {
    console.log('AI Chat initialized');
    
    // Import and initialize AI chatbot module
    try {
      const { default: aiChatbot } = await import('./modules/ai-chatbot.js');
      aiChatbot.init();
    } catch (error) {
      console.error('AI Chatbot init error:', error);
    }
  }

  async initSpeaking() {
    console.log('Speaking module initialized');
    try {
      const { default: speakingModule } = await import('./modules/speaking.js');
      speakingModule.init();
    } catch (error) {
      console.error('Speaking module init error:', error);
    }
  }

  async initPronunciation() {
    console.log('Pronunciation module initialized');
    try {
      const { default: pronunciationModule } = await import('./modules/pronunciation.js');
      pronunciationModule.init();
    } catch (error) {
      console.error('Pronunciation module init error:', error);
    }
  }

  async initVocabulary() {
    console.log('Vocabulary module initialized');
    try {
      const { default: vocabularyModule } = await import('./modules/vocabulary.js');
      await vocabularyModule.init();
    } catch (error) {
      console.error('Vocabulary module init error:', error);
    }
  }

  async initGrammar() {
    console.log('Grammar module initialized');
    try {
      const { default: grammarModule } = await import('./modules/grammar.js');
      grammarModule.init();
    } catch (error) {
      console.error('Grammar module init error:', error);
    }
  }

  initChecklist() {
    const today = new Date().toISOString().split('T')[0];
    
    ['morning', 'midday', 'evening'].forEach(period => {
      const checkbox = document.getElementById(period);
      if (checkbox) {
        checkbox.addEventListener('change', (e) => {
          storage.updateChecklist(today, period, e.target.checked);
          this.updateUI();
          if (e.target.checked) {
            this.showToast('Harika! Devam et! 🎉', 'success');
          }
        });
      }
    });
  }

  async initProgress() {
    // Load charts
    const weeklyData = chartsManager.generateWeeklyData(this.progressData.dailyStats || {});
    chartsManager.createLineChart('weeklyChart', weeklyData, {
      label: 'Çalışma Süresi (dk)',
      color: '#4F46E5'
    });
  }

  // Handle quick actions
  handleQuickAction(action) {
    switch (action) {
      case 'daily-practice':
        this.switchModule('checklist');
        break;
      case 'vocabulary-review':
        this.switchModule('vocabulary');
        break;
      case 'pronunciation-drill':
        this.switchModule('pronunciation');
        break;
    }
  }

  // Get daily focus based on day of week
  getDailyFocus() {
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const focuses = {
      'Pazar': 'Konsolidasyon & Gözden Geçirme',
      'Pazartesi': 'Lojistik & Ticaret Kelimeleri',
      'Salı': 'Past Simple Anlatımlar',
      'Çarşamba': 'Tekstil Üretimi ESP',
      'Perşembe': 'Gramer - Olumsuzluk & Yardımcı Fiiller',
      'Cuma': 'Telaffuz & Konuşma',
      'Cumartesi': 'Canlı Öğretmen Pratiği'
    };
    
    const today = days[new Date().getDay()];
    return focuses[today];
  }

  // Get daily tip
  getDailyTip() {
    const tips = [
      'Bugün /w/ ve /v/ seslerini ayırt etmeye odaklanın.',
      'Past Simple cümleler kurarken "did" yardımcı fiilini unutmayın.',
      'Tekstil terimleri ile ilgili 3 cümle yazın ve sesli okuyun.',
      'He/she zamirlerini kullanmadan önce bilinçli duraklamayı deneyin.',
      'Minimal pairs ile telaffuz pratiği yapın: west/vest, wine/vine.',
      'Bugün öğrendiğiniz kelimeleri cümle içinde kullanmayı deneyin.'
    ];
    
    return tips[Math.floor(Math.random() * tips.length)];
  }

  // Update UI elements
  updateUI() {
    // Update streak
    const streakCount = document.querySelector('.streak-count');
    if (streakCount) {
      streakCount.textContent = this.userData.streak;
    }

    // Update today's stats
    const todayStats = storage.getTodayStats();
    const todayWords = document.getElementById('todayWords');
    const todayExercises = document.getElementById('todayExercises');
    const todayTime = document.getElementById('todayTime');
    
    if (todayWords) todayWords.textContent = todayStats.words;
    if (todayExercises) todayExercises.textContent = todayStats.exercises;
    if (todayTime) todayTime.textContent = `${todayStats.minutes} dk`;

    // Update footer stats
    const totalWords = document.getElementById('totalWords');
    const totalExercises = document.getElementById('totalExercises');
    const lastActivity = document.getElementById('lastActivity');
    
    if (totalWords) totalWords.textContent = this.progressData.totalWords;
    if (totalExercises) totalExercises.textContent = this.progressData.totalExercises;
    if (lastActivity && this.userData.lastStudyDate) {
      const date = new Date(this.userData.lastStudyDate);
      lastActivity.textContent = date.toLocaleDateString('tr-TR');
    }
  }

  // Check and update streak
  checkStreak() {
    storage.updateStreak();
    this.userData = storage.getUser();
    this.updateUI();
  }

  // Open settings modal
  openSettings() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
      modal.classList.add('active');
      
      // Populate settings
      document.getElementById('aiProvider').value = this.settings.aiProvider || 'gemini';
      document.getElementById('apiKey').value = this.settings.apiKey || '';
      document.getElementById('voiceEnabled').checked = this.settings.voiceEnabled !== false;
      document.getElementById('notificationsEnabled').checked = this.settings.notifications || false;
    }
  }

  // Close settings modal
  closeSettings() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  // Save settings
  saveSettings() {
    const apiKeyInput = document.getElementById('apiKey').value;
    const provider = document.getElementById('aiProvider').value;
    
    // Get current settings
    const currentSettings = storage.getSettings();
    
    // Update API key in the multi-key system
    if (apiKeyInput) {
      if (!currentSettings.apiKeys) {
        currentSettings.apiKeys = { gemini: ['', '', ''], openai: ['', '', ''], claude: ['', '', ''] };
      }
      if (!currentSettings.apiKeys[provider]) {
        currentSettings.apiKeys[provider] = ['', '', ''];
      }
      // Set as first key
      currentSettings.apiKeys[provider][0] = apiKeyInput;
    }
    
    const settings = {
      ...currentSettings,
      aiProvider: provider,
      apiKey: apiKeyInput, // Keep for backward compatibility
      voiceEnabled: document.getElementById('voiceEnabled').checked,
      notifications: document.getElementById('notificationsEnabled').checked
    };

    storage.updateSettings(settings);
    this.settings = settings;
    
    // Update AI provider
    aiProvider.setProvider(settings.aiProvider);
    aiProvider.setApiKey(settings.apiKey);
    
    this.showToast('Ayarlar kaydedildi! ✅', 'success');
    this.closeSettings();
  }

  // Reset data
  resetData() {
    if (confirm('Tüm verileriniz silinecek. Emin misiniz?')) {
      storage.resetData();
      this.loadUserData();
      this.updateUI();
      this.showToast('Veriler sıfırlandı', 'success');
      this.closeSettings();
      this.switchModule('dashboard');
    }
  }

  // Show loading overlay
  showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.classList.add('active');
    }
  }

  // Hide loading overlay
  hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  }

  // Show toast notification
  showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (toast) {
      const messageEl = toast.querySelector('.toast-message');
      if (messageEl) {
        messageEl.textContent = message;
      }
      
      toast.className = 'toast show';
      if (type) {
        toast.classList.add(type);
      }
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }
}

// YENİ: App Extensions'ı FlalingoApp'e ekle
Object.assign(FlalingoApp.prototype, appExtensions);

// Initialize app when DOM is ready
let app;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    app = new FlalingoApp();
    window.app = app; // Make available globally for onclick handlers
    
    // YENİ: Global erişim için modülleri ekle
    window.grammarGuardian = grammarGuardian;
    window.aiLearningEngine = aiLearningEngine;
    window.gamification = gamification;
  });
} else {
  app = new FlalingoApp();
  window.app = app;
  
  // YENİ: Global erişim için modülleri ekle
  window.grammarGuardian = grammarGuardian;
  window.aiLearningEngine = aiLearningEngine;
  window.gamification = gamification;
}

export default FlalingoApp;
