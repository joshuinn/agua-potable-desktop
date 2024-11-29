<template>
  <div
    class="w-64 h-screen fixed left-0 top-0 bg-gradient-to-br from-slate-800 to-gray-900 from-0% to-100% text-white p-4 shadow-lg"
  >
    <!-- Header del Sidebar -->
    <div class="py-4 border-b border-gray-600 mb-6">
      <div class="flex items-center space-x-3 px-4">
        <Droplet class="w-6 h-6 text-blue-400" />
        <h2
          class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          Agua potable
        </h2>
      </div>
    </div>

    <!-- Navegación -->
    <nav class="space-y-2">
      <div v-for="item in menuItems" :key="item.path">
        <!-- Elemento sin hijos -->
        <router-link
          v-if="!item.children"
          :to="item.path"
          class="flex items-center px-4 py-3 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200 ease-in-out"
          :class="{ 'bg-gray-700 text-white': $route.path === item.path }"
        >
          <component :is="item.icon" class="w-5 h-5 mr-3" />
          <span class="font-medium">{{ item.title }}</span>
        </router-link>

        <!-- Elemento con submenú -->
        <div v-else class="space-y-1">
          <!-- Cabecera del dropdown -->
          <div
            @click="toggleSubmenu(item)"
            class="flex items-center justify-between px-4 py-3 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200 ease-in-out cursor-pointer"
            :class="{ 'bg-gray-700': item.isOpen }"
          >
            <div class="flex items-center">
              <component :is="item.icon" class="w-5 h-5 mr-3" />
              <span class="font-medium">{{ item.title }}</span>
            </div>
            <ChevronDown
              class="w-4 h-4 transition-transform duration-200"
              :class="{ 'transform rotate-180': item.isOpen }"
            />
          </div>

          <!-- Submenú -->
          <div v-show="item.isOpen" class="pl-12 space-y-1">
            <router-link
              v-for="child in item.children"
              :key="child.path"
              :to="child.path"
              class="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded-lg transition-all duration-200 ease-in-out"
              :class="{ 'bg-gray-600 text-white': $route.path === child.path }"
            >
              <component :is="child.icon" class="w-4 h-4 mr-2" />
              <span>{{ child.title }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Footer del Sidebar -->
    <div class="absolute bottom-0 left-0 w-full p-4 border-t border-gray-700">
      <div
        class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
      ></div>
    </div>
  </div>
</template>

<script>
import {
  Home,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Grid2X2,
  Droplet,
  ChevronDown,
  FileText,
  Settings,
  Users,
  Bell,
  Database,
  ChartArea,
  Hammer,
  HandCoins,
  FileSearch,
} from "lucide-vue-next";

export default {
  name: "Sidebar",
  components: {
    LayoutDashboard,
    Home,
    LogOut,
    Sparkles,
    Grid2X2,
    Droplet,
    ChevronDown,
    FileText,
    Settings,
    Users,
    Bell,
    Database,
    ChartArea,
    Hammer,
    HandCoins,
  },
  data() {
    return {
      menuItems: [
        {
          title: "Carátula",
          path: "/",
          icon: Sparkles,
        },
        {
          title: "Tabla de contenido",
          icon: Database,
          path: "/table",
        },

        {
          title: "Área de polígono",
          path: "/polygon",
          icon: ChartArea,
        },
        {
          title: "Catálogo de obras",
          path: "/catalog-works",
          icon: Hammer,
        },
        {
          title: "Costos de tubería",
          path: "/pipe-cost",
          icon: HandCoins,
        },
        {
          title: "Tabulador CIPU",
          path: "/cipu",
          icon: FileSearch,
        },
        {
          title: "Salir del programa",
          path: "/exit",
          icon: LogOut,
        },
      ],
    };
  },
  methods: {
    toggleSubmenu(item) {
      item.isOpen = !item.isOpen;
    },
  },
};
</script>
