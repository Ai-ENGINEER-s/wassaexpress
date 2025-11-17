import {
  X,
  Package,
  Mail,
  Truck,
  Send,
  Check,
  Star,
} from 'lucide-react';
import Image from 'next/image';

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  whatsapp: string;
  adresseDepart: string;
  adresseLivraison: string;
  poidsEstime: string;
  descriptionColis: string;
  avecLivreur: boolean;
  livreurId: string;
  message: string;
}

interface Livreur {
  id: number;
  name: string;
  profileImage: string;
  transportFee: string;
  rating: number;
  completedDeliveries: number;
  available: boolean;
}

interface InterestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  formSubmitted: boolean;
  annonceTitle: string;
  availableWeight: string;
  livreurs: Livreur[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const InterestFormModal = ({
  isOpen,
  onClose,
  formData,
  formSubmitted,
  annonceTitle,
  availableWeight,
  livreurs,
  onChange,
  onSubmit,
}: InterestFormModalProps) => {
  if (!isOpen) return null;

  const selectedLivreur = livreurs.find((l) => l.id === parseInt(formData.livreurId));

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* HEADER MODAL */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 flex items-center justify-between rounded-t-3xl">
          <div>
            <h3 className="text-xl font-bold mb-1 flex items-center space-x-2">
              <Package className="w-6 h-6" />
              <span>Je suis intéressé(e)</span>
            </h3>
            <p className="text-orange-100 text-sm truncate">{annonceTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* CONTENU MODAL */}
        <div className="p-6">
          {!formSubmitted ? (
            <form onSubmit={onSubmit} className="space-y-5">
              {/* SECTION INFORMATIONS PERSONNELLES */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4">
                <h4 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>Vos coordonnées</span>
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Pour que nous puissions vous recontacter rapidement
                </p>
              </div>

              {/* NOM & PRÉNOM */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['nom', 'prenom'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 capitalize">
                      {field} *
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field as keyof FormData] as string}
                      onChange={onChange}
                      required
                      placeholder={`Votre ${field}`}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                ))}
              </div>

              {/* EMAIL & TÉLÉPHONE */}
              {[
                { name: 'email', type: 'email', placeholder: 'votre.email@exemple.com' },
                { name: 'telephone', type: 'tel', placeholder: '+212 6XX-XXXXXX' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 capitalize">
                    {field.name === 'email' ? 'Email' : 'Téléphone'} *
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof FormData] as string}
                    onChange={onChange}
                    required
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              ))}

              {/* WHATSAPP */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  WhatsApp (optionnel)
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={onChange}
                  placeholder="+212 6XX-XXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* SECTION DÉTAILS DU COLIS */}
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 mb-4">
                <h4 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center space-x-2">
                  <Package className="w-5 h-5 text-orange-600" />
                  <span>Informations sur votre colis</span>
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Détails du colis que vous souhaitez envoyer
                </p>
              </div>

              {/* ADRESSES */}
              {[
                { name: 'adresseDepart', label: 'Adresse de départ (enlèvement)' },
                { name: 'adresseLivraison', label: 'Adresse de livraison' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                    {field.label} *
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name as keyof FormData] as string}
                    onChange={onChange}
                    required
                    placeholder={`Adresse complète ${
                      field.name === 'adresseDepart' ? "d'enlèvement" : 'de livraison'
                    }`}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              ))}

              {/* POIDS ESTIMÉ */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  Poids estimé du colis (Kg) *
                </label>
                <input
                  type="number"
                  name="poidsEstime"
                  value={formData.poidsEstime}
                  onChange={onChange}
                  required
                  min="0.5"
                  step="0.5"
                  placeholder="Ex: 5"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Poids disponible: {availableWeight}
                </p>
              </div>

              {/* DESCRIPTION COLIS */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  Description du colis *
                </label>
                <textarea
                  name="descriptionColis"
                  value={formData.descriptionColis}
                  onChange={onChange}
                  required
                  rows={3}
                  placeholder="Ex: Vêtements, documents, cadeaux..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                />
              </div>

              {/* SECTION LIVREUR */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-4">
                <h4 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span>Livraison à domicile (optionnel)</span>
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Une fois le colis arrivé à destination, un livreur peut le livrer
                  à l'adresse finale
                </p>
              </div>

              {/* CHECKBOX LIVREUR */}
              <div className="flex items-start space-x-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                <input
                  type="checkbox"
                  id="avecLivreur"
                  name="avecLivreur"
                  checked={formData.avecLivreur}
                  onChange={onChange}
                  className="mt-1 w-5 h-5 text-orange-600 focus:ring-2 focus:ring-orange-500 rounded"
                />
                <label htmlFor="avecLivreur" className="flex-1 cursor-pointer">
                  <span className="block font-semibold text-gray-900 dark:text-white mb-1">
                    Je souhaite une livraison à domicile à l'arrivée
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    Un livreur récupérera le colis une fois arrivé et le livrera à
                    l'adresse de destination finale
                  </span>
                </label>
              </div>

              {/* SÉLECTION LIVREUR */}
              {formData.avecLivreur && (
                <div className="bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-700 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Choisir un livreur *
                  </label>
                  <select
                    name="livreurId"
                    value={formData.livreurId}
                    onChange={onChange}
                    required={formData.avecLivreur}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">-- Sélectionner un livreur --</option>
                    {livreurs
                      .filter((l) => l.available)
                      .map((livreur) => (
                        <option key={livreur.id} value={livreur.id}>
                          {livreur.name} - {livreur.transportFee}
                        </option>
                      ))}
                  </select>

                  {selectedLivreur && (
                    <div className="mt-3 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-700">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-500">
                          <Image
                            src={selectedLivreur.profileImage}
                            alt={selectedLivreur.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">
                            {selectedLivreur.name}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-300">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span>{selectedLivreur.rating}</span>
                            <span>•</span>
                            <span>{selectedLivreur.completedDeliveries} livraisons</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Frais de transport
                        </p>
                        <p className="text-lg font-bold text-green-600">
                          {selectedLivreur.transportFee}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MESSAGE ADDITIONNEL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  Message additionnel (optionnel)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={onChange}
                  rows={2}
                  placeholder="Questions ou instructions particulières..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                />
              </div>

              {/* INFO FINALE */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3 text-xs text-blue-900 dark:text-blue-200">
                <strong>📞 Nous vous recontacterons</strong>
                <p>
                  Notre équipe vous contactera rapidement pour finaliser votre
                  demande et organiser l'envoi de votre colis avec le voyageur.
                </p>
              </div>

              {/* BOUTONS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-3 px-4 rounded-lg transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer ma demande</span>
                </button>
              </div>
            </form>
          ) : (
            // MESSAGE DE SUCCÈS
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Demande envoyée avec succès !
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                Merci pour votre intérêt. Notre équipe vous contactera très
                prochainement pour organiser l'envoi de votre colis.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg p-4 text-sm text-green-800 dark:text-green-200">
                <p className="font-semibold mb-2">✅ Prochaines étapes :</p>
                <ul className="text-left space-y-1 text-xs">
                  <li>• Nous vous appellerons pour confirmer les détails</li>
                  <li>• Organisation de l'envoi avec le voyageur</li>
                  <li>• Paiement et remise du colis</li>
                  {formData.avecLivreur && (
                    <li>
                      • Livraison à domicile une fois arrivé à destination
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};