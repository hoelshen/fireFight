import App from './App'
import Vue from 'vue'
import VHtmlPlugin from '@megalo/vhtml-plugin'
import filters from './utils/filters'
import megaloRouter  from 'megalo-router'


Vue.use(VHtmlPlugin)

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))



Vue.use(megaloRouter, {
  mode: 'strict', // strict or loose 可配置项，不配置的话默认为strict
  tabBars: [ // 必须配置项
      '/pages/home/index',
      '/pages/my/index',
      'pages/mailBox/index'
  ]
})

const app = new Vue(
  App)
app.$mount()

export default {
  config: {
    // pages 的首个页面会被编译成首页
    pages: [
      'pages/home/index',
      'pages/consultionBox/index',
      'pages/badge/index',
      'pages/mailBox/index',
      'pages/solutionRoom/index',
      'pages/ticket/index',
      'pages/welfare/index',
      'pages/memory/index',
      'pages/my/index',
      'pages/my/index',
      'pages/my/index',
    ],
    tabBar: {
      color: '#333',
      selectedColor: '#007d37',
      list: [
        {
          pagePath: 'pages/mailBox/index',
          text: 'mail',
          iconPath: 'static/imgs/mine.png',
          selectedIconPath: 'static/imgs/mine_on.png',
        },
        {
        pagePath: 'pages/home/index',
        text: 'home',
        iconPath: 'static/imgs/home.png',
        selectedIconPath: 'static/imgs/home_on.png',
        },
        {
        pagePath: 'pages/my/index',
        text: 'my',
        iconPath: 'static/imgs/mine.png',
        selectedIconPath: 'static/imgs/mine_on.png',
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'tell2.0_megalo',
      navigationBarTextStyle: 'black'
    }
  }
}