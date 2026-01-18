
import os

filepath = r'c:\Users\chank\OneDrive\Documents\UltronSolar\src\lib\translations.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix English contactInfo - add phone and email
content = content.replace(
    """contactInfo: {
        title: 'Contact Information',
        visitUs: 'Visit Us',
        address: 'Kanishka Apartment, Kshire Colony, Deopur, Dhule, Maharashtra 424002',
        callUs: 'Call Us',
        emailUs: 'Email Us',
      },""",
    """contactInfo: {
        title: 'Contact Information',
        visitUs: 'Visit Us',
        address: 'Kanishka Apartment, Kshire Colony, Deopur, Dhule, Maharashtra 424002',
        callUs: 'Call Us',
        phone: '+91 94227 87438',
        emailUs: 'Email Us',
        email: 'ultronvij@gmail.com',
      },"""
)

# Replace incomplete trustBar objects with full ones in en
content = content.replace(
    """trustBar: {
      title: "Trusted by 50+ Families & Industry Leaders in North Maharashtra",
    },""",
    """"""  # Remove duplicate
)

# Fix multipleApplications in en - add extraNote
content = content.replace(
    """multipleApplications: {
        title: 'Multiple Applications',
        description: 'We serve residential properties, commercial businesses, industrial facilities, farms, apartments, and solar parking lots with customized solutions.',
      },""",
    """multipleApplications: {
        title: 'Multiple Applications',
        description: 'We serve residential properties, commercial businesses, industrial facilities, farms, apartments, and solar parking lots with customized solutions.',
        extraNote: 'Includes Solar Carports & Parking Lots',
      },"""
)

# Fix multipleApplications in mr - add extraNote
content = content.replace(
    """multipleApplications: {
        title: 'अनेक अनुप्रयोग',
        description: 'आम्ही निवासी मालमत्ता, व्यावसायिक व्यवसाय, औद्योगिक सुविधा, शेत, अपार्टमेंट्स आणि सोलर पार्किंग लॉट्ससाठी सानुकूलित उपाय प्रदान करतो.',
      },""",
    """multipleApplications: {
        title: 'अनेक अनुप्रयोग',
        description: 'आम्ही निवासी मालमत्ता, व्यावसायिक व्यवसाय, औद्योगिक सुविधा, शेत, अपार्टमेंट्स आणि सोलर पार्किंग लॉट्ससाठी सानुकूलित उपाय प्रदान करतो.',
        extraNote: 'सोलर कारपोर्ट्स आणि पार्किंग लॉट्स समाविष्ट आहेत',
      },"""
)

# Fix multipleApplications in hi - add extraNote
content = content.replace(
    """multipleApplications: {
        title: 'एकाधिक अनुप्रयोग',
        description: 'हम आवासीय संपत्तियों, वाणिज्यिक व्यवसायों, औद्योगिक सुविधाओं, खेतों, अपार्टमेंट और सोलर पार्किंग स्थलों के लिए अनुकूलित समाधान प्रदान करते हैं।',
      },""",
    """multipleApplications: {
        title: 'एकाधिक अनुप्रयोग',
        description: 'हम आवासीय संपत्तियों, वाणिज्यिक व्यवसायों, औद्योगिक सुविधाओं, खेतों, अपार्टमेंट और सोलर पार्किंग स्थलों के लिए अनुकूलित समाधान प्रदान करते हैं।',
        extraNote: 'सोलर कारपोर्ट और पार्किंग स्थल शामिल हैं',
      },"""
)

# Replace incomplete trustBar in mr with full one
content = content.replace(
    """trustBar: {
      title: "५०+ कुटुंबे आणि उद्योग नेत्यांनी उत्तर महाराष्ट्रात विश्वास ठेवला",
    },""",
    """trustBar: {
      badge: 'प्रमाणित EPC भागीदार',
      title: 'साठी अधिकृत विक्रेता',
      titleHighlight: 'उद्योग नेते',
    },"""
)

# Replace incomplete trustBar in hi with full one
content = content.replace(
    """trustBar: {
      title: "उत्तर महाराष्ट्र के 50+ परिवारों और उद्योग जगत के नेताओं द्वारा विश्वसनीय",
    },""",
    """trustBar: {
      badge: 'प्रमाणित ईपीसी पार्टनर',
      title: 'के लिए अधिकृत विक्रेता',
      titleHighlight: 'उद्योग जगत के दिग्गज',
    },"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed all TypeScript errors in translations.ts")
