<template>
    <view >
        <div v-if="active === 'description'">
            <div>致咨询者</div> 
            <div>向Tell烦恼研究中心发起咨询服务，需要消耗解忧券</div>
            <div @click="returnBack">好的</div>

        </div>
        <div v-if="active === 'consultative'">
            <div>我们会在每日22:30手机咨询箱中的信</div>
            <div>这封信将于18小时后送到解答室</div>
            <button @click="returnHome">好的</button>            
        </div>
    </view>
</template>

<script>
export default {
    data(){
        return{
            active:"description"
        }
    },
    onShow(opts){
        const { currentRoute: {query} } = this.$router
        this.active = query.active;
    },
    methods: {
        returnBack(){
            this.$router.go(-1);
        },
        returnHome(){
            this.$router.push("/pages/home/index");
        }
    },
}
</script>
