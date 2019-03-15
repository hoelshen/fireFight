import dayjs from 'dayjs' // load on demand
import 'dayjs/locale/zh-cn' // 按需加载

dayjs.locale('zh-cn')

exports.dateFormat = (value) => {
    return dayjs(value).format("YYYY/MM/DD");
}

exports.timeIntervalFormat = (value) => {
    let arrivedTime = dayjs(value).add(6,'hours');
    if (arrivedTime.minute() != 0){
        arrivedTime = dayjs(arrivedTime).add(1,'hours').set('minute', 0);;
    }
    return arrivedTime.format('HH:mm');

}