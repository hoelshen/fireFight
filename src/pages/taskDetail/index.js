import App from './taskDetail'
import Vue from 'vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
      navigationBarBackgroundColor: '#1D7FFD',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: '任务详情',
      backgroundColor: '#2E60FE'  
    }
};