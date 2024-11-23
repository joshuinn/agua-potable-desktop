<template>
    <div class="layout">
      <Sidebar />
      <div class="bg-gray-50 min-h-screen p-4 w-[calc(100%-250px)] ml-[250px]">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from '../components/SideBar.vue'
  
  export default {
    name: 'MainLayout',
    components: {
      Sidebar
    }
  }
  </script>
  
  <style scoped>
  .layout {
    display: flex;
  }
  
  .main-content {
    margin-left: 250px;
    padding: 2rem;
    width: calc(100% - 250px);
  }
  </style>
  