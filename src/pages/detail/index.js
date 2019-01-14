import App from './dynamic'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()
export default {
  config: {
    navigationBarBackgroundColor: '#81CBE2',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '烦恼咨询服务说明',
    backgroundColor: '#81CBE2'
  }
}
