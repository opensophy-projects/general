import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Home, Package, ChevronDown, ArrowUpRight, Menu, X } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const menuItems = [
    {
      id: 'main',
      label: 'Главная',
      icon: <Home className="w-3 sm:w-4 h-3 sm:h-4" />,
      submenu: [
        { id: 'general', label: 'Общая информация', description: 'Основная информация' },
        { id: 'contacts', label: 'Контакты', description: 'Связаться с нами' }
      ]
    },
    {
      id: 'products',
      label: 'Проекты',
      icon: <Package className="w-3 sm:w-4 h-3 sm:h-4" />,
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

  const handleItemClick = (page: string, url?: string, isSoon?: boolean) => {
    if (isSoon) return;
    if (url) {
      window.open(url, '_blank');
    } else {
      onNavigate(page as any);
    }
    setHoveredMenu(null);
    setShowBackdrop(false);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Backdrop blur */}
      <AnimatePresence>
        {(showBackdrop || mobileMenuOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-20 backdrop-blur-xl bg-black/30"
            onClick={() => {
              setHoveredMenu(null);
              setShowBackdrop(false);
              setMobileMenuOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-30"
      >
        <div className={`flex items-center justify-between backdrop-blur-xl border-b transition-all duration-300 w-full ${
          isNegative
            ? 'bg-[#0a0a0a]/60 border-white/10'
            : 'bg-[#e8e7e3]/60 border-black/10'
        }`}>

          {/* Opensophy Logo - Left */}
          <div className={`px-4 sm:px-6 py-3 sm:py-4 ${
            isNegative ? 'text-white' : 'text-black'
          }`}>
            <span className="text-sm sm:text-base font-bold font-veilstack tracking-wide">Opensophy</span>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          {isMobile && (
            <div className="flex items-center gap-1">
              <button
                onClick={onToggleNegative}
                className={`p-4 transition-all duration-300 focus:outline-none ${
                  isNegative ? 'text-white' : 'text-black'
                }`}
                aria-label={isNegative ? "Switch to light theme" : "Switch to dark theme"}
              >
                {isNegative ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleMobileMenu}
                className={`p-4 transition-all duration-300 focus:outline-none ${
                  isNegative ? 'text-white' : 'text-black'
                }`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <Menu className="w-7 h-7" />
                )}
              </button>
            </div>
          )}

          {/* Desktop Navigation Items - Center */}
          {!isMobile && (
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
                      className={`flex items-center gap-2 px-4 py-3 sm:py-4 font-medium transition-all duration-300 focus:outline-none ${
                        isNegative
                          ? 'text-white'
                          : 'text-black'
                      }`}
                    >
                      {item.icon}
                      <span className="text-sm font-semibold tracking-wide">{item.label}</span>
                      {item.submenu.length > 0 && (
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${hoveredMenu === item.id ? 'rotate-180' : ''}`} />
                      )}
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
                          className={`absolute top-full mt-2 left-0 w-64 backdrop-blur-2xl border shadow-2xl p-2 z-40 ${
                            isNegative
                              ? 'bg-[#0a0a0a]/60 border-white/10'
                              : 'bg-[#e8e7e3]/60 border-black/10'
                          }`}
                        >
                          {item.submenu.map((subItem, subIndex) => (
                            <motion.button
                              key={subItem.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: subIndex * 0.05 }}
                              onClick={() => handleItemClick(subItem.id, subItem.url)}
                              className={`w-full text-left p-3 transition-all duration-300 focus:outline-none ${
                                isNegative
                                  ? 'text-white'
                                  : 'text-black'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex-1">
                                  <div className="font-semibold text-sm">{subItem.label}</div>
                                  <div className={`text-xs ${isNegative ? 'text-white/60' : 'text-black/50'}`}>
                                    {subItem.description}
                                  </div>
                                </div>
                                {subItem.url && (
                                  <ArrowUpRight className={`w-4 h-4 ${isNegative ? 'text-white/50' : 'text-black/40'}`} />
                                )}
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {index < menuItems.length - 1 && (
                    <div className={`w-px h-6 ${isNegative ? 'bg-white/20' : 'bg-black/20'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Right side - Theme toggle */}
          {!isMobile && (
            <div className="flex items-center gap-1">
              {/* Invert Toggle */}
              <button
                onClick={onToggleNegative}
                className={`p-3 sm:p-4 transition-all duration-300 focus:outline-none ${
                  isNegative
                    ? 'text-white'
                    : 'text-black'
                }`}
                aria-label={isNegative ? "Switch to light theme" : "Switch to dark theme"}
              >
                {isNegative ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 bottom-0 z-40 px-4 overflow-y-auto"
          >
            <div className={`backdrop-blur-xl border shadow-2xl mb-4 ${
              isNegative
                ? 'bg-[#0a0a0a]/60 border-white/10'
                : 'bg-[#e8e7e3]/60 border-black/10'
            }`}>
              <div className="p-4 space-y-6">
                {menuItems.map((item, index) => (
                  <div key={item.id}>
                    <div className={`text-xs font-semibold mb-3 uppercase tracking-wider flex items-center gap-2 ${
                      isNegative ? 'text-white/60' : 'text-black/70'
                    }`}>
                      {item.icon}
                      {item.label}
                    </div>
                    <div className="space-y-2">
                      {item.submenu.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => handleItemClick(subItem.id, subItem.url)}
                          className={`w-full text-left p-3 transition-all duration-300 flex items-center justify-between border ${
                            isNegative
                              ? 'text-white border-white/10'
                              : 'text-black border-black/10'
                          }`}
                        >
                          <div className="flex-1">
                            <div className="font-semibold text-sm">{subItem.label}</div>
                            <div className={`text-xs ${isNegative ? 'text-white/60' : 'text-black/60'}`}>
                              {subItem.description}
                            </div>
                          </div>
                          {subItem.url && (
                            <ArrowUpRight className={`w-4 h-4 ${isNegative ? 'text-white/50' : 'text-black/40'}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
