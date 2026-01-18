
import os

filepath = r'c:\Users\chank\OneDrive\Documents\UltronSolar\src\lib\translations.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add trustBar to en
en_start = content.find("en: {")
en_nav_end = content.find("    hero: {", en_start)
trustbar_en = """    trustBar: {
      badge: 'Certified EPC Partner',
      title: 'Authorized Dealer for',
      titleHighlight: 'Industry Leaders',
    },
"""
if 'trustBar: {' not in content[en_start:en_start+2000]:
    content = content[:en_nav_end] + trustbar_en + content[en_nav_end:]

# Add badge to features in en
if "badge: 'Why Choose Us'" not in content:
    content = content.replace(
        "features: {\n      title: 'Professional Solar Services',",
        "features: {\n      badge: 'Why Choose Us',\n      title: 'Professional Solar Services',"
    )

# Add yearsValue to about in en
if "yearsValue: '10+'" not in content[content.find('en: {'):content.find('mr: {')]:
    content = content.replace(
        "yearsExperience: 'Years Experience',\n      completeEPC:",
        "yearsExperience: 'Years Experience',\n      yearsValue: '10+',\n      completeEPC:"
    )

# Add extraNote to multipleApplications in en
if "extraNote: 'Includes Solar Carports & Parking Lots'" not in content[content.find('en: {'):content.find('mr: {')]:
    content = content.replace(
        "multipleApplications: {\n      title: 'Multiple Applications',\n      description: 'We serve residential properties, commercial businesses, industrial facilities, farms, apartments, and solar parking lots with customized solutions.',\n    },",
        "multipleApplications: {\n      title: 'Multiple Applications',\n      description: 'We serve residential properties, commercial businesses, industrial facilities, farms, apartments, and solar parking lots with customized solutions.',\n      extraNote: 'Includes Solar Carports & Parking Lots',\n    },"
    )

# Add badge to features in mr
if "badge: 'आम्हाला का निवडावे'" not in content[content.find('mr: {'):content.find('hi: {')]:
    content = content.replace(
        "features: {\n      title: 'आम्हाला का निवडा',",
        "features: {\n      badge: 'आम्हाला का निवडावे',\n      title: 'आम्हाला का निवडा',"
    )

# Add trustBar to mr
mr_start = content.find("mr: {")
mr_hero_start = content.find("    hero: {", mr_start)
trustbar_mr = """    trustBar: {
      badge: 'प्रमाणित EPC भागीदार',
      title: 'साठी अधिकृत विक्रेता',
      titleHighlight: 'उद्योग नेते',
    },
"""
if 'trustBar: {' not in content[mr_start:mr_start+2000]:
    content = content[:mr_hero_start] + trustbar_mr + content[mr_hero_start:]

# Add badge to features in hi
if "badge: 'हमें क्यों चुनें'" not in content[content.find('hi: {'):]:
    content = content.replace(
        "features: {\n      title: 'पेशेवर सौर सेवाएं',",
        "features: {\n      badge: 'हमें क्यों चुनें',\n      title: 'पेशेवर सौर सेवाएं',"
    )

# Add trustBar to hi
hi_start = content.find("hi: {")
hi_hero_start = content.find("    hero: {", hi_start)
trustbar_hi = """    trustBar: {
      badge: 'प्रमाणित ईपीसी पार्टनर',
      title: 'के लिए अधिकृत विक्रेता',
      titleHighlight: 'उद्योग जगत के दिग्गज',
    },
"""
if 'trustBar: {' not in content[hi_start:]:
    content = content[:hi_hero_start] + trustbar_hi + content[hi_hero_start:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added missing fields to translations.ts")
