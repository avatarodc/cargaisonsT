import { Cargaison_Proprety } from "./types/cargaison";

// Fonction pour Extraire l'ID de l'URL
function getCargoIdFromUrl(): number | null {
  const cargoId = new URLSearchParams(window.location.search).get("cargoId");
  return cargoId ? parseInt(cargoId) : null;
}

// Fonction pour Afficher les Détails de la Cargaison
function displayCargoDetails(cargoDetails: Cargaison_Proprety) {
  console.log("Displaying cargo details:", cargoDetails);
  const cargoDetailsDiv = document.getElementById("cargoDetails");
  if (cargoDetailsDiv) {
    cargoDetailsDiv.innerHTML = `
      <h1>Détails de la Cargaison</h1>
      <p>Numéro: ${cargoDetails.numero}</p>
      <p>Date de départ: ${cargoDetails.dateDepart}</p>
      <p>Date d'arrivée: ${cargoDetails.dateArrivee}</p>
      <p>Lieu de départ: ${cargoDetails.lieu_depart}</p>
      <p>Lieu d'arrivée: ${cargoDetails.lieu_arrivee}</p>
      <p>État global: ${cargoDetails.etat_globale}</p>
      <p>Type: ${cargoDetails.type}</p>
    `;
  }
}

// Fonction pour Récupérer les Détails de la Cargaison depuis le Serveur
// async function fetchCargoDetails(cargoId: number): Promise<Cargaison_Proprety | undefined> {
//   try {
//     console.log(`Fetching cargo details for cargo ID: ${cargoId}`);
//     const cargoDetails = await fetchRequest<Cargaison_Proprety>(`../php/api.php?cargoId=${cargoId}`);
//     console.log("Fetched cargo details:", cargoDetails);
//     return cargoDetails;
//   } catch (error) {
//     console.error('Failed to fetch cargo details:', error);
//     return undefined;
//   }
// }

// Charger les Détails de la Cargaison à la Chargement de la Page
// document.addEventListener("DOMContentLoaded", async () => {
//   const cargoId = getCargoIdFromUrl();
//   console.log("cargoId:", cargoId);
//   if (cargoId !== null) {
//     try {
//       const cargoDetails = await fetchCargoDetails(cargoId);
//       if (cargoDetails) displayCargoDetails(cargoDetails);
//     } catch (error) {
//       console.error("Erreur lors de la récupération des détails de la cargaison:", error);
//     }
//   } else {
//     console.error("Aucun ID de cargaison spécifié dans l'URL.");
//   }
// });
