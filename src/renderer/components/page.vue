<template>
  <div class="max-w-[65rem] mx-auto p-6">
    <!-- Navegación -->
    <BreadCrumb :previous-route="getPreviousRoute" :next-route="getNextRoute" />
    <!-- Contenido de la página -->
    <div v-if="currentPage" class="my-8">
      <!-- Título de la página si existe -->
      <h1 v-if="currentPage.title" class="text-3xl font-bold mb-6">
        {{ currentPage.title }}
      </h1>

      <!-- Secciones -->
      <div
        v-for="(section, index) in currentPage.section"
        :key="index"
        :class="['mb-8', section.containerStyle || '']"
      >
        <!-- Título de la sección si existe -->
        <h2 v-if="section.title" class="text-2xl font-semibold mb-4">
          {{ section.title }}
        </h2>
        <h3 v-if="section.subtitle" class="text-xl font-semibold mb-4">
          {{ section.subtitle }}
        </h3>

        <!-- Contenido principal -->
        <p v-if="section.content" class="text-gray-700 mb-4">
          {{ section.content }}
        </p>

        <!-- Lista si existe -->
        <ul v-if="section.ul" class="list-disc pl-6 mb-4 space-y-2">
          <li
            v-for="(item, itemIndex) in section.ul"
            :key="itemIndex"
            class="text-gray-700"
          >
            {{ item }}
          </li>
        </ul>

        <!-- Contenedor de imágenes -->
        <div
          v-if="section.images && section.images.length"
          :class="['grid gap-4', section.imagesStyle || '']"
        >
          <div
            v-for="(image, imgIndex) in section.images"
            :key="imgIndex"
            class="flex items-center justify-center"
          >
            <img
              :src="getImageUrl(image)"
              :alt="`Imagen ${imgIndex + 1}`"
              class="h-full w-auto max-w-full object-contain"
            />
          </div>
        </div>
        <!-- Imagen individual si existe -->
        <div
          v-if="section.image"
          :class="[
            'flex items-center justify-center',
            section.imagesStyle || '',
          ]"
        >
          <img
            :src="getImageUrl(section.image)"
            :alt="section.title || 'Imagen de sección'"
            class="h-full w-auto max-w-full object-contain"
          />
        </div>
        <div
          v-if="section.links && section.links.length"
          class="flex items-center justify-center my-5"
        >
          <div class="grid grid-cols-2 gap-8 items-center justify-center">
            <div
              v-for="(link, linkIndex) in section.links"
              class="flex justify-center"
            >
              <!-- router -->
              <router-link
                :to="link.url"
                class="bg-blue-500 text-white text-center p-3 rounded-lg w-full hover:bg-blue-700"
                >{{ link.label }}</router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="text-end">
        <p>Pág. {{ currentPageNumber }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "./BreadCrumb.vue";
import { pages } from "../assets/pages";

export default {
  name: "Page",

  components: {
    BreadCrumb,
  },

  data() {
    return {
      currentPageNumber: 1,
      pages: pages,
    };
  },

  computed: {
    currentPage() {
      return this.pages.find(
        (page) => page.page === this.currentPageNumber.toString()
      );
    },

    getPreviousRoute() {
      const prevPage = parseInt(this.currentPageNumber) - 1;
      return prevPage >= 1 ? `/page/${prevPage}` : "/table";
    },

    getNextRoute() {
      const nextPage = parseInt(this.currentPageNumber) + 1;
      const nextPageExists = this.pages.find(
        (page) => page.page === nextPage.toString()
      );
      return nextPageExists ? `/page/${nextPage}` : null;
    },
  },

  methods: {
    getImageUrl(imageName) {
      try {
        return new URL(`../assets/${imageName}`, import.meta.url).href;
      } catch (error) {
        console.error(`Error loading image: ${imageName}`, error);
        return "";
      }
    },
  },

  created() {
    const pageFromRoute = this.$route.params.page;
    this.currentPageNumber = pageFromRoute ? parseInt(pageFromRoute) : 1;
  },

  watch: {
    $route(to) {
      const pageParam = to.params.page;
      this.currentPageNumber = pageParam ? parseInt(pageParam) : 1;
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
</style>
