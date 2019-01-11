<template>
    <view>Tell</view>
    <view>
            这是你在tell的住址，用于收取书信。未来会提供更多相关功能，敬请期待！
    </view>
    <button @click="ensure">好的</button>

</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
      ensure(){
          this.$router.push('/pages/myInfo/index')
      }  
    },
}
</script>
