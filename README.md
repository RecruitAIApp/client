# RecruitAI - Frontend Client 💻

This is the frontend single page web application for RecruitAI, built with React, Vite, and Tailwind CSS. It provides interfaces for Candidates, Recruiters, and Administrators to interact with the RecruitAI recruiting and screening platform.

---

## 🛠️ Stack & Technologies
- **Vite** for fast, optimized development builds.
- **React.js** (Functional Components, Hooks).
- **React Router Dom** for client-side routing.
- **Tailwind CSS** for premium styling, animations, and custom layouts.
- **Axios** for API requests to the backend server.
- **React Icons / Lucide React** for icons.
- **HTML5 Drag and Drop API** for the Kanban recruitment pipeline.

---

## 📂 Frontend Directory Structure
The frontend codebase follows a clean, component-driven architecture:

```
client/
├── public/              # Static assets (images, logos)
├── src/
│   ├── assets/          # Global style files and graphics
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Buttons, Inputs, Loaders, Modals
│   │   ├── layout/      # Navbar, Sidebar, Footer wrappers
│   │   └── jobs/        # Job cards, search filters
│   ├── context/         # Global state (AuthContext, ThemeContext)
│   ├── hooks/           # Custom React hooks (useAuth, useFetch)
│   ├── pages/           # High-level route pages
│   │   ├── auth/        # Login & Signup pages
│   │   ├── jobs/        # Find Jobs, Job Details, Post Job pages
│   │   ├── dashboard/   # Recruiter Dashboard & Candidate Applications
│   │   └── pipeline/    # Kanban Board Page (Drag & Drop candidates)
│   ├── services/        # API request functions (auth, jobs, applications)
│   ├── utils/           # Helper formatters (date, numbers)
│   ├── App.jsx          # Route declarations & global providers
│   └── main.jsx         # Application entry point
├── tailwind.config.js   # Tailwind style rules and design tokens
├── index.html           # Document template
└── package.json         # Package configuration
```

---

## ⚙️ Configuration & Environment
Create a `.env` file in the root of the `/client` directory:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The client app will open at `http://localhost:5173` (or the terminal provided address).*

3. **Build for production:**
   ```bash
   npm run build
   ```
   *Outputs optimized assets to the `dist/` directory.*

---

## 🎨 Main UI Views & Features

### 👤 Authentication Pages
- **Login / Signup:** Clear selector for Candidate vs Recruiter roles. Dynamic form states and error warnings.

### 💼 Candidate Features
- **Job Board:** Search bar with live autocomplete and sidebar filters (Location, Job Type, Salary range).
- **Application Flow:** Quick CV upload with resume copy validation before sending to AI smart screening.
- **My Applications Portal:** Status indicators showing progress (Applied, Shortlisted, Interview, Offer, Rejected) along with explanation feedback scores from the AI agent.

### 🏢 Recruiter & Employer Dashboard
- **Create Job Listing:** Form using rich text for descriptions, requirements, and metadata tags.
- **Applicant Pipeline (Kanban Board):** A drag-and-drop board allowing recruiters to drag applicants between columns (`Applied` ➔ `Shortlisted` ➔ `Interview Scheduled` ➔ `Offer Sent` ➔ `Hired` / `Rejected`). Modifying a stage triggers background tasks like updating Mongoose records and dispatching status emails.
- **Smart CV Profile Inspector:** Opens detailed candidate info showing the parsed CV, AI rating, and highlights (reasons for score, potential red flags).