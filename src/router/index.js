import Vue from 'vue'
import Router from 'vue-router'

import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'

Vue.use(Router)

const routes = [

  {
    path: '/',
    redirect: '/recommend'
  },

  {
    name: 'recommend',
    path: '/recommend',
    component: Recommend
  },

  {
    name: 'rank',
    path: '/rank',
    component: Rank
  },

  {
    name: 'search',
    path: '/search',
    component: Search
  },

  {
    name: 'singer',
    path: '/singer',
    component: Singer
  }
]

export default new Router({
  routes
})
