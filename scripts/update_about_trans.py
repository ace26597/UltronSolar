
import os

filepath = r'c:\Users\chank\OneDrive\Documents\UltronSolar\src\lib\translations.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Update interface
if 'yearsValue: string;' not in content[content.find('about: {'):content.find('footer: {')]:
    content = content.replace(
        "yearsExperience: string;",
        "yearsExperience: string;\n    yearsValue: string;"
    )
if 'extraNote: string;' not in content[content.find('about: {'):content.find('footer: {')]:
    content = content.replace(
        "multipleApplications: {\n      title: string;\n      description: string;\n    };",
        "multipleApplications: {\n      title: string;\n      description: string;\n      extraNote: string;\n    };"
    )

# Update en
if "'Includes Solar Carports & Parking Lots'" not in content[content.find('en: {'):content.find('mr: {')]:
    content = content.replace(
        "yearsExperience: 'Years of Experience',",
        "yearsExperience: 'Years of Experience',\n      yearsValue: '10+',"
    )
    content = content.replace(
        "multipleApplications: {\n      title: 'Residential, Agriculture & Industrial',",
        "multipleApplications: {\n      title: 'Residential, Agriculture & Industrial',\n      extraNote: 'Includes Solar Carports & Parking Lots',"
    )

# Update mr
if "'सोलर कारपोर्ट्स आणि पार्किंग लॉट्स समाविष्ट आहेत'" not in content[content.find('mr: {'):content.find('hi: {')]:
    content = content.replace(
        "yearsExperience: 'वर्षांचा अनुभव',",
        "yearsExperience: 'वर्षांचा अनुभव',\n      yearsValue: '१०+',"
    )
    content = content.replace(
        "multipleApplications: {\n      title: 'निवासी, कृषी आणि औद्योगिक',",
        "multipleApplications: {\n      title: 'निवासी, कृषी आणि औद्योगिक',\n      extraNote: 'सोलर कारपोर्ट्स आणि पार्किंग लॉट्स समाविष्ट आहेत',"
    )

# Update hi
if "'सोलर कारपोर्ट और पार्किंग स्थल शामिल हैं'" not in content[content.find('hi: {'):]:
    content = content.replace(
        "yearsExperience: 'वर्षों का अनुभव',",
        "yearsExperience: 'वर्षों का अनुभव',\n      yearsValue: '10+',"
    )
    content = content.replace(
        "multipleApplications: {\n      title: 'आवासीय, कृषि और औद्योगिक',",
        "multipleApplications: {\n      title: 'आवासीय, कृषि और औद्योगिक',\n      extraNote: 'सोलर कारपोर्ट और पार्किंग स्थल शामिल हैं',"
    )

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
