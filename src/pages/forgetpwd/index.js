import Vue from 'vue'
import App from './forgetpwd'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#1D7FFD',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '重置密码',
    backgroundColor: '#fbfbfd'  
  }
};
