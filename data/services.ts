import { HiCog, HiChip, HiCube, HiBeaker, HiLightningBolt, HiTruck } from 'react-icons/hi';

export interface Service {
  id: string;
  slug: string;
  icon: any;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  metaDescription: string;
}

export const services: Service[] = [
  {
    id: '1',
    slug: 'ingenierie-industrialisation',
    icon: HiCog,
    title: 'Ingénierie & Industrialisation',
    shortDescription: 'Conception et optimisation de vos installations industrielles pour maximiser l\'efficacité et la productivité.',
    fullDescription: 'Notre expertise en ingénierie industrielle vous permet de concevoir, optimiser et moderniser vos installations de production. Nous vous accompagnons de l\'analyse de vos besoins jusqu\'à la mise en service complète de vos équipements.',
    features: [
      'Étude de faisabilité technique et économique',
      'Conception d\'installations industrielles',
      'Optimisation des processus de production',
      'Plans d\'implantation et layout d\'usine',
      'Gestion de projets industriels',
      'Mise en service et commissioning'
    ],
    benefits: [
      'Amélioration de la productivité',
      'Réduction des coûts opérationnels',
      'Optimisation de l\'espace de production',
      'Conformité aux normes internationales',
      'Accompagnement de A à Z'
    ],
    metaDescription: 'Services d\'ingénierie industrielle et d\'industrialisation au Maroc. Conception, optimisation et modernisation de vos installations de production.'
  },
  {
    id: '2',
    slug: 'solutions-industrie-4-0',
    icon: HiChip,
    title: 'Solutions Industrie 4.0',
    shortDescription: 'Intégration de systèmes connectés et contrôle qualité par vision industrielle.',
    fullDescription: 'Transformez votre industrie avec nos solutions 4.0 : IoT, contrôle qualité automatisé par vision, systèmes MES, et digitalisation complète de vos processus pour une usine intelligente et connectée.',
    features: [
      'Systèmes IoT et capteurs intelligents',
      'Contrôle qualité par vision industrielle',
      'MES (Manufacturing Execution System)',
      'Traçabilité digitale complète',
      'Intégration ERP/MES',
      'Tableaux de bord en temps réel',
      'Intelligence artificielle et machine learning'
    ],
    benefits: [
      'Réduction des défauts qualité',
      'Traçabilité complète des produits',
      'Prise de décision basée sur les données',
      'Amélioration continue automatisée',
      'Connectivité totale de l\'usine'
    ],
    metaDescription: 'Solutions Industrie 4.0 au Maroc : IoT, vision industrielle, MES, et digitalisation pour une usine intelligente et connectée.'
  },
  {
    id: '3',
    slug: 'achat-stockage',
    icon: HiCube,
    title: 'Achat & Stockage',
    shortDescription: 'Approvisionnement global et gestion de vos stocks en toute sécurité.',
    fullDescription: 'Optimisez votre chaîne d\'approvisionnement avec nos solutions d\'achat international et de gestion des stocks. Nous vous accompagnons dans le sourcing, l\'importation et le stockage sécurisé de vos équipements et matières premières.',
    features: [
      'Sourcing et achat international',
      'Négociation avec les fournisseurs',
      'Gestion des importations',
      'Entreposage sécurisé',
      'Gestion des stocks (WMS)',
      'Logistique d\'approvisionnement',
      'Contrôle qualité à réception'
    ],
    benefits: [
      'Réduction des coûts d\'achat',
      'Optimisation des niveaux de stock',
      'Sécurisation des approvisionnements',
      'Gain de temps et d\'efficacité',
      'Traçabilité complète'
    ],
    metaDescription: 'Services d\'achat et stockage au Maroc : sourcing international, gestion des stocks, entreposage sécurisé et optimisation des approvisionnements.'
  },
  {
    id: '4',
    slug: 'gestion-maintenance',
    icon: HiBeaker,
    title: 'Gestion & Maintenance',
    shortDescription: 'Pilotage et entretien de vos sites industriels.',
    fullDescription: 'Assurez la disponibilité maximale de vos équipements avec nos services de maintenance préventive et curative. Nous gérons l\'ensemble de vos opérations de maintenance pour garantir la performance continue de vos installations.',
    features: [
      'Maintenance préventive planifiée',
      'Maintenance curative et dépannage',
      'GMAO (Gestion de Maintenance Assistée par Ordinateur)',
      'Gestion des pièces de rechange',
      'Formation du personnel',
      'Audits techniques',
      'Amélioration de la fiabilité (TPM)'
    ],
    benefits: [
      'Réduction des arrêts de production',
      'Augmentation de la durée de vie des équipements',
      'Optimisation des coûts de maintenance',
      'Amélioration de la disponibilité',
      'Sécurité accrue'
    ],
    metaDescription: 'Services de gestion et maintenance industrielle au Maroc : maintenance préventive, curative, GMAO et optimisation de la disponibilité.'
  },
  {
    id: '5',
    slug: 'machines-speciales-automatisation',
    icon: HiLightningBolt,
    title: 'Machines Spéciales & Automatisation',
    shortDescription: 'Solutions sur-mesure pour vos process industriels.',
    fullDescription: 'Conception et réalisation de machines spéciales et systèmes d\'automatisation sur-mesure adaptés à vos besoins spécifiques. De l\'étude à la mise en service, nous créons des solutions uniques pour vos processus industriels.',
    features: [
      'Conception de machines spéciales',
      'Automatisation de processus',
      'Robotique industrielle',
      'Systèmes de convoyage',
      'Automates programmables (PLC)',
      'Interfaces homme-machine (IHM)',
      'Intégration de robots collaboratifs'
    ],
    benefits: [
      'Augmentation de la productivité',
      'Réduction de la pénibilité',
      'Amélioration de la qualité',
      'Flexibilité de production',
      'ROI rapide'
    ],
    metaDescription: 'Conception de machines spéciales et automatisation industrielle au Maroc : robotique, automates, systèmes sur-mesure pour vos processus.'
  },
  {
    id: '6',
    slug: 'warehousing-logistique',
    icon: HiTruck,
    title: 'Warehousing & Logistique',
    shortDescription: 'Gestion optimisée des flux et des stocks.',
    fullDescription: 'Optimisez votre logistique interne avec nos solutions de warehousing intelligent. De la conception d\'entrepôts à la gestion des flux, nous vous accompagnons pour une logistique performante et digitalisée.',
    features: [
      'Conception d\'entrepôts optimisés',
      'WMS (Warehouse Management System)',
      'Systèmes de stockage automatisés',
      'Gestion des flux intralogistiques',
      'Préparation de commandes',
      'Systèmes de picking',
      'Traçabilité RFID/codes-barres'
    ],
    benefits: [
      'Optimisation de l\'espace',
      'Réduction des erreurs de préparation',
      'Amélioration des délais',
      'Visibilité en temps réel',
      'Réduction des coûts logistiques'
    ],
    metaDescription: 'Solutions de warehousing et logistique au Maroc : WMS, stockage automatisé, gestion des flux et optimisation des entrepôts.'
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map(service => service.slug);
}
