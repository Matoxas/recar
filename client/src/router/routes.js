
import Router from 'vue-router'
import feed from '../pages/feed.vue';
import newItem from '../pages/newProduct.vue';
import product from '../pages/product.vue';


export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'feed',
        component: feed
      },
      {
        path: '/product/new',
        name: 'new',
        component: newItem
      },
      {
        path: '/product/:Pid',
        name: 'product',
        component: product
      },
      {
        path: '*',
        redirect: '/'
      }
    ]
  })