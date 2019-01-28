import dayjs from 'dayjs' // load on demand
import 'dayjs/locale/zh-cn' // 按需加载

dayjs.locale('zh-cn')

dayjs.prototype.timeQual = function () {
    const val = dayjs().hour() + '';
    let value
    if ('7' < val && val <= '11') {
        return value = "早上好"
    }
    if ('11' < val && val <= '13') {
        return value = "中午好"
    }
    if ('13' < val && val <= '17') {
        return value = "下午好"
    }

    if (('17' < val && val <= '19')) {
        return value = "傍晚好"
    }
    if ('19' < val && val <= '23') {
        return value = "晚上好"
    }
    if ('1' < val && val <= '5') {
        return value = "深夜好"
    }
}


export default dayjs