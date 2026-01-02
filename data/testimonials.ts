export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  imageUrl?: string;
  industry?: string;
  projectType?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Mohammed Alami',
    position: 'Directeur Industriel',
    company: 'Groupe Industriel XYZ',
    content: 'Leanmover a transformé notre ligne de production. Leur expertise en automatisation et leur accompagnement personnalisé ont été déterminants pour le succès de notre projet.',
    rating: 5,
    industry: 'Manufacturing',
    projectType: 'Automatisation'
  },
  {
    id: '2',
    name: 'Sarah Benkirane',
    position: 'Responsable Logistique',
    company: 'Pharma Solutions',
    content: 'Le système WMS déployé par Leanmover a considérablement amélioré notre efficacité. Traçabilité parfaite et réduction significative des erreurs.',
    rating: 5,
    industry: 'Pharmaceutique',
    projectType: 'Warehousing & Logistique'
  },
  {
    id: '3',
    name: 'Karim El Fassi',
    position: 'CEO',
    company: 'Textile Innovation',
    content: 'L\'accompagnement de Leanmover dans notre transition vers l\'Industrie 4.0 a dépassé nos attentes. Des résultats concrets et mesurables.',
    rating: 5,
    industry: 'Textile',
    projectType: 'Solutions Industrie 4.0'
  }
];
