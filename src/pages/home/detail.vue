<template>
  <div class="head">
    <input
      class="input grow"
      maxlength="40"
      placeholder="输入设别ID或者你想查询的关键字"
      :focus="focusInput"
      :value="userId"
      @input="bindUserId"
    >
    <div
      v-if="showUserlist"
      class="UserList"
    >
      <option
        v-for="item in Userlist"
        :key="item.fID"
        class="option"
        :value="item.fID"
      >
        <div
          @click="clickProvince(item)"
        >
          {{ item.fEntityFacilityID }}
        </div> 
      </option>
    </div>
  </div>
</template>
<script>
import shareMix from "@/mixins/mixin";
import { promisify } from "@/utils/index";

export default {
  mixins: [shareMix],
  data() {
    return {
      log: '113.324520',
      lat: '23.099994',
      markers: []
    }
  },
  methods: {
    bindUserId(e){
      let param = e.detail.value;
      let params = getParams(this.params);
      params['userId'] = wx.getStorageSync('userId') || 2002131059424992;
      params['param'] = param;

      this.$request
      .post("/search/likeSearch.do",params)
      .then(res => {
       const data = res.list;
        this.Userlist = data;
        console.log('this.Userlist: ', this.Userlist);
        if(data.length !=0){
          this.showUserlist = true;
        }
      })
      .catch(err => {
        return wx.showToast({
          title: "获取失败",
          icon: "none"
        });
      });
    },
    clickProvince({fID, fType}){
      let params = getParams(this.params)
      params['facilityinfoId'] = fID
      params['type'] = fType

    this.$request
      .post("/facilityInfo/queryFacilityInfo.do",params)
      .then(res => {
       const data = res
       console.log('data: ', data);
        wx.navigateTo({
          url: `/pages/dataDetail/index?fType=${fType}&facilityinfoId=${fID}&isOnline=${data[0].isOnline}`
        });
      })
      .catch(err => {
        return wx.showToast({
          title: "获取失败",
          icon: "none"
        });
      });
    },
  },
  onShow(){
    this.position();
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.appDiv {
  margin: 40rpx 40rpx;
  min-height: 90vh;
  background-color: #ffffff;
  padding: 20rpx 0;
}
  .head{
    input{
      margin:44rpx;
      background-color:#ffffff;
      width: 662rpx;
      height: 80rpx;
      border-radius: 50rpx;
      text-align: center;
      line-height: 110rpx;
    }
  }
  .UserList{
    background-color: #ffffff;
    margin: -45rpx 80rpx 0;
    text-align: center;
  }
</style>
