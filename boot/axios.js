import Vue from 'vue'
import axios from 'axios'

// use this.$axios in app components
Vue.prototype.$axios = axios

// use this.$api in app components
const api = axios.create({ baseURL: 'https://badí.com' })
Vue.prototype.$api = api

export { axios, api }
