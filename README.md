# Reazul Islam Reaz — Portfolio

Personal portfolio built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**.

**Live:** [reazul-islam-reaz.vercel.app](https://reazul-islam-reaz.vercel.app)

## Setup

```bash
npm install
cp .env.example .env.local
# Add EmailJS credentials (see .env.example)
npm run dev
```

### Environment variables

Contact form uses a **server API route** (`/api/contact`). Configure in `.env.local`:

```env
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
```

Legacy `NEXT_PUBLIC_EMAILJS_*` names are still supported as fallbacks.

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build         |
| `npm run start`| Start production server  |
| `npm run lint` | Run ESLint               |

## Project structure

- `src/app/` — App Router pages and API routes
- `src/components/sections/` — Homepage section components
- `src/config/site.ts` — Nav, contact, and social links (single source of truth)
- `src/app/projects/` — Project case studies and carousel

## Contact

- Email: reazul.dev@gmail.com
- GitHub: [github.com/reazulislamreaz](https://github.com/reazulislamreaz)
- LinkedIn: [linkedin.com/in/reazulislamreaz](https://www.linkedin.com/in/reazulislamreaz)
