
// sumv twwu ybhp aqvu

import {
  FormField,
  validators,
  SubmitCallback,
  Formulaire,
  validateForm,
} from "./utils";
import {
  fetchDataFromServer,
  saveNewCargoToServer,
  fetchRequest,
  sendDataToServer,
  sendMail,
  // sendEmailNotification,
} from "./api";
import {
  Cargaison,
  Aerienne,
  Maritime,
  Routiere,
  Cargaison_Proprety,
} from "./types/cargaison";
import { Alimentaire, Chimique, Materiel } from "./produit";
import jsPDF from "jspdf";
import { log } from "console";

// DOM Elements
const elements = {
  produitMaxRadio: document.getElementById(
    "produitMaxRadio"
  ) as HTMLInputElement,
  poidsMaxRadio: document.getElementById("poidsMaxRadio") as HTMLInputElement,
  champProduits: document.getElementById("champ_produits") as HTMLElement,
  champPoids: document.getElementById("champ_poids") as HTMLElement,
  modeRemplissage: document.getElementById(
    "mode_remplissage_hidden"
  ) as HTMLInputElement,
  searchNumeroInput: document.getElementById(
    "searchNumero"
  ) as HTMLInputElement,
  lieuDepartInput: document.getElementById("lieuDepart") as HTMLInputElement,
  lieuArriveeInput: document.getElementById("lieuArrivee") as HTMLInputElement,
  filterStatusInput: document.getElementById(
    "filterStatus"
  ) as HTMLInputElement,
  radios: document.querySelectorAll('input[name="mode_remplissage"]'),
  cargoTableBody: document.getElementById("cargoTableBody") as HTMLTableElement,
  pageInfo: document.getElementById("pageInfo") as HTMLSpanElement,
  prevPageButton: document.getElementById("prevPage") as HTMLButtonElement,
  nextPageButton: document.getElementById("nextPage") as HTMLButtonElement,
  cargaisonForm: document.getElementById("cargaisonForm"),
  poidsMaxInput: document.getElementById("poid_max") as HTMLInputElement,
  produitMaxInput: document.getElementById("produitMax") as HTMLInputElement,
  dateDepart: document.getElementById("dateDepart") as HTMLInputElement,
  dateArrivee: document.getElementById("dateArrivee") as HTMLInputElement,
  dateStart: document.getElementById("dateStart") as HTMLInputElement,
  dateEnd: document.getElementById("dateEnd") as HTMLInputElement,
};

// Sélectionner le formulaire
document.addEventListener("DOMContentLoaded", function () {
  const addProductForm = document.getElementById(
    "addProductForm"
  ) as HTMLFormElement;

  if (addProductForm) {
    const submitButton = addProductForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.addEventListener("click", async function (event) {
        event.preventDefault();
        const formData = new FormData(addProductForm);
        console.log(formData);
        if (!validateForm()) {
          return;
        }

        const cargoId: number =
          parseInt(String(formData.get("cargaisonId"))) || 0;

        console.log("cargoId:", cargoId);

        const payload = {
          libelleProduit: formData.get("libelleProduit") as string,
          prixProduit: parseFloat(formData.get("prixProduit") as string),
          codeProduit: formData.get("codeProduit") as string,
          poidsProduit: parseFloat(formData.get("poidsProduit") as string),
          emetteurNom: formData.get("emetteurNom") as string,
          emetteurPrenom: formData.get("emetteurPrenom") as string,
          emetteurAdresse: formData.get("emetteurAdresse") as string,
          emetteurEmail: formData.get("emetteurEmail") as string,
          emetteurTelephone: formData.get("emetteurTelephone") as string,
          recepteurNom: formData.get("recepteurNom") as string,
          recepteurPrenom: formData.get("recepteurPrenom") as string,
          recepteurAdresse: formData.get("recepteurAdresse") as string,
          recepteurEmail: formData.get("recepteurEmail") as string,
          recepteurTelephone: formData.get("recepteurTelephone") as string,
          typeProduit: formData.get("typeProduit") as string, 
        };
        console.log("rjflzlrhfhr");

        console.log("payload:", payload);

        if (cargoId != 0) {
          try {
            console.log(payload, "test");

            // Ajouter le produit à la cargaison correspondante
            await addProductToCargo(cargoId, payload);
            // Réinitialiser le formulaire après soumission
            addProductForm.reset();
            showNotification("Produit ajouté avec succès à la cargaison !");
          } catch (error) {
            console.error(
              "Erreur lors de l'ajout du produit à la cargaison :",
              error
            );
            alert("Erreur lors de l'ajout du produit à la cargaison !");
          }
        } else {
          console.error("ID de cargaison invalide :", cargoId);
          // Gérer le cas où cargoId n'est pas un nombre valide
        }
      });
    }
  }
});

