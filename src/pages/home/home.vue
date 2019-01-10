<template>
    <view>
        <swiper indicator-dots="true"  autoplay="true" interval="5000"
        duration="1000">
            <block v-for="item in imgUrls" :key="item">
                <swiper-item>
                    <image :src="item" class="slide-image" width="355" height="150" />
                </swiper-item>
            </block>
        </swiper>
    </view>
</template>
<script>
export default {
    data(){
        return {
            imgUrls: [
            'https://tellers.oss-cn-shenzhen.aliyuncs.com/banners/1543829994971.jpeg',
            'https://tellers.oss-cn-shenzhen.aliyuncs.com/banners/1543830067865.png',
            'https://tellers.oss-cn-shenzhen.aliyuncs.com/banners/1543830100237.png'
            ],
        }
    }
}
</script>
<style lang="less" scoped>
    .swiper{
        color:indianred
    }
</style>

