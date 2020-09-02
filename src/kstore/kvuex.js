// 1、实现一个Vuex插件
// 2、实现一个Store类
// 2.1 响应式得数据 state 
// 2.2  commit() 实现
// 2.3 dispatch()实现
// 3、挂载到Vue.prototype

// 暗号：天王盖地虎

let Vue
class Store {
    constructor(options) {

        // 保存mutations
        this._mutations = options.mutations
        // 保存actions
        this._actions = options.actions

        // 响应式得数据state
        // this.state = new Vue({
        //     data: options.state
        // })
        this._vm = new Vue({
            data: {
                //将来state里的所有key 不被代理
                $$state: options.state
            }
        })

        // 绑定this
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)



        // getters
        // 天王盖地虎
        let getters = options.getters||{};

        this.getters = {}
        // 遍历getters配置
        Object.keys(getters).forEach((key) => {
            // console.log(key)
            // 将key 放到this.getters 中
            Object.defineProperty(this.getters, key, {
                // 当获取key会自动调用get方法              
                get: () => {
                    return getters[key](this.state)
                }
            })
        })

    }
    get state() {
        //内部藏起来的，暴露出来（state）
        return this._vm._data.$$state
    }
    set state(v) {
        console.log('please use replaceState to reset state')
    }
    // 实现commit
    // store.commit(type,payload)
    commit(type, payload) {
        const entry = this._mutations[type]
        if (!entry) {
            console.error("unknow mutation type")
            return
        }

        // 指定一下上下文
        entry(this.state, payload)
    }

    dispatch(type, payload) {
        const entry = this._actions[type]
        if (!entry) {
            console.error("unknow actions type")
            return
        }

        // 指定一下上下文,即Store 实例
        return entry(this, payload)
    }

    // getters(getters) {
    //     this.getters = {}
    //     // 遍历getters配置
    //     Object.keys(getters).forEach((key) => {
    //         console.log(key)
    //         // 将key 放到this.getters 中
    //         Object.defineProperty(this.getters, key, {
    //             // 当获取key会自动调用get方法              
    //             get: () => {
    //                 return getters[key](this.state)
    //             },
    //             enumerable: true
    //         })
    //     })
    // }
}

function install(_Vue) {
    Vue = _Vue

    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}


// 默认导出就是Vuex
export default {
    Store,
    install
}