import App from './promptPage'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#fffefb',
        navigationBarTextStyle: 'black',
        navigationBarTitleText: '已解答',
        backgroundColor: '#FFFEFB'
    }
};