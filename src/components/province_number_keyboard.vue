<template>
  <cover-view>
    <view
      v-if="show"
      class="plate-number-keyboard-box"
      @tap="_closeKeyboard"
    >
      <view
        class="pnk-main"
        catchtap="_preventDefault"
        :animation="animationData"
      >
        <view class="pnk-main-title">
          <text>请点击选择车牌号：</text>
          <view
            class="iconfont icon-arrow-down"
            @tap="_closeKeyboard"
          />
        </view>
        <view class="pnk-content">
          <!-- 省份面板 -->
          <view
            v-if="showProvince"
            class="province-plane"
          >
            <block
              v-for="index in provinceList"
              :key="index"
            >
              <view class="line">
                <view
                  v-if="index === 'line4'"
                  class="number-item handle-btn"
                  @tap="_clickChangePlane"
                >
                  ABC
                </view>
                <view
                  v-for="ind in item"
                  :key="ind"
                  class="number-item"
                  :value="ind.it"
                  @tap="_handleClick"
                >
                  {{ ind.it }}
                </view>
                <view
                  v-if="index === 'line4'"
                  class="number-item handle-btn iconfont icon-huitui"
                  @tap="_handleDelete"
                />
              </view>
            </block>
          </view>
          <!-- 字母数字面板 -->
          <view
            v-if="!showProvince"
            class="letter-number-plane"
          >
            <block
              v-for="index in letterNumberList"
              :key="index"
            >
              <view class="line">
                <view
                  v-if="index === 'line4'"
                  class="number-item handle-btn"
                  @tap="_clickChangePlane"
                >
                  省
                </view>
                <view
                  v-for="ind in item"
                  :key="ind"
                  class="number-item"
                  :value="ind.it"
                  @tap="_handleClick"
                >
                  {{ ind.it }}
                </view>
                <view
                  v-if="index === 'line4'"
                  class="number-item handle-btn iconfont icon-huitui"
                  @tap="_handleDelete"
                />
              </view>
            </block>
          </view>
        </view>
      </view>
    </view>
  </cover-view>
</template>


