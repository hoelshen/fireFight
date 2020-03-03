import App from './equipmentList'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#1D7FFD',
        navigationBarTextStyle: 'white',
        navigationBarTitleText: '智能烟感',
        backgroundColor: '#1D7FFD',
        disableScroll: true,
      }
}