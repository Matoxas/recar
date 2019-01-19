<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-btn
      v-if="showCircle"
      @click="''"
      slot="activator"
      color="primary"
      dark
      class="grey--text"
      fab
      depressed
    >
      <v-icon color="white">mdi-pencil</v-icon>
    </v-btn>

    <v-list-tile v-else @click="''" slot="activator">redaguoti</v-list-tile>

    <v-card v-if="loading.editItem" height="300">
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex text-xs-center>
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <v-card v-else>
      <v-card-text>
        <form>
          <v-text-field
            v-validate="'required|max:30'"
            v-model="input.name"
            :counter="30"
            :error-messages="errors.collect('name')"
            label="Pavadinimas"
            data-vv-name="name"
            required
          ></v-text-field>

          <v-select
            v-validate="'required'"
            :items="models"
            v-model="input.manufacturer"
            :error-messages="errors.collect('manufacturer')"
            label="Gamintojas"
            data-vv-name="manufacturer"
            required
          ></v-select>
          <v-text-field
            v-validate="'required|max:50'"
            v-model="input.model"
            :counter="50"
            :error-messages="errors.collect('model')"
            label="Modelis"
            data-vv-name="model"
            required
          ></v-text-field>
          <v-text-field
            v-validate="'required|numeric|max:4|min:4'"
            v-model="input.year"
            :error-messages="errors.collect('year')"
            label="Pagaminimo metai"
            data-vv-name="year"
            required
          ></v-text-field>
          <v-text-field
            v-validate="'required|decimal|max:10'"
            v-model="input.price"
            :error-messages="errors.collect('price')"
            label="Kaina"
            data-vv-name="price"
            required
          ></v-text-field>
          <v-text-field
            v-validate="'required|max:10'"
            v-model="input.color"
            :counter="10"
            :error-messages="errors.collect('color')"
            label="Spalva"
            data-vv-name="color"
            required
          ></v-text-field>
        </form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" flat @click="cancel()">Atšaukti</v-btn>
        <v-btn color="primary darken-1" flat @click="submit()">Išsaugoti</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import { mapGetters, mapActions } from "vuex";
// import AlertDialog from "../components/dialogs/alertDialog.vue";

Vue.use(VeeValidate);

export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    // AlertDialog
  },

  computed: mapGetters(["models", "loading"]),
  props: {
    item: Object,
    showCircle: Boolean
  },

  data: () => ({
    dialog: false,
    formStatus: "PENDING",
    inputBackup: {},
    input: {
      name: "",
      color: "",
      model: "",
      manufacturer: "",
      year: "",
      price: "",
      _id: null
    },

    dictionary: {
      custom: {
        name: {
          required: () => "įveskite pavadinimą",
          max: "pavadinimas negali būti ilgesnis nei 30 simbolių"
          // custom messages
        },
        model: {
          required: () => "įveskite modelį",
          max: "modelio pavadinimas negali būti ilgesnis nei 10 simbolių"
          // custom messages
        },
        year: {
          required: () => "įveskite detalės pagaminimo metus",
          numeric: "neteisingai įvesti metai",
          max: "maksimalus simbolių skaičius 4",
          min: "įveskite datą iš keturių simbolių"
          // custom messages
        },
        manufacturer: {
          required: () => "pasirinkite tinkamo automobilio markę",
          max: "pavadinimas negali būti ilgesnis nei 50 simbolių"
          // custom messages
        },
        color: {
          required: () => "įveskite spalvą",
          max: "spalvos pavadinimas negali būti ilgesnis nei 10 simbolių"
          // custom messages
        },
        price: {
          required: "įveskite kainą",
          decimal: "neteisingas kainos formatas"
        }
      }
    }
  }),

  mounted() {
    this.$validator.localize("lt", this.dictionary);
    this.input = { ...this.item };
  },

  methods: {
    ...mapActions(["editItem"]),
    submit() {
      this.$validator.validateAll().then(res => {
        if (res) {
          this.input.price = Math.round(this.input.price * 100) / 100;
          this.editItem(this.input)
            .then(response => {
              if (response) {
                this.$validator.reset();
                this.dialog = false;
              } else {
                alert("kažkas ne taip, bandykite veliau");
              }
            })
            .catch(error => {
              alert(error);
            });
        }
      });
    },
    cancel() {
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>
