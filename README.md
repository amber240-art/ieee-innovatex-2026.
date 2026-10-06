# IEEE InnovateX 2026 — Event Website
### IEEE Industry Applications Society & IEEE Robotics & Automation Society Student Branch Chapters
**Madhav Institute of Technology & Science (MITS Gwalior)**  
*Recruitment Drive 2026 • Domain 03: Technical — Task 1*

---

## 🚀 Live Demo & Quick Launch

### 1-Click Launch on PC
Double-click `open_website.bat` or open `index.html` directly in any web browser (Chrome, Edge, Firefox, Brave, Safari). No npm/node servers or dependencies required!

---

## 📌 Project Overview
**IEEE InnovateX 2026** is the flagship annual technical summit jointly organized by the **IEEE Industry Applications Society (IAS)** and **IEEE Robotics & Automation Society (RAS)** Student Branch Chapters at **MITS Gwalior**.

This responsive single-page web application serves as the primary gateway for delegates, students, faculty, and industry leaders to explore event details, review keynote lectures, inspect the 2-day session schedule, and register for technical tracks with instant digital admit pass generation.

---

## ✅ Task 1 Requirements Compliance Matrix

| Requirement | Specification | Implementation Details |
| :--- | :--- | :--- |
| **IEEE, IAS & RAS Logos** | Official logos in high resolution | Integrated in Sticky Navigation Header, Partner Showcase Grid, and Footer with official emblems. |
| **Hero Section** | High-impact hero with **Register Now** CTA | Features summit branding, MITS Gwalior credentials, live countdown timer, and glowing **Register Now** button. |
| **3–4 Item Event Schedule** | Clear timeline with session details | 4-stage chronological agenda with interactive track filters (`All`, `RAS Track`, `IAS Track`, `Hackathon & Expo`). |
| **2 Keynote Speaker Cards** | High-profile keynote profiles | 2 comprehensive speaker cards with photos, designations, affiliations, talk titles, topic tags, and interactive abstract popups. |
| **Footer with Provided Image** | MITS institutional banner | Prominently embeds `assets/footer-image.jpg` with NAAC A++ banner, contact info, and society chapters. |
| **Responsive Layout** | Mobile, tablet, and desktop adaptive | Pure CSS3 fluid layout (Grid + Flexbox + clamp typography) with mobile hamburger drawer. |
| **GitHub & Live Deployment** | Ready for GitHub Pages / Vercel | Includes `.nojekyll`, `vercel.json`, and deployment guides. |

---

## 📂 File Architecture

```text
ieee-innovatex-2026-website/
├── index.html                      # Semantic, accessible HTML5 single-page application
├── open_website.bat                # 1-click script to launch website in default browser
├── vercel.json                     # Optimized deployment headers for Vercel
├── .nojekyll                       # GitHub Pages Jekyll bypass flag
├── README.md                       # Complete documentation and deployment guide
├── css/
│   └── styles.css                  # Modern CSS (dark/light themes, glassmorphism, responsive grid)
├── js/
│   └── main.js                     # Countdown timer, track filtering, validation, pass generator
└── assets/
    ├── ieee-logo.png               # Official IEEE emblem
    ├── ias-logo.png                # IEEE IAS SBC MITS Gwalior logo
    ├── ras-logo.png                # IEEE RAS SBC MITS Gwalior logo
    ├── footer-image.jpg            # Official MITS Gwalior institutional banner
    ├── speaker-1.jpg               # Dr. Priya Sharma (IEEE RAS Keynote Speaker)
    ├── speaker-2.jpg               # Er. Vikramaditya Sen (IEEE IAS Keynote Speaker)
    ├── qr-code.png                 # Digital Admit Pass scannable QR verification
    ├── mits-crest.png              # Historic MITS College Crest
    └── mits-logo.png               # Modern MITS logo badge
```

---

## 🌟 Key Features

