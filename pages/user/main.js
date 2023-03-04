import {createApp} from 'vue'
import App from "./App.vue";
import Router from "./router";
import utils ,{handlerFun}from '/utils/index'

import './static/index.css'
utils.sayHi()
// handlerFun()
createApp(App).use(Router).mount('#app')
