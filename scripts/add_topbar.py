
import os

filepath = r'c:\Users\chank\OneDrive\Documents\UltronSolar\src\lib\translations.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find mr section and add topBar after nav
mr_nav_end = content.find("    },\n    trustBar:", content.find("mr: {"))
if mr_nav_end == -1:
    # Try to find after nav in mr
    mr_start = content.find("mr: {")
    mr_nav_end = content.find("    },\n    hero:", mr_start)
    if mr_nav_end != -1 and "topBar:" not in content[mr_start:mr_start+1000]:
        topbar_mr = """    },
    topBar: {
      serving: 'उत्तर महाराष्ट्रात सेवा देत आहोत',
    },
    hero:"""
        content = content[:mr_nav_end] + topbar_mr + content[mr_nav_end+len("    },\n    hero:"):]

# Find hi section and add topBar after nav
hi_start = content.find("hi: {")
hi_end = content.find("    },\n    hero:", hi_start)
if hi_end != -1 and "topBar:" not in content[hi_start:hi_start+1000]:
    # Check if trustBar comes before hero
    hi_trustbar = content.find("trustBar:", hi_start)
    hi_hero = content.find("hero:", hi_start)
    if hi_trustbar != -1 and hi_trustbar < hi_hero:
        # trustBar exists, add topBar after trustBar
        hi_trustbar_end = content.find("    },\n    hero:", hi_start)
        topbar_hi = """    },
    topBar: {
      serving: 'उत्तर महाराष्ट्र में सेवा दे रहे हैं',
    },
    hero:"""
        content = content[:hi_trustbar_end] + topbar_hi + content[hi_trustbar_end+len("    },\n    hero:"):]
    else:
        # No trustBar before hero, add topBar after nav
        topbar_hi = """    },
    topBar: {
      serving: 'उत्तर महाराष्ट्र में सेवा दे रहे हैं',
    },
    hero:"""
        content = content[:hi_end] + topbar_hi + content[hi_end+len("    },\n    hero:"):]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added topBar to mr and hi")
