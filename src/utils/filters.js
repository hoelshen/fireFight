import dayjs from 'dayjs' // load on demand
import 'dayjs/locale/zh-cn' // 按需加载

dayjs.locale('zh-cn')

exports.dayFormat = (value) => {
    const day = dayjs(value).format("YYYY/MM/DD");
    return day
}

exports.momentFormat = (value) => {
    const moment = dayjs(value).add(6,'hours');
    return moment.format('HH:mm');
}
exports.checkComment = (value) => {
    if (value.length < 35) {
        wx.showToast({
            title: '',
            duration: 1500,
            mask: false,
            success: (result) => {
                console.log(result)
            },
            fail: () => {},
            complete: () => {}
        });
    }
}