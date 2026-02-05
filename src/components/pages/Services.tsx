import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Code, Globe, Palette, TestTube, Search } from 'lucide-react';
import { ServiceCard } from './services/ServiceCard';
import { ContactButtons } from './services/ContactButtons';
import { CasesCarousel } from './services/CasesCarousel';

interface ServicesProps {
  isNegative: boolean;
}

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Services: React.FC<ServicesProps> = ({ isNegative }) => {
  const securityServices: Service[] = [
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

  const developmentServices: Service[] = [
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
      description: 'Обнаружена критическая логическая уязвимость, позволяющая обходить ограничения использования AI-токенов. Уязвимость была ответственно раскрыта команде проекта'
    },
    {
      id: 'n8n',
      title: 'N8N',
      description: 'Публичное исследование платформы автоматизации n8n выявило потенциальные риски безопасности, связанные с типичными действиями пользователей. Работа получила положительные отзывы от сообщества и комментарии инженера проекта в официальном Discord-чате.'
    },
    {
      id: 'kondor',
      title: 'Кондор',
      description: 'Полная переработка интернет-платформы с оптимизацией дизайна и современными технологиями. Обновленный сайт обеспечивает лучший пользовательский опыт и повышенную производительность.'
    }
  ];

  const textColor = isNegative ? 'text-white' : 'text-black';
  const mutedTextColor = isNegative ? 'text-white/60' : 'text-black/60';
  const lightTextColor = isNegative ? 'text-white/70' : 'text-black/70';

  const renderServices = (services: Service[], gridClassName: string) => (
    <div className={gridClassName}>
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <ServiceCard
            icon={service.icon}
            title={service.title}
            description={service.description}
            isNegative={isNegative}
          />
        </motion.div>
      ))}
    </div>
  );

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

      <div className={`relative z-10 flex-1 ${textColor}`}>
        <section className="py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 ${textColor} font-veilstack tracking-wider`}>
                Услуги
              </h1>
              <p className={`text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl ${lightTextColor}`}>
                Профессиональные услуги в области кибербезопасности и разработки. Все цены обсуждаются индивидуально в зависимости от сложности проекта.
              </p>
              <div className="mt-8">
                <ContactButtons isNegative={isNegative} />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-16"
            >
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${textColor}`}>
                Кибербезопасность
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed ${mutedTextColor}`}>
                Защита ваших данных и систем от угроз
              </p>
            </motion.div>

            {renderServices(securityServices, 'grid grid-cols-1 md:grid-cols-2 gap-6')}
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-16"
            >
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${textColor}`}>
                Разработка и Дизайн
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed ${mutedTextColor}`}>
                Создание качественных цифровых продуктов
              </p>
            </motion.div>

            {renderServices(developmentServices, 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6')}
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${textColor}`}>
                Готовы начать?
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed mb-8 ${lightTextColor}`}>
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

        <section className="py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-16"
            >
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${textColor}`}>
                Примеры наших кейсов
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed ${mutedTextColor}`}>
                Здесь представлены как независимые исследования, так и клиентские проекты.
              </p>
            </motion.div>

            <CasesCarousel cases={casesStudies} isNegative={isNegative} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;