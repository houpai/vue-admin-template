import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 路由配置项
// hidden: true 默认为false 设置为true的时候路由不会在菜单栏显示
// redirect: 'noRedirect' 设置为noRedirect的时候, 不可在面包屑导航中点击

// 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
// 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
// 若你想不管路由下面的 children 声明的个数都显示你的根路由
// 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
// alwaysShow: true
// name: 'router-name' 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
// meta: {
//   roles: ['admin', 'editor'] // 设置该路由进入的权限，支持多个权限叠加
//   title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
//   icon: 'svg-name' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
//   noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
//   breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
//   affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)
//
//   // 当路由设置了该属性，则会高亮相对应的侧边栏。
//   // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
//   // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
//   activeMenu: '/article/list'
// }

// 路由配置项示例
// {
//   path: '/permission',
//     component: Layout,
//   redirect: '/permission/index', //重定向地址，在面包屑中点击会重定向去的地址
//   hidden: true, // 不在侧边栏显示
//   alwaysShow: true, // 一直显示根路由
//   meta: { roles: ['admin','editor'] }, //你可以在根路由设置权限，这样它下面所有的子路由都继承了这个权限
//   children: [{
//     path: 'index',
//     component: ()=>import('permission/index'),
//     name: 'permission',
//     meta: {
//       title: 'permission',
//       icon: 'lock', //图标
//       roles: ['admin','editor'], //或者你可以给每一个子路由设置自己的权限
//       noCache: true // 不会被 <keep-alive> 缓存
//     }
//   }]
// }


/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/demo',
    component: Layout,
    redirect: '/demo/demo1',
    name: 'Demo',
    meta: { title: 'Demo', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'demo1',
        name: 'Demo1',
        component: () => import('@/views/demo/demo1'),
        meta: { title: 'Demo1', icon: 'table' }
      },
      {
        path: 'demo2',
        name: 'Demo2',
        component: () => import('@/views/demo/demo2'),
        meta: { title: 'Demo2', icon: 'tree' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
