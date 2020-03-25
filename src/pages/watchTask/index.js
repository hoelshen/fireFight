import App from './watchTask'
import Vue from 'vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
      navigationBarBackgroundColor: '#1D7FFD',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: '设备巡更',
      backgroundColor: '#2E60FE'  
    }
};