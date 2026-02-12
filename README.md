<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🚀 StockTop - Smart Stock Analytics Platform

Complete AI-powered stock analytics platform that helps investors make smarter decisions through comprehensive stock analysis and recommendations.

## 🏗️ Architecture

- **Backend:** NestJS 10, TypeScript, PostgreSQL (Prisma), Redis
- **Frontend:** Next.js 14 (App Router), Tailwind CSS, Shadcn UI
- **DevOps:** Docker, Docker Compose

## 🚀 Getting Started

### Prerequisites

- Node.js (v20+)
- Docker & Docker Compose

### Local Development

1. **Backend:**
   ```bash
   cd backend
   npm install
   npx prisma generate
   npm run start:dev
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Running with Docker

```bash
docker-compose up --build
```

## 📊 Scoring Algorithm

Total Score (100) = Technical (30) + Fundamental (40) + Growth (20) + Risk (10)

Rating Classification:
- Score >= 80 → STRONG_BUY
- Score >= 65 → BUY
- Score >= 50 → HOLD
- Score < 50 → AVOID

## 🔑 API Keys

The platform uses Alpha Vantage and Financial Modeling Prep (FMP) for data.
