<?php
session_start(); // Démarrez la session

// Vérifiez si l'utilisateur est connecté
if (isset($_SESSION['username'])) {

    $_SESSION = array();
    // Détruisez la session
    // var_dump($_SESSION['username']);
    // die();
    session_destroy();
}

// Empêchez la mise en cache de la page
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

// Redirigez vers la page de connexion
header("Location: http://www.mamadou.gueye:8777/GPduMonde/php/home.php");
exit;
?>
