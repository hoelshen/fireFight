<template>
    <view>
       <div>致咨询者</div> 
       <div>向Tell烦恼研究中心发起咨询服务，需要消耗解忧券</div>

       <div @click="returnBack">好的</div>
    </view>

</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        returnBack(){
            this.$router.go(-1);
        }
    },
}
</script>
