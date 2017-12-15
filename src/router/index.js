import Vue from 'vue'
import Router from 'vue-router'
import overviewComponent from './../components/overview.vue'
import checklistComponent from './../components/checklist.vue'
import resourceComponent from './../components/resource.vue'
import loginComponent from './../components/login.vue'
import signinComponent from './../components/signin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      component: overviewComponent
    },
    {
      path: '/overview',
      name: 'overview',
      component: overviewComponent
    },
    {
      path: '/checklist',
      name: 'checklist',
      component: checklistComponent
    },
    {
      path: '/resource',
      name: 'resource',
      component: resourceComponent
    },
    {
      path: '/login',
      name: 'login',
      component: loginComponent
    },
    {
      path: '/signin',
      name: 'signin',
      component: signinComponent
    }
  ]
})