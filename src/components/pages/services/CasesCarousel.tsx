import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlowingEffect } from '../../ui/glowing-effect';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
}

interface CasesCarouselProps {
  cases: CaseStudy[];
  isNegative: boolean;
}

export const CasesCarousel: React.FC<CasesCarouselProps> = ({ cases, isNegative }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const borderColor = isNegative ? 'border-white/10' : 'border-black/10';

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? cases.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === cases.length - 1 ? 0 : prev + 1));
  };

  const getButtonClass = () => {
    return cn(
      "p-2 sm:p-3 rounded-lg transition-all border-[0.75px]",
      isNegative
        ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
        : 'bg-black/5 border-black/10 hover:bg-black/10 text-black'
    );
  };

  const getDotClass = (index: number) => {
    return cn(
      "h-2 sm:h-2.5 rounded-full transition-all duration-300",
      index === currentIndex
        ? isNegative ? 'bg-white w-6 sm:w-8' : 'bg-black w-6 sm:w-8'
        : isNegative ? 'bg-white/30 w-2 sm:w-2.5' : 'bg-black/30 w-2 sm:w-2.5'
    );
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        <motion.button
          onClick={handlePrev}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={getButtonClass()}
          aria-label="Предыдущий кейс"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 max-w-2xl"
        >
          <div className={cn(
            "relative rounded-[1.25rem] border-[0.75px] p-2 md:rounded-[1.5rem] md:p-3",
            borderColor
          )}>
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
              isNegative={isNegative}
            />
            <div className={cn(
              "relative flex flex-col gap-8 overflow-hidden rounded-xl border-[0.75px] p-6 sm:p-8 md:p-10 shadow-sm",
              isNegative 
                ? 'bg-[#0a0a0a] border-white/10 shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]' 
                : 'bg-[#E8E7E3] border-black/10'
            )}>
              <div className="space-y-4">
                <h3 className={cn(
                  "text-2xl sm:text-3xl font-bold",
                  isNegative ? 'text-white' : 'text-black'
                )}>
                  {cases[currentIndex].title}
                </h3>
                <p className={cn(
                  "text-base sm:text-lg leading-relaxed",
                  isNegative ? 'text-white/70' : 'text-black/70'
                )}>
                  {cases[currentIndex].description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={getButtonClass()}
          aria-label="Следующий кейс"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      </div>

      <div className="flex justify-center gap-2 mt-6 sm:mt-8">
        {cases.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={getDotClass(index)}
            aria-label={`Показать кейс ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
