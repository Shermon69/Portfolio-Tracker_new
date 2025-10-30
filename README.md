# Portfolio Tracker

A modern, feature-rich investment portfolio management application built with **React** and **Supabase**. Track investments across multiple brokers, analyze performance, and make informed financial decisions — all in one secure, intuitive platform.

---

## Features

- **Multi-Broker Support**  
  Import transaction data from 180 Markets, HSBC, Sharesight, and more via CSV.

- **Portfolio Analysis**  
  Visualize allocation by asset class, sector, country, and currency with interactive pie charts.

- **Advanced Analytics**  
  Monitor portfolio growth, ROI, capital gains, and dividends with dynamic line, bar, and area charts.

- **Tax & Compliance Reporting**  
  Generate reports for sold securities, taxable income, and future dividends.

- **Goal Setting & Tracking**  
  Set financial goals and monitor progress with contribution limits and visual indicators.

- **Modern UI/UX**  
  - Fully responsive design with **Material-UI**  
  - **Light/Dark theme** toggle  
  - Redesigned **Landing Page** with modern cards and improved navigation  
  - **Support Page** (About + Contact Form)  
  - **FAQ Page** with searchable FAQs and curated educational articles

- **Secure by Design**  
  - Supabase Authentication (email/password)  
  - Row-Level Security (RLS)  
  - Data encryption in transit and at rest  
  - Environment variable protection

---

## Tech Stack

| Layer         | Technology                                  |
|---------------|---------------------------------------------|
| **Frontend**  | React, Vite, Material-UI, Recharts          |
| **Backend**   | Supabase (Auth, PostgreSQL, Storage, RLS)   |
| **Deployment**| Docker, Static Hosting (Vercel/Netlify)     |
| **Tools**     | EmailJS (Contact Form), DayJS, XLSX, PapaParse |

---

## Quick Start (Development)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/portfolio-tracker.git
cd portfolio-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_SUPABASE_PROJECT_ID=your_project_id

# For Contact Form (Support Page)
REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Docker Deployment (Production)

### Prerequisites: Install Docker on Ubuntu 20.04

Run this one-liner:

```bash
sudo apt update && sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release && \
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && \
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" && \
sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io && \
sudo systemctl enable docker && sudo systemctl start docker && sudo docker --version
```

### Step 1 – Build the Docker Image

```bash
docker build -t portfoliotracker .
```

### Step 2 – Run the Container

```bash
docker run -d \
  --name portfolio-app \
  --restart unless-stopped \
  -p 4173:4173 \
  -e NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY \
  portfoliotracker
```

> Replace environment variables or use a `.env` file with `--env-file`.

### Access the App

```bash
http://[YOUR_SERVER_IP]:4173
```

---

## Useful Docker Commands

| Command                     | Description                          |
|----------------------------|--------------------------------------|
| `docker ps`                | List running containers              |
| `docker logs -f portfolio-app` | View live logs                   |
| `docker stop portfolio-app`| Stop the container                   |
| `docker start portfolio-app`| Start the container                 |
| `docker rm portfolio-app`  | Remove the container                 |

---

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## Documentation

- **[Solution Design Overview](./docs/SOLUTION_DESIGN.md)**  
- **[User Manual](./docs/USER_MANUAL.md)**  

---

## Security

- **Authentication**: Supabase Auth with email/password
- **Authorization**: Row-Level Security (RLS) ensures users only access their own data
- **Encryption**: All data encrypted in transit (HTTPS) and at rest
- **Secrets**: Environment variables never hardcoded

---

## Roadmap

- Real-time market data integration
- Direct broker API connections
- Advanced analytics (Sharpe ratio, volatility, etc.)
- Mobile app (iOS & Android)
- Automated portfolio rebalancing
- Multi-currency cost basis tracking

---

## Support

- **Email**: [support@portfoliotracker.com](mailto:support@portfoliotracker.com)
- **In-App**: Visit the **Support Page** (public) or **FAQ Page** (after login)
- **GitHub Issues**: Report bugs or request features

---

**Start tracking your portfolio smarter — today.**  
*Portfolio Tracker Team*  
*Updated: 30/10/2025*