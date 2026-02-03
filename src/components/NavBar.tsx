import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, Folder, User, X, Home, Package, ArrowUpRight } from 'lucide-react';

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
    { id: 'contacts', label: 'Контакты', description: 'Связаться с нами', icon: <Menu className="w-5 h-5" /> }
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
    onClick: () => void;
    isActive?: boolean;
  }> = ({ icon, onClick, isActive = false }) => (
    <button
      onClick={onClick}
      className={`w-12 h-12 flex items-center justify-center transition-colors ${
        isActive
          ? isNegative
            ? 'text-white'
            : 'text-black'
          : isNegative
          ? 'text-white/60 hover:text-white'
          : 'text-black/60 hover:text-black'
      }`}
    >
      {icon}
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
        <div className="flex items-center justify-center gap-2 px-6 py-3">
          {/* Left side - Hamburger + Projects */}
          <div className="flex items-center gap-2">
            <NavButton 
              icon={<Menu className="w-5 h-5" />} 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
            />
            <NavButton 
              icon={<Folder className="w-5 h-5" />} 
              onClick={() => setIsProjectsOpen(!isProjectsOpen)} 
            />
          </div>

          <div className={`w-px h-8 ${isNegative ? 'bg-white/20' : 'bg-black/20'}`} />

          {/* Center - Logo */}
          <a href="/" className="flex items-center justify-center px-4">
            <img 
              src="/favicon.png" 
              alt="Opensophy" 
              className="w-8 h-8 object-contain" 
            />
          </a>

          <div className={`w-px h-8 ${isNegative ? 'bg-white/20' : 'bg-black/20'}`} />

          {/* Right side - About + Theme */}
          <div className="flex items-center gap-2">
            <NavButton 
              icon={<User className="w-5 h-5" />} 
              onClick={() => handleNavigation('about')} 
            />
            <NavButton 
              icon={isNegative ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />} 
              onClick={onToggleNegative} 
            />
          </div>
        </div>
      </nav>

      {/* Hamburger Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-[60] flex items-end pb-20"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className={`fixed inset-0 ${
              isNegative ? 'bg-black/50' : 'bg-white/50'
            } backdrop-blur-sm`} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-md mx-auto rounded-t-2xl border-t ${
                isNegative 
                  ? 'bg-[#0a0a0a] border-white/10' 
                  : 'bg-[#E8E7E3] border-black/10'
              }`}
            >
              <div className={`flex items-center justify-between p-4 border-b ${
                isNegative ? 'border-white/10' : 'border-black/10'
              }`}>
                <h3 className={`text-lg font-bold ${
                  isNegative ? 'text-white' : 'text-black'
                }`}>Навигация</h3>
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className={`p-2 rounded-lg ${
                    isNegative ? 'hover:bg-white/10' : 'hover:bg-black/10'
                  }`}
                >
                  <X className={isNegative ? 'text-white' : 'text-black'} />
                </button>
              </div>
              <div className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-lg transition-colors text-left ${
                      isNegative
                        ? 'text-white/70 hover:bg-white/5 hover:text-white'
                        : 'text-black/70 hover:bg-black/5 hover:text-black'
                    }`}
                  >
                    {item.icon}
                    <div>
                      <div className="font-semibold text-sm">{item.label}</div>
                      <div className={`text-xs ${
                        isNegative ? 'text-white/50' : 'text-black/50'
                      }`}>{item.description}</div>
                    </div>
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
            className="fixed inset-0 z-[60] flex items-end pb-20"
            onClick={() => setIsProjectsOpen(false)}
          >
            <div className={`fixed inset-0 ${
              isNegative ? 'bg-black/50' : 'bg-white/50'
            } backdrop-blur-sm`} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-md mx-auto rounded-t-2xl border-t ${
                isNegative 
                  ? 'bg-[#0a0a0a] border-white/10' 
                  : 'bg-[#E8E7E3] border-black/10'
              }`}
            >
              <div className={`flex items-center justify-between p-4 border-b ${
                isNegative ? 'border-white/10' : 'border-black/10'
              }`}>
                <h3 className={`text-lg font-bold ${
                  isNegative ? 'text-white' : 'text-black'
                }`}>Проекты</h3>
                <button 
                  onClick={() => setIsProjectsOpen(false)} 
                  className={`p-2 rounded-lg ${
                    isNegative ? 'hover:bg-white/10' : 'hover:bg-black/10'
                  }`}
                >
                  <X className={isNegative ? 'text-white' : 'text-black'} />
                </button>
              </div>
              <div className="p-4 space-y-2">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleNavigation(project.id, project.url)}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-lg transition-colors text-left ${
                      isNegative
                        ? 'text-white/70 hover:bg-white/5 hover:text-white'
                        : 'text-black/70 hover:bg-black/5 hover:text-black'
                    }`}
                  >
                    <Package className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{project.label}</div>
                      <div className={`text-xs ${
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