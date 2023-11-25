import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"",
      component:()=>import("@/views/index.vue"),
      children:([
        {
          path:"",
          component:()=>import("@/views/home/home.vue")
        },
        {
          path:"/home",
          component:()=>import("@/views/home/home.vue"),
          children:([
            {
              path:"",
              component:()=>import("@/views/home/component/increase.vue")
            },
            {
              path:"/increase",
              component:()=>import("@/views/home/component/increase.vue")
            },
            {
              path:"/deal",
              component:()=>import("@/views/home/component/deal.vue")
            }
          ])
        },
        {
          path:"/quote",
          component:()=>import("@/views/quote/quote.vue")
        },
        {
          path:"/wallet",
          component:()=>import("@/views/wallet/wallet.vue")
        },
        {
          path:"/mine",
          component:()=>import("@/views/mine/mine.vue")
        }
      ])
    },
  ]
})

export default router