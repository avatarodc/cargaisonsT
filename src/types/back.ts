// import { Produit, Alimentaire, Chimique, Materiel } from '../produit';

// export interface Cargaison_Proprety {
//     id: number;
//     numero: string;
//     poidsMax: number | null;
//     produitMax: number | null;
//     prix_total: number;
//     lieu_depart: string;
//     lieu_arrivee: string;
//     produits: Produit[];
//     dateDepart: string;
//     dateArrivee: string;
//     mode_remplissage: string;
//     etat_Avancement: string;
//     etat_globale: string;
//     type: string;
//     distanceKm: number;

//     ajouterProduit(produit: Produit): void;
//     calculerFrais(produit: Produit): number;
//     sommeTotale(): number;
//     sommePoids(): number;
//     nbProduits(): number;
// }

// export abstract class Cargaison implements Cargaison_Proprety {
//     static dernierNumero: number = 0; 

//     id: number;
//     numero: string;
//     poidsMax: number | null;
//     produitMax: number | null;
//     prix_total: number;
//     lieu_depart: string;
//     lieu_arrivee: string;
//     produits: Produit[];
//     dateDepart: string;
//     dateArrivee: string;
//     mode_remplissage: string;
//     etat_Avancement: string;
//     etat_globale: string;
//     type: string;
//     distanceKm: number;

//     constructor(
//         distance: number,
//         dateDepart: string,
//         dateArrivee: string,
//         poidsMax: number | null,
//         produitMax: number | null,
//         type: string,
//         lieu_depart: string,
//         lieu_arrivee: string,
//         mode_remplissage: string,
//     ) {
//         this.id = ++Cargaison.dernierNumero; // Increment last number and assign to id
//         this.numero = this.genererNumero(); // Generate new number with prefix "GP" and ID
//         this.poidsMax = poidsMax;
//         this.produitMax = produitMax;
//         this.prix_total = 0; // Initialize prix_total to 0
//         this.lieu_depart = lieu_depart;
//         this.lieu_arrivee = lieu_arrivee;
//         this.produits = []; // Initialize produits to an empty array
//         this.dateDepart = this.formatDate(new Date(dateDepart));
//         this.dateArrivee = this.formatDate(new Date(dateArrivee));
//         this.mode_remplissage = mode_remplissage;
//         this.etat_Avancement = "En attente";
//         this.etat_globale = "ouvert";
//         this.type = type;
//         this.distanceKm = distance;
//     }

//     ajouterProduit(produit: Produit): void {
//         if (this.produitMax && this.produits.length >= this.produitMax) {
//             alert("La cargaison est pleine.");
//             return;
//         }

//         if (this.poidsMax && this.sommePoids() + produit.poids > this.poidsMax) {
//             alert("Le poids maximum de la cargaison est atteint.");
//             return;
//         }

//         if (produit instanceof Chimique && !(this instanceof CargaisonMaritime)) {
//             alert("Les produits chimiques doivent toujours transiter par voie maritime.");
//             return;
//         }

//         if (produit instanceof Materiel && produit.typeMateriel === "fragile" && this instanceof CargaisonMaritime) {
//             alert("Les produits fragiles ne doivent jamais passer par voie maritime.");
//             return;
//         }

//         this.produits.push(produit);
//         console.log(`Produit ajouté: ${produit.libelle}`);
//         console.log(`Montant actuel de la cargaison: ${this.sommeTotale()}`);
//     }

//     // Méthode pour générer le numéro de cargaison avec le préfixe "GP" et l'ID
//     private genererNumero(): string {
//         return `GP${this.id.toString().padStart(3, '0')}`;
//     }

//     // Méthode pour formater la date
//     private formatDate(date: Date): string {
//         const day = String(date.getUTCDate()).padStart(2, '0');
//         const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Les mois sont indexés de 0 à 11
//         const year = date.getUTCFullYear();
//         return `${day}/${month}/${year}`;
//     }

//     // Méthode abstraite pour calculer les frais
//     abstract calculerFrais(produit: Produit): number;

//     // Méthode pour calculer la somme totale
//     sommeTotale(): number {
//         return this.produits.reduce((total, produit) => total + this.calculerFrais(produit), 0);
//     }

//     // Méthode pour calculer la somme des poids
//     sommePoids(): number {
//         return this.produits.reduce((total, produit) => total + produit.poids, 0);
//     }

//     // Méthode pour obtenir le nombre de produits
//     nbProduits(): number {
//         return this.produits.length;
//     }
// }


// export class CargaisonMaritime extends Cargaison {
//     constructor(
//         distance: number,
//         dateDepart: string,
//         dateArrivee: string,
//         poidsMax: number | null,
//         produitMax: number | null,
//         lieu_depart: string,
//         lieu_arrivee: string,
//         mode_remplissage: string,
//     ) {
//         super(distance, dateDepart, dateArrivee, poidsMax, produitMax, "maritime", lieu_depart, lieu_arrivee, mode_remplissage);
//     }
//     calculerFrais(produit: Produit): number {
//         return produit.poids * this.distanceKm * 90;
//     }
// }

// export class CargaisonAerienne extends Cargaison {
//     constructor(
//         distance: number,
//         dateDepart: string,
//         dateArrivee: string,
//         poidsMax: number | null,
//         produitMax: number | null,
//         lieu_depart: string,
//         lieu_arrivee: string,
//         mode_remplissage: string,
//     ) {
//         super(distance, dateDepart, dateArrivee, poidsMax, produitMax, "aerienne", lieu_depart, lieu_arrivee, mode_remplissage);
//     }
//     calculerFrais(produit: Produit): number {
//         return produit.poids * this.distanceKm * 100;
//     }
// }

// export class CargaisonRoutiere extends Cargaison {
//     constructor(
//         distance: number,
//         dateDepart: string,
//         dateArrivee: string,
//         poidsMax: number | null,
//         produitMax: number | null,
//         lieu_depart: string,
//         lieu_arrivee: string,
//         mode_remplissage: string,
//     ) {
//         super(distance, dateDepart, dateArrivee, poidsMax, produitMax, "routiere", lieu_depart, lieu_arrivee, mode_remplissage);
//     }
//     calculerFrais(produit: Produit): number {
//         return produit.poids * this.distanceKm * 300;
//     }
// }


// /* CargaisonMaritime, CargaisonAerienne, CargaisonRoutiere */



//  // Méthode abstraite pour calculer les frais
//  abstract calculerFrais(produit: Produit): number;

//  // Méthode pour calculer la somme totale
//  sommeTotale(): number {
//      return this.produits.reduce((total, produit) => total + this.calculerFrais(produit), 0);
//  }

//  // Méthode pour calculer la somme des poids
//  sommePoids(): number {
//      return this.produits.reduce((total, produit) => total + produit.poids, 0);
//  }

//  // Méthode pour obtenir le nombre de produits
//  nbProduits(): number {
//      return this.produits.length;
//  }