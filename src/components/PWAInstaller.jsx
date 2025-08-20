import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    // Check if app is already installed
    setIsInstalled(window.matchMedia('(display-mode: standalone)').matches);

    // Register Service Worker
    registerServiceWorker();

    // Handle install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Handle app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      
      // Show success notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Portfolio Installed! 🎉', {
          body: 'Portfolio is now available offline and can be accessed from your home screen.',
          icon: '/profile.jpg'
        });
      }
    };

    // Handle online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js');
        setRegistration(reg);
        
        console.log('PWA: Service Worker registered successfully');

        // Check for updates
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setShowUpdatePrompt(true);
            }
          });
        });

        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            console.log('PWA: Notification permission granted');
          }
        }

      } catch (error) {
        console.error('PWA: Service Worker registration failed:', error);
      }
    }
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA: Install accepted');
    } else {
      console.log('PWA: Install dismissed');
    }
    
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const handleUpdateClick = () => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  const dismissUpdate = () => {
    setShowUpdatePrompt(false);
  };

  const sharePortfolio = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Harsh Agarwal - AI/ML Engineer',
          text: 'Check out this amazing AI/ML portfolio!',
          url: window.location.origin
        });
      } catch (error) {
        console.log('PWA: Share cancelled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin);
      alert('Portfolio link copied to clipboard!');
    }
  };

  return (
    <>
      {/* Connection Status */}
      <motion.div
        className={`fixed top-4 right-4 z-50 px-3 py-2 rounded-lg text-sm font-medium ${
          isOnline 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOnline ? '🟢 Online' : '🔴 Offline'}
      </motion.div>

      {/* Install App Prompt */}
      <AnimatePresence>
        {isInstallable && !isInstalled && (
          <motion.div
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 z-50"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">📱</div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Install Portfolio App</h3>
                <p className="text-white/70 text-sm mb-3">
                  Get the full mobile app experience with offline access!
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={handleInstallClick}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
                  >
                    Install
                  </button>
                  <button
                    onClick={() => setIsInstallable(false)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Available Prompt */}
      <AnimatePresence>
        {showUpdatePrompt && (
          <motion.div
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4 z-50"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🔄</div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Update Available</h3>
                <p className="text-white/70 text-sm mb-3">
                  A new version of the portfolio is ready to install.
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={handleUpdateClick}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                  >
                    Update Now
                  </button>
                  <button
                    onClick={dismissUpdate}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PWA Features Panel (only show when installed) */}
      {isInstalled && (
        <motion.div
          className="fixed bottom-4 left-4 z-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={sharePortfolio}
            className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors"
            title="Share Portfolio"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </motion.div>
      )}
    </>
  );
};

export default PWAInstaller;
