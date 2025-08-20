const CACHE_NAME = 'harsh-portfolio-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/App.css',
  '/src/index.css',
  '/profile.jpg',
  '/vite.svg',
  // Add component files
  '/src/components/VisitorStats.jsx',
  '/src/components/GitHubStats.jsx',
  '/src/components/SkillsProgress.jsx',
  '/src/components/SkillsLineChart.jsx',
  '/src/components/ChatBot.jsx',
  // Assets
  '/src/assets/Harsh_Agarwal_Resume.pdf',
  // External APIs - cache responses
];

// Install Service Worker
self.addEventListener('install', (event) => {
  console.log('SW: Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('SW: Cache opened');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('SW: Cache installation failed:', error);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  console.log('SW: Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Claim control of all clients immediately
  self.clients.claim();
});

// Fetch Strategy: Cache First with Network Fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('SW: Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Add to cache for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                // Only cache GET requests
                if (event.request.method === 'GET') {
                  cache.put(event.request, responseToCache);
                }
              });

            console.log('SW: Fetched and cached:', event.request.url);
            return response;
          })
          .catch((error) => {
            console.log('SW: Fetch failed, serving offline content:', error);
            
            // Return offline page for navigation requests
            if (event.request.destination === 'document') {
              return caches.match('/offline.html');
            }
            
            // Return offline image for image requests
            if (event.request.destination === 'image') {
              return caches.match('/offline-image.svg');
            }
            
            // For API requests, return a basic offline response
            if (event.request.url.includes('/api/') || event.request.url.includes('github.com/api')) {
              return new Response(JSON.stringify({
                error: 'Offline',
                message: 'No internet connection available',
                offline: true
              }), {
                headers: { 'Content-Type': 'application/json' }
              });
            }
          });
      })
  );
});

// Background Sync for API requests when back online
self.addEventListener('sync', (event) => {
  console.log('SW: Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync-analytics') {
    event.waitUntil(syncAnalytics());
  }
  
  if (event.tag === 'background-sync-github') {
    event.waitUntil(syncGitHubData());
  }
});

// Push Notifications
self.addEventListener('push', (event) => {
  console.log('SW: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/profile.jpg',
    badge: '/vite.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Portfolio',
        icon: '/vite.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/vite.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Harsh Portfolio Update', options)
  );
});

// Notification Click Handler
self.addEventListener('notificationclick', (event) => {
  console.log('SW: Notification clicked:', event.action);
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper function to sync analytics when back online
async function syncAnalytics() {
  try {
    // Sync any pending analytics data
    const pendingData = await self.indexedDB.getAll('pending-analytics');
    if (pendingData && pendingData.length > 0) {
      // Send pending analytics to server when online
      console.log('SW: Syncing analytics data...');
      // Implementation for syncing analytics
    }
  } catch (error) {
    console.error('SW: Analytics sync failed:', error);
  }
}

// Helper function to sync GitHub data when back online
async function syncGitHubData() {
  try {
    console.log('SW: Syncing GitHub data...');
    // Refresh GitHub data when back online
    const cache = await caches.open(CACHE_NAME);
    await cache.delete('https://api.github.com/users/Harsh741334');
    await cache.delete('https://api.github.com/users/Harsh741334/repos');
  } catch (error) {
    console.error('SW: GitHub sync failed:', error);
  }
}

// Update notification
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
