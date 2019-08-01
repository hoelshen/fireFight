import App from './addCar'
import Vue from 'vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#1AAD19',
        navigationBarTextStyle: 'black',
        navigationBarTitleText: '添加车辆',
        backgroundColor: '#FFFEFB',
        navigationStyle: 'custom'
    }
};