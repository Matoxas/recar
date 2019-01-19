const actions = {

    changePriceFilter ({ commit }, price) {
        commit('changePriceFilter', price);
    },
    changeQueryFilter ({ commit }, query) {
        commit('changeQueryFilter', query);
    },
    changeSortFilter ({ commit }, sort) {
        commit('changeSortFilter', sort);
    }

}

export default actions;