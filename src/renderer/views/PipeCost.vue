<template>
  <div class="container mx-auto p-6 max-w-4xl">
    <!-- Título y descripción -->
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">
        Calculadora de Costos de Tubería
      </h1>
      <p class="text-gray-600">
        Calcule los costos basados en el tipo y longitud de la tubería
      </p>
    </div>

    <!-- Tabla de precios de referencia -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">
        Precios de Referencia por Tramo
      </h2>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-50">
              <th class="border p-3 text-left">Tipo de Tubería</th>
              <th class="border p-3 text-center">Doble pared</th>
              <th class="border p-3 text-center">Autolimpieza</th>
              <th class="border p-3 text-center">Doble pared y autolimpieza</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-3 font-medium">Costo promedio por tramo</td>
              <td class="border p-3 text-center">$ 656.35</td>
              <td class="border p-3 text-center">$ 948.06</td>
              <td class="border p-3 text-center">$ 1,458.56</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Calculadora -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Cálculo de Costos</h2>

      <!-- Tabla de entrada de longitudes -->
      <div class="overflow-x-auto mb-6">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-50">
              <th class="border p-3 text-left">Longitud en metros</th>
              <th class="border p-3 text-center">Doble pared</th>
              <th class="border p-3 text-center">Autolimpieza</th>
              <th class="border p-3 text-center">Doble pared y autolimpieza</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-3 font-medium">Metros</td>
              <td class="border p-3">
                <input
                  type="number"
                  v-model.number="lengths.doublePared"
                  class="w-full p-2 border rounded text-center"
                  min="0"
                  step="0.01"
                />
              </td>
              <td class="border p-3">
                <input
                  type="number"
                  v-model.number="lengths.autoClean"
                  class="w-full p-2 border rounded text-center"
                  min="0"
                  step="0.01"
                />
              </td>
              <td class="border p-3">
                <input
                  type="number"
                  v-model.number="lengths.both"
                  class="w-full p-2 border rounded text-center"
                  min="0"
                  step="0.01"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Resultados -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="font-semibold mb-3">Resumen de Costos</h3>
        <div class="grid grid-cols-1 gap-3">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Subtotal Doble Pared:</span>
            <span class="font-medium"
              >$ {{ formatNumber(subtotalDoublePared) }}</span
            >
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Subtotal Autolimpieza:</span>
            <span class="font-medium"
              >$ {{ formatNumber(subtotalAutoClean) }}</span
            >
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600"
              >Subtotal Doble Pared y Autolimpieza:</span
            >
            <span class="font-medium">$ {{ formatNumber(subtotalBoth) }}</span>
          </div>
          <div
            class="flex justify-between items-center pt-3 border-t border-gray-300"
          >
            <span class="font-semibold">Total:</span>
            <span class="font-bold text-lg">$ {{ formatNumber(total) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PipeCost",
  data() {
    return {
      prices: {
        doublePared: 656.35,
        autoClean: 948.06,
        both: 1458.56,
      },
      lengths: {
        doublePared: 0,
        autoClean: 0,
        both: 0,
      },
    };
  },
  computed: {
    subtotalDoublePared() {
      return (this.prices.doublePared * this.lengths.doublePared) / 6;
    },
    subtotalAutoClean() {
      return (this.prices.autoClean * this.lengths.autoClean) / 6;
    },
    subtotalBoth() {
      return (this.prices.both * this.lengths.both) / 6;
    },
    total() {
      return (
        this.subtotalDoublePared + this.subtotalAutoClean + this.subtotalBoth
      );
    },
  },
  methods: {
    formatNumber(value) {
      return value.toLocaleString("es-MX", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
  },
};
</script>

<style scoped>
/* Opcional: Agregar estilos personalizados si se necesitan */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}
</style>
