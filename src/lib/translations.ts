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
    residential: string;
    agriculture: string;
    commercial: string;
    getQuote: string;
  };

  // TrustBar Section
  trustBar: {
    badge: string;
    title: string;
    titleHighlight: string;
  };

  // Hero Section
  hero: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    priceNote: string;
    trustBadge: string;
    rating: string;
    reviews: string;
    stats: {
      years: string;
      yearsLabel: string;
      installed: string;
      installedLabel: string;
      subsidy: string;
      subsidyLabel: string;
    };
  };

  // Top Bar
  topBar: {
    serving: string;
  };

  // Features Section
  features: {
    badge: string;
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
    yearsValue: string;
    completeEPC: {
      title: string;
      description: string;
    };
    multipleApplications: {
      title: string;
      description: string;
      extraNote: string;
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
      lowMaintenance: {
        title: string;
        description: string;
      };
      govtSubsidy: {
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
      addMessage: string;
      hideMessage: string;
    };
    requirements: string[];
    contactInfo: {
      title: string;
      visitUs: string;
      address: string;
      callUs: string;
      phone: string;
      emailUs: string;
      email: string;
    };
  };

  // Wizard Section
  wizard: {
    badge: string;
    title: string;
    subtitle: string;
    steps: {
      step1: {
        title: string;
        subtitle: string;
        options: {
          residential: string;
          agriculture: string;
          commercial: string;
        };
      };
      step2: {
        title: string;
        subtitle: string;
        placeholder: string;
      };
      step3: {
        title: string;
        subtitle: string;
      };
      step4: {
        title: string;
        subtitle: string;
        namePlaceholder: string;
        phonePlaceholder: string;
        submit: string;
        processing: string;
        privacyNote: string;
      };
      step5: {
        title: string;
        subtitle: string;
        summaryTitle: string;
        labels: {
          location: string;
          bill: string;
          system: string;
        };
        cta: {
          whatsapp: string;
          whatsappText: string;
          gallery: string;
          restart: string;
        };
      };
    };
    common: {
      next: string;
      back: string;
      review: string;
    };
    trustLines: string[];
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

  howItWorks: {
    title: string;
    subtitle: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };

  // ServiceAreas Section
  serviceAreas: {
    title: string;
    locations: string;
    description: string;
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

  // Testimonials Section
  testimonials: {
    title: string;
    subtitle: string;
    ratingSuffix: string;
    readMoreGoogle: string;
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

  common: {
    readMore: string;
    learnMore: string;
    getStarted: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      products: 'Products',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
      menu: 'Menu',
      residential: 'Residential',
      agriculture: 'Agriculture',
      commercial: 'Commercial',
      getQuote: 'Get Free Quote',
    },
    trustBar: {
      badge: 'Certified EPC Partner',
      title: 'Authorized Dealer for',
      titleHighlight: 'Industry Leaders',
    },
    hero: {
      title: 'Powering Your Home with',
      titleHighlight: 'Clean Energy',
      subtitle: 'Premium Rooftop Solar Solutions with complete subsidy support and expert installation in North Maharashtra.',
      priceNote: '*Exclusive offer for Dhule & North Maharashtra',
      trustBadge: 'Trusted in North Maharashtra since 2006',
      rating: '4.9/5 Rating',
      reviews: 'based on 56 genuine Google reviews',
      stats: {
        years: '15+',
        yearsLabel: 'Years',
        installed: '25MW+',
        installedLabel: 'Installed',
        subsidy: '100%',
        subsidyLabel: 'Subsidy Help',
      },
    },
    topBar: {
      serving: 'Serving North Maharashtra',
    },
    features: {
      badge: 'Why Choose Us',
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
      yearsValue: '10+',
      completeEPC: {
        title: 'Complete EPC Solutions',
        description: 'From initial design and engineering to procurement and construction, we handle every aspect of your solar project.',
      },
      multipleApplications: {
        title: 'Multiple Applications',
        description: 'We serve residential properties, commercial businesses, industrial facilities, farms, apartments, and solar parking lots with customized solutions.',
        extraNote: 'Includes Solar Carports & Parking Lots',
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
        description: 'Ultron Power Systems is the go-to provider of solar power systems and products. Our team of experts is dedicated to customizing solutions tailored to meet the unique needs of each customer. From rooftop installations to farm, residential, business, and solar carport applications, we have you covered.',
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
        lowMaintenance: {
          title: 'Low Maintenance',
          description: 'Minimal cleaning & long-lasting components',
        },
        govtSubsidy: {
          title: 'Govt. Subsidy',
          description: 'Get up to ₹78,000 subsidy immediately',
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
        addMessage: 'Add message',
        hideMessage: 'Hide message',
      },
      requirements: [
        'Home Solar System',
        'Commercial Solar System',
        'Solar Water Pump',
        'Industrial Solar Solution',
        'Solar Carport / Parking Lot',
        'Solar UPS/Inverter',
        'Other',
      ],
      contactInfo: {
        title: 'Contact Information',
        visitUs: 'Visit Us',
        address: 'Kanishka Apartment, Kshire Colony, Deopur, Dhule, Maharashtra 424002',
        callUs: 'Call Us',
        phone: '+91 94227 87438',
        emailUs: 'Email Us',
        email: 'ultronvij@gmail.com',
      },
    },
    wizard: {
      badge: 'Personalized Recommendations',
      title: 'Find the perfect Solar Solution in 60 seconds.',
      subtitle: 'Tell us about your needs and get an instant ROI summary tailored for North Maharashtra.',
      steps: {
        step1: {
          title: 'Where would you like to install solar?',
          subtitle: 'Select the sector that best describes your project.',
          options: {
            residential: 'My Home',
            agriculture: 'My Farm',
            commercial: 'My Business',
          }
        },
        step2: {
          title: "What's your average monthly bill?",
          subtitle: 'This helps us estimate the system size you need.',
          placeholder: '5,000',
        },
        step3: {
          title: 'Where is the property located?',
          subtitle: 'We optimize designs based on local solar irradiation.',
        },
        step4: {
          title: 'Final Step: Where should we send your plan?',
          subtitle: 'Our engineers will draft a quick summary for you.',
          namePlaceholder: 'Your Full Name',
          phonePlaceholder: 'WhatsApp Number',
          submit: 'Get My Expert Summary',
          processing: 'Processing...',
          privacyNote: 'By clicking, you agree to our privacy policy. No spam, we promise.',
        },
        step5: {
          title: 'Thank You, {name}!',
          subtitle: 'Your solar analysis plan is on its way to {phone}.',
          summaryTitle: 'Pre-Analysis Summary',
          labels: {
            location: 'Location',
            bill: 'Avg. Monthly Bill',
            system: 'Estimated System',
          },
          cta: {
            whatsapp: 'Chat on WhatsApp',
            whatsappText: 'Hi UltronSolar! I just completed your solar wizard.',
            gallery: 'View Gallery',
            restart: 'Start New Analysis',
          }
        }
      },
      common: {
        next: 'Next Step',
        back: 'Back',
        review: 'Review My Answers',
      },
      trustLines: ['🛡️ ISO Certified', '☀️ Authorized Dealer', '⚡ 50+ Installs'],
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

    howItWorks: {
      title: "Your Journey to Solar Excellence",
      subtitle: "A seamless 4-step process designed to get you running on sunshine in no time.",
      steps: [
        { title: "Expert Consultation", description: "Our engineers visit your site for a precise shadow analysis and load calculation." },
        { title: "Custom Engineering", description: "We design a high-efficiency system tailored to your roof and budget needs." },
        { title: "Hassle-Free Install", description: "Professional installation by our certified team with minimal disruption." },
        { title: "Liaison & Activation", description: "We handle all net-metering and subsidy paperwork for a smooth start." },
      ]
    },
    serviceAreas: {
      title: 'Serving North Maharashtra',
      locations: 'Dhule • Jalgaon • Nashik • Nandurbar • Sakri • Shirpur • Dondaicha • Malegaon • Navapur • Amalner • Chopda • Yaval • Faizpur • Bhusawal',
      description: 'As your local solar partner, we provide end-to-end solar EPC services, subsidy assistance, and 24/7 maintenance support across all cities in the North Maharashtra region.',
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
    testimonials: {
      title: 'What Our Clients Say',
      subtitle: 'Trusted by homeowners and businesses across Maharashtra',
      ratingSuffix: '(based on 56 Google Reviews)',
      readMoreGoogle: 'Read more reviews on Google',
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
      residential: 'निवासी',
      agriculture: 'शेती',
      commercial: 'व्यावसायिक',
      getQuote: 'विनामूल्य कोट मिळवा',
    },
    trustBar: {
      badge: 'प्रमाणित EPC भागीदार',
      title: 'साठी अधिकृत विक्रेता',
      titleHighlight: 'उद्योग नेते',
    },
    topBar: {
      serving: 'उत्तर महाराष्ट्रात सेवा देत आहोत',
    },
    hero: {
      title: 'तुमच्या घराला उर्जा द्या',
      titleHighlight: 'स्वच्छ उर्जेने',
      subtitle: 'उत्तर महाराष्ट्रात पूर्ण सबसिडी सपोर्ट आणि तज्ञ इन्स्टॉलेशनसह प्रीमियम रूफटॉप सोलर सोल्यूशन्स.',
      priceNote: '*धुळे आणि उत्तर महाराष्ट्रासाठी खास ऑफर',
      trustBadge: '२००६ पासून उत्तर महाराष्ट्रात विश्वसनीय',
      rating: '४.९/५ रेटिंग',
      reviews: '५६ अस्सल गूगल रिव्ह्यूवर आधारित',
      stats: {
        years: '१५+',
        yearsLabel: 'वर्षे',
        installed: '२५MW+',
        installedLabel: 'इन्स्टॉल केलेले',
        subsidy: '१००%',
        subsidyLabel: 'सबसिडी मदत',
      },
    },
    features: {
      badge: 'आम्हाला का निवडावे',
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
      yearsValue: '१०+',
      completeEPC: {
        title: 'पूर्ण EPC उपाय',
        description: 'प्रारंभिक डिझाइन आणि अभियांत्रिकीपासून खरेदी आणि बांधकामापर्यंत, आम्ही तुमच्या सौर प्रकल्पाच्या प्रत्येक पैलूची हाताळणी करतो.',
      },
      multipleApplications: {
        title: 'अनेक अनुप्रयोग',
        description: 'आम्ही निवासी मालमत्ता, व्यावसायिक व्यवसाय, औद्योगिक सुविधा, शेत, अपार्टमेंट्स आणि सोलर पार्किंग लॉट्ससाठी सानुकूलित उपाय प्रदान करतो.',
        extraNote: 'सोलर कारपोर्ट्स आणि पार्किंग लॉट्स समाविष्ट आहेत',
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
        description: 'अल्ट्रॉन पॉवर सिस्टम्स ही सौर ऊर्जा प्रणाली आणि उत्पादनांची मुख्य प्रदाता आहे. आमची तज्ञांची टीम प्रत्येक ग्राहकाच्या अद्वितीय गरजा पूर्ण करण्यासाठी सानुकूलित उपाय तयार करण्यासाठी समर्पित आहे. छतावरील स्थापनेपासून शेत, निवासी, व्यावसायिक आणि सोलर कारपोर्ट अनुप्रयोगांपर्यंत, आम्ही तुम्हाला कव्हर केले आहे.',
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
          answer: 'महाराष्ट्राच्या हवामानात, 3kW प्रणाली दररोज अंदाजे 12-15 युनिट किंवा दरमहा सुमारे 360-450 युनिट निर्माण करते, सूर्यप्रकाशाची उपलब्धता und पॅनेल कार्यक्षमतेवर अवलंबून.',
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
        lowMaintenance: {
          title: 'कमी देखभाल',
          description: 'किमान स्वच्छता आणि दीर्घकाळ टिकणारे घटक',
        },
        govtSubsidy: {
          title: 'सरकारी सबसिडी',
          description: 'त्वरीत ₹78,000 पर्यंत सबसिडी मिळवा',
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
        addMessage: 'संदेश जोडा',
        hideMessage: 'संदेश लपवा',
      },
      requirements: [
        'घरासाठी सौर प्रणाली',
        'व्यावसायिक सौर प्रणाली',
        'सौर पाणी पंप',
        'औद्योगिक सौर उपाय',
        'सौर कारपोर्ट / पार्किंग लॉट (Solar Carport)',
        'सौर UPS/इन्व्हर्टर',
        'इतर',
      ],
      contactInfo: {
        title: 'संपर्क माहिती',
        visitUs: 'आम्हाला भेट द्या',
        address: 'कनिष्का अपार्टमेंट, क्षीर कॉलनी, देवपूर, धुळे, महाराष्ट्र 424002',
        callUs: 'आम्हाला कॉल करा',
        phone: '+९१ ९४२२७ ८७४३८',
        emailUs: 'आम्हाला ईमेल करा',
        email: 'ultronvij@gmail.com',
      },
    },

    wizard: {
      badge: 'वैयक्तिकृत शिफारसी',
      title: '६० सेकंदात परिपूर्ण सौर समाधान शोधा.',
      subtitle: 'आम्हाला तुमच्या गरजांबद्दल सांगा आणि उत्तर महाराष्ट्रासाठी तयार केलेला झटपट ROI सारांश मिळवा.',
      steps: {
        step1: {
          title: 'तुम्हाला सोलर कोठे बसवायला आवडेल?',
          subtitle: 'तुमच्या प्रकल्पाचे उत्तम वर्णन करणारे क्षेत्र निवडा.',
          options: {
            residential: 'माझे घर',
            agriculture: 'माझे शेत',
            commercial: 'माझा व्यवसाय',
          }
        },
        step2: {
          title: "तुमचे सरासरी मासिक बिल किती आहे?",
          subtitle: 'हे आम्हाला तुम्हाला आवश्यक असलेल्या सिस्टमच्या आकाराचा अंदाज लावण्यास मदत करते.',
          placeholder: '५,०००',
        },
        step3: {
          title: 'मालमत्ता कोठे आहे?',
          subtitle: 'आम्ही स्थानिक सौर विकिरणांच्या आधारे डिझाइन ऑप्टिमाइझ करतो.',
        },
        step4: {
          title: 'अंतिम टप्पा: आम्ही तुमची योजना कोठे पाठवू?',
          subtitle: 'आमचे अभियंते तुमच्यासाठी एक त्वरित सारांश तयार करतील.',
          namePlaceholder: 'तुमचे पूर्ण नाव',
          phonePlaceholder: 'व्हॉट्सॲप नंबर',
          submit: 'माझा तज्ञ सारांश मिळवा',
          processing: 'प्रक्रिया सुरू आहे...',
          privacyNote: 'क्लिक करून, तुम्ही आमच्या गोपनीयता धोरणाशी सहमत आहात.',
        },
        step5: {
          title: 'धन्यवाद, {name}!',
          subtitle: 'तुमचा सौर विश्लेषण आराखडा {phone} वर पाठवला जात आहे.',
          summaryTitle: 'पूर्व-विश्लेषण सारांश',
          labels: {
            location: 'ठिकाण',
            bill: 'सरासरी मासिक बिल',
            system: 'अंदाजित सिस्टम',
          },
          cta: {
            whatsapp: 'व्हॉट्सॲपवर चॅट करा',
            whatsappText: 'नमस्ते UltronSolar! मी आताच तुमचा सोलर विझार्ड पूर्ण केला आहे.',
            gallery: 'गॅलरी पहा',
            restart: 'नवीन विश्लेषण सुरू करा',
          }
        }
      },
      common: {
        next: 'पुढचा टप्पा',
        back: 'मागे',
        review: 'माझ्या उत्तरांचे पुनरावलोकन करा',
      },
      trustLines: ['🛡️ ISO प्रमाणित', '☀️ अधिकृत विक्रेता', '⚡ ५०+ इन्स्टॉलेशन्स'],
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
        description: 'तुमच्या व्यवसाय, उद्योग किंवा पार्किंगच्या जागेसाठी सौर उपाय शोधत आहात? आम्ही ऑपरेशनल खर्च कमी करण्यासाठी आणि स्थिरता सुधारण्यासाठी डिझाइन केलेले सानुकूलित सौर प्रणाली प्रदान करतो.',
      },
    },
    howItWorks: {
      title: "सौर उत्कृष्टतेचा तुमचा प्रवास",
      subtitle: "तुम्हाला काही वेळातच सूर्याच्या प्रकाशावर चालवण्यासाठी डिझाइन केलेली ४-टप्प्यांची प्रक्रिया.",
      steps: [
        { title: "तज्ञ सल्ला", description: "आमचे अभियंते अचूक शॅडो विश्लेषण आणि लोड मोजणीसाठी तुमच्या साइटला भेट देतात." },
        { title: "सानुकूल अभियांत्रिकी", description: "आम्ही तुमच्या छतासाठी und बजेटच्या गरजांनुसार उच्च-कार्यक्षमता प्रणाली डिझाइन करतो." },
        { title: "त्रास-मुक्त स्थापना", description: "आमच्या प्रमाणित टीमद्वारे किमान व्यत्यय सह व्यावसायिक स्थापना." },
        { title: "संपर्क आणि सक्रियकरण", description: "आम्ही सुरळीत सुरुवातीसाठी सर्व नेट-मीटरिंग आणि सबसिडीची कागदपत्रे हाताळतो." },
      ]
    },
    serviceAreas: {
      title: 'उत्तर महाराष्ट्रात सेवा देत आहोत',
      locations: 'धुळे • जळगाव • नाशिक • नंदुरबार • साक्री • शिरपूर • दोंडाईचा • मालेगाव',
      description: 'तुमचे स्थानिक सौर भागीदार म्हणून, आम्ही उत्तर महाराष्ट्र प्रदेशातील सर्व शहरांमध्ये एंड-टू-एंड सौर EPC सेवा, सबसिडी सहाय्य आणि २४/७ देखभाल समर्थन प्रदान करतो.',
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
    testimonials: {
      title: 'आमचे ग्राहक काय म्हणतात',
      subtitle: 'महाराष्ट्रभरातील घरमालक आणि व्यवसायांचा विश्वास',
      ratingSuffix: '(५६ गूगल रिव्ह्यूवर आधारित)',
      readMoreGoogle: 'गूगलवर अधिक रिव्ह्यू वाचा',
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
  hi: {
    nav: {
      home: 'होम',
      services: 'सेवायें',
      products: 'उत्पाद',
      about: 'हमारे बारे में',
      blog: 'ब्लॉग',
      contact: 'संपर्क',
      menu: 'मेनू',
      residential: 'आवासीय',
      agriculture: 'कृषि',
      commercial: 'व्यावसायिक',
      getQuote: 'फ्री कोट प्राप्त करें',
    },
    topBar: {
      serving: 'उत्तर महाराष्ट्र में सेवा दे रहे हैं',
    },
    hero: {
      title: 'अपने घर को शक्ति दें',
      titleHighlight: 'स्वच्छ ऊर्जा से',
      subtitle: 'उत्तर महाराष्ट्र में पूर्ण सब्सिडी सहायता और विशेषज्ञ स्थापना के साथ प्रीमियम रूफटॉप सोलर समाधान।',
      priceNote: '*धुले और उत्तर महाराष्ट्र के लिए विशेष प्रस्ताव',
      trustBadge: '2006 से उत्तर महाराष्ट्र में विश्वसनीय',
      rating: '4.9/5 रेटिंग',
      reviews: '56 वास्तविक गूगल समीक्षाओं पर आधारित',
      stats: {
        years: '15+',
        yearsLabel: 'वर्ष',
        installed: '25MW+',
        installedLabel: 'स्थापित',
        subsidy: '100%',
        subsidyLabel: 'सब्सिडी सहायता',
      },
    },
    features: {
      badge: 'हमें क्यों चुनें',
      title: 'पेशेवर सौर सेवाएं',
      subtitle: 'गुणवत्ता और विश्वसनीयता के साथ आपकी विशिष्ट आवश्यकताओं को पूरा करने के लिए तैयार व्यापक सौर समाधान।',
      expertInstallations: {
        title: 'विशेषज्ञ स्थापना',
        description: 'हम घरों, व्यवसायों, अपार्टमेंट और खेतों के लिए प्रीमियम सौर पैनल स्थापना सेवाएं प्रदान करने में माहिर हैं। हमारी विशेषज्ञों की टीम प्रभावी स्थापना में कुशल है और सौर पैनलों की स्थिति के अनुकूलन के बारे में गहराई से जानती है ताकि सूर्य के प्रकाश का अधिकतम लाभ उठाया जा सके।',
      },
      flexiblePayment: {
        title: 'लचीले भुगतान विकल्प',
        description: 'हम समझते हैं कि भुगतान के मामले में हर ग्राहक की अलग-अलग प्राथमिकताएं होती हैं। हम सौर परियोजनाओं के लिए बैंक ऋण के लिए सहायता प्रदान करते हैं। इसके अतिरिक्त, हम ग्राहकों को सौर तकनीक अपनाने के लिए सरकारी सब्सिडी का लाभ उठाने में मार्गदर्शन करते हैं।',
      },
      completeEPC: {
        title: 'पूर्ण EPC समाधान',
        description: 'अल्ट्रॉन पावर सिस्टम्स में, हम पूर्ण सौर EPC (इंजीनियरिंग, खरीद और निर्माण) समाधान प्रदान करते हैं। डिजाइन और इंजीनियरिंग से लेकर उच्च गुणवत्ता वाले सौर उपकरणों की खरीद और सौर ऊर्जा प्रणाली के निर्माण तक, हम परियोजना के हर पहलू को संभालते हैं।',
      },
      warranty: {
        title: 'शांति की गारंटी वाली वारंटी',
        description: 'हम अपने काम की गुणवत्ता और हमारे द्वारा स्थापित उत्पादों के पीछे खड़े हैं। इसीलिए हम प्रमुख सौर पैनल और सामग्री आपूर्तिकर्ताओं के नियमों और शर्तों के अनुसार अपनी सभी सौर स्थापनाओं पर व्यापक वारंटी प्रदान करते हैं।',
      },
    },
    about: {
      title: 'अल्ट्रॉन पावर सिस्टम्स क्यों?',
      yearsExperience: 'वर्षों का अनुभव',
      yearsValue: '10+',
      completeEPC: {
        title: 'पूर्ण EPC समाधान',
        description: 'प्रारंभिक डिजाइन और इंजीनियरिंग से लेकर खरीद और निर्माण तक, हम आपकी सौर परियोजना के हर पहलू को संभालते हैं।',
      },
      multipleApplications: {
        title: 'एकाधिक अनुप्रयोग',
        description: 'हम आवासीय संपत्तियों, वाणिज्यिक व्यवसायों, औद्योगिक सुविधाओं, खेतों, अपार्टमेंट और सोलर पार्किंग लॉट्स के लिए अनुकूलित समाधान प्रदान करते हैं।',
        extraNote: 'सोलर कारपोर्ट और पार्किंग स्थल शामिल हैं',
      },
      highQuality: {
        title: 'उच्च-गुणवत्ता और विश्वसनीय',
        description: 'हमारा पूर्ण-सेवा दृष्टिकोण प्रीमियम उपकरणों और विशेषज्ञ स्थापना के साथ मानसिक शांति सुनिश्चित करता है।',
      },
      customizedSolutions: {
        title: 'अनुकूलित समाधान',
        description: 'हम प्रत्येक ग्राहक की अद्वितीय आवश्यकताओं को पूरा करने के लिए समाधान तैयार करते हैं, जो इष्टतम प्रदर्शन और मूल्य सुनिश्चित करते हैं।',
      },
      aboutUs: {
        title: 'हमारे बारे में',
        description: 'अल्ट्रॉन पावर सिस्टम्स सौर ऊर्जा प्रणालियों और उत्पादों का प्रमुख प्रदाता है। हमारी विशेषज्ञों की टीम प्रत्येक ग्राहक की विशिष्ट आवश्यकताओं के लिए समाधान तैयार करने के लिए समर्पित है।',
        description2: 'हमारा उच्च-गुणवत्ता, विश्वसनीय और पूर्ण-सेवा दृष्टिकोण मानसिक शांति सुनिश्चित करता है। यह जानने के लिए आज ही हमसे संपर्क करें कि हम आपके भविष्य को सौर तकनीक से कैसे रोशन कर सकते हैं।',
        contactButton: 'आज ही हमसे संपर्क करें',
      },
    },
    footer: {
      description: 'टिकाऊ सौर ऊर्जा समाधानों के साथ महाराष्ट्र को सशक्त बनाना। गुणवत्तापूर्ण स्थापना, विश्वसनीय सहायता और गारंटीड बचत।',
      quickLinks: 'क्विक लिंक्स',
      services: 'हमारी सेवाएं',
      contact: 'संपर्क',
      followUs: 'हमें फॉलो करें',
      copyright: '© 2024 अल्ट्रॉन पावर सिस्टम्स। सर्वाधिकार सुरक्षित।',
      quickLinksItems: {
        home: 'होम',
        services: 'सेवायें',
        products: 'उत्पाद',
        projects: 'प्रोजेक्ट्स',
        contact: 'संपर्क करें',
      },
      servicesList: {
        residential: 'आवासीय रूफटॉप',
        commercial: 'वाणिज्यिक सोलर',
        pumps: 'सोलर वाटर पंप',
        industrial: 'औद्योगिक समाधान',
        maintenance: 'संचालन और रखरखाव',
      },
      newsletter: {
        title: 'अपडेट रहें',
        description: 'नवीनतम सौर रुझानों और विशेष ऑफ़र के लिए हमारे न्यूज़लेटर की सदस्यता लें।',
        placeholder: 'अपना ईमेल दर्ज करें',
        button: 'सब्सक्राइब',
      },
      links: {
        privacy: 'प्राइवेसी पॉलिसी',
        cookies: 'कुकी पॉलिसी',
        cookieSettings: 'कुकी सेटिंग्स',
        sitemap: 'साइटमैप',
      },
    },
    faq: {
      title: 'अक्सर पूछे जाने वाले प्रश्न',
      subtitle: 'महाराष्ट्र में सौर स्थापना के बारे में सामान्य प्रश्न',
      questions: [
        {
          question: 'धुले में 3kW सौर प्रणाली की कीमत क्या है?',
          answer: 'एक मानक 3kW ऑन-ग्रिड सौर प्रणाली आमतौर पर सब्सिडी से पहले ₹1.8 लाख से ₹2.2 लाख तक होती है। कीमतें कंपोनेंट ब्रांड (पैनल, इन्वर्टर) और साइट की स्थितियों के आधार पर भिन्न होती हैं। सटीक कोट के लिए हमसे संपर्क करें।',
        },
        {
          question: 'महाराष्ट्र में कौन सी सब्सिडी उपलब्ध हैं?',
          answer: 'पीएम सूर्य घर मुफ्त बिजली योजना के तहत, आवासीय उपभोक्ता पहले 2kW के लिए ₹30,000 प्रति kW और 3kW तक की अतिरिक्त क्षमता के लिए ₹18,000 की सब्सिडी प्राप्त कर सकते हैं। हम पूरी आवेदन प्रक्रिया में सहायता करते हैं।',
        },
        {
          question: '3kW की प्रणाली कितनी यूनिट बिजली बनाएगी?',
          answer: 'महाराष्ट्र की जलवायु में, 3kW की प्रणाली प्रतिदिन लगभग 12-15 यूनिट, या प्रति माह लगभग 360-450 यूनिट बिजली बनाती है।',
        },
        {
          question: 'आपकी सौर प्रणालियों पर क्या वारंटी है?',
          answer: 'हम सौर पैनलों पर मानक 25 साल की प्रदर्शन वारंटी और इन्वर्टर पर 5-10 साल की वारंटी प्रदान करते हैं। हमारी स्थापना कारीगरी की भी गारंटी है।',
        },
        {
          question: 'क्या मुझे अपने सोलर सिस्टम के लिए बैटरी की जरूरत है?',
          answer: 'ऑन-ग्रिड सिस्टम (शहरों में सबसे आम) के लिए, बैटरी की आवश्यकता नहीं होती है क्योंकि आप ग्रिड को अतिरिक्त बिजली निर्यात करते हैं। ऑफ-ग्रिड सिस्टम के लिए बैटरी की आवश्यकता होती है।',
        },
        {
          question: 'कितनी छत की जगह की आवश्यकता है?',
          answer: 'प्रत्येक 1kW सौर क्षमता के लिए लगभग 100 वर्ग फुट छाया-मुक्त क्षेत्र की आवश्यकता होती है। इसलिए, 3kW की प्रणाली को लगभग 300 वर्ग फुट खाली छत की जगह की आवश्यकता होगी।',
        },
      ],
    },
    specialOffer: {
      badge: 'सीमित समय प्रस्ताव',
      title: 'कम कीमत में अपने घर को रोशन करें',
      subtitle: 'एक अपराजेय मूल्य पर पूर्ण 3kW सोलर रूफटॉप सिस्टम प्राप्त करें।',
      systemTitle: '3kW रूफटॉप सोलर सिस्टम',
      price: '₹99,999',
      originalPrice: '₹1,45,000',
      exclusiveNote: '*धुले और उत्तर महाराष्ट्र के लिए विशेष प्रस्ताव',
      whatsIncluded: 'क्या शामिल है:',
      includedItems: [
        'उच्च दक्षता वाले पॉलीक्रिस्टलाइन पैनल',
        'उन्नत सोलर इन्वर्टर (ऑन-ग्रिड)',
        'पूर्ण माउंटिंग स्ट्रक्चर',
        'पेशेवर स्थापना और वायरिंग',
        'नेट मीटरिंग सहायता',
        'सब्सिडी दस्तावेज़ीकरण सहायता',
      ],
      whyGrab: 'यह डील क्यों लें?',
      benefits: {
        saveMoney: {
          title: 'पैसे बचाएं',
          description: 'बिजली बिल में 90% तक की कटौती करें',
        },
        ecoFriendly: {
          title: 'इको-फ्रेंडली',
          description: 'अपने कार्बन फुटप्रिंट को कम करें',
        },
        lowMaintenance: {
          title: 'कम रखरखाव',
          description: 'न्यूनतम सफाई और लंबे समय तक चलने वाले पुर्जे',
        },
        govtSubsidy: {
          title: 'सरकारी सब्सिडी',
          description: 'तुरंत ₹78,000 तक की सब्सिडी प्राप्त करें',
        },
      },
      claimButton: 'अभी ऑफर का लाभ उठाएं',
      terms: '*नियम और शर्तें लागू। कीमत साइट निरीक्षण और सरकारी सब्सिडी की उपलब्धता के अधीन है।',
    },
    contact: {
      title: 'संपर्क करें',
      subtitle: 'सोलर अपनाने के लिए तैयार हैं? फ्री परामर्श और कोट के लिए आज ही हमसे संपर्क करें।',
      formTitle: 'फ्री कोट का अनुरोध करें',
      form: {
        name: 'नाम',
        phone: 'फोन नंबर',
        city: 'शहर',
        email: 'ईमेल (वैकल्पिक)',
        requirement: 'जरूरत',
        message: 'संदेश (वैकल्पिक)',
        submit: 'फ्री कोट प्राप्त करें',
        submitting: 'भेज रहे हैं...',
        success: 'धन्यवाद! आपका अनुरोध भेज दिया गया है।',
        successSubtext: 'हम 24 घंटे के भीतर आपसे संपर्क करेंगे।',
        error: 'कुछ गलत हो गया। कृपया पुन: प्रयास करें या हमें सीधे कॉल करें।',
        namePlaceholder: 'आपका नाम',
        phonePlaceholder: '10-अंकों का मोबाइल',
        cityPlaceholder: 'धुले, नाशिक, आदि।',
        emailPlaceholder: 'your@email.com',
        messagePlaceholder: 'कोई विशेष आवश्यकता या प्रश्न?',
        addMessage: 'संदेश जोड़ें',
        hideMessage: 'संदेश छुपाएं',
      },
      requirements: [
        'घरेलू सोलर सिस्टम',
        'वाणिज्यिक सोलर सिस्टम',
        'सोलर वाटर पंप',
        'औद्योगिक सोलर समाधान',
        'सोलर यूपीएस/इन्वर्टर',
        'अन्य',
      ],
      contactInfo: {
        title: 'संपर्क जानकारी',
        visitUs: 'हमसे मिलने आएं',
        address: 'कनिष्क अपार्टमेंट, क्षीर कॉलोनी, देवपुर, धुले, महाराष्ट्र 424002',
        callUs: 'हमें कॉल करें',
        phone: '+91 94227 87438',
        emailUs: 'हमें ईमेल करें',
        email: 'ultronvij@gmail.com',
      },
    },

    wizard: {
      badge: 'व्यक्तिगत सिफारिशें',
      title: '60 सेकंड में सही सोलर समाधान खोजें।',
      subtitle: 'हमें अपनी जरूरतों के बारे में बताएं और उत्तर महाराष्ट्र के लिए तैयार तत्काल ROI सारांश प्राप्त करें।',
      steps: {
        step1: {
          title: 'आप सोलर कहाँ लगवाना चाहेंगे?',
          subtitle: 'उस क्षेत्र का चयन करें जो आपके प्रोजेक्ट का सबसे अच्छा वर्णन करता है।',
          options: {
            residential: 'मेरा घर',
            agriculture: 'मेरा खेत',
            commercial: 'मेरा व्यवसाय',
          }
        },
        step2: {
          title: "आपका औसत मासिक बिल क्या है?",
          subtitle: 'यह हमें आपके लिए आवश्यक सिस्टम आकार का अनुमान लगाने में मदद करता है।',
          placeholder: '5,000',
        },
        step3: {
          title: 'संपत्ति कहाँ स्थित है?',
          subtitle: 'हम स्थानीय सौर विकिरण के आधार पर डिजाइन को अनुकूलित करते हैं।',
        },
        step4: {
          title: 'अंतिम चरण: हम आपकी योजना कहाँ भेजें?',
          subtitle: 'हमारे इंजीनियर आपके लिए एक त्वरित सारांश तैयार करेंगे।',
          namePlaceholder: 'आपका पूरा नाम',
          phonePlaceholder: 'व्हाट्सएप नंबर',
          submit: 'मेरा विशेषज्ञ सारांश प्राप्त करें',
          processing: 'प्रक्रिया चल रही है...',
          privacyNote: 'क्लिक करके, आप हमारी गोपनीयता नीति से सहमत होते हैं।',
        },
        step5: {
          title: 'धन्यवाद, {name}!',
          subtitle: 'आपका सौर विश्लेषण प्लान {phone} पर भेजा जा रहा है।',
          summaryTitle: 'पूर्व-विश्लेषण सारांश',
          labels: {
            location: 'स्थान',
            bill: 'औसत मासिक बिल',
            system: 'अंदाजित सिस्टम',
          },
          cta: {
            whatsapp: 'व्हाट्सएप पर चैट करें',
            whatsappText: 'नमस्ते UltronSolar! मैंने अभी आपका सोलर विज़ार्ड पूरा किया है।',
            gallery: 'गैलरी देखें',
            restart: 'नया विश्लेषण शुरू करें',
          }
        }
      },
      common: {
        next: 'अगला चरण',
        back: 'पीछे',
        review: 'मेरे उत्तरों की समीक्षा करें',
      },
      trustLines: ['🛡️ ISO प्रमाणित', '☀️ अधिकृत विक्रेता', '⚡ 50+ इंस्टॉलेशन्स'],
    },
    weServe: {
      sectors: [
        { title: 'घर के मालिक', getQuote: 'कोट प्राप्त करें →' },
        { title: 'कार्यालय और दुकानें', getQuote: 'कोट प्राप्त करें →' },
        { title: 'उद्योग', getQuote: 'कोट प्राप्त करें →' },
        { title: 'खेत और पंप', getQuote: 'कोट प्राप्त करें →' },
        { title: 'अपार्टमेंट', getQuote: 'कोट प्राप्त करें →' },
      ],
      commercial: {
        title: 'वाणिज्यिक और औद्योगिक समाधान',
        description: 'अपने व्यवसाय या उद्योग के लिए सौर समाधान खोज रहे हैं? हम परिचालन लागत को कम करने और स्थिरता में सुधार करने के लिए डिज़ाइन किए गए अनुकूलित सौर प्रणाली प्रदान करते हैं।',
      },
    },
    trustBar: {
      badge: 'प्रमाणित ईपीसी पार्टनर',
      title: 'के लिए अधिकृत विक्रेता',
      titleHighlight: 'उद्योग जगत के दिग्गज',
    },
    howItWorks: {
      title: "सौर उत्कृष्टता की आपकी यात्रा",
      subtitle: "आपको कुछ ही समय में धूप पर चलाने के लिए डिज़ाइन की गई एक सहज 4-चरणीय प्रक्रिया।",
      steps: [
        { title: "विशेषज्ञ परामर्श", description: "हमारे इंजीनियर सटीक शैडो विश्लेषण और लोड गणना के लिए आपकी साइट का दौरा करते हैं।" },
        { title: "कस्टम इंजीनियरिंग", description: "हम आपकी छत और बजट की जरूरतों के अनुरूप एक उच्च दक्षता वाली प्रणाली डिजाइन करते हैं।" },
        { title: "परेशानी मुक्त स्थापना", description: "न्यूनतम व्यवधान के साथ हमारी प्रमाणित टीम द्वारा पेशेवर स्थापना।", },
        { title: "संपर्क और सक्रियकरण", description: "हम सुचारू शुरुआत के लिए सभी नेट-मीटरिंग और सब्सिडी कागजी कार्रवाई को संभालते हैं।" },
      ]
    },
    serviceAreas: {
      title: 'उत्तर महाराष्ट्र में सेवा दे रहे हैं',
      locations: 'धुले • जलगाँव • नाशिक • नंदुरबार • साक्री • शिरपुर • दोंडाईचा • मालेगाँव • नवापुर • अमलनेर • चोपडा • यावल • फैजपुर • भुसावल',
      description: 'आपके स्थानीय सौर भागीदार के रूप में, हम पूरे उत्तर महाराष्ट्र क्षेत्र में एंड-टू-एंड सौर ईपीसी सेवाएं, सब्सिडी सहायता और 24/7 रखरखाव सहायता प्रदान करते हैं।',
      note: 'पास के गांवों और औद्योगिक क्षेत्रों में परियोजनाओं के लिए उपलब्ध',
    },
    brands: {
      title: 'विश्वसनीय ब्रांड जिनके साथ हम काम करते हैं',
      subtitle: 'हम सर्वोत्तम गुणवत्ता वाले उत्पादों और समाधानों को वितरित करने के लिए अग्रणी सौर ऊर्जा ब्रांडों के साथ साझेदारी करते हैं',
    },
    gallery: {
      title: 'हमारे हाल के प्रोजेक्ट्स',
      subtitle: 'हमारी सफल स्थापनाओं और खुश ग्राहकों की झलकियाँ',
      clickToView: 'देखने के लिए क्लिक करें',
    },
    products: {
      title: 'हमारे उत्पाद',
      subtitle: 'आवासीय, वाणिज्यिक और कृषि उपयोग के लिए प्रीमियम गुणवत्ता वाले सौर उपकरण।',
      viewDetails: 'विवरण देखें',
      items: [
        {
          title: 'सौर जल पंप',
          description: 'कृषि और सिंचाई की जरूरतों के लिए विश्वसनीय सौर ऊर्जा संचालित जल पंप प्रणाली।',
        },
        {
          title: 'सोलर पावर यूपीएस',
          description: 'घरों और व्यवसायों के लिए निर्बाध बिजली आपूर्ति समाधान।',
        },
        {
          title: 'वॉल्टेज स्टेबलाइजर',
          description: 'उपकरणों की सुरक्षा के लिए सर्वो नियंत्रित वोल्टेज स्टेबलाइजर।',
        },
        {
          title: 'सोलर स्ट्रीट लाइट्स',
          description: 'सड़कों और परिसरों के लिए स्वचालित, ऊर्जा-कुशल प्रकाश व्यवस्था।',
        },
        {
          title: 'रूफटॉप सोलर पैनल',
          description: 'अधिकतम ऊर्जा उत्पादन के लिए उच्च दक्षता वाले सौर पैनल।',
        },
        {
          title: 'सोलर वाटर हीटर',
          description: 'सभी मौसमों के लिए लागत प्रभावी जल तापन समाधान।',
        },
      ],
    },
    common: {
      readMore: 'और पढ़ें',
      learnMore: 'अधिक जानें',
      getStarted: 'शुरू करें',
    },
    testimonials: {
      title: 'हमारे ग्राहक क्या कहते हैं',
      subtitle: 'महाराष्ट्र भर में घर मालिकों और व्यवसायों द्वारा विश्वसनीय',
      ratingSuffix: '(56 गूगल समीक्षाओं पर आधारित)',
      readMoreGoogle: 'गूगल पर और समीक्षाएं पढ़ें',
    },
  },
};

export function getTranslations(lang: Language | string): Translations {
  const normalizedLang = (lang as Language) || 'en';
  return translations[normalizedLang] || translations.en;
}

export function t(lang: Language): Translations {
  return getTranslations(lang);
}
