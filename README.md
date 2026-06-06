# 🌌 Sourav Halder • Data Scientist & AI/ML Engineer Portfolio

A premium, interactive, and responsive web application showcasing expertise in data engineering, machine learning pipelines, cloud architecture, and intelligent software automation.

🚀 **Live Portfolio:** [souravhalder1996.github.io](https://souravhalder1996.github.io/)

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: Next.js 15 (App Router with Static HTML Export)
- **Styling & UI**: Tailwind CSS (Vanilla utilities, harmonized dark/light modes)
- **Icons & Visuals**: Lucide React, Devicon SVG CDN vectors
- **Form Service**: Web3Forms API (with secure client-side injection)
- **CI/CD**: GitHub Actions (auto-deploying optimized builds to GitHub Pages)

---

## 🌟 Key Features

### 1. Simulated VS Code IDE
- Interactive file explorer containing `data_science.ipynb`, `cloud_infra.yml`, and `languages.py` tabs.
- Clean code styling mimicking the authentic VS Code Dark+ color palette.
- Dynamic responsive grids displaying cards for databases, cloud providers, and machine learning stacks.

### 2. Interactive Terminal Console
- Instant telemetry simulation displaying live connection status, host specs, and automation script run outputs.

### 3. Parallel Metrics Dashboard
- Live count-up telemetry metrics that load instantly and slide smoothly when scrolled into view.

### 4. Horizontal Connected Experience Slider
- A clean timeline selector showing one role at a time.
- Uses dynamic flex-segmented timeline connections that self-adjust spacing to prevent overflow.

### 5. Adaptive Navigation Pill
- Scroll-synchronized floating header navbar that starts transparent and shifts into a shrunken frosted glass pill capsule upon scroll.
- Incorporates active-section highlighting, including bottom-of-page contact routing.

### 6. Stretch-Aligned Contact Form
- Visual height equalization keeping both the contact ledger and input form cards perfectly aligned.
- Complete form validation and vertical alignment centering during successful dispatch transitions.

---

## 💻 Local Development

### Prerequisites
Make sure you have Node.js (v20 or higher) and npm installed.

### 1. Clone the repository:
```bash
git clone https://github.com/SouravHalder1996/souravhalder1996.github.io.git
cd souravhalder1996.github.io
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Environment Setup (Optional)
To test form submissions locally:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY="YOUR_WEB3FORMS_ACCESS_KEY_HERE"
```
*(If no key is configured, the contact form will automatically fall back to simulation mode, making local layout testing simple without API dependencies).*

### 4. Spin up the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Deployment & CI/CD

The website is configured to deploy to **GitHub Pages** using **GitHub Actions**.

1. **Compilation**: When pushing to `main`, next compiles the site statically:
   ```bash
   npm run build
   ```
   This generates standard, optimized HTML/CSS/JS bundles in the `./out` directory.
2. **Key Injection**: The workflow pulls `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` from your repository secrets and injects it into the build env.
3. **Deployment**: GitHub Pages receives and hosts the static `./out` folder.

---

## 📄 License
Created by [Sourav Halder](https://github.com/SouravHalder1996). All rights reserved.
