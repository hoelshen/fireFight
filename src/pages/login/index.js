import Vue from 'vue'
import App from './login'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#fbfbfd',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '登陆',
    backgroundColor: '#fbfbfd'  
  }
};
