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

        <div v-if="active === 'solver'">
            <text>每个人的心声，都不该被无视。解答烦恼也是让自己保持思考，保持善良</text>
            <div>当人们仰望星空</div>
            <div>你的解答可能会被自己的笔友</div>
        </div>


        <div v-if="active === 'solverDetail'">
            <div>需要先成为解答者，才能查阅这里的信件</div>
            <div>你可以阅读手册来了解相关约定</div>
            <button @click="onDetail">解答者手册</button>
            <button @click="onSoluter">申请成为解答者</button>
            <button @click="onEnsure">已阅读并同意遵守《解答者手册》的约定</button>
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
        },
        onDetail(){
            this.$router.push({query:{active: 'solver'},path:'/pages/detail/index'})
        },
        onSoluter(){
            const { user } = getApp().globalData;
            if(!user.authAt){
                return this.$router.push({path:'/pages/auth/index'})
            }
            return this.$router.push({query:{active: 'beSlover'},path:'pages/solutionRoom/index'})  
        },
        onEnsure(){

        }
    },
}
</script>
