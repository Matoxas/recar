const mutations = {

    setLoading (state, values){
        state.loading = {
            ...state.loading,
            ...values
        };
    }
}

export default mutations;