const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://otmanmouhibcareer_db_user:sQgSRwH9Oc3yquCw@cluster01.cy2ug01.mongodb.net/leanmover?retryWrites=true&w=majority&appName=Cluster01&connectTimeoutMS=30000&socketTimeoutMS=30000';

// Blog Post Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  readTime: { type: String, required: true },
  imageUrl: { type: String },
  metaDescription: { type: String, required: true },
  keywords: [{ type: String }],
  publishedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  featured: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 }
}, {
  timestamps: true,
  collection: 'blog_articles'
});

// Solution Schema
const solutionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  industry: { type: String, required: true },
  shortDescription: { type: String, required: true },
  client: {
    name: { type: String },
    sector: { type: String, required: true },
    size: { type: String, enum: ['startup', 'sme', 'large'], required: true },
    location: { type: String }
  },
  challenge: { type: String, required: true },
  solution: { type: String, required: true },
  results: [{
    metric: { type: String, required: true },
    value: { type: String, required: true },
    description: { type: String, required: true }
  }],
  technologies: [{
    category: { type: String, enum: ['Hardware', 'Software', 'Process', 'Integration'], required: true },
    name: { type: String, required: true },
    description: { type: String }
  }],
  timeline: [{
    phase: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String }
  }],
  imageUrl: { type: String },
  gallery: [{ type: String }],
  metaDescription: { type: String, required: true },
  keywords: [{ type: String }],
  publishedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  status: { type: String, enum: ['draft', 'published', 'featured'], default: 'published' },
  featured: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
  downloadCount: { type: Number, default: 0 }
}, {
  timestamps: true,
  collection: 'solution_articles'
});

const BlogModel = mongoose.model('BlogPost', blogSchema);
const SolutionModel = mongoose.model('Solution', solutionSchema);

// Sample data
const sampleBlogPosts = [
  {
    title: "L'Industrie 4.0 : La Transformation Digitale au Maroc",
    slug: "industrie-4-0-transformation-maroc",
    excerpt: "Découvrez comment l'Industrie 4.0 révolutionne le secteur industriel marocain et les opportunités qu'elle offre aux entreprises.",
    content: "L'Industrie 4.0 représente la quatrième révolution industrielle, caractérisée par l'intégration des technologies numériques dans les processus de production. Au Maroc, cette transformation digitale prend une ampleur considérable...",
    author: "Équipe LEANMOVER",
    category: "Industrie 4.0",
    readTime: "8 min",
    metaDescription: "Guide complet sur l'Industrie 4.0 au Maroc : technologies, opportunités et transformation digitale des entreprises manufacturières.",
    keywords: ["Industrie 4.0", "Maroc", "Transformation digitale", "IoT", "Intelligence artificielle"],
    publishedAt: new Date('2024-03-15'),
    status: "published",
    featured: true
  },
  {
    title: "Optimisation de la Chaîne Logistique : Guide Complet",
    slug: "optimisation-chaine-logistique-guide",
    excerpt: "Stratégies éprouvées pour optimiser votre chaîne logistique et réduire vos coûts opérationnels de 20 à 30%.",
    content: "La logistique représente un enjeu majeur pour les entreprises modernes. Une chaîne logistique optimisée peut réduire les coûts opérationnels de 20 à 30% tout en améliorant la satisfaction client...",
    author: "Équipe LEANMOVER",
    category: "Logistique",
    readTime: "12 min",
    metaDescription: "Guide pratique pour optimiser votre chaîne logistique : réduction des coûts, amélioration des délais et technologies innovantes.",
    keywords: ["Logistique", "Optimisation", "Supply Chain", "Réduction des coûts", "Automatisation"],
    publishedAt: new Date('2024-03-10'),
    status: "published",
    featured: false
  },
  {
    title: "Lean Manufacturing : 5 Principes pour l'Excellence Opérationnelle",
    slug: "lean-manufacturing-principes-excellence",
    excerpt: "Maîtrisez les 5 principes fondamentaux du Lean Manufacturing pour éliminer le gaspillage et améliorer vos performances.",
    content: "Le Lean Manufacturing est une philosophie de gestion qui vise à éliminer tout ce qui n'apporte pas de valeur au client final. Cette approche, développée par Toyota, repose sur 5 principes fondamentaux...",
    author: "Équipe LEANMOVER",
    category: "Lean Manufacturing",
    readTime: "10 min",
    metaDescription: "Découvrez les 5 principes du Lean Manufacturing pour optimiser vos processus industriels et éliminer le gaspillage.",
    keywords: ["Lean Manufacturing", "Excellence opérationnelle", "Toyota", "Amélioration continue", "Kaizen"],
    publishedAt: new Date('2024-03-08'),
    status: "published",
    featured: true
  }
];

