# UltronSolar - System Architecture Documentation

## Table of Contents
- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Application Structure](#application-structure)
- [Data Flow Architecture](#data-flow-architecture)
- [Integration Architecture](#integration-architecture)
- [Deployment Architecture](#deployment-architecture)

---

## Overview

UltronSolar is a modern Next.js 15 web application serving as a digital lead-generation platform for Ultron Power Systems, a solar energy solutions company in North Maharashtra, India. The platform combines AI-powered tools, interactive calculators, and seamless lead management to convert visitors into qualified solar customers.

### Key Metrics
- 50+ Installations Completed
- 56+ Customer Reviews
- Operating Since 2006
- Multi-language Support (EN, HI, MR)

---

## System Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser]
        B[Mobile Browser]
    end

    subgraph "Frontend - Next.js 15 App"
        C[React Components]
        D[Context Providers]
        E[Client-Side State]
        F[LocalStorage]
    end

    subgraph "API Layer - Next.js Routes"
        G[/api/contact]
        H[/api/chat]
        I[/api/rag]
        J[/api/solar/estimate]
        K[/api/bill-extract]
        L[/api/building-insights]
        M[/api/geocode]
    end

    subgraph "External Services"
        N[OpenAI API]
        O[Google Generative AI]
        P[NREL PVWatts API]
        Q[Google Maps API]
        R[Gmail SMTP]
        S[WhatsApp Business]
    end

    subgraph "Data Storage"
        T[File System - Markdown]
        U[Browser Storage]
    end

    A --> C
    B --> C
    C --> D
    D --> E
    E --> F
    C --> G
    C --> H
    C --> J
    C --> K
    C --> L
    C --> M
    H --> I
    H --> N
    I --> T
    G --> R
    G --> S
    K --> O
    J --> P
    L --> Q
    M --> Q

    style A fill:#e1f5ff
    style B fill:#e1f5ff
    style C fill:#fff4e6
    style N fill:#c8e6c9
    style O fill:#c8e6c9
    style P fill:#c8e6c9
    style Q fill:#c8e6c9
    style R fill:#c8e6c9
    style S fill:#c8e6c9
```

---

## Technology Stack

### Core Technologies Breakdown

```mermaid
graph LR
    subgraph "Frontend Stack"
        A[Next.js 15.5.7]
        B[React 19]
        C[TypeScript]
        D[Tailwind CSS 3.4.1]
        E[Framer Motion 12.23.26]
    end

    subgraph "Backend & APIs"
        F[Next.js API Routes]
        G[Nodemailer 7.0.10]
        H[OpenAI SDK]
        I[Google Gen AI SDK]
    end

    subgraph "Build & Deploy"
        J[Vercel Platform]
        K[Vercel Analytics]
        L[Vercel Speed Insights]
    end

    subgraph "Development Tools"
        M[ESLint]
        N[PostCSS]
        O[Git]
    end

    A --> B
    A --> C
    B --> D
    B --> E
    F --> G
    F --> H
    F --> I
    J --> K
    J --> L

    style A fill:#61dafb
    style F fill:#68a063
    style J fill:#000000,color:#fff
```

### Technology Version Matrix

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| Framework | Next.js | 15.5.7 | Full-stack React framework |
| Language | TypeScript | Latest | Type-safe development |
| Styling | Tailwind CSS | 3.4.1 | Utility-first CSS framework |
| Animation | Framer Motion | 12.23.26 | Smooth animations & transitions |
| AI (Chat) | OpenAI | Latest | GPT-4o-mini chatbot |
| AI (Vision) | Google Gen AI | Latest | Bill extraction (Gemini) |
| Email | Nodemailer | 7.0.10 | Lead email delivery |
| Deployment | Vercel | Cloud | Serverless hosting |
| Analytics | Vercel Analytics | Latest | User behavior tracking |

---

## Application Structure

### Directory Architecture

```mermaid
graph TD
    A[src/] --> B[app/]
    A --> C[components/]
    A --> D[context/]
    A --> E[lib/]
    A --> F[types/]
    A --> G[data/]
    A --> H[content/]

    B --> B1[api/]
    B --> B2[routes/]
    B --> B3[layout.tsx]

    B1 --> B1A[contact/]
    B1 --> B1B[chat/]
    B1 --> B1C[rag/]
    B1 --> B1D[solar/estimate/]
    B1 --> B1E[bill-extract/]
    B1 --> B1F[building-insights/]
    B1 --> B1G[geocode/]

    C --> C1[Hero.tsx]
    C --> C2[SolarWizard.tsx]
    C --> C3[ChatWidget.tsx]
    C --> C4[CookieBanner.tsx]
    C --> C5[Contact.tsx]
    C --> C6[simulator/]

    D --> D1[CookieConsentContext.tsx]
    D --> D2[LanguageContext.tsx]

    E --> E1[chatApi.ts]
    E --> E2[ragService.ts]
    E --> E3[solarApi.ts]
    E --> E4[solar/estimate.ts]
    E --> E5[translations.ts]

    H --> H1[blog/]

    style A fill:#ff9933
    style B fill:#003366,color:#fff
    style C fill:#4CAF50
    style D fill:#2196F3
    style E fill:#9C27B0
```

### Component Hierarchy

```mermaid
graph TD
    A[RootLayout] --> B[Navbar]
    A --> C[Page Content]
    A --> D[Footer]
    A --> E[LazyChatWidget]
    A --> F[CookieBanner]

    B --> B1[Logo]
    B --> B2[Navigation Menu]
    B --> B3[LanguageToggle]
    B --> B4[Mobile Menu]

    C --> C1[Hero]
    C --> C2[SolarWizard]
    C --> C3[Features]
    C --> C4[Products]
    C --> C5[Gallery]
    C --> C6[Testimonials]
    C --> C7[FAQ]
    C --> C8[Contact]

    C2 --> C2A[Step 1: Sector]
    C2 --> C2B[Step 2: Bill]
    C2 --> C2C[Step 3: Location]
    C2 --> C2D[Step 4: Contact]
    C2 --> C2E[Step 5: Success]

    E --> E1[AI Chat Tab]
    E --> E2[WhatsApp Tab]

    F --> F1[Essential Cookies]
    F --> F2[Analytics Cookies]
    F --> F3[Marketing Cookies]

    style A fill:#001F3F,color:#fff
    style C fill:#fff4e6
    style E fill:#25D366
```

---

## Data Flow Architecture

### Lead Generation Flow

```mermaid
flowchart TD
    A[Visitor Lands] --> B{Entry Point?}

    B -->|Homepage| C[Hero Banner]
    B -->|Direct Link| D[Solar Wizard]
    B -->|SEO/Ads| E[Service Pages]

    C --> F[Trust Signals]
    F --> G[Solar Wizard Opens]

    G --> H[Step 1: Select Sector]
    H --> I[Step 2: Enter Bill Amount]
    I --> J[Step 3: Choose Location]
    J --> K[Step 4: Contact Details]
    K --> L[Step 5: Confirmation]

    L --> M{Lead Submission}
    M -->|POST| N[/api/contact]

    N --> O[Nodemailer Service]
    O --> P[Send Email to Business]
    O --> Q[Send Auto-reply to Customer]

    P --> R[ultronvij@gmail.com]

    L --> S[WhatsApp Integration]
    S --> T[wa.me/ Deep Link]
    T --> U[WhatsApp Chat Opens]

    E --> V[Contact Form]
    V --> N

    style A fill:#e1f5ff
    style G fill:#fff4e6
    style M fill:#ffccbc
    style N fill:#ff9933
    style R fill:#4CAF50
    style U fill:#25D366
```

### Solar Estimation Flow

```mermaid
flowchart LR
    A[User Input] --> B{Input Method}

    B -->|Manual| C[Monthly Bill Amount]
    B -->|Upload| D[Bill Image]

    C --> E[Quick Estimate Form]
    D --> F[Bill Uploader]

    F --> G[POST /api/bill-extract]
    G --> H[Google Gemini Vision API]
    H --> I[Extract Consumption Data]
    I --> E

    E --> J[Location Selection]
    J --> K[POST /api/solar/estimate]

    K --> L{NREL API Available?}
    L -->|Yes| M[PVWatts API Call]
    L -->|No| N[Local Calculation]

    M --> O[Accurate Generation Model]
    N --> P[Peak Sun Hours Formula]

    O --> Q[Results Display]
    P --> Q

    Q --> R[System Size kW]
    Q --> S[Annual Generation kWh]
    Q --> T[Annual Savings ₹]
    Q --> U[Payback Period]
    Q --> V[CO2 Offset]

    Q --> W[CTA: Contact Us]
    W --> X[WhatsApp/Contact Form]

    style A fill:#e1f5ff
    style G fill:#ff9933
    style H fill:#4CAF50
    style K fill:#ff9933
    style Q fill:#fff4e6
    style X fill:#25D366
```

### AI Chat Flow with RAG

```mermaid
sequenceDiagram
    participant U as User
    participant C as ChatWidget Component
    participant R as /api/rag
    participant A as /api/chat
    participant B as Blog Content
    participant O as OpenAI API
    participant L as LocalStorage

    U->>C: Clicks Chat Button
    C->>L: Load Chat History
    L-->>C: Previous Messages

    U->>C: Types Message
    C->>R: POST {query: "message"}
    R->>B: Search Markdown Files
    B-->>R: Relevant Context
    R-->>C: Context Snippets

    C->>A: POST {messages + context}
    A->>O: GPT-4o-mini Request
    O-->>A: AI Response
    A-->>C: Response Text

    C->>L: Save Conversation
    C->>U: Display Response

    U->>C: Continue Chat
    Note over C,O: Maintains conversation context
```

---

## Integration Architecture

### External API Integration Map

```mermaid
graph TB
    subgraph "UltronSolar Platform"
        A[Next.js API Routes]
    end

    subgraph "Communication Services"
        B[Gmail SMTP<br/>ultronvij@gmail.com]
        C[WhatsApp Business<br/>+91 9922992442]
    end

    subgraph "AI/ML Services"
        D[OpenAI API<br/>gpt-4o-mini]
        E[Google Gen AI<br/>Gemini Vision]
    end

    subgraph "Solar & Geo Services"
        F[NREL PVWatts API<br/>Solar Modeling]
        G[Google Maps API<br/>Geocoding]
        H[Google Solar API<br/>Building Insights]
    end

    subgraph "Analytics & Monitoring"
        I[Vercel Analytics]
        J[Vercel Speed Insights]
    end

    A -->|Lead Emails| B
    A -->|wa.me Links| C
    A -->|Chat Requests| D
    A -->|Bill OCR| E
    A -->|Generation Calc| F
    A -->|Address Lookup| G
    A -->|Roof Analysis| H
    A -->|Usage Tracking| I
    A -->|Performance| J

    style A fill:#ff9933
    style B fill:#EA4335
    style C fill:#25D366
    style D fill:#412991
    style E fill:#4285F4
    style F fill:#FBBC04
    style G fill:#34A853
    style H fill:#34A853
    style I fill:#000000,color:#fff
    style J fill:#000000,color:#fff
```

### Environment Variables & Security

```mermaid
graph LR
    subgraph "Environment Config .env.local"
        A[API Keys]
        B[Email Credentials]
        C[Service URLs]
    end

    subgraph "API Key Variables"
        A1[OPENAI_API_KEY]
        A2[GOOGLE_GENERATIVE_AI_KEY]
        A3[NREL_API_KEY]
        A4[NEXT_PUBLIC_GOOGLE_MAPS_API_KEY]
    end

    subgraph "Email Variables"
        B1[CONTACT_EMAIL]
        B2[CONTACT_EMAIL_APP_PASS]
    end

    subgraph "Public Variables"
        C1[NEXT_PUBLIC_SITE_URL]
        C2[NEXT_PUBLIC_WHATSAPP_NUMBER]
    end

    A --> A1
    A --> A2
    A --> A3
    A --> A4

    B --> B1
    B --> B2

    C --> C1
    C --> C2

    style A fill:#ffccbc
    style B fill:#c5e1a5
    style C fill:#b3e5fc
```

---

## Deployment Architecture

### Vercel Deployment Flow

```mermaid
flowchart TD
    A[Developer] --> B[Git Push to GitHub]
    B --> C{Branch?}

    C -->|main| D[Production Deployment]
    C -->|other| E[Preview Deployment]

    D --> F[Vercel Build Process]
    E --> F

    F --> G[npm install]
    G --> H[next build]
    H --> I[Static Generation]
    I --> J[Serverless Functions]

    J --> K[Edge Network Distribution]
    K --> L[Global CDN]

    L --> M[Users Worldwide]

    D --> N[ultronsolar.in]
    E --> O[preview-url.vercel.app]

    N --> M
    O --> P[QA/Testing]

    style A fill:#e1f5ff
    style B fill:#fff4e6
    style D fill:#4CAF50
    style E fill:#FFC107
    style K fill:#000000,color:#fff
    style M fill:#2196F3
```

### Application Runtime Architecture

```mermaid
graph TB
    subgraph "Vercel Edge Network"
        A[CDN Edge Nodes]
    end

    subgraph "Static Assets"
        B[HTML Pages]
        C[JS Bundles]
        D[CSS Stylesheets]
        E[Images/Fonts]
    end

    subgraph "Serverless Functions"
        F[API Route: /api/contact]
        G[API Route: /api/chat]
        H[API Route: /api/rag]
        I[API Route: /api/solar/estimate]
        J[API Route: /api/bill-extract]
    end

    subgraph "Client Browser"
        K[React Hydration]
        L[Client-Side Routing]
        M[State Management]
    end

    A --> B
    A --> C
    A --> D
    A --> E

    B --> K
    C --> K
    K --> L
    L --> M

    M --> F
    M --> G
    M --> H
    M --> I
    M --> J

    style A fill:#000000,color:#fff
    style K fill:#61dafb
    style F fill:#68a063
    style G fill:#68a063
    style H fill:#68a063
    style I fill:#68a063
    style J fill:#68a063
```

### Performance & Optimization Strategy

```mermaid
mindmap
  root((Performance<br/>Optimization))
    Frontend
      Code Splitting
        Dynamic imports
        Route-based chunks
      Image Optimization
        Next.js Image component
        WebP/AVIF formats
        Lazy loading
      Font Optimization
        Google Fonts preload
        display: swap
    Backend
      Serverless Functions
        Cold start optimization
        Function size reduction
      API Caching
        Response memoization
        15-min cache TTL
      Static Generation
        ISR for blog
        Build-time rendering
    Assets
      CDN Distribution
        Edge caching
        Global network
      Compression
        Gzip/Brotli
        Minification
      Tree Shaking
        Unused code removal
        Tailwind JIT
```

---

## State Management Architecture

```mermaid
stateDiagram-v2
    [*] --> AppInit

    AppInit --> CookieCheck
    CookieCheck --> CookieAccepted: Has consent
    CookieCheck --> ShowBanner: No consent

    ShowBanner --> CookieAccepted: User accepts

    CookieAccepted --> AnalyticsEnabled: Analytics consent
    CookieAccepted --> MarketingEnabled: Marketing consent

    AppInit --> LanguageLoad
    LanguageLoad --> EnglishSet: Default
    LanguageLoad --> HindiSet: User preference
    LanguageLoad --> MarathiSet: User preference

    AppInit --> ChatInit
    ChatInit --> LoadHistory: Has session
    ChatInit --> NewSession: No session

    LoadHistory --> ChatReady
    NewSession --> ChatReady

    ChatReady --> UserMessage
    UserMessage --> FetchRAG
    FetchRAG --> SendToAI
    SendToAI --> DisplayResponse
    DisplayResponse --> SaveHistory
    SaveHistory --> ChatReady

    AppInit --> SolarWizardInit
    SolarWizardInit --> Step1Sector
    Step1Sector --> Step2Bill
    Step2Bill --> Step3Location
    Step3Location --> Step4Contact
    Step4Contact --> SubmitLead
    SubmitLead --> ShowSuccess
    ShowSuccess --> [*]
```

---

## Security Architecture

### Security Layers

```mermaid
graph TD
    subgraph "Client Security"
        A[HTTPS Only]
        B[Content Security Policy]
        C[XSS Protection]
        D[CORS Headers]
    end

    subgraph "API Security"
        E[Environment Variables]
        F[API Key Validation]
        G[Rate Limiting]
        H[Input Sanitization]
    end

    subgraph "Data Security"
        I[No Persistent Storage]
        J[Email Encryption in Transit]
        K[LocalStorage Encryption]
        L[No PII in Logs]
    end

    subgraph "Compliance"
        M[Cookie Consent GDPR]
        N[Privacy Policy]
        O[Terms of Service]
    end

    A --> E
    B --> F
    C --> H
    D --> G

    E --> I
    F --> J
    G --> K
    H --> L

    I --> M
    J --> N
    K --> O

    style A fill:#4CAF50
    style E fill:#2196F3
    style I fill:#FF9800
    style M fill:#9C27B0
```

---

## Conclusion

The UltronSolar platform is built on a modern, scalable architecture leveraging Next.js 15's full-stack capabilities, AI-powered services, and serverless deployment. The system prioritizes:

- **Performance**: Edge CDN, static generation, code splitting
- **User Experience**: Smooth animations, multi-language support, mobile-first design
- **Lead Conversion**: Multiple touchpoints (wizard, chat, forms, WhatsApp)
- **Security**: Environment-based secrets, HTTPS, GDPR compliance
- **Scalability**: Serverless functions, global distribution, efficient caching

This architecture enables efficient customer acquisition while maintaining high performance and security standards.
