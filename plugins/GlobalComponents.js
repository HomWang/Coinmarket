import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Wave from '~/components/Loading/wave'


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.component('my-Wave', Wave)