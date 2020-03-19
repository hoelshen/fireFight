import App from './examine'
import Vue from 'vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
      navigationBarBackgroundColor: '#1D7FFD',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: 'You-Link万物智联',
      backgroundColor: '#2E60FE'  
    }
};