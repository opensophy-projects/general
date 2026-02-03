import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Home, Package, ArrowUpRight, X } from 'lucide-react';

interface NavBarProps {
  onMenuClick: () => void;
  isNegative: boolean;
  onToggleNegative: () => void;
  currentPage: string;
  onNavigate: (page: 'general' | 'contacts' | 'hub') => void;
}

const NavBar: React.FC<NavBarProps> = ({
  onMenuClick,
  isNegative,
  onToggleNegative,
  currentPage,
  onNavigate
}) => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [showBackdrop, setShowBackdrop] = useState(false);

  const menuItems = [
    {
      id: 'main',
      label: 'Главная',
      icon: <Home className="w-4 h-4" />,
      submenu: [
        { id: 'general', label: 'Общая информация', description: 'Основная информация' },
        { id: 'contacts', label: 'Контакты', description: 'Связаться с нами' }
      ]
    },
    {
      id: 'products',
      label: 'Проекты',
      icon: <Package className="w-4 h-4" />,
      submenu: [
        { id: 'hub', label: 'Хаб', description: 'Образовательные ресурсы', url: 'https://hub.opensophy.com' }
      ]
    }
  ];

  const handleMouseEnter = (menuId: string) => {
    const menu = menuItems.find(m => m.id === menuId);
    if (menu && menu.submenu.length > 0) {
      setHoveredMenu(menuId);
      setShowBackdrop(true);
    }
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
    setShowBackdrop(false);
  };

  const handleItemClick = (page: string, url?: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      onNavigate(page as any);
    }
    setHoveredMenu(null);
    setShowBackdrop(false);
  };

  return (
    <>
      {/* Backdrop blur */}
      <AnimatePresence>
        {showBackdrop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-20 backdrop-blur-sm ${
              isNegative ? 'bg-black/50' : 'bg-white/50'
            }`}
            onClick={() => {
              setHoveredMenu(null);
              setShowBackdrop(false);
            }}
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-30 border-b transition-all duration-500 ${
          isNegative
            ? 'bg-[#0a0a0a]/95 border-white/10 backdrop-blur-sm'
            : 'bg-[#E8E7E3]/95 border-black/10 backdrop-blur-sm'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left side - Menu items */}
          <div className="flex items-center gap-1">
            {menuItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <div className="relative">
                  <button
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onClick={() => {
                      if (item.submenu.length === 0) {
                        handleItemClick(item.id);
                      }
                    }}
                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-all duration-300 focus:outline-none rounded-lg ${
                      isNegative
                        ? 'text-white/70 hover:text-white hover:bg-white/5'
                        : 'text-black/70 hover:text-black hover:bg-black/5'
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm font-semibold">{item.label}</span>
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {hoveredMenu === item.id && item.submenu.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onMouseLeave={handleMouseLeave}
                        className={`absolute top-full mt-2 left-0 w-72 backdrop-blur-sm border rounded-lg shadow-lg p-2 z-40 ${
                          isNegative
                            ? 'bg-[#0a0a0a]/95 border-white/10'
                            : 'bg-[#E8E7E3]/95 border-black/10'
                        }`}
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <motion.button
                            key={subItem.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.05 }}
                            onClick={() => handleItemClick(subItem.id, subItem.url)}
                            className={`w-full text-left p-3 rounded-lg transition-all duration-300 focus:outline-none ${
                              isNegative
                                ? 'text-white/70 hover:bg-white/5 hover:text-white'
                                : 'text-black/70 hover:bg-black/5 hover:text-black'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex-1">
                                <div className="font-semibold text-sm">{subItem.label}</div>
                                <div className={`text-xs mt-1 ${
                                  isNegative ? 'text-white/50' : 'text-black/50'
                                }`}>
                                  {subItem.description}
                                </div>
                              </div>
                              {subItem.url && (
                                <ArrowUpRight className={`w-4 h-4 ${
                                  isNegative ? 'text-white/50' : 'text-black/40'
                                }`} />
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {index < menuItems.length - 1 && (
                  <div className={`w-px h-6 ${
                    isNegative ? 'bg-white/20' : 'bg-black/20'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Center - Logo */}
          <a href="/" className="flex items-center justify-center">
            <img 
              src="/favicon.png" 
              alt="Opensophy" 
              className="w-8 h-8 object-contain" 
            />
          </a>

          {/* Right side - Theme toggle */}
          <div className="flex items-center">
            <button
              onClick={onToggleNegative}
              className={`p-3 rounded-lg transition-all duration-300 focus:outline-none ${
                isNegative
                  ? 'text-white/70 hover:text-white hover:bg-white/5'
                  : 'text-black/70 hover:text-black hover:bg-black/5'
              }`}
              aria-label={isNegative ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isNegative ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default NavBar;