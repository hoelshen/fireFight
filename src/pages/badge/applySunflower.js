import App from './applySunflower'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#fffefb',
        navigationBarTextStyle: 'black',
        navigationBarTitleText: '申请向日葵徽章',
        backgroundColor: '#FFFEFB'
    }
};