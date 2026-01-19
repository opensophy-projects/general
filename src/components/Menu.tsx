import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Package, ArrowRight, ChevronRight, ChevronDown } from 'lucide-react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: 'general' | 'contacts' | 'others' | 'status' | 'ui-components' | 'hub') => void;
  isNegative: boolean;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose, currentPage, onNavigate, isNegative }) => {
  const [expandedMain, setExpandedMain] = React.useState(false);
  const [expandedProducts, setExpandedProducts] = React.useState(false);

  const menuItems = [
    {
      id: 'general',
      label: 'Главная',
      icon: <Home className="w-6 h-6" />,
      description: 'Основные разделы',
      hasSubmenu: true,
      expandedState: expandedMain,
      setExpandedState: setExpandedMain,
      submenu: [
        { id: 'general', label: 'Общая информация', description: 'Основная информация' },
        { id: 'contacts', label: 'Контакты', description: 'Связаться с нами' }
      ]
    },
    {
      id: 'products',
      label: 'Проекты',
      icon: <Package className="w-6 h-6" />,
      description: 'Наши проекты',
      hasSubmenu: true,
      expandedState: expandedProducts,
      setExpandedState: setExpandedProducts,
      submenu: [
        { id: 'hub', label: 'Хаб', description: 'Образовательные ресурсы', url: 'https://hub.opensophy.com' }
      ]
    }
  ];

  const handleItemClick = (page: string, hasSubmenu?: boolean, setExpandedState?: React.Dispatch<React.SetStateAction<boolean>>, currentExpanded?: boolean, url?: string) => {
    if (url) {
      window.open(url, '_blank');
      onClose();
      setExpandedMain(false);
      setExpandedProducts(false);
      return;
    }
    if (hasSubmenu && setExpandedState) {
      setExpandedState(!currentExpanded);
    } else {
      onNavigate(page as any);
      onClose();
      setExpandedMain(false);
      setExpandedProducts(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 backdrop-blur-xl bg-black/30"
            onClick={onClose}
          />
          
          {/* Menu content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 ${isNegative ? 'invert' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 sm:mb-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-black mb-1">Навигация</h2>
                  <p className="text-black/60 text-xs sm:text-sm">Выберите раздел</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 sm:p-3 rounded-full transition-all duration-300 text-black"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              
              {/* Menu items */}
              <div className="space-y-3 sm:space-y-4">
                {menuItems.map((item, index) => (
                  <div key={item.id}>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                      onClick={() => handleItemClick(item.id, item.hasSubmenu, item.setExpandedState, item.expandedState)}
                      className={`group w-full flex items-center gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black/30 relative overflow-hidden ${
                        currentPage === item.id || (item.hasSubmenu && item.expandedState)
                          ? 'bg-black/20 shadow-lg'
                          : 'bg-black/5'
                      }`}
                    >
                      <div className="text-black">
                        {React.cloneElement(item.icon as React.ReactElement, {
                          className: "w-7 h-7 sm:w-6 sm:h-6"
                        })}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-bold text-lg sm:text-xl text-black">{item.label}</div>
                        <div className="text-sm sm:text-base text-black/60">{item.description}</div>
                      </div>
                      <div>
                        {item.hasSubmenu ? (
                          <motion.div
                            animate={{ rotate: item.expandedState ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-6 h-6 sm:w-5 sm:h-5 text-black/60" />
                          </motion.div>
                        ) : currentPage === item.id ? (
                          <div className="w-3 h-3 sm:w-3 sm:h-3 bg-black rounded-full"></div>
                        ) : (
                          <ArrowRight className="w-6 h-6 sm:w-5 sm:h-5 text-black/40 transition-colors duration-300" />
                        )}
                      </div>
                    </motion.button>

                    {/* Submenu */}
                    <AnimatePresence>
                      {item.hasSubmenu && item.expandedState && item.submenu && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 sm:mt-3 space-y-2 overflow-hidden"
                        >
                          {item.submenu.map((subItem, subIndex) => (
                            <motion.button
                              key={subItem.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ delay: subIndex * 0.05, duration: 0.2 }}
                              onClick={() => handleItemClick(subItem.id, false, undefined, false, subItem.url)}
                              className={`w-full flex items-center gap-3 sm:gap-4 p-5 sm:p-4 pl-6 sm:pl-7 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black/30 ${
                                currentPage === subItem.id
                                  ? 'bg-black/20'
                                  : 'bg-black/5'
                              }`}
                            >
                              <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4 text-black/40" />
                              <div className="flex-1 text-left">
                                <div className="font-semibold text-base sm:text-lg text-black flex items-center gap-2">
                                  {subItem.label}
                                </div>
                                <div className="text-sm sm:text-xs text-black/60">{subItem.description}</div>
                              </div>
                              {currentPage === subItem.id && (
                                <div className="w-2.5 h-2.5 sm:w-2 sm:h-2 bg-black rounded-full"></div>
                              )}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              
              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-black/10"
              >
                <div className="text-center">
                  <p className="text-base sm:text-sm text-black/50 mb-2">Opensophy</p>
                  <p className="text-sm sm:text-xs text-black/40">Open-source ресурсы для IT-специалистов</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Menu;
