export interface Certification {
  name: string;
  description: string;
  year?: string;
  pdfPath?: string;
  registrationNumber?: string;
  validUntil?: string;
  scope?: string;
}

export const certifications: Certification[] = [
  {
    name: "AENOR ISO 9001:2015",
    description: "Système de management de la qualité",
    scope: "Services de conseil en logistique",
    registrationNumber: "ES-0540/2024",
    year: "2024",
    validUntil: "2027",
    pdfPath: "/certificates/Certif1leanmover.pdf"
  },
  {
    name: "IQNET ISO 9001:2015",
    description: "Certification internationale qualité",
    scope: "Services de conseil en logistique",
    registrationNumber: "ES-0540/2024",
    year: "2024",
    validUntil: "2027",
    pdfPath: "/certificates/Certif2Leanmover.pdf"
  }
];
