import Vue from 'vue'
import App from './faq'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#fbfbfd',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '常见问题和反馈',
    backgroundColor: '#fbfbfd'  
  }
};
