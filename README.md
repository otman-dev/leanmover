# Leanmover - Solutions Industrielles 4.0

Site web officiel de Leanmover, votre partenaire pour la transformation digitale industrielle et les solutions d'intralogistique 4.0 au Maroc.

## 🚀 Technologies

- **Next.js 14** - App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Iconography

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn

## 🛠️ Installation et Démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
leanmover/
├── app/
│   ├── layout.tsx          # Layout principal avec metadata
│   ├── page.tsx            # Page d'accueil
│   └── globals.css         # Styles globaux
├── components/
│   ├── Header.tsx          # Navigation principale
│   ├── Hero.tsx            # Section hero avec CTA
│   ├── Metrics.tsx         # Compteurs animés
│   ├── Services.tsx        # Présentation des services
│   ├── VideoSection.tsx    # Section vidéo présentation
│   ├── Certifications.tsx  # Affichage des certifications
│   └── Footer.tsx          # Pied de page avec contact
└── public/                 # Assets statiques
```

## 🎨 Charte Graphique

- **Couleur principale**: Bleu (#2563eb - blue-600)
- **Couleur secondaire**: Blanc (#ffffff)
- **Police**: Inter (Google Fonts)
- **Style**: Moderne, professionnel, industriel

## 📝 Sections du Site

1. **Hero** - Introduction avec 3 propositions de valeur
2. **Metrics** - Compteurs animés (80+ Awards, 80k Clients)
3. **Services** - 6 services principaux avec cartes interactives
4. **VideoSection** - Présentation vidéo de l'entreprise
5. **Certifications** - Affichage des certifications (ISO, Industrie 4.0)
6. **Footer** - Contact, liens rapides, réseaux sociaux

## 🔧 Personnalisation

### Logo
Ajoutez votre logo dans le dossier `/public` et mettez à jour dans Header.tsx

### Vidéo
Mettez à jour l'URL de la vidéo dans VideoSection.tsx (ligne 72)

### Contact
Modifiez les informations de contact dans Footer.tsx

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Déploiement

### Build de production
```bash
npm run build
npm run start
```

### Vercel (Recommandé)
```bash
vercel deploy
```

## 📧 Contact

- **Site web**: [leanmover.ma](https://leanmover.ma)
- **Email**: contact@leanmover.ma
- **Localisation**: Casablanca, Maroc

## 📄 License

© 2024 Leanmover. Tous droits réservés.
