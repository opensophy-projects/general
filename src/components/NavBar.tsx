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

  const NavButton: React.FC<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    isActive?: boolean;
  }> = ({ icon, label, onClick, isActive = false }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 px-3 py-2 transition-colors ${
        isActive
          ? isNegative
            ? 'text-white'
            : 'text-black'
          : isNegative
          ? 'text-white/60 hover:text-white'
          : 'text-black/60 hover:text-black'
      }`}
    >
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );

  return (
    <>
      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 border-t transition-all duration-500 ${
          isNegative 
            ? 'bg-[#0a0a0a]/95 border-white/10 backdrop-blur-sm' 
            : 'bg-[#E8E7E3]/95 border-black/10 backdrop-blur-sm'
        }`}
      >
        <div className="flex items-center justify-center gap-4 px-6 py-1">
          {/* Left side - Hamburger + Projects */}
          <NavButton 
            icon={<Menu className="w-5 h-5" />}
            label="Меню"
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
          />
          <NavButton 
            icon={<Folder className="w-5 h-5" />}
            label="Проекты"
            onClick={() => setIsProjectsOpen(!isProjectsOpen)} 
          />

          {/* Center - Logo */}
          <a href="/" className="flex flex-col items-center justify-center gap-1 px-3 py-2">
            <img 
              src="/favicon.png" 
              alt="Opensophy" 
              className="w-7 h-7 object-contain" 
            />
          </a>

          {/* Right side - About + Theme */}
          <NavButton 
            icon={<User className="w-5 h-5" />}
            label="Обо мне"
            onClick={() => handleNavigation('about')} 
          />
          <NavButton 
            icon={isNegative ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            label="Тема"
            onClick={onToggleNegative} 
          />
        </div>
      </nav>

      {/* Hamburger Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className={`fixed inset-0 ${
              isNegative ? 'bg-black/50' : 'bg-white/50'
            } backdrop-blur-sm`} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-sm rounded-2xl border ${
                isNegative 
                  ? 'bg-[#0a0a0a] border-white/10' 
                  : 'bg-[#E8E7E3] border-black/10'
              }`}
            >
              <div className={`flex items-center justify-between p-5 border-b ${
                isNegative ? 'border-white/10' : 'border-black/10'
              }`}>
                <h3 className={`text-lg font-bold ${
                  isNegative ? 'text-white' : 'text-black'
                }`}>Навигация</h3>
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className={`p-2 rounded-lg transition-colors ${
                    isNegative 
                      ? 'text-white/70 hover:text-white active:bg-white/10' 
                      : 'text-black/70 hover:text-black active:bg-black/10'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-3">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-colors text-left border ${
                      currentPage === item.id
                        ? isNegative
                          ? 'bg-white/10 text-white border-white/20'
                          : 'bg-black/10 text-black border-black/20'
                        : isNegative
                        ? 'text-white/70 hover:text-white active:bg-white/5 border-white/10'
                        : 'text-black/70 hover:text-black active:bg-black/5 border-black/10'
                    }`}
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

      {/* Projects Modal */}
      <AnimatePresence>
        {isProjectsOpen && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={() => setIsProjectsOpen(false)}
          >
            <div className={`fixed inset-0 ${
              isNegative ? 'bg-black/50' : 'bg-white/50'
            } backdrop-blur-sm`} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-sm rounded-2xl border ${
                isNegative 
                  ? 'bg-[#0a0a0a] border-white/10' 
                  : 'bg-[#E8E7E3] border-black/10'
              }`}
            >
              <div className={`flex items-center justify-between p-5 border-b ${
                isNegative ? 'border-white/10' : 'border-black/10'
              }`}>
                <h3 className={`text-lg font-bold ${
                  isNegative ? 'text-white' : 'text-black'
                }`}>Проекты</h3>
                <button 
                  onClick={() => setIsProjectsOpen(false)} 
                  className={`p-2 rounded-lg transition-colors ${
                    isNegative 
                      ? 'text-white/70 hover:text-white active:bg-white/10' 
                      : 'text-black/70 hover:text-black active:bg-black/10'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-3">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleNavigation(project.id, project.url)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-colors text-left border ${
                      isNegative
                        ? 'text-white/70 hover:text-white active:bg-white/5 border-white/10'
                        : 'text-black/70 hover:text-black active:bg-black/5 border-black/10'
                    }`}
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