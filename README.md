# Sprint Dashboard

## Project Overview
Sprint Dashboard is a productivity web app built with **Next.js, Tailwind CSS, TypeScript, Zustand, and OpenAI**.  
It helps you manage tasks, filter by status, and gain AI‑powered insights into your day.  

Key features:
- Task management with filters (`To‑Do`, `In‑Progress`, `Done`)
- Search task by title
- AI analysis of your daily tasks via OpenAI API
- Accessible, responsive UI with sticky header and styled footer
- Deployed seamlessly on Vercel

---

## Setup Guide

### 1. Clone the repository
```bash
git clone https://github.com/BellaZubby/todo-frontend-app.git
cd todo-frontend-app
```

### 2. Install dependencies
```bash
npm install
```

---

### 3. Configure environment variables
Create a `.env.local` file in the project root and add:
```env
OPENAI_API_KEY=sk-xxxxxx
```
---

### 4. Run locally
```bash
npm run dev
```

### 5. Deploy
- Push your repo to GitHub.
- Connect the repo to [Vercel](https://vercel.com).
- Configure environemnt variable on vercel and deploy.
- Verify `/api/analyze` returns results in production.

---

## Technologies Used
- Next.js 16 — React framework with App Router
- TypeScript — Strong typing for safety
- Tailwind CSS — Utility‑first styling
- Zustand — Lightweight state management
- OpenAI API — AI‑powered task analysis
- Vercel — Hosting and deployment

---

## Demo
- [Hosted Demo](https://todo-frontend-app-green.vercel.app/)

---

## Repository
- [GitHub Repo](https://github.com/BellaZubby/todo-frontend-app)


