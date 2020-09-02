import Vue from 'vue'
import Notice from '@/components/Notice.vue';
// 传递一个组件的配置，返回一个组件实例，并挂载到body
function create(Component, props) {
    // 1、组件实例创建
    // 杨哥喊你来搬砖
    const Ctor = Vue.extend(Component); //获取组件的构造函数
    // 通过 new方式 得到实例
    const vm = new Ctor({
        // propsDate遍历值给组件
        propsData: props
    }).$mount(); //挂载

    //2、 借鸡生蛋
    // const vm = new Vue({
    //     render: h => h(Component, {
    //         props
    //     })
    // }).$mount(); //挂载：将虚拟dom 转换实例dom

    // 追加dom
    document.body.appendChild(vm.$el);

    // 获取组件实例
    const comp = vm

    comp.remove = () => {
        // 移除dom
        document.body.removeChild(vm.$el);
        //销毁--释放资源
        vm.$destroy()
    }
    return comp

}

// export default create
// 进一步封装--插件--方便使用---封装后页面无需引入vue页面，全局注册直接调用
// 导出
export default {
    install(Vue) {
        Vue.prototype.$notice = function (options) {
            return create(Notice, options)
        }
    }
}