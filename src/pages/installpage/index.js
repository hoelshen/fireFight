import App from './installpage'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#1D7FFD',
        navigationBarTextStyle: 'white',
        navigationBarTitleText: '安装维保',
        backgroundColor: '#1D7FFD',
        disableScroll: true,
      }
}