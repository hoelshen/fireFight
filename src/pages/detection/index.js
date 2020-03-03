import App from './detection'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#1D7FFD',
        navigationBarTextStyle: 'white',
        navigationBarTitleText: '数据检测',
        backgroundColor: '#1D7FFD',
        disableScroll: true,
      }
}