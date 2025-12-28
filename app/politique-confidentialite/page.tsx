import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { companyInfo } from '@/data/company';

export const metadata: Metadata = generateMetadata({
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité de Leanmover - Protection et traitement de vos données personnelles.',
  path: '/politique-confidentialite'
});

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 sm:py-20 pt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Politique de Confidentialité
              </h1>
              <p className="text-lg sm:text-xl text-blue-100">
                Protection et traitement de vos données personnelles
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8 sm:p-12 space-y-8">
              
              {/* Introduction */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-700 mb-4">
                  La présente Politique de Confidentialité décrit comment {companyInfo.name} collecte, utilise, 
                  partage et protège les informations personnelles des utilisateurs de notre site web {companyInfo.website}.
                </p>
                <p className="text-gray-700">
                  Nous nous engageons à protéger votre vie privée et à traiter vos données personnelles de manière 
                  responsable et conforme à la législation marocaine en vigueur, notamment la loi n° 09-08 relative 
                  à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.
                </p>
              </div>

              {/* Données collectées */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Données collectées</h2>
                <p className="text-gray-700 mb-4">
                  Nous pouvons collecter les types de données personnelles suivants :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Informations d'identification : nom, prénom, adresse email, numéro de téléphone</li>
                  <li>Informations professionnelles : nom de l'entreprise, fonction, secteur d'activité</li>
                  <li>Données de navigation : adresse IP, type de navigateur, pages visitées, durée de visite</li>
                  <li>Informations de contact : messages envoyés via nos formulaires de contact</li>
                </ul>
              </div>

              {/* Utilisation des données */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Utilisation des données</h2>
                <p className="text-gray-700 mb-4">
                  Les données personnelles collectées sont utilisées pour :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Répondre à vos demandes de contact et de devis</li>
                  <li>Vous fournir des informations sur nos services</li>
                  <li>Améliorer notre site web et nos services</li>
                  <li>Vous envoyer des communications marketing (avec votre consentement)</li>
                  <li>Respecter nos obligations légales et réglementaires</li>
                  <li>Prévenir la fraude et garantir la sécurité de notre site</li>
                </ul>
              </div>

              {/* Base légale */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Base légale du traitement</h2>
                <p className="text-gray-700 mb-4">
                  Le traitement de vos données personnelles repose sur :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Votre consentement</strong> : pour l'envoi de communications marketing</li>
                  <li><strong>L'exécution d'un contrat</strong> : pour traiter vos demandes de services</li>
                  <li><strong>Nos intérêts légitimes</strong> : pour améliorer nos services et assurer la sécurité</li>
                  <li><strong>Les obligations légales</strong> : pour respecter la législation applicable</li>
                </ul>
              </div>

              {/* Partage des données */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Partage des données</h2>
                <p className="text-gray-700 mb-4">
                  Nous ne vendons ni ne louons vos données personnelles à des tiers. Nous pouvons partager 
                  vos informations avec :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Nos prestataires de services (hébergement web, services de messagerie électronique)</li>
                  <li>Nos partenaires commerciaux (uniquement avec votre consentement explicite)</li>
                  <li>Les autorités compétentes (si requis par la loi)</li>
                </ul>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies</h2>
                <p className="text-gray-700 mb-4">
                  Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont 
                  de petits fichiers texte stockés sur votre appareil. Nous utilisons :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Cookies essentiels</strong> : nécessaires au fonctionnement du site</li>
                  <li><strong>Cookies analytiques</strong> : pour comprendre comment vous utilisez notre site</li>
                  <li><strong>Cookies de performance</strong> : pour améliorer les performances du site</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Vous pouvez contrôler et/ou supprimer les cookies via les paramètres de votre navigateur.
                </p>
              </div>

              {/* Sécurité */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Sécurité des données</h2>
                <p className="text-gray-700">
                  Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour 
                  protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou 
                  destruction. Cependant, aucune méthode de transmission sur Internet n'est totalement sécurisée.
                </p>
              </div>

              {/* Conservation */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Conservation des données</h2>
                <p className="text-gray-700">
                  Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux finalités 
                  pour lesquelles elles ont été collectées, ou conformément aux exigences légales applicables. 
                  Les données de contact sont conservées jusqu'à ce que vous demandiez leur suppression ou que 
                  vous vous désinscriviez de nos communications.
                </p>
              </div>

              {/* Vos droits */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Vos droits</h2>
                <p className="text-gray-700 mb-4">
                  Conformément à la législation marocaine, vous disposez des droits suivants :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Droit d'accès</strong> : obtenir une copie de vos données personnelles</li>
                  <li><strong>Droit de rectification</strong> : corriger vos données inexactes ou incomplètes</li>
                  <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                  <li><strong>Droit de suppression</strong> : demander la suppression de vos données</li>
                  <li><strong>Droit de limitation</strong> : limiter le traitement dans certains cas</li>
                  <li><strong>Droit de retrait du consentement</strong> : retirer votre consentement à tout moment</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Pour exercer vos droits, contactez-nous à : <a href={`mailto:${companyInfo.email}`} className="text-blue-600 hover:underline">{companyInfo.email}</a>
                </p>
              </div>

              {/* Modifications */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modifications de la politique</h2>
                <p className="text-gray-700">
                  Nous nous réservons le droit de modifier cette Politique de Confidentialité à tout moment. 
                  Toute modification sera publiée sur cette page avec une date de mise à jour révisée. Nous vous 
                  encourageons à consulter régulièrement cette page.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact</h2>
                <p className="text-gray-700 mb-4">
                  Pour toute question concernant cette Politique de Confidentialité ou le traitement de vos 
                  données personnelles, vous pouvez nous contacter :
                </p>
                <div className="text-gray-700 space-y-2 bg-gray-50 p-6 rounded-xl">
                  <p><strong>{companyInfo.legalName}</strong></p>
                  <p>{companyInfo.address.street}</p>
                  <p>{companyInfo.address.city}, {companyInfo.address.country}</p>
                  <p>Email : <a href={`mailto:${companyInfo.email}`} className="text-blue-600 hover:underline">{companyInfo.email}</a></p>
                  <p>Téléphone : <a href={`tel:${companyInfo.phone.replace(/\s/g, '')}`} className="text-blue-600 hover:underline">{companyInfo.phone}</a></p>
                </div>
              </div>

              {/* Date de mise à jour */}
              <div className="pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Dernière mise à jour : Décembre 2025
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
