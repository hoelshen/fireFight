<template>
<view class="app">
        <div class="photo-circle circle">
            <div class="circle" @click="takePhoto">
                <image v-if="imgUrl!=null" mode="aspectFit" class="userinfo-avatar" src="imgUrl" background-size="cover"/>
                <image v-else class="userinfo-avatar" mode="aspectFit" :src="userInfo.avatarUrl" alt="选择头像" background-size="cover"/>
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
            wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success:function(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
                console.log('tempFilePaths', tempFilePaths[0])
                this.$request.uploadFile(tempFilePaths[0]).then((res)=>{
                    console.log(res)
                });
              }.bind(this)
            }) 
        },
        save(){
            this.$router.push({query: '',path:'/pages/myInfo/index'})
        }      
    },

}
</script>
<style lang="less" scoped>

</style>