<script>
export default {
  name: "Modal",
  Props: {
    show: {
      // 控制键盘显示隐藏
      type: Boolean,
      value: false,

    },
    showMain: {
      type: Boolean,
      value: false
    },
    initValue: {
      // 初始化的值
      type: String,
      value: ""
    }
  },
  data() {
    return {
      isShowModal: false,
      filterTitle: "",
      value: {},
      plateNumber: "", // 键盘操作结果值
      provinceList: {
        line1: ["京", "津", "渝", "沪", "冀", "晋", "辽", "吉", "黑", "苏"],
        line2: ["浙", "皖", "闽", "赣", "鲁", "豫", "鄂", "湘", "粤", "琼"],
        line3: ["川", "贵", "云", "陕", "甘", "青", "蒙", "贵", "宁", "新"],
        line4: ["藏", "使", "领", "警", "学", "港", "澳"]
      },
      letterNumberList: {
        line1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        line2: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        line3: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        line4: ["Z", "X", "C", "V", "B", "N", "M"]
      },
      showProvince: true, // 是否显示省份面板，控制省份面板和字符面板显示
      animationData: {}, // 键盘动画
      behaviors: []
    };
  },
  methods: {
    onGotUserInfo(e) {
      this.isShowModal = false;
      console.log("e: ", e);
      this.$request.login(e.detail);
    },
    show() {
      console.log("value: ");
      this.isShowModal = true;
    },
    ConfirmButton() {
      this.isShowModal = false;
    },
    enSure() {
      this.isShowModal = false;
    },
    clickMask() {
      this.isShowModal = false;
      this.value = {
        title: "",
        content: "",
        type: "",
        sureButtonText: "",
        confirmButtonText: ""
      };
    },
    /**
     * 键盘面板切换操作，控制省份内容和字符内容显示
     */
    _clickChangePlane: function() {
      this.setData({
        showProvince: !this.data.showProvince
      });
    },
    /**
     * 关闭键盘，将键盘隐藏
     */
    _closeKeyboard: function(e) {
      // 创建动画，执行键盘面板退出动画，动画结束后隐藏整个键盘组件
      const animation = wx.createAnimation({
        duration: 300
      });
      setTimeout(
        function() {
          animation.translateY(0).step();
          this.setData({
            animationData: animation.export()
          });
          setTimeout(
            function() {
              this.setData({
                show: false
              });
            }.bind(this),
            300
          );
        }.bind(this),
        100
      );
    },
    /* 触发外部绑定事件，传递结果值 */
    _handleResult: function() {
      const myEventDetail = {
        value: this.data.plateNumber // 传递到结果文本
      };
      // 触发外部绑定事件，传递结果参数
      this.triggerEvent("getResult", myEventDetail);
    },
    /**
     * 键盘主要键点击事件，将点击内容更新到plateNumber
     */
    _handleClick: function(e) {
      // 如果当前显示的省份面板，当即任意省份后，自动切换到字符面板，同时将结果值的第一个字符修改
      if (this.data.showProvince) {
        this.setData({
          showProvince: false
        });
      }
      let currentResult = this.data.plateNumber; // 当前的结果值
      let currentText = e.currentTarget.dataset.text; // 当前的操作值

      // 车牌号最多8位，大多数7位，新能源8位，控制不能超过8位数
      if (currentResult.length < 8) {
        this.setData({
          plateNumber: currentResult + currentText
        });

        this._handleResult();
      }
    },
    /**
     * 删除回退点击事件
     */
    _handleDelete: function() {
      let currentText = this.data.plateNumber;
      currentText = currentText.substring(0, currentText.length - 1);
      // 当当前结果值长度大于0时，可执行删减操作
      if (currentText.length >= 0) {
        this.setData({
          plateNumber: currentText
        });

        this._handleResult();
      }
    },
    /**
     * 防止点击穿透
     */
    _preventDefault: function(e) {},
    stopkMask() {}
  },
  onShow() {
    this.plateNumber = this.data.initValue ? this.data.initValue : "";
    
  }
};
</script>
<style lang="less" scoped>
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(77, 73, 91, 0.3);
  z-index: 99;
}
.card {
  width: 630rpx;
  max-height: 598rpx;
  min-height: 402rpx;
  background-color: #ffffff;
  border-radius: 4rpx;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
}
.title {
  margin-top: 60rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #4d495b;
}
.btn {
  margin-top: 64rpx;
}
.content {
  margin: 40rpx 40rpx 20rpx;
  white-space: normal;
  line-height: 52rpx;
  font-size: 28rpx;
  text-align: center;
  color: #4d495b;
  & image {
    width: 550rpx;
    height: 244rpx;
  }
}
.confirm {
  margin-top: 0;
  margin-bottom: 0;
}

.sure {
  padding: 0 130rpx;
  line-height: 92rpx;
}

button {
  padding: 0rpx;
}

.plate-number-keyboard-box {
  position: absolute;
  top: 0rpx;
  left: 0rpx;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0);
  z-index: 9999;
}

.pnk-main {
  position: absolute;
  bottom: -432rpx;
  left: 0rpx;
  height: 432rpx;
  width: 100%;
  background: #d0d5d9;
}

.pnk-main .pnk-main-title {
  font-size: 24rpx;
  height: 50rpx;
  line-height: 50rpx;
  color: #333;
  border-bottom: 1rpx solid #ddd;
  padding: 0rpx 10rpx;
  overflow: hidden;
}

.pnk-main-title text {
  float: left;
}

.pnk-main-title .iconfont {
  float: right;
  width: 70rpx;
  height: 50rpx;
  font-size: 40rpx;
  text-align: center;
  color: #333;
}

.pnk-content {
  padding: 10rpx;
}

.line {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 14rpx;
}

.line:last-of-type {
  margin-bottom: 0rpx;
}

.line .number-item {
  width: 60rpx;
  height: 80rpx;
  border-radius: 12rpx;
  text-align: center;
  line-height: 80rpx;
  background: #fff;
  font-size: 30rpx;
}

.line .number-item:active {
  background: #eee;
}

.line .handle-btn {
  width: 80rpx;
  background: #acb3bb;
  font-size: 28rpx;
}

.line .iconfont {
  font-size: 40rpx;
}



.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-back:before {
  content: "\e601";
}

.icon-huitui:before {
  content: "\e6e5";
}

.icon-arrow-down:before {
  content: "\e613";
}
</style>
