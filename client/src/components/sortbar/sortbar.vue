<template>
  <div class="sortbar ml-2 mr-2">
    <v-layout row wrap justify-space-between align-center>
      <v-flex xs12 md4>
        <v-text-field
          background-color="transparent"
          class="mx-3"
          @keyup="changeQueryFilter(query)"
          autofocus
          v-model="query"
          label="Ieškoti"
          light
          prepend-icon="search"
          flat
          single-line
        ></v-text-field>
      </v-flex>

      <v-flex xs12 md4>
        <v-layout class="pricePicker" row nowrap>
          <p>{{price[0]}}€</p>

          <v-flex mt-1 justify-center>
            <v-range-slider
              class="mx-2"
              @change="changePriceFilter(price)"
              v-model="price"
              :max="200"
              :min="0"
              :step="10"
            ></v-range-slider>
          </v-flex>

          <p>{{price[1]}}€</p>
        </v-layout>
      </v-flex>
      <v-flex xs12 md4>
        <v-select
          class="mx-3"
          :items="sortList"
          @input="changeSortFilter(selectedSort)"
          v-model="selectedSort"
          flat
          single-line
          :label="selectedSort"
        ></v-select>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["filters"])
  },
  data() {
    return {
      price: [1, 100],
      sortList: [
        "naujausi viršuje",
        "seniausi viršuje",
        "pigiausi viršuje",
        "brangiausi viršuje"
      ],
      selectedSort: "naujausi viršuje",
      query: ""
    };
  },
  mounted() {
    this.price = this.filters.price;
    this.query = this.filters.query;
    this.selectedSort = this.filters.sort;
  },
  methods: {
    ...mapActions([
      "changePriceFilter",
      "changeQueryFilter",
      "changeSortFilter"
    ])
  },
  components: {}
};
</script>

<style lang="scss">
.sortbar {
  background-color: white;
  margin-bottom: 0.5rem;
}

.pricePicker {
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 0px 15px;
    padding-bottom: 0px;
  }
}
</style>
