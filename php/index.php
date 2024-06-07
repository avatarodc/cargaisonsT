<?php
$page = isset($_GET['page']) ? $_GET['page'] : 'dashboard';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GP DUMONDE</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="../dist/styles.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>

    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body class="bg-gray-100 min-h-screen flex flex-col">
    <header class="bg-white shadow">
        <?php include 'Components/navbar.php'; ?>
    </header>
    
    <div class="flex flex-1">
        <?php include 'Components/sidebar.php'; ?>
        
        <main class="flex-1 p-6">
            <?php
            switch ($page) {
                case 'dashboard':
                    include 'dashboard.php';
                    break;
                case 'contact':
                    include 'contact.php';
                    break;
                case 'cargaisons':
                    include 'cargaisons.php';
                    break;
                case 'cargaison_detail':
                    include 'cargaison_detail.php';
                    break;
                default:
                    include 'dashboard.php';
            }
            ?>
        </main>
    </div>

    <footer class="bg-white p-4 shadow mt-auto">
        <?php include 'Components/footer.php'; ?>
    </footer>
</body>
</html>
