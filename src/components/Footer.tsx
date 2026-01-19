import React from 'react';
import { motion } from 'framer-motion';

interface FooterProps {
  isNegative: boolean;
}

const Footer: React.FC<FooterProps> = ({ isNegative }) => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className={`relative z-10 border-t transition-all duration-300 ${
        isNegative ? 'border-white/10' : 'border-black/10'
      }`}
    >
      <div className="container mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-8 md:gap-16 lg:gap-24">
          <div>
            <h4 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${
              isNegative ? 'text-white/60' : 'text-black/60'
            }`}>
              Проекты
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://hub.opensophy.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`text-sm hover:underline transition-colors ${
                    isNegative ? 'text-white/80 hover:text-white' : 'text-black/80 hover:text-black'
                  }`}
                >
                  Хаб
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold font-veilstack tracking-wide ${
              isNegative ? 'text-white' : 'text-black'
            }`}>
              Opensophy
            </span>
            <p className={`text-xs mt-2 ${
              isNegative ? 'text-white/50' : 'text-black/50'
            }`}>
              Open-source ресурсы для IT
            </p>
          </div>
          <div>
            <h4 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${
              isNegative ? 'text-white/60' : 'text-black/60'
            }`}>
              Соцсети
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/opensophy-projects" target="_blank" rel="noopener noreferrer" className={`text-sm hover:underline transition-colors ${
                  isNegative ? 'text-white/80 hover:text-white' : 'text-black/80 hover:text-black'
                }`}>
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://t.me/veilosophy" target="_blank" rel="noopener noreferrer" className={`text-sm hover:underline transition-colors ${
                  isNegative ? 'text-white/80 hover:text-white' : 'text-black/80 hover:text-black'
                }`}>
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://habr.com/ru/users/opensophy/" target="_blank" rel="noopener noreferrer" className={`text-sm hover:underline transition-colors ${
                  isNegative ? 'text-white/80 hover:text-white' : 'text-black/80 hover:text-black'
                }`}>
                  Habr
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
