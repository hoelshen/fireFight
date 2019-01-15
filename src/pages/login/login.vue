<template>
    <view>
        <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">
        微信授权
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
                    this.$router.push({path:'/pages/auth/index'})
                }.bind(this)
                ).catch(err=>{
                    wx.hideLoading();
                });
        },
        checkUserInfoPermission(callback = () =>{}){
            wx.getSetting({
                success: (result)=>{
                    if(!result.authSetting['scope.userInfo']){
                        wx.openSetting({
                            success(authSetting){
                                console.log(authSetting)
                            }
                        })
                    }
                },
                fail: ()=>{},
                complete: ()=>{}
            });
        }
    }
}
</script>
