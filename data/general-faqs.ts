export interface GeneralFAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'implementation' | 'support' | 'technology' | 'roi';
  keywords?: string[];
}

export const generalFAQs: GeneralFAQ[] = [
  // General Questions
  {
    id: 'gen-1',
    question: 'Qu\'est-ce que Leanmover et quels services proposez-vous ?',
    answer: 'Leanmover est une entreprise marocaine spécialisée dans la transformation digitale industrielle et l\'Industrie 4.0. Nous proposons 6 services principaux : Ingénierie & Industrialisation, Solutions Industrie 4.0 (IoT, digitalisation), Achat & Stockage, Gestion & Maintenance, Machines Spéciales & Automatisation, et Warehousing & Logistique. Notre objectif est d\'accompagner les entreprises industrielles dans l\'optimisation de leurs processus, l\'automatisation et la mise en place de solutions connectées.',
    category: 'general',
    keywords: ['leanmover', 'services', 'industrie 4.0', 'maroc']
  },
  {
    id: 'gen-2',
    question: 'Dans quelles régions du Maroc intervenez-vous ?',
    answer: 'Nous sommes basés dans la Zone franche d\'exportation de Tanger, mais nous intervenons dans tout le Maroc. Nos principaux clients se situent dans les zones industrielles de Tanger, Casablanca, Kenitra, Rabat, Fès et Marrakech. Nous pouvons nous déplacer sur l\'ensemble du territoire marocain pour réaliser des audits, études et déploiements.',
    category: 'general',
    keywords: ['localisation', 'maroc', 'tanger', 'zones industrielles']
  },
  {
    id: 'gen-3',
    question: 'Quels secteurs industriels accompagnez-vous ?',
    answer: 'Nous travaillons avec de nombreux secteurs industriels : automobile et équipementiers, aéronautique, pharmaceutique, agroalimentaire, textile, logistique et distribution, électronique, chimie, et manufacturing général. Notre expertise est adaptable à tous les environnements industriels nécessitant automatisation, optimisation ou digitalisation.',
    category: 'general',
    keywords: ['secteurs', 'industries', 'automobile', 'pharmaceutique', 'aéronautique']
  },

  // Pricing & Budget
  {
    id: 'pricing-1',
    question: 'Combien coûte un projet typique avec Leanmover ?',
    answer: 'Le coût d\'un projet varie considérablement selon la complexité, l\'envergure et les technologies impliquées. Un audit ou une étude de faisabilité peut débuter à partir de quelques dizaines de milliers de dirhams. Les projets d\'automatisation ou de déploiement WMS peuvent aller de 200K à plusieurs millions de dirhams selon les besoins. Nous proposons toujours un devis détaillé gratuit après analyse de vos besoins. Contactez-nous pour une estimation personnalisée.',
    category: 'pricing',
    keywords: ['prix', 'coût', 'budget', 'devis', 'tarif']
  },
  {
    id: 'pricing-2',
    question: 'Proposez-vous des solutions adaptées aux PME ?',
    answer: 'Absolument. Nous accompagnons aussi bien les grandes entreprises que les PME. Nos solutions sont modulaires et évolutives : vous pouvez démarrer avec un projet pilote (ligne de production, zone d\'entrepôt) puis étendre progressivement. Nous proposons également des solutions en mode SaaS pour les logiciels (WMS, MES) afin de réduire l\'investissement initial. Notre objectif est de rendre l\'Industrie 4.0 accessible à toutes les tailles d\'entreprises.',
    category: 'pricing',
    keywords: ['pme', 'petites entreprises', 'budget limité', 'modulaire']
  },
  {
    id: 'pricing-3',
    question: 'Le devis et l\'étude initiale sont-ils gratuits ?',
    answer: 'Oui. La première consultation et l\'établissement d\'un devis détaillé sont gratuits. Nous prenons le temps de comprendre vos besoins, d\'analyser votre situation et de vous proposer une solution chiffrée. Pour les projets complexes nécessitant une étude de faisabilité approfondie (plusieurs jours d\'audit sur site), un forfait d\'étude peut être proposé, déductible ensuite du projet global si vous nous choisissez.',
    category: 'pricing',
    keywords: ['devis gratuit', 'consultation', 'étude gratuite']
  },

  // Implementation & Timeline
  {
    id: 'impl-1',
    question: 'Combien de temps prend un projet d\'automatisation ou de digitalisation ?',
    answer: 'La durée varie selon la complexité : une étude et audit initial : 2-4 semaines. Un projet pilote (ligne de production, zone WMS) : 3-6 mois. Un déploiement complet (usine, entrepôt) : 6-18 mois. Une machine spéciale sur-mesure : 4-12 mois. Nous travaillons en mode projet avec des jalons clairs et des livraisons progressives pour minimiser l\'impact sur votre production en cours.',
    category: 'implementation',
    keywords: ['délai', 'durée', 'temps', 'calendrier', 'planning']
  },
  {
    id: 'impl-2',
    question: 'Comment se déroule un projet typique avec Leanmover ?',
    answer: 'Notre méthodologie en 5 étapes : 1) Analyse des besoins et audit (1-2 semaines) - visite sur site, entretiens, diagnostic. 2) Conception et proposition (2-3 semaines) - design technique, devis détaillé, planning. 3) Validation et planification (1 semaine) - ajustements, signature, kick-off. 4) Réalisation et tests (variable selon projet) - développement, intégration, tests en environnement contrôlé. 5) Déploiement et formation (2-4 semaines) - installation, mise en production, formation équipes, support post-déploiement.',
    category: 'implementation',
    keywords: ['processus', 'méthodologie', 'étapes', 'déroulement']
  },
  {
    id: 'impl-3',
    question: 'Faut-il arrêter la production pendant la mise en place ?',
    answer: 'Non, dans la plupart des cas. Nous planifions les interventions pour minimiser l\'impact sur votre activité : travaux en dehors des heures de production (nuits, week-ends), déploiement progressif par zones ou lignes, solutions temporaires et redondances, phase de tests en parallèle de la production existante. L\'objectif est d\'assurer une transition en douceur avec une continuité de service maximale.',
    category: 'implementation',
    keywords: ['arrêt production', 'continuité', 'transition', 'impact']
  },

  // Support & Training
  {
    id: 'support-1',
    question: 'Proposez-vous des formations pour nos équipes ?',
    answer: 'Oui, la formation fait partie intégrante de nos projets. Nous formons vos équipes à plusieurs niveaux : utilisateurs opérationnels (utilisation quotidienne des systèmes), techniciens de maintenance (diagnostic, réglages de premier niveau), managers et superviseurs (pilotage via tableaux de bord, indicateurs). Les formations sont adaptées au niveau de chaque groupe et incluent documentation, supports pratiques et exercices terrain. Des sessions de rappel peuvent être organisées selon vos besoins.',
    category: 'support',
    keywords: ['formation', 'training', 'accompagnement', 'équipes']
  },
  {
    id: 'support-2',
    question: 'Quel support proposez-vous après la mise en service ?',
    answer: 'Nous offrons plusieurs niveaux de support : garantie constructeur (1-2 ans selon équipements) incluant réparations et pièces. Support technique à distance (email, téléphone, TeamViewer) pour diagnostic rapide. Interventions sur site en cas de besoin (selon contrat de maintenance). Contrats de maintenance préventive avec visites programmées. Mises à jour logicielles et évolutions fonctionnelles. Vous n\'êtes jamais seul après le déploiement.',
    category: 'support',
    keywords: ['support', 'maintenance', 'garantie', 'SAV', 'assistance']
  },
  {
    id: 'support-3',
    question: 'Que faire en cas de panne ou de problème technique ?',
    answer: 'En cas d\'incident : contactez notre hotline support (disponible pendant vos heures de production). Notre équipe réalise un diagnostic à distance. Si nécessaire, intervention sur site sous 24-48h (selon urgence et contrat). Solutions de contournement proposées pour minimiser l\'impact. Documentation et tutoriels disponibles en ligne. Pour les contrats premium, un technicien peut être mobilisé en moins de 4 heures.',
    category: 'support',
    keywords: ['panne', 'problème', 'urgence', 'hotline', 'dépannage']
  },

  // Technology & Solutions
  {
    id: 'tech-1',
    question: 'Quelles technologies et outils utilisez-vous ?',
    answer: 'Nous travaillons avec les meilleures technologies du marché : automates et PLC (Siemens, Schneider, Allen-Bradley, Omron), robotique (ABB, KUKA, Fanuc, robots collaboratifs Universal Robots), systèmes WMS et MES (solutions du marché et développements sur-mesure), IoT et capteurs (protocoles MQTT, OPC-UA), vision industrielle et IA, ERP (SAP, Odoo, Microsoft Dynamics). Nous sélectionnons les outils adaptés à vos besoins et budget.',
    category: 'technology',
    keywords: ['technologies', 'outils', 'logiciels', 'équipements', 'marques']
  },
  {
    id: 'tech-2',
    question: 'Vos solutions sont-elles compatibles avec nos systèmes existants ?',
    answer: 'Oui, l\'interopérabilité est une priorité. Nous réalisons systématiquement un audit de l\'existant pour assurer la compatibilité. Nous pouvons interfacer nos solutions avec vos ERP, GMAO, systèmes de production via APIs, connecteurs standards (OPC-UA, REST, SOAP), fichiers d\'échange (CSV, XML, JSON), bases de données communes. L\'objectif est de créer un écosystème cohérent sans tout remplacer.',
    category: 'technology',
    keywords: ['compatibilité', 'intégration', 'ERP', 'interopérabilité', 'existant']
  },
  {
    id: 'tech-3',
    question: 'Proposez-vous du développement logiciel sur-mesure ?',
    answer: 'Oui. Notre équipe de développement peut créer : interfaces homme-machine (IHM/SCADA) personnalisées, modules complémentaires pour WMS/MES, tableaux de bord et reporting sur-mesure, applications mobiles pour gestion terrain, intégrations spécifiques (connecteurs, API), algorithmes d\'optimisation (planification, routage). Nous utilisons des technologies modernes (React, Node.js, Python, .NET) et appliquons les meilleures pratiques de développement.',
    category: 'technology',
    keywords: ['développement', 'logiciel', 'sur-mesure', 'custom', 'programmation']
  },

  // ROI & Results
  {
    id: 'roi-1',
    question: 'Quels gains peut-on espérer d\'un projet d\'automatisation ou Industrie 4.0 ?',
    answer: 'Les gains typiques observés chez nos clients : productivité : +20% à +50% selon processus automatisés. Réduction d\'erreurs : -70% à -90% (traçabilité, contrôles automatisés). Économies de coûts : -15% à -30% (main d\'œuvre, gaspillages, stocks). Délais de livraison : -20% à -40% (flux optimisés). Qualité : amélioration significative et constante. Visibilité : temps réel sur production et stocks. ROI typique : 18-36 mois selon projets.',
    category: 'roi',
    keywords: ['gains', 'résultats', 'ROI', 'retour sur investissement', 'bénéfices']
  },
  {
    id: 'roi-2',
    question: 'Comment mesurez-vous le succès d\'un projet ?',
    answer: 'Nous définissons des KPI clairs dès le départ : indicateurs de performance (OEE, TRS, taux de service), gains financiers (économies, productivité), qualité (taux de défauts, conformité), délais (lead time, temps de cycle), satisfaction utilisateurs. Nous réalisons des mesures avant/après et un suivi régulier post-déploiement (1 mois, 3 mois, 6 mois). Des rapports d\'analyse sont fournis pour documenter les gains réalisés.',
    category: 'roi',
    keywords: ['mesure', 'KPI', 'indicateurs', 'performance', 'évaluation']
  },
  {
    id: 'roi-3',
    question: 'Avez-vous des exemples de projets réussis ?',
    answer: 'Oui, nous avons accompagné plus de 80 clients avec 200+ projets réalisés dans divers secteurs. Exemples : automatisation ligne assemblage automobile (gain +35% productivité), déploiement WMS entrepôt pharmaceutique (réduction erreurs -85%, gain temps picking -40%), digitalisation usine textile (traçabilité complète, OEE +25%), machines spéciales agroalimentaire (augmentation cadence +50%). Contactez-nous pour des études de cas détaillées adaptées à votre secteur.',
    category: 'roi',
    keywords: ['exemples', 'cas clients', 'références', 'projets', 'success stories']
  }
];
