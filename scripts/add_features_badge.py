
import os

filepath = r'c:\Users\chank\OneDrive\Documents\UltronSolar\src\lib\translations.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Update interface
if 'badge: string;' not in content[content.find('features: {'):content.find('topBar: {')]:
    content = content.replace(
        "features: {\n    title: string;",
        "features: {\n    badge: string;\n    title: string;"
    )

# Update en
if "'Why Choose Us'" not in content[content.find('en: {'):content.find('mr: {')]:
    content = content.replace(
        "features: {\n      title: 'Expert Solar Installation Services in North Maharashtra',",
        "features: {\n      badge: 'Why Choose Us',\n      title: 'Expert Solar Installation Services in North Maharashtra',"
    )

# Update mr
if "'आम्हाला का निवडावे'" not in content[content.find('mr: {'):content.find('hi: {')]:
    content = content.replace(
        "features: {\n      title: 'उत्तर महाराष्ट्रातील तज्ञ सौर प्रतिष्ठापन सेवा',",
        "features: {\n      badge: 'आम्हाला का निवडावे',\n      title: 'उत्तर महाराष्ट्रातील तज्ञ सौर प्रतिष्ठापन सेवा',"
    )

# Update hi
if "'हमें क्यों चुनें'" not in content[content.find('hi: {'):]:
    content = content.replace(
        "features: {\n      title: 'उत्तर महाराष्ट्र में विशेषज्ञ सौर स्थापना सेवाएं',",
        "features: {\n      badge: 'हमें क्यों चुनें',\n      title: 'उत्तर महाराष्ट्र में विशेषज्ञ सौर स्थापना सेवाएं',"
    )

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
