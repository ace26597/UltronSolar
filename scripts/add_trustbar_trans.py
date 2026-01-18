
import os

filepath = r'c:\Users\chank\OneDrive\Documents\UltronSolar\src\lib\translations.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

trustbar_interface = """
  // TrustBar Section
  trustBar: {
    badge: string;
    title: string;
    titleHighlight: string;
  };
"""

trustbar_en = """
    trustBar: {
      badge: 'Certified EPC Partner',
      title: 'Authorized Dealer for',
      titleHighlight: 'Industry Leaders',
    },
"""

trustbar_mr = """
    trustBar: {
      badge: 'प्रमाणित EPC भागीदार',
      title: 'साठी अधिकृत विक्रेता',
      titleHighlight: 'उद्योग नेते',
    },
"""

trustbar_hi = """
    trustBar: {
      badge: 'प्रमाणित ईपीसी पार्टनर',
      title: 'के लिए अधिकृत विक्रेता',
      titleHighlight: 'उद्योग जगत के दिग्गज',
    },
"""

# Insert interface
if 'trustBar: {' not in content[:2000]:
    content = content.replace("  // Hero Section", trustbar_interface + "\n  // Hero Section")

# Insert en
if 'trustBar:' not in content[content.find('en: {'):content.find('mr: {')]:
    content = content.replace("hero: {", trustbar_en + "    hero: {", 1)

# Insert mr
if 'trustBar:' not in content[content.find('mr: {'):content.find('hi: {')]:
    first_block_mr = content.find('mr: {')
    insert_pos = content.find('hero: {', first_block_mr)
    content = content[:insert_pos] + trustbar_mr + content[insert_pos:]

# Insert hi
if 'trustBar:' not in content[content.find('hi: {'):]:
    first_block_hi = content.find('hi: {')
    insert_pos = content.find('hero: {', first_block_hi)
    content = content[:insert_pos] + trustbar_hi + content[insert_pos:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
