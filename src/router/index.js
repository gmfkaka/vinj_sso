import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) =>
    savedPosition || {
      x: 0,
      y: 0
    },
  routes: [
    {
      path: '/',
      name: 'works',
      component: () => import('../components/login'),
      redirect: '/works'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/register')
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => import('../components/forget')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../view/index'),
      redirect: '/works',
      children: [
        {
          path: '/personal',
          name: 'personal',
          component: () => import('../view/personal/personalCenter')
        },
        {
          path: '/works',
          name: 'works',
          component: () => import('../view/myWorks/works')
        },
        {
          path: '/download',
          name: 'download',
          component: () => import('../view/myDownload/download')
        },
        {
          path: '/collection',
          name: 'collection',
          component: () => import('../view/myCollection/collection')
        },
        {
          path: '/activity',
          name: 'activity',
          component: () => import('../view/myActivity/activity'),
          redirect: 'activitylist',
          children: [
            {
              path: '/activitylist',
              name: 'activitylist',
              component: () => import('../view/myActivity/components/activitylist')
            },
            {
              path: '/scorelist',
              name: 'scorelist',
              component: () => import('../view/myActivity/components/scorelist')
            },
            {
              path: '/activitydetail',
              name: 'activitydetail',
              component: () => import('../view/myActivity/components/activitydetail')
            },
            {
              path: '/scoredetail',
              name: 'scoredetail',
              component: () => import('../view/myActivity/components/scoredetail')
            }
          ]
        }
      ]
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: () => import('../view/homePage/homepage')
    },
    {
      path: '/otherhome',
      name: 'otherhome',
      component: () => import('../view/homePage/otherhome')
    },
    {
      path: '/signing',
      name: 'signing',
      component: () => import('../view/signing')
    },
    {
      path: '/postVideo:videoId?',
      name: 'postVideo',
      component: () => import('../view/postVideo')
    },
    {
      path: '/sigingentry',
      name: 'sigingentry',
      component: () => import('../view/sigingentry')
    },
    {
      path: '/post:worksId?',
      name: 'post',
      component: () => import('../view/post')
    }
  ]
})