// State Variables
let cargos: Cargaison_Proprety[] = [];
let filteredCargos: Cargaison_Proprety[] = [];
let currentPage = 1;
const rowsPerPage = 5;

// Event Listeners
elements.radios.forEach((radio) => {
  radio.addEventListener("change", handleModeRemplissageChange);
});

elements.prevPageButton.addEventListener("click", goToPreviousPage);
elements.nextPageButton.addEventListener("click", goToNextPage);
[
  elements.searchNumeroInput,
  elements.lieuDepartInput,
  elements.lieuArriveeInput,
  elements.filterStatusInput,
  elements.dateStart,
  elements.dateEnd,
].forEach((input) => {
  input.addEventListener("input", applyFilters);
});

// Initial Setup
initializeModeRemplissage();
fetchCargos();

// Functions
async function fetchCargos(): Promise<void> {
  try {
    console.log("Fetching cargos...");
    const data = await fetchDataFromServer<{
      cargaisons: Array<Cargaison_Proprety>;
    }>("../php/api.php");
    const cargaisons = data?.cargaisons || [];
    cargos = cargaisons;
    filteredCargos = [...cargos];
    displayCargos();
    console.log("Success...");
  } catch (error) {
    console.error("Failed:", error);
  }
}

function displayCargos(): void {
  elements.cargoTableBody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedCargos = filteredCargos.slice(start, end);

  for (const cargo of paginatedCargos) {
    const row = createCargo(cargo);
    elements.cargoTableBody.appendChild(row);
  }

  updatePaginationControls();
}

function getTypeClass(type: string) {
  switch (type) {
    case "aerienne":
      return "text-blue-900 bg-blue-300 rounded-full dark:text-blue-100 dark:bg-blue-900";
    case "maritime":
      return "text-blue-700 bg-blue-100 rounded-full dark:text-blue-900 dark:bg-blue-700";
    case "routiere":
      return "text-yellow-700 bg-yellow-100 rounded-full dark:text-yellow-100 dark:bg-yellow-700";
    default:
      return "bg-gray-100";
  }
}

function getEtatClass(etat: string) {
  switch (etat) {
    case "ouvert":
      return "px-2 font-semibold leading-tight text-green-700 rounded-full dark:bg-green-700 dark:text-green-100";
    case "fermer":
      return "px-2 font-semibold leading-tight text-red-700 rounded-full dark:text-red-100 dark:bg-red-700";
    default:
      return "bg-gray-100";
  }
}


function showNotification(message: string | null) {
  const notification = document.getElementById('notification') as HTMLDivElement;
  notification.textContent = message;
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 5000);
}
async function updateEtatGlobale(cargoId: string,currentState: string , etatAvancement: string): Promise<void> {
  if (etatAvancement === "En cours" && (currentState === "fermé")) {
    showNotification(" La cargaison est fermée et en cours, vous ne pouvez pas l'ouvrir.");

    return;    
  }
  console.log("EtatAvancement:", cargoId, currentState, etatAvancement);
  
  if (etatAvancement !== "En attente" && (currentState === "fermé")) {
    showNotification("Vous ne pouvez pas l'ouvrir.");
    return;
  }
  console.log("updateEtatGlobale:", cargoId, currentState, etatAvancement);  

  const newState = currentState === "ouvert" ? "fermé" : "ouvert";
  try {
    const response = await fetch(`../php/api.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "changerEtatCargo",
        idcargo: parseInt(cargoId),
        newState: newState,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    console.log("Etat de la cargaison mis à jour :", newState);
    fetchCargos(); // Recharger la liste des cargaisons
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'état globale:", error);
    showNotification("Erreur lors de la mise à jour de l'état globale !");
  }
}


async function updateEtatAvancement(cargoId: string, currentAvancement: string , etat_globale: string): Promise<void> {
  const etatAvancementSelect = document.getElementById("etatAvancementSelect") as HTMLSelectElement;
  const newAvancement = etatAvancementSelect.value;
  console.log("mes etats:", cargoId, currentAvancement, etat_globale, newAvancement);

  if (currentAvancement === "En cours" && etat_globale === "fermé") {
    if (currentAvancement === "En cours" && etat_globale === "fermé") {
      showNotification("La cargaison est ferme et en cours.");
      if (newAvancement != "Terminé" && newAvancement != "Perdue") {
        showNotification("La cargaison est fermée et en cours. Vous ne pouvez choisir que 'Terminé' ou 'Perdue'.");
        etatAvancementSelect.value = currentAvancement;
        return; 
      }
    }
  }

  try {
    const response = await fetch(`../php/api.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "changerEtatAvancement",
        idcargo: parseInt(cargoId),
        newAvancement: newAvancement,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    console.log(
      "Etat d'avancement de la cargaison mis à jour :",
      newAvancement
    );
    
    fetchCargos();
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de l'état d'avancement:",
      error
    );
    showNotification("Erreur lors de la mise à jour de l'état d'avancement !");
  }
}


