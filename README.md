# ABTalks 60-Day Coding Challenge Redesign

> [!IMPORTANT]
> **PROTOTYPE & DEMO DISCLAIMER**
> This application is a high-fidelity interactive frontend demonstration designed mobile-first (390px viewport) for the ABTalks Hackathon. It uses fully interactive, mocked JSON-based state profiles to simulate real-world workflows. 
> 
> **Ready for Production Scaling**: If you are looking to scale this prototype into a full, production-ready platform, the architecture is designed to easily plug in:
> *   **Authentication**: OAuth integration for GitHub and LinkedIn accounts (e.g., Supabase Auth, Clerk, or Firebase Auth).
> *   **Database Layer**: Persistent user progress, streaks, history, and rankings in a database (e.g., PostgreSQL or MongoDB).
> *   **Automated Verifications**: Real backend check routines verifying submitted GitHub commits via the GitHub API and LinkedIn posts via webhooks/API.
> *   **Real-time Leaderboards**: WebSockets or Redis for real-time rank updates, notifications, and student chats.
> 
> *Contact the creator to upgrade this to a live, production-grade application!*

---

## 📱 Mobile-First Screens Implemented

As requested in the problem statement, the application is optimized for mobile viewports (390px width) where students primarily interact late at night:

1.  **Landing Page (`/`)**: High-impact headlines, trust banners, value pillars, and a **Digital Commitment Pledge Form** where students sign up, select their track, and embark on the challenge.
2.  **Student Dashboard (`/dashboard`)**: Radial progress indicators tracking active streaks, a **60-Day Streak Calendar Grid** highlighting completed, missed, and active days, and a **Streak Freeze Recovery** prompt to handle missed days.
3.  **Challenge Day (`/day/12` / Dynamic)**: Challenge briefings, task checklists, copyable starter code blocks, and the **AI LinkedIn Draft Generator** (which constructs custom announcement posts for copy-pasting in one click). Includes a simulated validation loading sequence with confetti rewards.

---

## 💡 Thoughtful Features Implemented

*   **Late-Night Study Companion**: A built-in audio player that streams focus lo-fi music with a rotating cassette wheel animation. Includes a **Midnight Mode** toggle that shifts the color scheme to warm amber/sepia tones to prevent blue-light eye strain at 2 AM.
*   **Streak Freeze Recovery**: Simulates real-world user resilience by letting students use earned freezes to mend broken streaks directly from the dashboard.
*   **Judge DevTools Drawer**: A sliding control panel at the bottom of the screen allowing evaluators to hot-swap the client state instantly between:
    *   *New Student (Day 1)*: Empty state, onboarding checklist, select track.
    *   *Active Streak (Day 12)*: 11-day active streak, today's submission pending.
    *   *Missed Day (Day 13)*: Yesterday missed, streak broken at 0, freeze recovery button active.
    *   *Challenge Completed (Day 60)*: 60/60 completed, graduation certificate unlocked.

---

## 📂 Project Structure

```
ABTalks/
├── dist/                  # Production compiled assets
├── src/
│   ├── assets/            # Default asset configurations
│   ├── components/        # Sub-views and features
│   │   ├── ChallengeDay.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DevTools.jsx
│   │   ├── LandingPage.jsx
│   │   └── LofiCompanion.jsx
│   ├── data/
│   │   └── mockData.js    # Data schemas (60 days, profiles)
│   ├── App.jsx            # Router and layout controller
│   ├── index.css          # Vanilla CSS design system
│   └── main.jsx           # App entrypoint
├── AI_USAGE_LOG.md        # AI collaboration log
├── index.html             # SEO tags & Font connections
├── routes.txt             # Route maps for grading screenshots
├── package.json           # React, Vite, Lucide-React, Canvas-Confetti
└── vite.config.js
```

---

## 🚀 How to Run and Test Locally

### 1. Prerequisite
Ensure you have **Node.js** (v18+) and **npm** installed.

### 2. Setup
Clone or navigate to the repository directory and install the packages:
```bash
npm install
```

### 3. Start Development Server
Run the local dev server:
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 4. Build for Production
Verify compilation and bundle size:
```bash
npm run build
```

### 🛠️ Reviewer Setup Recommendation
When testing:
1.  Open the browser developer tools (F12) and toggle device simulation to **Responsive (390px width)** or select an iPhone/Android viewport.
2.  Use the **JUDGE DEVTOOLS** toggle bar located just above the bottom menu to swap states and explore features instantly!
