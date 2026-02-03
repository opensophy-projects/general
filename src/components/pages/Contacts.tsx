import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ContactsProps {
  isNegative: boolean;
}

const Contacts: React.FC<ContactsProps> = ({ isNegative }) => {
  const contacts = [
    {
      id: 'email',
      title: 'Email',
      description: 'Общие вопросы и сотрудничество',
      link: 'opensophy@gmail.com',
      href: 'mailto:opensophy@gmail.com',
      external: false
    },
    {
      id: 'telegram',
      title: 'Telegram',
      description: 'Для более быстрого ответа',
      link: '@veilosophy',
      href: 'https://t.me/veilosophy',
      external: true
    },
    {
      id: 'github',
      title: 'GitHub',
      description: 'Открытые проекты и код',
      link: 'github.com/opensophy-projects',
      href: 'https://github.com/opensophy-projects',
      external: true
    },
    {
      id: 'habr',
      title: 'Habr',
      description: 'Статьи и публикации',
      link: 'habr.com/ru/users/opensophy',
      href: 'https://habr.com/ru/users/opensophy/',
      external: true
    }
  ];

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

      <div className={`relative z-10 flex-1 flex flex-col pb-20 ${isNegative ? 'text-white' : 'text-black'}`}>
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
    </div>
  );
};

export default Contacts;
