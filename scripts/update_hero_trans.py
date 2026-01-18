
import os

filepath = r'c:\Users\chank\OneDrive\Documents\UltronSolar\src\lib\translations.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

hero_interface = """
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
"""

hero_en = """
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
"""

hero_mr = """
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
"""

hero_hi = """
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
"""

# Replace interface
import re
content = re.sub(r'hero: \{[^}]+\}', hero_interface.strip(), content)

# Replace en
# We need to find the hero section inside en: { ... }
# This is tricky with regex if it spans multiple lines.
# Let's use simple string replacement for known blocks.

# English
en_start = content.find('en: {')
en_hero_start = content.find('hero: {', en_start)
en_hero_end = content.find('},', en_hero_start) + 2
content = content[:en_hero_start] + hero_en.strip() + content[en_hero_end:]

# Marathi
mr_start = content.find('mr: {')
mr_hero_start = content.find('hero: {', mr_start)
mr_hero_end = content.find('},', mr_hero_start) + 2
content = content[:mr_hero_start] + hero_mr.strip() + content[mr_hero_end:]

# Hindi
hi_start = content.find('hi: {')
hi_hero_start = content.find('hero: {', hi_start)
hi_hero_end = content.find('},', hi_hero_start) + 2
content = content[:hi_hero_start] + hero_hi.strip() + content[hi_hero_end:]


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
