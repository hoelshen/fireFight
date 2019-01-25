import App from './mailDay'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#81CBE2',
        navigationBarTextStyle: 'white',
        navigationBarTitleText: '正在路上的信',
        backgroundColor: '#81CBE2'
    }
};