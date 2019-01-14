import App from './welfare'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#81CBE2',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '福利社',
    backgroundColor: '#81CBE2'
  }
}
