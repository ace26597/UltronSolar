export type Language = 'en' | 'mr' | 'hi';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    services: string;
    products: string;
    about: string;
    blog: string;
    contact: string;
    menu: string;
  };
  
  // Hero Section
  hero: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    priceNote: string;
  };
  
  // Top Bar
  topBar: {
    serving: string;
  };
  
  // Features Section
  features: {
    title: string;
    subtitle: string;
    expertInstallations: {
      title: string;
      description: string;
    };
    flexiblePayment: {
      title: string;
      description: string;
    };
    completeEPC: {
      title: string;
      description: string;
    };
    warranty: {
      title: string;
      description: string;
    };
  };
  
  // About Section
  about: {
    title: string;
    yearsExperience: string;
    completeEPC: {
      title: string;
      description: string;
    };
    multipleApplications: {
      title: string;
      description: string;
    };
    highQuality: {
      title: string;
      description: string;
    };
    customizedSolutions: {
      title: string;
      description: string;
    };
    aboutUs: {
      title: string;
      description: string;
      description2: string;
      contactButton: string;
    };
  };
  
  // Footer
  footer: {
    description: string;
    quickLinks: string;
    services: string;
    contact: string;
    followUs: string;
    copyright: string;
  };
  
  // Common
  common: {
    readMore: string;
    learnMore: string;
    getStarted: string;
  };
}

