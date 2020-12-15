import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)
const router=new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect:{name:'edit'}

        },
        {
            path: '/edit',
            name:'edit',
            component: ()=> import('./page/edit'),
        },
        {
            // 会匹配所有路径
            path: '*',
            component: ()=> import('./page/err'),
            meta: { isBack: true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    console.log(to,from)
    if (to.matched.length === 0) {
        from.name ? next({
            name: from.name
        }) : next('/err');
    } else {
        next(); //如果匹配到正确跳转
    }
});
export default router
