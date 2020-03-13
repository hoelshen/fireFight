<template>
  <div class="alarm-person">
    <div class="alarm-container">
      <div class="title">
        一键拨打
      </div>
      <div class="phone-list flex j-between a-center pdd-lr-20">
        <div
          v-for="(item, index) in phoneList"
          :key="index"
          class="phone-item flex_1 tex-center tex-overflow"
          @click="call(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
          userId: '',
          phoneList:[{name:'110',phoneNumber: '110'}, {name:'119',phoneNumber: '119'}, {name:'120',phoneNumber: '120'}]
      }
  },
  onLoad(opt) {
    this.userId = wx.getStorageSync('userId')
    this.getPhoneList()
  },
  onShow() {
  },

  methods: {
      async getPhoneList() {
          try {
            let res = await this.$request.post('/user/getemergencyContact.do', { userId: this.userId })
            this.phoneList.push(res[0])
        } catch (error) {
        }
      },
      
    call(item) {
        wx.makePhoneCall({
            phoneNumber: item.phoneNumber 
        })
    }
  }
  }
</script>
<style lang="less" scoped>
.alarm-person {
  height: 100vh;
  background: #1D7FFD;
  padding: 20rpx 25rpx 0;
  color: #fff;
  .alarm-container{
        width: 702rpx;
        height: 280rpx;
        color: #1D7FFD;
        background: #fff;
        box-shadow:0px 9px 32px 0px rgba(51,83,253,0.1);
        border-radius:20rpx;
        .title{
            background: #E8F1FF;
            height: 80rpx;
            width: 662rpx;
            padding: 0 20rpx;
            line-height: 80rpx;
            border-radius:10px 10px 0px 0px;
        }
      .phone-list{
        width: 662rpx;
        height: 200rpx;
        border-radius:10px 10px 0px 0px;
        .phone-item{
            color: #FE4043;
            font-weight: bold;
            font-size: 40rpx;
        }
      }
  }
}
</style>