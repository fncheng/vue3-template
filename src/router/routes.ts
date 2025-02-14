import { useFetchData } from '@/pages/About/useFetchData'
import { useFetchPieData } from '@/pages/About/useFetchPieData'
import { loadWithDelay, type RouteConfig } from '.'

const routes: RouteConfig[] = [
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
            {
                path: 'login',
                component: () => import('@/pages/login/index.vue')
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
                component: () => import('@/pages/About/About.vue'),
                beforeEnter: (to, from, next) => {
                    const { number, name, abortController } = useFetchData()
                    to.meta.number = number
                    to.meta.name = name
                    to.meta.abortController = abortController
                    to.meta.pieData = useFetchPieData()
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
                path: 'child-a',
                children: [
                    {
                        path: '',
                        component: () => import('@/pages/Child/ChildA.vue')
                    },
                    {
                        path: 'vapor',
                        component: () => import('@/pages/Child/index.vapor.vue')
                    }
                ]
            },
            {
                path: '/child-b',
                component: () => import('@/pages/Child/ChildA.vue')
            },
            {
                path: '/context',
                component: () => import('@/pages/context/index.vue')
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
            },
            {
                path: 'canvas',
                component: () => import('@/pages/canvas/index.vue')
            },
            {
                path: 'big-img',
                component: () => import('@/pages/big-img/index.vue')
            }
        ]
    }
]

export default routes