function createCargo(cargo: Cargaison_Proprety): HTMLTableRowElement {
  const row = document.createElement("tr");
  
  const typeClass = getTypeClass(cargo.type?.toLowerCase());
  const etatClass = getEtatClass(cargo.etat_globale?.toLowerCase());
  let btnClass =
    cargo.etat_globale === "fermé"
      ? "bg-red-600 hover:bg-red-800"
      : "bg-green-600 hover:bg-green-800";
  row.innerHTML = `
    <td><span class="ml-4 px-2 py-1 font-semibold leading-tight text-purple-600 bg-purple-100 rounded-full">${
      cargo.numero
    }</span></td>
    <td class="px-4">${cargo.dateDepart}</td>
    <td class="px-4 py-3">${cargo.dateArrivee}</td>
    <td class="px-4 py-3">${cargo.lieu_depart}</td>
    <td class="px-4 py-3">${cargo.lieu_arrivee}</td>
    <td class="${etatClass} text-center">
      <button data-cargo-id="${cargo.id}" data-etat="${ cargo.etat_globale }" data-etat-avancement="${cargo.etat_Avancement}" class="btn_globale ml-2 ${btnClass} text-white py-1 px-2 rounded">
        ${cargo.etat_globale}
      </button>
    </td>
    <td class="px-4 item-center py-3 flex justify-center">
      <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline cargo-info" href="#" data-cargo-id="${
        cargo.id
      }">
        <i class="fa-solid fa-info-circle"></i>
      </a>
      ${
        cargo.etat_globale !== "fermé"
          ? `
      <button id="${cargo.id}" class="ml-2 bg-purple-600 hover:bg-purple-800 text-white py-1 px-2 rounded" onclick="openModal()">
        <i id="${cargo.id}" class="fa-solid fa-plus"></i>
      </button>`
          : ""
      }
      <input type="hidden" id="etatAvancement" name="cargaisonId" value="${cargo.etat_Avancement}" />
    </td>
  `;

  const cargoInfoLink = row.querySelector(".cargo-info");
  if (cargoInfoLink) {
    cargoInfoLink.addEventListener("click", (event) => {
      event.preventDefault();
      const cargoId = parseInt(
        cargoInfoLink.getAttribute("data-cargo-id") || ""
      );
      if (!isNaN(cargoId)) {
        fetchAndDisplayCargoDetails(cargoId);
      } else {
        console.error("Invalid cargo ID");
      }
    });
  }

  row.querySelector("button")?.addEventListener("click", () => {
    const cargaisonId = document.getElementById(
      "cargaisonId"
    ) as HTMLInputElement;
    cargaisonId.value = `${cargo.id}`;
  });

  const btn_globale = row.querySelector(".btn_globale") as HTMLButtonElement;
  if (btn_globale) {
    btn_globale.addEventListener("click", () => {
      const cargoId = btn_globale.dataset.cargoId;
      const currentState = btn_globale.dataset.etat;
      const etatAvancement = btn_globale.dataset.etatAvancement;
      if (cargoId && currentState && etatAvancement) {
        updateEtatGlobale(cargoId, currentState, etatAvancement);
      } else {
        console.error("Cargo ID, current state, or etatAvancement is undefined");
      }
    });
  }

  return row;
}


