<template>
    <view class="app">
            <div class="photo-circle circle">
                <div class="circle" @click="takePhoto">
                    <image class="userinfo-avatar"  :src="userInfo.avatarUrl" alt="选择头像" background-size="cover"/>
                </div>
            </div>
            <div class="block">
                <input type="text" placeholder="设置笔名">
            </div>

            <span>你可以随时点击头像和笔名来修改它们</span>

            <div>
                <button @click="save">保存</button>
            </div>
    </view>
</template>
<script>
export default {
    data(){
        return {
            imageUrl:'https://user-images.githubusercontent.com/20720117/48262986-80e02780-e45f-11e8-8426-2872916adad9.png',
            userInfo:{
                avatarUrl:""
            }
        }
    },
    methods: {
        takePhoto() {
            var that = this;
            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success(res) {
                    // tempFilePath可以作为img标签的src属性显示图片
                    const tempFilePaths = res.tempFilePaths
                    console.log('this', this)
                    that.$request.uploadFile(tempFilePaths[0]).then(res => {
                        const data = JSON.parse(res.data);
                        that.userInfo.avatarUrl = data.data;
                        console.log(data.data);
                    })
                },
                fail(e){
                    console.log(e)
                }
            })
        },
        save(){
            this.$router.push({query: '',path:'/pages/myInfo/index'})
        }      
    },

}
</script>
<style lang="less" scoped>
.app{
  padding-top: 20px;
}
</style>


