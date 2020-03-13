import App from './alarmperson'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#1D7FFD',
        navigationBarTextStyle: 'white',
        navigationBarTitleText: '一键报警',
        backgroundColor: '#1D7FFD',
        disableScroll: true,
      }
}