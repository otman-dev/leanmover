import { Metadata } from 'next';
import { companyInfo } from '@/data/company';

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  path = '',
  image,
  noIndex = false
}: GenerateMetadataProps): Metadata {
  const fullTitle = title 
    ? `${title} | ${companyInfo.name}`
    : companyInfo.seo.defaultTitle;
  
  const metaDescription = description || companyInfo.seo.defaultDescription;
  const url = `${companyInfo.website}${path}`;
  const ogImage = image || companyInfo.seo.ogImage;
  
  const allKeywords = [...companyInfo.seo.keywords, ...keywords];

  return {
    metadataBase: new URL(companyInfo.website),
    title: fullTitle,
    description: metaDescription,
    keywords: allKeywords,
    authors: [{ name: companyInfo.name }],
    creator: companyInfo.name,
    publisher: companyInfo.name,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: path,
      title: fullTitle,
      description: metaDescription,
      siteName: companyInfo.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle
        }
      ]
    },
    
    twitter: {
      card: 'summary_large_image',
      site: companyInfo.seo.twitterHandle,
      creator: companyInfo.seo.twitterHandle,
      title: fullTitle,
      description: metaDescription,
      images: [ogImage]
    },
    
    alternates: {
      canonical: path
    },
    
    verification: {
      google: 'google-site-verification-code',
      // Add other verification codes as needed
    }
  };
}

export function generateBlogMetadata(): Metadata {
  return generateMetadata({
    title: 'Blog Industrial & Innovation',
    description: 'Découvrez notre blog sur l\'industrie 4.0, transformation digitale, IoT industriel et solutions d\'optimisation industrielle au Maroc. Articles d\'experts en automatisation, maintenance prédictive et efficacité énergétique.',
    keywords: [
      'blog industriel maroc',
      'articles industrie 4.0',
      'transformation digitale industrielle',
      'IoT industriel blog',
      'automatisation industrielle maroc',
      'maintenance prédictive articles',
      'efficacité énergétique industrielle',
      'innovation industrielle maroc',
      'conseils experts industrie',
      'optimisation processus industriels',
      'technologies industrielles',
      'smart manufacturing',
      'digital factory maroc',
      'lean manufacturing maroc',
      'GMAO casablanca'
    ],
    path: '/blog'
  });
}

export function generateAboutMetadata(): Metadata {
  return generateMetadata({
    title: 'À Propos - Expertise Industrie 4.0',
    description: `Découvrez ${companyInfo.name}, expert en transformation digitale industrielle au Maroc depuis 15 ans. Équipe de 25+ spécialistes en automatisation, IoT industriel et optimisation des processus industriels.`,
    keywords: [
      'lean mover maroc',
      'expert industrie 4.0 maroc',
      'transformation digitale industrielle',
      'équipe spécialistes industrie',
      'automatisation industrielle casablanca',
      'consultation industrie maroc',
      'ingénieurs automation maroc',
      'expertise IoT industriel',
      'optimisation processus maroc',
      'lean manufacturing maroc',
      'smart factory maroc',
      'digital transformation industry',
      'industrial consulting morocco'
    ],
    path: '/about'
  });
}

export function generateContactMetadata(): Metadata {
  return generateMetadata({
    title: 'Contact - Devis Industrie 4.0 Gratuit',
    description: `Contactez ${companyInfo.name} pour un devis gratuit en transformation digitale industrielle. Expertise IoT, automatisation et optimisation industrielle au Maroc. Réponse sous 24h garantie.`,
    keywords: [
      'contact lean mover',
      'devis industrie 4.0 maroc',
      'consultation gratuite industrie',
      'contact automatisation industrielle',
      'expert IoT industriel maroc',
      'devis transformation digitale',
      'contact optimisation industrielle',
      'conseil industrie 4.0 casablanca',
      'audit industriel gratuit maroc',
      'contact maintenance prédictive',
      'devis efficacité énergétique'
    ],
    path: '/contact'
  });
}

export function generateCertificationsMetadata(): Metadata {
  return generateMetadata({
    title: 'Certifications & Agréments Industrie 4.0',
    description: 'Nos certifications officielles en automatisation industrielle, IoT et transformation digitale. Agréments ISO, partenariats technologiques et formations certifiantes pour l\'industrie 4.0 au Maroc.',
    keywords: [
      'certifications industrie 4.0 maroc',
      'agréments automatisation industrielle',
      'certification IoT industriel',
      'iso industrie maroc',
      'certifications transformation digitale',
      'partenaires technologiques industrie',
      'formations certifiantes industrie 4.0',
      'qualifications ingénieurs automation',
      'certifications maintenance prédictive',
      'agréments efficacité énergétique'
    ],
    path: '/certifications'
  });
}

export function generateSolutionsMetadata(): Metadata {
  return generateMetadata({
    title: 'Solutions Industrielles & Cas d\'Usage',
    description: 'Découvrez nos réalisations en transformation digitale industrielle, automatisation et IoT au Maroc. Cas d\'usage concrets avec ROI démontrés dans l\'industrie 4.0, maintenance prédictive et optimisation énergétique.',
    keywords: [
      'solutions industrielles maroc',
      'cas usage industrie 4.0',
      'réalisations automatisation industrielle',
      'projets IoT industriel maroc',
      'transformation digitale cas clients',
      'ROI industrie 4.0 maroc',
      'optimisation industrielle réalisations',
      'maintenance prédictive projets',
      'efficacité énergétique cas usage',
      'lean manufacturing réalisations',
      'smart factory projets maroc',
      'GMAO implémentation maroc',
      'success stories industrie maroc',
      'portfolio industrial consulting'
    ],
    path: '/solutions'
  });
}
