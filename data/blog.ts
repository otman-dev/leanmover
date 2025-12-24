export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number; // in minutes
}

// Sample blog posts - replace with real content
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'industrie-4-0-transformation-maroc',
    title: 'L\'Industrie 4.0 : La Transformation Digitale au Maroc',
    excerpt: 'Découvrez comment l\'Industrie 4.0 révolutionne le secteur industriel marocain et les opportunités qu\'elle offre aux entreprises.',
    content: `L'Industrie 4.0 représente la quatrième révolution industrielle, caractérisée par l'intégration des technologies numériques dans les processus de production...`,
    author: 'Équipe Leanmover',
    category: 'Industrie 4.0',
    tags: ['Industrie 4.0', 'Transformation digitale', 'Maroc', 'Innovation'],
    imageUrl: '/images/blog/industrie-4-0.jpg',
    publishedAt: '2024-12-01',
    readingTime: 5
  },
  {
    id: '2',
    slug: 'optimisation-logistique-entrepot',
    title: 'Comment Optimiser la Logistique de Votre Entrepôt',
    excerpt: 'Les meilleures pratiques pour améliorer l\'efficacité de votre entrepôt et réduire vos coûts logistiques.',
    content: `L'optimisation logistique est essentielle pour maintenir la compétitivité...`,
    author: 'Équipe Leanmover',
    category: 'Logistique',
    tags: ['Logistique', 'Warehousing', 'Optimisation', 'WMS'],
    imageUrl: '/images/blog/logistique.jpg',
    publishedAt: '2024-11-15',
    readingTime: 7
  },
  {
    id: '3',
    slug: 'maintenance-predictive-industrie',
    title: 'La Maintenance Prédictive : Un Atout Majeur',
    excerpt: 'Comment la maintenance prédictive permet de réduire les arrêts de production et d\'optimiser les coûts.',
    content: `La maintenance prédictive utilise les données et l'intelligence artificielle...`,
    author: 'Équipe Leanmover',
    category: 'Maintenance',
    tags: ['Maintenance', 'IoT', 'Industrie 4.0', 'Prédictif'],
    imageUrl: '/images/blog/maintenance.jpg',
    publishedAt: '2024-11-01',
    readingTime: 6
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
