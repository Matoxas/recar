<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-list-tile @click="''" slot="activator">ištrinti</v-list-tile>

    <v-card v-if="loading.editItem" height="150">
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex text-xs-center>
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <v-card v-else-if="formStatus == 'PENDING'">
      <v-card-title class="primary white--text headline">Dėmėsio!</v-card-title>
      <v-card-text>Produktas bus ištrintas. Tęsti?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" flat @click="dialog = false">atšaukti</v-btn>
        <v-btn color="primary darken-1" flat @click="submit()">Taip</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else-if="formStatus == 'COMPLETED'">
      <v-card-title class="primary white--text headline">Atlikta!</v-card-title>
      <v-responsive class="text-xs-center mt-5">
        <v-icon x-large color="green">mdi-checkbox-marked-circle</v-icon>
      </v-responsive>
      <v-card-text
        class="title text-xs-center mb-4 font-weight-light"
      >Produktas sėkmingai ištrintas!</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" flat @click="close()">uždaryti</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      formStatus: "PENDING",
      dialog: false
    };
  },

  computed: mapGetters(["loading"]),

  methods: {
    ...mapActions(["removeItem"]),
    submit() {
      this.removeItem(this.id)
        .then(response => {
          if (response) {
            this.formStatus = "COMPLETED";
          } else {
            alert("something is wrong, try again later");
          }
        })
        .catch(err => {
          alert(err);
        });
      // this.$router.push("/");
    },
    close() {
      this.$router.push("/");
    }
  },

  props: {
    id: String
  }
};
</script>

<style>
</style>
