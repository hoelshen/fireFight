<template>
    <div class="modal">
        <div class="card flex column center">
            <div class="title">
                {{title}}
            </div>
            <div class="content">
                {{content}}
            </div>
            <div class="btn">
                <button class="confir darkButton" @click="ensure">{{confir}}</button>
                <button class="cancel lightButton" @click="cancel">{{sure}}</button>
            </div>
        </div>
    </div>
</template>



<script>
export default {
    props:{
        isShowModal:{
            type: Boolean
        },
        title:{
            type: String
        },
        content:{
            type: String
        },
        confir:{
            type: String
        },
        sure:{
            type: String,
            default: "好的"
        }
    },
    methods:{
        ensure(){
            if(this.confir === "获取邮票") {
                this.$router.reLaunch({
                    query: { active: "mail" },
                    path: "/pages/welfare/index"
                });
            }
            if(this.confir === "获取解忧券") {
                this.$router.reLaunch({
                    query: { active: "solution" },
                    path: "/pages/welfare/index"
                });
            }
            if(this.confir === "前往解答室") {
                this.$router.reLaunch({
                    path: "/pages/solution/solutionDetail"
                });
            }
        },
        cancel(){
            this.isShowModal = false;
            this.$emit("change", this.isShowModal);
        }
    },
    created() {
        
    },
}
</script>
<style scoped>
.modal{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(189, 189, 192, .10);
  z-index: 99;
}
.card{
    width: 630rpx;
    height: 596rpx;
    background-color: #FFFFFF;
    border-radius: 4rpx;
    box-shadow: (0, 0, 0, .5)
}
.title{
    margin-top: 60rpx;
    font-size: 34rpx;
    font-weight: 600;
}
.content{
    margin:40rpx 60rpx 60rpx 60rpx;
}
.cancel{
    font-size: 28rpx;
    font-weight: 600;
    padding: 0 130rpx;
    margin-bottom: 60rpx;
    margin-top:40rpx;
    line-height:88rpx;
}
</style>
