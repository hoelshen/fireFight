import App from './questionsFeedback'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
      navigationBarBackgroundColor: '#81CBE2',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: '问题与反馈',
      backgroundColor: '#81CBE2'  
    }
  };