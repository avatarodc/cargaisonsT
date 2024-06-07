// Produit.ts

export interface ClientData {
    nom: string;
    adresse: string;
    telephone: string;
}

export class Client {
    nom: string;
    telephone: string;
    adresse: string;

    constructor(clientData: ClientData) {
        this.nom = clientData.nom;
        this.telephone = clientData.telephone;
        this.adresse = clientData.adresse;
    }
}

export interface ProduitData {
    poidsProduit: number;
    libelle: string;
    poids: number;
    type_produit: string;
    prix_kg: number;
    prix_total: number;
    client: ClientData;
    destinataire: ClientData;
}

export abstract class Produit {
    libelle: string;
    poids: number;
    type_produit: string;
    prix_kg: number;
    prix_total: number;
    client: Client;
    destinataire: Client;

    constructor(
        libelle: string,
        poids: number,
        type_produit: string,
        clientData: ClientData,
        destinataireData: ClientData
    ) {
        this.libelle = libelle;
        this.poids = poids;
        this.type_produit = type_produit;
        this.prix_kg = 0; // Initialize to 0, will be calculated later
        this.prix_total = 0; // Initialize to 0, will be calculated later
        this.client = new Client(clientData);
        this.destinataire = new Client(destinataireData);
    }
}

export class Alimentaire extends Produit {
    constructor(libelle: string, poids: number, client:  ClientData, destinataire:  ClientData) {
        super(libelle, poids, 'Alimentaire', client, destinataire);
    }
}

export class Chimique extends Produit {
    toxicite: number;
    constructor(libelle: string, poids: number, client:  ClientData, destinataire:  ClientData, toxicite: number) {
        super(libelle, poids, 'Chimique', client, destinataire);
        this.toxicite = toxicite;
    }
}

export class Materiel extends Produit {
    typeMateriel: string;
    constructor(libelle: string, poids: number, client:  ClientData, destinataire:  ClientData, typeMateriel: string) {
        super(libelle, poids, 'Materiel', client, destinataire);
        this.typeMateriel = typeMateriel;
    }
}









// export class Produit {
//     constructor(public libelle: string, public poids: number) {}
//   }
  
  


// export class Alimentaire extends Produit {}



// export class Chimique extends Produit {
//     constructor(libelle: string, poids: number, public toxicite: number) {
//         super(libelle, poids);
//     }
// }



// export class Materiel extends Produit {
//     constructor(libelle: string, poids: number, public typeMateriel: string) {
//         super(libelle, poids);
//     }
// }