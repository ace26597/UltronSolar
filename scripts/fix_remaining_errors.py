
import os
import re

filepath = r'c:\Users\chank\OneDrive\Documents\UltronSolar\src\lib\translations.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix duplicate trustBar in mr (line 961) - replace incomplete one
# Find and replace the incomplete duplicate trustBar in mr
content = content.replace(
    """    trustBar: {
      title: "उत्तर महाराष्ट्रातील ५०+ कुटुंबे आणि उद्योगांचा आमच्यावर विश्वास",
    },
    howItWorks:""",
    """    howItWorks:"""
)

# 2. Fix hi multipleApplications - add extraNote
content = content.replace(
    """      multipleApplications: {
        title: 'एकाधिक अनुप्रयोग',
        description: 'हम आवासीय संपत्तियों, वाणिज्यिक व्यवसायों, औद्योगिक सुविधाओं, खेतों, अपार्टमेंट और सोलर पार्किंग लॉट्स के लिए अनुकूलित समाधान प्रदान करते हैं।',
      },""",
    """      multipleApplications: {
        title: 'एकाधिक अनुप्रयोग',
        description: 'हम आवासीय संपत्तियों, वाणिज्यिक व्यवसायों, औद्योगिक सुविधाओं, खेतों, अपार्टमेंट और सोलर पार्किंग लॉट्स के लिए अनुकूलित समाधान प्रदान करते हैं।',
        extraNote: 'सोलर कारपोर्ट और पार्किंग स्थल शामिल हैं',
      },"""
)

# 3. Add topBar to en after hero
en_topbar = """    topBar: {
      serving: 'Serving North Maharashtra',
    },
"""
# Insert after hero section in en
if "topBar:" not in content[content.find('en: {'):content.find('mr: {')]:
    # Find the end of hero section and insert topBar
    content = content.replace(
        """    },
    features: {
      badge: 'Why Choose Us',
      title: 'Professional Solar Services',""",
        """    },
    topBar: {
      serving: 'Serving North Maharashtra',
    },
    features: {
      badge: 'Why Choose Us',
      title: 'Professional Solar Services',"""
    )

# 4. Add wizard section to en before weServe
wizard_en = """    wizard: {
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
if "wizard:" not in content[content.find('en: {'):content.find('mr: {')]:
    content = content.replace(
        """    weServe: {
      sectors: [
        { title: 'Homeowners', getQuote: 'Get Quote →' },""",
        wizard_en + """    weServe: {
      sectors: [
        { title: 'Homeowners', getQuote: 'Get Quote →' },"""
    )

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed remaining TypeScript errors")
