This API has been deployed on

```bash
https://web-seller.iqbal-fakhriza.online
```

# Next.js Project Installation Guide

This guide provides step-by-step instructions to install and run a Next.js project using Node.js and npm/yarn.

---

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js) or **Yarn**

---

## Installation Steps

### 1. Clone the Next.js Project

1. Clone the project
   ```bash
   cd C:\your-projects-folder
   git clone https://github.com/your-repo-name/nextjs-project.git
   cd nextjs-project
   ```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

1. Create an .env.local file in the project root

```bash
touch .env.local
```

2. Add environment-specific variables to the .env.local file

```bash
NEXT_PUBLIC_APPLICATION_NAME="Web Seller"
NEXT_PUBLIC_BASE_URL=https://apiweb-seller.iqbal-fakhriza.online/api
```

3. Generate Secret

```bash
npx auth secret
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Build for Production (Optional)

```bash
npm run build
npm run start
```
