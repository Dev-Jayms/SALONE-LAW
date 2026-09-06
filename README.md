# SALONE LAW - AI Legal Intelligence Assistant for Sierra Leone

**Created by James Konomanyi**

![SALONE LAW Logo](/public/logo.jpg)

**SALONE LAW** is a comprehensive, AI-powered legal intelligence system and constitutional repository engineered specifically for lawyers, judges, magistrates, legal scholars, law students, and citizens in the Republic of Sierra Leone.

Featuring the national emblem of the **Golden Lion and the Scales of Justice** with Sierra Leone's emerald green, white, and ocean blue accents, the app provides instant access to the **1991 Constitution**, major Acts of Parliament, landmark court precedents, legal document drafters, and an AI Legal Co-Counsel.

---

## 🌟 Key Features

1. **AI Legal Co-Counsel (`/chat`)**:
   - Natural language legal queries.
   - **Immediate Statutory & Constitutional Section Pulling** (quotes exact sections & penalties).
   - **Case Law Precedent Matching** (facts, court bench, and *ratio decidendi*).
   - **Proactive Follow-up Questions** (contextual suggestions for deeper inquiries).
   - Voice speech-to-text input & audio read-aloud support.
   - 100% offline-capable legal matching engine + optional Gemini API cloud enhancement.

2. **1991 Constitution Explorer (`/constitution`)**:
   - Full text of all 13 chapters and 171+ sections of **Act No. 6 of 1991** (As Amended).
   - Dedicated focus on **Chapter III: Fundamental Human Rights and Freedoms** (Sections 15–30).
   - Plain-English legal breakdowns and core principles.
   - Direct link to Section 28 Supreme Court human rights originating motions.

3. **Statutes & Acts Hub (`/statutes`)**:
   - *Criminal Procedure Act 1965* (Bail, Warrants, Committal proceedings).
   - *Public Order (Amendment) Act 2020* (Repeal of Part V Criminal Libel).
   - *Anti-Corruption Act 2008 & 2019* (Sections 36 & 89 Restitution Settlements).
   - *Cyber Security and Crime Act 2021* (Cyberstalking, Electronic evidence).
   - *Customary Land Rights Act 2022* & *National Land Commission Act 2022* (Women land rights & FPIC).
   - *Gender Equality and Women's Empowerment (GEWE) Act 2022* (30% quota & equal pay).
   - *Abolition of the Death Penalty Act 2021* (Act No. 6 of 2021).
   - *Companies Act 2009 / 2014* & *Legal Aid Act 2012*.

4. **Landmark Case Law Database (`/cases`)**:
   - Authoritative Supreme Court, Court of Appeal, and High Court decisions.
   - Structured briefs: Facts, Legal Issues, Decision / Holding, and *Ratio Decidendi*.
   - Includes *Sam-Sumana v. AG (2015)*, *Blyden v. ECSL (2023)*, *The State v. Alieu Badara Turay (Bail)*, and *Simeon Cole v. The State (Standard of Proof)*.

5. **Legal Drafter & Court Forms (`/drafter`)**:
   - Automated drafting of High Court Affidavits in Support of Bail (Section 79 CPA).
   - Formal Pre-Action Demand Letters with custom party and claim variables.
   - 1-click Copy and Text Document Download.

6. **Lawyer's Notebook & Bookmarks (`/notebook`)**:
   - Save statutes, case citations, and custom case notes locally for courtroom reference.

---

## 📱 How to Install on Android Devices

### Method 1: Instant PWA Direct Install (Recommended)
1. Open the hosted web URL in **Google Chrome** or **Samsung Internet** on your Android phone (Tecno, Infinix, Samsung, Xiaomi, Pixel).
2. Tap the in-app **"Install Android App"** button, or tap the browser menu (⋮) and select **"Install app"** or **"Add to Home Screen"**.
3. **SALONE LAW** will install directly onto your phone screen with the custom Lion & Scales icon and run in standalone fullscreen mode with offline caching!

### Method 2: Android Studio APK Build (Capacitor)
```bash
# 1. Install Capacitor Android tools
npm install @capacitor/android

# 2. Add Android platform
npx cap add android

# 3. Sync web assets
npx cap sync android

# 4. Open in Android Studio & Generate Signed APK / Bundle
npx cap open android
```

---

## 🚀 Free Live Hosting & Deployment Options

The project is pre-configured with 1-click deployment configurations for the following **100% FREE** hosting platforms:

### Option A: Deploy to Vercel (Free & Instant)
1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and log in for free.
3. Click **"Add New Project"** and select your GitHub repo.
4. Framework Preset: **Vite** (Build Command: `npm run build`, Output Directory: `dist`).
5. Click **Deploy** — your app is live in seconds with HTTPS!

*(Alternatively via Vercel CLI)*:
```bash
npx vercel
```

---

### Option B: Deploy to Netlify (Free Drag & Drop or Git)
1. Go to [netlify.com](https://netlify.com) and log in.
2. **Drag and drop** the `dist` folder directly onto the Netlify dashboard, or connect your Git repository.
3. Build command: `npm run build`, Publish directory: `dist`.
4. Netlify will instantly provide a live `https://salone-law.netlify.app` URL with PWA support!

---

### Option C: Deploy to Firebase Hosting (Free Tier)
```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Log in and deploy
npx firebase login
npx firebase init hosting
npx firebase deploy
```

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## ⚖️ Attribution & Disclaimer
**SALONE LAW** is developed and published with dedication to the legal fraternity and citizens of Sierra Leone.

- **App Name:** SALONE LAW
- **Creator / Footnote:** *Created by James Konomanyi*
- **Legal Notice:** This application serves as a legal research and educational assistant. For formal court representation, please consult a qualified Barrister & Solicitor registered with the Sierra Leone Bar Association (SLBA).
