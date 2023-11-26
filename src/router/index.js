import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      component: () => import("@/views/index.vue"),
      children: ([
        {
          path: "",
          component: () => import("@/views/home/home.vue"),
          children: ([
            {
              path: "",
              component: () => import("@/views/home/component/increase.vue")
            },
            {
              path: "/increase",
              component: () => import("@/views/home/component/increase.vue")
            },
            {
              path: "/deal",
              component: () => import("@/views/home/component/deal.vue")
            }
          ])
        },
        {
          path: "/home",
          component: () => import("@/views/home/home.vue"),
          children: ([
            {
              path: "",
              component: () => import("@/views/home/component/increase.vue")
            },
            {
              path: "/increase",
              component: () => import("@/views/home/component/increase.vue")
            },
            {
              path: "/deal",
              component: () => import("@/views/home/component/deal.vue")
            }
          ])
        },
        {
          path: "/quote",
          component: () => import("@/views/quote/quote.vue")
        },
        {
          path:"/contract",
          component:()=>import("@/views/contract/contract.vue")
        },
        {
          path: "/wallet",
          component: () => import("@/views/wallet/wallet.vue")
        },
        {
          path: "/mine",
          component: () => import("@/views/mine/mine.vue")
        }
      ])
    },
    {
      path:"/all",
      component:()=>import("@/views/contract/all.vue")
    },
    {
      path:"/verify",
      component:()=>import("@/views/mine/component/verify.vue")
    }
  ]
})

export default router
