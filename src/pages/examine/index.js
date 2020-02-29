import App from './examine'
import Vue from 'vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#1AAD19',
        navigationBarTextStyle: 'black',
        navigationBarTitleText: '消防检测',
        backgroundColor: '#FFFEFB',
        navigationStyle: 'custom'
    }
};