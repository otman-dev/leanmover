export interface LegalSection {
  id: string;
  title: string;
  content: string;
  category: 'mentions-legales' | 'politique-confidentialite';
}

export const legalContent: LegalSection[] = [
  // Mentions Légales
  {
    id: 'ml-1',
    title: 'Éditeur du Site - Mentions Légales',
    content: 'Le site internet leanmover.ma est édité par Leanmover SARL, société à responsabilité limitée au capital social de [montant], immatriculée au Registre du Commerce de Tanger. Siège social : Zone franche d\'exportation de Tanger, Tanger, Maroc. Email : contact@leanmover.ma. Téléphone : (+212) 808 647 383. Le directeur de la publication est le représentant légal de la société Leanmover SARL.',
    category: 'mentions-legales'
  },
  {
    id: 'ml-2',
    title: 'Propriété Intellectuelle',
    content: 'L\'ensemble du contenu présent sur le site leanmover.ma (textes, images, graphismes, logos, icônes, vidéos, sons, logiciels, bases de données, etc.) est la propriété exclusive de Leanmover ou de ses partenaires et est protégé par les lois marocaines et internationales relatives à la propriété intellectuelle. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sauf autorisation écrite préalable de Leanmover. Toute exploitation non autorisée du site ou de l\'un quelconque des éléments qu\'il contient sera considérée comme constitutive d\'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de la Propriété Intellectuelle.',
    category: 'mentions-legales'
  },
  {
    id: 'ml-3',
    title: 'Limitation de Responsabilité',
    content: 'Leanmover s\'efforce d\'assurer l\'exactitude et la mise à jour des informations diffusées sur le site leanmover.ma. Toutefois, Leanmover ne peut garantir l\'exactitude, la précision, l\'actualité ou l\'exhaustivité des informations mises à disposition sur ce site. En conséquence, l\'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive. Leanmover ne pourra être tenue responsable des dommages directs ou indirects résultant de l\'accès au site ou de l\'utilisation du site, y compris l\'inaccessibilité, les pertes de données, détériorations, destructions ou virus qui pourraient affecter l\'équipement informatique de l\'utilisateur, et/ou de la présence de virus sur son site. Leanmover décline toute responsabilité concernant les éventuels dysfonctionnements pouvant survenir sur le site.',
    category: 'mentions-legales'
  },
  {
    id: 'ml-4',
    title: 'Droit Applicable et Juridiction Compétente',
    content: 'Les présentes mentions légales sont régies par le droit marocain. En cas de litige et à défaut d\'accord amiable, le litige sera porté devant les tribunaux marocains compétents conformément aux règles de droit commun.',
    category: 'mentions-legales'
  },

  // Politique de Confidentialité
  {
    id: 'pc-1',
    title: 'Introduction - Politique de Confidentialité',
    content: 'Leanmover SARL, en tant que responsable du traitement, attache une grande importance à la protection de vos données personnelles et s\'engage à les traiter de manière responsable et conforme à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l\'égard du traitement des données à caractère personnel. La présente politique de confidentialité a pour objectif de vous informer de manière transparente sur les données personnelles que nous collectons, les raisons de cette collecte, l\'utilisation que nous en faisons, vos droits et les moyens de les exercer.',
    category: 'politique-confidentialite'
  },
  {
    id: 'pc-2',
    title: 'Données Collectées',
    content: 'Nous collectons différentes catégories de données personnelles selon votre interaction avec notre site : Données d\'identification (nom, prénom, fonction, entreprise). Données de contact (adresse email, numéro de téléphone, adresse postale). Données de connexion (adresse IP, logs de connexion, type de navigateur, pages consultées, durée de visite). Données issues de formulaires (demandes de devis, contact, newsletter, candidatures). Ces données sont collectées directement auprès de vous lorsque vous remplissez un formulaire, nous contactez ou naviguez sur notre site.',
    category: 'politique-confidentialite'
  },
  {
    id: 'pc-3',
    title: 'Utilisation des Données',
    content: 'Vos données personnelles sont utilisées pour les finalités suivantes : Traitement de vos demandes (devis, informations, contact). Communication commerciale et marketing (envoi de newsletters, d\'offres promotionnelles, d\'invitations à des événements), sous réserve de votre consentement. Amélioration de nos services et de notre site internet (analyses statistiques, études de satisfaction). Gestion de la relation client et suivi des projets. Respect de nos obligations légales et réglementaires. Défense de nos droits en cas de litige. Nous ne traitons vos données que dans le cadre des finalités pour lesquelles elles ont été collectées.',
    category: 'politique-confidentialite'
  },
  {
    id: 'pc-4',
    title: 'Base Légale du Traitement',
    content: 'Le traitement de vos données personnelles repose sur différentes bases légales : Votre consentement, notamment pour l\'envoi de communications marketing (que vous pouvez retirer à tout moment). L\'exécution d\'un contrat ou de mesures précontractuelles (traitement de vos demandes de devis, gestion de projets). Notre intérêt légitime à développer notre activité, améliorer nos services et assurer la sécurité de notre site. Le respect d\'obligations légales auxquelles nous sommes soumis.',
    category: 'politique-confidentialite'
  },
  {
    id: 'pc-5',
    title: 'Partage et Transfert des Données',
    content: 'Vos données personnelles peuvent être communiquées à : Nos services internes (équipes commerciales, marketing, technique, administrative). Nos sous-traitants et prestataires de services (hébergement web, outils CRM, services d\'emailing, services d\'analyse), dans le cadre strict de leur mission et sous engagement de confidentialité. Les autorités publiques, uniquement lorsque la loi l\'exige. Nous ne vendons jamais vos données personnelles à des tiers. Lorsque nos prestataires sont situés hors du Maroc, nous nous assurons qu\'un niveau de protection adéquat est garanti.',
    category: 'politique-confidentialite'
  },
  {
    id: 'pc-6',
    title: 'Cookies et Technologies Similaires',
    content: 'Notre site utilise des cookies et technologies similaires pour améliorer votre expérience de navigation. Types de cookies utilisés : Cookies strictement nécessaires (fonctionnement du site, sécurité, sessions utilisateur). Cookies de performance et d\'analyse (Google Analytics, mesure d\'audience, statistiques de fréquentation). Cookies de fonctionnalité (mémorisation de vos préférences, langue, paramètres). Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut limiter votre accès à certaines fonctionnalités du site. Pour plus d\'informations, consultez notre politique de gestion des cookies.',
    category: 'politique-confidentialite'
  },
  {
    id: 'pc-7',
    title: 'Sécurité des Données',
    content: 'Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour assurer la sécurité de vos données personnelles et empêcher leur altération, leur perte, ou l\'accès non autorisé par des tiers : Chiffrement SSL/TLS pour les transmissions de données sensibles. Contrôle d\'accès strict aux données (authentification, habilitations). Sauvegardes régulières et sécurisées. Sensibilisation et formation de nos collaborateurs à la protection des données. Contrats de confidentialité avec nos prestataires. Malgré toutes les précautions prises, aucun système n\'est totalement sûr. En cas d\'incident de sécurité, nous vous en informerons conformément à nos obligations légales.',
    category: 'politique-confidentialite'
  },
  {
    id: 'pc-8',
    title: 'Conservation des Données',
    content: 'Vos données personnelles sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées : Données de contact et demandes de devis : durée de la relation commerciale + 3 ans (prospection). Données de gestion de projets : durée du projet + 10 ans (obligations comptables et légales). Données de newsletter : jusqu\'à votre désinscription ou 3 ans d\'inactivité. Logs de connexion : 1 an maximum. Au-delà de ces durées, vos données sont supprimées ou anonymisées de manière irréversible.',
    category: 'politique-confidentialite'
  },
  {
    id: 'pc-9',
    title: 'Vos Droits sur vos Données Personnelles',
    content: 'Conformément à la loi marocaine n° 09-08, vous disposez des droits suivants concernant vos données personnelles : Droit d\'accès : obtenir une copie de vos données personnelles que nous détenons. Droit de rectification : corriger vos données personnelles si elles sont inexactes ou incomplètes. Droit d\'opposition : vous opposer au traitement de vos données pour des motifs légitimes. Droit d\'effacement : demander la suppression de vos données dans certains cas. Droit de retrait du consentement : retirer votre consentement à tout moment (notamment pour les communications marketing). Droit de réclamation : introduire une réclamation auprès de la Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel (CNDP) si vous estimez que vos droits ne sont pas respectés. Pour exercer vos droits, vous pouvez nous contacter à : Email : contact@leanmover.ma ou Courrier : Leanmover SARL, Zone franche d\'exportation de Tanger, Tanger, Maroc. Nous nous engageons à répondre à votre demande dans un délai maximum de 30 jours.',
    category: 'politique-confidentialite'
  },
  {
    id: 'pc-10',
    title: 'Contact et Réclamations',
    content: 'Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, vous pouvez nous contacter : Par email : contact@leanmover.ma. Par téléphone : (+212) 808 647 383. Par courrier : Leanmover SARL, Zone franche d\'exportation de Tanger, Tanger, Maroc. Si vous estimez que vos droits en matière de protection des données ne sont pas respectés, vous avez le droit d\'introduire une réclamation auprès de la Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel (CNDP) au Maroc.',
    category: 'politique-confidentialite'
  }
];
