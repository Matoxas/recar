<template>
  <v-card class="mx-auto mt-1 mb-1 ml-2 mr-2" color="white" flat max-width="600" height="400">
    <v-hover>
      <v-img
        src="https://increasify.com.au/wp-content/uploads/2016/08/default-image.png"
        height="200px"
        slot-scope="{ hover }"
        style="position: relative;"
      >
        <v-expand-transition>
          <div
            :style="`${hover? 'height: 100%;': 'display: none; bottom: -90px;'}`"
            class="d-flex fullheight transition-fast-in-fast-out primary v-card--reveal display-3 white--text"
          >
            <div>
              <v-layout align-center>
                <v-flex text-xs-center>
                  <div class="buttons-wrapper">
                    <v-tooltip top>
                      <v-btn
                        :to="'product/'+item._id"
                        slot="activator"
                        color="primary"
                        dark
                        class="grey--text"
                        fab
                        depressed
                      >
                        <v-icon color="white">mdi-eye</v-icon>
                      </v-btn>
                      <span>Peržiūrėti</span>
                    </v-tooltip>
                    <editItemDialog :showCircle="true" :item="item"></editItemDialog>
                  </div>
                </v-flex>
              </v-layout>
            </div>
          </div>
        </v-expand-transition>
        <div class="item-time">
          <h2 class="font-weight-light subheading grey--text">{{ item.updatedAt | moment }}</h2>
        </div>
      </v-img>
    </v-hover>
    <v-card-text class="pt-4" style="position: relative;">
      <v-btn absolute color="white" dark class="grey--text" fab depressed large right top>
        <h2>{{item.price}}€</h2>
      </v-btn>
      <div class="grey--text title mb-2">
        <span class="manufacturer font-weight-light">{{item.manufacturer}}</span>
      </div>
      <router-link class="primary-link" :to="'product/'+item._id">
        <h3 class="display-1 font-weight-light primary--text mb-2">{{item.name}}</h3>
      </router-link>
      <div class="grey--text body-2 mb-2">
        <span class="font-weight-normal">{{item.model}}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from "moment";
import editItemDialog from "../dialogs/editItemDialog";

moment.locale("lt");

export default {
  name: "item",
  props: {
    item: Object
  },

  filters: {
    moment: date => {
      return moment(date).fromNow(true);
    }
  },
  components: {
    editItemDialog
  }
};
</script>

<style lang="scss" scooped>
.item-time {
  position: absolute;
  display: block;
  background-color: white;
  top: 1rem;
  left: 1rem;
  z-index: 0 !important;
  padding: 0.25rem 0.5rem;

  > * {
    // color: $primary !important;
  }
}

.manufacturer {
  border-bottom: 1px solid rgb(196, 196, 196);
}

button {
  z-index: 1 !important;

  &:hover * {
    transition: transform 0.2s ease-in-out;
    transform: scale(1.05);
  }
}

.v-btn--active:before,
.v-btn:hover:before,
.v-btn:focus:before {
  background-color: white !important;
  //   cursor: initial !important;
}
.v-card--reveal {
  .fullheight {
    height: 100%;
  }

  z-index: 99 !important;
  display: flex;
  align-items: center;
  bottom: 0;

  justify-content: center;
  position: absolute;
  width: 100%;

  &.primary {
    background-color: rgba($primary, 0.5) !important;
  }

  .buttons-wrapper {
    display: inline-block;
    padding-bottom: 0.5rem;
    border-radius: 38px;
    background-color: rgba(white, 0.4) !important;
  }
}

a.primary-link {
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>


 