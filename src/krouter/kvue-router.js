// 路由器插件
// Vue.use(KvueRouter)
// 1、实现一个静态install 方法
let Vue
class KVueRouter {
    //接收一个选项
    constructor(options) {
        // 保存选项
        this.$options = options;

        // 响应式数据,响应式数据依赖于Vue
        // current保存当前url  （监控url变化）
        // defineReactive给一个obj定义一个响应式属性  #/about  slice从1开始截取，如果无-用   /
        const initial = window.location.hash.slice(1) || '/'
        Vue.util.defineReactive(this, "current", initial)


        // 监控url变化    (不绑定的话上下文变成了window)
        window.addEventListener('hashchange', this.onHashChange.bind(this))

    }

    onHashChange() {
        // console.log(window.location.hash)
        this.current = window.location.hash.slice(1)
    }

}


// 参数1:vue的构造函数,install方法-在use时调用
// 传进来直接用，不需要打包
KVueRouter.install = function (_Vue) {
    Vue = _Vue;

    //1、 挂载router实例，让子组件可以使用
    // 为了解决install先执行，还要在这里访问router实例
    // 做一个全局混入，在befoureCreate钩子里，去做这件事（延迟到创建实例再执行）
    Vue.mixin({
        beforeCreate() {
            // 此时，上下文已是组件实例了
            // 如果this是根实例，则它是$options里面会有路由实例
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router;
            }
        }

    })
    // 2、实现两个全局组件 router-view ,router-link
    // <router-link to="/about">
    // <a href="#/about"></a>
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            },
        },
        render(h) {
            // h
            // jsx写法,当前cli换件支持jsx,对环境有要求(不推荐)
            // return <a href={'#'+this.to}>{this.$slots.default}</a>
            // (通用)
            return h('a', {
                attrs: {
                    href: "#" + this.to
                }
                //输出到默认插槽
            }, [this.$slots.default])
        }
    })
    Vue.component('router-view', {
        render(h) {
            // 获取current对应的组件并渲染
            // console.log(this.$router.current)
            let component = null
            // 获取当前route
            const route = this.$router.$options.routes.find((route) => route.path === this.$router.current);
            // 如果存在
            if (route) {
                component = route.component
            }

            // const {
            //     routeMap,
            //     current
            // } = this.$router
            // const component = routeMap[current] ? routeMap[current].component : null;

            // h(Component)
            return h(component);
        }
    })

}


// 导出
export default KVueRouter