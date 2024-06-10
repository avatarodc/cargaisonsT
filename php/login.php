<?php
// Démarrez la session
session_start();

// Vérifie si les données POST ont été soumises
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupère les données du formulaire de connexion
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Charge les utilisateurs depuis le fichier JSON
    $usersData = file_get_contents('users.json');
    $users = json_decode($usersData, true);

    // Vérifie les informations de connexion
    $loggedIn = false;
    foreach ($users as $user) {
        if ($user['username'] === $username && $user['password'] === $password) {
            $loggedIn = true;
            // Définit une variable de session pour indiquer que l'utilisateur est connecté
            $_SESSION['username'] = $username;
            break;
        }
    }

    // Si les informations de connexion sont valides, redirige vers le dashboard
    if ($loggedIn) {
        header("Location: http://www.mamadou.gueye:8777/GPduMonde/php/index.php?page=cargaisons");
        exit;
    } else {
        // Sinon, affiche un message d'erreur
        echo "Nom d'utilisateur ou mot de passe incorrect.";
    }
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GP-Monde - Login</title>
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script src="https://unpkg.com/@turf/turf/turf.min.js"></script>
    <script src="https://kit.fontawesome.com/d2ba3c872c.js" crossorigin="anonymous"></script>
</head>

<body class="flex flex-col h-screen w-screen">
    <div class="bg-black h-[50%] w-full flex justify-center items-center">
        <!-- <img src="./public/img/GP.png" alt="" class="absolute top-[53%] w-[10%] left-0"> -->
        <img src="./public/img/Group 2322.png" alt="" class="absolute top-2 left-[45%]">
        <div class="login bg-white rounded-[7%] h-[120%] w-3/12 relative top-[50%] z-10 flex flex-col justify-center items-center">
            <div class="logo">
                <img src="./public/img/Frame 348.png" alt="Flowbite" class="h-31 w-44 self-center"/>
            </div>
            <span class="font-bold mt-4 mb-4 text-[1.5rem]">Bienvenue dans GP-Monde</span>
            <div class="flex w-full">
                <form class="max-w-sm mx-auto w-full " method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
                    <div class="mb-5">
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Nom
                            d'utilisateur</label>
                        <input type="text" id="username" name="username"
                            class="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Nom d'utilisateur" required />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Mot
                            de passe</label>
                        <input type="password" id="password" name="password"
                            class="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Mot de passe" required />
                    </div>
                    <button type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connexion</button>
                </form>
            </div>
        </div>
        <div class="bg-purple-700 rounded-[7%] h-[57.5%] w-3/12 absolute top-[23%] left-[38.2%] z-0">

        </div>
        <div class="bg-purple-500 rounded-[7%] h-[57.5%] w-3/12 absolute top-[24%] left-[37%] z-0">

        </div>
    </div>
</body>

</html>
