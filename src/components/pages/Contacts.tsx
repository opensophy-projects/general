import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Mail, Send, ArrowUpRight } from 'lucide-react';
import Footer from '../Footer';

interface ContactsProps {
  isNegative: boolean;
}

const Contacts: React.FC<ContactsProps> = ({ isNegative }) => {
  const contacts = [
    {
      id: 'email',
      title: 'Email',
      description: 'Общие вопросы и сотрудничество',
      icon: <Mail className="w-6 h-6" />,
      link: 'opensophy@gmail.com',
      href: 'mailto:opensophy@gmail.com',
      external: false
    },
    {
      id: 'telegram',
      title: 'Telegram',
      description: 'Для более быстрого ответа',
      icon: <Send className="w-6 h-6" />,
      link: '@veilosophy',
      href: 'https://t.me/veilosophy',
      external: true
    },
    {
      id: 'github',
      title: 'GitHub',
      description: 'Открытые проекты и код',
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>,
      link: 'github.com/opensophy-projects',
      href: 'https://github.com/opensophy-projects',
      external: true
    },
    {
      id: 'habr',
      title: 'Habr',
      description: 'Статьи и публикации',
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.5 2h9l3 3v14l-3 3h-9l-3-3V5l3-3zm1.5 3v14h6V5H9zm3 2h2v2h-2V7zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z"/>
      </svg>,
      link: 'habr.com/ru/users/opensophy',
      href: 'https://habr.com/ru/users/opensophy/',
      external: true
    }
  ];

  const iconColor = isNegative ? 'text-[#E8E7E3]' : 'text-[#0a0a0a]';
  const borderColor = isNegative ? 'border-white/10' : 'border-black/10';

  return (
    <div className="min-h-screen relative flex flex-col">
      <Helmet>
        <title>Контакты — Opensophy</title>
        <meta name="title" content="Контакты — Opensophy" />
        <meta name="description" content="Свяжитесь с командой Opensophy. Мы открыты к сотрудничеству, вопросам и предложениям. Email, Telegram, GitHub, Habr." />
        <meta name="keywords" content="контакты Opensophy, связь, Telegram, GitHub, Habr, Opensophy email, сотрудничество" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://opensophy.com/contacts" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://opensophy.com/contacts" />
        <meta property="og:title" content="Контакты — Opensophy" />
        <meta property="og:description" content="Свяжитесь с командой Opensophy. Мы открыты к сотрудничеству, вопросам и предложениям." />
        <meta property="og:locale" content="ru_RU" />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://opensophy.com/contacts" />
        <meta property="twitter:title" content="Контакты — Opensophy" />
        <meta property="twitter:description" content="Свяжитесь с командой Opensophy. Мы открыты к сотрудничеству, вопросам и предложениям." />
        
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Opensophy — Контакты",
            "description": "Свяжитесь с командой Opensophy. Мы открыты к сотрудничеству, вопросам и предложениям.",
            "url": "https://opensophy.com/contacts",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Opensophy",
              "url": "https://opensophy.com"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Главная",
                  "item": "https://opensophy.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Контакты",
                  "item": "https://opensophy.com/contacts"
                }
              ]
            }
          }`}
        </script>
      </Helmet>

      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isNegative ? 'bg-[#0a0a0a]' : 'bg-[#E8E7E3]'
        }`}
      />

      <div className={`relative z-10 flex-1 flex flex-col ${isNegative ? 'text-white' : 'text-black'}`}>
        <section className={`py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 ${isNegative ? 'bg-[#0a0a0a]' : 'bg-[#E8E7E3]'}`}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 ${
                isNegative ? 'text-white' : 'text-black'
              } font-veilstack tracking-wider`}>
                Контакты
              </h1>
              <p className={`text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl ${
                isNegative ? 'text-white/70' : 'text-black/70'
              }`}>
                Свяжитесь с нами несколькими способами. Мы всегда открыты к сотрудничеству, вопросам и предложениям.
              </p>
            </motion.div>
          </div>
        </section>

        <section className={`${isNegative ? 'bg-[#0a0a0a]' : 'bg-[#E8E7E3]'}`}>
          <div className="lg:container lg:mx-auto lg:px-4 xl:px-8">
            <div className="lg:max-w-7xl lg:mx-auto w-full">
              <div className="relative">
                <div>
                  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 md:px-8`}>
                    {contacts.map((contact, index) => (
                      <motion.a
                        key={contact.id}
                        href={contact.href}
                        target={contact.external ? '_blank' : undefined}
                        rel={contact.external ? 'noopener noreferrer' : undefined}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16 md:py-16 relative group cursor-pointer transition-all duration-300"
                      >
                        <div className={`absolute inset-0 transition-all duration-300 ${
                          isNegative ? 'group-hover:bg-white/5' : 'group-hover:bg-black/5'
                        }`} />
                        
                        <div className="relative z-10 flex flex-col items-center text-center">
                          <motion.div
                            className="mb-4 inline-flex p-3 rounded-xl transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                          >
                            <div className={iconColor}>
                              {contact.icon}
                            </div>
                          </motion.div>

                          <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${
                            isNegative ? 'text-white' : 'text-black'
                          }`}>
                            {contact.title}
                          </h3>

                          <p className={`text-xs sm:text-sm mb-4 ${
                            isNegative ? 'text-white/60' : 'text-black/60'
                          }`}>
                            {contact.description}
                          </p>

                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <span className={`${
                              isNegative ? 'text-white/80' : 'text-black/80'
                            }`}>
                              {contact.link}
                            </span>
                            <ArrowUpRight className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                              isNegative ? 'text-white/60' : 'text-black/60'
                            }`} />
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer isNegative={isNegative} />
    </div>
  );
};

export default Contacts;
