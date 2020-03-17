import App from './warnpage'
import Vue from 'vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
      navigationBarBackgroundColor: '#1D7FFD',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: '历史告警记录',
      backgroundColor: '#2E60FE'  
    }
};