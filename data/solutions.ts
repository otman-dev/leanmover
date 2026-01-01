export interface Solution {
  id: string;
  slug: string;
  title: string;
  industry: string;
  shortDescription: string;
  
  // Client Information (structured for admin input)
  client?: {
    name?: string;                      // Optional client name
    sector: string;                     // Business sector
    size: 'startup' | 'sme' | 'large'; // Company size
    location?: string;                  // Geographic location
  };
  
  // Project Details
  challenge: string;
  solution: string;
  
  // Structured Results (easier for admin to manage)
  results: Array<{
    metric: string;                     // What was measured
    value: string;                      // Quantified result
    description: string;                // Brief explanation
  }>;
  
  // Categorized Technologies
  technologies: Array<{
    category: 'Hardware' | 'Software' | 'Process' | 'Integration';
    name: string;
    description?: string;
  }>;
  
  // Project Timeline (optional)
  timeline?: Array<{
    phase: string;
    duration: string;
    description: string;
    status: 'completed' | 'in-progress' | 'planned';
  }>;
  
  // Media and metadata
  imageUrl?: string;
  gallery?: string[];                   // Additional images
  metaDescription: string;
  keywords?: string[];                  // SEO keywords
  
  // Publishing info
  publishedAt: string;                  // Will be Date in admin
  updatedAt?: string;
  status: 'draft' | 'published' | 'featured';
  featured?: boolean;                   // Featured case study
  
  // Analytics
  viewCount?: number;
  downloadCount?: number;               // For case study downloads
}

