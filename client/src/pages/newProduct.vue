<template>
  <v-container mt-5>
    <v-layout>
      <v-flex xs12>
        <v-card flat>
          <v-card-title class="primary white--text headline">Naujo produkto įkėlimas</v-card-title>

          <v-card-text>
            <form>
              <v-text-field
                v-validate="'required|max:20'"
                v-model="input.name"
                :counter="20"
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
                v-validate="'required|max:20'"
                v-model="input.model"
                :counter="20"
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
            <v-btn color="primary" @click="submit">patvirtinti</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- ALERT DIALOG -->
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card>
        <v-card-title class="headline">Puiku!</v-card-title>
        <v-responsive class="text-xs-center">
          <v-icon x-large color="green">mdi-checkbox-marked-circle</v-icon>
        </v-responsive>
        <v-card-text
          class="title text-xs-center mb-4 font-weight-light"
        >Produktas sėkmingai įkeltas!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" flat @click="dialog = false">Grįžti</v-btn>
          <v-btn
            :to="'/product/'+ input.id"
            color="primary darken-1"
            flat
            @click="dialog = false"
          >Peržiūrėti</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
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

  computed: mapGetters(["models"]),

  data: () => ({
    dialog: false,
    formStatus: "PENDING",
    input: {
      name: "",
      color: "",
      model: "",
      manufacturer: "",
      year: "",
      price: "",
      id: null
    },

    dictionary: {
      custom: {
        name: {
          required: () => "įveskite pavadinimą",
          max: "pavadinimas negali būti ilgesnis nei 20 simbolių"
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
          max: "pavadinimas negali būti ilgesnis nei 20 simbolių"
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
  },

  methods: {
    ...mapActions(["addNewItem"]),
    submit() {
      this.$validator.validateAll().then(res => {
        if (res) {
          this.input.price = Math.round(this.input.price * 100) / 100;
          this.addNewItem(this.input).then(res => {
            if (res) {
              this.dialog = true;
              this.input.id = res;
              this.clear();
            } else {
              alert(res);
            }
          });
        }
      });
    },
    clear() {
      this.input.name = "";
      this.input.color = "";
      this.input.model = "";
      this.input.manufacturer = null;
      this.input.year = "";
      this.input.price = "";
      this.$validator.reset();
    }
  }
};
</script>

<style scoped>
.v-icon {
  font-size: 5rem !important;
}
</style>
