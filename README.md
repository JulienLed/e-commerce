# E-Commerce Platform

Une plateforme e-commerce complète développée avec Next.js, incluant un système de panier avancé, gestion de stock, et paiements sécurisés.

## 🚀 Fonctionnalités

- Catalogue produits avec filtrage et recherche
- Système de panier avec gestion des quantités
- Authentification utilisateur (inscription/connexion)
- Gestion de stock en temps réel
- Processus de paiement sécurisé
- Interface d'administration (gestion produits, commandes)
- Design responsive

## 🛠️ Stack Technique

- **Frontend:** Next.js 14, React, TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentification:** Auth.js (NextAuth)
- **Déploiement:** Vercel/VPS

## 📦 Installation
```bash
# Cloner le repository
git clone [repo-url]

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local

# Lancer la base de données
npx prisma migrate dev

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 🌐 Demo
```
A venir
```

## 📸 Captures d'écran

```
A venir
```

## 🔧 Configuration

Créer un fichier `.env.local` avec :
```
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
```

## 📝 Développé par

Julien Ledent - [lepoteauduweb.be](https://lepoteauduweb.be)
