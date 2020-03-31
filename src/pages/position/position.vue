<template>
  <div class="appDiv flex column">
    <Adress-info />

    <p class="choiceDiv">
      或者选择具体位置
    </p>
    <div class="selectDiv">
      <div class="select-box">
        <div
          class="select-current"
          @tap="closePro"
        >
          <div class="current-name">
            {{ current.provinceName }}
          </div>
        </div>
        <div
          v-if="isShowPro"
          class="option-list"
        >
          <option
            v-for="(item,index) in provinces"
            :key="item.fProvince"
            class="option"
            :value="item.fProvince"
          >
            <div
              :value="index"
              @click="clickProvince(item.fProvince)"
            >
              {{ item.fProvince }}
            </div> 
          </option>
        </div>
      </div>
      <div class="select-box">
        <div
          class="select-current"
          @tap="closeCity"
        >
          <div class="current-name">
            {{ current.cityName }}
          </div>
        </div>
        <div
          v-if="isShowCity"
          class="option-list"
        >
          <option
            v-for="(item,index) in citys"
            :key="item.fCity"
            class="option"
            :value="item.fCity"
          >
            <div
              :value="index"
              @click="clickCity(item.fCity)"
            >
              {{ item.fCity }}
            </div> 
          </option>
        </div>
      </div>
      <div class="select-box">
        <div
          class="select-current"
          @tap="closePre"
        >
          <div class="current-name">
            {{ current.prefectureName }}
          </div>
        </div>
        <div
          v-if="isShowPre"
          class="option-list"
        >
          <option
            v-for="(item,index) in prefectures"
            :key="item.fPrefecture"
            class="option"
            :value="item.fPrefecture"
          >
            <div
              :value="index"
              @click="clickPrefectures(item.fPrefecture)"
            >
              {{ item.fPrefecture }}
            </div> 
          </option>
        </div>
      </div>
      <div class="select-box">
        <div
          class="select-current"
          @tap="closeArea"
        >
          <div class="current-name">
            {{ current.areaName }}
          </div>
        </div>
        <div
          v-if="isShowArea"
          class="option-list"
        >
          <option
            v-for="(item,index) in areas"
            :key="item.fAreaName"
            class="option"
            :value="item.fAreaName"
          >
            <div
              :value="index"
              @click="clickAreas(item)"
            >
              {{ item.fAreaName }}
            </div> 
          </option>
        </div>
      </div>
    </div>
    <div class="selectDiv">
      <div class="select-boxx">
        <div
          class="select-current"
          @tap="closePla"
        >
          <div class="current-name">
            {{ current.placeName }}
          </div>
        </div>
        <div
          v-if="isShowPla"
          class="option-list"
        >
          <option
            v-for="(item,index) in places"
            :key="item.fAreaName"
            class="option"
            :value="item.fAreaName"
          >
            <div
              :value="index"
              @click="clickPlace(item.fAreaName)"
            >
              {{ item.fAreaName }}
            </div> 
          </option>
        </div>
      </div>
    </div>

    <div
      class="loginImg bottomBtn "
      @click="sendPosition"
    >
      确认
    </div>
  </div>
</template>
<script>
import shareMix from "@/mixins/mixin";
import { promisify } from "@/utils/index";
import AdressInfo from "@/components/adressInfo";

