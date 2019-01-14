<template>
    <view>
        <swiper indicator-dots="true"  autoplay="true" interval="5000"
        duration="1000">
            <block v-for="item in imgUrls" :key="item.id">
                <swiper-item>
                    <image :src="item" @clcik="imgDetail" class="slide-image" width="355" height="150" />
                </swiper-item>
            </block>
        </swiper>
    </view>
</template>
<script>
export default {
    data(){
        return {
            imgUrls: [],
        }
    },
    async created() {
        let banner = await this.$request.banner();
        console.log('1111',banner)
        if(banner){
            let arr = banner.data;
            for(let index of arr){
                this.imgUrls.push(index.imgUrl)
            }
        }
    },
    methods: {
        imgDetail(){
            console.log('ok')
        }
    },
    onload(){
        console.log('page', + new Date() - app.getNavigateTime())
            
    }
}
</script>
<style lang="less" scoped>
    .swiper{
        color:indianred
    }
</style>

