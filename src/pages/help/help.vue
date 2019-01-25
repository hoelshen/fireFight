<template>
  <div class="container">
    <div class="hello animated fadeInDown">
      HI Teller,
    </div>
    <img v-if="!showContent" class="card animated bounceInDown" src="/static/svgs/help-card.svg" alt="">
    <div v-if="!showContent" class="bottom box  animated fadeInUp">
      <div class="btns flex j-between">
        <button class="flex center read box" hover-class="active" @tap="show">查看心理救援机构</button>
        <button class="flex center send box" hover-class="active" @tap="send">继续发送</button>
      </div>
      <div class="tips flex center">
        阳光常在，希望常在
      </div>
    </div>
    <div class="content" v-if="showContent">
      <div class="item">
        <div class="title">北京心理危机研究与干预中心</div>
        <div class="phone" @tap="makePhone" data-tel="8008101117">8008101117 (24小时)</div>
      </div>

      <div class="item">
        <div class="title">深圳市心理危机干预中心</div>
        <div class="phone" @tap="makePhone" data-tel="075525629459 ">0755-25629459 (8:00 - 23:00)</div>
      </div>

      <div class="item">
        <div class="title">长春市心理援助热线</div>
        <div class="phone" @tap="makePhone" data-tel="043189685000">0431-89685000 (24小时)</div>
        <div class="phone" @tap="makePhone" data-tel="043189685333">0431-89685333（8:00 - 16:00）</div>
      </div>

      <div class="item">
        <div class="title">青岛市心理危机干预中心</div>
        <div class="phone" @tap="makePhone" data-tel="053285669120">0532-85669120（24小时）</div>
      </div>

      <div class="item">
        <div class="title">广州市心理危机干预中心热线</div>
        <div class="phone" @tap="makePhone" data-tel="02081899120">020-81899120（24小时）</div>
      </div>

      <div class="bottom flex center box">
        <button class="flex center read box" hover-class="active" @tap="back">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showContent: false
    };
  },
  methods: {
    show() {
      this.showContent = true;
    },
    back() {
      this.showContent = false;
    },
    async send() {
      let { content, weather, aliasName } = getApp().globalData.mail;
      let sendRes = this.$request.post("/mail/story", {
        content,
        weather,
        aliasName
      });
      this.$router.push({
        query: { active: "consultative" },
        path: "/pages/detail/index"
      });
    },
    makePhone(e) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.tel
      });
    }
  },
  onShow() {
    this.showContent = false;
  }
};
</script>

<style scoped lang="less">
.container {
    height:100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: url(https://tellers.oss-cn-shenzhen.aliyuncs.com/static/v1/help-house.svg)
      no-repeat,
    linear-gradient(#fe5c6b, #ffbe72);
  background-size: contain;
  background-position: center center;
}
.card {
  width: 750rpx;
  height: 828rpx;
}
.hello {
  position: fixed;
  top: 136rpx;
  left: 60rpx;
  font-size: 60rpx;
  color: #fff;
}
.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 60rpx;
  .btns {
    margin-bottom: 30rpx;
  }

  .tips {
    font-size: 30rpx;
    color: #fff;
  }
}

button {
  width: 286rpx;
  height: 92rpx;
  border-radius: 16rpx;
  color: #fff;
  font-size: 28rpx;
  &.read {
    background: #fb9e6e;
    &.active {
      background: darken(#fb9e6e, 10%);
    }
  }
  &.send {
    background: transparent;
    border: 6rpx #fb9e6e solid;
    &.active {
      border: 6rpx darken(#fb9e6e, 10%) solid;
    }
  }
}

.content {
  font-size: 36rpx;
  line-height: 1.5;
  padding: 250rpx 60rpx 30rpx 60rpx;
  .item {
    margin-bottom: 30rpx;
    .title {
      color: #2d2d2d;
    }
    .phone {
      color: #fff;
    }
  }
  .continue {
    margin-top: 40rpx;
  }
}
.animated {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0);
  }
  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }
  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0);
  }
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
.bounceInDown {
  -webkit-animation-name: bounceInDown;
  animation-name: bounceInDown;
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}
</style>
