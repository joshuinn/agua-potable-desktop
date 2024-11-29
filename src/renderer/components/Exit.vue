<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "Exit",
  data() {
    return {
      message: "Goodbye!",
    };
  },
  mounted() {
    // Llama a la función para cerrar la aplicación
    if (window.electronAPI && window.electronAPI.closeApp) {
      window.electronAPI.closeApp();
    }
  },
};
</script>
