export interface Solution {
  id: string;
  slug: string;
  title: string;
  industry: string;
  shortDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  imageUrl?: string;
  metaDescription: string;
}

// Sample solutions/case studies
export const solutions: Solution[] = [
  {
    id: '1',
    slug: 'automatisation-ligne-production-automobile',
    title: 'Automatisation d\'une Ligne de Production Automobile',
    industry: 'Automobile',
    shortDescription: 'Mise en place d\'une ligne de production automatisée pour un constructeur automobile, augmentant la productivité de 40%.',
    challenge: 'Le client faisait face à des goulots d\'étranglement dans sa ligne de production, causant des retards et des coûts élevés.',
    solution: 'Nous avons conçu et installé une solution d\'automatisation complète intégrant des robots collaboratifs, un système de convoyage intelligent et un MES pour la traçabilité.',
    results: [
      'Augmentation de 40% de la productivité',
      'Réduction de 30% des défauts qualité',
      'ROI atteint en 18 mois',
      'Amélioration de la traçabilité à 100%'
    ],
    technologies: ['Robotique collaborative', 'MES', 'Vision industrielle', 'IoT'],
    imageUrl: '/images/solutions/automotive.jpg',
    metaDescription: 'Découvrez comment nous avons automatisé une ligne de production automobile, augmentant la productivité de 40%.'
  },
  {
    id: '2',
    slug: 'wms-logistique-pharmaceutique',
    title: 'Système WMS pour l\'Industrie Pharmaceutique',
    industry: 'Pharmaceutique',
    shortDescription: 'Déploiement d\'un WMS avancé pour optimiser la gestion d\'un entrepôt pharmaceutique avec traçabilité complète.',
    challenge: 'Gestion complexe des lots, dates de péremption et conformité réglementaire stricte.',
    solution: 'Installation d\'un WMS de dernière génération avec traçabilité RFID, gestion automatique des dates de péremption et intégration ERP.',
    results: [
      'Réduction de 50% des erreurs de préparation',
      'Traçabilité complète des lots',
      'Conformité réglementaire assurée',
      'Gain de temps de 35% sur la préparation'
    ],
    technologies: ['WMS', 'RFID', 'Intégration ERP', 'Systèmes de picking'],
    imageUrl: '/images/solutions/pharma.jpg',
    metaDescription: 'Étude de cas : déploiement d\'un WMS pour l\'industrie pharmaceutique avec traçabilité RFID complète.'
  },
  {
    id: '3',
    slug: 'industrie-4-0-textile',
    title: 'Transformation Digitale d\'une Usine Textile',
    industry: 'Textile',
    shortDescription: 'Intégration de solutions Industrie 4.0 pour moderniser une usine textile et améliorer sa compétitivité.',
    challenge: 'Processus manuels obsolètes, manque de visibilité sur la production, et qualité inconstante.',
    solution: 'Déploiement d\'une solution Industrie 4.0 complète : IoT pour le monitoring en temps réel, MES pour la gestion de production, et contrôle qualité par vision.',
    results: [
      'Visibilité temps réel à 100%',
      'Réduction de 25% des coûts de production',
      'Amélioration de 45% de la qualité',
      'Réduction de 60% des arrêts non planifiés'
    ],
    technologies: ['IoT', 'MES', 'Vision industrielle', 'Analytics'],
    imageUrl: '/images/solutions/textile.jpg',
    metaDescription: 'Comment nous avons transformé une usine textile avec l\'Industrie 4.0, améliorant la qualité de 45%.'
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
