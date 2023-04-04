<template>
<v-app>
  <NavbarPage />
  <v-main>
    <v-container fluid>
    <router-view></router-view>
    </v-container>
  </v-main>
</v-app>

</template>

<script>
import NavbarPage from '../components/NavbarPage.vue'
export default {
  name: "HomeView",
  components: { NavbarPage }
}
</script>

<style>

</style>
