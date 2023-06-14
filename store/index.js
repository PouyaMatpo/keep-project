export const state = () => ({
    user: undefined
  })
  
  export const getters = {
    
  }
  export const mutations = {
  
    setUser (state, user) {
      state.user = user
    }
  }

  
  export const actions = {
    setToken({ commit}, data) {
        commit('setUser', data.user)
        if(data.token){
            this.$cookies.set('token', data.token);
        }
    },
    logout({ commit}) {
        commit('setUser', undefined);
        this.$cookies.remove('token');
    },

    async nuxtServerInit({ dispatch, commit }, { app }) {
		const token = app.$cookies.get('token')
		if (token) {
			await app.$axios.get('http://127.0.0.1:8000/api/auth/me', {
				headers: { Authorization: "Bearer " + token }
			})
			.then(res => {
				if (res.data === undefined || res.data == null || res.data === "") {
					app.$cookies.remove('token');
					return;
				}
				dispatch('setToken', res.data);
                this.$axios.defaults.headers.common["Authorization"] = "Bearer " + token;
			})
			.catch(err => {
				console.log(err);
				app.$cookies.remove('token')
				delete this.$axios.defaults.headers.common["Authorization"];
			})
		}
	},
  }

  