const translations: Partial<Record<Language, Translations>> & { en: Translations; mr: Translations } = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      products: 'Products',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
      menu: 'Menu',
    },
    hero: {
      title: 'Power Your Future',
      titleHighlight: 'With Solar Energy',
      subtitle: 'Premium rooftop solar solutions for homes, farms, and businesses in Dhule & North Maharashtra.',
      priceNote: '⚡ Systems starting at ₹99,999',
    },
    topBar: {
      serving: 'Serving Dhule, Jalgaon & North Maharashtra',
    },
    features: {
      title: 'Why Choose Ultron?',
      subtitle: 'Comprehensive solar solutions tailored to meet your unique needs with quality and reliability.',
      expertInstallations: {
        title: 'Expert Installations',
        description: 'We specialize in offering premium solar panel installation services for homes, businesses, apartments, and farms. Our team of experts is skilled in effective installation and deeply knowledgeable about optimizing the positioning of solar panels to maximize sunlight exposure and energy generation.',
      },
      flexiblePayment: {
        title: 'Flexible Payment Options',
        description: 'We understand that every customer has different preferences when it comes to payment. We provide assistance for bank loans with streamlined processing specifically for solar projects. Additionally, we guide our customers in availing government subsidies designed to support the adoption of solar technology.',
      },
      completeEPC: {
        title: 'Complete EPC Solutions',
        description: 'At Ultron Power Systems, we offer complete solar EPC (Engineering, Procurement, and Construction) solutions. From initial design and engineering to procurement of high-quality solar equipment and construction of the solar power system, we handle every aspect of the project.',
      },
      warranty: {
        title: 'Peace of Mind Warranty',
        description: 'We stand behind the quality of our work and the products we install. That\'s why we offer a comprehensive warranty on all our solar installations as per terms and conditions of principal suppliers of solar panels and materials. With us, you can have peace of mind knowing that your solar system is protected.',
      },
    },
    about: {
      title: 'Why Ultron Power Systems?',
      yearsExperience: 'Years Experience',
      completeEPC: {
        title: 'Complete EPC Solutions',
        description: 'From initial design and engineering to procurement and construction, we handle every aspect of your solar project.',
      },
      multipleApplications: {
        title: 'Multiple Applications',
        description: 'We serve residential properties, commercial businesses, industrial facilities, farms, and apartments with customized solutions.',
      },
      highQuality: {
        title: 'High-Quality & Reliable',
        description: 'Our full-service approach ensures peace of mind with premium equipment and expert installation.',
      },
      customizedSolutions: {
        title: 'Customized Solutions',
        description: 'We tailor solutions to meet the unique needs of each customer, ensuring optimal performance and value.',
      },
      aboutUs: {
        title: 'About Us',
        description: 'Ultron Power Systems is the go-to provider of solar power systems and products. Our team of experts is dedicated to customizing solutions tailored to meet the unique needs of each customer. From rooftop installations to farm, residential and business applications, we have you covered.',
        description2: 'Our high-quality, reliable and full-service approach ensures peace of mind. Contact us today to learn how we can power your future with solar technology.',
        contactButton: 'Contact Us Today',
      },
    },
    footer: {
      description: 'Leading solar EPC company in Dhule, Jalgaon, and North Maharashtra. Powering homes, businesses, and farms with clean, renewable energy.',
      quickLinks: 'Quick Links',
      services: 'Services',
      contact: 'Contact',
      followUs: 'Follow Us',
      copyright: '© 2024 Ultron Power Systems. All rights reserved.',
    },
    common: {
      readMore: 'Read More',
      learnMore: 'Learn More',
      getStarted: 'Get Started',
    },
  },
  mr: {
    nav: {
      home: 'मुख्यपृष्ठ',
      services: 'सेवा',
      products: 'उत्पादने',
      about: 'आमच्याबद्दल',
      blog: 'ब्लॉग',
      contact: 'संपर्क',
      menu: 'मेनू',
    },
    hero: {
      title: 'तुमच्या भविष्याला शक्ती द्या',
      titleHighlight: 'सौर ऊर्जेसह',
      subtitle: 'धुळे आणि उत्तर महाराष्ट्रातील घरे, शेतजमीन आणि व्यवसायांसाठी प्रीमियम छतावरील सौर उपाय.',
      priceNote: '⚡ ₹99,999 पासून सुरू होणारी प्रणाली',
    },
    topBar: {
      serving: 'धुळे, जळगाव आणि उत्तर महाराष्ट्रात सेवा देत आहोत',
    },
    features: {
      title: 'आम्हाला का निवडा',
      subtitle: 'आम्ही तुमच्या गरजांनुसार सानुकूलित सर्वसमावेशक सौर उपाय प्रदान करतो',
      expertInstallations: {
        title: 'तज्ञ स्थापना',
        description: 'आम्ही घरे, व्यवसाय, अपार्टमेंट आणि शेतांसाठी प्रीमियम सौर पॅनेल स्थापना सेवा देण्यात माहिर आहोत. आमच्या तज्ञांची टीम प्रभावी स्थापनामध्ये कुशल आहे आणि सूर्यप्रकाशाच्या एक्सपोजर आणि ऊर्जा निर्मिती वाढविण्यासाठी सौर पॅनेलच्या स्थितीचे ऑप्टिमायझेशनबद्दल खोल ज्ञान आहे.',
      },
      flexiblePayment: {
        title: 'लवचिक पेमेंट पर्याय',
        description: 'पेमेंटच्या बाबतीत प्रत्येक ग्राहकाच्या वेगवेगळ्या प्राधान्यांना आम्ही समजतो. आम्ही सौर प्रकल्पांसाठी विशेषतः स्ट्रीमलाइन केलेल्या प्रक्रियेसह बँक कर्जासाठी सहाय्य प्रदान करतो. याव्यतिरिक्त, सौर तंत्रज्ञानाच्या स्वीकरणास समर्थन देण्यासाठी डिझाइन केलेल्या सरकारी सबसिडीचा लाभ घेण्यासाठी आम्ही आमच्या ग्राहकांना मार्गदर्शन करतो.',
      },
      completeEPC: {
        title: 'पूर्ण EPC उपाय',
        description: 'अल्ट्रॉन पॉवर सिस्टम्स येथे, आम्ही पूर्ण सौर EPC (अभियांत्रिकी, खरेदी आणि बांधकाम) उपाय ऑफर करतो. प्रारंभिक डिझाइन आणि अभियांत्रिकीपासून उच्च-गुणवत्तेच्या सौर उपकरणांच्या खरेदीपर्यंत आणि सौर ऊर्जा प्रणालीच्या बांधकामापर्यंत, आम्ही प्रकल्पाच्या प्रत्येक पैलूची हाताळणी करतो.',
      },
      warranty: {
        title: 'मनाची शांती वॉरंटी',
        description: 'आम्ही आमच्या कामाच्या गुणवत्तेच्या मागे उभे राहतो आणि आम्ही स्थापित केलेली उत्पादने. म्हणूनच सौर पॅनेल आणि सामग्रीच्या मुख्य पुरवठादारांच्या अटी आणि नियमांनुसार आम्ही आमच्या सर्व सौर स्थापनांवर सर्वसमावेशक वॉरंटी ऑफर करतो. आमच्याबरोबर, तुमची सौर प्रणाली संरक्षित आहे हे जाणून तुम्ही मनाची शांती बाळगू शकता.',
      },
    },
    about: {
      title: 'अल्ट्रॉन पॉवर सिस्टम्स का?',
      yearsExperience: 'वर्षांचा अनुभव',
      completeEPC: {
        title: 'पूर्ण EPC उपाय',
        description: 'प्रारंभिक डिझाइन आणि अभियांत्रिकीपासून खरेदी आणि बांधकामापर्यंत, आम्ही तुमच्या सौर प्रकल्पाच्या प्रत्येक पैलूची हाताळणी करतो.',
      },
      multipleApplications: {
        title: 'अनेक अनुप्रयोग',
        description: 'आम्ही निवासी मालमत्ता, व्यावसायिक व्यवसाय, औद्योगिक सुविधा, शेत आणि अपार्टमेंट्ससाठी सानुकूलित उपाय प्रदान करतो.',
      },
      highQuality: {
        title: 'उच्च-गुणवत्ता आणि विश्वासार्ह',
        description: 'आमचा पूर्ण-सेवा दृष्टीकोन प्रीमियम उपकरणे आणि तज्ञ स्थापनासह मनाची शांती सुनिश्चित करतो.',
      },
      customizedSolutions: {
        title: 'सानुकूलित उपाय',
        description: 'आम्ही प्रत्येक ग्राहकाच्या अद्वितीय गरजा पूर्ण करण्यासाठी उपाय सानुकूलित करतो, इष्टतम कार्यप्रदर्शन आणि मूल्य सुनिश्चित करतो.',
      },
      aboutUs: {
        title: 'आमच्याबद्दल',
        description: 'अल्ट्रॉन पॉवर सिस्टम्स ही सौर ऊर्जा प्रणाली आणि उत्पादनांची मुख्य प्रदाता आहे. आमच्या तज्ञांची टीम प्रत्येक ग्राहकाच्या अद्वितीय गरजा पूर्ण करण्यासाठी सानुकूलित उपाय तयार करण्यासाठी समर्पित आहे. छतावरील स्थापनेपासून शेत, निवासी आणि व्यावसायिक अनुप्रयोगांपर्यंत, आम्ही तुम्हाला कव्हर केले आहे.',
        description2: 'आमचा उच्च-गुणवत्ता, विश्वासार्ह आणि पूर्ण-सेवा दृष्टीकोन मनाची शांती सुनिश्चित करतो. सौर तंत्रज्ञानासह तुमच्या भविष्याला शक्ती कशी देऊ शकतो हे जाणून घेण्यासाठी आजच आमच्याशी संपर्क साधा.',
        contactButton: 'आजच आमच्याशी संपर्क साधा',
      },
    },
    footer: {
      description: 'धुळे, जळगाव आणि उत्तर महाराष्ट्रातील अग्रगण्य सौर EPC कंपनी. स्वच्छ, नूतनीकरणीय ऊर्जेसह घरे, व्यवसाय आणि शेतांना शक्ती देणे.',
      quickLinks: 'द्रुत दुवे',
      services: 'सेवा',
      contact: 'संपर्क',
      followUs: 'आमचे अनुसरण करा',
      copyright: '© 2024 अल्ट्रॉन पॉवर सिस्टम्स. सर्व हक्क राखीव.',
    },
    common: {
      readMore: 'अधिक वाचा',
      learnMore: 'अधिक जाणून घ्या',
      getStarted: 'सुरू करा',
    },
  },
  // Hindi translations - using English for now, can be translated later
  hi: {
    nav: {
      home: 'Home',
      services: 'Services',
      products: 'Products',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
      menu: 'Menu',
    },
    hero: {
      title: 'Power Your Future',
      titleHighlight: 'With Solar Energy',
      subtitle: 'Premium rooftop solar solutions for homes, farms, and businesses in Dhule & North Maharashtra.',
      priceNote: '⚡ Systems starting at ₹99,999',
    },
    topBar: {
      serving: 'Serving Dhule, Jalgaon & North Maharashtra',
    },
    features: {
      title: 'Why Choose Ultron?',
      subtitle: 'Comprehensive solar solutions tailored to meet your unique needs with quality and reliability.',
      expertInstallations: {
        title: 'Expert Installations',
        description: 'We specialize in offering premium solar panel installation services for homes, businesses, apartments, and farms. Our team of experts is skilled in effective installation and deeply knowledgeable about optimizing the positioning of solar panels to maximize sunlight exposure and energy generation.',
      },
      flexiblePayment: {
        title: 'Flexible Payment Options',
        description: 'We understand that every customer has different preferences when it comes to payment. We provide assistance for bank loans with streamlined processing specifically for solar projects. Additionally, we guide our customers in availing government subsidies designed to support the adoption of solar technology.',
      },
      completeEPC: {
        title: 'Complete EPC Solutions',
        description: 'At Ultron Power Systems, we offer complete solar EPC (Engineering, Procurement, and Construction) solutions. From initial design and engineering to procurement of high-quality solar equipment and construction of the solar power system, we handle every aspect of the project.',
      },
      warranty: {
        title: 'Peace of Mind Warranty',
        description: 'We stand behind the quality of our work and the products we install. That\'s why we offer a comprehensive warranty on all our solar installations as per terms and conditions of principal suppliers of solar panels and materials. With us, you can have peace of mind knowing that your solar system is protected.',
      },
    },
    about: {
      title: 'Why Ultron Power Systems?',
      yearsExperience: 'Years Experience',
      completeEPC: {
        title: 'Complete EPC Solutions',
        description: 'From initial design and engineering to procurement and construction, we handle every aspect of your solar project.',
      },
      multipleApplications: {
        title: 'Multiple Applications',
        description: 'We serve residential properties, commercial businesses, industrial facilities, farms, and apartments with customized solutions.',
      },
      highQuality: {
        title: 'High-Quality & Reliable',
        description: 'Our full-service approach ensures peace of mind with premium equipment and expert installation.',
      },
      customizedSolutions: {
        title: 'Customized Solutions',
        description: 'We tailor solutions to meet the unique needs of each customer, ensuring optimal performance and value.',
      },
      aboutUs: {
        title: 'About Us',
        description: 'Ultron Power Systems is the go-to provider of solar power systems and products. Our team of experts is dedicated to customizing solutions tailored to meet the unique needs of each customer. From rooftop installations to farm, residential and business applications, we have you covered.',
        description2: 'Our high-quality, reliable and full-service approach ensures peace of mind. Contact us today to learn how we can power your future with solar technology.',
        contactButton: 'Contact Us Today',
      },
    },
    footer: {
      description: 'Leading solar EPC company in Dhule, Jalgaon, and North Maharashtra. Powering homes, businesses, and farms with clean, renewable energy.',
      quickLinks: 'Quick Links',
      services: 'Services',
      contact: 'Contact',
      followUs: 'Follow Us',
      copyright: '© 2024 Ultron Power Systems. All rights reserved.',
    },
    common: {
      readMore: 'Read More',
      learnMore: 'Learn More',
      getStarted: 'Get Started',
    },
  },
};

export function getTranslations(lang: Language | string): Translations {
  // Map 'hi' to 'en' for now (Hindi translations can be added later)
  const normalizedLang = lang === 'hi' ? 'en' : (lang as Language);
  return translations[normalizedLang as Language] || translations.en;
}

export function t(lang: Language): Translations {
  return getTranslations(lang);
}

