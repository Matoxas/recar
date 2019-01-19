const mutations = {

    setItem (state, item){
        state.item = item;
    },

    setAllItems (state, items){
        state.items = items;
    },

    removeItem (state, id){
        state.items = state.items.filter(item =>{
            return item._id != id
        })
    },

    addNewItem (state, item){
        state.items = [item, ...state.items];
    },

    editItem (state, item){
        const newArray = state.items.filter(x => x._id !== item._id);
        state.items = [...newArray, item] ;
    },


}

export default mutations;