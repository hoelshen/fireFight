<template>
  <div class="faq flex column">
    <scroll-view class="items grow box" scroll-y>
      <div class="item">
        <div class="t">关于投递箱</div>
        <div class="q">Q：我写的咨询谁会收到？</div>
        <div class="a">A：我们会在每晚 22:30 将咨询箱中的信收集到解答室，按照一定规则随机分发给解答者，并利用算法尽量确保每个咨询被若干个适合的解答者看到，以增加被回复的概率。
        </div>
      </div>

      <div class="item">
        <div class="q">Q：我的咨询会被微信好友看到吗？</div>
        <div class="a">A： 咨询是完全匿名的，你不必使用自己的笔名或微信昵称，而是可以每次使用不同的署名。因此你不必担心自己的咨询会被微信好友看到。同时我们建议在讲述烦恼时，对重要的地点、人物等信息使用化名，以巩固咨询的私密性。</div>
      </div>

      <div class="item">
        <div class="q">Q：为什么我的咨询很久都没人回复？</div>
        <div class="a"> A：Tell 不是一个即时通讯工具，Tell 是在模拟现实环境的写信沟通场景，是需要一定的投递时间的，所以每一封信收到回复的时间并不相同。目前的 Tell 信件投递机制是按照一定的匹配规则，向与你相近的 Teller 进行投递，Tell 保证每一封正常内容的信都会被投递出去，但是部分因为信件本身的质量原因，并未成功引起他人共鸣进而吸引他人进行回复。</div>
      </div>

      <div class="item">
        <div class="q">
          Q：如何提高咨询的回复几率？
        </div>
        <div class="a">
          A：目前在 Tell ，投递的87.12%的信件都会得到回应。我们建议你在写信的时候，遵循以下几个要点，会提高你的回信率： 1：请丰满详细的描写一件最近遇到的烦恼、困惑、事件，和给你带来的影响 2：请尽量避免空洞无力的情绪发泄、无病呻吟 3：请避免发布不符合 Tell 平台的内容 Tell 建议大家认真详细描述自己的烦恼，以获得解答者的优质解答。
        </div>
      </div>

      <div class="item">
        <div class="q">
          Q：我想删除我的咨询（信）？
        </div>
        <div class="a">
          A：目前 Tell 暂时不支持自行删除咨询（信）内容。如果你对此有相关问题，请添加Tell（微信：tellusastory）联系解决。
        </div>
      </div>

      <div class="item">
        <div class="t">关于解答室</div>
        <div class="q">
          Q：为什么每天只能在解答室中解答一个咨询？
        </div>
        <div class="a">
          A：当前 Tell 的规则是解答者每天只能从解答者中挑选一个咨询进行解答，是希望大家从中认真挑选一个最想帮助的咨询来进行解答。Tell希望大家对每个咨询都认真对待，如果你的解答能为对方带来一点点帮助，那就太好了。
        </div>
      </div>

      <div class="item">
        <div class="q">
          Q：为什么刷新信件没有了？
        </div>
        <div class="a">
          A：Tell 2.0版本（2019年1月28日）之后，取消了原 Tell公开信箱中的刷新信件功能。该版本之后，将会根据解答者的徽章等级，每天会获取到更多的信咨询信件。
        </div>
      </div>

      <div class="item">
        <div class="q">
          Q：如何修改笔名、头像等资料？
        </div>
        <div class="a">
          A：在个人中心中，点击笔名、头像区域位置即可按照指引进行修改。
        </div>
      </div>

      <div class="item">
        <div class="t">关于其他</div>
        <div class="q">
          Q：如何获得解忧券？
        </div>
        <div class="a">
          A：目前可以获得解忧券的途径有： 1、被邀请人通过邀请人的分享邀请链接首次体验Tell，可获得一张解忧券 2、关注Tell 服务号可获得一张解忧券 3、在福利社内使用10张邮票兑换一枚解忧券 4、加入Tell用户群（微信：tellusastory），不定期参与相关活动获得解忧券
        </div>
      </div>

      <div class="item">
        <div class="q">
          Q：如何获得邮票？
        </div>
        <div class="a">
          A：目前可以获得邮票的途径有： 1、在解答室中解答新收到的咨询（信），可获得一枚邮票 2、解答的信获得咨询者的感谢，可获得一枚邮票 3、参加福利社内活动，可领取相对应数量的邮票 4、向好友推荐Tell，每一位通过你的邀请加入的新朋友，你将获得一枚邮票 5、加入Tell用户群（微信：tellusastory），不定期参与相关活动获得邮票
        </div>
      </div>
    </scroll-view>

    <div class="btns flex column center box">
      <div class="tips">问题没有解决？直接联系我们吧！</div>
      <button class="flex center darkButton" :session-from="userInfo" open-type="contact">在线客服</button>
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
  },
  onShareAppMessage(res) {
    let { title, imageUrl, path, user } = getApp().globalData;
    path = user._id ? `${path}&refer=${user._id}` : path;
    return {
      title,
      imageUrl,
      path
    };
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
    .h {
      color: #2f2f2f;
      font-size: 56rpx;
      margin-bottom: 20rpx;
    }
    .hr {
      height: 1rpx;
      background: rgb(199, 199, 199);
      margin: 20rpx 0rpx;
    }
    .t {
      color: #4D495B;
      font-size: 48rpx;
      margin-bottom: 20rpx;
    }
    .q {
      color: #4D495B;
      font-size: 36rpx;
      margin-bottom: 20rpx;
    }
    .a {
      color: #BDBDC0;
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
      width:316rpx;
      &.active {
        background: darken(@yellow, 10%);
      }
    }
  }
}
</style>
