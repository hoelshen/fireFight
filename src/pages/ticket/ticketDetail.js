import App from './ticketDetail'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#fffefb',
        navigationBarTextStyle: 'black',
        navigationBarTitleText: '票券明细',
        backgroundColor: '#FFFEFB'
    }
};