<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('data.json'), true);

$requestMethod = $_SERVER['REQUEST_METHOD'];
$cargaisonId = isset($_GET['id']) ? $_GET['id'] : null;
$productAction = isset($_GET['products']);

/**
 * Recherche une cargaison par ID.
 * @param array $data Données de toutes les cargaisons.
 * @param string $cargaisonId ID de la cargaison à rechercher.
 * @return array|null Retourne la cargaison si trouvée, sinon null.
 */
function findCargaison(&$data, $cargaisonId) {
    foreach ($data['cargaisons'] as &$cargaison) {
        if ($cargaison['id'] == $cargaisonId) {
            return $cargaison;
        }
    }
    return null;
}

/**
 * Sauvegarde les données dans le fichier JSON.
 * @param array $data Données à sauvegarder.
 */
function saveData($data) {
    if (file_put_contents('data.json', json_encode($data, JSON_PRETTY_PRINT)) === false) {
        http_response_code(500);
        echo json_encode(array("message" => "Erreur lors de la sauvegarde des données"));
        exit();
    }
}

// Gestion des requêtes GET
if ($requestMethod === 'GET') {
    if ($cargaisonId) {
        $cargaison = findCargaison($data, $cargaisonId);
        if ($cargaison) {
            if ($productAction) {
                echo json_encode($cargaison['produits']);
            } else {
                echo json_encode($cargaison);
            }
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Cargaison non trouvée"));
        }
    } else {
        echo json_encode($data);
    }
}

// Gestion des requêtes POST
if ($requestMethod === 'POST') {
    $inputData = json_decode(file_get_contents('php://input'), true);
    if (isset($_REQUEST["ajouter"])) {
        $id = $_REQUEST["ajouter"];
        foreach ($data['cargaisons'] as $k => $v) {
            if ($v["id"] == $id) {
                $data['cargaisons'][$k]["produits"][] = $inputData;
                saveData($data);
            }
        }
        echo json_encode($data['cargaisons']);
    } else {
        if (isset($inputData['action']) && $inputData['action'] === 'changerEtatCargo') {
            $idCargo = $inputData['idcargo'];
            $newState = $inputData['newState'];

            $currentData = $data;  

            foreach ($currentData['cargaisons'] as &$cargaison) {
                if ($cargaison['id'] == $idCargo) {
                    if ($cargaison['etatAvancement'] === 'en cours') {
                        echo json_encode(["status" => "error", "message" => "La cargaison est en cours"]);
                        exit;
                    }
                    $cargaison['etat_globale'] = $newState;
                    break;
                }
            }
            saveData($currentData);  
            echo json_encode(["status" => "success", "message" => "État de la cargaison mis à jour avec succès"]);
            exit;
        } elseif (isset($inputData['action']) && $inputData['action'] === 'changerEtatAvancement') {
            $idCargo = $inputData['idcargo'];
            $newAvancement = $inputData['newAvancement'];

            $currentData = $data;  

            foreach ($currentData['cargaisons'] as &$cargaison) {
                if ($cargaison['id'] == $idCargo) {
                    if ($cargaison['etat_globale'] === 'ferme') {
                        echo json_encode(["status" => "error", "message" => "La cargaison est fermée"]);
                        exit;
                    }
                    $cargaison['etat_Avancement'] = $newAvancement;
                    break;
                }
            }
            saveData($currentData);  
            echo json_encode(["status" => "success", "message" => "État d'avancement de la cargaison mis à jour avec succès"]);
            exit;
        } else if(isset($inputData['action']) && $inputData['action'] === 'supprimerProduit') {
            $idCargo = $inputData['cargoId']; // Renommez idcargo en cargoId
            $codeProduit = $inputData['codeProduit']; // Renommez idproduit en codeProduit
        
            $currentData = $data;  
        
            foreach ($currentData['cargaisons'] as &$cargaison) {
                if ($cargaison['id'] == $idCargo) {
                    if ($cargaison['etat_globale'] === 'ferme') {
                        echo json_encode(["status" => "error", "message" => "La cargaison est fermée"]);
                        exit;
                    }
                    foreach ($cargaison['produits'] as $index => $produit) {
                        if ($produit['codeProduit'] == $codeProduit) { // Utilisez codeProduit au lieu de id
                            array_splice($cargaison['produits'], $index, 1);
                            break;
                        }
                    }
                    break;
                }
            }
            saveData($currentData);  
            echo json_encode(["status" => "success", "message" => "Produit supprimé avec succès"]);
            exit;
        }
        else {
            if ($cargaisonId && $productAction) {
                foreach ($data['cargaisons'] as &$cargaison) {
                    if ($cargaison['id'] == $cargaisonId) {
                        if ($cargaison['etat_globale'] === 'ferme') {
                            http_response_code(403);
                            echo json_encode(array("message" => "La cargaison est fermée et ne peut pas recevoir de produit"));
                            return;
                        }
                        $cargaison['produits'][] = $inputData;
                        saveData($data);
                        http_response_code(201);
                        echo json_encode(array("message" => "Produit ajouté avec succès à la cargaison"));
                        return;
                    }
                }
                http_response_code(404);
                echo json_encode(array("message" => "Cargaison non trouvée"));
            } else {
                $data['cargaisons'][] = $inputData;
                saveData($data);
                http_response_code(201);
                echo json_encode(array("message" => "Cargaison ajoutée avec succès"));
            }
        }
    }
}




// B2QMAHLZF7DCT9P8RLH3Z37E



if (!isset($_SESSION['dernierId'])) {
    $_SESSION['dernierId'] = 0;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['action'] === 'getDernierId') {
    echo json_encode(['dernierId' => $_SESSION['dernierId']]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] === 'updateDernierId') {
    $_SESSION['dernierId'] = $_POST['dernierId'];
    echo json_encode(['success' => true]);
    exit;
}




