import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, Folder, User, X, Home, Package, ArrowUpRight, Mail } from 'lucide-react';

interface NavBarProps {
  onMenuClick: () => void;
  isNegative: boolean;
  onToggleNegative: () => void;
  currentPage: string;
  onNavigate: (page: 'general' | 'contacts' | 'hub' | 'about') => void;
}

const NavButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  isNegative: boolean;
}> = ({ icon, label, onClick, isActive = false, isNegative }) => {
  const getTextColor = () => {
    if (isActive) {
      return isNegative ? 'text-white' : 'text-black';
    }
    return isNegative ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black';
  };

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 transition-colors ${getTextColor()}`}
    >
      <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
      <span className="text-[9px] font-medium whitespace-nowrap">{label}</span>
    </button>
  );
};

const NavBar: React.FC<NavBarProps> = ({
  onMenuClick,
  isNegative,
  onToggleNegative,
  currentPage,
  onNavigate
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  const menuItems = [
    { id: 'general', label: 'Главная', description: 'Основная информация', icon: <Home className="w-5 h-5" /> },
    { id: 'contacts', label: 'Контакты', description: 'Связаться с нами', icon: <Mail className="w-5 h-5" /> }
  ];

  const projects = [
    { id: 'hub', label: 'Хаб', description: 'Образовательные ресурсы', url: 'https://hub.opensophy.com' }
  ];

  const handleNavigation = (page: string, url?: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      onNavigate(page as any);
    }
    setIsMenuOpen(false);
    setIsProjectsOpen(false);
  };

  const getMenuButtonStyle = (isCurrentPage: boolean) => {
    if (isCurrentPage) {
      return isNegative
        ? 'bg-white/10 text-white border-white/20'
        : 'bg-black/10 text-black border-black/20';
    }
    return isNegative
      ? 'text-white/70 hover:text-white active:bg-white/5 border-white/10'
      : 'text-black/70 hover:text-black active:bg-black/5 border-black/10';
  };

  const getProjectButtonStyle = () => {
    return isNegative
      ? 'text-white/70 hover:text-white active:bg-white/5 border-white/10'
      : 'text-black/70 hover:text-black active:bg-black/5 border-black/10';
  };

  return (
    <>
      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 border-t transition-all duration-500 ${
          isNegative 
            ? 'bg-[#0a0a0a]/95 border-white/10 backdrop-blur-sm' 
            : 'bg-[#E8E7E3]/95 border-black/10 backdrop-blur-sm'
        }`}
      >
        <div className="flex items-center justify-around px-3 py-1">
          <NavButton 
            icon={<Menu className="w-5 h-5" />}
            label="Меню"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            isNegative={isNegative}
          />
          <NavButton 
            icon={<Folder className="w-5 h-5" />}
            label="Проекты"
            onClick={() => setIsProjectsOpen(!isProjectsOpen)}
            isNegative={isNegative}
          />

          <a href="/" className="flex items-center justify-center px-2 py-1">
            <img 
              src="/favicon.png" 
              alt="Opensophy" 
              className="w-10 h-10 object-contain" 
            />
          </a>

          <NavButton 
            icon={<User className="w-5 h-5" />}
            label="Обо мне"
            onClick={() => handleNavigation('about')}
            isNegative={isNegative}
          />
          <NavButton 
            icon={isNegative ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            label="Тема"
            onClick={onToggleNegative}
            isNegative={isNegative}
          />
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div 
              className={`fixed inset-0 ${isNegative ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm`}
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="menu-modal-title"
              className={`relative w-full max-w-sm rounded-2xl border ${
                isNegative 
                  ? 'bg-[#0a0a0a] border-white/10' 
                  : 'bg-[#E8E7E3] border-black/10'
              }`}
            >
              <div className={`flex items-center justify-between p-5 border-b ${
                isNegative ? 'border-white/10' : 'border-black/10'
              }`}>
                <h3 id="menu-modal-title" className={`text-lg font-bold ${
                  isNegative ? 'text-white' : 'text-black'
                }`}>Навигация</h3>
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className={`p-2 rounded-lg transition-colors ${
                    isNegative 
                      ? 'text-white/70 hover:text-white active:bg-white/10' 
                      : 'text-black/70 hover:text-black active:bg-black/10'
                  }`}
                  aria-label="Закрыть меню"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-3">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-colors text-left border ${getMenuButtonStyle(currentPage === item.id)}`}
                  >
                    {item.icon}
                    <div className="flex-1">
                      <div className="font-semibold text-base">{item.label}</div>
                      <div className={`text-xs mt-0.5 ${
                        isNegative ? 'text-white/50' : 'text-black/50'
                      }`}>{item.description}</div>
                    </div>
                    {currentPage === item.id && (
                      <div className={`w-2 h-2 rounded-full ${
                        isNegative ? 'bg-white' : 'bg-black'
                      }`} />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProjectsOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div 
              className={`fixed inset-0 ${isNegative ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm`}
              onClick={() => setIsProjectsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="projects-modal-title"
              className={`relative w-full max-w-sm rounded-2xl border ${
                isNegative 
                  ? 'bg-[#0a0a0a] border-white/10' 
                  : 'bg-[#E8E7E3] border-black/10'
              }`}
            >
              <div className={`flex items-center justify-between p-5 border-b ${
                isNegative ? 'border-white/10' : 'border-black/10'
              }`}>
                <h3 id="projects-modal-title" className={`text-lg font-bold ${
                  isNegative ? 'text-white' : 'text-black'
                }`}>Проекты</h3>
                <button 
                  onClick={() => setIsProjectsOpen(false)} 
                  className={`p-2 rounded-lg transition-colors ${
                    isNegative 
                      ? 'text-white/70 hover:text-white active:bg-white/10' 
                      : 'text-black/70 hover:text-black active:bg-black/10'
                  }`}
                  aria-label="Закрыть проекты"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-3">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleNavigation(project.id, project.url)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-colors text-left border ${getProjectButtonStyle()}`}
                  >
                    <Package className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-semibold text-base">{project.label}</div>
                      <div className={`text-xs mt-0.5 ${
                        isNegative ? 'text-white/50' : 'text-black/50'
                      }`}>{project.description}</div>
                    </div>
                    {project.url && (
                      <ArrowUpRight className={`w-4 h-4 ${
                        isNegative ? 'text-white/50' : 'text-black/40'
                      }`} />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
