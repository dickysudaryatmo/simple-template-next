# Next.js Project

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Getting Started

##  Features

- Next.js 15 (App Router)
- Prisma ORM
- MySQL database
- UI Shadcn/ui For NextJS (clean & customizable)
- Auth NextAuth.js (Credentials)

### 📦 Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### ⚙️ Installation

1. Clone the repository
```bash
git clone https://github.com/dickysudaryatmo/simple-template-next.git
cd simple-template-next
```

2. Install dependencies
```bash
npm install
# or
yarn
# or
pnpm install
```

3. Set up environment variables Configure your database connection in .env:
```bash
cp .env.example .env
```

### 🗄 Database Setup
1. Create Database Manually

For PostgreSQL:
```bash
createdb dbname
psql -U user -d dbname -c "GRANT ALL PRIVILEGES ON DATABASE dbname TO user;"
```
For MySQL:
```bash
mysql -u root -p
CREATE DATABASE dbname;
GRANT ALL PRIVILEGES ON dbname.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
```
2. Prisma Setup
    Initialize Prisma (if not already set up):
```bash
npx prisma init
```
    Run database migrations:
```bash
npx prisma migrate dev --name init
# or for production:
# npx prisma migrate deploy
```
    Generate Prisma Client:
```bash
npx prisma generate
```

### Run development 

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Project Structure

```
├── app/                # App router (Next.js 15+)
│   ├── (auth)/         # Page for auth
│   ├── api/            # Route API
│   ├── components/     # Reusable components
│   ├── lib/            # Utilities
│   ├── dashboard/      # Page for dashboard
├── public/             # Static assets
├── .eslintrc.json   # ESLint config
├── next.config.js   # Next.js config
└── package.json     # Dependencies
```