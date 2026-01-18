
import os

filepath = r'c:\Users\chank\OneDrive\Documents\UltronSolar\src\lib\translations.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

wizard_interface = """
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
"""

wizard_en = """
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
"""

wizard_mr = """
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
"""

wizard_hi = """
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
"""

# Insert interface
if 'wizard: {' not in content[:2000]: # check interface section
    content = content.replace("  // WeServe Section", wizard_interface + "\n  // WeServe Section")

# Insert en
if 'wizard:' not in content[content.find('en: {'):content.find('mr: {')]:
    content = content.replace("weServe: {", wizard_en + "    weServe: {", 1)

# Insert mr (next occurrence after en)
if 'wizard:' not in content[content.find('mr: {'):content.find('hi: {')]:
    # find where mr: { ends its previous block or start of its first block
    first_block_mr = content.find('mr: {')
    insert_pos = content.find('weServe: {', first_block_mr)
    content = content[:insert_pos] + wizard_mr + content[insert_pos:]

# Insert hi
if 'wizard:' not in content[content.find('hi: {'):]:
    first_block_hi = content.find('hi: {')
    insert_pos = content.find('weServe: {', first_block_hi)
    content = content[:insert_pos] + wizard_hi + content[insert_pos:]


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
