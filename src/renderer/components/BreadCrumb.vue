<!-- BreadCrumb.vue -->
<template>
  <nav class="flex justify-between items-center w-full py-4 px-6 bg-white shadow-sm">
    <!-- Botón Anterior -->
    <router-link
      v-if="previousRoute"
      :to="previousRoute"
      class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer group transition-colors duration-200"
    >
      <ChevronLeft class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
      <span class="font-medium">Anterior</span>
    </router-link>
    <div v-else class="w-24"></div>

    <!-- Botón Siguiente -->
    <router-link
      v-if="nextRoute"
      :to="nextRoute"
      class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer group transition-colors duration-200"
    >
      <span class="font-medium">Siguiente</span>
      <ChevronRight class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
    </router-link>
    <div v-else class="w-24"></div>
  </nav>
</template>

<script>
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

export default {
  name: 'BreadCrumb',
  
  components: {
    ChevronLeft,
    ChevronRight
  },

  props: {
    previousRoute: {
      type: String,
      default: null
    },
    nextRoute: {
      type: String,
      default: null
    }
  }
}
</script>
