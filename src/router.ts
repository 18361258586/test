import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

let router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path:'*',
      redirect:'/login'
    },
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/index.vue'),
      children:[
        {
          path: '/',
          name: 'home',
          component: Home,
        },
        {
          path: '/about',
          name: 'about',
          component: () => import(/* webpackChunkName: "about" */ './views/SearList.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
  ],
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  
  let xtoken = localStorage.getItem("token")
  if(xtoken){
      
      if(to.path == '/login'){
        next({ path: '/home',replace: true })
      }else{
        next();
      }
  }else if(to.path != '/login'){
      next({ path: '/login',replace: true })
  }else{
    next()
  }
  
});



export default router;