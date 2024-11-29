<template>
  <div class="container mx-auto p-4">
    <!-- Barra de búsqueda y botones -->
    <div class="mb-4 flex gap-4">
      <div class="flex-1">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar por ID o palabra clave..."
          class="w-full p-2 border rounded"
        />
      </div>
      <button
        @click="toggleSelectAll"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {{ allSelected ? "Deseleccionar todo" : "Seleccionar todo" }}
      </button>
      <button
        @click="downloadSelected"
        class="bg-green-500 text-white px-4 py-2 rounded"
        :disabled="selectedItems.length === 0"
      >
        Descargar seleccionados
      </button>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse border">
        <thead>
          <tr class="bg-gray-100">
            <th class="border p-2">Elegir</th>
            <th class="border p-2">No. (ID)</th>
            <th class="border p-2">Concepto</th>
            <th class="border p-2">Unidad</th>
            <th class="border p-2">Cantidad de obra</th>
            <th class="border p-2">Precio unitario</th>
            <th class="border p-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredConcepts" :key="item.id">
            <td class="border p-2 text-center">
              <input
                type="checkbox"
                v-model="selectedItems"
                :value="item.id"
                class="h-4 w-4"
              />
            </td>
            <td class="border p-2">{{ item.id }}</td>
            <td class="border p-2">{{ item.concept }}</td>
            <td class="border p-2">{{ item.unit }}</td>
            <td class="border p-2">
              <input
                type="number"
                v-model.number="quantities[item.id]"
                min="1"
                class="w-20 p-1 border rounded"
              />
            </td>
            <td class="border p-2">
              <input
                type="number"
                v-model.number="item.priceUnit"
                min="0"
                step="0.01"
                class="w-24 p-1 border rounded"
              />
            </td>
            <td class="border p-2">
              $ {{ formatNumber(item.priceUnit * quantities[item.id]) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Resumen de costos -->
    <div class="mt-4 w-64 ml-auto">
      <div class="border p-4 rounded bg-gray-50">
        <div class="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>$ {{ formatNumber(subtotal) }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span>Costo indirecto (20%):</span>
          <span>$ {{ formatNumber(indirectCost) }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span>IVA (16%):</span>
          <span>$ {{ formatNumber(iva) }}</span>
        </div>
        <div class="flex justify-between font-bold border-t pt-2">
          <span>Total:</span>
          <span>$ {{ formatNumber(total) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jsPDF } from "jspdf"; // Importar jsPDF
import { catalogConcepts } from "../data/catalog-concepts";

export default {
  name: "Catalog",
  data() {
    return {
      catalogConcepts,
      searchQuery: "",
      selectedItems: [],
      quantities: {},
    };
  },
  created() {
    // Inicializar cantidades con valor 1
    this.catalogConcepts.forEach((item) => {
      this.quantities[item.id] = 1;
    });
  },
  computed: {
    filteredConcepts() {
      const query = this.searchQuery.toLowerCase();
      return this.catalogConcepts.filter(
        (item) =>
          item.id.toString().includes(query) ||
          item.concept.toLowerCase().includes(query)
      );
    },
    allSelected() {
      return this.selectedItems.length === this.catalogConcepts.length;
    },
    subtotal() {
      return this.selectedItems.reduce((sum, id) => {
        const item = this.catalogConcepts.find((c) => c.id === id);
        return sum + item.priceUnit * this.quantities[id];
      }, 0);
    },
    indirectCost() {
      return this.subtotal * 0.2;
    },
    iva() {
      return (this.subtotal + this.indirectCost) * 0.16;
    },
    total() {
      return this.subtotal + this.indirectCost + this.iva;
    },
  },
  methods: {
    formatNumber(number) {
      return number.toLocaleString("es-MX", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    toggleSelectAll() {
      if (this.allSelected) {
        this.selectedItems = [];
      } else {
        this.selectedItems = this.catalogConcepts.map((item) => item.id);
      }
    },
    downloadSelected() {
      // Crear una instancia de jsPDF
      const doc = new jsPDF();

      // Título del PDF
      doc.setFontSize(16);
      doc.text("Elementos Seleccionados", 10, 10);

      // Agregar encabezados de tabla
      const headers = [["ID", "Concepto", "Cantidad", "PU", "Subtotal"]];
      const data = this.selectedItems.map((id) => {
        const item = this.catalogConcepts.find((c) => c.id === id);
        const quantity = this.quantities[id];
        const subtotal = item.priceUnit * quantity;
        return [
          item.id,
          item.concept,
          quantity,
          `$${item.priceUnit.toFixed(2)}`,
          `$${subtotal.toFixed(2)}`,
        ];
      });

      // Agregar datos a la tabla
      doc.autoTable({
        head: headers,
        body: data,
        startY: 20, // Posición inicial
      });

      // Descargar el PDF
      doc.save("elementos_seleccionados.pdf");
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados */
</style>
