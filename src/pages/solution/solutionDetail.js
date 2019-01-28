import App from './solutionDetail'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
      navigationBarBackgroundColor: '#81CBE2',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: '成为解答者',
      backgroundColor: '#81CBE2'  
    }
  };