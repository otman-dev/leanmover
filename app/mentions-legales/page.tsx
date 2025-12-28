import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { companyInfo } from '@/data/company';

export const metadata: Metadata = generateMetadata({
  title: 'Mentions Légales',
  description: 'Mentions légales de Leanmover - Informations juridiques et légales de notre société.',
  path: '/mentions-legales'
});

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 sm:py-20 pt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Mentions Légales
              </h1>
              <p className="text-lg sm:text-xl text-blue-100">
                Informations juridiques et légales
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8 sm:p-12 space-y-8">
              
              {/* Éditeur du site */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Éditeur du site</h2>
                <div className="text-gray-700 space-y-2">
                  <p><strong>Raison sociale :</strong> {companyInfo.legalName}</p>
                  <p><strong>Adresse :</strong> {companyInfo.address.street}, {companyInfo.address.city}, {companyInfo.address.country}</p>
                  <p><strong>Téléphone :</strong> {companyInfo.phone}</p>
                  <p><strong>Email :</strong> {companyInfo.email}</p>
                  <p><strong>Site web :</strong> {companyInfo.website}</p>
                </div>
              </div>

              {/* Directeur de publication */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Directeur de la publication</h2>
                <p className="text-gray-700">
                  Le directeur de la publication du site est le représentant légal de {companyInfo.legalName}.
                </p>
              </div>

              {/* Hébergement */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Hébergement</h2>
                <p className="text-gray-700">
                  Le site {companyInfo.website} est hébergé par un prestataire d'hébergement web professionnel.
                  Les données techniques relatives à l'hébergement sont disponibles sur demande.
                </p>
              </div>

              {/* Propriété intellectuelle */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Propriété intellectuelle</h2>
                <p className="text-gray-700 mb-4">
                  L'ensemble de ce site relève de la législation marocaine et internationale sur le droit d'auteur 
                  et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour 
                  les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p className="text-gray-700">
                  La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est 
                  formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
              </div>

              {/* Crédits */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Crédits</h2>
                <p className="text-gray-700">
                  Le site {companyInfo.website} a été conçu et développé par l'équipe {companyInfo.name}.
                  Les photographies et illustrations utilisées sur le site sont la propriété de {companyInfo.name} 
                  ou utilisées avec l'autorisation de leurs auteurs respectifs.
                </p>
              </div>

              {/* Limitation de responsabilité */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation de responsabilité</h2>
                <p className="text-gray-700 mb-4">
                  Les informations contenues sur ce site sont aussi précises que possible et le site est 
                  périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions 
                  ou des lacunes.
                </p>
                <p className="text-gray-700">
                  {companyInfo.name} ne pourra être tenu responsable des dommages directs et indirects causés 
                  au matériel de l'utilisateur, lors de l'accès au site {companyInfo.website}.
                </p>
              </div>

              {/* Liens hypertextes */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Liens hypertextes</h2>
                <p className="text-gray-700">
                  Le site {companyInfo.website} peut contenir des liens hypertextes vers d'autres sites présents 
                  sur le réseau Internet. Les liens vers ces autres ressources vous font quitter le site {companyInfo.website}. 
                  {companyInfo.name} ne saurait être responsable du contenu de ces sites externes.
                </p>
              </div>

              {/* Droit applicable */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Droit applicable</h2>
                <p className="text-gray-700">
                  Le présent site et les présentes conditions d'utilisation du site sont régis par le droit marocain. 
                  Tout litige sera de la compétence exclusive des tribunaux du Royaume du Maroc.
                </p>
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
