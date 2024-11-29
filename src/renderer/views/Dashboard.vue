<template>
  <div class="dashboard">
    <header class="mb-12">
      <div class="flex justify-between items-center">
        <div class="w-1/3 flex justify-start">
          <div class="h-32 w-fit">
            <img
              src="../assets/IPN.png"
              alt="IPN"
              class="w-full h-full object-contain"
            />
          </div>
        </div>
        <div class="text-center w-1/3">
          <h4 class="text-xl font-bold text-gray-800 mb-2">
            INSTITUTO POLITÉCNICO NACIONAL
          </h4>
          <h4 class="text-lg font-semibold text-gray-700">
            ESCUELA SUPERIOR DE INGENIERÍA Y ARQUITECTURA
          </h4>
        </div>
        <div class="w-1/3 flex justify-end">
          <div class="h-32 w-fit">
            <img
              src="../assets/esia.png"
              alt="ESIA"
              class="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </header>

    <div class="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
      <ul class="space-y-4 mb-8">
        <li class="flex items-center text-gray-700">
          <span class="font-semibold mr-2">Materia:</span>
          <span class="text-gray-600">MODELOS ESTOCÁSTICOS</span>
        </li>
        <li class="flex items-center text-gray-700">
          <span class="font-semibold mr-2">Grupo:</span>
          <span class="text-gray-600">7CM08</span>
        </li>
        <li class="text-gray-700">
          <span class="font-semibold">Integrantes:</span>
          <ul class="ml-8 mt-2 space-y-2">
            <li class="text-gray-600">• GONZÁLEZ PAZ EFRAÍN</li>
            <li class="text-gray-600">• Méndez Hernández Gerardo</li>
          </ul>
        </li>

        <li class="items-center text-gray-700">
          <span class="font-semibold mr-2">Correo Electrónico:</span>
          <ul class="ml-8 mt-2 space-y-2">
            <li class="text-gray-600">gonzalezpaz.efrain@gmail.com</li>
            <li class="text-gray-600">merazhernández.gerardo@gmail.com</li>
          </ul>
        </li>
        <li class="flex items-center text-gray-700">
          <span class="font-semibold mr-2">Docente:</span>
          <span class="text-gray-600">DOC. CASTRO MENLLEZ JAVIER BALDEMAR</span>
        </li>
      </ul>

      <h3
        class="text-2xl font-bold text-center text-gray-800 mt-8 pb-4 border-b-2 border-gray-200"
      >
        TRABAJO: AGUA POTABLE EN XOCHITLÁN DE LOS SANTOS PUEBLA
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
};
</script>
