import { HiCog, HiChip, HiCube, HiBeaker, HiLightningBolt, HiTruck } from 'react-icons/hi';

export interface ServiceSection {
  title: string;
  content: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  slug: string;
  icon: any;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  sections?: ServiceSection[];
  faqs?: FAQ[];
  metaDescription: string;
  comingSoon?: boolean;
}

export const services: Service[] = [
  {
    id: '1',
    slug: 'ingenierie-industrialisation',
    icon: HiCog,
    title: 'Ingénierie & Industrialisation',
    shortDescription: 'Nous mettons notre expertise au service de vos projets industriels, de la phase d\'étude jusqu\'à la mise en œuvre.',
    fullDescription: 'Notre approche intègre : Conception sur mesure, élaboration de solutions techniques adaptées à vos besoins spécifiques. Prototypage et essais pour validation fonctionnelle avant lancement. Industrialisation avec optimisation des procédés pour garantir qualité, performance et rentabilité. Accompagnement global avec gestion de projet, suivi technique et amélioration continue. Grâce à notre savoir-faire en ingénierie, nous transformons vos idées en solutions industrielles fiables, innovantes et prêtes pour la production à grande échelle.',
    features: [
      'Conception sur mesure',
      'Prototypage et essais',
      'Industrialisation',
      'Accompagnement global'
    ],
    benefits: [
      'Solutions pensées pour vous',
      'Validation avant industrialisation',
      'Transformation d\'idées en solutions concrètes',
      'Expertise de bout en bout'
    ],
    sections: [
      {
        title: 'Conception sur mesure : des solutions pensées pour vous',
        content: 'Chaque projet débute par une analyse approfondie de vos besoins spécifiques, de vos contraintes techniques et de votre environnement de production. Notre équipe d\'ingénieurs élabore des solutions sur mesure en s\'appuyant sur des outils de modélisation 3D, des études mécaniques avancées et des choix technologiques adaptés. Nous privilégions une approche collaborative, en intégrant vos équipes à chaque étape de la conception, afin d\'assurer une parfaite adéquation entre la solution proposée et vos objectifs industriels. L\'innovation, l\'ergonomie et la performance sont au cœur de notre démarche, avec pour finalité de vous livrer un produit fiable, optimisé et prêt à l\'industrialisation.'
      },
      {
        title: 'Prototypage et essais : valider avant d\'industrialiser',
        content: 'Dans le cadre de notre démarche d\'ingénierie, la phase de prototypage et d\'essais joue un rôle crucial dans la validation des solutions développées. Nous concevons des prototypes fonctionnels permettant de tester en conditions réelles les performances, l\'ergonomie et la fiabilité des produits ou systèmes avant leur mise en production. Cette étape nous permet d\'identifier d\'éventuelles améliorations techniques, d\'optimiser les choix de conception, et de garantir la conformité aux exigences du client. Grâce à une approche rigoureuse et des outils de mesure adaptés, nous assurons des essais précis et documentés, essentiels pour la réussite de chaque projet industriel.'
      },
      {
        title: 'Industrialisation : transformer les idées en solutions concrètes',
        content: 'L\'industrialisation est une étape clé du processus de développement produit, visant à transformer un prototype ou une solution sur mesure en un système de production fiable, reproductible et optimisé. Chez LeanMover, nous accompagnons nos clients dans la définition, la planification et la mise en œuvre des moyens industriels nécessaires pour garantir une montée en cadence efficace, tout en assurant la qualité, la sécurité et la rentabilité des opérations. Grâce à notre expertise en ingénierie de production, en gestion de projet et en amélioration continue, nous proposons des solutions adaptées aux contraintes techniques, économiques et logistiques de chaque environnement industriel.'
      },
      {
        title: 'Accompagnement global : une expertise de bout en bout',
        content: 'Nous offrons un accompagnement global pour garantir la réussite de vos projets industriels. De la définition des besoins à la mise en œuvre opérationnelle, nous assurons une gestion de projet rigoureuse, un suivi technique précis et une démarche d\'amélioration continue. Notre approche structurée permet d\'anticiper les risques, de respecter les délais et de maîtriser les coûts, tout en garantissant des solutions pérennes et performantes. Nous travaillons en étroite collaboration avec vos équipes pour assurer une intégration fluide des solutions et une montée en compétence durable.'
      }
    ],
    faqs: [
      {
        question: 'Que signifie « ingénierie sur mesure » chez Leanmover?',
        answer: 'Cela signifie que nous concevons des solutions techniques spécifiquement adaptées aux besoins et contraintes de chaque client. Grâce à notre expertise multidisciplinaire, nous transformons vos idées en systèmes fiables, innovants et prêts pour l\'industrialisation.'
      },
      {
        question: 'Quelles étapes couvre votre processus d\'industrialisation?',
        answer: 'Notre processus comprend la conception technique, la validation par prototypage, la définition des moyens de production, la mise en série et l\'optimisation continue. Nous vous accompagnons jusqu\'à la pleine montée en cadence de votre solution.'
      },
      {
        question: 'Accompagnez-vous l\'installation des moyens de production?',
        answer: 'Oui, nous intervenons de l\'étude des besoins jusqu\'à l\'implantation des équipements en atelier. Nous définissons avec vous les outils, machines et postes nécessaires à une production efficace, sécurisée et conforme aux standards qualité.'
      },
      {
        question: 'Est-il possible de tester la solution avant son lancement?',
        answer: 'Bien sûr. Nous réalisons des prototypes fonctionnels et des phases d\'essais terrain afin de valider chaque aspect de la solution avant le déploiement. Cela permet d\'optimiser la conception et de sécuriser les futures étapes industrielles.'
      },
      {
        question: 'Intégrez-vous une démarche d\'amélioration continue?',
        answer: 'Absolument. Chaque projet est structuré autour d\'une logique de performance durable. Nous analysons les retours d\'expérience et ajustons les processus pour maximiser la productivité, réduire les coûts et améliorer la qualité globale.'
      },
      {
        question: 'Intervenez-vous dès la phase de conception?',
        answer: 'Oui, nous participons dès l\'analyse du besoin pour concevoir des solutions techniques sur mesure.'
      },
      {
        question: 'Réalisez-vous des prototypes avant la mise en production?',
        answer: 'Tout à fait. Nous développons et testons des prototypes pour valider la faisabilité technique et fonctionnelle.'
      },
      {
        question: 'Optimisez-vous les lignes de production existantes?',
        answer: 'Oui, nous analysons vos processus et proposons des améliorations pour gagner en performance et en fiabilité.'
      }
    ],
    metaDescription: 'Services d\'ingénierie industrielle et d\'industrialisation au Maroc. Conception, optimisation et modernisation de vos installations de production.'
  },
  {
    id: '2',
    slug: 'solutions-industrie-4-0',
    icon: HiChip,
    title: 'Solutions Industrie 4.0',
    shortDescription: 'Nous vous accompagnons dans la transition vers une industrie connectée, intelligente et performante, en intégrant les technologies de l\'Industrie 4.0 à vos processus.',
    fullDescription: 'Notre approche inclut : Digitalisation des processus avec automatisation des tâches répétitives et suivi en temps réel des opérations. Connectivité & IoT pour intégration de capteurs et systèmes connectés pour une meilleure visibilité et traçabilité. Analyse de données pour exploitation des données afin d\'améliorer la prise de décision et anticiper les besoins. Optimisation continue avec amélioration des performances grâce à une surveillance intelligente des flux. Grâce à notre maîtrise des outils numériques industriels, nous vous aidons à gagner en productivité, en agilité et en compétitivité face aux enjeux de demain.',
    features: [
      'Digitalisation des processus',
      'Connectivité & IoT',
      'Analyse de données',
      'Optimisation continue'
    ],
    benefits: [
      'Fluidifier, automatiser, optimiser',
      'Systèmes intelligents et interconnectés',
      'Transformer l\'information en performance',
      'Améliorer durablement vos performances'
    ],
    sections: [
      {
        title: 'Digitalisation des processus : fluidifier, automatiser, optimiser',
        content: 'La digitalisation des processus consiste à transformer vos opérations manuelles en flux numériques fluides, automatisés et traçables. Chez Leanmover, nous analysons vos modes de fonctionnement pour identifier les leviers d\'automatisation les plus pertinents. Qu\'il s\'agisse de gestion documentaire, de suivi de production, de contrôle qualité ou de maintenance, nous mettons en place des outils digitaux sur mesure pour améliorer la réactivité, la fiabilité et l\'efficacité de vos opérations. Résultat : un gain de temps, une réduction des erreurs, et une meilleure maîtrise de vos activités.'
      },
      {
        title: 'Connectivité & IoT : des systèmes intelligents et interconnectés',
        content: 'Nous intégrons des technologies IoT (Internet des Objets) pour connecter vos équipements, capteurs et systèmes en temps réel. Cette connectivité permet de collecter, analyser et exploiter des données clés à chaque étape de vos opérations. Grâce à une vision centralisée et instantanée de votre environnement industriel, vous améliorez la traçabilité, anticipez les dysfonctionnements, et optimisez vos prises de décision. Nos solutions connectées s\'adaptent à vos infrastructures pour créer un écosystème intelligent, agile et évolutif.'
      },
      {
        title: 'Analyse de données : transformer l\'information en performance',
        content: 'L\'analyse de données est au cœur de l\'industrie 4.0. Chez Leanmover, nous exploitons les données collectées sur vos équipements, processus et flux pour en extraire des indicateurs pertinents. Ces analyses permettent de détecter les anomalies, d\'anticiper les besoins, d\'optimiser les ressources et d\'améliorer la prise de décision. Grâce à des tableaux de bord intelligents et des algorithmes d\'analyse avancée, nous vous aidons à piloter votre activité avec précision, réactivité et vision stratégique.'
      },
      {
        title: 'Optimisation continue : améliorer durablement vos performances',
        content: 'L\'optimisation continue fait partie intégrante de notre approche. Nous analysons en permanence vos processus pour identifier les sources de gaspillage, les points de friction et les opportunités d\'amélioration. Grâce à des outils de suivi en temps réel, des retours terrain et des indicateurs de performance, nous mettons en place des actions correctives et préventives pour garantir des gains durables en productivité, qualité et réactivité. Notre objectif : faire évoluer vos systèmes avec agilité face aux exigences du marché.'
      }
    ],
    faqs: [
      {
        question: 'Que signifie concrètement « Solutions 4.0 » ?',
        answer: 'Ce sont des technologies intelligentes (IoT, data, automatisation…) intégrées dans vos processus pour les rendre plus performants, réactifs et connectés.'
      },
      {
        question: 'Quels types de processus peuvent être digitalisés ?',
        answer: 'Tous types : suivi de production, maintenance, qualité, gestion de stock, traçabilité, reporting… selon vos priorités.'
      },
      {
        question: 'Qu\'apporte l\'IoT à mon activité ?',
        answer: 'Il permet de connecter vos équipements pour collecter des données en temps réel, améliorer la traçabilité et anticiper les anomalies.'
      },
      {
        question: 'Faut-il remplacer les machines existantes pour passer à l\'industrie 4.0 ?',
        answer: 'Pas forcément. Nous proposons des solutions compatibles avec vos installations actuelles (ajout de capteurs, passerelles, logiciels…).'
      },
      {
        question: 'Comment sont exploitées les données collectées ?',
        answer: 'Elles sont analysées via des tableaux de bord pour optimiser vos prises de décision, améliorer vos performances et détecter les points faibles.'
      },
      {
        question: 'Est-ce que l\'analyse de données nécessite un personnel spécialisé ?',
        answer: 'Non. Nous mettons en place des interfaces simples, accessibles à vos équipes, avec un accompagnement à la prise en main.'
      },
      {
        question: 'Quelle est la valeur ajoutée de l\'optimisation continue ?',
        answer: 'Elle permet d\'améliorer durablement la productivité, de réduire les pertes et d\'adapter rapidement vos processus aux changements.'
      },
      {
        question: 'Vos solutions sont-elles évolutives ?',
        answer: 'Oui, elles sont conçues pour s\'adapter à vos besoins futurs, avec des modules et fonctionnalités extensibles à tout moment.'
      }
    ],
    metaDescription: 'Solutions Industrie 4.0 au Maroc : IoT, vision industrielle, MES, et digitalisation pour une usine intelligente et connectée.'
  },
  {
    id: '3',
    slug: 'achat-stockage',
    icon: HiCube,
    title: 'Achat & Stockage',
    shortDescription: 'Nous optimisons votre chaîne d\'approvisionnement en intégrant des solutions efficaces d\'achat et de gestion des stocks, adaptées à vos besoins opérationnels et à vos contraintes logistiques.',
    fullDescription: 'Notre approche intègre : Sélection fournisseurs avec identification de partenaires fiables et compétitifs pour garantir qualité, coût et délai. Gestion des approvisionnements avec planification des achats en lien avec les besoins réels et la capacité de stockage. Optimisation des stocks avec mise en place de systèmes de suivi et de réapprovisionnement automatisé pour éviter les ruptures et les surstocks. Traçabilité & sécurité avec organisation des flux et des emplacements pour garantir la disponibilité, la conformité et la sécurité des produits. Grâce à notre expertise, nous renforçons la performance de vos achats et de votre logistique interne, en assurant un pilotage efficace, durable et maîtrisé.',
    features: [
      'Sélection fournisseurs',
      'Gestion des approvisionnements',
      'Optimisation des stocks',
      'Traçabilité & sécurité'
    ],
    benefits: [
      'Un partenariat stratégique au service de la performance',
      'Anticiper, sécuriser, maîtriser',
      'Équilibre entre disponibilité et rentabilité',
      'Maîtriser vos flux, sécuriser vos opérations'
    ],
    sections: [
      {
        title: 'Sélection fournisseurs : un partenariat stratégique au service de la performance',
        content: 'Nous vous accompagnons dans l\'identification et la sélection de partenaires fiables et compétitifs. Notre analyse multicritère (qualité, délais, coûts, certifications) garantit des collaborations durables et performantes pour sécuriser vos approvisionnements.'
      },
      {
        title: 'Gestion des approvisionnements : anticiper, sécuriser, maîtriser',
        content: 'Nous planifions vos achats en analysant vos besoins réels, délais fournisseurs et capacités de stockage. L\'objectif : garantir la disponibilité des matières tout en évitant surstocks et ruptures pour une continuité d\'activité optimale.'
      },
      {
        title: 'Optimisation des stocks : équilibre entre disponibilité et rentabilité',
        content: 'Nous analysons vos flux et fréquences de consommation pour optimiser vos niveaux de stock. Stratégies de réapprovisionnement intelligent, alertes de seuils et organisation des emplacements pour une gestion fluide, fiable et économique.'
      },
      {
        title: 'Traçabilité & sécurité : maîtriser vos flux, sécuriser vos opérations',
        content: 'Systèmes de traçabilité performants pour un suivi précis des produits de l\'approvisionnement à la livraison. Dispositifs de sécurité physique et numérique pour protéger vos stocks et garantir la conformité de vos opérations.'
      }
    ],
    faqs: [
      {
        question: 'Comment sélectionnez-vous les fournisseurs ?',
        answer: 'Nous évaluons chaque fournisseur selon des critères précis : fiabilité, qualité, délai, coût, conformité et capacité de production, afin de garantir des partenariats durables et performants.'
      },
      {
        question: 'Accompagnez-vous la négociation avec les fournisseurs ?',
        answer: 'Oui. Nous vous assistons dans la négociation des conditions d\'achat pour optimiser vos coûts tout en sécurisant vos approvisionnements.'
      },
      {
        question: 'Que proposez-vous en gestion des approvisionnements ?',
        answer: 'Nous planifions les achats en fonction de vos besoins réels, délais et capacités de stockage pour éviter les ruptures ou surstocks.'
      },
      {
        question: 'Peut-on automatiser le réapprovisionnement ?',
        answer: 'Absolument. Nous mettons en place des systèmes de seuils critiques et des outils de réapprovisionnement automatisé selon vos flux.'
      },
      {
        question: 'Comment optimisez-vous les niveaux de stock ?',
        answer: 'En analysant les consommations, la saisonnalité et les délais d\'approvisionnement, nous ajustons vos stocks pour allier réactivité et rentabilité.'
      },
      {
        question: 'Est-ce que vos solutions permettent une traçabilité complète ?',
        answer: 'Oui. Chaque article peut être suivi depuis son entrée jusqu\'à sa sortie grâce à des systèmes d\'étiquetage, de scan ou de code-barres.'
      },
      {
        question: 'Quelles mesures prenez-vous pour la sécurité des stocks ?',
        answer: 'Nous mettons en place des procédures d\'accès, de contrôle et d\'organisation physique sécurisée pour protéger vos marchandises.'
      },
      {
        question: 'Vos solutions s\'intègrent-elles avec un ERP ou logiciel existant ?',
        answer: 'Oui. Nos outils sont compatibles avec les principaux ERP et peuvent être adaptés à votre environnement numérique actuel.'
      }
    ],
    metaDescription: 'Services d\'achat et stockage au Maroc : sourcing international, gestion des stocks, entreposage sécurisé et optimisation des approvisionnements.'
  },
  {
    id: '4',
    slug: 'gestion-maintenance',
    icon: HiBeaker,
    title: 'Gestion & Maintenance',
    shortDescription: 'Nous assurons la fiabilité, la durabilité et la performance de vos équipements industriels à travers une gestion rigoureuse et une maintenance adaptée à vos besoins.',
    fullDescription: 'Notre approche intègre : Maintenance préventive avec planification des interventions pour éviter les pannes et garantir la disponibilité des machines. Maintenance curative avec réactivité en cas de dysfonctionnement pour minimiser les arrêts de production. Suivi technique structuré avec traçabilité des actions, gestion des historiques et indicateurs de performance. Optimisation des ressources avec organisation efficace des équipes et des outils pour une maintenance rentable et maîtrisée. Grâce à notre savoir-faire opérationnel, nous vous aidons à prolonger la durée de vie de vos installations, à réduire les coûts d\'entretien et à garantir une continuité de service optimale.',
    features: [
      'Maintenance préventive',
      'Maintenance curative',
      'Suivi technique structuré',
      'Optimisation des ressources'
    ],
    benefits: [
      'Anticiper pour mieux produire',
      'Agir vite pour relancer la production',
      'Garder le contrôle en toute transparence',
      'Une gestion efficace au quotidien'
    ],
    sections: [
      {
        title: 'Maintenance préventive : anticiper pour mieux produire',
        content: 'La maintenance préventive est essentielle pour garantir la fiabilité et la longévité de vos équipements industriels. Chez Leanmover, nous établissons des plans d\'entretien adaptés à chaque installation afin d\'éviter les pannes imprévues et les arrêts de production coûteux. En anticipant les défaillances grâce à des contrôles réguliers et des opérations ciblées, nous assurons la disponibilité constante de vos machines, tout en réduisant les coûts liés aux réparations d\'urgence. Notre approche structurée vous permet de gagner en sérénité, en performance et en productivité.'
      },
      {
        title: 'Maintenance curative : agir vite pour relancer la production',
        content: 'Malgré toutes les précautions, un incident technique peut survenir. Dans ce cas, notre priorité est de réagir rapidement et efficacement. LeanMover mobilise ses équipes pour diagnostiquer la panne, réparer l\'équipement et remettre la production en service dans les délais les plus courts. Notre expérience terrain et notre réactivité nous permettent de limiter les pertes de temps et d\'assurer la continuité de vos activités. Chaque intervention curative est également analysée pour en tirer des enseignements, et éviter qu\'un problème similaire ne se reproduise.'
      },
      {
        title: 'Suivi technique structuré : garder le contrôle en toute transparence',
        content: 'Une bonne gestion de la maintenance repose sur une traçabilité rigoureuse. C\'est pourquoi nous mettons en place des outils numériques pour centraliser les données techniques, historiser les interventions et générer des indicateurs de performance. Vous avez ainsi une visibilité complète sur l\'état de vos équipements, les actions réalisées, les points de vigilance, et les priorités à venir. Cette transparence favorise une prise de décision rapide et éclairée, tout en structurant la gestion de vos actifs industriels de manière durable et efficace.'
      },
      {
        title: 'Optimisation des ressources : une gestion efficace au quotidien',
        content: 'Gérer efficacement la maintenance, c\'est aussi optimiser les ressources humaines, matérielles et logistiques mobilisées. LeanMover vous aide à structurer vos équipes d\'intervention, à planifier les tâches en fonction des priorités et à anticiper les besoins en pièces détachées ou en sous-traitance. Nous cherchons en permanence à rationaliser les coûts, tout en maintenant un haut niveau de qualité et de sécurité. Cette démarche d\'optimisation vous permet de mieux piloter vos opérations, de réduire les gaspillages et de concentrer vos efforts sur la performance globale.'
      }
    ],
    faqs: [
      {
        question: 'Proposez-vous des plans de maintenance préventive personnalisés ?',
        answer: 'Oui, nous établissons des plans sur mesure adaptés à vos équipements, à leur fréquence d\'utilisation et aux contraintes de votre activité.'
      },
      {
        question: 'Que faire en cas de panne soudaine ?',
        answer: 'Nos équipes interviennent rapidement pour diagnostiquer et réparer les dysfonctionnements, avec un objectif clair : minimiser les arrêts de production.'
      },
      {
        question: 'Comment suivez-vous les opérations de maintenance ?',
        answer: 'Nous utilisons des outils numériques pour assurer une traçabilité complète : historique des interventions, suivi des pièces, alertes, et indicateurs de performance.'
      },
      {
        question: 'Est-ce que vous intervenez sur site ou à distance ?',
        answer: 'Nous intervenons principalement sur site, mais certaines actions de diagnostic ou de suivi peuvent être réalisées à distance selon les cas.'
      },
      {
        question: 'Travaillez-vous avec des équipements de toutes marques ?',
        answer: 'Oui, notre équipe est formée pour intervenir sur une large gamme d\'équipements industriels, quelle que soit la marque ou l\'année de fabrication.'
      },
      {
        question: 'Proposez-vous une maintenance prédictive ?',
        answer: 'Oui, lorsque les données le permettent, nous mettons en place une approche prédictive basée sur l\'analyse en temps réel pour anticiper les défaillances.'
      },
      {
        question: 'Pouvez-vous former nos équipes internes à la maintenance ?',
        answer: 'Absolument. Nous proposons des formations ciblées pour renforcer l\'autonomie de vos équipes et structurer la gestion technique en interne.'
      },
      {
        question: 'Est-ce que vos services s\'intègrent avec un logiciel de GMAO ?',
        answer: 'Oui, nos solutions sont compatibles avec les principales GMAO du marché et peuvent aussi être adaptées à vos outils existants.'
      }
    ],
    metaDescription: 'Services de gestion et maintenance industrielle au Maroc : maintenance préventive, curative, GMAO et optimisation de la disponibilité.'
  },
  {
    id: '5',
    slug: 'machines-speciales-automatisation',
    icon: HiLightningBolt,
    title: 'Machines Spéciales & Automatisation',
    shortDescription: 'Nous concevons et réalisons des machines spéciales et des solutions d\'automatisation sur mesure pour répondre aux besoins spécifiques de vos processus industriels.',
    fullDescription: 'Notre approche intègre : Conception de machines spéciales avec étude technique détaillée, modélisation 3D et fabrication de systèmes adaptés à vos cahiers des charges. Automatisation des processus avec intégration de systèmes robotisés, convoyeurs et équipements automatiques pour améliorer la productivité. Programmation et contrôle avec développement d\'automates (PLC), d\'interfaces homme-machine (IHM) et de systèmes de supervision. Intégration et mise en service avec installation, tests, formation et accompagnement jusqu\'à la pleine autonomie opérationnelle. Grâce à notre expertise en mécanique, automatisme et robotique, nous transformons vos idées en solutions industrielles concrètes, fiables et performantes.',
    features: [
      'Conception de machines spéciales',
      'Automatisation des processus',
      'Programmation et contrôle',
      'Intégration et mise en service'
    ],
    benefits: [
      'Des solutions uniques pour des besoins spécifiques',
      'Gain de productivité et qualité constante',
      'Intelligence embarquée et pilotage précis',
      'Accompagnement complet jusqu\'à l\'autonomie'
    ],
    sections: [
      {
        title: 'Conception de machines spéciales : des solutions uniques pour des besoins spécifiques',
        content: 'Chaque process industriel a ses particularités. Lorsque les machines standards ne répondent pas à vos exigences, nous concevons des machines spéciales sur mesure. Notre bureau d\'études analyse votre besoin, définit les fonctionnalités requises, réalise la conception mécanique et électrique, puis pilote la fabrication jusqu\'à la livraison. Nous privilégions une approche collaborative pour garantir que chaque machine soit parfaitement adaptée à votre environnement, vos contraintes et vos objectifs de performance. Résultat : un équipement unique, fiable et optimisé pour votre activité.'
      },
      {
        title: 'Automatisation des processus : gain de productivité et qualité constante',
        content: 'L\'automatisation permet de réduire la pénibilité, d\'augmenter les cadences et de garantir une qualité de production constante. Chez Leanmover, nous intégrons des systèmes automatisés adaptés à vos lignes de production : robots industriels, systèmes de manutention automatique, convoyeurs intelligents, stations de contrôle... Nous étudions chaque étape de votre processus pour identifier les opérations à automatiser et proposer des solutions techniques éprouvées. Notre objectif : améliorer votre compétitivité tout en préservant la flexibilité de vos installations.'
      },
      {
        title: 'Programmation et contrôle : intelligence embarquée et pilotage précis',
        content: 'Une machine ou un système automatisé ne peut être performant sans une programmation rigoureuse et un contrôle précis. Nos ingénieurs maîtrisent les automates programmables (PLC), les systèmes de supervision (SCADA), et les interfaces homme-machine (IHM) pour piloter vos équipements avec fiabilité et réactivité. Nous développons des programmes sur mesure, intégrons des capteurs et actionneurs, et mettons en place des logiques de sécurité conformes aux normes. Vous disposez ainsi d\'un système intelligent, facile à utiliser et évolutif selon vos besoins futurs.'
      },
      {
        title: 'Intégration et mise en service : accompagnement complet jusqu\'à l\'autonomie',
        content: 'La réussite d\'un projet d\'automatisation repose aussi sur la qualité de son intégration. Nous prenons en charge l\'installation complète de vos équipements, les tests de mise en route, les réglages de performance et la formation de vos équipes. Notre accompagnement ne s\'arrête pas à la livraison : nous restons à vos côtés pour garantir un démarrage en douceur, résoudre d\'éventuels ajustements et assurer le transfert de compétences. Vous gagnez ainsi en autonomie et en maîtrise technique dès les premiers jours de production.'
      }
    ],
    faqs: [
      {
        question: 'Que signifie « machine spéciale » ?',
        answer: 'C\'est un équipement conçu et fabriqué sur mesure pour répondre à un besoin industriel précis qui ne peut être satisfait par une machine standard du marché.'
      },
      {
        question: 'Quels types de processus peuvent être automatisés ?',
        answer: 'Tous types : assemblage, manutention, conditionnement, contrôle qualité, palettisation, tri, découpe, soudure… selon vos besoins et votre secteur d\'activité.'
      },
      {
        question: 'Travaillez-vous avec des robots industriels ?',
        answer: 'Oui, nous intégrons des robots (articulés, collaboratifs, cartésiens…) pour des applications d\'assemblage, de manutention, de soudure, etc.'
      },
      {
        question: 'Faut-il remplacer nos équipements existants ?',
        answer: 'Pas nécessairement. Nous pouvons automatiser ou moderniser des machines existantes en ajoutant des modules d\'automatisation adaptés.'
      },
      {
        question: 'Quelles marques d\'automates utilisez-vous ?',
        answer: 'Nous travaillons avec les principales marques du marché (Siemens, Schneider, Allen-Bradley, Omron…) selon vos préférences et votre parc existant.'
      },
      {
        question: 'Proposez-vous la maintenance des machines que vous concevez ?',
        answer: 'Oui, nous assurons la maintenance préventive et curative, ainsi que la fourniture de pièces détachées pour garantir la longévité de vos équipements.'
      },
      {
        question: 'Formez-vous nos équipes à l\'utilisation des machines ?',
        answer: 'Absolument. Nous dispensons des formations pratiques pour vos opérateurs et techniciens afin de garantir une prise en main rapide et efficace.'
      },
      {
        question: 'Combien de temps prend un projet de machine spéciale ?',
        answer: 'Cela dépend de la complexité, mais en général, un projet complet (étude, fabrication, intégration) prend entre 3 et 12 mois.'
      }
    ],
    metaDescription: 'Conception de machines spéciales et automatisation industrielle au Maroc : robotique, automates, systèmes sur-mesure pour vos processus.'
  },
  {
    id: '6',
    slug: 'warehousing-logistique',
    icon: HiTruck,
    title: 'Warehousing & Logistique',
    shortDescription: 'Nous optimisons vos opérations d\'entreposage et vos flux logistiques internes pour garantir rapidité, fiabilité et efficacité dans la gestion de vos marchandises.',
    fullDescription: 'Notre approche intègre : Conception d\'entrepôts avec aménagement optimal des espaces, circuits de circulation et zones fonctionnelles adaptées à votre activité. Gestion des flux intralogistiques avec organisation des mouvements de marchandises pour fluidifier les opérations et réduire les temps de manutention. Systèmes de gestion d\'entrepôt (WMS) pour piloter en temps réel les entrées, sorties, stocks et préparations de commandes. Picking et expédition avec optimisation des processus de préparation et de conditionnement pour garantir la qualité et la rapidité de livraison. Grâce à notre expertise en warehousing, nous transformons vos entrepôts en centres logistiques performants, réactifs et parfaitement adaptés à vos besoins opérationnels.',
    features: [
      'Conception d\'entrepôts',
      'Gestion des flux intralogistiques',
      'Systèmes de gestion d\'entrepôt (WMS)',
      'Picking et expédition'
    ],
    benefits: [
      'Des espaces pensés pour la performance',
      'Des mouvements fluides et maîtrisés',
      'Un pilotage intelligent en temps réel',
      'Une préparation rapide et fiable'
    ],
    sections: [
      {
        title: 'Conception d\'entrepôts : des espaces pensés pour la performance',
        content: 'La conception d\'un entrepôt efficace repose sur une analyse fine de vos besoins, de vos flux et de vos contraintes. Chez Leanmover, nous étudions l\'implantation optimale des zones de réception, stockage, préparation et expédition pour maximiser l\'utilisation de l\'espace et minimiser les déplacements. Nous intégrons également les aspects de sécurité, d\'ergonomie et d\'évolutivité pour créer un environnement de travail performant et durable. Que vous construisiez un nouvel entrepôt ou réaménagiez une infrastructure existante, notre expertise vous garantit une solution sur mesure, fonctionnelle et rentable.'
      },
      {
        title: 'Gestion des flux intralogistiques : des mouvements fluides et maîtrisés',
        content: 'La fluidité des flux internes est essentielle pour garantir la productivité de votre entrepôt. Nous analysons vos processus de réception, de stockage, de préparation et d\'expédition pour identifier les points de congestion et les opportunités d\'optimisation. En organisant les circuits de circulation, en définissant des méthodes de travail claires et en synchronisant les opérations, nous réduisons les temps de manutention, limitons les erreurs et améliorons la réactivité globale. Une logistique interne bien maîtrisée, c\'est un gain de temps, une meilleure qualité de service et des coûts optimisés.'
      },
      {
        title: 'Systèmes de gestion d\'entrepôt (WMS) : un pilotage intelligent en temps réel',
        content: 'Un WMS (Warehouse Management System) vous permet de piloter l\'ensemble de vos opérations d\'entreposage avec précision et réactivité. Chez Leanmover, nous mettons en place des solutions WMS adaptées à votre environnement pour gérer les entrées, les sorties, les emplacements, les stocks et les préparations de commandes en temps réel. Grâce à une traçabilité complète, des alertes automatiques et des tableaux de bord intuitifs, vous gagnez en visibilité, en contrôle et en efficacité. Le WMS devient le cerveau de votre entrepôt, garantissant performance, fiabilité et agilité au quotidien.'
      },
      {
        title: 'Picking et expédition : une préparation rapide et fiable',
        content: 'La préparation de commandes et l\'expédition sont des étapes clés de votre chaîne logistique. Nous optimisons vos méthodes de picking (par vague, par zone, par article…) pour réduire les temps de préparation tout en garantissant la qualité et la précision. Nous organisons également les zones d\'expédition, les processus de contrôle et de conditionnement, ainsi que la coordination avec les transporteurs pour assurer des livraisons dans les délais. Résultat : des commandes préparées plus rapidement, moins d\'erreurs, et une satisfaction client renforcée.'
      }
    ],
    faqs: [
      {
        question: 'Quelle est la différence entre warehousing et stockage ?',
        answer: 'Le stockage consiste simplement à entreposer des marchandises. Le warehousing englobe toute la gestion opérationnelle de l\'entrepôt : réception, préparation, expédition, traçabilité et optimisation des flux.'
      },
      {
        question: 'Proposez-vous des audits d\'entrepôt existants ?',
        answer: 'Oui, nous analysons vos installations actuelles pour identifier les axes d\'amélioration en termes d\'aménagement, de flux, de méthodes et d\'outils.'
      },
      {
        question: 'Comment optimisez-vous les flux intralogistiques ?',
        answer: 'Nous cartographions vos processus, identifions les goulots d\'étranglement et réorganisons les circuits pour réduire les déplacements inutiles et fluidifier les opérations.'
      },
      {
        question: 'Qu\'est-ce qu\'un WMS et pourquoi l\'utiliser ?',
        answer: 'Un WMS (Warehouse Management System) est un logiciel qui pilote toutes les opérations d\'entrepôt en temps réel. Il améliore la traçabilité, réduit les erreurs et optimise la productivité.'
      },
      {
        question: 'Vos solutions WMS sont-elles compatibles avec nos systèmes existants ?',
        answer: 'Oui, nous proposons des solutions WMS qui s\'intègrent avec vos ERP, TMS et autres systèmes de gestion existants.'
      },
      {
        question: 'Comment améliorez-vous la préparation de commandes ?',
        answer: 'Nous analysons vos méthodes de picking, réorganisons les emplacements, mettons en place des outils d\'aide (codes-barres, terminaux mobiles…) et formons vos équipes.'
      },
      {
        question: 'Intervenez-vous sur la conception de nouveaux entrepôts ?',
        answer: 'Absolument. Nous accompagnons les projets de construction ou de réaménagement d\'entrepôts de A à Z : études, plans, implantation, équipements et mise en service.'
      },
      {
        question: 'Peut-on automatiser certaines opérations de warehousing ?',
        answer: 'Oui. Selon vos volumes et vos besoins, nous pouvons intégrer des systèmes automatisés : convoyeurs, transstockeurs, robots de picking, etc.'
      }
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