function openModal() {
  const my_modal_4 = document.getElementById("my_modal_4") as HTMLDialogElement;
  my_modal_4.showModal();
}
function showModal() {
  const my_modal_4 = document.getElementById("my_modal_4") as HTMLDialogElement;
  if (my_modal_4) {
    my_modal_4.showModal();
  } else {
    console.error("Modal element not found.");
  }
}

async function fetchAndDisplayCargoDetails(cargoId: number): Promise<void> {
  try {
    // console.log(`Fetching cargo details for cargo ID: ${cargoId}`);
    const cargoDetails = await fetchCargoDetails(cargoId);
    console.log("DETAILS DE LE CARGAISON:", cargoDetails, cargoId);

    // const displayCargo = [...cargoDetails]
    // cargoDetails.

    //   if (cargoDetails) {
    //     const test = [...cargoDetails["cargaisons"]].find(car => car.id === cargoId);
    //     console.log(test);
    //   } else {
    //     console.log("cargoDetails est indéfini");
    //  }

    if (cargoDetails) {
      displayCargoDetails(cargoDetails, cargoId);
    }
  } catch (error) {
    console.error("Failed to fetch cargo details:", error);
  }
}

function getCargoIdFromUrl(): number | null {
  const cargoId = new URLSearchParams(window.location.search).get("cargoId");
  console.log("Extracted cargoId:", cargoId); // Ajout du console.log
  return cargoId ? parseInt(cargoId) : null;
}