// Sample solutions - optimized for admin panel input
export const solutions: Solution[] = [
  {
    id: '1',
    slug: 'automatisation-ligne-production-automobile',
    title: 'Automatisation d\'une Ligne de Production Automobile',
    industry: 'Automobile',
    shortDescription: 'Mise en place d\'une ligne de production automatisée pour un constructeur automobile, augmentant la productivité de 40%.',
    client: {
      name: 'Constructeur Automobile Leader',
      sector: 'Manufacturing',
      size: 'large',
      location: 'Casablanca, Maroc'
    },
    challenge: 'Le client faisait face à des goulots d\'étranglement dans sa ligne de production, causant des retards et des coûts élevés.',
    solution: 'Nous avons conçu et installé une solution d\'automatisation complète intégrant des robots collaboratifs, un système de convoyage intelligent et un MES pour la traçabilité.',
    results: [
      {
        metric: 'Productivité',
        value: '+40%',
        description: 'Augmentation significative du rendement de la ligne'
      },
      {
        metric: 'Défauts qualité',
        value: '-30%',
        description: 'Réduction des erreurs grâce à l\'automatisation'
      },
      {
        metric: 'Retour sur investissement',
        value: '18 mois',
        description: 'ROI atteint plus rapidement que prévu'
      },
      {
        metric: 'Traçabilité',
        value: '100%',
        description: 'Traçabilité complète des produits'
      }
    ],
    technologies: [
      {
        category: 'Hardware',
        name: 'Robots collaboratifs',
        description: 'Robots KUKA pour assemblage'
      },
      {
        category: 'Software',
        name: 'MES',
        description: 'Système de gestion de production'
      },
      {
        category: 'Hardware',
        name: 'Vision industrielle',
        description: 'Contrôle qualité automatique'
      },
      {
        category: 'Integration',
        name: 'IoT',
        description: 'Capteurs connectés pour monitoring'
      }
    ],
    timeline: [
      {
        phase: 'Étude et conception',
        duration: '6 semaines',
        description: 'Analyse des besoins et conception de la solution',
        status: 'completed'
      },
      {
        phase: 'Installation',
        duration: '8 semaines',
        description: 'Mise en place des équipements et intégration',
        status: 'completed'
      },
      {
        phase: 'Tests et formation',
        duration: '4 semaines',
        description: 'Tests de validation et formation des équipes',
        status: 'completed'
      }
    ],
    metaDescription: 'Découvrez comment notre solution d\'automatisation a transformé la ligne de production automobile de notre client.',
    keywords: ['automatisation', 'automobile', 'robotique', 'MES', 'production'],
    publishedAt: '2024-01-20',
    status: 'published',
    featured: true,
    viewCount: 856,
    downloadCount: 42
  },
  {
    id: '2',
    slug: 'optimisation-chaine-logistique-pharmaceutique',
    title: 'Optimisation de la Chaîne Logistique Pharmaceutique',
    industry: 'Pharmaceutique',
    shortDescription: 'Restructuration complète de la chaîne logistique d\'un laboratoire pharmaceutique, réduisant les coûts de 25%.',
    client: {
      name: 'Laboratoire Pharmaceutique',
      sector: 'Healthcare',
      size: 'large',
      location: 'Rabat, Maroc'
    },
    challenge: 'Le client souffrait d\'une supply chain complexe avec des stocks élevés et des ruptures fréquentes.',
    solution: 'Implémentation d\'un système WMS avancé, optimisation des flux et mise en place d\'une planification collaborative.',
    results: [
      {
        metric: 'Coûts logistiques',
        value: '-25%',
        description: 'Réduction significative des coûts opérationnels'
      },
      {
        metric: 'Ruptures de stock',
        value: '-60%',
        description: 'Amélioration de la disponibilité des produits'
      },
      {
        metric: 'Service client',
        value: '+35%',
        description: 'Taux de service client amélioré'
      },
      {
        metric: 'Stocks dormants',
        value: '-40%',
        description: 'Optimisation de la rotation des stocks'
      }
    ],
    technologies: [
      {
        category: 'Software',
        name: 'WMS',
        description: 'Système de gestion d\'entrepôt'
      },
      {
        category: 'Software',
        name: 'Planification avancée',
        description: 'Algorithmes de prévision'
      },
      {
        category: 'Process',
        name: 'Traçabilité',
        description: 'Traçabilité complète des lots'
      },
      {
        category: 'Software',
        name: 'Analytics',
        description: 'Tableaux de bord et KPI'
      }
    ],
    metaDescription: 'Étude de cas sur l\'optimisation de la supply chain pharmaceutique avec des résultats mesurables.',
    keywords: ['logistique', 'pharmaceutique', 'WMS', 'supply chain', 'optimisation'],
    publishedAt: '2024-01-15',
    status: 'published',
    featured: false,
    viewCount: 623,
    downloadCount: 28
  },
  {
    id: '3',
    slug: 'lean-manufacturing-textile-casablanca',
    title: 'Transformation Lean d\'une Usine Textile',
    industry: 'Textile',
    shortDescription: 'Application des méthodes Lean Manufacturing dans une usine textile, améliorant l\'efficacité de 45%.',
    client: {
      name: 'Usine Textile Leader',
      sector: 'Textile',
      size: 'sme',
      location: 'Casablanca, Maroc'
    },
    challenge: 'L\'usine présentait des gaspillages importants, des délais longs et une qualité irrégulière.',
    solution: 'Déploiement d\'une démarche Lean complète avec cartographie VSM, 5S, Kanban et formation des équipes.',
    results: [
      {
        metric: 'Efficacité globale',
        value: '+45%',
        description: 'Amélioration de l\'OEE (Overall Equipment Effectiveness)'
      },
      {
        metric: 'Délais production',
        value: '-50%',
        description: 'Réduction significative des lead times'
      },
      {
        metric: 'Défauts qualité',
        value: '-35%',
        description: 'Amélioration de la qualité produit'
      },
      {
        metric: 'Économies annuelles',
        value: '2M DH',
        description: 'Économies mesurées sur une année complète'
      }
    ],
    technologies: [
      {
        category: 'Process',
        name: 'Lean Manufacturing',
        description: 'Méthodologie d\'optimisation'
      },
      {
        category: 'Process',
        name: 'VSM',
        description: 'Cartographie des flux de valeur'
      },
      {
        category: 'Process',
        name: 'Kanban',
        description: 'Gestion visuelle des flux'
      },
      {
        category: 'Process',
        name: '5S',
        description: 'Organisation des postes de travail'
      }
    ],
    metaDescription: 'Transformation Lean réussie d\'une usine textile marocaine avec des résultats exceptionnels.',
    keywords: ['lean manufacturing', 'textile', '5S', 'kanban', 'VSM', 'efficacité'],
    publishedAt: '2024-01-10',
    status: 'published',
    featured: false,
    viewCount: 934,
    downloadCount: 67
  }
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find(solution => solution.slug === slug);
}

export function getAllSolutionSlugs(): string[] {
  return solutions.map(solution => solution.slug);
}

export function getIndustries(): string[] {
  return Array.from(new Set(solutions.map(solution => solution.industry)));
}

export function getSolutionsByIndustry(industry: string): Solution[] {
  return solutions.filter(solution => solution.industry === industry);
}
