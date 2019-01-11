import App from './solutionRoom'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
      navigationBarBackgroundColor: '#81CBE2',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: '解忧室',
      backgroundColor: '#81CBE2'  
    }
  };