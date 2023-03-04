import {createApp} from 'vue'
import App from "./App.vue";
import utils,{handlerFun} from '/utils/index'
import './static/index.css'
utils.sayHi()
handlerFun()
createApp(App).mount('#app')
