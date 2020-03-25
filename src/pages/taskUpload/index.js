import App from './taskUpload'
import Vue from 'vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
      navigationBarBackgroundColor: '#1D7FFD',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: '异常上报',
      backgroundColor: '#2E60FE'  
    }
};