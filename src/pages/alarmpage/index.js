import App from './alarmpage'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#fff',
        navigationBarTextStyle: 'black',
        navigationBarTitleText: '智能烟感',
        backgroundColor: 'white',
        disableScroll: true,
      }
}