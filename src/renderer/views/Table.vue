<template>
  <div class="container mx-auto p-6">
    <!-- Encabezado del documento -->
    <div>
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Tabla de contenido
        </h1>
        <div class="flex items-center space-x-4 text-gray-600">
          <div class="flex items-center">
            <Book class="w-5 h-5 mr-2" />
            <span>450 páginas</span>
          </div>
          <div class="flex items-center">
            <Clock class="w-5 h-5 mr-2" />
            <span>Tiempo estimado: 8h 30m</span>
          </div>
        </div>
      </div>
      <div>
        <BreadCrumb previous-route="/" next-route="/page/1" />
      </div>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="divide-y divide-gray-200">
        <div
          v-for="(chapter, index) in chapters"
          :key="index"
          class="divide-y divide-gray-100"
        >
          <!-- Capítulo principal -->
          <div
            class="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
            :class="{ 'bg-gray-50': chapter.expanded }"
            @click="
              chapter.sections?.length
                ? toggleChapter(index)
                : handleChapterClick(chapter)
            "
          >
            <div class="flex items-center space-x-3">
              <Book class="w-5 h-5 text-blue-600" />
              <span class="font-semibold text-gray-900">
                {{ chapter.number }}. {{ chapter.title }}
              </span>
            </div>
            <div class="flex items-center space-x-4">
              <span v-if="chapter.pages" class="text-gray-500"
                >{{ chapter.pages }} páginas</span
              >
              <ChevronDown
                v-if="chapter.sections?.length"
                class="w-5 h-5 text-gray-400 transition-transform duration-200"
                :class="{ 'transform rotate-180': chapter.expanded }"
              />
            </div>
          </div>

          <!-- Subcapítulos (solo si existen secciones) -->
          <div
            v-if="chapter.expanded && chapter.sections?.length"
            class="bg-gray-50"
          >
            <div
              v-for="(section, sectionIndex) in chapter.sections"
              :key="sectionIndex"
              class="flex items-center justify-between p-4 pl-12 hover:bg-gray-100 cursor-pointer border-l-4"
              :class="[
                section.current
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-transparent',
              ]"
              @click="handleChapterClick(section)"
            >
              <div class="flex items-center space-x-3">
                <FileText class="w-4 h-4 text-gray-500" />
                <span class="text-gray-700">
                  {{ chapter.number }}.{{ sectionIndex + 1 }}
                  {{ section.title }}
                </span>
              </div>
              <div class="flex items-center space-x-4">
                <span class="text-sm text-gray-500"
                  >pág. {{ section.page }}</span
                >
                <button
                  v-if="section.current"
                  class="text-blue-600 hover:text-blue-800"
                >
                  <BookOpen class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Search,
  Book,
  Clock,
  Bookmark,
  Download,
  ChevronDown,
  FileText,
  BookOpen,
} from "lucide-vue-next";
import BreadCrumb from "../components/BreadCrumb.vue";

