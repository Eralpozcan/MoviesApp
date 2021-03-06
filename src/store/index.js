import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import i18n from "../i18n";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topRatedMovies: [],
    moviesPopular:[],
    movieDetail:[],
    castDetail:[],
    language:"en",
  },
  mutations: {
    setLanguage(state,payload){
      state.language = payload;
      i18n.locale = state.language;
    },
    setMoviesPopular(state,payload){
      state.moviesPopular = payload
    },
    setTopRate(state,payload){
      state.topRatedMovies = payload
    },
    setMovieDetail(state,payload){
      state.movieDetail == []
      state.movieDetail = payload
    },
    setCastDetail(state,payload){
      state.castDetail == []
      state.castDetail = payload
    }
  },
  actions: {
    getTopRate({state,commit}){
      axios.get(`${process.env.VUE_APP_API_URL}/3/movie/top_rated?api_key=${process.env.VUE_APP_API_KEY}&language=${state.language}`).then((response)=>{
        commit('setTopRate',response.data.results)
      });
    },
    getPopular({state,commit}){
      axios.get(`${process.env.VUE_APP_API_URL}/3/movie/popular?api_key=${process.env.VUE_APP_API_KEY}&language=${state.language}`).then((response)=>{
        commit('setMoviesPopular',response.data.results)
      });
    },
    movieIdFetch({state,commit},movieId){
      axios.get(`${process.env.VUE_APP_API_URL}/3/movie/${movieId}?api_key=${process.env.VUE_APP_API_KEY}&language=${state.language}`).then((response)=>{
        commit('setMovieDetail',response.data)

      });
    },
    getCast({state,commit},movieId){
      axios.get(`${process.env.VUE_APP_API_URL}/3/movie/${movieId}/credits?api_key=${process.env.VUE_APP_API_KEY}&language=${state.language}`).then((response)=>{
        commit('setCastDetail',response.data)
      });
    }
  },
  getters:{

  },
  modules: {
  }
})
