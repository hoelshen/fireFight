<template>
    <view class="app">
        <div>
            <div class="title">选择你最愿意看到的话题</div>
            <div class="title">以后你也可以随时修改，并在次日生效</div>

            <div class=" tag box" hover-class="active" 
                        v-for="(item,index) in titles" :key="index" 
                        @click="select(index)"
            >{{item.name}}</div>
            <button class="title flex center" @click="add">提交申请</button>
        </div>
    </view>

</template>
<script>
export default {
    data(){
        return{
            titles: [],
            title: {},
            isFocus: true
        }
    },
    methods: {
        async tag(){
            await this.$request.get('/tag')
            .then((res)=>{
                this.titles = res.data;
            }).catch(err => {return console.log(err)})
        },
        select(index){
            this.title = this.titles[index];
            this.isFocus = false;
        },
        add(){
            this.$request.put('/tag',{_id:this.title._id}).then((res)=>{
                wx.showToast({
                    title: '申请成功',
                    icon: 'none',
                    duration: 1500,
                    mask: false,
                    success: (result)=>{
                        this.$router.push({path:"/pages/solutionRoom/index2"})
                    },
                    fail: ()=>{},
                    complete: ()=>{}
                });
            })
        }

    },
    onShow(){
        const { currentRoute: {query} } = this.$router
        this.active = query.active;
        this.tiltes = this.tag();
    }
}
</script>
<style lang="less" scoped>
.title{
    margin: 20px;
}
</style>
