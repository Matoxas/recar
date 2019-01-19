<template>
  <v-toolbar color="primary" dark fixed flat tabs>
    <v-toolbar-title white>
      <router-link to="/">Automobilių Dalys</router-link>
    </v-toolbar-title>

    <v-tabs right color="transparent">
      <v-tab to="/">Pradžia</v-tab>

      <v-tab exact to="/product/new">Įkelti naują</v-tab>
    </v-tabs>
  </v-toolbar>
</template>

<script>
export default {
  name: "navBar",
  props: {}
};
</script>

<style lang="scss" scoped>
.v-toolbar__title {
  overflow: visible !important;
}

a {
  color: white;
  text-decoration: none;
}
</style>
