import Vue from 'vue'
import App from './App'

import utils from './utils/utils.js'
Vue.prototype.$utils = utils

import http from './http_api/api.js'
Vue.prototype.$http = http

//创建全局的音频管理  
Vue.prototype.innerAudioContext = uni.createInnerAudioContext()  
//如有新建，设置全局的音频  
Vue.prototype.setAudio = function(audio){  
    Vue.prototype.innerAudioContext = audio  
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
