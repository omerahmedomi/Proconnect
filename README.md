# Proconnect

A networking web application that helps professionals connect, share ideas, discover opportunities, and collaborate. Built with Next.js and TypeScript, Proconnect focuses on real-time interactions, media uploads, and email notifications to enable modern professional networking experiences.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Environment variables](#environment-variables)
  - [Run](#run)
- [Available scripts](#available-scripts)
- [Database & Third-party services](#database--third-party-services)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Roadmap / TODOs](#roadmap--todos)
- [License](#license)

---

## Features

- User authentication and profile management
- Create, edit, and discover posts, ideas, and opportunities
- Real-time messaging and notifications (Pusher)
- File and media uploads with optional Pinata (IPFS) integration
- Email notifications using Nodemailer
- Rich UI components: emoji picker, loaders, icons, and date utilities

## Tech stack

- Framework: Next.js (TypeScript)
- UI: React, Tailwind CSS
- Database: MongoDB (mongoose)
- Real-time: Pusher
- File storage (optional): Pinata (IPFS)
- Email: Nodemailer
- Utilities: axios, date-fns, sonner, lucide-react

## Getting started

### Prerequisites

- Node.js 18+ (or the version supported by your environment)
- npm, pnpm, or yarn
- MongoDB (local or Atlas) if you want to run the app locally with persistence

### Install

Clone the repository and install dependencies:

```bash
git clone https://github.com/omerahmedomi/Proconnect.git
cd Proconnect
npm install
```

### Environment variables

Create a `.env` or `.env.local` in the project root and add the variables your environment needs. Example variables commonly used by this codebase:

```
# MongoDB
MONGODB_URI=

# Pusher (real-time)
PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=
NEXT_PUBLIC_PUSHER_KEY=
NEXT_PUBLIC_PUSHER_CLUSTER=

# Pinata (optional - IPFS uploads)
PINATA_API_KEY=
PINATA_API_SECRET=

# Email (Nodemailer)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# App
NEXTAUTH_URL=
NEXT_PUBLIC_BASE_URL=
```

Only include variables that the running code expects. If you discover additional env keys while exploring the code, add them to `.env.local`.

### Run

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

## Available scripts

From package.json:

- npm run dev — Run development server (Next.js)
- npm run build — Build for production
- npm run start — Start the production server
- npm run lint — Run ESLint

## Database & Third-party services

- MongoDB: Provide a connection string via MONGODB_URI. For local development, run a local MongoDB instance or use MongoDB Atlas.
- Pusher: Configure Pusher credentials to enable real-time features.
- Pinata: Configure Pinata API keys if the app uploads files to IPFS.
- Nodemailer/SMTP: Configure SMTP credentials to enable email sending.

## Deployment

This Next.js app can be deployed to Vercel, Render, or any Node.js hosting provider. For Vercel:

1. Import the repository in Vercel
2. Set environment variables in the Vercel project settings
3. Deploy

If you deploy elsewhere, build with `npm run build` and start with `npm run start`.

## Contributing

Contributions are welcome.

- Open an issue to discuss major changes.
- Fork the repo and create a branch per feature or fix.
- Submit clear pull requests with descriptions and, when possible, tests or manual test instructions.

## Roadmap / TODOs

- Add screenshots and a demo/gif to the README for better onboarding
- Provide a `.env.example` with the minimal required variables
- Add tests and CI workflows
- Add a public-facing roadmap or project board
- Add a license file if this repo is intended to be open-source

## License

If you plan to open-source this repository, add a LICENSE file (for example, MIT). If this project is private, keep the current private settings in package.json.

---

If you'd like, I can:

- Add a `.env.example` file with the variables above
- Insert badges (build, license, deploy)
- Include a short demo section with screenshots or a GIF (if you provide them)

