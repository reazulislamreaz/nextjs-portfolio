# Reazul Islam Reaz — Portfolio

> **Backend-focused full-stack engineer** building scalable APIs, SaaS-style architectures, and production-ready web systems.

[![Live Portfolio](https://img.shields.io/badge/Live-reazul--islam--reaz.vercel.app-emerald?style=for-the-badge)](https://reazul-islam-reaz.vercel.app)
[![Location](https://img.shields.io/badge/Location-Dhaka%2C%20Bangladesh-zinc?style=for-the-badge)](https://reazul-islam-reaz.vercel.app/#contact)
[![Status](https://img.shields.io/badge/Status-Available%20for%20opportunities-22c55e?style=for-the-badge)]()

---

## Preview

![Portfolio homepage — hero, navigation, and tech stack](https://i.postimg.cc/02NHKgbP/Screenshot-from-2026-05-16-16-15-26.png)

**Live site:** [https://reazul-islam-reaz.vercel.app](https://reazul-islam-reaz.vercel.app)

---

## About

I am **Reazul Islam Reaz**, a software engineer based in **Dhaka, Bangladesh** (open to remote work). I specialize in **backend engineering** and ship end-to-end products when the surface needs a polished client.

My focus is disciplined API design, thoughtful persistence (relational and document stores), and operability — rate limits, payment safety, auth boundaries, and clear error contracts — not novelty for its own sake.

**What I bring to a team:**

- Modular services with explicit API boundaries  
- Schema design for PostgreSQL, MongoDB, and Redis-backed workloads  
- JWT/RBAC, Stripe webhooks, and idempotent payment flows  
- Real-time layers (Socket.IO, event-driven patterns) where latency matters  
- Next.js frontends that stay thin on business rules  
- Responsible use of AI tooling in development and product features (RAG, agents, API integration)

---

## Skills

### Core stack

| Area | Technologies |
|------|----------------|
| **Languages** | TypeScript, JavaScript, Go |
| **Backend** | Node.js, Express.js, NestJS |
| **Databases** | PostgreSQL, MySQL, MongoDB, Redis |
| **Frontend** | React, Next.js, Tailwind CSS |
| **APIs** | REST, GraphQL (where contracts matter) |

### Backend & architecture

- Service-oriented and modular API layouts  
- Relational modeling (Prisma, SQL) and document schemas (MongoDB, Mongoose)  
- Authentication & authorization (JWT, RBAC, multi-tenant guardrails)  
- Payments (Stripe) with server-side validation and webhook hardening  
- Real-time: Socket.IO, WebRTC signaling, event-style interfaces  
- Caching, indexing, and query paths tuned for real traffic  

### DevOps & cloud

- AWS (EC2, S3, IAM, Lambda basics, CloudWatch)  
- Docker, Nginx, reverse proxy & multi-container setups  
- CI/CD with GitHub Actions  
- Pragmatic deployment hygiene on Vercel, Netlify, and cloud targets  

### AI & intelligent systems

- RAG, embeddings, vector DB concepts, semantic search  
- LangChain, AI agents, and AI-assisted product features  
- Prompt engineering and context-aware backend workflows  
- AI development tools (Cursor, Claude, ChatGPT) used with review and tests — not as a substitute for engineering rigor  

---

## Featured projects

Each project in the portfolio includes **problem → architecture → challenges → solutions** case-study detail, live demos, and source links.

### [Confaero](https://confaero.com/) — Conference platform

Scalable event platform: QR check-ins, exhibitor lead capture, organizer tooling, and real-time attendee interactions.

- **Stack:** Node.js, Express, TypeScript, MongoDB, JWT, React, Socket.IO, WebRTC  
- **Highlights:** RBAC, burst check-in throughput, duplicate prevention, P2P + broadcast sync  
- **Code:** [Backend](https://github.com/reazulislamreaz/confaero-backend) · [Dashboard](https://github.com/reazulislamreaz/confaero-dashboard)

### [Replii](https://replii.ca/) — AI email SaaS

AI-powered inbox management, multi-mailbox sync, and guarded reply generation.

- **Stack:** NestJS, TypeScript, PostgreSQL, Prisma, IMAP/SMTP, AI integration  
- **Highlights:** Per-user mailbox isolation, provider-safe SMTP, bounded AI vs transport failures  
- **Code:** [Backend API](https://github.com/reazulislamreaz/twvinfast-server-full)

### [HavenKeys](https://haven-keys.web.app/) — Real-estate marketplace

MERN marketplace with role-based dashboards, listings, and Stripe premium placements.

- **Stack:** React, Node.js, Express, MongoDB, JWT, Stripe  
- **Highlights:** RBAC, payment-aligned listing state, server-side validation  
- **Code:** [Client](https://github.com/reazulislamreaz/haven-keys-client-side)

### [Marathon Zone](https://marathonzonebyreaz.netlify.app/) — Event operations

Organizer console and public registration with Firebase Auth and MongoDB.

- **Stack:** Node.js, Express, MongoDB, Firebase Auth, React  
- **Code:** [GitHub](https://github.com/reazulislamreaz/marathon-zone)

### [Green Circle](https://green-circle-by-reaz.netlify.app) — Subscription gardening service

Slot booking, admin metrics, and delivery integrity under concurrent bookings.

- **Stack:** Express, MongoDB, Mongoose, React, JWT  
- **Code:** [GitHub](https://github.com/reazulislamreaz/green-circle)

### [Event Hub](https://event-hub-by-reaz.netlify.app) — Event lifecycle tool

Host-managed events with custom JWT auth and server-enforced ownership checks.

- **Stack:** React, Express, MongoDB, JWT  
- **Code:** [GitHub](https://github.com/reazulislamreaz/event-hub-client)

---

## Education & learning

**Formal education**

- **Bachelor of Social Science (Honors), Political Science** — National University, Bangladesh *(in progress, expected 2026)*  
- Research, policy analysis, and structured communication that support specs, docs, and stakeholder alignment in engineering work.

**Professional training**

| Program | Focus |
|---------|--------|
| **Programming Hero — Next Level** | TypeScript full-stack, PostgreSQL/Prisma, Docker, AWS, AI engineering (RAG, LangChain, agents) |
| **Udemy — AWS Cloud Computing** | IAM, EC2, S3, VPC, Lambda, CloudWatch, CI/CD |
| **Udemy — Full Stack Web Development** | React, Next.js, Node.js, MongoDB, JWT, REST APIs |
| **AI & intelligent systems** | RAG, prompt engineering, AI API integration, vector retrieval |

---

## This repository (portfolio site)

Personal marketing site for the work above — built to be fast, accessible, and easy to maintain.

### Tech stack (site)

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)  
- **UI:** React 19, Tailwind CSS 4  
- **Contact:** Server API route (`/api/contact`) with EmailJS, rate limiting, and honeypot  
- **SEO:** Metadata, JSON-LD, sitemap, canonical section URLs  
- **Deploy:** [Vercel](https://vercel.com/)

### Project structure

```
src/
├── app/                    # Routes, API, layout
├── components/
│   ├── sections/           # Homepage sections (About, Skills, Projects, …)
│   └── home/               # Hero
├── config/site.ts          # Nav, contact, social (single source of truth)
└── app/projects/           # Project case studies & carousel
```

### Local development

```bash
git clone https://github.com/reazulislam1487/nextjs-portfolio.git
cd nextjs-portfolio
npm install
cp .env.example .env.local
```

Add contact email credentials to `.env.local`:

```env
GMAIL_USER=reazul.dev@gmail.com
GMAIL_APP_PASSWORD=your_16_char_google_app_password
CONTACT_TO_EMAIL=reazul.dev@gmail.com
```

Create the app password: Google Account → **Security** → **2-Step Verification** (on) → **App passwords** → create one named “Portfolio”.

Add the same variables on **Vercel** and redeploy.

```bash
npm run dev    # http://localhost:3000
npm run build  # production build
npm run lint   # ESLint
```

---

## Contact

| | |
|---|---|
| **Email** | [reazul.dev@gmail.com](mailto:reazul.dev@gmail.com) |
| **WhatsApp** | [+880 1770 807782](https://wa.me/8801770807782) |
| **GitHub** | [github.com/reazulislamreaz](https://github.com/reazulislamreaz) |
| **LinkedIn** | [linkedin.com/in/reazulislamreaz](https://www.linkedin.com/in/reazulislamreaz) |
| **Location** | Dhaka, Bangladesh — remote available |

---

## License

This portfolio source is for personal showcase. Project code lives in linked repositories under their respective licenses.

---

<p align="center">
  <sub>Built with Next.js · © Reazul Islam Reaz</sub>
</p>
