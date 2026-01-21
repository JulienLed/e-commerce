import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Informations Légales</h1>

      <div className="space-y-8">
        {/* MENTIONS LÉGALES */}
        <Card id="mentions-legales">
          <CardHeader>
            <CardTitle className="text-3xl">Mentions Légales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Éditeur du site</h3>
              <p>
                <strong>Raison sociale :</strong> Smoke
                <br />
                <strong>Adresse :</strong> [Adresse fictive - Rue Example 123,
                1000 Bruxelles, Belgique]
                <br />
                <strong>Email :</strong> contact@smoke-shop.be
                <br />
                <strong>Téléphone :</strong> +32 2 XXX XX XX
                <br />
                <strong>Numéro d'entreprise :</strong> BE 0XXX.XXX.XXX
                <br />
                <strong>TVA :</strong> BE 0XXX.XXX.XXX
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Hébergement</h3>
              <p>
                Le site est hébergé par Vercel Inc.
                <br />
                440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Propriété intellectuelle
              </h3>
              <p>
                L'ensemble des éléments du site (textes, images, logos, vidéos)
                sont protégés par le droit d'auteur, le droit des marques et/ou
                tout autre droit de propriété intellectuelle. Toute
                reproduction, même partielle, est interdite sans autorisation
                préalable.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Cookies</h3>
              <p>
                Ce site utilise des cookies techniques nécessaires à son bon
                fonctionnement (authentification, panier d'achat). Vous pouvez
                les désactiver dans les paramètres de votre navigateur, mais
                certaines fonctionnalités du site pourraient ne plus être
                accessibles.
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <p className="font-semibold">Note importante</p>
              <p className="text-sm mt-2">
                Ce site est un projet portfolio à des fins de démonstration. Les
                transactions sont effectuées en mode test. Aucun produit réel
                n'est vendu ou livré.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CGV */}
        <Card id="cgv">
          <CardHeader>
            <CardTitle className="text-3xl">
              Conditions Générales de Vente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Article 1 - Objet</h3>
              <p>
                Les présentes conditions générales de vente régissent les
                relations contractuelles entre Smoke et tout client souhaitant
                effectuer un achat sur le site
                e-commerce-rho-blue-93.vercel.app.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Article 2 - Prix</h3>
              <p>
                Les prix sont indiqués en euros (EUR), toutes taxes comprises
                (TTC). Smoke se réserve le droit de modifier ses prix à tout
                moment, étant entendu que les produits seront facturés sur la
                base des tarifs en vigueur au moment de la validation de la
                commande.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Article 3 - Commande
              </h3>
              <p>Le processus de commande suit les étapes suivantes :</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Sélection des produits et ajout au panier</li>
                <li>Création d'un compte ou connexion</li>
                <li>
                  Validation du panier et saisie des informations de livraison
                </li>
                <li>Choix du mode de paiement et validation finale</li>
                <li>Confirmation de commande par email</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Article 4 - Paiement
              </h3>
              <p>
                Le règlement s'effectue par carte bancaire via notre prestataire
                de paiement sécurisé Stripe. Les cartes acceptées sont : Visa,
                Mastercard, American Express.
              </p>
              <p className="text-amber-600 font-semibold mt-2">
                ⚠️ Note : En mode démonstration, utilisez la carte test 4242
                4242 4242 4242
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Article 5 - Livraison
              </h3>
              <p>Les livraisons sont assurées en Belgique uniquement.</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Délai de livraison : 2 à 5 jours ouvrés</li>
                <li>
                  Frais de port : 5,00 € (gratuit à partir de 50 € d'achat)
                </li>
                <li>Transporteur : Bpost</li>
              </ul>
              <p className="text-amber-600 font-semibold mt-2">
                ⚠️ Simulation uniquement - aucune livraison réelle n'est
                effectuée
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Article 6 - Droit de rétractation
              </h3>
              <p>
                Conformément à la législation en vigueur, vous disposez d'un
                délai de 14 jours à compter de la réception de votre commande
                pour exercer votre droit de rétractation sans justification.
              </p>
              <p className="mt-2">
                <strong>Exception :</strong> Les produits d'hygiène descellés
                (e-liquides ouverts) ne peuvent être repris pour des raisons
                sanitaires évidentes.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Article 7 - Garanties
              </h3>
              <p>
                Tous nos produits bénéficient de la garantie légale de
                conformité (2 ans) et de la garantie des vices cachés
                conformément aux dispositions du Code Civil.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Article 8 - Responsabilité
              </h3>
              <p>
                Les produits proposés sont conformes à la législation belge et
                européenne en vigueur. La vente de cigarettes électroniques et
                e-liquides est strictement réservée aux personnes majeures (18
                ans et plus).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Article 9 - Données personnelles
              </h3>
              <p>
                Les données collectées font l'objet d'un traitement informatique
                destiné à la gestion des commandes. Conformément au RGPD, vous
                disposez d'un droit d'accès, de rectification et de suppression
                des données vous concernant. Voir notre Politique de
                Confidentialité pour plus de détails.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Article 10 - Litiges
              </h3>
              <p>
                En cas de litige, le client peut avoir recours à une procédure
                de médiation conventionnelle ou tout autre mode alternatif de
                règlement des différends. Le droit belge est applicable.
              </p>
            </div>

            <p className="text-sm text-slate-600 mt-6">
              Date de dernière mise à jour : Janvier 2025
            </p>
          </CardContent>
        </Card>

        {/* RGPD */}
        <Card id="confidentialite">
          <CardHeader>
            <CardTitle className="text-3xl">
              Politique de Confidentialité
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">
                1. Responsable du traitement
              </h3>
              <p>
                <strong>Raison sociale :</strong> Smoke
                <br />
                <strong>Email :</strong> contact@smoke-shop.be
                <br />
                <strong>Adresse :</strong> [Rue Example 123, 1000 Bruxelles,
                Belgique]
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                2. Données collectées
              </h3>
              <p>
                Dans le cadre de l'utilisation de notre site, nous collectons
                les données suivantes :
              </p>

              <h4 className="text-lg font-semibold mt-4 mb-2">
                Lors de la création de compte :
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Adresse email</li>
                <li>Nom et prénom</li>
                <li>Mot de passe (crypté)</li>
              </ul>

              <h4 className="text-lg font-semibold mt-4 mb-2">
                Lors d'une commande :
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Adresse de livraison complète</li>
                <li>Numéro de téléphone</li>
                <li>
                  Informations de paiement (traitées par Stripe, non stockées
                  sur nos serveurs)
                </li>
              </ul>

              <h4 className="text-lg font-semibold mt-4 mb-2">
                Données techniques :
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Adresse IP (pour sécurité et prévention des fraudes)</li>
                <li>Cookies de navigation</li>
                <li>Données de connexion (date, heure)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                3. Finalités du traitement
              </h3>
              <p>Vos données sont utilisées pour :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>La gestion de votre compte client</li>
                <li>Le traitement et le suivi de vos commandes</li>
                <li>L'envoi de confirmations par email</li>
                <li>La gestion du service après-vente</li>
                <li>
                  La sécurisation des transactions et la prévention de la fraude
                </li>
                <li>Le respect de nos obligations légales</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">4. Base légale</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Exécution du contrat :</strong> traitement de votre
                  commande
                </li>
                <li>
                  <strong>Obligation légale :</strong> conservation des
                  factures, déclarations fiscales
                </li>
                <li>
                  <strong>Intérêt légitime :</strong> sécurité du site,
                  prévention de la fraude
                </li>
                <li>
                  <strong>Consentement :</strong> cookies non essentiels,
                  newsletter (si applicable)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                5. Partage des données
              </h3>
              <p>
                Vos données peuvent être partagées avec nos partenaires de
                confiance :
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Stripe :</strong> traitement sécurisé des paiements
                </li>
                <li>
                  <strong>Prestataire d'envoi d'emails :</strong> notifications
                  transactionnelles
                </li>
                <li>
                  <strong>Transporteur :</strong> pour la livraison de votre
                  commande
                </li>
              </ul>
              <p className="mt-2 font-semibold">
                Nous ne vendons jamais vos données à des tiers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                6. Durée de conservation
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Données de compte : jusqu'à la suppression de votre compte
                </li>
                <li>
                  Données de commande : 10 ans (obligation comptable et fiscale)
                </li>
                <li>Logs de connexion : 12 mois maximum</li>
                <li>Cookies : selon la durée de validité de chaque cookie</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                7. Vos droits (RGPD)
              </h3>
              <p>
                Conformément au Règlement Général sur la Protection des Données,
                vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Droit d'accès :</strong> obtenir une copie de vos
                  données
                </li>
                <li>
                  <strong>Droit de rectification :</strong> corriger vos données
                  inexactes
                </li>
                <li>
                  <strong>Droit à l'effacement :</strong> supprimer vos données
                  ("droit à l'oubli")
                </li>
                <li>
                  <strong>Droit à la portabilité :</strong> récupérer vos
                  données dans un format structuré
                </li>
                <li>
                  <strong>Droit d'opposition :</strong> vous opposer à certains
                  traitements
                </li>
                <li>
                  <strong>Droit à la limitation :</strong> limiter le traitement
                  de vos données
                </li>
              </ul>
              <p className="mt-3">
                Pour exercer ces droits, contactez-nous à :{" "}
                <strong>contact@smoke-shop.be</strong>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">8. Cookies</h3>
              <p>
                Notre site utilise des cookies pour améliorer votre expérience :
              </p>

              <h4 className="text-lg font-semibold mt-3 mb-2">
                Cookies essentiels (obligatoires) :
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Authentification et gestion de session</li>
                <li>Panier d'achat</li>
                <li>Sécurité du site</li>
              </ul>

              <h4 className="text-lg font-semibold mt-3 mb-2">Gestion :</h4>
              <p>
                Vous pouvez configurer votre navigateur pour refuser les
                cookies, mais cela pourrait affecter certaines fonctionnalités
                du site.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">9. Sécurité</h3>
              <p>Nous mettons en œuvre les mesures de sécurité suivantes :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Chiffrement HTTPS pour toutes les communications</li>
                <li>Mots de passe cryptés avec algorithme bcrypt</li>
                <li>Paiements sécurisés via Stripe (certifié PCI-DSS)</li>
                <li>Protection contre les attaques par force brute</li>
                <li>Sauvegardes régulières de la base de données</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                10. Transferts internationaux
              </h3>
              <p>
                Certains de nos prestataires sont situés hors de l'Union
                Européenne. Dans ce cas, nous veillons à ce que des garanties
                appropriées soient mises en place (clauses contractuelles types
                de la Commission européenne).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                11. Contact et réclamations
              </h3>
              <p>
                Pour toute question concernant vos données personnelles :{" "}
                <strong>contact@smoke-shop.be</strong>
              </p>
              <p className="mt-3">
                Vous avez également le droit d'introduire une réclamation auprès
                de l'autorité de contrôle :
              </p>
              <p className="mt-2">
                <strong>Autorité de Protection des Données (APD)</strong>
                <br />
                Rue de la Presse 35, 1000 Bruxelles
                <br />
                <a
                  href="https://www.autoriteprotectiondonnees.be"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.autoriteprotectiondonnees.be
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">12. Modifications</h3>
              <p>
                Nous nous réservons le droit de modifier cette politique de
                confidentialité à tout moment. En cas de modification
                substantielle, nous vous en informerons par email ou via un
                message sur le site.
              </p>
              <p className="text-sm text-slate-600 mt-2">
                Date de dernière mise à jour : Janvier 2025
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-6">
              <p className="font-semibold">⚠️ Note importante</p>
              <p className="text-sm mt-2">
                Ce site est un projet portfolio de démonstration technique. Les
                données collectées sont minimales et utilisées uniquement dans
                ce cadre. Aucune activité commerciale réelle n'est exercée.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
