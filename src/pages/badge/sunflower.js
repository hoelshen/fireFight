import App from './sunflower'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#ffffff',
        navigationBarTextStyle: 'black',
        navigationBarTitleText: '向日葵',
        backgroundColor: '#ffffff'
    }
}