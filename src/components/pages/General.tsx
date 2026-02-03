import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe, Zap, ShieldCheck, TrendingUp, Sparkles, BookOpen } from 'lucide-react';
import { SingularityShaders } from '../SingularityShaders';
import { GlowingEffect } from '../ui/glowing-effect';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { cn } from '@/lib/utils';

interface GeneralProps {
  isNegative: boolean;
}

const General: React.FC<GeneralProps> = ({ isNegative }) => {
  const principles = [
    {
      id: 'openness',
      icon: <Globe className="w-6 h-6" />,
      title: "Открытость",
      description: "Фокус на open-source решениях и свободных инструментах"
    },
    {
      id: 'practicality',
      icon: <Zap className="w-6 h-6" />,
      title: "Практичность",
      description: "Гайды и ресурсы, которые можно применить сразу"
    },
    {
      id: 'security',
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Безопасность",
      description: "Best practices и фокус на защиту данных"
    },
    {
      id: 'relevance',
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Актуальность",
      description: "Современные инструменты и свежая информация"
    },
    {
      id: 'ready-solutions',
      icon: <Sparkles className="w-6 h-6" />,
      title: "Готовые решения",
      description: "Подборки компонентов и шаблонов для быстрого старта"
    },
    {
      id: 'educational',
      icon: <BookOpen className="w-6 h-6" />,
      title: "Образовательный контент",
      description: "Статьи, гайды и практические примеры"
    }
  ];

  const accordionItems = [
    {
      id: "item-1",
      title: "Что такое Opensophy?",
      content: "Opensophy — коллекция open-source решений для IT-специалистов. Проекты, инструменты, гайды и образовательные материалы  о безопасности, инфраструктуре и современной разработке."
    },
    {
      id: "item-2",
      title: "Для кого эти ресурсы?",
      content: "Наши ресурсы предназначены для разработчиков, дизайнеров, специалистов по безопасности и всех, кто работает в сфере IT. Независимо от вашего уровня опыта, вы найдете полезные материалы и инструменты."
    },
    {
      id: "item-3",
      title: "Как использовать материалы?",
      content: "Все наши статьи, гайды и подборки находятся в свободном доступе — читайте, применяйте на практике, делитесь с коллегами. Open-source проекты размещены на GitHub с открытым исходным кодом — можете использовать их в своих разработках, изучать реализацию и адаптировать под свои задачи. (но не забывайте читать лицензию!)"
    },
    {
      id: "item-4",
      title: "Как долго ждать ответ если я напишу?",
      content: "Обычно мы отвечаем на письма в течение 24-48 часов. В Telegram ответ может быть быстрее."
    },
    {
      id: "item-5",
      title: "На каких языках доступен контент?",
      content: "Основной контент представлен на русском и английском языках. Не стесняйтесь писать нам на предпочитаемом вам языке."
    },
    {
      id: "item-6",
      title: "Как насчёт партнёрства?",
      content: "Мы открыты к сотрудничеству. Напишите нам о ваших идеях и давайте обсудим возможности вместе."
    },
    {
      id: "item-7",
      title: "Присоединяйтесь к Opensophy",
      content: "Если у вас есть экспертиза в IT и желание делиться знаниями, мы будем рады услышать вашу идею. Свяжитесь с нами, чтобы обсудить возможности сотрудничества.",
      hasButton: true
    }
  ];

  const bgColor = isNegative ? 'bg-[#0a0a0a]' : 'bg-[#E8E7E3]';
  const iconColor = isNegative ? 'text-[#E8E7E3]' : 'text-[#0a0a0a]';
  const labelColor = isNegative ? 'text-white/60' : 'text-black/50';
  const borderColor = isNegative ? 'border-white/10' : 'border-black/10';

  return (
    <div className="min-h-screen relative flex flex-col pb-20">
      <Helmet>
        <title>Opensophy</title>
        <meta name="title" content="Opensophy" />
        <meta name="description" content="Open-source ресурсы для IT-специалистов. Проекты, шаблоны, компоненты и образовательный контент с фокусом на безопасность и best practices." />
        <meta name="keywords" content="Opensophy, open source, IT ресурсы, шаблоны, компоненты, UI компоненты, безопасность, best practices, образовательный контент, документация, React компоненты" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://opensophy.com/" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://opensophy.com/" />
        <meta property="og:title" content="Opensophy" />
        <meta property="og:description" content="Open-source ресурсы для IT-специалистов. Проекты, шаблоны, компоненты и образовательный контент с фокусом на безопасность и best practices." />
        <meta property="og:locale" content="ru_RU" />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://opensophy.com/" />
        <meta property="twitter:title" content="Opensophy" />
        <meta property="twitter:description" content="Open-source ресурсы для IT-специалистов. Проекты, шаблоны, компоненты и образовательный контент с фокусом на безопасность и best practices." />
        
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Opensophy",
            "description": "Open-source ресурсы для IT-специалистов. Проекты, шаблоны, компоненты и образовательный контент.",
            "url": "https://opensophy.com/",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Opensophy",
              "url": "https://opensophy.com"
            }
          }`}
        </script>
      </Helmet>

      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isNegative ? 'bg-[#0a0a0a]' : 'bg-[#E8E7E3]'
        }`}
      />

      <div className={`relative z-10 flex-1 ${isNegative ? 'text-white' : 'text-black'}`}>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8">
          <div className="absolute inset-0">
            <SingularityShaders
              speed={1}
              intensity={1.2}
              size={1.1}
              waveStrength={1}
              colorShift={1}
              isNegative={isNegative}
              className="h-full w-full"
            />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center justify-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`text-xs sm:text-sm md:text-base font-semibold uppercase tracking-widest mb-4 sm:mb-6 md:mb-8 ${labelColor}`}
                >
                  Open-source ресурсы для IT
                </motion.div>

                <h1 className={`text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-[0.10em] ${
                  isNegative ? 'text-white' : 'text-black'
                } font-veilstack drop-shadow-lg leading-none mb-4 sm:mb-6 md:mb-8`}>
                  Opensophy
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`text-base sm:text-lg md:text-2xl lg:text-3xl font-light tracking-wide mb-8 sm:mb-10 md:mb-12 max-w-3xl leading-relaxed px-2 sm:px-4 md:px-0 ${
                    isNegative ? 'text-white/80' : 'text-black/80'
                  }`}
                >
                  
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className={`relative overflow-visible ${bgColor} py-12 sm:py-16 md:py-20 lg:py-28`}>
          <div className="lg:container lg:mx-auto lg:px-4 xl:px-8">
            <div className="lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16 sm:mb-20 md:mb-28 text-center"
              >
                <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 ${
                  isNegative ? 'text-white' : 'text-black'
                }`}>
                  НАШ ПОДХОД
                </h2>
                <p className={`text-lg sm:text-xl md:text-2xl leading-relaxed ${labelColor}`}>
                  6 ключевых принципов, которыми мы руководствуемся в работе
                </p>
              </motion.div>

              <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {principles.map((principle) => (
                  <motion.li
                    key={principle.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="min-h-[14rem] list-none"
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
                        "relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] p-6 shadow-sm md:p-6",
                        isNegative 
                          ? 'bg-[#0a0a0a] border-white/10 shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]' 
                          : 'bg-[#E8E7E3] border-black/10'
                      )}>
                        <div className="relative flex flex-1 flex-col justify-between gap-3">
                          <div className={cn(
                            "w-fit rounded-lg border-[0.75px] p-2",
                            isNegative ? 'border-white/20 bg-white/5' : 'border-black/20 bg-black/5'
                          )}>
                            <div className={iconColor}>
                              {principle.icon}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h3 className={cn(
                              "pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance",
                              isNegative ? 'text-white' : 'text-black'
                            )}>
                              {principle.title}
                            </h3>
                            <p className={cn(
                              "font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem]",
                              isNegative ? 'text-white/60' : 'text-black/60'
                            )}>
                              {principle.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={`relative overflow-visible ${bgColor} py-12 sm:py-16 md:py-20 lg:py-28`}>
          <div className="lg:container lg:mx-auto lg:px-4 xl:px-8">
            <div className="lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="lg:col-span-4"
                >
                  <div className="lg:sticky lg:top-32">
                    <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${
                      isNegative ? 'text-white' : 'text-black'
                    }`}>
                      Узнать больше
                    </h2>
                    <p className={`text-lg sm:text-xl leading-relaxed ${labelColor}`}>
                      Ответы на частые вопросы о Opensophy
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="lg:col-span-8"
                >
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {accordionItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <AccordionItem 
                          value={item.id}
                          className="border-0"
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
                              "relative overflow-hidden rounded-xl border-[0.75px] shadow-sm",
                              isNegative 
                                ? 'bg-[#0a0a0a] border-white/10 shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]' 
                                : 'bg-[#E8E7E3] border-black/10'
                            )}>
                              <AccordionTrigger 
                                className={cn(
                                  "text-xl sm:text-2xl font-bold text-left leading-tight hover:no-underline",
                                  isNegative ? 'text-white hover:text-white/80' : 'text-black hover:text-black/80'
                                )}
                              >
                                {item.title}
                              </AccordionTrigger>
                              <AccordionContent>
                                <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
                                  isNegative ? 'text-white/80' : 'text-black/70'
                                }`}>
                                  {item.content}
                                </p>
                                {item.hasButton && (
                                  <Link
                                    to="/contacts"
                                    className={`inline-flex items-center gap-2 px-6 py-3 backdrop-blur-2xl border rounded-lg transition-all duration-300 font-semibold group hover:scale-105 ${
                                      isNegative
                                        ? 'bg-[#0a0a0a]/60 border-white/20 text-white'
                                        : 'bg-[#e8e7e3]/60 border-black/20 text-black'
                                    }`}
                                  >
                                    Связаться со мной
                                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                  </Link>
                                )}
                              </AccordionContent>
                            </div>
                          </div>
                        </AccordionItem>
                      </motion.div>
                    ))}
                  </Accordion>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default General;