export default {
  name: "TableOfContents",
  components: {
    Search,
    Book,
    Clock,
    Bookmark,
    Download,
    ChevronDown,
    FileText,
    BookOpen,
    BreadCrumb,
  },
  data() {
    return {
      chapters: [
        {
          number: "1",
          title: "Introducción",
          // pages: "25",
          expanded: false,
          page: "1",
        },
        {
          number: "2",
          title: "Antecedentes",
          page: "2",
          expanded: false,
        },
        {
          number: "3",
          title: "Clima",
          page: "3",
          expanded: false,
        },
        {
          number: "4",
          title: "Problemáticas",
          page: "4",
          expanded: false,
        },
        {
          number: "5",
          title: "Fase de proyecto",
          page: "5",
          expanded: false,
        },
        {
          number: "6",
          title: "fase de construcción",
          page: "6",
          expanded: false,
        },
        {
          number: "7",
          title: "Desafíos espefícicos",
          page: "7",
          expanded: false,
        },
        {
          number: "8",
          title: "Topografía accidentada",
          page: "8",
          expanded: false,
        },
        {
          number: "9",
          title: "Dispersión poblacional",
          page: "9",
          expanded: false,
        },
        {
          number: "10",
          title: "Condiciones climáticas",
          page: "10",
          expanded: false,
        },
        {
          number: "11",
          title: "Financiamieno",
          page: "11",
          expanded: false,
        },
        {
          number: "12",
          title: "Impacto social y económico de la red de agua potable",
          page: "12",
          expanded: false,
        },
        {
          number: "13",
          title: "Empoderamiento comuniario y participación social",
          page: "13",
          expanded: false,
        },
        {
          number: "14",
          title: "Diseño y Eficiencia de las Redes de Agua Potable",
          page: "14",
          expanded: false,
        },
        {
          number: "15",
          title: "Tecnologías para el Tratamiento y Purificación del Agua",
          page: "15",
          expanded: false,
        },
        {
          number: "16",
          title: "Impacto Social y Participación Comunitaria",
          page: "16",
          expanded: false,
        },
        {
          number: "17",
          title: "Sostenibilidad y Gestión de Recursos Hídricos",
          page: "17",
          expanded: false,
        },
        {
          number: "18",
          title: "Financiamiento y Modelos de Gestión Económica",
          page: "18",
          expanded: false,
        },


        {
          number: "19",
          title: "Propuesta de Aplicación a Xochitlán de Todos los Santos",
          page: "19",
          pages: "6",
          expanded: false,
          sections: [
            {
              title: "Propuesta de Aplicación a Xochitlán de Todos los Santos",
              page: "19",
            },
            {
              title: "Diseño personalizado de la red",
              page: "20",
            },
            {
              title:
                "Implementación de tecnologías de tratamiento de agua adecuadas",
              page: "20",
            },
            {
              title: "Participación activa de la comunidad",
              page: "21",
            },
            {
              title: "Sostenibilidad y monitoreo",
              page: "22",
            },
            {
              title: "Modelo económico sostenible",
              page: "23",
            },
          ],
        },
        {
          number: "24",
          title: "Objetivos",
          page: "24",
          expanded: false,
          sections: [
            {
              title: "Objetivo general",
              page: "24",
            },
            {
              title: "Objetivo Particular I",
              page: "25",
            },
            {
              title: "Objetivo particular III",
              page: "26",
            },
            {
              title: "Objetivo particular IV",
              page: "27",
            },
          ],
        },
        {
          number: "28",
          title: "Tipo de Población en Xochitlán de Todos los Santos",
          page: "28",
          expanded: false,
          pages: "6",
          sections: [
            {
              title: "Tipo de Población en Xochitlán de Todos los Santos",
              page: "28",
            },
            {
              title: "Población dispersa",
              page: "29",
            },
            {
              title: "Alta proporción de población rural",
              page: "30",
            },
            {
              title: "Niveles de pobreza",
              page: "31",
            },
            {
              title: "Acceso limitado a servicios",
              page: "32",
            },
            {
              title: "Diversidad étnica",
              page: "33",
            },
          ],
        },
        {
          number: "34",
          title:
            "Mejoras Propuestas para la Población de Xochitlán de Todos los Santos",
          page: "34",
          expanded: false,
          pages: "9",
          sections: [
            {
              title:
                "Mejoras Propuestas para la Población de Xochitlán de Todos los Santos",
              page: "34",
            },
            {
              title: "Mejora en la infraestructura de distribución",
              page: "35",
            },
            {
              title: "Capacitación y educación comunitaria",
              page: "36",
            },
            {
              title: "Sistemas de captación y tratamiento de agua de lluvia",
              page: "37",
            },
            {
              title:
                "Mejora en la calidad del agua mediante plantas de tratamiento locales",
              page: "38",
            },
            {
              title:
                "Monitoreo de la calidad del agua y gestión hídrica comunitaria",
              page: "39",
            },
            {
              title: "Manejo equitativo y económico del recurso",
              page: "40",
            },
            {
              title: "Infraestructura resiliente frente a fenómenos climáticos",
              page: "41",
            },
            {
              title: "Planificación para el crecimiento futuro",
              page: "42",
            },
          ],
        },
      ],
    };
  },
  methods: {
    toggleChapter(index) {
      // Solo toggle si hay secciones
      if (this.chapters[index].sections?.length) {
        this.chapters[index].expanded = !this.chapters[index].expanded;
      }
    },
    handleChapterClick(chapter) {
      console.log(`Navegando a la pagina: ${chapter.page}`);
      this.$router.push(`/page/${chapter.page}`);
    },
  },
};
</script>
