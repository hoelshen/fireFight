import App from './myStory'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
      navigationBarBackgroundColor: '#81CBE2',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: '讲诉我的故事',
      backgroundColor: '#81CBE2'  
    }
};
