export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Votre Performance Industrielle Connectée',
    subtitle: 'Votre Partenaire vers l\'Industrie 4.0',
    description: 'Chez Leanmover, nous vous accompagnons dans la transformation digitale de vos sites industriels en intégrant les dernières technologies de l\'Industrie 4.0.',
    badge: 'Innovation'
  },
  {
    id: '2',
    title: 'L\'Excellence Industrielle au Service de Vos Projets',
    subtitle: 'Des Solutions Innovantes pour vos Projets Industriels',
    description: 'Leanmover vous accompagne dans la conception, l\'optimisation et le réaménagement de vos installations industrielles grâce à des solutions sur-mesure et connectées.',
    badge: 'Excellence'
  },
  {
    id: '3',
    title: 'Bienvenue chez Leanmover',
    subtitle: 'Intralogistique 4.0 : Solutions Sur-Mesure et Adaptées',
    description: 'Nous concevons des solutions sur mesure et adaptées aux exigences de l\'intralogistique 4.0, afin d\'optimiser vos processus industriels et logistiques.',
    badge: 'Sur-Mesure'
  }
];
