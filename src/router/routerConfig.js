import IndexRoot from '../views/index'
import Login from '../views/login'
import Home from '@/views/index/home'
import CheckWork from '@/views/index/checkWork'
import Customer from '@/views/index/customer'
import College from '@/views/index/college'
import Integral from '@/views/index/integral'
import Assistant from '@/views/index/assistant'
import Plan from '@/views/index/plan'
import Level from '@/views/index/level'
import Management from '@/views/index/management'
import Addtab from '@/views/index/addTab'
const routes = [
    /**
     * 主页
     */
    {
        path: '/indexroot',
        component: IndexRoot,
        meta:{
            islogin:true
        },
        children: [
            /**
             * 首页
             */
            {
                path: 'home',
                component: Home,
                meta: {
                    title: '首页',
                    routerId: 'home',
                    islogin:true
                }
            },
            /**
          * 员工管理
          */
            {
                path: 'management',
                component: Management,
                meta: {
                    title: '员工管理',
                    routerId: 'management',
                    islogin:true
                }
            }
            , /**
           * 员工考勤
           */
            {
                path: 'checkWork',
                component: CheckWork,
                meta: {
                    title: '员工考勤',
                    routerId: 'checkWork',
                    islogin:true
                }
            },
            /**
            * 工作计划
            */
            {
                path: 'plan',
                component: Plan,
                meta: {
                    title: '工作计划',
                    routerId: 'plan',
                    islogin:true
                }
            }
            ,
            /**
           * 客户管理
           */
            {
                path: 'customer',
                component: Customer,
                meta: {
                    title: '客户管理',
                    routerId: 'customer',
                    islogin:true
                }
            },
            /**
           * 亚太学院
           */
            {
                path: 'college',
                component: College,
                meta: {
                    title: '亚太学院',
                    routerId: 'college',
                    islogin:true
                }
            },

            /**
           * 级别考核
           */
            {
                path: 'level',
                component: Level,
                meta: {
                    title: '级别考核',
                    routerId: 'level',
                    islogin:true
                }
            }
            ,
            /**
            * 管理助手
            */
            {
                path: 'assistant',
                component: Assistant,
                meta: {
                    title: '管理助手',
                    routerId: 'assistant',
                    islogin:true
                }
            }
            ,
            /**
           * 积分管理
           */
            {
                path: 'Integral',
                component: Integral,
                meta: {
                    title: '积分管理',
                    routerId: 'Integral',
                    islogin:true
                }
            },
            /**
             * 新增
             */
            {
                path: 'addtab',
                component: Addtab,
                meta: {
                    title: '新增',
                    islogin:true
                }
            }

        ]
    },
    /**
     * 登陆
     */
    {
        path: '/login',
        component: Login,
        children: [
        ]
    },
    {
        path: '/',
        to: '/indexroot/home'
    }
]
function Filter(routes) {
    let arr = [];
    one(routes)
    function one(routes) {
        routes.forEach(item => fn(item))
        function fn(data) {
            if (data.meta) {
                arr.push(data)
            }
            if (data.children) {
                one(data.children);
            }

        }
    }
    return arr;
}

export const getNavList = (data) => {
    return Filter(routes).filter(item=>{//Filter(routes)将路由表过滤处理过的数组
        return data.find(cur=>cur.routerId===item.meta.routerId&&cur.routeIsVisible)
    }).map(item=>{
        return {
            path:item.path,
            title:item.meta.title
        }
    })
}
export default routes;