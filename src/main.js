// import {sum} from './js/count'  //同步加载
import './css/index.css'
import './less/index.less'
import './sass/index.scss'
import(/* webpackChunkName: "count" */ './js/count').then(count=>{
    // 异步加载需要在回调函数中使用引入的东西
    console.log(count)
    const total = count.sum([1, 2, 3, 4])

    console.log(total)
})



import Home from './vue/Home.vue'
import {createApp} from 'vue'
console.log(createApp,Home,123)
const app = createApp(Home).mount('#app')
console.log(app)
console.log(123123)
