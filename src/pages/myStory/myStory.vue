<template>
    <view class="app">
        <div >
            <div class="">
                <textarea class="textArea" :value="content"  @blur="bindTextAreaBlur" auto-height placeholder="1.请尽量具体叙述你的故事，便于解答者理解和代入，从而给出具体的解答。                                          2.关键的人物、地点等信息建议使用化名。3.落款署名尽量不要使用笔名或微信昵称。" />
            </div>

            <div class="flex j-between">
                <div class="flex j-start">
                    <span>{{day}}</span>
                    <span>{{weather}}</span>
                </div>
                <div class="flex j-end">
                    <span>署名:</span>
                    <input class="aliasNameInput" type="this"  @input="bindKeyInput" :value="aliasName">
                    <button @click="refresh">刷新</button>
                </div>
            </div>

            <div class="flex column">
                <button form-type="submit">提交咨询</button>
                <span>需要使用1张解忧券</span>
            </div>

        </div>

    </view>


</template>
<script>
export default {
    data(){
        const day = this.$day().format('YYYY/MM/DD') ///.format('YYYY-MM-DD') // 展示
        return{
            content: "",
            weather: "",
            day: day,
            aliasName: ""
        }
    },
    methods: {
        onPush(){
            console.log('this.content', this.content)
            this.$request.post("/mail/story",{
                content: this.content,
                weather: this.weather,
                aliasName: this.aliasName
                }).then((res)=>{
                    console.log('res', res)
                }).catch(()=>{
                    
                })
            // this.$router.push('/pages/')
        },
        bindTextAreaBlur(e){
            this.content = e.detail.value
        },
        bindKeyInput(e){
            this.aliasName = e.detail.value
        },
        refresh(e){
            console.log('e', e)
        }     
    },
    onShow(){
        this.$request.get("/weather").then((res)=>{
            this.weather = res.data
        }).catch((err)=>{
            console.log('err', err)
        })
    }
}
</script>
<style lang="less">
    .textArea{
        min-height: 200px;
    }
    .aliasNameInput{
        border:1px solid;
    }
</style>
