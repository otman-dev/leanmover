import { companyInfo } from '@/data/company';
import { Service } from '@/data/services';
import { Certification } from '@/data/certifications';

// Organization Schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyInfo.name,
    legalName: companyInfo.legalName,
    url: companyInfo.website,
    logo: `${companyInfo.website}/images/logo.png`,
    description: companyInfo.description,
    email: companyInfo.email,
    telephone: companyInfo.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: companyInfo.address.city,
      addressRegion: companyInfo.address.region,
      addressCountry: companyInfo.address.countryCode
    },
    sameAs: [
      companyInfo.social.linkedin,
      companyInfo.social.facebook,
      companyInfo.social.twitter,
      companyInfo.social.youtube
    ]
  };
}

// Local Business Schema
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: companyInfo.name,
    image: `${companyInfo.website}/images/logo.png`,
    '@id': companyInfo.website,
    url: companyInfo.website,
    telephone: companyInfo.phone,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo.address.street,
      addressLocality: companyInfo.address.city,
      addressRegion: companyInfo.address.region,
      addressCountry: companyInfo.address.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.5731,
      longitude: -7.5898
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    ]
  };
}

// Service Schema
export function generateServiceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.fullDescription,
    provider: {
      '@type': 'Organization',
      name: companyInfo.name,
      url: companyInfo.website
    },
    areaServed: {
      '@type': 'Country',
      name: 'Morocco'
    },
    serviceType: service.title,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock'
    }
  };
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${companyInfo.website}${item.url}`
    }))
  };
}

// Article Schema (for blog posts)
export function generateArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || companyInfo.seo.ogImage,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: companyInfo.name,
      logo: {
        '@type': 'ImageObject',
        url: `${companyInfo.website}/images/logo.png`
      }
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    }
  };
}

// FAQ Schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// Certification Schema
export function generateCertificationSchema(cert: Certification) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Certification',
    name: cert.name,
    description: cert.description,
    credentialCategory: 'ISO Certification',
    recognizedBy: {
      '@type': 'Organization',
      name: cert.name.split(' ')[0] // AENOR or IQNET
    }
  };
}
