import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from './hooks/useIsMobile';
import { cn } from './lib/utils';
import NavBar from './components/NavBar';
import LoadingScreen from './components/LoadingScreen';

const General = React.lazy(() => import('./components/pages/General'));
const Contacts = React.lazy(() => import('./components/pages/Contacts'));
const Menu = React.lazy(() => import('./components/Menu'));

const ALLOWED_ROUTES = ['/', '/contacts'];

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNegative, setIsNegative] = React.useState(true);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const isMobile = useIsMobile();

  const currentPage = React.useMemo(() => {
    const path = location.pathname;
    if (path === '/') return 'general';
    if (path === '/contacts') return 'contacts';
    return 'general';
  }, [location.pathname]);

  const handleNavigate = React.useCallback((page: 'general' | 'contacts' | 'ui-components' | 'docs') => {
    const routes = {
      general: '/',
      contacts: '/contacts',
      'ui-components': '',
      docs: ''
    };
    const route = routes[page];
    if (route && route.startsWith('http')) {
      window.open(route, '_blank');
    } else if (route) {
      navigate(route);
    }
  }, [navigate]);

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = React.useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleNegative = React.useCallback(() => {
    setIsNegative(prev => !prev);
  }, []);

  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      setError(event.error);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E8E7E3]">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4 text-black">Something went wrong</h1>
          <p className="text-black/70 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-black/80"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'general':
        return (
          <React.Suspense fallback={<LoadingScreen isNegative={isNegative} />}>
            <General isNegative={isNegative} />
          </React.Suspense>
        );
      case 'contacts':
        return (
          <React.Suspense fallback={<LoadingScreen isNegative={isNegative} />}>
            <Contacts isNegative={isNegative} />
          </React.Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen relative overflow-hidden transition-all duration-500",
        isNegative ? 'bg-[#0a0a0a]' : 'bg-[#E8E7E3]'
      )}
    >
      <NavBar
        onMenuClick={toggleMenu}
        isNegative={isNegative}
        onToggleNegative={toggleNegative}
        currentPage={currentPage as any}
        onNavigate={handleNavigate}
      />

      <React.Suspense fallback={null}>
        <Menu
          isOpen={isMenuOpen}
          onClose={closeMenu}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isNegative={isNegative}
        />
      </React.Suspense>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {renderCurrentPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {ALLOWED_ROUTES.map(route => (
          <Route key={route} path={route} element={<AppContent />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
