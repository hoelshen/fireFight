<template>
  <div class="page flex column">
    <!-- 
      首页 
      :user-address="childUserAddress"
    -->
    <div style="height:6vh;">
      <Adress-info
        ref="adress"
      />
    </div>
    <div class="head flex column">
      <div
        class="input grow"
        @click="toDetail"
      >
        输入您想查询的设备ID或者关键字
      </div>
      <scroll-view
        class="flex_1"
        :scroll-y="true"
      >
        <div class="pannel ">
          <div
            class="pannel__item"
            @click="jumpUrl(smokeType)"
          >
            <image
              class="iconfont"
              src="/static/png/smoke.png"
            />
            <p class="my_function_item_text">
              智能烟感
            </p>
            <span>安装数量</span>
            <span class="blue">{{ smokeCountFid }} </span>
            <span>个 </span>
          </div>
          <div
            class="pannel__item"
            @click="jumpUrl(electronType)"
          >
            <image
              class="iconfont"
              src="/static/png/electron.png"
            />
            <p class="my_function_item_text">
              智能用电
            </p>
            <span>安装数量</span>
            <span class="blue">{{ electronCountFid }}</span>
            <span>个 </span>
          </div>
          <div
            class="pannel__item"
            @click="jumpUrl(coType)"
          >
            <div
              style="height: 98rpx;"
            >
              <image
                class="iconfont"
                src="/static/png/co.png"
                style="width: 101rpx; height: 52rpx;"
              />
            </div>
            <p class="my_function_item_text">
              智能气感
            </p>
            <span>安装数量： </span>
            <span class="blue">{{ coCountFid }}</span>
            <span>个 </span>
          </div>
          <div
            class="pannel__item"
            @click="jumpUrl(hydraulicType)"
          >
            <image
              class="iconfont"
              src="/static/png/hydraulic.png"
            />
            <p class="my_function_item_text">
              液压液位检测
            </p>
            <span>安装数量： </span>
            <span class="blue">{{ hydraulicCountFid }}</span>
            <span>个 </span>
          </div>
          <div
            class="pannel__item"
            @click="jumpUrl(fireHydrantType)"
          >
            <image
              class="iconfont"
              src="/static/png/fireHydrant1.png"
              style="width: 63rpx;"
            />
            <p class="my_function_item_text">
              智能消火栓
            </p>
            <span>安装数量： </span>
            <span class="blue">{{ fireHydrantCountFid }} </span>
            <span>个 </span>
          </div>
          <div
            class="pannel__item"
            @click="jumpUrl(videoType)"
          >
            <image
              
              class="iconfont"
              src="/static/png/video.png"
            />
            <p class="my_function_item_text">
              视频监控
            </p>
            <span>安装数量： </span>
            <span class="blue">{{ videoCountFid }} </span>
            <span>个 </span>
          </div>
          <div
            class="pannel__item"
            @click="jumpUrl(netType)"
          >
            <image
              style="width: 100rpx;"
              class="iconfont"
              src="/static/png/iot.png"
            />
            <p class="my_function_item_text">
              物联⽹关
            </p>
            <span>安装数量： </span>
            <span class="blue">{{ netCountFid }} </span>
            <span>个 </span>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>
<script>
import AdressInfo from "@/components/adressInfo";
import shareMix from "@/mixins/mixin";
import {
  getParams
} from "@/utils/index";
// import myEvent from "@/utils/event";
export default {
  name: "HomeCont",
  components: {
    AdressInfo
  },
  mixins: [shareMix],
  data() {
    return {
      childUserAddress: null,
      userId:"", //userId,
      Userlist: [],
      showUserlist: false,
      examObj:[],
      smokeCountFid:"",
      electronCountFid:"",
      coCountFid:"",
      hydraulicCountFid: "",
      params: "",//参数
      fireHydrantCountFid:"",
      videoCountFid: "",
      netCountFid: "",
      smokeType: '',
      electronType: '',
      coType: '',
      hydraulicType: '',
      fireHydrantType: '',
      videoType: '',
      netType: ''
    };
  },
  onLoad(opt) {
    const value2 = wx.getStorageSync("userId");
    if(!value2){
      wx.reLaunch({
        url: `/pages/login/index`
      });
    } else {
      this.params = wx.getStorageSync('userAddress')
      this.getHomeData()
    }
  },
  onShow() {
    
  },

  methods: {
    toDetail(){
        wx.navigateTo({
          url: `/pages/home/detail`
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
    filterdata(data){
        data.forEach(val=>{
             switch (val.ftype) {
              case "0":
                 this.smokeCountFid = val.countFid
                 this.smokeType = val.ftype
                 break
              case "3":
                 this.electronCountFid = val.countFid
                 this.electronType = val.ftype
                 break
              case "1":
                 this.coCountFid = val.countFid
                 this.coType = val.ftype
                 break
              case "2":
                 this.hydraulicCountFid = val.countFid
                 this.hydraulicType = val.ftype
                 break
              case "7":
                 this.fireHydrantCountFid = val.countFid
                 this.fireHydrantType = val.ftype
                 break
              case "4":
                 this.videoCountFid = val.countFid;
                 this.videoType= val.ftype;
                 break
              case "8":
              this.netCountFid = val.countFid;
              this.netType= val.ftype;
              default :
                return ;
             }
        })
    },
    getHomeData(){
      this.$refs.adress.initData()
      this.params = wx.getStorageSync('userAddress')
      if(this.params) {
        this.childUserAddress = this.params.province + this.params.city + this.params.prefecture + this.params.areaName + this.params.placeName
      }
      let params = getParams(this.params);
      params['userId'] = wx.getStorageSync('userId') || 2002131059424992;
      this.$request
      .post("/facilityInfo/countFacility.do",params)
      .then(res => {
       const data = res
        this.filterdata(data)
      })
      .catch(err => {
        return wx.showToast({
          title: "获取失败",
          icon: "none"
        });
      });
    },
    jumpUrl(type) {
      if(type != 8) {
        wx.navigateTo({
          url: `/pages/equipmentlist/index?type=${type}`
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  height: 93vh;
  background-color: #1D7FFD;
  .head{
    .input{
      margin:24rpx 44rpx;
      background-color:#ffffff;
      width: 662rpx;
      height: 80rpx;
      border-radius: 50rpx;
      text-align: center;
      line-height: 80rpx;
    }
  }
  .UserList{
    background-color: #ffffff;
    margin: -45rpx 80rpx 0;
    text-align: center;
  }
  .pannel{
    height: 75vh;
    &__item{
      display:inline-block;
      margin:20rpx;
      width: 332rpx;
      height : 290rpx;
      background: #ffffff;
      border-radius: 24rpx;
      text-align: center;
      padding-top: 60rpx;
      .blue{
        font-size:44rpx;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(52,81,253,1);
      }
      p{
        margin-top:20rpx;
        margin-bottom: 20rpx;
      }
      span{
        margin-top: 50rpx;
        margin-left: 10rpx;
      }
      .iconfont{
        width: 72rpx;
        height:88rpx;
        margin: 0 auto;
        // margin-top: 50rpx;
      }
    }
  }
}




</style>

