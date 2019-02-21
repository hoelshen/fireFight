<template>
    <div class="flex column">
        <img class="bg" src="/static/jpg/becomeSolutor.png" alt="">
        <button class="flex center lightButton" @click="opneSolution">前往解答室</button>
    </div>
</template>


<script>
export default {
    methods:{
        opneSolution(){
            this.$router.reLaunch({ path: "/pages/home/index",query:{toPage:'/pages/solution/solutionRoom'} });
        }
    }
}
</script>

<style lang="less" scoped>
.bg{
    margin:40rpx 60rpx 60rpx;
    width:630rpx;
    height:522rpx;
}
.lightButton{
    padding:26rpx 88rpx;
    height:92rpx;

}
</style>