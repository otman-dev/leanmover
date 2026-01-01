export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  industry?: string;                    // Optional industry classification
  imageUrl?: string;
  publishedAt: string;                  // Will be Date in admin, string for display
  updatedAt?: string;
  readingTime: number;                  // Auto-calculated in admin
  status: 'draft' | 'published' | 'archived'; // Content status
  featured?: boolean;                   // Featured article flag
  metaDescription?: string;             // SEO description
  keywords?: string[];                  // SEO keywords
  viewCount?: number;                   // View tracking
}

// Sample blog posts - optimized for admin panel input
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'industrie-4-0-transformation-maroc',
    title: 'L\'Industrie 4.0 : La Transformation Digitale au Maroc',
    excerpt: 'Découvrez comment l\'Industrie 4.0 révolutionne le secteur industriel marocain et les opportunités qu\'elle offre aux entreprises pour améliorer leur compétitivité.',
    content: `L'Industrie 4.0 représente la quatrième révolution industrielle, caractérisée par l'intégration des technologies numériques dans les processus de production. Au Maroc, cette transformation digitale prend une ampleur considérable, offrant aux entreprises manufacturières des opportunités exceptionnelles d'amélioration de leur compétitivité.

Les technologies clés de l'Industrie 4.0 incluent l'Internet des Objets (IoT), l'intelligence artificielle, la robotique avancée, l'impression 3D et les systèmes cyber-physiques. Ces innovations permettent aux entreprises marocaines de créer des usines intelligentes où les machines communiquent entre elles, optimisent automatiquement leurs performances et prédisent leurs besoins de maintenance.

Le Plan d'Accélération Industrielle (PAI) lancé par le gouvernement marocain encourage fortement cette transformation digitale. De nombreuses entreprises dans les secteurs automobile, aéronautique et textile adoptent déjà ces technologies pour améliorer leur productivité et leur qualité.

Les bénéfices concrets observés incluent une réduction significative des coûts de production, une amélioration de la qualité des produits, une flexibilité accrue dans la production et une meilleure traçabilité des processus. Les entreprises qui investissent aujourd'hui dans l'Industrie 4.0 se positionnent comme leaders sur leurs marchés.

Pour réussir cette transformation, il est essentiel de s'accompagner d'experts spécialisés qui comprennent les spécificités du marché marocain et peuvent adapter les solutions technologiques aux besoins réels des entreprises locales.`,
    author: 'Ahmed Benali',
    category: 'Technologie',
    industry: 'Manufacturing',
    tags: ['Industrie 4.0', 'IoT', 'Maroc', 'Transformation digitale', 'Manufacturing'],
    publishedAt: '2024-01-15',
    readingTime: 6,
    status: 'published',
    featured: true,
    metaDescription: 'Guide complet sur l\'Industrie 4.0 au Maroc : technologies, opportunités et stratégies pour la transformation digitale industrielle.',
    keywords: ['Industrie 4.0', 'Maroc', 'Transformation digitale', 'IoT', 'Smart Factory'],
    viewCount: 1247
  },
  {
    id: '2',
    slug: 'iot-maintenance-predictive-usines',
    title: 'IoT et Maintenance Prédictive : Révolutionner la Gestion des Équipements',
    excerpt: 'L\'Internet des Objets transforme la maintenance industrielle en permettant la prédiction des pannes avant qu\'elles ne surviennent, réduisant ainsi les coûts et les arrêts de production.',
    content: `La maintenance prédictive basée sur l'IoT représente l'un des aspects les plus prometteurs de l'Industrie 4.0. Cette approche révolutionnaire permet aux entreprises de passer d'une maintenance reactive ou préventive à une maintenance intelligente et anticipative.

L'IoT industriel (IIoT) utilise un réseau de capteurs intelligents pour surveiller en temps réel l'état des équipements. Ces capteurs collectent des données sur les vibrations, la température, la pression, l'humidité et d'autres paramètres critiques. Ces informations sont ensuite analysées par des algorithmes d'intelligence artificielle pour identifier les patterns annonciateurs de pannes.

Les entreprises marocaines qui adoptent cette technologie constatent des réductions significatives de leurs coûts de maintenance. Par exemple, une usine textile de Casablanca a réduit ses arrêts non planifiés de 75% après l'implémentation d'un système IoT de maintenance prédictive.

Les technologies clés incluent les capteurs sans fil, les plateformes cloud pour l'analyse de données, les algorithmes de machine learning et les tableaux de bord interactifs. L'intégration de ces composants crée un écosystème où chaque machine communique son état de santé en temps réel.

L'investissement initial dans l'IoT et la maintenance prédictive est rapidement amorti grâce aux économies réalisées sur les coûts de maintenance, la prolongation de la durée de vie des équipements et l'augmentation de la productivité due à la réduction des arrêts.`,
    author: 'Fatima El Mansouri',
    category: 'Innovation',
    industry: 'Manufacturing',
    tags: ['IoT', 'Maintenance prédictive', 'Capteurs', 'Intelligence artificielle', 'Industrie'],
    publishedAt: '2024-01-10',
    readingTime: 7,
    status: 'published',
    featured: false,
    metaDescription: 'Découvrez comment l\'IoT et la maintenance prédictive révolutionnent la gestion des équipements industriels et réduisent les coûts.',
    keywords: ['IoT industriel', 'Maintenance prédictive', 'Capteurs intelligents', 'Intelligence artificielle'],
    viewCount: 892
  },
  {
    id: '3',
    slug: 'lean-manufacturing-optimisation-processus',
    title: 'Lean Manufacturing : Optimiser les Processus pour Éliminer le Gaspillage',
    excerpt: 'Le Lean Manufacturing offre aux entreprises marocaines des outils éprouvés pour améliorer leur efficacité opérationnelle et réduire les coûts tout en maintenant la qualité.',
    content: `Le Lean Manufacturing, né dans l'industrie automobile japonaise, est devenu une philosophie de gestion incontournable pour les entreprises souhaitant optimiser leurs processus de production. Cette méthodologie se concentre sur l'élimination systématique des gaspillages (muda) tout en créant de la valeur pour le client.

Les sept types de gaspillages identifiés par le Lean incluent la surproduction, les temps d'attente, le transport inutile, les traitements inappropriés, les stocks excessifs, les mouvements inutiles et les défauts. L'identification et l'élimination de ces gaspillages permettent aux entreprises d'améliorer significativement leur efficacité.

Au Maroc, de nombreuses entreprises dans les secteurs automobile, aéronautique et agroalimentaire ont adopté les principes Lean avec des résultats remarquables. Une usine de production de composants automobiles à Kenitra a réduit ses délais de production de 50% et ses coûts de 30% après l'implémentation d'une démarche Lean complète.

Les outils Lean les plus utilisés incluent la cartographie des flux de valeur (VSM), le 5S pour l'organisation des postes de travail, le Kanban pour la gestion des flux, le Kaizen pour l'amélioration continue et le SMED pour la réduction des temps de changement de série.

L'implémentation réussie du Lean Manufacturing nécessite un accompagnement méthodologique et une conduite du changement adaptée à la culture de l'entreprise. La formation des équipes et l'engagement de la direction sont essentiels pour assurer la pérennité des améliorations.`,
    author: 'Youssef Alami',
    category: 'Méthodes',
    industry: 'Manufacturing',
    tags: ['Lean Manufacturing', 'Optimisation', 'Amélioration continue', 'Efficacité', 'Processus'],
    publishedAt: '2024-01-05',
    readingTime: 8,
    status: 'published',
    featured: false,
    metaDescription: 'Guide pratique du Lean Manufacturing : outils, méthodes et résultats pour optimiser vos processus et éliminer les gaspillages.',
    keywords: ['Lean Manufacturing', 'Optimisation processus', '5S', 'Kanban', 'VSM'],
    viewCount: 1156
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map(post => post.slug);
}

export function getBlogCategories(): string[] {
  return Array.from(new Set(blogPosts.map(post => post.category)));
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}
