import Vue from 'vue'
import App from './carManage'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#fbfbfd',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '车辆管理',
    backgroundColor: '#fbfbfd'  
  }
};
