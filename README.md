# Smoke - Plateforme E-Commerce

Plateforme e-commerce complète développée avec Next.js 15, intégrant authentification multi-provider, paiements Stripe, et dashboard administrateur avancé.

## 🚀 Fonctionnalités

**Côté Client :**
- Catalogue produits avec recherche en temps réel et filtrage par catégorie
- Système de panier persistant (utilisateurs connectés et invités)
- Paiement sécurisé via Stripe avec confirmation email automatique
- Autocomplétion d'adresse (Google Places API)
- Gestion de profil et réinitialisation de mot de passe sécurisée
- Design responsive

**Authentification :**
- Multi-provider : Google OAuth + Email/Mot de passe
- Système de rôles (User/Admin) avec protection des routes
- Rate limiting (3 tentatives/15 min)
- Sessions JWT avec Auth.js

**Dashboard Admin :**
- CRUD complet (produits, catégories, commandes)
- Statistiques en temps réel (CA, utilisateurs, commandes)
- Gestion du stock et modification des statuts de commande
- Système de tri et recherche avancée

## 🛠️ Stack Technique

- **Frontend:** Next.js 15, React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API Routes, Server Actions
- **Database:** PostgreSQL (VPS privé), Prisma 6
- **Authentification:** Auth.js (NextAuth) avec JWT
- **Paiements:** Stripe (webhooks)
- **Emails:** Resend + React Email
- **Sécurité:** bcrypt, Zod, rate limiting, CSRF protection

## 📦 Installation

```bash
# Cloner et installer
git clone [repo-url]
npm install

# Configuration
cp .env.example .env.local
# Éditer .env.local

# Base de données
npx prisma generate
npx prisma db push

# Développement
npm run dev

🔧 Variables d'environnement
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Auth.js
AUTH_SECRET="..."
AUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Resend
RESEND_API_KEY="re_..."

🧪 Développement avec Stripe
stripe listen --forward-to localhost:3000/api/webhooks/stripe

📝 Développé par
Julien Ledent - Full-Stack Developer
lepoteauduweb.be