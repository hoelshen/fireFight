import dayjs from 'dayjs' // load on demand
import 'dayjs/locale/zh-cn' // 按需加载

dayjs.locale('zh-cn')

const filters = {
    toUpperCasefunction(value) {
        return value + '123'
    },
    dayFormat(value) {
        return this.$day(value).format("YYYY/MM/DD");
    },
    checkEmpty(comments) {

    },
    checkIllegal(commnet) {

    },
    checkComment(comments) {
        if (this.checkEmpty(commnet)) {

        }
        if (this.checkIllegal(commnet)) {

        }
        if (comments.length < 35) {
            console.log('评论次数都不够。')
        }
    },
}

export default filters