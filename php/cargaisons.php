<style>
    #map {
        height: 180px;
    }
    .notification {
      display: none; /* Ne pas afficher par défaut */
      position: fixed;
      top: 15%;
      width: 20%;
      margin-right: 5%;
      left: 90%;
      transform: translate(-50%, -50%);
      background-color: #ff4d4d; /* Rouge clair pour les erreurs */
      color: #fff;
      padding: 20px 30px; /* Plus grand */
      border-radius: 10px;
      font-size: 1.5em; /* Texte plus grand */
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
      transition: opacity 0.5s ease-in-out;
      opacity: 0;
      z-index: 1000;
      animation: fadeInOut 5s ease-in-out;
    }
  .custom-select {
    position: relative;
    display: inline-block;
    width: 100%;
  }
  .custom-select select {
    display: block;
    width: 100%;
    padding: 0.5rem 2rem 0.5rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .custom-select::after {
    content: '\25BC';
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    pointer-events: none;
    color: #495057;
  }

  select {
    background-color: #fff; /* Fond du select */
  }

  option {
    background-color: #f8f9fa; /* Fond de l'option */
  }
    @keyframes fadeInOut {
      0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
      10% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
      30% { transform: translate(-50%, -50%) scale(1); }
      70% { transform: translate(-50%, -50%) scale(1); }
      90% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    }

    @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 10px rgba(0, 13, 255, 0.5);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 0 20px rgba(0, 13, 255, 0.7);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 10px rgba(0, 13, 255, 0.5);
    }
  }
</style>

<?php
$data = json_decode(file_get_contents('./data.json'), true);
$cargaison = $data['cargaisons'];
?>

<div id="cargoDetails" class="hidden">
    <!-- Les détails de la cargaison seront affichés ici -->
</div>

