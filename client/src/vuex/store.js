import Vue from 'vue'
import Vuex from 'vuex'

//getters
import filteredItems from './getters/filter'

//actions 
import itemActions from './actions/item'
import filterActions from './actions/filter'

//mutations
import itemMutations from './mutations/item'
import filterMutations from './mutations/filter'
import otherMutations from './mutations/etc'


const state = {
    items: [],
    item: {},
  filters: {
      query: '',
      price: [1, 99],
      sort: 'naujausi viršuje'
  },
  loading: {
      items: false,
      item: false,
      editItem: false
  }
}

const getters = {
    items: state => filteredItems(state),
    item: state => state.item,
    filters: state => state.filters,
    loading: state => state.loading,
    models: state => [...new Set(state.items.map(item=>(
        item.manufacturer)))]
  }


  const mutations = {
    ...filterMutations,
    ...itemMutations,
    ...otherMutations
  }

  const actions = {
    ...filterActions,
    ...itemActions
  }

  Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})