async function fetchCargoDetails(
  cargoId: number
): Promise<Cargaison_Proprety | undefined> {
  try {
    const cargoDetails = await fetchRequest<Cargaison_Proprety>(
      `../php/api.php?cargoId=${cargoId}`
    );
    console.log("typeof cargoDetails:", typeof cargoDetails);

    return cargoDetails;
  } catch (error) {
    console.error("Failed to fetch cargo details:", error);
    return undefined;
  }
}
function displayCargoDetails(cargoDetails: any, cargoId: number): void {
  const cargo = cargoDetails.cargaisons.find((car: any) => car.id === cargoId);

  if (cargo) {
    const cargoDetailsDiv = document.getElementById("cargoDetails");
    document.querySelector("#cargaisons")?.classList.add("hidden");
    if (cargoDetailsDiv) {

      // Fonction pour obtenir la couleur de fond en fonction de l'état d'avancement
      function getBackgroundColor(etatAvancement: string): string {
        switch (etatAvancement) {
          case "En cours":
            return "linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)"; // Orange
          case "Perdue":
            return "linear-gradient(135deg, #FF0000 0%, #B22222 100%)"; // Rouge
          case "En attente":
            return "linear-gradient(135deg, #00BFFF 0%, #1E90FF 100%)"; // Bleu
          case "Terminé":
            return "linear-gradient(135deg, #32CD32 0%, #008000 100%)"; // Vert
          default:
            return "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)"; // Par défaut
        }
      }

      const backgroundColor = getBackgroundColor(cargo.etat_Avancement);

      cargoDetailsDiv.innerHTML = `
        <h1 style="color:#7e3af2; margin-bottom: 0;" class="text-2xl text-black-700 font-bold">Détails de la Cargaison</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          <div class="bg-purple-100 rounded-lg shadow-md p-6">
            <h2 class="text-lg text-purple-600 font-semibold mb-4">Numéro</h2>
            <p class="text-black">${cargo.numero || "N/A"}</p>
          </div>
          <div class="bg-purple-100 rounded-lg shadow-md p-6">
            <h2 class="text-lg text-purple-600 font-semibold mb-4">Date de départ</h2>
            <p class="text-black">${cargo.dateDepart || "N/A"}</p>
          </div>
          <div class="bg-purple-100  rounded-lg shadow-md p-6">
            <h2 class="text-lg text-purple-600 font-semibold mb-4">Date d'arrivée</h2>
            <p class="text-black">${cargo.dateArrivee || "N/A"}</p>
          </div>
          <div class="bg-purple-100  rounded-lg shadow-md p-6">
            <h2 class="text-lg text-purple-600 font-semibold mb-4">Lieu de départ</h2>
            <p class="text-black">${cargo.lieu_depart || "N/A"}</p>
          </div>
          <div class="bg-purple-100  rounded-lg shadow-md p-6">
            <h2 class="text-lg text-purple-600 font-semibold mb-4">Lieu d'arrivée</h2>
            <p class="text-black">${cargo.lieu_arrivee || "N/A"}</p>
          </div>
          <div class="bg-purple-100  rounded-lg shadow-md p-6">
            <h2 class="text-lg text-purple-600 font-semibold mb-4">État global</h2>
            <p class="text-black">${cargo.etat_globale || "N/A"}</p>
          </div>
          <div class="bg-purple-100  rounded-lg shadow-md p-6">
            <h2 class="text-lg text-purple-600 font-semibold mb-4">Type</h2>
            <p class="text-black">${cargo.type || "N/A"}</p>
          </div>
          <div class="bg-purple-100  rounded-lg shadow-md p-6">
            <h2 class="text-lg text-purple-600 font-semibold mb-4">État d'avancement</h2>
            <span style="
              display: inline-block;
              color: #fff;
              background: ${backgroundColor};
              border-radius: 12px;
              padding: 8px 16px;
              font-size: 1rem;
              font-weight: bold;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              text-align: center;
              margin-left: 8px;
              animation: pulse 2s infinite;
            ">
              ${cargo.etat_Avancement || "N/A"}
            </span>
            <input type="hidden" id="cargaisonId" value="${cargoId}">
            <select id="etatAvancementSelect" class="bg-white focus:outline-none border border-gray-300 rounded-md py-1 px-3">
            </select>
            <input type="hidden" id="etatGlobal" value="${cargo.etat_globale}">
          </div>
        </div>
        <h2 class="text-2xl text-black-700 font-bold mt-8">Produits:</h2>
        <div class="overflow-x-auto">
          <table class="table-auto w-full mt-4">
            <thead>
              <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th class="py-3 px-6 text-left">Libellé</th>
                <th class="py-3 px-6 text-left">Prix</th>
                <th class="py-3 px-6 text-left">Code</th>
                <th class="py-3 px-6 text-left">Poids</th>
                <th class="py-3 px-6 text-left">Mail Delivreur</th>
                <th class="py-3 px-6 text-left">Mail Recepteur</th>
                <th class="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody id="productTable"></tbody>
          </table>
        </div>
      `;

      const etatGlobalInput = document.getElementById("etatGlobal") as HTMLInputElement;
      const etatAvancementSelect = document.getElementById("etatAvancementSelect") as HTMLSelectElement;
      if (etatAvancementSelect && etatGlobalInput) {
        etatAvancementSelect.addEventListener("change", () => {
          const newAvancement = etatAvancementSelect.value;
          const etatGlobal = etatGlobalInput.value;
          updateEtatAvancement(cargoId.toString(), newAvancement, etatGlobal);
        });
      }

      const productTable = document.getElementById("productTable");
      if (productTable) {
        cargo.produits.forEach((produit: any) => {
          productTable.innerHTML += `
            <tr class="border-b border-gray-200 hover:bg-gray-100">
              <td class="py-3 px-6 text-left">${produit.libelleProduit}</td>
              <td class="py-3 px-6 text-left">${produit.prixProduit}</td>
              <td class="py-3 px-6 text-left">${produit.codeProduit}</td>
              <td class="py-3 px-6 text-left">${produit.poidsProduit}</td>
              <td class="py-3 px-6 text-left">${produit.emetteurEmail}</td>
              <td class="py-3 px-6 text-left">${produit.recepteurEmail}</td>
              <td class="py-3 px-6 text-left">
                <button class="delete-product bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" data-product-id="${produit.codeProduit}">Supprimer</button>
                <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Perdue</button>
              </td>
            </tr>
          `;
        });
      }
      cargoDetailsDiv.classList.remove("hidden");
      document.querySelectorAll(".delete-product").forEach(button => {
        button.addEventListener("click", handleDeleteProduct);
      });
    }

    const E1 = ["Changer Etat", 'Terminé', 'Perdue'];
    const E2 = ["Changer Etat", 'En cours'];
    const E3 = ["Changer Etat", 'Arrivée'];

    const etatAvancementSelect = document.getElementById('etatAvancementSelect') as HTMLSelectElement;

    if (cargo.etat_Avancement === 'En attente' && cargo.etat_globale === 'ouvert') {
      etatAvancementSelect.innerHTML = generateSelectOptions(E2);
    } else if (cargo.etat_globale === 'ouvert' && cargo.etat_Avancement === 'Terminé') {
      etatAvancementSelect.innerHTML = "";
    } else if (cargo.etat_globale === 'fermé' && cargo.etat_Avancement === 'En cours') {
      etatAvancementSelect.innerHTML = generateSelectOptions(E1);
    } else if (cargo.etat_Avancement === 'En attente' && cargo.etat_globale === 'fermé') {
      etatAvancementSelect.innerHTML = generateSelectOptions(E2);
    } else if ((cargo.etat_globale === 'fermé' || cargo.etat_globale === 'ouvert') && (cargo.etat_Avancement === 'Perdue' || cargo.etat_Avancement === 'Terminé')) {
      etatAvancementSelect.innerHTML = "";
      etatAvancementSelect.classList.add("hidden");
    } else if (cargo.etat_globale === 'ouvert') {

    }
  } else {
    console.error("Aucune cargaison trouvée dans les détails.");
  }
}

