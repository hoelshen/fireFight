import App from './examine'
import Vue from 'vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
      navigationBarBackgroundColor: '#1B90FC',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: '消防检测',
      backgroundColor: '#1B90FC'  
    }
};