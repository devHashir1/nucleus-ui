# nucleusUI 

A portfolio-style showcase for **nucleusUI** — an open-source collection of polished, playful UI components built on top of [shadcn/ui](https://ui.shadcn.com).

🔗 **Repository:** [github.com/devHashir1/nucleus-ui](https://github.com/devHashir1/nucleus-ui)

## Tech stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** + **shadcn/ui** (Base UI primitives)
- **next-themes** for dark/light mode
- **framer-motion** for subtle card motion
- **react-hook-form + zod** for the form example

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Project structure

```
app/                    # App Router pages
  page.tsx              # Homepage (hero + registry-driven grid)
  components/[slug]/    # Component detail pages
components/
  ui/                   # Raw shadcn primitives (installed via CLI)
  nucleus/              # Branded wrappers (NucleusButton, NucleusInput, …)
lib/
  registry.tsx          # Component metadata — drives the homepage grid
```

## Adding a component

1. Add the shadcn primitive: `npx shadcn@latest add <component>`
2. Create a branded wrapper in `components/nucleus/` (prefix: `Nucleus*`)
3. Register it in `lib/registry.tsx` — the homepage grid and `/components/[slug]` page are generated from this array, so nothing is hardcoded.

## Scripts

| Command         | Description            |
| --------------- | ---------------------- |
| `npm run dev`   | Start dev server       |
| `npm run build` | Production build       |
| `npm run start` | Serve production build |
| `npm run lint`  | Run ESLint             |

## Deploying

Deployable to [Vercel](https://vercel.com) out of the box — import the repo and click deploy. No environment variables required.

## License

MIT
