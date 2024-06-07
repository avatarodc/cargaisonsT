<?php

// Inclusion de l'autoloader de Composer
require '/var/www/html/GPduMonde/vendor/autoload.php';  // Assurez-vous que ce chemin est correct

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Chemin vers le fichier data.json
$dataFile = 'data.json';


// Fonction pour envoyer un email avec PHPMailer
function envoyerMail($cargo) {
    $mail = new PHPMailer(true);

    try {
        // Configuration du serveur SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'papis.g.98@gmail.com';  // Remplacez par votre adresse email
        $mail->Password = 'sumv twwu ybhp aqvu';  // Remplacez par votre mot de passe d'application
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        $subject = "Statut de votre cargaison";
        $body = "Le statut de la cargaison a changé à : " . $cargo['statut'];
        
        // Envoyer l'email au client
        foreach ($cargo['produits'] as $produit) {
            sender($mail, [
                "mail"=>$produit["emetteurEmail"],
                "sujet"=>$subject,
                "msg"=>"Cher(e) {$produit["emetteurPrenom"]} {$produit["emetteurNom"]} l'état du cargaison est {$cargo["etat_Avancement"]}"
            ]);
            sender($mail, [
                "mail"=>$produit["recepteurEmail"],
                "sujet"=>$subject,
                "msg"=>"Cher(e) {$produit["recepteurPrenom"]} {$produit["recepteurNom"]} l'état du cargaison est {$cargo["etat_Avancement"]}"
            ]);
        }
        

        echo json_encode(['success' => true, 'message' => 'Email envoyé avec succès.']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => "Erreur lors de l'envoi de l'email: {$mail->ErrorInfo}"]);
    }
}


function sender($mail, $info){
    $mail->setFrom('papis.g.98@gmail.com', 'Votre Compagnie de Transport');
    $mail->addAddress($info["mail"]);
    $mail->isHTML(true);
    $mail->Subject = $info["sujet"];
    $mail->Body = $info["msg"];
    $mail->send();
    $mail->clearAddresses();
}



$data = json_decode(file_get_contents("data.json"), true);
if (isset($_REQUEST["mail"])) {
    $request = $_REQUEST["mail"];

    if($request == "tout"){
        foreach ($data["cargaisons"] as $k => $v) {
            echo "<pre>";
            print_r($v);
            echo "</pre><br>";
            envoyerMail($v);
        }
        echo "les mails sont envoyer";
    }
}


?>
