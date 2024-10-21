<template>
  <Nav />
  <div class="row box">
    <div class="col-3 menu">
      <Menu />
    </div>
    <div class="col-9">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup>
import Menu from "./components/Menu.vue";
import Nav from "./components/Nav.vue";
import { RouterView } from "vue-router";
</script>

<style scoped>
.box {
  min-height: 100vh;
  background-color: #ddd;
  border-radius: 0;
  padding-right: 0;
}
.menu {
  border-right: 1px solid #000;
  padding: 0;
}
</style>
