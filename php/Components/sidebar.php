 <!-- <aside class="w-64 bg-white p-4 mt-3 shadow flex align-center">
     <div style="bgc" class=" w-full  bg-white shadow-md  pt-20 divide-y divide-gray-300 divide-dashed  group-hover:opacity-100 transition duration-300 group-hover:visible">
                    <a href="index.php?page=dashboard" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                        <img src="./assets/dashboard.png" alt="sofa" class="w-5 h-5 object-contain">
                        <span class="ml-6 text-gray-600 text-sm">Dashboard</span>
                    </a>
                    <a href="index.php?page=cargaisons" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                        <img src="./assets/cargaison.png" alt="" class="w-5 h-5 object-contain">
                        <span class="ml-6 text-gray-600 text-sm">Cargaisons</span>
                    </a>
                    <a href="index.php?page=Clients" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                        <img src="./assets/client-fidele.png" alt="" class="w-5 h-5 object-contain">
                        <span class="ml-6 text-gray-600 text-sm">Clients</span>
                    </a>
                    <a href="index.php?page=produit" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                        <img src="./assets/colis.png" alt="" class="w-5 h-5 object-contain">
                        <span class="ml-6 text-gray-600 text-sm">Produit</span>
                    </a>
                </div>
</aside> 


 -->

 <style>
  a .fa-info-circle {
  display: inline-block;
  width: 24px;  /* Ajustez la taille selon vos besoins */
  height: 24px; /* Ajustez la taille selon vos besoins */
  line-height: 24px; /* Centrez l'icône verticalement */
  text-align: center; /* Centrez l'icône horizontalement */
}

a:hover .fa-info-circle {
  color: #1e90ff; /* Changez la couleur à l'état de survol */
}

 </style>

 <aside class="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
      <div class="py-4 text-gray-500 dark:text-gray-400">
        <ul class="mt-6">
          <li class="relative px-6 py-3">
            <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" href="?page=1">
              <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span class="ml-4">Dashboard</span>
            </a>
          </li>
        </ul>
        <ul>
          <li class="relative px-6 py-3">
            <span class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
            <a class="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100" href="index.php?page=cargaisons">
              <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
              <span class="ml-4">Cargaison</span>
            </a>
          </li>
          <li class="relative px-6 py-3">
            <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" href="?page=3">
              <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <span class="ml-4">Cards</span>
            </a>
       
        </ul>
        <!-- <div class="px-6 my-6">
          <div>
            <button onclick="my_modal_3.showModal()" class="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
              Ajouter Cargaison
              <span class="ml-2" aria-hidden="true">+</span>
            </button>
          </div>
        </div> -->
      </div>
    </aside>


 <!-- navbar -->
 

