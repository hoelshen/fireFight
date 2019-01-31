<template>
  <div class="faq flex column">
    <scroll-view class="items grow box" scroll-y>
      <div class="item">
        <div class="q">1. 为什么每天只能回复一封信？</div>
        <div class="a">目前 Tell 的规则是每天只能从信箱中挑选一封信进行回复，是希望大家从中认真挑选一封最想回复的信来进行回信。Tell希望大家每次回信都认真对待，如果你的回信能为对方带来一点点帮助，那就太好了。
        </div>
      </div>

      <div class="item">
        <div class="q">2. 我写的信会寄给谁？</div>
        <div class="a">在 Tell 中写的信会投递到 Tell 邮局，每天晚上22:30根据一定的投递规则进行统一投递，派送至各位的信箱中。一般情况下是与你比较相近的 Teller。</div>
      </div>

      <div class="item">
        <div class="q">3. 为什么我的信很久都没人回复？</div>
        <div class="a"> Teller 需要知道的是 Tell 并不是一个即时通讯工具，Tell 是在模拟现实环境的写信沟通场景，是需要一定的投递时间的，所以每一封信收到回复的时间并不相同。目前的 Tell 信件投递机制是按照一定的匹配规则，向与你相近的 Teller 进行投递，Tell 保证每一封正常内容的信都会被投递出去，但是部分因为信件本身的质量原因，并未成功引起他人共鸣进而吸引他人进行回复。</div>
      </div>

      <div class="item">
        <div class="q">
          4. 如何提高信件回复几率？
        </div>
        <div class="a">
          目前在 Tell ，投递的87.12%的信件都会得到回应。我们建议你在写信的时候，遵循以下几个要点，会提高你的回信率： a: 请丰满详细的描写一件最近遇到的一件事，和给你带来的影响 b：请尽量避免空洞无力的情绪发泄、无病呻吟 c：请避免发布不符合 Tell 平台的内容
        </div>
      </div>

      <div class="item">
        <div class="q">
          5. 刷新信件是什么？
        </div>
        <div class="a">
          收信箱每天22:30会自动收取三封信，如果这三封都没有特别适合你或者你不擅长回复的信件内容，可以选择消耗一枚邮票进行收信箱刷新，重新获取新的三封信件。需要注意的是，刷新后原有的三封信会被替代。如果已经回复将不能再进行使用刷新信件功能，且每天只能进行刷新一次。
        </div>
      </div>

      <div class="item">
        <div class="q">
          6. 如何修改笔名？
        </div>
        <div class="a">
          在首页在左下测的邮票图标点击进入邮票中心，可按照指引消耗5枚邮票进行修改笔名。
        </div>
      </div>

      <div class="item">
        <div class="q">
          7. 我的微信好友是否会看到我的信？
        </div>
        <div class="a">
          目前 Tell 是默认匿名写信的平台，一般情况下是不会暴露你的个人隐私的。而即使你使用微信昵称和头像，因为Tell 的投递机制，被你的好友收到信的概率也是非常小的，几乎可以忽略。在即将到来的新版本中，我们将全面实行匿名机制，努力保护大家的隐私安全。
        </div>
      </div>

      <div class="item">
        <div class="q">
          8. 我想删除我的信？
        </div>
        <div class="a">
          目前 Tell 暂时不支持自行删除信件内容。如果你不想再收到他人的回复，可以在对新收到的回信不进行任何操作一段时间后，系统会自动将该封信件停止投递。
        </div>
      </div>

      <div class="item">
        <div class="q">
          9. 如何获得更多邮票？
        </div>
        <div class="a">
          目前 Tell 的获取邮票的途径主要有： a: 在信箱中回复收到的信，可获得一枚邮票； b：向好友推荐 Tell，加入这个有爱的大家庭，可获得邮票奖励。每一位通过你分享的新朋友加入我们，你将获得一枚邮票。 </div>
      </div>
    </scroll-view>

    <div class="btns flex column center box">
      <div class="tips">问题没有解决？直接联系我们吧！</div>
      <button class="flex center" :session-from="userInfo" open-type="contact">在线客服</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: ""
    };
  },
  onShow() {
    const { user } = getApp().globalData;
    this.userInfo = JSON.stringify({
      nickName: user.nickName,
      avatarUrl: user.avatarUrl
    });
  }
};
</script>

<style scoped lang="less">
@yellow: #ffc75d;
@black: #292929;
@gray: #c7c7c7;
@bg: #7e7e7e;

.faq {
  height: 100vh;
  background: #fbfbfd;
  .items {
    padding: 40rpx 40rpx 0 40rpx;
    height: 700rpx;
    .item {
      margin: 40rpx 0;
      &:first-child {
        margin-top: 0;
      }
    }
    .q {
      color: #2f2f2f;
      font-size: 36rpx;
      margin-bottom: 20rpx;
    }
    .a {
      color: #5b5b5b;
      font-size: 28rpx;
      line-height: 50rpx;
    }
  }
  .btns {
    height: 220rpx;
  }
  .btns {
    .tips {
      color: #5b5b5b;
      font-size: 28rpx;
      margin-bottom: 20rpx;
    }
    button {
      width: 480rpx;
      height: 100rpx;
      background: @yellow;
      color: #fff;
      font-size: 28rpx;
      border-radius: 16rpx;
      &.active {
        background: darken(@yellow, 10%);
      }
    }
  }
}
</style>
