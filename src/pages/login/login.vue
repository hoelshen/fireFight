<template>
    <view>
        <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">
        微信授权登录
        </button>
    </view>
</template>
<script>
export default {
    data(){
        return{
            wxUser:{}
        }
    },
    methods:{
        login(e){

        },
        onGotUserInfo(e) {
            let {iv,userInfo, encryptedData} = e.detail;
            if (!userInfo){
                return false;
            }
            wx.showLoading({
                title: "授权中",
                mask: true
            });
            this.$request.post("/auth", {
                iv,
                userInfo,
                encryptedData
                }).then(
                function(authRes) {
                    wx.hideLoading();
                }.bind(this)
                ).catch(err=>{
                    wx.hideLoading();
                });
            },
    }
}
</script>
