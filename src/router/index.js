import Vue from 'vue'
import VueRouter from 'vue-router'

import UserAuthView from '../views/UserAuthView.vue'
import HomeView from '../views/HomeView.vue'
import RecipeDetailView from '../views/RecipeDetailView.vue'
import RecipeFormView from '../views/RecipeFormView.vue'
import RecipeListView from '../views/RecipeListView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    component: UserAuthView,
    meta: { requiresUnauth: true }
  },
  {
    path: '/recipes',
    component: RecipeListView,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/recipes/add',
    component: RecipeFormView,
    meta: { requiresAuth: true },
  },
  {
    path: '/recipes/:id',
    component: RecipeDetailView,
    props: true,
    meta: { requiresAuth: true },
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
    alias: '/not-found',
    name: 'notFound',
    component: NotFoundView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  }
  else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/recipes');
  }
  else {
    next();
  }
});

export default router
