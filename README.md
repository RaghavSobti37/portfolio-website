# Portfolio Website

A modern, animated portfolio website built with React, TypeScript, and Tailwind CSS featuring a cinematic design aesthetic.

## 🛠️ Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **UI Components:** Radix UI + shadcn/ui

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher) or [Bun](https://bun.sh/)

## 🚀 Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using Bun:
```bash
bun install
```

### 3. Start Development Server

Using npm:
```bash
npm run dev
```

Or using Bun:
```bash
bun run dev
```

The application will be available at `http://localhost:8080`

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🌐 Deploying to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Push to GitHub
Ensure your code is pushed to a GitHub repository.

#### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **"Add New..."** → **"Project"**
3. Select your repository from the list
4. Click **"Import"**

#### Step 3: Configure Build Settings
Vercel should auto-detect the settings, but verify:

| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

#### Step 4: Deploy
1. Click **"Deploy"**
2. Wait for the build to complete (typically 1-2 minutes)
3. Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy

From your project root directory:

```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N** (for first deploy)
- Project name? Enter a name or press Enter for default
- Directory with code? **./** (press Enter)
- Override settings? **N**

#### Step 4: Deploy to Production

```bash
vercel --prod
```

## ⚙️ Environment Variables (If Needed)

If your project uses environment variables, add them in Vercel:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add your variables (e.g., `VITE_API_KEY`)
4. Redeploy for changes to take effect

**Note:** Vite requires environment variables to be prefixed with `VITE_` to be exposed to the client.

## 🔧 Custom Domain Setup

1. In Vercel Dashboard, go to your project
2. Navigate to **Settings** → **Domains**
3. Add your custom domain
4. Update your DNS records as instructed by Vercel
5. SSL certificate is automatically provisioned

## 📁 Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   └── ui/          # shadcn/ui components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   ├── App.tsx          # Main app component
│   ├── index.css        # Global styles & design tokens
│   └── main.tsx         # Entry point
├── index.html           # HTML template
├── tailwind.config.ts   # Tailwind configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies & scripts
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
