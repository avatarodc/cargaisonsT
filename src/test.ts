type Cargaison = {
    produits: any[];
    etatAvancement: string;
    etat_globale: string;
    id: number;
    numero: string;
    poidsMax: number | null;
    produitMax: number;
    prixTotal: number;
    lieu_depart: string;
    lieu_arrivee: string;
    dateDepart: string;
    dateArrivee: string;
    modeRemplissage: string;
    type: string;
    distanceKm: number;
};

type CargaisonsResponse = {
    cargaisons: Cargaison[];
};

function getCargaisonIds(jsonData: CargaisonsResponse): number[] {
    return jsonData.cargaisons.map(cargaison => cargaison.id);
}

// Example usage
const jsonData: CargaisonsResponse = {
    "cargaisons": [
        {
            "produits": [],
            "etatAvancement": "En cours",
            "etat_globale": "Ouvert",
            "id": 1,
            "numero": "GP001",
            "poidsMax": null,
            "produitMax": 92,
            "prixTotal": 0,
            "lieu_depart": "Duis non id velit e",
            "lieu_arrivee": "Vero aut voluptatum",
            "dateDepart": "03/06/2010",
            "dateArrivee": "16/03/2017",
            "modeRemplissage": "produitMax",
            "type": "maritime",
            "distanceKm": 85
        },
        {
            "produits": [],
            "etatAvancement": "En cours",
            "etat_globale": "Ouvert",
            "id": 2,
            "numero": "GP002",
            "poidsMax": null,
            "produitMax": 15,
            "prixTotal": 0,
            "lieu_depart": "Dolorum pariatur Di",
            "lieu_arrivee": "Harum possimus enim",
            "dateDepart": "20/03/2006",
            "dateArrivee": "09/05/1994",
            "modeRemplissage": "produitMax",
            "type": "maritime",
            "distanceKm": 32
        },
        {
            "produits": [],
            "etatAvancement": "En cours",
            "etat_globale": "Ouvert",
            "id": 3,
            "numero": "GP003",
            "poidsMax": null,
            "produitMax": 15,
            "prixTotal": 0,
            "lieu_depart": "Dolorum pariatur Di",
            "lieu_arrivee": "Harum possimus enim",
            "dateDepart": "20/03/2006",
            "dateArrivee": "09/05/1994",
            "modeRemplissage": "produitMax",
            "type": "maritime",
            "distanceKm": 32
        }
    ]
};

const cargaisonIds = getCargaisonIds(jsonData);
console.log(cargaisonIds); // Output: [1, 2, 3]
