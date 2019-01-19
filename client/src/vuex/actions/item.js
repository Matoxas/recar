import axios from 'axios';

const actions = {

    getAllItems ({ commit }) {
        commit('setLoading', {
            items: true
        });
      axios.get('/parts').then(parts=>{
        commit('setAllItems', parts.data.data)
        commit('setLoading', {
            items: false
        });
        return true;
      }
          ).catch(()=>{
            commit('setAllItems', [])
            commit('setLoading', {
                items: false
            });
            return false;
          });
    },
    getItem ({ commit }, id) {
        commit('setLoading', {
            item: true
        });
       return axios
        .get("parts/" + id)
        .then(item => {
            commit('setLoading', {
                item: false
            });
            commit('setItem', item.data.data)
            return true;
        })
        .catch(() => {
            commit('setItem', {})
            commit('setLoading', {
                item: false
            });
            return false;
        });
    },

    addNewItem ({ commit }, item) {
        commit('setLoading', {
            item: true
        });
       return axios
        .post("parts/", item)
        .then(response => {
            commit('setLoading', {
                item: false
            });
            commit('addNewItem', response.data.data);
            return response.data.data._id;
        })
        .catch(() => {
            commit('setItem', {})
            commit('setLoading', {
                item: false
            });
            return false;
        });
    },

    removeItem ({ commit }, id) {
        commit('setLoading', {
            editItem: true
        });
       return axios
        .delete("parts/"+ id)
        .then(response => {
            commit('setLoading', {
                editItem: false
            });
            if(response.status == 200){
                commit('removeItem', id);
                return true;
            }
            return false
        })
        .catch(() => {
            commit('setItem', {})
            commit('setLoading', {
                editItem: false
            });
            return false;
        });
    },
    
    editItem ({ commit }, item) {
        commit('setLoading', {
            editItem: true
        });
       return axios
        .patch("parts/"+ item._id, item)
        .then(response => {
            commit('setLoading', {
                editItem: false
            });
            if(response.status == 200){
                commit('editItem', response.data.data);
                return true;
            }
            return false
        })
        .catch(() => {
            commit('setItem', {})
            commit('setLoading', {
                editItem: false
            });
            return false;
        });
    },
    

}

export default actions;