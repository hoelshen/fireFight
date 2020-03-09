import App from './examine'
import Vue from 'vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
      navigationBarBackgroundColor: '#2E60FE',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: '消防检测',
      backgroundColor: '#2E60FE'  
    }
};