function generateSelectOptions(options: string[]): string {
  let selectHTML = '<select class="bg-white focus:outline-none border border-gray-300 rounded-md py-1 px-3">';
  options.forEach(option => {
    selectHTML += `<option value="${option}">${option}</option>`;
  });
  selectHTML += '</select>';
  return selectHTML;
}



async function handleDeleteProduct(event: Event) {
  const button = event.target as HTMLButtonElement;
  const codeProduit = button.getAttribute('data-product-id'); // Renommez productId en codeProduit
  const cargoIdElement = document.getElementById('cargaisonId') as HTMLInputElement | HTMLSelectElement;
  const cargoId = cargoIdElement?.value;

  if (codeProduit && cargoId) {
    try {
      const response = await fetch(`../php/api.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "supprimerProduit",
          codeProduit: codeProduit, 
          cargoId: parseInt(cargoId),
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Produit supprimé :", result);
      alert("Produit supprimé avec succès !");
      fetchAndDisplayCargoDetails(parseInt(cargoId)); // Recharger les détails de la cargaison
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
      alert("Erreur lors de la suppression du produit !");
    }
  } else {
    console.error("Product ID ou Cargo ID est manquant");
  }
}




function updatePaginationControls() {
  const totalPages = Math.ceil(filteredCargos.length / rowsPerPage);
  elements.pageInfo.textContent = `Page ${currentPage} sur ${totalPages}`;
  elements.prevPageButton.disabled = currentPage === 1;
  elements.nextPageButton.disabled = currentPage === totalPages;
}

function handleModeRemplissageChange() {
  if (elements.produitMaxRadio.checked) {
    elements.champProduits.classList.remove("hidden");
    elements.champPoids.classList.add("hidden");
    elements.modeRemplissage.value = "produitMax";
  } else if (elements.poidsMaxRadio.checked) {
    elements.champPoids.classList.remove("hidden");
    elements.champProduits.classList.add("hidden");
    elements.modeRemplissage.value = "poidsMax";
  }
}

function initializeModeRemplissage() {
  if (elements.produitMaxRadio.checked) {
    elements.champProduits.classList.remove("hidden");
    elements.champPoids.classList.add("hidden");
    elements.modeRemplissage.value = "produitMax";
  } else if (elements.poidsMaxRadio.checked) {
    elements.champPoids.classList.remove("hidden");
    elements.champProduits.classList.add("hidden");
    elements.modeRemplissage.value = "poidsMax";
  }
}

function applyFilters() {
  const searchNumero = elements.searchNumeroInput.value.toLowerCase();
  const lieuDepart = elements.lieuDepartInput.value.toLowerCase();
  const lieuArrivee = elements.lieuArriveeInput.value.toLowerCase();
  const filterStatus = elements.filterStatusInput.value.toLowerCase();
  const filterDateDepart = elements.dateStart.value;
  const filterDateArrivee = elements.dateEnd.value;
  const departDate = filterDateDepart
    ? formatDate(new Date(filterDateDepart))
    : null;
  const arriveeDate = filterDateArrivee
    ? formatDate(new Date(filterDateArrivee))
    : null;
  const dateDepart = departDate ? departDate : null;
  const dateArrivee = arriveeDate ? arriveeDate : null;

  // console.log(filterDateDepart);
  filteredCargos = cargos.filter((cargo) => {
    const matchesNumero =
      searchNumero === "" || cargo.numero.toLowerCase().includes(searchNumero);
    const matchesLieuDepart =
      lieuDepart === "" || cargo.lieu_depart.toLowerCase().includes(lieuDepart);
    const matchesLieuArrivee =
      lieuArrivee === "" ||
      cargo.lieu_arrivee.toLowerCase().includes(lieuArrivee);
    const matchesStatus =
      filterStatus === "" ||
      cargo.etat_globale.toLowerCase().includes(filterStatus);
    const matchesDateDepart =
      filterDateDepart === "" ||
      dateDepart?.localeCompare(cargo.dateDepart) === 0;
    const matchesDateArrivee =
      filterDateArrivee === "" ||
      dateArrivee?.localeCompare(cargo.dateArrivee) === 0;

    return (
      matchesNumero &&
      matchesLieuDepart &&
      matchesLieuArrivee &&
      matchesStatus &&
      matchesDateDepart &&
      matchesDateArrivee
    );
  });
  currentPage = 1;
  displayCargos();
}

function formatDate(date: Date) {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    displayCargos();
  }
}

function goToNextPage() {
  const totalPages = Math.ceil(filteredCargos.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayCargos();
  }
}

const submitNewCargo: SubmitCallback = (formData) => {
  const {
    distance,
    dateDepart,
    dateArrivee,
    type_cargaison,
    lieu_depart,
    lieu_arrivee,
    mode_remplissage,
  } = formData;

  formData.mode_remplissage = elements.modeRemplissage.value;

  const poidsMax = elements.poidsMaxInput.value
    ? parseFloat(elements.poidsMaxInput.value)
    : null;
  const produitMax = elements.produitMaxInput.value
    ? parseInt(elements.produitMaxInput.value)
    : null;

  let finalPoidsMax: number | null = null;
  let finalProduitMax: number | null = null;

  if (elements.modeRemplissage.value === "poidsMax") {
    finalPoidsMax = poidsMax;
    finalProduitMax = null;
  } else if (elements.modeRemplissage.value === "produitMax") {
    finalPoidsMax = null;
    finalProduitMax = produitMax;
  }

  const distanceKm = parseInt(distance);
  if (isNaN(distanceKm) || !dateDepart || !dateArrivee || !type_cargaison) {
    alert("Les données du formulaire sont invalides.");
    return;
  }

  let newCargo: Cargaison;
  switch (type_cargaison) {
    case "maritime":
      newCargo = new Maritime(
        distanceKm,
        dateDepart,
        dateArrivee,
        finalPoidsMax,
        finalProduitMax,
        lieu_depart,
        lieu_arrivee,
        elements.modeRemplissage.value
      );
      break;
    case "aerienne":
      newCargo = new Aerienne(
        distanceKm,
        dateDepart,
        dateArrivee,
        finalPoidsMax,
        finalProduitMax,
        lieu_depart,
        lieu_arrivee,
        elements.modeRemplissage.value
      );
      break;
    case "routiere":
      newCargo = new Routiere(
        distanceKm,
        dateDepart,
        dateArrivee,
        finalPoidsMax,
        finalProduitMax,
        lieu_depart,
        lieu_arrivee,
        elements.modeRemplissage.value
      );
      break;
    default:
      alert("Type de cargaison invalide.");
      return;
  }

  console.log(newCargo);

  saveNewCargoToServer(newCargo)
    .then(() => {
      alert("Cargaison ajoutée avec succès.");
      fetchCargos();
    })
    .catch((error) => {
      alert(`Erreur lors de l'ajout de la cargaison : ${error.message}`);
    });
};

const form = document.getElementById("cargaisonForm");
if (form) {
  const formFields: FormField[] = Array.from(
    form.querySelectorAll(`[data-label]`)
  ).map((field) => {
    const htmlField = field as HTMLElement;
    return {
      inputId: htmlField.id,
      errorSpanId: `${htmlField.id}Error`,
      validator: validators[htmlField.dataset.label as keyof typeof validators],
    };
  });

  new Formulaire(form.id, formFields, submitNewCargo);
} else {
  console.error("Element 'cargaisonForm' not found in the DOM.");
}


function generateProductCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 3; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return 'PROD' + code;
}

