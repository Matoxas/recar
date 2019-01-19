const mutations = {

    changePriceFilter (state, price) {
        state.filters.price = price;
    },
    
    changeQueryFilter (state, query){
        state.filters.query = query;
    },

    changeSortFilter (state, sort){
        state.filters.sort = sort;
    }

}

export default mutations;