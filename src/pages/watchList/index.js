import App from './watchList'
import Vue from 'vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
      navigationBarBackgroundColor: '#1D7FFD',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: '巡更任务',
      backgroundColor: '#2E60FE'  
    }
};