async function addProductToCargo(cargoId: number, payload: any) {
  console.log("Adding product to cargo:", payload);

  try {

    const cargoDetails = await fetchCargoDetails(cargoId);
    if (!cargoDetails) {
      throw new Error("Cargaison non trouvée");
      console.log("Error: Cargaison non trouvée");
      
    }
    console.log("Liste de toutes les cargos :", cargoDetails);
    

    // Trouver la cargaison correspondante
    const cargo = cargoDetails.cargaisons.find((cargaison: any) => cargaison.id === cargoId);
    if (!cargo) {
        throw new Error("Cargaison non trouvée");
    }

    const poidsTotalProduits = cargo.produits.reduce((total: number, produit: any) => total + produit.poidsProduit, 0);
    console.log("Poids total des produits :", poidsTotalProduits);
    console.log("Diff :",poidsTotalProduits - cargo.poidsMax);
    
    
    if (poidsTotalProduits + payload.poidsProduit > cargo.poidsMax) {
      throw new Error("Impossible d'ajouter le produit. Le poids total des produits dépasse le poids maximal de la cargaison.");
    }
  

    // Afficher tous les produits de la cargaison sur laquelle vous ajoutez un produit
    console.log("Liste des produits de la cargaison:", cargo.produits);
    
    // Générer un code unique pour le produit
    const productCode = generateProductCode();
    console.log("Generated product code:", productCode);
    

    // Ajouter le code de produit à la payload
    payload.codeProduit = productCode;
    let recep = payload.recepteurTelephone;
    let dest = payload.emetteurTelephone;

    const response = await fetch(`../php/api.php?ajouter=${cargoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    sendMail("tout");
    // sendSms(recep, dest, "Bonjour tres cher(e), votre produit a bien ete ajouté.");

    // Créer un fichier PDF avec les détails du produit
    const doc = new jsPDF();
    

    // En-tête de l'entreprise
    doc.setFontSize(12);
    doc.setTextColor("#1E88E5"); // Couleur du texte
    doc.text("GP Monde", 105, 10, { align: "center" });

    // Titre
    doc.setFontSize(20);
    doc.setTextColor("#1E88E5"); // Couleur du titre
    doc.text("Détails du Produit", 105, 20, { align: "center" });


    // Informations du produit
    doc.setFontSize(12);
    doc.setTextColor("#000000"); // Couleur du texte
    doc.text(`Code Produit: ${productCode}`, 20, 40);
    doc.text(`Nom Produit: ${payload.libelleProduit}`, 20, 50);
    doc.text(`Prix Produit: ${payload.prixProduit}`, 20, 60);
    doc.text(`Poids Produit: ${payload.poidsProduit}`, 20, 70);

    // Informations de l'émetteur
    doc.setTextColor("#1E88E5"); // Couleur du titre
    doc.text("Émetteur", 20, 90);
    doc.setTextColor("#000000"); // Couleur du texte
    doc.text(`Nom: ${payload.emetteurNom}`, 20, 100);
    doc.text(`Prénom: ${payload.emetteurPrenom}`, 20, 110);
    doc.text(`Adresse: ${payload.emetteurAdresse}`, 20, 120);
    doc.text(`Email: ${payload.emetteurEmail}`, 20, 130);
    doc.text(`Téléphone: ${payload.emetteurTelephone}`, 20, 140);

    // Informations du récepteur
    doc.setTextColor("#1E88E5"); // Couleur du titre
    doc.text("Récepteur", 20, 160);
    doc.setTextColor("#000000"); // Couleur du texte
    doc.text(`Nom: ${payload.recepteurNom}`, 20, 170);
    doc.text(`Prénom: ${payload.recepteurPrenom}`, 20, 180);
    doc.text(`Adresse: ${payload.recepteurAdresse}`, 20, 190);
    doc.text(`Email: ${payload.recepteurEmail}`, 20, 200);
    doc.text(`Téléphone: ${payload.recepteurTelephone}`, 20, 210);

    // Type de produit
    doc.setTextColor("#1E88E5"); // Couleur du titre
    doc.text("Type de Produit", 20, 230);
    doc.setTextColor("#000000"); // Couleur du texte
    doc.text(`${payload.typeProduit}`, 20, 240);

    // Ligne de signature
    doc.setLineWidth(0.5);
    doc.setDrawColor(0);
    doc.line(20, 260, 190, 260);

    // Signature
    doc.setTextColor("#FF0000"); // Couleur de la signature
    doc.text("Signature", 105, 270, { align: "center" });


    // Télécharger le fichier PDF
    doc.save(`Details_Produit_${productCode}.pdf`);

    if (!response.ok) {
      throw new Error("Failed to add product to cargo");
    }

    const data = await response.json();
    // console.log("Product added to cargo:", data);
    return data;
  } catch (error) {
    console.error("Error adding product to cargo:", error);
    throw error; 
  }
}
