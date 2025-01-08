import { useFetchData } from '@/pages/useFetchData'
import { type RouteRecordRaw, createWebHistory, createRouter } from 'vue-router'

const modules = import.meta.glob('../pages/**/*.vue')

type RouteConfig = Pick<
    RouteRecordRaw,
    'name' | 'path' | 'redirect' | 'component' | 'beforeEnter'
> & {
    path: string
    componentPath?: string
    meta?: {
        requireAuth: boolean
    }
    children?: RouteConfig[]
}

const initRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/pages/Home.vue')
    }
]

const cachedAsyncComponent = new Map()

export const loadWithDelay = (promise: Promise<any>, time: number, key?: string) => {
    if (key && cachedAsyncComponent.has(key)) {
        return cachedAsyncComponent.get(key)
    }
    const delay = (d: number) => new Promise((resolve) => setTimeout(resolve, d))
    const delayPromise = delay(time)

    key && cachedAsyncComponent.set(key, promise)

    return Promise.all([promise, delayPromise]).then(() => promise)
}

// const Home = defineAsyncComponent(() => import('@/pages/Home.vue'));

const routesMap: RouteConfig[] = [
    {
        path: '/',
        children: [
            {
                path: '',
                redirect: '/home'
            },
            {
                path: 'home',
                component: () => import('@/pages/Home.vue')
            },
            // {
            //     path: 'about',
            //     component: defineAsyncComponent({
            //         loader: () => import('@/pages/About.vue'),
            //         delay: 2000
            //     })
            // },
            {
                path: 'about',
                component: () => import('@/pages/About.vue'),
                beforeEnter: (to, from, next) => {
                    const { number, name, abortController } = useFetchData()
                    to.meta.number = number
                    to.meta.name = name
                    to.meta.abortController = abortController
                    next()
                }
            },
            {
                path: 'suspense',
                children: [
                    {
                        path: 'cache',
                        component: () => import('@/pages/Suspense/cache.vue')
                    },
                    {
                        path: 'no-cache',
                        component: () => import('@/pages/Suspense/noCache.vue')
                    }
                ]
            },
            {
                path: 'test',
                component: () => loadWithDelay(import('@/pages/Test.vue'), 0)
            },
            {
                path: 'pdf',
                component: () => import('@/pages/pdf/index.vue')
            },
            {
                path: 'file-upload',
                component: () => import('@/pages/file-upload/index.vue')
            },
            {
                path: 'sse',
                component: () => import('@/pages/sse/index.vue')
            },
            // {
            //   path: 'create-element',
            //   componentPath: 'CreateElement/index',
            //   // meta: { requireAuth: true }
            // },
            // {
            //   path: '/mount-blade',
            //   componentPath: 'MountBlade/index'
            // },
            {
                path: '/child-a',
                component: () => import('@/pages/Child/ChildA.vue')
            },
            {
                path: '/child-b',
                component: () => import('@/pages/Child/ChildA.vue')
            },
            {
                path: 'chat',
                component: () => import('@/pages/Chat.vue')
            },
            {
                path: 'el',
                children: [
                    {
                        path: 'form',
                        component: () => import('@/pages/ElForm/index.vue')
                    },
                    {
                        path: 'cascader',
                        component: () => import('@/pages/ElForm/el-cascader.vue')
                    }
                ]
            },
            {
                path: 'editor',
                component: () => import('@/pages/editor/index.vue')
            }
        ]
    }
]

const handleAsyncRoutes = (routes: RouteConfig[]): any[] =>
    routes.map((route) => {
        // console.log('route: ', route.componentPath);
        if (route.children && route.children.length > 0) {
            route.children = handleAsyncRoutes(route.children)
        }
        if (route.componentPath) {
            return {
                ...route,
                path: route.path,
                component: modules[`../pages/${route.componentPath}.vue`]
            }
        }
        return route
    })

// const staticRoutes: RouteRecordRaw[] = [
//   { path: '/home', component: () => import('../pages/HomeView.vue') },
//   { path: '/about', component: () => import('../pages/AboutView.vue') }
// ];

const asyncRoutes = handleAsyncRoutes(routesMap)

const router = createRouter({
    history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/app-vue2' : '/'),
    routes: asyncRoutes
})

// asyncRoutes.forEach((route) => router.addRoute(route));

router.beforeEach((to, from, next) => {
    // console.log('to: ', to, from);
    // if (to.path === '/home') {
    //   alert('home');
    // }
    // if (to.path === '/about') {
    //   next('/home');
    // }
    next()
})
export default router
