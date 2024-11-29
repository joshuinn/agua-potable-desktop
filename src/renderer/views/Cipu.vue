<template>
  <div class="container mx-auto p-6">
    <!-- Título -->
    <div class="mb-6 text-center">
      <h1 class="text-3xl font-bold text-gray-800">Tabulador CIPU</h1>
      <p class="text-gray-600">
        Gestión de conceptos con búsqueda, selección y cálculo de totales
      </p>
    </div>

    <!-- Barra de búsqueda -->
    <div class="mb-4 flex gap-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar por clave o concepto..."
        class="flex-1 p-2 border rounded"
      />
    </div>

    <!-- Tabla con paginación -->
    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-50">
              <th class="border p-3 text-center">Elegir</th>
              <th class="border p-3 text-left">Clave</th>
              <th class="border p-3 text-left">Concepto</th>
              <th class="border p-3 text-center">P.U</th>
              <th class="border p-3 text-center">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedData" :key="item.clave">
              <td class="border p-3 text-center">
                <input
                  type="checkbox"
                  :value="item"
                  v-model="selectedItems"
                  :disabled="!item.pu || item.pu === 'N/A'"
                  class="h-4 w-4"
                />
              </td>
              <td class="border p-3">{{ item.clave }}</td>
              <td class="border p-3">{{ item.concepto }}</td>
              <td class="border p-3 text-center">
                {{
                  item.pu && item.pu !== "N/A"
                    ? `$ ${formatNumber(item.pu)}`
                    : "Informativo"
                }}
              </td>
              <td class="border p-3 text-center">
                <input
                  type="number"
                  v-model.number="quantities[item.clave]"
                  :disabled="!item.pu || item.pu === 'N/A'"
                  class="w-20 p-1 border rounded text-center"
                  min="0"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      <div class="flex justify-between items-center mt-4">
        <span class="text-gray-600">
          Mostrando {{ startIndex + 1 }} a
          {{ Math.min(endIndex, filteredData.length) }} de
          {{ filteredData.length }} resultados
        </span>
        <div class="flex gap-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>

    <!-- Resumen de selección -->
    <div class="mt-6">
      <button
        @click="showDialog = true"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ver selección ({{ selectedItems.length }} items)
      </button>
    </div>

    <!-- Diálogo de selección -->
    <div
      v-if="showDialog"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
        <h2 class="text-xl font-semibold mb-4">Items seleccionados</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gray-50">
                <th class="border p-3 text-left">Clave</th>
                <th class="border p-3 text-left">Concepto</th>
                <th class="border p-3 text-center">P.U</th>
                <th class="border p-3 text-center">Cantidad</th>
                <th class="border p-3 text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in selectedItems" :key="item.clave">
                <td class="border p-3">{{ item.clave }}</td>
                <td class="border p-3">{{ item.concepto }}</td>
                <td class="border p-3 text-center">
                  $ {{ formatNumber(item.pu) }}
                </td>
                <td class="border p-3 text-center">
                  {{ quantities[item.clave] || 0 }}
                </td>
                <td class="border p-3 text-center">
                  $ {{ formatNumber((quantities[item.clave] || 0) * item.pu) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Totales -->
        <div class="mt-4">
          <div class="flex justify-between">
            <span class="text-gray-600">Subtotal:</span>
            <span class="font-medium">$ {{ formatNumber(subtotal) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Costo indirecto (25%):</span>
            <span class="font-medium">$ {{ formatNumber(indirectCost) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">IVA (16%):</span>
            <span class="font-medium">$ {{ formatNumber(iva) }}</span>
          </div>
          <div class="flex justify-between font-bold border-t pt-2">
            <span>Total:</span>
            <span>$ {{ formatNumber(total) }}</span>
          </div>
        </div>

        <div class="mt-6 text-right flex gap-4">
          <button
            @click="exportToPDF"
            class="bg-purple-700 text-white px-4 py-2 rounded"
            :disabled="selectedItems.length === 0"
          >
            Exportar a PDF
          </button>
          <button
            @click="showDialog = false"
            class="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cipuData } from "../assets/data/cipu-data";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "Cipu",
  data() {
    return {
      cipuData,
      searchQuery: "",
      selectedItems: [],
      quantities: {},
      currentPage: 1,
      itemsPerPage: 15,
      showDialog: false,
    };
  },
  computed: {
    filteredData() {
      const query = this.searchQuery.toLowerCase();
      return this.cipuData.filter(
        (item) =>
          item.clave.toLowerCase().includes(query) ||
          item.concepto.toLowerCase().includes(query)
      );
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredData.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    endIndex() {
      return this.startIndex + this.itemsPerPage;
    },
    subtotal() {
      return this.selectedItems.reduce((sum, item) => {
        const quantity = this.quantities[item.clave] || 0;
        return sum + quantity * item.pu;
      }, 0);
    },
    indirectCost() {
      return this.subtotal * 0.25;
    },
    iva() {
      return (this.subtotal + this.indirectCost) * 0.16;
    },
    total() {
      return this.subtotal + this.indirectCost + this.iva;
    },
  },
  methods: {
    formatNumber(value) {
      return value.toLocaleString("es-MX", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    exportToPDF() {
      // Crear una instancia de jsPDF
      const doc = new jsPDF();

      // Título del PDF
      doc.setFontSize(16);
      doc.text("Resumen de Items Seleccionados", 14, 20);

      // Crear la tabla con autoTable
      const tableData = this.selectedItems.map((item) => ({
        clave: item.clave,
        concepto: item.concepto,
        pu: item.pu ? `$ ${this.formatNumber(item.pu)}` : "Informativo",
        cantidad: this.quantities[item.clave] || 0,
        total: item.pu
          ? `$ ${this.formatNumber(
              (this.quantities[item.clave] || 0) * item.pu
            )}`
          : "N/A",
      }));

      doc.autoTable({
        startY: 30,
        head: [["Clave", "Concepto", "PU", "Cantidad", "Total"]],
        body: tableData.map((row) => [
          row.clave,
          row.concepto,
          row.pu,
          row.cantidad,
          row.total,
        ]),
      });

      // Agregar totales al final del documento
      const finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(12);
      doc.text(`Subtotal: $ ${this.formatNumber(this.subtotal)}`, 14, finalY);
      doc.text(
        `Costo indirecto (25%): $ ${this.formatNumber(this.indirectCost)}`,
        14,
        finalY + 10
      );
      doc.text(`IVA (16%): $ ${this.formatNumber(this.iva)}`, 14, finalY + 20);
      doc.text(`Total: $ ${this.formatNumber(this.total)}`, 14, finalY + 30);

      // Descargar el PDF
      doc.save("Resumen_CIPU.pdf");
    },
  },
};
</script>

<style scoped>
/* Estilos adicionales si se necesitan */
</style>
