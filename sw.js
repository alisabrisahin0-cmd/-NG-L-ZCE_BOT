// ===== Service Worker =====
// Offline support ve caching için

const CACHE_NAME = 'ustat-app-v1.0.0';
const RUNTIME_CACHE = 'ustat-app-runtime';

// Cache edilecek dosyalar
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  
  // Utils
  './utils/storage.js',
  './utils/api.js',
  './utils/audio.js',
  './utils/charts.js',
  './utils/grammar-guardian.js',
  './utils/ai-learning-engine.js',
  './utils/google-keep-parser.js',
  './utils/gamification.js',
  './utils/app-extensions.js',
  
  // Modules
  './modules/ai-chatbot.js',
  './modules/speaking.js',
  './modules/pronunciation.js',
  './modules/vocabulary.js',
  './modules/grammar.js',
  
  // Data
  './data/vocabulary.json',
  
  // External
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Install event - cache dosyaları
self.addEventListener('install', event => {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - eski cache'leri temizle
self.addEventListener('activate', event => {
  console.log('✅ Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - cache-first strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // API istekleri için network-first
  if (url.pathname.includes('/api/') || url.hostname.includes('googleapis.com') || url.hostname.includes('openai.com')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Diğer istekler için cache-first
  event.respondWith(cacheFirst(request));
});

// Cache-first strategy
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    
    // Cache'e ekle
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.error('Fetch failed:', error);
    
    // Offline fallback
    if (request.destination === 'document') {
      return cache.match('./index.html');
    }
    
    throw error;
  }
}

// Network-first strategy (API için)
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  
  try {
    const response = await fetch(request);
    
    // Cache'e ekle
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.error('Network request failed, trying cache:', error);
    
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    
    throw error;
  }
}

// Background sync (gelecek özellik)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // LocalStorage verilerini sync et
  console.log('🔄 Syncing data...');
}

// Push notifications (gelecek özellik)
self.addEventListener('push', event => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/assets/icon-192.png',
    badge: '/assets/icon-72.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

console.log('🚀 Service Worker loaded');