<section id="cargaisons" class="  ">
    <div class="container mx-auto p-4">
        <div class="mb-4 py-2 shadow">
            <div style="display: flex; align-items: center; margin: 1rem; justify-content: space-between; ">
                <h1 style="color:#7e3af2; margin-bottom: 0;" class="text-2xl text-black-700 font-bold">Cargaisons</h1>
                <div>
                    <button onclick="my_modal_3.showModal()" class="px-4  py-4 text-sm font-bold leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                        Ajouter Cargaison
                        <span class="ml-2" aria-hidden="true">+</span>
                    </button>
                </div>
            </div>

        </div>
        <!-- You can open the modal using ID.showModal() method -->
        <a class="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple" href="https://github.com/avatarodc/GPDUMONDE">
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span>Star this project on GitHub</span>
            </div>
            <span>View more &RightArrow;</span>
        </a>
        <td class="px-4 py-3">
            <button onclick="afficherDetails(<?php echo json_encode($c); ?>)">Détails</button>
        </td>

        <!-- <button style="background-color:#7e3af2" class="btn text-white" onclick="my_modal_3.showModal()">Ajouter Cargaison  +</button> -->
        <dialog id="my_modal_3" class="modal fixed inset-0  flex items-center justify-center">
            <div class="modal-box w-3/6 max-w-none max-h-full bg-white p-8 rounded-lg shadow-lg">
                <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <!-- Formulaire pour ajouter une cargaison -->
                <h1 class="text-2xl font-bold text-gray-700 mb-6">Ajouter une Cargaison</h1>
                <div class="bg-white p-4 rounded shadow-md border-2 border-[#7e3af2]">
                    <form id="cargaisonForm" method="POST" class="space-y-4">
                        <div>
                            <label for="type_cargaison" class="block text-sm font-medium text-gray-700">Type de Cargaison</label>
                            <select id="type_cargaison" name="type_cargaison" data-label="isNotEmpty" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-[#7e3af2] focus:outline-none focus:ring-indigo-500 focus:border-[#7e3af2] sm:text-sm rounded-md bg-white">
                                <option value="">Veuillez sélectionner le type</option>
                                <option value="aerienne">Aérienne</option>
                                <option value="maritime">Maritime</option>
                                <option value="routiere">Routière</option>
                            </select>
                            <div id="type_cargaisonError" class="text-red-500 h-5 text-sm"></div>
                        </div>
                        <div>
                            <label for="lieu_depart" class="block text-sm font-medium text-gray-700">Lieu de départ</label>
                            <input type="text" id="lieu_depart" name="lieu_depart" data-label="isNotEmpty" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-[#7e3af2] focus:outline-none focus:ring-indigo-500 focus:border-[#7e3af2] sm:text-sm rounded-md bg-white">
                            <div id="lieu_departError" class="text-red-500 h-5 text-sm"></div>
                        </div>
                        <div>
                            <label for="lieu_arrivee" class="block text-sm font-medium text-gray-700">Lieu d'arrivée</label>
                            <input type="text" id="lieu_arrivee" name="lieu_arrivee" data-label="isNotEmpty" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-[#7e3af2] focus:outline-none focus:ring-indigo-500 focus:border-[#7e3af2] sm:text-sm rounded-md bg-white">
                            <div id="lieu_arriveeError" class="text-red-500 h-5 text-sm"></div>
                        </div>
                        <div>
                            <label for="distance" class="block text-sm font-medium text-gray-700">Distance</label>
                            <input type="number" id="distance" name="distance" data-label="isPositiveNumber" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-[#7e3af2] focus:outline-none focus:ring-indigo-500 focus:border-[#7e3af2] sm:text-sm rounded-md bg-white">
                            <div id="distanceError" class="text-red-500 h-5 text-sm"></div>
                        </div>
                        <div>
                            <label for="dateDepart" class="block text-sm font-medium text-gray-700">Date de Départ</label>
                            <input type="date" id="dateDepart" name="dateDepart" data-label="isValidDate" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-[#7e3af2] focus:outline-none focus:ring-indigo-500 focus:border-[#7e3af2] sm:text-sm rounded-md bg-white">
                            <div id="dateDepartError" class="text-red-500 h-5 text-sm"></div>
                        </div>
                        <div>
                            <label for="dateArrivee" class="block text-sm font-medium text-gray-700">Date d'Arrivée</label>
                            <input type="date" id="dateArrivee" name="date_arrivee" data-label="isValidDate" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-[#7e3af2] focus:outline-none focus:ring-indigo-500 focus:border-[#7e3af2] sm:text-sm rounded-md bg-white">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Mode de remplissage de la cargaison</label>
                            <div class="mt-1">
                                <input type="radio" id="produitMaxRadio" name="mode_remplissage" value="produitMax">
                                <label for="produitMaxRadio" class="ml-2 text-sm text-gray-700">Par nombre de produits</label>
                            </div>
                            <div class="mt-1">
                                <input type="radio" id="poidsMaxRadio" name="mode_remplissage" value="poidsMax">
                                <label for="poidsMaxRadio" class="ml-2 text-sm text-gray-700">Par poids maximal</label>
                            </div>
                        </div>
                        <div id="champ_produits" class="hidden">
                            <label for="produitMax" class="block text-sm font-medium text-gray-700">Nombre de produits max</label>
                            <input type="number" id="produitMax" name="produitMax" data-label="isPositiveNumberNull" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-[#7e3af2] focus:outline-none focus:ring-indigo-500 focus:border-[#7e3af2] sm:text-sm rounded-md bg-white">
                        </div>
                        <div id="champ_poids" class="hidden">
                            <label for="poid_max" class="block text-sm font-medium text-gray-700">Poids Maximal de la Cargaison (Kg)</label>
                            <input type="number" id="poid_max" name="poid_max" data-label="isPositiveNumberNull" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-[#7e3af2] focus:outline-none focus:ring-indigo-500 focus:border-[#7e3af2] sm:text-sm rounded-md bg-white">
                            <div id="poid_maxError" class="text-red-500 h-5 text-sm"></div>
                        </div>
                        <input type="hidden" id="mode_remplissage_hidden" name="mode_remplissage">
                        <div id="dateArriveeError" class="text-red-500 h-5 text-sm"></div>
                        <div class="flex justify-between mt-6">
                            <button type="submit" class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Ajouter Cargaison</button>
                            <!-- <button type="reset" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Annuler</button> -->
                        </div>
                        <div id="map" class="mt-6"></div>
                    </form>
                </div>

            </div>
        </dialog>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <input id="searchNumero" type="text" placeholder="Filtrer par Numéro" class="py-3 border-purple-300 bg-white text-white-100 px-4 border focus:bg-white focus:border-purple-700 focus:outline-none focus:shadow-outline-purple rounded-lg">
            <input id="lieuDepart" type="text" placeholder="Filtrer par Pays de Départ" class="py-3 border-purple-300 bg-white text-white-100 px-4 border focus:bg-white focus:border-purple-700 focus:outline-none focus:shadow-outline-purple rounded-lg">
            <input id="lieuArrivee" type="text" placeholder="Filtrer par Pays d'Arrivée" class="py-3 border-purple-300 bg-white text-white-100 px-4 border focus:bg-white focus:border-purple-700 focus:outline-none focus:shadow-outline-purple rounded-lg">
            <input id="filterStatus" type="text" placeholder="Filtrer par Statut" class="py-3 border-purple-300 bg-white text-white-100 px-4 border focus:bg-white focus:border-purple-700 focus:outline-none focus:shadow-outline-purple rounded-lg">
            <input id="dateStart" type="date" placeholder="Filtrer par Statut" class="py-3 border-purple-300 bg-white text-white-100 px-4 border focus:bg-white focus:border-purple-700 focus:outline-none focus:shadow-outline-purple rounded-lg">
            <input id="dateEnd" type="date" placeholder="Filtrer par Statut" class="py-3 border-purple-300 bg-white text-white-100 px-4 border focus:bg-white focus:border-purple-700 focus:outline-none focus:shadow-outline-purple rounded-lg">
        </div>

        <!-- Table to display cargos -->

        <div class="w-full overflow-hidden rounded-lg shadow-xs">
            <div class="w-full overflow-x-auto">
                <table class="w-full whitespace-no-wrap">
                    <thead>
                        <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <!-- Table headers -->
                            <th class="px-4 py-3">Code</th>
                            <th class="px-4 py-3">Date Départ</th>
                            <!-- <th class="px-4 py-3">Max Prod / Poids</th> -->
                            <th class="px-4 py-3">Date Arrivée</th>
                            <!-- <th class="px-4 py-3">Type</th> -->
                            <th class="px-4 py-3">Lieu Départ</th>
                            <th class="px-4 py-3">Lieu Arrivée</th>
                            <th class="px-4 py-3">Status</th>
                            <th class="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="cargoTableBody" class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        <?php foreach ($cargaison as $c) : ?>
                            <tr class="text-gray-700 dark:text-gray-400">
                                <td class="px-4 py-3"><?php echo $c['numero']; ?></td>
                                <td class="px-4 py-3"><?php echo $c['mode_remplissage']; ?></td>
                                <td class="px-4 py-3">
                                    <?php
                                    if ($c['poidsMax'] !== null) {
                                        echo $c['poidsMax'] . ' kg';
                                    } elseif ($c['produitMax'] !== null) {
                                        echo $c['produitMax'];
                                    } elseif ($c['produitMax'] !== null) {
                                        echo $c['produitMax'];
                                    } else {
                                        echo '-';
                                    }
                                    ?>
                                </td>
                                <td class="px-4 py-3"><?php echo $c['dateDepart']; ?></td>
                                <td class="px-4 py-3"><?php echo $c['dateArrivee']; ?></td>
                                <td class="px-4 py-3"><?php echo $c['type']; ?></td>
                                <td class="px-4 py-3"><?php echo $c['lieu_depart']; ?></td>
                                <td class="px-4 py-3"><?php echo $c['lieu_arrivee']; ?></td>
                                <td class="px-4 py-3"><?php echo $c['etat_globale']; ?></td>
                                <td class="px-4 py-3">
                                    <!-- Action buttons, e.g., edit, delete -->
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>

            </div>
            <div id="pagination" class="ml-auto py-3 text-sm font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">

                <span class="flex items-center col-span-3">
                    <!-- Showing 21-30 of 100 -->
                </span>
                <span class="col-span-2"></span>
                <!-- Pagination -->

            </div>

        </div>
        <!-- Pagination controls -->
        <div class="flex justify-between mt-3">
            <span id="pageInfo" class="mx-2"></span>
            <div id="paginationControls" class="mt-3">
                <button id="prevPage" style="background-color: #7e3af2;" class=" text-white p-2 rounded">
                    < </button><span id="pageInfo" class="mx-2"></span>
                        <button id="nextPage" style="background-color: #7e3af2;" class="bg-gray-500 text-white p-2 rounded">></button>
            </div>
        </div>

    </div>

    <!-- Popup pour message d'alerte -->
    <div id="notification" class="notification"></div>

    <script src="../dist/cargaisons.js"></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script>
        var map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);


        var depart;
        var arrive;

        function handleClick(e) {
            const arriv = document.getElementById('lieu_arrivee');
            console.log(arriv);
            const depar = document.getElementById('lieu_depart');

            if (!depart || (depar.value == "")) {
                //effacer dabord le marqueur depart si il y en a un
                if (depart) {
                    map.removeLayer(depart);
                }
                var lat = e.latlng.lat;
                var lng = e.latlng.lng;
                var url = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng;
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        var country = data.address.country;
                        depar.value = country;
                    })
                    .catch(error => {
                        console.error(error);
                    });
                var marker = L.marker([lat, lng]).addTo(map);
                marker.bindPopup('Depart ').openPopup();
                depart = marker;

            } else if (!arrive || (arriv.value == "")) {
                //effacer dabord le marqueur arrive si il y en a un
                if (arrive) {
                    map.removeLayer(arrive);
                }
                var lat = e.latlng.lat;
                var lng = e.latlng.lng;
                var url = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng;
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        var country = data.address.country;
                        arriv.value = country;
                    })
                    .catch(error => {
                        console.error(error);
                    });
                var marker = L.marker([lat, lng]).addTo(map);
                marker.bindPopup('Arrivee ').openPopup();
                arrive = marker;
            }

            calculateDistance();
        }

        function calculateDistance() {
            var distance = depart.getLatLng().distanceTo(arrive.getLatLng()) / 1000;
            const distanceElement = document.getElementById('distance');
            distanceElement.value = distance.toFixed(2);
        }

        map.on('click', handleClick);
    </script>

    <script>
        function closeModal() {
            const modal = document.getElementById('my_modal_4');
            modal.close();
        }
    </script>


    <dialog id="my_modal_4" class="modal">
        <div class="modal-box w-11/12 max-w-3xl bg-white shadow-md rounded-md p-6">

            <h3 class="font-bold text-lg text-purple-500 mb-4">Ajouter un nouveau produit</h3>
            <form id="addProductForm" class="grid grid-cols-2 gap-6">
                <input type="hidden" id="cargaisonId" name="cargaisonId">
                <div class="col-span-2 flex flex-col mb-4">
                    <div class="mb-4">
                        <label for="libelleProduit" class="text-gray-700">Libellé</label>
                        <input style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" type="text" id="libelleProduit" name="libelleProduit" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                        <span id="libelleProduit-error" class="text-red-500"></span>
                    </div>
                    <div class="mb-4">
                        <label for="prixProduit" class="text-gray-700">Prix</label>
                        <input style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" type="number" id="prixProduit" name="prixProduit" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                        <span id="prixProduit-error" class="text-red-500"></span>
                    </div>
                    <div class="mb-4">
                        <label for="typeProduit" class="text-gray-700">Type Produit</label>
                        <select style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" name="typeProduit" id="typeProduit" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <option value="alimentaire">Alimentaire</option>
                            <option value="chimique">Chimique</option>
                            <option value="incassable">Incassable</option>
                            <option value="fragile">Fragile</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="poidsProduit" class="text-gray-700">Poids</label>
                        <input style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" type="number" id="poidsProduit" name="poidsProduit" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                        <span id="poidsProduit-error" class="text-red-500"></span>
                    </div>
                </div>
                <div class="col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <!-- Émetteur -->
                    <div class="flex flex-col">
                        <h4 class="font-bold text-purple text-sm mb-2">Émetteur</h4>
                        <div class="mb-4">
                            <label for="emetteurNom" class="text-gray-700">Nom</label>
                            <input style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" type="text" id="emetteurNom" name="emetteurNom" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="emetteurNom-error" class="text-red-500"></span>
                        </div>
                        <div class="mb-4">
                            <label for="emetteurPrenom" class="text-gray-700">Prénom</label>
                            <input style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" type="text" id="emetteurPrenom" name="emetteurPrenom" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="emetteurPrenom-error" class="text-red-500"></span>
                        </div>
                        <div class="mb-4">
                            <label for="emetteurAdresse" class="text-gray-700">Adresse</label>
                            <input style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" type="text" id="emetteurAdresse" name="emetteurAdresse" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="emetteurAdresse-error" class="text-red-500"></span>
                        </div>
                        <div class="mb-4">
                            <label for="emetteurEmail" class="text-gray-700">Email</label>
                            <input style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" type="email" id="emetteurEmail" name="emetteurEmail" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="emetteurEmail-error" class="text-red-500"></span>
                        </div>
                        <div class="mb-4">
                            <label for="emetteurTelephone" class="text-gray-700">Téléphone</label>
                            <input style="background : white ; border : #7e3af2 2px solid ; outline:none ; color: black" type="tel" id="emetteurTelephone" name="emetteurTelephone" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="emetteurTelephone-error" class="text-red-500"></span>
                        </div>
                    </div>
                    <!-- Récepteur -->
                    <div class="flex flex-col">
                        <h4 class="font-bold text-purple text-sm mb-2">Récepteur</h4>
                        <div class="mb-4">
                            <label for="recepteurNom" class="text-gray-700">Nom</label>
                            <input style="background : white ; border : #7e3af2 2px solid ; outline:none ; color: black" type="text" id="recepteurNom" name="recepteurNom" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="recepteurNom-error" class="text-red-500"></span>
                        </div>
                        <div class="mb-4">
                            <label for="recepteurPrenom" class="text-gray-700">Prénom</label>
                            <input style="background : white ; border : #7e3af2 2px solid ; outline:none ; color: black" type="text" id="recepteurPrenom" name="recepteurPrenom" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="recepteurPrenom-error" class="text-red-500"></span>
                        </div>
                        <div class="mb-4">
                            <label for="recepteurAdresse" class="text-gray-700">Adresse</label>
                            <input style="background : white ; border : #7e3af2 2px solid ; outline:none ; color: black" type="text" id="recepteurAdresse" name="recepteurAdresse" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="recepteurAdresse-error" class="text-red-500"></span>
                        </div>
                        <div class="mb-4">
                            <label for="recepteurEmail" class="text-gray-700">Email</label>
                            <input style="background : white ; border : #7e3af2 2px solid ; outline:none ; color: black" type="email" id="recepteurEmail" name="recepteurEmail" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="recepteurEmail-error" class="text-red-500"></span>
                        </div>
                        <div class="mb-4">
                            <label for="recepteurTelephone" class="text-gray-700">Téléphone</label>
                            <input style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" type="tel" id="recepteurTelephone" name="recepteurTelephone" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="recepteurTelephone-error" class="text-red-500"></span>
                        </div>
                    </div>
                </div>
                <div class="col-span-2 flex justify-end mt-6">
                    <button type="button" onclick="closeModal()" class="btn mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">Fermer</button>
                    <button type="submit" class="btn col-span-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75">Ajouter le produit</button>
                </div>
            </form>

        </div>
    </dialog>




    <dialog id="my_modal_4" class="modal">
        <div class="modal-box w-11/12 max-w-3xl bg-white shadow-md rounded-md p-6">

            <h3 class="font-bold text-lg text-purple-500 mb-4">Ajouter un nouveau produit</h3>
            <form id="addProductForm" class="grid grid-cols-2 gap-6">
                <input type="hidden" id="cargaisonId" name="cargaisonId">
                <div class="col-span-2 flex flex-col mb-4">
                    <div class="mb-4">
                        <label for="libelleProduit" class="text-gray-700">Libellé</label>
                        <input style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" type="text" id="libelleProduit" name="libelleProduit" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                        <span id="libelleProduit-error" class="text-red-500"></span>
                    </div>
                    <div class="mb-4">
                        <label for="prixProduit" class="text-gray-700">Prix</label>
                        <input style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" type="number" id="prixProduit" name="prixProduit" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                        <span id="prixProduit-error" class="text-red-500"></span>
                    </div>
                    <div class="mb-4">
                        <label for="codeProduit" class="text-gray-700">Type Produit</label>
                        <select tyle="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" name="typeProduit" id="">
                            <option value="alimentaire">Alimentaire</option>
                            <option value="chimique">Chimique</option>
                            <option value="incassable">Incassable</option>
                            <option value="fragile">Fragile</option>
                        </select>

                        <input style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" type="text" id="codeProduit" name="codeProduit" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                        <span id="codeProduit-error" class="text-red-500"></span>
                    </div>
                    <div class="mb-4">
                        <label for="poidsProduit" class="text-gray-700">Poids</label>
                        <input style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" type="number" id="poidsProduit" name="poidsProduit" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                        <span id="poidsProduit-error" class="text-red-500"></span>
                    </div>
                </div>
                <div class="col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div class="flex flex-col">
                        <h4 class="font-bold text-purple text-sm mb-2">Émetteur</h4>
                        <div class="mb-4">
                            <label for="emetteurNom" class="text-gray-700">Nom</label>
                            <input style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" type="text" id="emetteurNom" name="emetteurNom" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="emetteurNom-error" class="text-red-500"></span>
                        </div>
                        <div class="mb-4">
                            <label for="emetteurPrenom" class="text-gray-700">Prénom</label>
                            <input style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" type="text" id="emetteurPrenom" name="emetteurPrenom" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="emetteurPrenom-error" class="text-red-500"></span>
                        </div>
                        <div class="mb-4">
                            <label for="emetteurAdresse" class="text-gray-700">Adresse</label>
                            <input style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" type="text" id="emetteurAdresse" name="emetteurAdresse" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="emetteurAdresse-error" class="text-red-500"></span>
                        </div>
                        <div class="mb-4">
                            <label for="emetteurEmail" class="text-gray-700">Email</label>
                            <input style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" type="email" id="emetteurEmail" name="emetteurEmail" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="emetteurEmail-error" class="text-red-500"></span>
                        </div>
                        <div class="mb-4">
                            <label for="emetteurTelephone" class="text-gray-700">Téléphone</label>
                            <input style="background : white ; border : #7e3af2 2px solid ; outline:none ; color: black" type="tel" id="emetteurTelephone" name="emetteurTelephone" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="emetteurTelephone-error" class="text-red-500"></span>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <h4 class="font-bold text-purple text-sm mb-2">Récepteur</h4>
                        <div class="mb-4">
                            <label for="recepteurNom" class="text-gray-700">Nom</label>
                            <input style="background : white ; border : #7e3af2 2px solid ; outline:none ; color: black" type="text" id="recepteurNom" name="recepteurNom" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="recepteurNom-error" class="text-red-500"></span>
                        </div>
                        <div class="mb-4">
                            <label for="recepteurPrenom" class="text-gray-700">Prénom</label>
                            <input style="background : white ; border : #7e3af2 2px solid ; outline:none ; color: black" type="text" id="recepteurPrenom" name="recepteurPrenom" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="recepteurPrenom-error" class="text-red-500"></span>
                        </div>
                        <div class="mb-4">
                            <label for="recepteurAdresse" class="text-gray-700">Adresse</label>
                            <input style="background : white ; border : #7e3af2 2px solid ; outline:none ; color: black" type="text" id="recepteurAdresse" name="recepteurAdresse" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="recepteurAdresse-error" class="text-red-500"></span>
                        </div>
                        <div class="mb-4">
                            <label for="recepteurEmail" class="text-gray-700">Email</label>
                            <input style="background : white ; border : #7e3af2 2px solid ; outline:none ; color: black" type="email" id="recepteurEmail" name="recepteurEmail" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="recepteurEmail-error" class="text-red-500"></span>
                        </div>
                        <div class="mb-4">
                            <label for="recepteurTelephone" class="text-gray-700">Téléphone</label>
                            <input style="background: white ; border:#7e3af2 2px solid ; outline:none ; color: black" type="tel" id="recepteurTelephone" name="recepteurTelephone" class="form-input px-4 h-12 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
                            <span id="recepteurTelephone-error" class="text-red-500"></span>
                        </div>
                    </div>
                </div>
                <div class="col-span-2 flex justify-end mt-6">
                    <button type="button" onclick="closeModal()" class="btn mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">Fermer</button>
                    <button type="submit" class="btn col-span-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75">Ajouter le produit</button>
                </div>
            </form>
        </div>
    </dialog>



</section>

<script>
    function openModal() {
        const modal = document.getElementById("my_modal_4");
        if (modal) {
            modal.showModal();
        }
    }
</script>