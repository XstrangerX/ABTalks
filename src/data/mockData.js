// ABTalks 60-Day Challenge Mock Database

export const TRACKS = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Master modern UI development, layouts, interactivity, animations, and state management.",
    icon: "Layout",
    color: "#6366F1" // Indigo
  },
  {
    id: "fullstack",
    title: "Full-Stack Web Dev",
    description: "Build complete end-to-end applications from database models to responsive client interfaces.",
    icon: "Database",
    color: "#10B981" // Emerald
  },
  {
    id: "ai",
    title: "AI App Engineering",
    description: "Integrate LLMs, neural networks, agents, vector databases, and prompt flows into user products.",
    icon: "Cpu",
    color: "#8B5CF6" // Violet
  },
  {
    id: "backend",
    title: "Backend System Design",
    description: "Design highly-scalable architectures, caching layers, microservices, databases, and APIs.",
    icon: "Server",
    color: "#F59E0B" // Amber
  }
];

// Generates challenge details for 60 days
const generateChallenges = () => {
  const challenges = [];
  
  // Specific interesting challenges for Days 1, 12, 13, and 60
  const specialDays = {
    1: {
      title: "The Pledge & Portfolio Setup",
      description: "Welcome to the challenge! Today is about setting up your workstation, committing to your track, and deploying your personal learning space. You will create a basic developer landing page which will host links to all your future submissions.",
      difficulty: "Easy",
      xp: 100,
      tasks: [
        "Create a github repository named 'abtalks-60-days-challenge'",
        "Set up a basic HTML layout with a bio, selected track banner, and a table of 60 days",
        "Deploy the static page to Vercel, Netlify, or GitHub Pages",
        "Draft a LinkedIn post announcing your participation with the hashtag #ABTalks60DaysOfCode"
      ],
      resources: [
        { name: "Git and GitHub Starter Crash Course", url: "https://github.com" },
        { name: "CSS Flexbox/Grid Quick Reference Guide", url: "https://css-tricks.com" }
      ],
      starterTemplate: `<!DOCTYPE html>
<html>
<head>
  <title>My 60-Day Challenge Log</title>
</head>
<body>
  <h1>Day 1: Committing to the Track!</h1>
  <p>Follow my journey over the next 60 days...</p>
</body>
</html>`
    },
    12: {
      title: "Build a Custom Notification System",
      description: "Interactivity is key in modern UX. Today, you are tasked with building a client-side Toast Notification engine from scratch. It should support notifications of different types (Success, Warning, Error, Info), slide-in animations, auto-dismiss, and stacking capabilities.",
      difficulty: "Medium",
      xp: 150,
      tasks: [
        "Create a NotificationManager class or utility in JavaScript",
        "Design 4 notification types with custom icons (Success: Green, Error: Red, Warning: Orange, Info: Blue)",
        "Implement stacking so notifications slide up smoothly when new ones appear",
        "Add a progress-bar countdown timer to each toast showing when it will auto-dismiss",
        "Make it fully mobile-responsive (390px toast placement at the top or bottom of screen)"
      ],
      resources: [
        { name: "DOM Manipulation & Dynamic Nodes", url: "https://javascript.info" },
        { name: "CSS Transitions and Stacking Contexts", url: "https://mdn.mozilla.org" }
      ],
      starterTemplate: `// Toast Notification System
class Toast {
  constructor(message, type = 'info') {
    this.message = message;
    this.type = type;
    this.show();
  }
  // Implement the layout and slide-in logic here...
}`
    },
    13: {
      title: "Build a Theme Engine with CSS Custom Properties",
      description: "Design systems are critical for scaling products. Today, create a theme-switching system. You will construct a dark mode, light mode, and a custom warm amber 'Midnight Reading Mode' palette, toggling them seamlessly with custom variables.",
      difficulty: "Medium",
      xp: 150,
      tasks: [
        "Create variables for backgrounds, cards, typography, and accent colors",
        "Implement a toggle element that rotates themes and stores preference in LocalStorage",
        "Apply smooth transitions on colors (`transition: background 0.3s, color 0.3s`)",
        "Design a custom widget showing visual palettes of each theme"
      ],
      resources: [
        { name: "CSS Custom Variables Guide", url: "https://css-tricks.com" },
        { name: "Local Storage API MDN", url: "https://mdn.mozilla.org" }
      ],
      starterTemplate: `:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
}
[data-theme="dark"] {
  --bg-primary: #0b0f19;
  --text-primary: #ffffff;
}`
    },
    60: {
      title: "The Grand Finale: Multi-Player Capstone Showdown",
      description: "You have arrived! Today, you consolidate all your learnings into a real-time web application of your choice, integrated with mock API calls, polished micro-animations, and complete documentation. Share your certificate and showcase your consistency!",
      difficulty: "Hard",
      xp: 300,
      tasks: [
        "Assemble components from past challenges into a unified dashboard",
        "Integrate at least one third-party mock API (weather, quote-of-the-day, github API)",
        "Optimize performance and verify mobile-first accessibility",
        "Generate your ABTalks Challenge Graduation Certificate",
        "Write a summary LinkedIn post detailing your 60-day consistency transformation"
      ],
      resources: [
        { name: "Web Application Performance Checklist", url: "https://web.dev" },
        { name: "How to Build a Portfolio that Recruiter Love", url: "https://linkedin.com" }
      ],
      starterTemplate: `// Congratulations!
// You completed the 60-day challenge.
console.log("Streak Legend unlocked.");`
    }
  };

  const genericTitles = [
    "Design a Responsive Flexbox Nav Bar",
    "Develop a Client-Side Password Strength Meter",
    "Create a Dynamic Pomodoro Focus Clock",
    "Implement LocalStorage Todo List",
    "Build a Vanilla JS Modal Dialog Component",
    "Create a Dynamic Accordion and FAQs Layout",
    "Develop a Multi-Step Sign-Up Form Wizard",
    "Design a Dynamic Dark/Light Theme Switcher",
    "Create an Interactive Expense Chart Dashboard",
    "Build an Image Carousel with Swipe Gestures",
    "Implement an Infinite Scroll List with Mock Data",
    "Develop a Customizable Counter and Interval App",
    "Design a Premium Pricing Page Layout",
    "Create a Kanban Board with Drag and Drop Mockup",
    "Build a Recipe Finder App with API Call Mocking",
    "Create a Real-Time Text Word and Char Counter",
    "Implement a Custom HTML5 Video Player Controller",
    "Design an Interactive Card Matching Game",
    "Build a Quiz Application with Score History",
    "Create a Beautiful Weather Dashboard View",
    "Develop a Keyboard Short-Cut Navigation System",
    "Build a Drawing Board Canvas Widget",
    "Develop an Interactive Audio Player UI",
    "Create a Dynamic Star Rating Feedback Component"
  ];

  for (let i = 1; i <= 60; i++) {
    if (specialDays[i]) {
      challenges.push({
        day: i,
        ...specialDays[i]
      });
    } else {
      const titleIndex = (i - 1) % genericTitles.length;
      const baseTitle = genericTitles[titleIndex];
      const diff = i < 15 ? "Easy" : i < 45 ? "Medium" : "Hard";
      const xp = diff === "Easy" ? 100 : diff === "Medium" ? 150 : 200;
      
      challenges.push({
        day: i,
        title: `${baseTitle} (Day ${i})`,
        description: `This is Day ${i} of your challenge. Today, you will build a responsive and highly-usable ${baseTitle.toLowerCase()}. Focus on modular CSS, clean event handlers, and polished visual styles. Ensure the interface handles edge cases and works beautifully on mobile viewports.`,
        difficulty: diff,
        xp: xp,
        tasks: [
          `Setup static HTML skeleton for the ${baseTitle.toLowerCase()}`,
          `Implement vanilla CSS styling (custom animations and theme support)`,
          `Write JavaScript script to handle user interaction and responsiveness`,
          `Upload your code to GitHub and commit changes`,
          `Write a short post on LinkedIn explaining your design decisions`
        ],
        resources: [
          { name: "Frontend Design Patterns Guide", url: "https://refactoringui.com" },
          { name: "Developer Documentation Hub", url: "https://developer.mozilla.org" }
        ],
        starterTemplate: `// Day ${i}: ${baseTitle}\n// Add your setup and start coding!\n`
      });
    }
  }

  return challenges;
};

