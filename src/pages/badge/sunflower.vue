<template>
  <view class="ticket flex column j-between">
    <div>
      <p>向日葵代表着一种精神，追寻阳光，并活成阳光的模样。或许无法照耀你，但映入眼帘时，仍能让你感到温暖。我们希望，持有向日葵徽章的也是这样的人。</p>
      <p>持有向日葵徽章，你每天解答咨询的次数将不再受到限制，便于你帮助到更多需要温暖的人。</p>
      <p>你需要发自内心喜爱 Tell 这个社区，同时能够真正在「帮助他人」这件事上获取到喜悦和满足。你每天或许要面对更多来自别人的烦恼，因此，你需要一定的乐观精神，并且每天保有一定的时间来解答咨询。</p>
      <p>同时我们也希望你能够配合 Tell ，对外宣发关于 Tell 相关的活动信息。在 Tell 的用户微信群里，引导新加入的成员，帮助解决群员提出的问题。</p>
      <p>目前，向日葵徽章采取邀请制和申请制。Tell 团队会在某些情况下直接向优秀的解答者赠予徽章，若不想等待，可在下方主动申请。</p>
      <button onclik="">申请</button>
    </div>

    
  </view>
</template>
<script>
import Modal from "@/components/Modal";

export default {
  components: {
    Modal
  },
  data() {
    return {
      active: "solution",
      isShowModal: false,
      form:{

      }
    };
  },
  onShareAppMessage(res) {
    let { title, imageUrl, path, user } = getApp().globalData;
    path = user._id ? `${path}&refer=${user._id}` : path;
    return {
      title,
      imageUrl,
      path
    };
  },
  methods: {
    toggle(tab) {
      this.active = tab;
    },
    toReply() {
      this.$router.push({ path: "/pages/solution/solutionRoom" });
    },
    toShare() {
      this.$router.push({ path: "/pages/share/share" });
    },
    haveSunFlowerBadge(){
      this.$request.post("/badge/form/sunflower",{form:this.form})
    }
  },
  onShow() {
    const { currentRoute: { query } } = this.$router;
    this.active = query.active || "solution";
  }
};
</script>
<style lang="less" scope>
page {
  background-color: #ffffff;
}

</style>

