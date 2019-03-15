import dayjs from 'dayjs' // load on demand
import 'dayjs/locale/zh-cn' // 按需加载

dayjs.locale('zh-cn')

dayjs.prototype.timeQual = function () {
    // TODO: Qual是什么意思？
    const val = dayjs().hour();
    let value
    if (7 < val && val <= 11) {
        value = "早上好"
    }
    if (11 < val && val <= 13) {
        value = "中午好"
    }
    if (13 < val && val <= 17) {
        value = "下午好"
    }
    if ((17 < val && val < 19)) {
        value = "傍晚好"
    }
    if (19 <= val && val <= 23) {
        value = "晚上好"
    }
    if (0 < val && val <= 5) {
        value = "深夜好"
    }
    return value;
}


export default dayjs