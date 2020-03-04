import App from './monitorpage'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#1D7FFD',
        navigationBarTextStyle: 'white',
        navigationBarTitleText: '查看监控',
        backgroundColor: '#1D7FFD',
        disableScroll: true,
      }
}