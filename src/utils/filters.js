const filters = {
    toUpperCasefunction(value) {
        return value + '123'
    },
    dateFormatter(value) {
        return value
    },
    checkEmpty(comments) {

    },
    checkIllegal(commnet) {

    },
    checkComment(comments) {
        console.log(comments);
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