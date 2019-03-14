import App from './badgeExplain'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarBackgroundColor: '#ffffff',
        navigationBarTextStyle: 'black',
        navigationBarTitleText: '每日解答上线说明',
        backgroundColor: '#ffffff'
    }
}