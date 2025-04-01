import type { RouteRecord } from 'vue-router'

declare module '~pages' {
    const routes: RouteRecord
    export default routes
}
