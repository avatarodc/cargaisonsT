import { Cargaison_Proprety } from "./types/cargaison";
import { ProduitData } from "./produit";


// Fonction générique pour gérer les requêtes fetch
export async function fetchRequest<T>(url: string, options?: RequestInit): Promise<T | undefined> {
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const tab =  await response.json();
        // console.log("tableau recup:",tab);
        return tab;
    } catch (error) {
        console.error('Fetch error:', error);
        return undefined;
    }
}

// Fonction pour lire les données depuis le serveur
export const fetchDataFromServer = <T>(url: string): Promise<T | undefined> => {
    return fetchRequest<T>(url);
}

// Fonction pour écrire les données vers le serveur
export const sendDataToServer = <T>(url: string, payload: T): Promise<void> => {
    return fetchRequest<void>(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
}


export const sendMail = <T>(arg: string): Promise<T | undefined> => {
    return fetchRequest<T>("mail.php?mail="+arg);
}



// Fonction pour sauvegarder une nouvelle cargaison vers le serveur
export const saveNewCargoToServer = (cargo: Cargaison_Proprety): Promise<void> => {
    return sendDataToServer<Cargaison_Proprety>('../php/api.php', cargo);
}




// Fonction pour lire les données du serveur
export async function readDataFromServer<T>(url: string): Promise<T | undefined> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error reading data:', error);
        return ;
    }
}
export async function writeDataToServer<T>(url: string, newObject: T, cargoId?: number): Promise<void> {
    try {
        let postUrl = url;
        if (cargoId) {
            postUrl += `?cargaisonId=${cargoId}&productAction=add`;
        }

        const response = await fetch(postUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newObject),
        });

        if (!response.ok) {
            throw new Error('Failed to save data');
        }

        console.log('New object saved successfully');
    } catch (error) {
        console.error('Error writing data:', error);
    }
}

export async function saveNewProductToServer(produitData: ProduitData, cargoId: number): Promise<void> {
    await writeDataToServer<ProduitData>('../php/api.php', produitData, cargoId);
}



// async function loginUser(email: string, password: string) {
//     try {
//         // Récupérer la liste des utilisateurs depuis la base de données
//         const users = await fetchUsers();
        
//         // Trouver l'utilisateur correspondant à l'email donné
//         const user = users.find((u: any) => u.email === email);
        
//         // Vérifier si l'utilisateur existe et si le mot de passe correspond
//         if (user && user.password === password) {
//             // Vérifier le rôle de l'utilisateur
//             if (user.role === 'admin') {
//                 // L'utilisateur est un gestionnaire, connexion autorisée
//                 console.log("Connexion réussie en tant que gestionnaire.");
//                 return user;
//             } else {
//                 // L'utilisateur n'est pas un gestionnaire, connexion refusée
//                 throw new Error("Vous n'avez pas les autorisations nécessaires pour vous connecter.");
//             }
//         } else {
//             // Identifiants incorrects, connexion refusée
//             throw new Error("Identifiants incorrects.");
//         }
//     } catch (error) {
//         console.error("Erreur lors de la connexion :", error);
//         throw error; 
//     }
// }
