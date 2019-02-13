import Vue from 'vue'
import App from './faq'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#fbfbfd',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '问题与反馈',
    backgroundColor: '#fbfbfd'  
  }
};
