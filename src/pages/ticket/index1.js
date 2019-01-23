import App from './ticketDetail'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#81CBE2',
        navigationBarTextStyle: 'white',
        navigationBarTitleText: '票券明细',
        backgroundColor: '#81CBE2'
    }
};