import {
  getParams
} from "@/utils/index";
export default {
  components: {
    AdressInfo
  },
  mixins: [shareMix],
  data() {
    return {
      isShowPro: false,
      isShowCity: false,
      isShowArea: false,
      isShowPre: false,
      isShowPla: false,
      textName: '', //场景名称
      provinces:[],
      city:[],
      prefectures:[],
      areas:[],
      places:[],
      userID: '', //用户id
      current:{
        provinceName: "请选择",
        cityName: "请选择",
        prefectureName: "请选择",
        areaName: "请选择",
        placeName: "请选择"
      }
    };
  },
  methods: {
    async bindText(e) {
      this.textName = e.detail.value;
      let {  userID } = getApp().globalData.user

      this.$request
      .post("/search/likeSearch.do",{
        userID,
        // province,
        // param, 
        // type
      })
      .then(res => {
        console.log('res: ', res);
      })
      .catch(err => {
        console.log('err: ', err);
      });
      
    },
    clickProvince(item){
      this.isShowPro = !this.isShowPro;
      this.current.provinceName = item;
      this.getCity(item);
    },
    clickCity(item){
      this.isShowCity = !this.isShowCity;
      this.current.cityName = item;
      this.getPre(item);
    },
    clickPrefectures(item){
      this.isShowPre = !this.isShowPre;
      this.current.prefectureName = item;
      this.getArea(item);
    },
    clickAreas(item){
      this.isShowArea = !this.isShowArea;
      this.current.areaName = item.fAreaName;
      this.getPlace(item.fID);
    },
    clickPlace(item){
      this.isShowPla = !this.isShowPla;
      this.current.placeName = item;
    },
    async getProvince(){
      let userID = wx.getStorageSync('userId')
      console.log('userID: ', userID);
      this.$request
      .post("/location/getProvinceTreeList.do",{
        userID
      })
      .then(res => {
       this.provinces = res.list
      })
      .catch(err => {
        console.log('err: ', err);
      });
    },
    async getCity(item){
      let userID = wx.getStorageSync('userId')

      // const userID  = 2002131059424992
      const province = item;
      this.$request
      .post("/location/getCityTreeList.do",{
        userID,
        province
      })
      .then(res => {
       this.citys = res.list
       console.log('this.citys: ', this.citys);
      })
      .catch(err => {
        return wx.showToast({
          title: "获取失败",
          icon: "none"
        });
      });
    },
    //县区
    async getPre(item){
      let userID = wx.getStorageSync('userId')
      // const userID  = 2002131059424992
      const city = item;
      this.$request
      .post("/location/getPrefectureTreeList.do",{
        userID,
        city
      })
      .then(res => {
       this.prefectures = res.list;
      })
      .catch(err => {
        return wx.showToast({
          title: "获取失败",
          icon: "none"
        });
      });
    },
    //地区
    async getArea(item){
       let userID = wx.getStorageSync('userId')
      // const userID  = 2002131059424992
      const prefecture = item;
      this.$request
      .post("/location/getAreaTreeList.do",{
        userID,
        prefecture
      })
      .then(res => {
       this.areas = res.list
      })
      .catch(err => {
        return wx.showToast({
          title: "获取失败",
          icon: "none"
        });
      });
    },
    //具体地址
    async getPlace(item){
      let userID = wx.getStorageSync('userId')

      // const userID  = 2002131059424992
      const areaId = item;
      this.$request
      .post("/location/getPlaceTreeList.do",{
        userID,
        areaId
      })
      .then(res => {
       this.places = res.list
      })
      .catch(err => {
        return wx.showToast({
          title: "获取失败",
          icon: "none"
        });
      });
    },
    optionTap(e){
      let dataset = e;//获取点击的下拉列表的下标
      console.log('dataset: ', dataset);
    },
    closePro(){
      this.isShowPro = !this.isShowPro;
    },
    closeCity(){
      this.isShowCity = !this.isShowCity;
    },
    closePre(){
      this.isShowPre = !this.isShowPre;
    },
    closeArea(){
      this.isShowArea = !this.isShowArea;
    },
    closePla(){
      this.isShowPla = !this.isShowPla;
    },
    sendPosition(){
      const userAddress = {}; 
      let {provinceName,cityName ,prefectureName,areaName, placeName} = this.current;
      if(provinceName == '请选择'){
        provinceName = ''
      }
      if(cityName == '请选择'){
        cityName = ''
      }
      if(prefectureName == '请选择'){
        prefectureName = ''
      }
      if(areaName == '请选择'){
        areaName = ''
      }
      if(placeName == '请选择'){
        placeName = ''
      }
      userAddress.province = provinceName || '';
      userAddress.city = cityName || '';
      userAddress.prefecture = prefectureName || '';
      userAddress.areaName = areaName || '';
      userAddress.placeName = placeName || '';
      getApp().globalData.userAddress = userAddress || '';
      wx.setStorage({
        key: "userAddress",
        data: userAddress
      });
      wx.reLaunch({
        url: "/pages/index/index"
      });
    }
  },
  onShow() {
    this.getProvince();
  }
};
</script>
<style lang="less" scoped>
.appDiv {
  min-height: 100vh;
  background-color: #1D7FFD;
  padding: 20rpx 0;
}
.inputDiv{
    background: transparent;
    background-color: rgba(189, 189, 192, 0.05);
    border-width: 1rpx;
    background-color:#ffffff;
    border-radius: 50rpx;
    line-height: 110rpx;
  input{
    margin: 30rpx 0rpx;
    background: transparent;
    background-color: #ffffff;
  }
}
.icon {
  width: 34rpx;
  margin-right: 15rpx;
  height: 36rpx;
  position: relative;
}
.positionDiv{
  margin: 0 10rpx;
  height:45rpx;
  color: #ffffff;
  .positionSelect{
    margin-top: 30rpx;
    border-color:#ffffff;
    .tag {
        display: inline-block;
        height: 64rpx;
        line-height: 64rpx;
        text-align: center;
        border-radius: 4rpx;
        border-style: dashed;
        color: #ffffff;
        background:linear-gradient(270deg,#1E99EB 0%,#3055FD 100%);
        margin-right: 24rpx;
        margin-bottom: 24rpx;
        padding: 0 26rpx;
        font-size: 32rpx;
        width: 50%;
        border: 2rpx transparent solid;
        &.active {
          border: 2rpx #ffffff solid;
          
        }
        &.focus {
          border: 2rpx #ffffff solid;
        }
      }
  }
}
.choiceDiv{
  margin: 40rpx 10rpx;
  padding-left: 10rpx;
  color: #ffffff;
}
.selectDiv{
    width: 100%;
    height: 95rpx;
    margin: 40rpx 10rpx;
    border-radius: 24rpx;
}
.select-box {
  position: relative;
  width: 23%;
  height: 53rpx;
  margin-left: 7rpx;
  border: 2rpx solid;
  display: line-block;
  float: left;
  background: #ffffff;
  border-radius: 24rpx;

}
.select-boxx {
  position: relative;
  width: 705rpx;
  height: 53rpx;
  margin-left: 7rpx;
  border: 2rpx solid;
  display: line-block;
  float: left;
  background: #ffffff;
  border-radius: 24rpx;
}
.select-current {
  position: relative;
  width: 100%;
  padding: 0 10rpx;
  line-height: 60rpx;
  border-radius: 6rpx;
  box-sizing: border-box;
  border-color:#3451FD;
  background: #ffffff;
}

.select-current::after {
  position: absolute;
  display: block;
  right: 16rpx;
  top: 30rpx;
  content: '';
  width: 0;
  height: 0;
  border: 10rpx solid transparent;
  border-top: 10rpx solid #3451FD;
}

.current-name {
  display: block;
  width: 85%;
  height: 100%;
  word-wrap: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.option-list {
  position: absolute;
  left: 0;
  top: 76rpx;
  width: 100%;
  padding: 12rpx 20rpx 10rpx 20rpx;
  border-radius: 6rpx;
  box-sizing: border-box;
  z-index: 99;
  box-shadow: 0rpx 0rpx 1rpx 1rpx rgba(0, 0, 0, 0.2) inset;
  background-color: #fff;
}

.option {
  display: block;
  width: 100%;
  line-height: 70rpx;
  border-bottom: 1rpx solid #eee;
}

.option:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.loginImg{
  background-color: #ffffff;
  background-size: 100% 100%;
  width:479rpx;
  height:80rpx;
  border-radius: 24rpx;
  text-align: center;
  line-height: 80rpx;
  color: #2E60FE;
  margin: 0 auto;
}

.positionName{
  background: #ffffff;
  margin:40rpx 10rpx;
  border-radius: 24rpx;
  span{
    font-size:26rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:#ffffff;
    line-height:72px;
  }
  .blue{
    font-size:26rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:#ffffff;
  }
}
</style>
