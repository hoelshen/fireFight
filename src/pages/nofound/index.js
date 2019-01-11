import App from './nofound'
import Vue from 'vue'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#81CBE2',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '邮差迷路了',
    backgroundColor: '#81CBE2'  
  }
};
