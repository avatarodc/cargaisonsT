import { Produit, Alimentaire, Chimique, Materiel, ClientData, ProduitData } from '../produit';

export interface Cargaison_Proprety {
    cargaisons: any;
    id: number;
    numero: string;
    poidsMax: number | null;
    produitMax: number | null;
    prix_total: number;
    lieu_depart: string;
    lieu_arrivee: string;
    produits: ProduitData[];
    dateDepart: string;
    dateArrivee: string;
    mode_remplissage: string;
    etat_Avancement: string;
    etat_globale: string;
    type: string;
    distanceKm: number;

    ajouterProduit(produit: ProduitData): void;
    calculerFrais(produit: ProduitData): number;
    sommeTotale(): number;
    sommePoids(): number;
    nbProduits(): number;
}

export abstract class Cargaison implements Cargaison_Proprety {

    private static dernierId: number = Cargaison.recupererDernierId();

    id: number;
    numero: string;
    poidsMax: number | null;
    produitMax: number | null;
    prix_total: number;
    lieu_depart: string;
    lieu_arrivee: string;
    produits: ProduitData[];
    dateDepart: string;
    dateArrivee: string;
    mode_remplissage: string;
    etat_Avancement: string;
    etat_globale: string;
    type: string;
    distanceKm: number;

    constructor(
        distance: number,
        dateDepart: string,
        dateArrivee: string,
        poidsMax: number | null,
        produitMax: number | null,
        type: string,
        lieu_depart: string,
        lieu_arrivee: string,
        mode_remplissage: string,
    ) {
        this.id = ++Cargaison.dernierId;
        Cargaison.sauvegarderDernierId(Cargaison.dernierId);
        this.numero = Cargaison.genererNumero(this.id);
        this.poidsMax = poidsMax;
        this.produitMax = produitMax;
        this.prix_total = 0; 
        this.lieu_depart = lieu_depart;
        this.lieu_arrivee = lieu_arrivee;
        this.produits = [];
        this.dateDepart = dateDepart;
        this.dateArrivee = dateArrivee;
        this.mode_remplissage = mode_remplissage;
        this.etat_Avancement = "En attente";
        this.etat_globale = "ouvert";
        this.type = type;
        this.distanceKm = distance;
    }
    cargaisons: any;

    private static recupererDernierId(): number {
        const dernierIdStr = localStorage.getItem('dernierId');
        return dernierIdStr ? parseInt(dernierIdStr, 10) : 0;
    }

    private static sauvegarderDernierId(id: number): void {
        localStorage.setItem('dernierId', id.toString());
    }

    static genererNumero(id: number): string {
        return `GP${id.toString().padStart(3, '0')}`;
    }

    static parseDate(dateStr: string): Date {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    }

    static formatForJSON(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois sont basés sur 0
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    abstract calculerFrais(produit: ProduitData): number;

    ajouterProduit(produit: ProduitData): void {
        if (this.produitMax && this.produits.length >= this.produitMax) {
            alert("La cargaison est pleine.");
            return;
        }

        if (this.poidsMax && this.sommePoids() + produit.poids > this.poidsMax) {
            alert("Le poids maximum de la cargaison est atteint.");
            return;
        }

        if (produit instanceof Chimique && !(this instanceof Maritime)) {
            alert("Les produits chimiques doivent toujours transiter par voie maritime.");
            return;
        }

        if (produit instanceof Materiel && produit.typeMateriel === "fragile" && this instanceof Maritime) {
            alert("Les produits fragiles ne doivent jamais passer par voie maritime.");
            return;
        }

        this.produits.push(produit);
        console.log(`Produit ajouté: ${produit.libelle}`);
        console.log(`Montant actuel de la cargaison: ${this.sommeTotale()}`);
    }

    sommeTotale(): number {
        return this.produits.reduce((total, produit) => total + this.calculerFrais(produit), 0);
    }

    sommePoids(): number {
        return this.produits.reduce((total, produit) => total + produit.poids, 0);
    }

    nbProduits(): number {
        return this.produits.length;
    }
}

export class Maritime extends Cargaison {
    constructor(
        distance: number,
        dateDepart: string,
        dateArrivee: string,
        poidsMax: number | null,
        produitMax: number | null,
        lieu_depart: string,
        lieu_arrivee: string,
        mode_remplissage: string,
    ) {
        super(distance, dateDepart, dateArrivee, poidsMax, produitMax, "maritime", lieu_depart, lieu_arrivee, mode_remplissage);
    }

    calculerFrais(produit: ProduitData): number {
        return produit.poids * this.distanceKm * 90;
    }
}

export class Aerienne extends Cargaison {
    constructor(
        distance: number,
        dateDepart: string,
        dateArrivee: string,
        poidsMax: number | null,
        produitMax: number | null,
        lieu_depart: string,
        lieu_arrivee: string,
        mode_remplissage: string,
    ) {
        super(distance, dateDepart, dateArrivee, poidsMax, produitMax, "aerienne", lieu_depart, lieu_arrivee, mode_remplissage);
    }

    calculerFrais(produit: ProduitData): number {
        return produit.poids * this.distanceKm * 100;
    }
}

export class Routiere extends Cargaison {
    constructor(
        distance: number,
        dateDepart: string,
        dateArrivee: string,
        poidsMax: number | null,
        produitMax: number | null,
        lieu_depart: string,
        lieu_arrivee: string,
        mode_remplissage: string,
    ) {
        super(distance, dateDepart, dateArrivee, poidsMax, produitMax, "routiere", lieu_depart, lieu_arrivee, mode_remplissage);
    }

    calculerFrais(produit: ProduitData): number {
        return produit.poids * this.distanceKm * 300;
    }
}
