<template>
  <div class="noFound flex column">
    <span class="flex center">请添加真实有效的车牌号码</span>
    <div class="flex car_block">
      <input
        class="input"
        maxlength="1"
        type="number"
        :focus="focusInput"
        :value="name"
        @input="bindCarNumber"
      >
      <input
        class="input"
        maxlength="1"
        type="number"
        :focus="focusInput"
        :value="letter"
        @input="bindCarNumber"
      >
      <input
        class="input"
        maxlength="1"
        :focus="focusInput"
        :value="oneNumber"
        @input="bindCarNumber"
      >
      <input
        class="input"
        maxlength="1"
        type="number"
        :focus="focusInput"
        :value="twoNumber"
        @input="bindCarNumber"
      >
      <input
        class="input"
        maxlength="1"
        type="number"
        :focus="focusInput"
        :value="threeNumber"
        @input="bindCarNumber"
      >
      <input
        class="input"
        maxlength="1"
        type="number"
        :focus="focusInput"
        :value="fourNumber"
        @input="bindCarNumber"
      >
      <input
        class="input"
        maxlength="1"
        type="number"
        :focus="focusInput"
        :value="fiveNumber"
        @input="bindCarNumber"
      >
      <button class="newButton">
        +新能源
      </button>
    </div>
    <div
      class="flex center lightButton"
      @click="continu"
    >
      下一步
    </div>
  </div>
</template>

<script>
import shareMix from "@/mixins/mixin";
export default {
  mixins: [shareMix],
  data() {
    return {
      name: '浙',
      letter: 'B',
      oneNumber: '1', //车牌号码
      twoNumber: '2',
      threeNumber: '3',
      fourNumber: '4',
      fiveNumber: '5',
      focusInput: true
    };
  },
  methods:{
    bindCarNumber(){

    },
    continu(){
      this.$router.push({ path: "/pages/home/index" })
    }
  }
};
</script>

<style scoped lang="less">
.noFound {
  height: 100vh;
  background: #fff;
  color: #4d495b;
  line-height: 52rpx;
  .desc {
    margin-top: 100rpx;
    font-size: 60rpx;
    font-weight: bold;
  }
  img {
    margin-top: 40rpx;
    width: 400rpx;
    height: 400rpx;
  }
}
.newButton{
  box-sizing: border-box;
  border: 2rpx solid  rgba(189, 189, 192, 0.1);;
}
.input {
  width: 50rpx;

  height: 84rpx;
  padding-left: 20rpx;
  background-color: rgba(189, 189, 192, 0.1);
}
.wait {
  font-size: 32rpx;
}
.car_block{
  padding-left: 40rpx;
}
</style>
