import App from './information'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#1D7FFD',
        navigationBarTextStyle: 'white',
        navigationBarTitleText: '确定信息',
        backgroundColor: '#1D7FFD',
        disableScroll: true,
      }
}