### 1. Society Brand Integration
- Official **IEEE**, **IEEE IAS SBC MITS Gwalior**, and **IEEE RAS SBC MITS Gwalior** logos are rendered with clean contrast badges in the header, partner showcase, and footer.
- The official institutional footer banner (`footer-image.jpg`) from the recruitment asset kit is integrated seamlessly.

### 2. Live Countdown Clock
- Real-time countdown timer accurately ticking down to summit kickoff on **October 24, 2026, 09:30 AM IST**.

### 3. Keynote Speaker Profiles
- **Dr. Priya Sharma** (*Autonomous Systems Lab • Senior Member IEEE*): Keynote on *"Next-Gen Autonomous Navigation: From ROS2 Simulation to Real-World Edge Deployment"*.
- **Er. Vikramaditya Sen** (*Lead Automation Architect • IEEE IAS Specialist*): Keynote on *"Industrial IoT & Cyber-Physical Systems: Automating High-Precision Manufacturing"*.
- Interactive *"View Abstract"* modals providing detailed technical lecture synopses.

### 4. Interactive 4-Item Event Schedule
- **Session 1 (Day 1 - 09:30 AM)**: Inaugural Ceremony & Autonomous Mobile Robotics Keynote (Main Auditorium).
- **Session 2 (Day 1 - 01:30 PM)**: Hands-on Workshop: Industrial IoT Architectures, Edge AI & PLC Interfacing (Advanced Computing Lab).
- **Session 3 (Day 2 - 10:00 AM)**: InnovateX Hack-a-Bot & Grand Project Expo (Colloquium Hall).
- **Session 4 (Day 2 - 03:30 PM)**: Valedictory Ceremony, Awards Distribution & Chapter Mixer (Main Auditorium).
- Instant track filtering buttons allow filtering between tracks in zero milliseconds.

### 5. Interactive Registration & Digital Pass Generator
- Client-side form validation ensuring strict name, email format, and 10-digit Indian mobile validation.
- Handy **"Autofill Demo Data"** button allowing evaluators to populate and test the form in one click.
- Submitting the form generates a personalized **Digital Admit Pass** complete with a unique registration ID (`IX26-XXXXXX`), participant metadata, and a scannable QR verification code.

### 6. Dark / Light Mode Toggle
- Includes persistent dark and light theme switching stored in `localStorage`.

---

## 🌐 How to Deploy to GitHub & Live Hosting

### Step 1: Push to GitHub
Open PowerShell or Terminal in the project directory:

```bash
cd "C:\Users\Hello\.gemini\antigravity\scratch\ieee-innovatex-2026-website"
git init
git add .
git commit -m "feat: complete IEEE InnovateX 2026 event website for recruitment task 1"
git branch -M main
git remote add origin https://github.com/<your-username>/ieee-innovatex-2026.git
git push -u origin main
```

### Step 2: Deploy to GitHub Pages (Free)
1. Go to your repository on **GitHub**.
2. Click **Settings** > **Pages** (under Code and automation in the left sidebar).
3. Under **Branch**, select `main` and folder `/ (root)`.
4. Click **Save**.
5. Your website will be live in 1–2 minutes at:  
   `https://<your-username>.github.io/ieee-innovatex-2026/`

### Step 3: Deploy to Vercel (Alternative 1-Click Deployment)
1. Visit [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **Add New...** > **Project**.
3. Import the `ieee-innovatex-2026` repository.
4. Keep all default settings (the included `vercel.json` ensures optimal caching).
5. Click **Deploy**. Your live production URL will be ready in 15 seconds!

---

## 📋 Evaluation Checklist

- [x] All required logos (IEEE, IAS, RAS) included in header, hero strip, and footer
- [x] Hero section with clear theme, date, venue, and "Register Now" button
- [x] 3–4 item event schedule with time, venue, speaker, and track badges
- [x] 2 keynote speaker cards with photos, affiliations, talk titles, and abstracts
- [x] Footer with the provided institutional footer image
- [x] Responsive layout tested for mobile, tablet, and desktop
- [x] Standalone, self-contained files saved locally on the PC
- [x] GitHub push and deployment ready (`README.md`, `.nojekyll`, `vercel.json`)
