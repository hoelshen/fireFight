<template>
    <view>  
        <div>
             <span>咨询箱</span>
        </div>
        <div>
            <span>烦恼咨询服务每次需使用1张解忧券
                若3日未收到解答则退还解忧券
            </span>
            <span @click="onDetail">详细说明</span>
        </div>
        <div>
            当前持有{{tickets}}张解忧券
            <button @click="returnWelfare">获取更多</button>
        </div>
        <div>
            <button @click="onMyStory">讲述我的故事</button>
        </div>
    </view>
</template>
<script>
export default {
    data(){
        return{
            tickets: 0
        }
    },
    methods: {
        onMyStory(){
            this.$router.push({path:'/pages/myStory/index'}) 
        },
        onDetail(){
            this.$router.push({query: {active:'description'}, path: '/pages/detail/index'})
        },
        returnWelfare(){
            this.$router.push({path:'/pages/welfare/index'})
        }
    },
    onShow(){
        const { user } = getApp().globalData;
        this.tickets = user.ticketCount
          
    }
}
</script>