const sampleSolutions = [
  {
    title: "Automatisation d'une Ligne de Production Automobile",
    slug: "automatisation-ligne-production-automobile",
    industry: "Automobile",
    shortDescription: "Mise en place d'une ligne de production automatisée pour un constructeur automobile, augmentant la productivité de 40%.",
    client: {
      name: "Constructeur Automobile Leader",
      sector: "Manufacturing",
      size: "large",
      location: "Casablanca, Maroc"
    },
    challenge: "Le client faisait face à des goulots d'étranglement dans sa ligne de production, causant des retards et des coûts élevés.",
    solution: "Nous avons conçu et installé une solution d'automatisation complète intégrant des robots collaboratifs, un système de convoyage intelligent et un MES pour la traçabilité.",
    results: [
      {
        metric: "Productivité",
        value: "+40%",
        description: "Augmentation significative du rendement de la ligne"
      },
      {
        metric: "Défauts qualité",
        value: "-30%",
        description: "Réduction des erreurs grâce à l'automatisation"
      },
      {
        metric: "Retour sur investissement",
        value: "18 mois",
        description: "ROI atteint plus rapidement que prévu"
      }
    ],
    technologies: [
      {
        category: "Hardware",
        name: "Robots collaboratifs",
        description: "Robots KUKA pour assemblage"
      },
      {
        category: "Software",
        name: "MES",
        description: "Système de gestion de production"
      },
      {
        category: "Hardware",
        name: "Vision industrielle",
        description: "Contrôle qualité automatique"
      }
    ],
    timeline: [
      {
        phase: "Analyse & Conception",
        duration: "4-6 semaines",
        description: "Étude des besoins et conception de la solution"
      },
      {
        phase: "Implémentation",
        duration: "8-12 semaines",
        description: "Développement et déploiement de la solution"
      }
    ],
    metaDescription: "Découvrez notre projet d'automatisation d'une ligne de production automobile avec +40% de productivité et ROI en 18 mois.",
    keywords: ["Automatisation", "Automobile", "Robots collaboratifs", "MES", "Productivité"],
    publishedAt: new Date('2024-02-20'),
    status: "published",
    featured: true
  },
  {
    title: "Optimisation de la Chaîne Logistique Pharmaceutique",
    slug: "optimisation-chaine-logistique-pharmaceutique",
    industry: "Pharmaceutique",
    shortDescription: "Restructuration complète de la chaîne logistique d'un laboratoire pharmaceutique, réduisant les coûts de 25%.",
    client: {
      name: "Laboratoire Pharmaceutique International",
      sector: "Pharmaceutical",
      size: "large",
      location: "Rabat, Maroc"
    },
    challenge: "Chaîne logistique complexe avec de nombreux intermédiaires, stocks élevés et délais de livraison inadéquats.",
    solution: "Implémentation d'un WMS avancé, optimisation des flux et mise en place d'un système de traçabilité complète conforme aux normes pharmaceutiques.",
    results: [
      {
        metric: "Réduction des coûts",
        value: "-25%",
        description: "Optimisation des flux et réduction des stocks"
      },
      {
        metric: "Délais de livraison",
        value: "-40%",
        description: "Amélioration significative des délais"
      },
      {
        metric: "Conformité réglementaire",
        value: "100%",
        description: "Respect total des normes pharmaceutiques"
      },
      {
        metric: "Traçabilité",
        value: "100%",
        description: "Traçabilité complète des produits"
      }
    ],
    technologies: [
      {
        category: "Software",
        name: "WMS Pharmaceutique",
        description: "Warehouse Management System spécialisé"
      },
      {
        category: "Hardware",
        name: "RFID",
        description: "Traçabilité en temps réel"
      },
      {
        category: "Integration",
        name: "API ERP",
        description: "Intégration système d'information"
      }
    ],
    timeline: [
      {
        phase: "Audit & Analyse",
        duration: "3-4 semaines",
        description: "Audit de la chaîne logistique existante"
      },
      {
        phase: "Conception & Déploiement",
        duration: "10-14 semaines",
        description: "Mise en place de la nouvelle solution"
      }
    ],
    metaDescription: "Étude de cas : optimisation de la chaîne logistique pharmaceutique avec -25% de coûts et conformité réglementaire 100%.",
    keywords: ["Logistique pharmaceutique", "WMS", "Traçabilité", "Conformité", "Optimisation"],
    publishedAt: new Date('2024-02-15'),
    status: "published",
    featured: false
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await BlogModel.deleteMany({});
    await SolutionModel.deleteMany({});
    console.log('Cleared existing data');

    // Seed blog posts
    console.log('Seeding blog posts...');
    for (const post of sampleBlogPosts) {
      const newPost = new BlogModel(post);
      await newPost.save();
      console.log(`✓ Seeded blog post: ${post.title}`);
    }

    // Seed solutions
    console.log('Seeding solutions...');
    for (const solution of sampleSolutions) {
      const newSolution = new SolutionModel(solution);
      await newSolution.save();
      console.log(`✓ Seeded solution: ${solution.title}`);
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log(`📝 Seeded ${sampleBlogPosts.length} blog posts`);
    console.log(`🏭 Seeded ${sampleSolutions.length} solutions`);
    console.log('\nYou can now test the admin panel CRUD operations!');

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

seedDatabase();