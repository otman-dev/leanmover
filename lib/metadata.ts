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
      url,
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
      canonical: url
    },
    
    verification: {
      google: 'google-site-verification-code',
      // Add other verification codes as needed
    }
  };
}
