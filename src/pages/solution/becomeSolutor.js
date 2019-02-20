import App from './becomeSolutor'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#fffefb',
        navigationBarTextStyle: 'black',
        navigationBarTitleText: '申请成为解答者',
        backgroundColor: '#FFFEFB'
    }
};