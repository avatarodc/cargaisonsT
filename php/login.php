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
                <form class="max-w-sm mx-auto w-full ">
                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your
                            email</label>
                        <input type="email" id="email"
                            class=" border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="name@gmail.com" required />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Your
                            password</label>
                        <input type="password" id="password"
                            class="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required />
                    </div>
                    <div class="flex items-start mb-5">
                        <div class="flex items-center h-5">
                            <input id="remember" type="checkbox" value=""
                                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                required />
                        </div>
                        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember
                            me</label>
                    </div>
                    <button type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
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