export const CHALLENGES = generateChallenges();

// Mock initial configurations for each judge test state
export const USER_STATES = {
  NEW: {
    stateId: "NEW",
    stateName: "New Student (Day 1)",
    name: "", // blank initially to trigger name onboarding
    selectedTrack: null,
    currentDay: 1,
    streak: 0,
    freezesAvailable: 0,
    completedDays: [],
    badgeCount: 0,
    rank: "Novice",
    rankProgress: 0,
    streakHistory: [], // empty history
    submissionHistory: {} // key is day number: { github: '', linkedin: '', timestamp: '' }
  },
  
  ACTIVE: {
    stateId: "ACTIVE",
    stateName: "Active Student (Day 12)",
    name: "Aarav Mehta",
    selectedTrack: "fullstack",
    currentDay: 12,
    streak: 11,
    freezesAvailable: 2,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    badgeCount: 3,
    rank: "Rising Star",
    rankProgress: 35,
    // History contains completions for days 1-11
    streakHistory: [
      { day: 1, status: "completed" },
      { day: 2, status: "completed" },
      { day: 3, status: "completed" },
      { day: 4, status: "completed" },
      { day: 5, status: "completed" },
      { day: 6, status: "completed" },
      { day: 7, status: "completed" },
      { day: 8, status: "completed" },
      { day: 9, status: "completed" },
      { day: 10, status: "completed" },
      { day: 11, status: "completed" }
    ],
    submissionHistory: {
      1: { github: "https://github.com/aarav/abtalks-challenge/commit/1a2b3c", linkedin: "https://linkedin.com/posts/aarav-mehta-day1", timestamp: "8/1/2026, 11:20 PM" },
      2: { github: "https://github.com/aarav/abtalks-challenge/commit/2b3c4d", linkedin: "https://linkedin.com/posts/aarav-mehta-day2", timestamp: "8/2/2026, 10:45 PM" },
      3: { github: "https://github.com/aarav/abtalks-challenge/commit/3c4d5e", linkedin: "https://linkedin.com/posts/aarav-mehta-day3", timestamp: "8/3/2026, 11:10 PM" },
      4: { github: "https://github.com/aarav/abtalks-challenge/commit/4d5e6f", linkedin: "https://linkedin.com/posts/aarav-mehta-day4", timestamp: "8/4/2026, 11:50 PM" },
      5: { github: "https://github.com/aarav/abtalks-challenge/commit/5e6f7a", linkedin: "https://linkedin.com/posts/aarav-mehta-day5", timestamp: "8/5/2026, 9:30 PM" },
      6: { github: "https://github.com/aarav/abtalks-challenge/commit/6f7a8b", linkedin: "https://linkedin.com/posts/aarav-mehta-day6", timestamp: "8/6/2026, 10:15 PM" },
      7: { github: "https://github.com/aarav/abtalks-challenge/commit/7a8b9c", linkedin: "https://linkedin.com/posts/aarav-mehta-day7", timestamp: "8/7/2026, 11:58 PM" },
      8: { github: "https://github.com/aarav/abtalks-challenge/commit/8b9c0d", linkedin: "https://linkedin.com/posts/aarav-mehta-day8", timestamp: "8/8/2026, 11:05 PM" },
      9: { github: "https://github.com/aarav/abtalks-challenge/commit/9c0d1e", linkedin: "https://linkedin.com/posts/aarav-mehta-day9", timestamp: "8/9/2026, 10:30 PM" },
      10: { github: "https://github.com/aarav/abtalks-challenge/commit/0d1e2f", linkedin: "https://linkedin.com/posts/aarav-mehta-day10", timestamp: "8/10/2026, 11:40 PM" },
      11: { github: "https://github.com/aarav/abtalks-challenge/commit/1e2f3g", linkedin: "https://linkedin.com/posts/aarav-mehta-day11", timestamp: "8/11/2026, 11:15 PM" }
    }
  },
  
  MISSED: {
    stateId: "MISSED",
    stateName: "Missed Day (Day 13)",
    name: "Aarav Mehta",
    selectedTrack: "fullstack",
    currentDay: 13,
    streak: 0, // Streak is broken!
    freezesAvailable: 1, // Has 1 freeze they can use to save it
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // Missed day 12!
    badgeCount: 3,
    rank: "Rising Star",
    rankProgress: 35,
    streakHistory: [
      { day: 1, status: "completed" },
      { day: 2, status: "completed" },
      { day: 3, status: "completed" },
      { day: 4, status: "completed" },
      { day: 5, status: "completed" },
      { day: 6, status: "completed" },
      { day: 7, status: "completed" },
      { day: 8, status: "completed" },
      { day: 9, status: "completed" },
      { day: 10, status: "completed" },
      { day: 11, status: "completed" },
      { day: 12, status: "missed" } // Missed Day 12
    ],
    submissionHistory: {
      1: { github: "...", linkedin: "...", timestamp: "..." },
      2: { github: "...", linkedin: "...", timestamp: "..." },
      3: { github: "...", linkedin: "...", timestamp: "..." },
      4: { github: "...", linkedin: "...", timestamp: "..." },
      5: { github: "...", linkedin: "...", timestamp: "..." },
      6: { github: "...", linkedin: "...", timestamp: "..." },
      7: { github: "...", linkedin: "...", timestamp: "..." },
      8: { github: "...", linkedin: "...", timestamp: "..." },
      9: { github: "...", linkedin: "...", timestamp: "..." },
      10: { github: "...", linkedin: "...", timestamp: "..." },
      11: { github: "...", linkedin: "...", timestamp: "..." }
      // 12 is missing submission!
    }
  },
  
  COMPLETED: {
    stateId: "COMPLETED",
    stateName: "Challenge Graduated (Day 60)",
    name: "Aarav Mehta",
    selectedTrack: "fullstack",
    currentDay: 60,
    streak: 60,
    freezesAvailable: 3,
    completedDays: Array.from({ length: 60 }, (_, i) => i + 1), // Completed all 60!
    badgeCount: 8,
    rank: "Streak Legend",
    rankProgress: 100,
    streakHistory: Array.from({ length: 60 }, (_, i) => ({ day: i + 1, status: "completed" })),
    submissionHistory: Array.from({ length: 60 }, (_, i) => i + 1).reduce((acc, val) => {
      acc[val] = {
        github: `https://github.com/aarav/abtalks-challenge/commit/c${val}c`,
        linkedin: `https://linkedin.com/posts/aarav-mehta-day${val}`,
        timestamp: "11:30 PM"
      };
      return acc;
    }, {})
  }
};
