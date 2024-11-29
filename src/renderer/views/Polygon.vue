<template>
  <div class="container overflow-x-auto">
    <div class="grid grid-cols-2 gap-4">
      <!-- Columna izquierda: Tabla -->
      <div class="p-4">
        <h2 class="text-xl mb-4">Área de Polígonos Irregulares</h2>

        <!-- Formulario para agregar coordenadas -->
        <div class="mb-4 flex gap-2">
          <input
            v-model.number="newCoord.x"
            type="number"
            placeholder="X"
            class="border p-2 w-24"
          />
          <input
            v-model.number="newCoord.y"
            type="number"
            placeholder="Y"
            class="border p-2 w-24"
          />
          <button
            @click="addCoordinate"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Agregar
          </button>
        </div>

        <!-- Tabla de coordenadas -->
        <table class="w-full border-collapse border">
          <thead>
            <tr>
              <th class="border p-2">Coordenada</th>
              <th class="border p-2">X</th>
              <th class="border p-2">Y</th>
              <th class="border p-2">Producto Diagonal X</th>
              <th class="border p-2">Producto Diagonal Y</th>
              <th class="border p-2">Distancia</th>
              <th class="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(coord, index) in coordinates" :key="index">
              <td class="border p-2">{{ getLetter(index) }}</td>
              <td class="border p-2">{{ coord.x }}</td>
              <td class="border p-2">{{ coord.y }}</td>
              <td class="border p-2">{{ coord.diagX }}</td>
              <td class="border p-2">{{ coord.diagY }}</td>
              <td class="border p-2">{{ coord.distance.toFixed(2) }}</td>
              <td class="border p-2">
                <button
                  @click="removeCoordinate(index)"
                  class="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="border p-2 font-bold">Área total:</td>
              <td class="border p-2">{{ totalArea.toFixed(2) }}</td>
            </tr>
            <tr>
              <td colspan="4" class="border p-2 font-bold">Distancia total:</td>
              <td class="border p-2">{{ totalDistance.toFixed(2) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Columna derecha: Gráfico -->
      <div class="p-4">
        <canvas ref="polygonChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "Polygon",
  data() {
    return {
      coordinates: [],
      newCoord: {
        x: null,
        y: null,
      },
      chart: null,
    };
  },
  computed: {
    totalArea() {
      if (this.coordinates.length < 3) return 0;

      let area = 0;
      for (let i = 0; i < this.coordinates.length; i++) {
        const j = (i + 1) % this.coordinates.length;
        area += this.coordinates[i].x * this.coordinates[j].y;
        area -= this.coordinates[j].x * this.coordinates[i].y;
      }
      return Math.abs(area) / 2;
    },
    totalDistance() {
      if (this.coordinates.length < 2) return 0;

      let distance = 0;
      for (let i = 0; i < this.coordinates.length; i++) {
        const nextIndex = (i + 1) % this.coordinates.length;
        distance += this.calculateDistance(
          this.coordinates[i],
          this.coordinates[nextIndex]
        );
      }
      return distance;
    },
  },
  methods: {
    getLetter(index) {
      return String.fromCharCode(65 + index);
    },
    calculateDiagonalProducts(coords) {
      const n = coords.length;
      if (n < 2) return { diagX: 0, diagY: 0 };

      const current = coords[n - 1];
      const next = coords[0];
      return {
        diagX: current.x * next.y,
        diagY: current.y * next.x,
      };
    },
    calculateDistance(coord1, coord2) {
      const dx = coord2.x - coord1.x;
      const dy = coord2.y - coord1.y;
      return Math.sqrt(dx * dx + dy * dy);
    },
    addCoordinate() {
      if (this.newCoord.x === null || this.newCoord.y === null) return;

      const newPoint = {
        x: this.newCoord.x,
        y: this.newCoord.y,
        diagX: 0,
        diagY: 0,
        distance: 0,
      };

      // Calcular la distancia si hay puntos previos
      if (this.coordinates.length > 0) {
        const lastCoord = this.coordinates[this.coordinates.length - 1];
        newPoint.distance = this.calculateDistance(lastCoord, newPoint);
      }

      this.coordinates.push(newPoint);
      this.updateDiagonalProducts();
      this.updateChart();

      // Limpiar el formulario
      this.newCoord = {
        x: null,
        y: null,
      };
    },
    removeCoordinate(index) {
      this.coordinates.splice(index, 1);
      this.updateDiagonalProducts();
      this.updateChart();
    },
    updateDiagonalProducts() {
      this.coordinates.forEach((coord, index) => {
        const nextIndex = (index + 1) % this.coordinates.length;
        const nextCoord = this.coordinates[nextIndex];
        coord.diagX = coord.x * nextCoord.y;
        coord.diagY = coord.y * nextCoord.x;
      });
    },
    updateChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      if (this.coordinates.length === 0) return;

      const points = [...this.coordinates];
      if (this.coordinates.length > 2) {
        points.push(this.coordinates[0]); // Cerrar el polígono
      }

      const ctx = this.$refs.polygonChart;
      this.chart = new Chart(ctx, {
        type: "scatter",
        data: {
          datasets: [
            {
              label: "Polígono",
              data: points.map((coord) => ({
                x: coord.x,
                y: coord.y,
              })),
              showLine: true,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              tension: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: "linear",
              position: "bottom",
              title: {
                display: true,
                text: "X",
              },
            },
            y: {
              type: "linear",
              position: "left",
              title: {
                display: true,
                text: "Y",
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    this.updateChart();
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

canvas {
  min-height: 400px;
}
</style>
