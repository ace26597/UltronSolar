
import os

filepath = r'c:\Users\chank\OneDrive\Documents\UltronSolar\src\lib\translations.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Update interface if not already updated
if 'addMessage: string;' not in content:
    content = content.replace(
        "      messagePlaceholder: string;",
        "      messagePlaceholder: string;\n      addMessage: string;\n      hideMessage: string;"
    )

if 'phone: string;' not in content:
    content = content.replace(
        "      callUs: string;\n      emailUs: string;",
        "      callUs: string;\n      phone: string;\n      emailUs: string;\n      email: string;"
    )

# Now update the three language objects
# We search for the contact block in each language

blocks = {
    'en': {
        'addMessage': "        addMessage: 'Add message',",
        'hideMessage': "        hideMessage: 'Hide message',",
        'phone': "        phone: '+91 94227 87438',",
        'email': "        email: 'ultronvij@gmail.com',",
    },
    'mr': {
        'addMessage': "        addMessage: 'संदेश जोडा',",
        'hideMessage': "        hideMessage: 'संदेश लपवा',",
        'phone': "        phone: '+९१ ९४२२७ ८७४३८',",
        'email': "        email: 'ultronvij@gmail.com',",
    },
    'hi': {
        'addMessage': "        addMessage: 'संदेश जोड़ें',",
        'hideMessage': "        hideMessage: 'संदेश छुपाएं',",
        'phone': "        phone: '+91 94227 87438',",
        'email': "        email: 'ultronvij@gmail.com',",
    }
}

# We'll do a simple split and search for 'en:', 'mr:', 'hi:' but inside the translations object
# Actually, let's just use regex or simple string replacement on unique markers

# English
if "addMessage: 'Add message'" not in content:
    content = content.replace(
        "messagePlaceholder: 'Any specific requirements or questions?',",
        "messagePlaceholder: 'Any specific requirements or questions?',\n        addMessage: 'Add message',\n        hideMessage: 'Hide message',"
    )
if "phone: '+91 94227 87438'" not in content:
    content = content.replace(
        "callUs: 'Call Us',\n        emailUs: 'Email Us',",
        "callUs: 'Call Us',\n        phone: '+91 94227 87438',\n        emailUs: 'Email Us',\n        email: 'ultronvij@gmail.com',"
    )

# Marathi
if "addMessage: 'संदेश जोडा'" not in content:
    content = content.replace(
        "messagePlaceholder: 'कोणतीही विशिष्ट गरज किंवा प्रश्न?',",
        "messagePlaceholder: 'कोणतीही विशिष्ट गरज किंवा प्रश्न?',\n        addMessage: 'संदेश जोडा',\n        hideMessage: 'संदेश लपवा',"
    )
if "phone: '+९१ ९४२२७ ८७४३८'" not in content:
    content = content.replace(
        "callUs: 'आम्हाला कॉल करा',\n        emailUs: 'आम्हाला ईमेल करा',",
        "callUs: 'आम्हाला कॉल करा',\n        phone: '+९१ ९४२२७ ८७४३८',\n        emailUs: 'आम्हाला ईमेल करा',\n        email: 'ultronvij@gmail.com',"
    )

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
