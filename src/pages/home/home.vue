<template>
  <div class="page flex column">
    <!-- 首页 -->
    <div>
      <Adress-info />
    </div>
    <div class="head">
      <input
        class="input grow"
        maxlength="40"
        placeholder="输入设别ID或者你想查询的关键字"
        :focus="focusInput"
        :value="userId"
        @input="bindUserId"
      >
    </div>
    <scroll-view
      :style="{'height': '72vh'}"
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
          <image
            class="iconfont"
            src="/static/png/co.png"
          />
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
            src="/static/png/fireHydrant.png"
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
            src="/static/png/fireHydrant.png"
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
            class="iconfont"
            src="/static/png/fireHydrant.png"
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

    <HomeTabbar
      @change="onTabChange"
    />
  </div>
</template>
<script>
import HomeTabbar from "@/components/HomeTabbar";
import AdressInfo from "@/components/adressInfo";
import shareMix from "@/mixins/mixin";
// import myEvent from "@/utils/event";
export default {
  components: {
    HomeTabbar,
    AdressInfo
  },
  mixins: [shareMix],
  data() {
    return {
      province: "", // 地址
      userId:"", //userId,
      examObj:[],
      smokeCountFid:"",
      electronCountFid:"",
      coCountFid:"",
      hydraulicCountFid: "",
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
    this.toPage = opt.toPage;
    this.tab = opt.tab;
  },
  onShow() {
    if (this.toPage) {
      console.log('this.toPage: ', this.toPage);
      let toPage = this.toPage;
    }
    this.getData();
    this.onTabChange(this.tab);
  },

  methods: {
    onTabChange(tab = "home") {
      this.tab = tab;
      if (this.tab === "home") {
      }
      if (this.tab === "mail") {
      }
      if (this.tab === "mine") {
      }
    },
    bindUserId(e){
      this.userId = e.detail.value;
    },
    getData(){
      this.$request
      .post("/facilityInfo/countFacility.do")
      .then(res => {
       const data = res
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
      })
      .catch(err => {
        return wx.showToast({
          title: "获取失败",
          icon: "none"
        });
      });
    },

    search(){
/*       userId = this.userId;
      province = this.province;
      this.$request
      .post("/facilityInfo/countFacility.do",{
        userId,
        province
      })
      .then(res => {
       const data = res
       
      })
      .catch(err => {
        return wx.showToast({
          title: "获取失败",
          icon: "none"
        });
      }); */;

    },
    jumpUrl(type) {
      wx.navigateTo({
        url: `/pages/equipmentlist/index?type=${type}`
      });
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  height: 100vh;
  background-color: #2E60FE;
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
  .pannel{
    height: 76vh;
    &__item{
      display:inline-block;
      margin:20rpx;
      width: 332rpx;
      height : 359rpx;
      background: #ffffff;
      border-radius: 24rpx;
      text-align: center;
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
        margin-top: 50rpx;
      }
    }
  }
}




</style>

