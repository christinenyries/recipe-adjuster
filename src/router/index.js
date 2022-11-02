import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipeDetailView from '../views/RecipeDetailView.vue'
import RecipeFormView from '../views/RecipeFormView.vue'
import RecipeListView from '../views/RecipeListView.vue'
import NotFoundView from '../views/NotFoundView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/recipes',
    component: RecipeListView,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/recipes/add',
    component: RecipeFormView,
  },
  {
    path: '/recipes/:id',
    component: RecipeDetailView,
    props: true
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/:notFound(.*)',
    component: NotFoundView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
