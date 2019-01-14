<template>
    <view>
        徽章
        <view v-for="item in imgUrls" :key="item">
            <view>{{item}}</view>
        </view>
    </view>


</template>

<script>
export default {
    data(){
        return{

        }
    }
}
</script>
