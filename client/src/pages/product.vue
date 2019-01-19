<template>
  <v-container v-if="loading.item" fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex text-xs-center>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>

  <v-container v-else mt-5>
    <v-layout nowrap>
      <v-flex xs12>
        <v-card flat>
          <div class="header">
            <v-layout mx-3 pt-3 justify-space-between align-start nowrap>
              <v-flex>
                <h2 class="display-1 primary--text">{{item.name}}</h2>
                <h3 class="mt-2 font-weight-normal subheading grey--text">
                  <span class="font-weight-normal mr-1">{{item.manufacturer}}</span>
                  <span class="font-weight-light">{{item.model}}</span>
                </h3>
              </v-flex>
              <v-spacer></v-spacer>

              <v-menu light left offset-y>
                <v-btn slot="activator" icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>

                <v-list class="white">
                  <editItemDialog :item="item"></editItemDialog>
                  <deleteItemDialog :id="proId"></deleteItemDialog>
                </v-list>
              </v-menu>
            </v-layout>
          </div>

          <v-card-text>
            <v-divider class="mt-2" light></v-divider>
          </v-card-text>
          <v-card-text>
            <h3 class="title grey--text">
              <span class="font-weight-normal mr-1">kaina:</span>
              <span class="font-weight-light">€{{item.price}}</span>
            </h3>
            <h3 class="title grey--text mt-2">
              <span class="font-weight-normal mr-1">spalva:</span>
              <span class="font-weight-light">{{item.color}}</span>
            </h3>
            <h3 class="title grey--text mt-2">
              <span class="font-weight-normal mr-1">pagaminimo metai:</span>
              <span class="font-weight-light">{{item.year}}</span>
            </h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import editItemDialog from "../components/dialogs/editItemDialog";
import deleteItemDialog from "../components/dialogs/deleteItemDialog";

export default {
  name: "product",
  data() {
    return {
      proId: this.$route.params.Pid
    };
  },
  computed: mapGetters(["item", "loading"]),
  methods: {
    ...mapActions(["getItem"])
  },
  mounted() {
    if (this.proId) {
      this.getItem(this.proId).then(response => {
        if (!response) {
          this.$router.push("/");
        }
      });
    }
  },
  components: {
    editItemDialog,
    deleteItemDialog
  }
};
</script>

<style scoped lang="scss">
.v-list {
  flex-direction: column !important;
  display: flex !important;
}
</style>
