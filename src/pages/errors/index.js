import App from './errors'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#1D7FFD',
        navigationBarTextStyle: 'white',
        navigationBarTitleText: '问题反馈',
        backgroundColor: '#FFFEFB',
        disableScroll: false
    }
}