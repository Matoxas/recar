<template>
  <v-app id="inspire">
    <navbarComponent/>>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer color="primary" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import navbarComponent from "./components/navbar/navbar.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    navbarComponent
  },
  methods: { ...mapActions(["getAllItems"]) },
  mounted() {
    this.getAllItems();
  }
};
</script>

<style lang="scss">
body {
  color: $primary;
}
</style>
