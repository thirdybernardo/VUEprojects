import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Addsmooth from '@/components/Addsmooth'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/addsmooth/new',
      name:'Addsmooth',
      component:Addsmooth
    }
  ]
})
