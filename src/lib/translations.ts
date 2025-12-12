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
    quickLinksItems: {
      home: string;
      services: string;
      products: string;
      projects: string;
      contact: string;
    };
    servicesList: {
      residential: string;
      commercial: string;
      pumps: string;
      industrial: string;
      maintenance: string;
    };
    newsletter: {
      title: string;
      description: string;
      placeholder: string;
      button: string;
    };
    links: {
      privacy: string;
      cookies: string;
      cookieSettings: string;
      sitemap: string;
    };
  };
  
  // FAQ Section
  faq: {
    title: string;
    subtitle: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
  
  // Special Offer Section
  specialOffer: {
    badge: string;
    title: string;
    subtitle: string;
    systemTitle: string;
    price: string;
    originalPrice: string;
    exclusiveNote: string;
    whatsIncluded: string;
    includedItems: string[];
    whyGrab: string;
    benefits: {
      saveMoney: {
        title: string;
        description: string;
      };
      ecoFriendly: {
        title: string;
        description: string;
      };
    };
    claimButton: string;
    terms: string;
  };
  
  // Contact Section
  contact: {
    title: string;
    subtitle: string;
    formTitle: string;
    form: {
      name: string;
      phone: string;
      city: string;
      email: string;
      requirement: string;
      message: string;
      submit: string;
      submitting: string;
      success: string;
      successSubtext: string;
      error: string;
      namePlaceholder: string;
      phonePlaceholder: string;
      cityPlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
    };
    requirements: string[];
    contactInfo: {
      title: string;
      visitUs: string;
      address: string;
      callUs: string;
      emailUs: string;
    };
  };
  
  // WeServe Section
  weServe: {
    sectors: Array<{
      title: string;
      getQuote: string;
    }>;
    commercial: {
      title: string;
      description: string;
    };
  };
  
  // ServiceAreas Section
  serviceAreas: {
    title: string;
    locations: string;
    note: string;
  };
  
  // Brands Section
  brands: {
    title: string;
    subtitle: string;
  };
  
  // Gallery Section
  gallery: {
    title: string;
    subtitle: string;
    clickToView: string;
  };
  
  // Products Section
  products: {
    title: string;
    subtitle: string;
    viewDetails: string;
    items: Array<{
      title: string;
      description: string;
    }>;
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
      title: 'Professional Solar Services',
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
      description: 'Empowering Maharashtra with sustainable solar energy solutions. Quality installation, reliable support, and guaranteed savings.',
      quickLinks: 'Quick Links',
      services: 'Our Services',
      contact: 'Contact',
      followUs: 'Follow Us',
      copyright: '© 2024 Ultron Power Systems. All rights reserved.',
      quickLinksItems: {
        home: 'Home',
        services: 'Services',
        products: 'Products',
        projects: 'Projects',
        contact: 'Contact Us',
      },
      servicesList: {
        residential: 'Residential Rooftop',
        commercial: 'Commercial Solar',
        pumps: 'Solar Water Pumps',
        industrial: 'Industrial Solutions',
        maintenance: 'Operation & Maintenance',
      },
      newsletter: {
        title: 'Stay Updated',
        description: 'Subscribe to our newsletter for latest solar trends and exclusive offers.',
        placeholder: 'Enter your email',
        button: 'Subscribe',
      },
      links: {
        privacy: 'Privacy Policy',
        cookies: 'Cookie Policy',
        cookieSettings: 'Cookie Settings',
        sitemap: 'Sitemap',
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Common questions about solar installation in Maharashtra',
      questions: [
        {
          question: 'How much does a 3kW solar system cost in Dhule?',
          answer: 'A standard 3kW on-grid solar system typically ranges from ₹1.8 Lakh to ₹2.2 Lakh before subsidy. Prices vary based on component brands (panels, inverters) and site conditions. Contact us for a precise quote tailored to your roof.',
        },
        {
          question: 'What subsidies are available in Maharashtra?',
          answer: 'Under the PM Surya Ghar Muft Bijli Yojana, residential consumers can get subsidies up to ₹30,000 per kW for the first 2kW and ₹18,000 for additional capacity up to 3kW. We assist with the entire application process.',
        },
        {
          question: 'How many units will a 3kW system generate?',
          answer: 'In Maharashtra\'s climate, a 3kW system generates approximately 12-15 units per day, or about 360-450 units per month, depending on sunlight availability and panel efficiency.',
        },
        {
          question: 'What is the warranty on your solar systems?',
          answer: 'We provide a standard 25-year performance warranty on solar panels and a 5-10 year warranty on inverters, backed by the respective manufacturers. Our installation workmanship is also guaranteed.',
        },
        {
          question: 'Do I need batteries for my solar system?',
          answer: 'For on-grid systems (most common in cities), batteries are not required as you export excess power to the grid. Off-grid or hybrid systems require batteries for backup during power cuts.',
        },
        {
          question: 'How much roof space is required?',
          answer: 'Approximately 100 sq. ft. of shadow-free area is required for every 1kW of solar capacity. So, a 3kW system would need about 300 sq. ft. of clear roof space.',
        },
      ],
    },
    specialOffer: {
      badge: 'LIMITED TIME OFFER',
      title: 'Power Your Home for Less',
      subtitle: 'Get a complete 3kW Solar Rooftop System at an unbeatable price.',
      systemTitle: '3kW Rooftop Solar System',
      price: '₹99,999',
      originalPrice: '₹1,45,000',
      exclusiveNote: '*Exclusive offer for Dhule & North Maharashtra',
      whatsIncluded: 'What\'s Included:',
      includedItems: [
        'High-efficiency Polycrystalline Panels',
        'Advanced Solar Inverter (On-grid)',
        'Complete Mounting Structure',
        'Professional Installation & Wiring',
        'Net Metering Assistance',
        'Subsidy Documentation Support',
      ],
      whyGrab: 'Why Grab This Deal?',
      benefits: {
        saveMoney: {
          title: 'Save Money',
          description: 'Reduce electricity bills by up to 90%',
        },
        ecoFriendly: {
          title: 'Eco-Friendly',
          description: 'Reduce your carbon footprint',
        },
      },
      claimButton: 'Claim Offer Now',
      terms: '*Terms & Conditions apply. Price subject to site inspection and government subsidy availability.',
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Ready to go solar? Contact us today for a free consultation and quote.',
      formTitle: 'Request a Free Quote',
      form: {
        name: 'Name',
        phone: 'Phone Number',
        city: 'City',
        email: 'Email (Optional)',
        requirement: 'Requirement',
        message: 'Message (Optional)',
        submit: 'Get Free Quote',
        submitting: 'Sending...',
        success: 'Thank you! Your request has been sent.',
        successSubtext: 'We will contact you within 24 hours.',
        error: 'Something went wrong. Please try again or call us directly.',
        namePlaceholder: 'Your Name',
        phonePlaceholder: '10-digit mobile',
        cityPlaceholder: 'Dhule, Nashik, etc.',
        emailPlaceholder: 'your@email.com',
        messagePlaceholder: 'Any specific requirements or questions?',
      },
      requirements: [
        'Home Solar System',
        'Commercial Solar System',
        'Solar Water Pump',
        'Industrial Solar Solution',
        'Solar UPS/Inverter',
        'Other',
      ],
      contactInfo: {
        title: 'Contact Information',
        visitUs: 'Visit Us',
        address: 'Kanishka Apartment, Kshire Colony, Deopur, Dhule, Maharashtra 424002',
        callUs: 'Call Us',
        emailUs: 'Email Us',
      },
    },
    weServe: {
      sectors: [
        { title: 'Homeowners', getQuote: 'Get Quote →' },
        { title: 'Offices & Shops', getQuote: 'Get Quote →' },
        { title: 'Industries', getQuote: 'Get Quote →' },
        { title: 'Farms & Pumps', getQuote: 'Get Quote →' },
        { title: 'Apartments', getQuote: 'Get Quote →' },
      ],
      commercial: {
        title: 'Commercial & Industrial Solutions',
        description: 'Looking for solar solutions for your business or industry? We provide customized solar systems designed to reduce operational costs and improve sustainability.',
      },
    },
    serviceAreas: {
      title: 'Serving North Maharashtra',
      locations: 'Dhule • Jalgaon • Nashik • Nandurbar • Sakri • Shirpur • Dondaicha • Malegaon • Navapur • Amalner • Chopda • Yaval • Faizpur • Bhusawal',
      note: 'Available for projects in nearby villages & industrial areas',
    },
    brands: {
      title: 'Trusted Brands We Work With',
      subtitle: 'We partner with leading solar energy brands to deliver the best quality products and solutions',
    },
    gallery: {
      title: 'Our Recent Projects',
      subtitle: 'Glimpses of our successful installations and happy customers',
      clickToView: 'Click to view',
    },
    products: {
      title: 'Our Products',
      subtitle: 'Premium quality solar equipment for residential, commercial, and agricultural use.',
      viewDetails: 'View Details',
      items: [
        {
          title: 'Solar Water Pump',
          description: 'Reliable solar powered water pump systems for agriculture and irrigation needs.',
        },
        {
          title: 'Solar Power UPS',
          description: 'Uninterrupted power supply solutions for homes and businesses.',
        },
        {
          title: 'Voltage Stabilizer',
          description: 'Servo controlled voltage stabilizers for equipment protection.',
        },
        {
          title: 'Solar Street Lights',
          description: 'Automatic, energy-efficient lighting for streets and campuses.',
        },
        {
          title: 'Rooftop Solar Panels',
          description: 'High-efficiency solar panels for maximum energy generation.',
        },
        {
          title: 'Solar Water Heater',
          description: 'Cost-effective water heating solutions for all seasons.',
        },
      ],
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
      description: 'टिकाऊ सौर ऊर्जा उपायांसह महाराष्ट्राला सक्षम करणे. गुणवत्ता स्थापना, विश्वासार्ह समर्थन आणि हमी बचत.',
      quickLinks: 'द्रुत दुवे',
      services: 'आमच्या सेवा',
      contact: 'संपर्क',
      followUs: 'आमचे अनुसरण करा',
      copyright: '© 2024 अल्ट्रॉन पॉवर सिस्टम्स. सर्व हक्क राखीव.',
      quickLinksItems: {
        home: 'मुख्यपृष्ठ',
        services: 'सेवा',
        products: 'उत्पादने',
        projects: 'प्रकल्प',
        contact: 'आमच्याशी संपर्क साधा',
      },
      servicesList: {
        residential: 'निवासी छतावरील',
        commercial: 'व्यावसायिक सौर',
        pumps: 'सौर पाणी पंप',
        industrial: 'औद्योगिक उपाय',
        maintenance: 'ऑपरेशन आणि देखभाल',
      },
      newsletter: {
        title: 'अद्ययावत रहा',
        description: 'नवीनतम सौर ट्रेंड आणि विशेष ऑफरसाठी आमच्या न्यूझलेटरची सदस्यता घ्या.',
        placeholder: 'तुमचा ईमेल प्रविष्ट करा',
        button: 'सदस्यता घ्या',
      },
      links: {
        privacy: 'गोपनीयता धोरण',
        cookies: 'कुकी धोरण',
        cookieSettings: 'कुकी सेटिंग्ज',
        sitemap: 'साइटमॅप',
      },
    },
    faq: {
      title: 'वारंवार विचारले जाणारे प्रश्न',
      subtitle: 'महाराष्ट्रातील सौर स्थापनेबद्दल सामान्य प्रश्न',
      questions: [
        {
          question: 'धुळे येथे 3kW सौर प्रणालीची किंमत किती आहे?',
          answer: 'सबसिडीपूर्वी मानक 3kW ऑन-ग्रिड सौर प्रणाली सामान्यतः ₹1.8 लाख ते ₹2.2 लाख पर्यंत असते. किंमत घटक ब्रँड (पॅनेल, इन्व्हर्टर) आणि साइट परिस्थितींवर अवलंबून बदलते. तुमच्या छतासाठी सानुकूलित अचूक कोटसाठी आमच्याशी संपर्क साधा.',
        },
        {
          question: 'महाराष्ट्रात कोणत्या सबसिडी उपलब्ध आहेत?',
          answer: 'पीएम सूर्य घर मुफ्त बिजली योजनेअंतर्गत, निवासी ग्राहक पहिल्या 2kW साठी प्रति kW ₹30,000 पर्यंत आणि 3kW पर्यंत अतिरिक्त क्षमतेसाठी ₹18,000 पर्यंत सबसिडी मिळू शकतात. आम्ही संपूर्ण अर्ज प्रक्रियेत सहाय्य करतो.',
        },
        {
          question: '3kW प्रणाली किती युनिट निर्माण करेल?',
          answer: 'महाराष्ट्राच्या हवामानात, 3kW प्रणाली दररोज अंदाजे 12-15 युनिट किंवा दरमहा सुमारे 360-450 युनिट निर्माण करते, सूर्यप्रकाशाची उपलब्धता आणि पॅनेल कार्यक्षमतेवर अवलंबून.',
        },
        {
          question: 'तुमच्या सौर प्रणालींवर वॉरंटी काय आहे?',
          answer: 'आम्ही सौर पॅनेलवर मानक 25-वर्षाची कार्यप्रदर्शन वॉरंटी आणि इन्व्हर्टरवर 5-10 वर्षांची वॉरंटी प्रदान करतो, संबंधित निर्मात्यांकडून समर्थित. आमची स्थापना कारागीर देखील हमी दिली जाते.',
        },
        {
          question: 'माझ्या सौर प्रणालीसाठी बॅटरी आवश्यक आहेत का?',
          answer: 'ऑन-ग्रिड प्रणालींसाठी (शहरांमध्ये सर्वात सामान्य), बॅटरी आवश्यक नाहीत कारण तुम्ही जास्त वीज ग्रिडला निर्यात करता. ऑफ-ग्रिड किंवा हायब्रीड प्रणालींना वीज कट दरम्यान बॅकअपसाठी बॅटरी आवश्यक असतात.',
        },
        {
          question: 'किती छत जागा आवश्यक आहे?',
          answer: 'प्रत्येक 1kW सौर क्षमतेसाठी अंदाजे 100 चौ. फूट सावली-मुक्त क्षेत्र आवश्यक आहे. तर, 3kW प्रणालीसाठी सुमारे 300 चौ. फूट स्पष्ट छत जागा आवश्यक असेल.',
        },
      ],
    },
    specialOffer: {
      badge: 'मर्यादित वेळ ऑफर',
      title: 'कमी किंमतीत तुमच्या घराला शक्ती द्या',
      subtitle: 'अतुलनीय किंमतीत पूर्ण 3kW सौर छतावरील प्रणाली मिळवा.',
      systemTitle: '3kW छतावरील सौर प्रणाली',
      price: '₹99,999',
      originalPrice: '₹1,45,000',
      exclusiveNote: '*धुळे आणि उत्तर महाराष्ट्रासाठी विशेष ऑफर',
      whatsIncluded: 'समाविष्ट काय आहे:',
      includedItems: [
        'उच्च-कार्यक्षमता पॉलीक्रिस्टलाइन पॅनेल',
        'प्रगत सौर इन्व्हर्टर (ऑन-ग्रिड)',
        'पूर्ण माउंटिंग स्ट्रक्चर',
        'व्यावसायिक स्थापना आणि वायरिंग',
        'नेट मीटरिंग सहाय्य',
        'सबसिडी दस्तऐवजीकरण समर्थन',
      ],
      whyGrab: 'हे डील का घ्यावे?',
      benefits: {
        saveMoney: {
          title: 'पैसे वाचवा',
          description: 'वीज बिल 90% पर्यंत कमी करा',
        },
        ecoFriendly: {
          title: 'पर्यावरण-अनुकूल',
          description: 'तुमचा कार्बन फुटप्रिंट कमी करा',
        },
      },
      claimButton: 'आता ऑफर क्लेम करा',
      terms: '*अटी आणि नियम लागू. किंमत साइट तपासणी आणि सरकारी सबसिडी उपलब्धतेवर अवलंबून.',
    },
    contact: {
      title: 'आमच्याशी संपर्क साधा',
      subtitle: 'सौर जाण्यासाठी तयार आहात? विनामूल्य सल्लामसलत आणि कोटसाठी आजच आमच्याशी संपर्क साधा.',
      formTitle: 'विनामूल्य कोट विनंती करा',
      form: {
        name: 'नाव',
        phone: 'फोन नंबर',
        city: 'शहर',
        email: 'ईमेल (पर्यायी)',
        requirement: 'गरज',
        message: 'संदेश (पर्यायी)',
        submit: 'विनामूल्य कोट मिळवा',
        submitting: 'पाठवत आहे...',
        success: 'धन्यवाद! तुमची विनंती पाठवली गेली आहे.',
        successSubtext: 'आम्ही 24 तासांत तुमच्याशी संपर्क साधू.',
        error: 'काहीतरी चुकीचे झाले. कृपया पुन्हा प्रयत्न करा किंवा आम्हाला थेट कॉल करा.',
        namePlaceholder: 'तुमचे नाव',
        phonePlaceholder: '10-अंकी मोबाइल',
        cityPlaceholder: 'धुळे, नाशिक, इ.',
        emailPlaceholder: 'तुमचा@ईमेल.com',
        messagePlaceholder: 'कोणतीही विशिष्ट गरज किंवा प्रश्न?',
      },
      requirements: [
        'घरासाठी सौर प्रणाली',
        'व्यावसायिक सौर प्रणाली',
        'सौर पाणी पंप',
        'औद्योगिक सौर उपाय',
        'सौर UPS/इन्व्हर्टर',
        'इतर',
      ],
      contactInfo: {
        title: 'संपर्क माहिती',
        visitUs: 'आम्हाला भेट द्या',
        address: 'कनिष्का अपार्टमेंट, क्षीर कॉलनी, देवपूर, धुळे, महाराष्ट्र 424002',
        callUs: 'आम्हाला कॉल करा',
        emailUs: 'आम्हाला ईमेल करा',
      },
    },
    weServe: {
      sectors: [
        { title: 'घरमालक', getQuote: 'कोट मिळवा →' },
        { title: 'ऑफिस आणि दुकाने', getQuote: 'कोट मिळवा →' },
        { title: 'उद्योग', getQuote: 'कोट मिळवा →' },
        { title: 'शेत आणि पंप', getQuote: 'कोट मिळवा →' },
        { title: 'अपार्टमेंट', getQuote: 'कोट मिळवा →' },
      ],
      commercial: {
        title: 'व्यावसायिक आणि औद्योगिक उपाय',
        description: 'तुमच्या व्यवसाय किंवा उद्योगासाठी सौर उपाय शोधत आहात? आम्ही ऑपरेशनल खर्च कमी करण्यासाठी आणि स्थिरता सुधारण्यासाठी डिझाइन केलेले सानुकूलित सौर प्रणाली प्रदान करतो.',
      },
    },
    serviceAreas: {
      title: 'उत्तर महाराष्ट्रात सेवा देत आहोत',
      locations: 'धुळे • जळगाव • नाशिक • नंदुरबार • साक्री • शिरपूर • दोंडाईचा • मालेगाव',
      note: 'जवळच्या गावांमध्ये आणि औद्योगिक क्षेत्रांमध्ये प्रकल्पांसाठी उपलब्ध',
    },
    brands: {
      title: 'आम्ही ज्या विश्वासार्ह ब्रँड्ससोबत काम करतो',
      subtitle: 'आम्ही अग्रगण्य सौर ऊर्जा ब्रँड्ससोबत भागीदारी करतो जेणेकरून सर्वोत्तम गुणवत्तेची उत्पादने आणि उपाय प्रदान करू शकू',
    },
    gallery: {
      title: 'आमचे अलीकडील प्रकल्प',
      subtitle: 'आमच्या यशस्वी स्थापना आणि आनंदी ग्राहकांचे झलक',
      clickToView: 'पाहण्यासाठी क्लिक करा',
    },
    products: {
      title: 'आमची उत्पादने',
      subtitle: 'निवासी, व्यावसायिक आणि कृषी वापरासाठी प्रीमियम गुणवत्तेची सौर उपकरणे.',
      viewDetails: 'तपशील पहा',
      items: [
        {
          title: 'सौर पाणी पंप',
          description: 'शेती आणि सिंचन गरजांसाठी विश्वासार्ह सौर-चालित पाणी पंप प्रणाली.',
        },
        {
          title: 'सौर पॉवर UPS',
          description: 'घरे आणि व्यवसायांसाठी अखंड वीज पुरवठा उपाय.',
        },
        {
          title: 'व्होल्टेज स्टॅबिलायझर',
          description: 'उपकरण संरक्षणासाठी सर्व्हो नियंत्रित व्होल्टेज स्टॅबिलायझर.',
        },
        {
          title: 'सौर स्ट्रीट लाइट्स',
          description: 'रस्ते आणि कॅम्पससाठी स्वयंचलित, ऊर्जा-कुशल प्रकाश.',
        },
        {
          title: 'छतावरील सौर पॅनेल',
          description: 'जास्तीत जास्त ऊर्जा निर्मितीसाठी उच्च-कार्यक्षमता सौर पॅनेल.',
        },
        {
          title: 'सौर पाणी हीटर',
          description: 'सर्व हंगामासाठी किफायतशीर पाणी गरम करण्याचे उपाय.',
        },
      ],
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
      title: 'Professional Solar Services',
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
      description: 'Empowering Maharashtra with sustainable solar energy solutions. Quality installation, reliable support, and guaranteed savings.',
      quickLinks: 'Quick Links',
      services: 'Our Services',
      contact: 'Contact',
      followUs: 'Follow Us',
      copyright: '© 2024 Ultron Power Systems. All rights reserved.',
      quickLinksItems: {
        home: 'Home',
        services: 'Services',
        products: 'Products',
        projects: 'Projects',
        contact: 'Contact Us',
      },
      servicesList: {
        residential: 'Residential Rooftop',
        commercial: 'Commercial Solar',
        pumps: 'Solar Water Pumps',
        industrial: 'Industrial Solutions',
        maintenance: 'Operation & Maintenance',
      },
      newsletter: {
        title: 'Stay Updated',
        description: 'Subscribe to our newsletter for latest solar trends and exclusive offers.',
        placeholder: 'Enter your email',
        button: 'Subscribe',
      },
      links: {
        privacy: 'Privacy Policy',
        cookies: 'Cookie Policy',
        cookieSettings: 'Cookie Settings',
        sitemap: 'Sitemap',
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Common questions about solar installation in Maharashtra',
      questions: [
        {
          question: 'How much does a 3kW solar system cost in Dhule?',
          answer: 'A standard 3kW on-grid solar system typically ranges from ₹1.8 Lakh to ₹2.2 Lakh before subsidy. Prices vary based on component brands (panels, inverters) and site conditions. Contact us for a precise quote tailored to your roof.',
        },
        {
          question: 'What subsidies are available in Maharashtra?',
          answer: 'Under the PM Surya Ghar Muft Bijli Yojana, residential consumers can get subsidies up to ₹30,000 per kW for the first 2kW and ₹18,000 for additional capacity up to 3kW. We assist with the entire application process.',
        },
        {
          question: 'How many units will a 3kW system generate?',
          answer: 'In Maharashtra\'s climate, a 3kW system generates approximately 12-15 units per day, or about 360-450 units per month, depending on sunlight availability and panel efficiency.',
        },
        {
          question: 'What is the warranty on your solar systems?',
          answer: 'We provide a standard 25-year performance warranty on solar panels and a 5-10 year warranty on inverters, backed by the respective manufacturers. Our installation workmanship is also guaranteed.',
        },
        {
          question: 'Do I need batteries for my solar system?',
          answer: 'For on-grid systems (most common in cities), batteries are not required as you export excess power to the grid. Off-grid or hybrid systems require batteries for backup during power cuts.',
        },
        {
          question: 'How much roof space is required?',
          answer: 'Approximately 100 sq. ft. of shadow-free area is required for every 1kW of solar capacity. So, a 3kW system would need about 300 sq. ft. of clear roof space.',
        },
      ],
    },
    specialOffer: {
      badge: 'LIMITED TIME OFFER',
      title: 'Power Your Home for Less',
      subtitle: 'Get a complete 3kW Solar Rooftop System at an unbeatable price.',
      systemTitle: '3kW Rooftop Solar System',
      price: '₹99,999',
      originalPrice: '₹1,45,000',
      exclusiveNote: '*Exclusive offer for Dhule & North Maharashtra',
      whatsIncluded: 'What\'s Included:',
      includedItems: [
        'High-efficiency Polycrystalline Panels',
        'Advanced Solar Inverter (On-grid)',
        'Complete Mounting Structure',
        'Professional Installation & Wiring',
        'Net Metering Assistance',
        'Subsidy Documentation Support',
      ],
      whyGrab: 'Why Grab This Deal?',
      benefits: {
        saveMoney: {
          title: 'Save Money',
          description: 'Reduce electricity bills by up to 90%',
        },
        ecoFriendly: {
          title: 'Eco-Friendly',
          description: 'Reduce your carbon footprint',
        },
      },
      claimButton: 'Claim Offer Now',
      terms: '*Terms & Conditions apply. Price subject to site inspection and government subsidy availability.',
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Ready to go solar? Contact us today for a free consultation and quote.',
      formTitle: 'Request a Free Quote',
      form: {
        name: 'Name',
        phone: 'Phone Number',
        city: 'City',
        email: 'Email (Optional)',
        requirement: 'Requirement',
        message: 'Message (Optional)',
        submit: 'Get Free Quote',
        submitting: 'Sending...',
        success: 'Thank you! Your request has been sent.',
        successSubtext: 'We will contact you within 24 hours.',
        error: 'Something went wrong. Please try again or call us directly.',
        namePlaceholder: 'Your Name',
        phonePlaceholder: '10-digit mobile',
        cityPlaceholder: 'Dhule, Nashik, etc.',
        emailPlaceholder: 'your@email.com',
        messagePlaceholder: 'Any specific requirements or questions?',
      },
      requirements: [
        'Home Solar System',
        'Commercial Solar System',
        'Solar Water Pump',
        'Industrial Solar Solution',
        'Solar UPS/Inverter',
        'Other',
      ],
      contactInfo: {
        title: 'Contact Information',
        visitUs: 'Visit Us',
        address: 'Kanishka Apartment, Kshire Colony, Deopur, Dhule, Maharashtra 424002',
        callUs: 'Call Us',
        emailUs: 'Email Us',
      },
    },
    weServe: {
      sectors: [
        { title: 'Homeowners', getQuote: 'Get Quote →' },
        { title: 'Offices & Shops', getQuote: 'Get Quote →' },
        { title: 'Industries', getQuote: 'Get Quote →' },
        { title: 'Farms & Pumps', getQuote: 'Get Quote →' },
        { title: 'Apartments', getQuote: 'Get Quote →' },
      ],
      commercial: {
        title: 'Commercial & Industrial Solutions',
        description: 'Looking for solar solutions for your business or industry? We provide customized solar systems designed to reduce operational costs and improve sustainability.',
      },
    },
    serviceAreas: {
      title: 'Serving North Maharashtra',
      locations: 'Dhule • Jalgaon • Nashik • Nandurbar • Sakri • Shirpur • Dondaicha • Malegaon • Navapur • Amalner • Chopda • Yaval • Faizpur • Bhusawal',
      note: 'Available for projects in nearby villages & industrial areas',
    },
    brands: {
      title: 'Trusted Brands We Work With',
      subtitle: 'We partner with leading solar energy brands to deliver the best quality products and solutions',
    },
    gallery: {
      title: 'Our Recent Projects',
      subtitle: 'Glimpses of our successful installations and happy customers',
      clickToView: 'Click to view',
    },
    products: {
      title: 'Our Products',
      subtitle: 'Premium quality solar equipment for residential, commercial, and agricultural use.',
      viewDetails: 'View Details',
      items: [
        {
          title: 'Solar Water Pump',
          description: 'Reliable solar powered water pump systems for agriculture and irrigation needs.',
        },
        {
          title: 'Solar Power UPS',
          description: 'Uninterrupted power supply solutions for homes and businesses.',
        },
        {
          title: 'Voltage Stabilizer',
          description: 'Servo controlled voltage stabilizers for equipment protection.',
        },
        {
          title: 'Solar Street Lights',
          description: 'Automatic, energy-efficient lighting for streets and campuses.',
        },
        {
          title: 'Rooftop Solar Panels',
          description: 'High-efficiency solar panels for maximum energy generation.',
        },
        {
          title: 'Solar Water Heater',
          description: 'Cost-effective water heating solutions for all seasons.',
        },
      ],
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

