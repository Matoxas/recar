<template>
  <v-container v-if="items.length===0 && loading.items" fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex text-xs-center>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>

  <v-container v-else-if="items.length==0" fill-height class="mt-5">
    <v-layout wrap>
      <v-flex xs12>
        <Sortbar></Sortbar>
      </v-flex>
      <v-flex text-xs-center>
        <div class="grey--text headline">
          <span class="font-weight-light">Nieko nerasta, pabandykite kitą paiešką</span>
        </div>
      </v-flex>
    </v-layout>
  </v-container>

  <v-container v-else class="mt-5">
    <Sortbar></Sortbar>
    <v-layout wrap>
      <v-flex v-for="item in items" mb-2 xs12 sm6 md4 :key="item.id">
        <Item :item="item"></Item>
      </v-flex>
    </v-layout>
  </v-container>
</template>





<script>
import Item from "../components/feed/item.vue";
import Sortbar from "../components/sortbar/sortbar.vue";
import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["items", "loading"]),
  components: {
    Item,
    Sortbar
  }
};
</script>

<style>
</style>
