import Vue from 'vue'
import App from './bindPhone'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#fbfbfd',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '绑定手机',
    backgroundColor: '#fbfbfd'  
  }
};
