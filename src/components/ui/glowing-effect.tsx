import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Code, Globe, Palette, TestTube, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { GlowingEffect } from '../ui/glowing-effect';
import { cn } from '@/lib/utils';

interface ServicesProps {
  isNegative: boolean;
}

const Services: React.FC<ServicesProps> = ({ isNegative }) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);

  const securityServices = [
    {
      id: 'leak-check',
      icon: <Search className="w-6 h-6" />,
      title: 'Проверка утечек секретов и доступов',
      description: 'Поиск случайно опубликованных паролей, токенов доступа, API-ключей и других конфиденциальных данных в открытых источниках. Помогу найти и устранить потенциальные риски до того, как ими воспользуются злоумышленники.'
    },
    {
      id: 'data-leak',
      icon: <Shield className="w-6 h-6" />,
      title: 'Проверка утечек персональных и иных данных',
      description: 'Проверка информации об утечках по предоставленным данным. Например, если вы предоставите номер телефона, я найду всю связанную с ним информацию, которая могла попасть в открытый доступ через различные утечки данных.'
    },
    {
      id: 'website-audit',
      icon: <Globe className="w-6 h-6" />,
      title: 'Проверка сайта на уязвимости',
      description: 'Автоматическая проверка сайта на типовые уязвимости, поиск возможных слабых мест без вмешательства в работу сайта. По итогу вы получите подробный отчет с понятными выводами и рекомендациями. Важно: это не является ручным пентестом или взломом — проверка проводится официально с письменным подтверждением от владельца сайта, разрешающим проведение анализа.'
    },
    {
      id: 'code-audit',
      icon: <Code className="w-6 h-6" />,
      title: 'Анализ кода на безопасность',
      description: 'Автоматическая и быстрая проверка исходного кода вашего проекта на возможные уязвимости, потенциальные баги и проблемные места. Помогу выявить слабые места в безопасности до того, как код попадет в продакшн.'
    }
  ];

  const developmentServices = [
    {
      id: 'static-website',
      icon: <Globe className="w-6 h-6" />,
      title: 'Разработка статического сайта',
      description: 'Разработка современного статического сайта с использованием ИИ-инструментов, что позволяет создавать проекты практически под любой технологический стек или тот, который я порекомендую исходя из ваших задач. В процессе разработки сразу применяются инструменты для автоматического выявления уязвимостей и проблем безопасности, что гарантирует создание защищенного кода с самого начала.'
    },
    {
      id: 'logo-design',
      icon: <Palette className="w-6 h-6" />,
      title: 'Разработка логотипа для бренда',
      description: 'Создание уникального и запоминающегося логотипа для вашего бренда. Разработка концепции, подбор цветовой палитры и типографики, которые отражают ценности и характер вашего бизнеса.'
    },
    {
      id: 'website-testing',
      icon: <TestTube className="w-6 h-6" />,
      title: 'Тестирование сайта',
      description: 'Комплексное тестирование вашего сайта на удобство использования и функциональность. Проверю работу всех элементов, выявлю проблемы в пользовательском опыте и дам рекомендации, что стоит улучшить, а что уже работает отлично.'
    }
  ];

  const casesStudies = [
    {
      id: 'bolt',
      title: 'Bolt.new',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Bolt.new_logoo.png',
      description: 'Обнаружена критическая логическая уязвимость, позволяющая обходить ограничения использования AI-токенов. Уязвимость была ответственно раскрыта команде проекта'
    },
    {
      id: 'n8n',
      title: 'N8N',
      logo: 'https://n8n.io/brandguidelines/logo-dark.svg',
      description: 'Публичное исследование платформы автоматизации n8n выявило потенциальные риски безопасности, связанные с типичными действиями пользователей. Работа получила положительные отзывы от сообщества и комментарии инженера проекта в официальном Discord-чате.'
    },
    {
      id: 'kondor',
      title: 'Кондор',
      description: 'Полная переработка интернет-платформы с оптимизацией дизайна и современными технологиями. Обновленный сайт обеспечивает лучший пользовательский опыт и повышенную производительность.'
    }
  ];

  const borderColor = isNegative ? 'border-white/10' : 'border-black/10';
  const iconColor = isNegative ? 'text-[#E8E7E3]' : 'text-[#0a0a0a]';

  const handlePrevCase = () => {
    setCurrentCaseIndex((prev) => (prev === 0 ? casesStudies.length - 1 : prev - 1));
  };

  const handleNextCase = () => {
    setCurrentCaseIndex((prev) => (prev === casesStudies.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen relative flex flex-col pb-20">
      <Helmet>
        <title>Услуги — Opensophy</title>
        <meta name="title" content="Услуги — Opensophy" />
        <meta name="description" content="Профессиональные услуги в области кибербезопасности и разработки: проверка утечек, анализ уязвимостей, разработка сайтов и дизайн." />
        <meta name="keywords" content="кибербезопасность, проверка утечек, анализ уязвимостей, разработка сайтов, веб-разработка, дизайн логотипов, тестирование сайтов" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://opensophy.com/services" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://opensophy.com/services" />
        <meta property="og:title" content="Услуги — Opensophy" />
        <meta property="og:description" content="Профессиональные услуги в области кибербезопасности и разработки" />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Услуги — Opensophy" />
        <meta property="twitter:description" content="Профессиональные услуги в области кибербезопасности и разработки" />
      </Helmet>

      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isNegative ? 'bg-[#0a0a0a]' : 'bg-[#E8E7E3]'
        }`}
      />

      <div className={`relative z-10 flex-1 ${isNegative ? 'text-white' : 'text-black'}`}>
        <section className={`py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8`}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 ${
                isNegative ? 'text-white' : 'text-black'
              } font-veilstack tracking-wider`}>
                Услуги
              </h1>
              <p className={`text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl ${
                isNegative ? 'text-white/70' : 'text-black/70'
              }`}>
                Профессиональные услуги в области кибербезопасности и разработки. Все цены обсуждаются индивидуально в зависимости от сложности проекта.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:opensophy@gmail.com"
                  className={`inline-flex items-center gap-2 px-6 py-3 backdrop-blur-2xl border rounded-lg transition-all duration-300 font-semibold hover:scale-105 ${
                    isNegative
                      ? 'bg-[#0a0a0a]/60 border-white/20 text-white hover:bg-white/10'
                      : 'bg-[#e8e7e3]/60 border-black/20 text-black hover:bg-black/10'
                  }`}
                >
                  Написать на Email
                </a>
                <a
                  href="https://t.me/veilosophy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 backdrop-blur-2xl border rounded-lg transition-all duration-300 font-semibold hover:scale-105 ${
                    isNegative
                      ? 'bg-[#0a0a0a]/60 border-white/20 text-white hover:bg-white/10'
                      : 'bg-[#e8e7e3]/60 border-black/20 text-black hover:bg-black/10'
                  }`}
                >
                  Написать в Telegram
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className={`py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8`}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-16"
            >
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
                isNegative ? 'text-white' : 'text-black'
              }`}>
                Кибербезопасность
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed ${
                isNegative ? 'text-white/60' : 'text-black/60'
              }`}>
                Защита ваших данных и систем от угроз
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={cn(
                    "relative h-full rounded-[1.25rem] border-[0.75px] p-2 md:rounded-[1.5rem] md:p-3",
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
                      "relative flex h-full flex-col gap-6 overflow-hidden rounded-xl border-[0.75px] p-6 shadow-sm md:p-8",
                      isNegative 
                        ? 'bg-[#0a0a0a] border-white/10 shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]' 
                        : 'bg-[#E8E7E3] border-black/10'
                    )}>
                      <div className={cn(
                        "w-fit rounded-lg border-[0.75px] p-3",
                        isNegative ? 'border-white/20 bg-white/5' : 'border-black/20 bg-black/5'
                      )}>
                        <div className={iconColor}>
                          {service.icon}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className={cn(
                          "text-xl sm:text-2xl font-semibold leading-tight",
                          isNegative ? 'text-white' : 'text-black'
                        )}>
                          {service.title}
                        </h3>
                        <p className={cn(
                          "text-sm sm:text-base leading-relaxed",
                          isNegative ? 'text-white/70' : 'text-black/70'
                        )}>
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className={`py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8`}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-16"
            >
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
                isNegative ? 'text-white' : 'text-black'
              }`}>
                Разработка и Дизайн
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed ${
                isNegative ? 'text-white/60' : 'text-black/60'
              }`}>
                Создание качественных цифровых продуктов
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {developmentServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={cn(
                    "relative h-full rounded-[1.25rem] border-[0.75px] p-2 md:rounded-[1.5rem] md:p-3",
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
                      "relative flex h-full flex-col gap-6 overflow-hidden rounded-xl border-[0.75px] p-6 shadow-sm md:p-8",
                      isNegative 
                        ? 'bg-[#0a0a0a] border-white/10 shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]' 
                        : 'bg-[#E8E7E3] border-black/10'
                    )}>
                      <div className={cn(
                        "w-fit rounded-lg border-[0.75px] p-3",
                        isNegative ? 'border-white/20 bg-white/5' : 'border-black/20 bg-black/5'
                      )}>
                        <div className={iconColor}>
                          {service.icon}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className={cn(
                          "text-xl sm:text-2xl font-semibold leading-tight",
                          isNegative ? 'text-white' : 'text-black'
                        )}>
                          {service.title}
                        </h3>
                        <p className={cn(
                          "text-sm sm:text-base leading-relaxed",
                          isNegative ? 'text-white/70' : 'text-black/70'
                        )}>
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8`}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${
                isNegative ? 'text-white' : 'text-black'
              }`}>
                Готовы начать?
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed mb-8 ${
                isNegative ? 'text-white/70' : 'text-black/70'
              }`}>
                Свяжитесь со мной для обсуждения вашего проекта. Все цены определяются индивидуально в зависимости от сложности и объема работ.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:opensophy@gmail.com"
                  className={`inline-flex items-center gap-2 px-8 py-4 backdrop-blur-2xl border rounded-lg transition-all duration-300 font-semibold text-lg hover:scale-105 ${
                    isNegative
                      ? 'bg-[#0a0a0a]/60 border-white/20 text-white hover:bg-white/10'
                      : 'bg-[#e8e7e3]/60 border-black/20 text-black hover:bg-black/10'
                  }`}
                >
                  opensophy@gmail.com
                </a>
                <a
                  href="https://t.me/veilosophy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-8 py-4 backdrop-blur-2xl border rounded-lg transition-all duration-300 font-semibold text-lg hover:scale-105 ${
                    isNegative
                      ? 'bg-[#0a0a0a]/60 border-white/20 text-white hover:bg-white/10'
                      : 'bg-[#e8e7e3]/60 border-black/20 text-black hover:bg-black/10'
                  }`}
                >
                  @veilosophy
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className={`py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8`}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-16"
            >
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
                isNegative ? 'text-white' : 'text-black'
              }`}>
                Примеры наших кейсов
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed ${
                isNegative ? 'text-white/60' : 'text-black/60'
              }`}>
                Здесь представлены как независимые исследования, так и клиентские проекты.
              </p>
            </motion.div>

            <div className="relative">
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <motion.button
                  onClick={handlePrevCase}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 sm:p-3 rounded-lg transition-colors ${
                    isNegative
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-black/10 hover:bg-black/20 text-black'
                  }`}
                  aria-label="Предыдущий кейс"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>

                <motion.div
                  key={currentCaseIndex}
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
                      {casesStudies[currentCaseIndex].logo ? (
                        <div className="h-16 sm:h-20 flex items-center justify-center">
                          <img
                            src={casesStudies[currentCaseIndex].logo}
                            alt={casesStudies[currentCaseIndex].title}
                            className="max-h-full max-w-full object-contain"
                            style={{
                              filter: isNegative ? 'invert(1) brightness(0.9)' : 'brightness(1.1)'
                            }}
                          />
                        </div>
                      ) : (
                        <div className={cn(
                          "h-16 sm:h-20 flex items-center justify-center rounded-lg border-[0.75px] font-semibold text-xl sm:text-2xl",
                          isNegative 
                            ? 'bg-white/5 border-white/10 text-white/70' 
                            : 'bg-black/5 border-black/10 text-black/70'
                        )}>
                          {casesStudies[currentCaseIndex].title}
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <h3 className={cn(
                          "text-2xl sm:text-3xl font-bold",
                          isNegative ? 'text-white' : 'text-black'
                        )}>
                          {casesStudies[currentCaseIndex].title}
                        </h3>
                        <p className={cn(
                          "text-base sm:text-lg leading-relaxed",
                          isNegative ? 'text-white/70' : 'text-black/70'
                        )}>
                          {casesStudies[currentCaseIndex].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.button
                  onClick={handleNextCase}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 sm:p-3 rounded-lg transition-colors ${
                    isNegative
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-black/10 hover:bg-black/20 text-black'
                  }`}
                  aria-label="Следующий кейс"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

              <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                {casesStudies.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentCaseIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={cn(
                      "h-2 sm:h-2.5 rounded-full transition-all duration-300",
                      index === currentCaseIndex
                        ? isNegative ? 'bg-white w-6 sm:w-8' : 'bg-black w-6 sm:w-8'
                        : isNegative ? 'bg-white/30 w-2 sm:w-2.5' : 'bg-black/30 w-2 sm:w-2.5'
                    )}
                    aria-label={`Показать кейс ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
