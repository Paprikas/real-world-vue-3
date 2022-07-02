import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/EventLayout.vue'
import EventDetails from '../views/event/EventDetails.vue'
import EventRegister from '../views/event/EventRegister.vue'
import EventCreate from '../views/event/EventCreate.vue'
import EventEdit from '../views/event/EventEdit.vue'
import NotFound from '../views/NotFound.vue'
import NProgress from 'nprogress'
import ErrorDisplay from '@/views/ErrorDisplay'
import { useEventStore } from '@/store/EventStore'
import { useFlashStore } from '@/store/FlashStore'
import LoginForm from '@/views/LoginForm'

const AboutView = () => import('../views/AboutView.vue')

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({
      page: parseInt(route.query.page) || 1,
    }),
  },
  {
    path: '/events/create',
    name: 'EventCreate',
    component: EventCreate,
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    beforeEnter: (to) => {
      const eventStore = useEventStore()
      return eventStore.fetchEvent(to.params.id).catch((error) => {
        if (error.response && error.response.status === 404) {
          return {
            name: '404Resource',
            params: {
              resource: 'event',
            },
          }
        } else {
          return {
            name: 'ErrorDisplay',
            params: {
              error: error,
            },
          }
        }
      })
    },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails,
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: (to) => {
      return { path: '/events/' + to.params.afterEvent }
    },
  },
  // {
  //   path: '/event/:id',
  //   redirect: { name: 'EventDetails' },
  //   children: [
  //     {
  //       path: 'register',
  //       redirect: () => ({ name: 'EventRegister' }),
  //     },
  //     {
  //       path: 'edit',
  //       redirect: () => ({ name: 'EventEdit' }),
  //     },
  //   ],
  // },
  {
    path: '/about',
    name: 'AboutView',
    component: AboutView,
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: LoginForm,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
  {
    path: '/error/:error',
    name: 'ErrorDisplay',
    component: ErrorDisplay,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from) => {
  NProgress.start()

  const notAuthorized = true
  if (to.meta.requireAuth && notAuthorized) {
    const flashStore = useFlashStore()
    flashStore.setFlashMessage("Sorry, you're not authorized")

    setTimeout(() => {
      flashStore.setFlashMessage('')
    }, 3000)

    if (from.href) {
      return false
    } else {
      return { path: '/' }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
