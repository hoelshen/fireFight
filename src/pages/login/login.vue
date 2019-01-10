<template>
    <view>
         <button @click="login">微信授权登录</button>  
    </view>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
        login(e){
            let userInfo = e.mp.detail.userInfo;
            if (!userInfo){
                return false;
            }
            wx.showLoading({
                title: "授权中",
                mask: true
            });
            this.$request.post("/auth", userInfo).then(
                function(authRes) {
                wx.hideLoading();
                this.close();
                }.bind(this)
            );
        }
    }
}
</script>
