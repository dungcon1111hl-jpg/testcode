<script setup>
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div id="app-layout">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<style>
/* --- QUAN TRỌNG: Reset lề của trình duyệt --- */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden; /* Tránh thanh cuộn ngang */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa; /* Màu nền xám nhẹ cho toàn trang */
}

#app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>