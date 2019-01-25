import App from './mail'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#fff',
        navigationBarTextStyle: 'black',
        navigationBarTitleText: 'MYS',
        backgroundColor:"#fff"
    }
}