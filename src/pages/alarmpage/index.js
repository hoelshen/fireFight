import App from './alarmpage'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#fff',
        navigationBarTextStyle: 'white',
        navigationBarTitleText: '告警异常',
        backgroundColor: 'white',
        disableScroll: true,
      }
}