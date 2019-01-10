<template>
    <swiper
    indicator-dots="{{indicatorDots}}"
    autoplay="{{autoplay}}"
    interval="{{interval}}"
    duration="{{duration}}"
    >
    <block wx:for="{{imgUrls}}">
        <swiper-item>
        <image src="{{item}}" class="slide-image" width="355" height="150" />
        </swiper-item>
    </block>
    </swiper>



</template>

<script>
export default {
    data(){
        return{
            imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
            ],
            indicatorDots: false,
            autoplay: false,
            interval: 5000,
            duration: 1000
        }
    }
}
</script>
