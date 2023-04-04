import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'
import VersiculosPage from '../views/VersiculosPage.vue'
import DeclaracoesPage from '../views/DeclaracoesPage.vue'
import CadastroPage from '../views/CadastroPage.vue'
import CriarContaPage from '../views/CriarContaPage.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',   
    component: HomeView,
    children: [
      {
      path: '/',
      name: 'versiculos',
      component: VersiculosPage

    },
    {
      path: '/declaracoes',
      name: 'declaracoes',
      component: DeclaracoesPage
    },
    { 
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroPage

    },
  ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/criarconta',
    name: 'criarconta',
    component: CriarContaPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
