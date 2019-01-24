<template>
  <view>
    <div>{{num}}封信正在邮寄的路上</div>
    <div>

      <session class="list">
        <div
          class="list_item flex column j-between"
          v-for="(item,index) in list"
          @click="show(index)"
          :key="index"
        >
          <div>{{item.createdAt}}</div>
          <div class="list_item-sendName flex wrap j-between">
            <div class="flex column j-between">
              <div class="list_item-receiverName">
                <span class="list_item-receiverNameSpan">{{item.lastMail.aliasName}}</span>
                <span>收</span>
              </div>
              <div class="list_item-content ">
                <span>{{item.lastMail.content}}</span>
              </div>
            </div>
            <div class="flex">
              <img
                class="mail-svg"
                src="/static/svgs/mail.svg"
                alt=""
              >
            </div>
          </div>

          <div class="list_item-sendName flex  j-between">
            <span>{{item.isRead ? "已" : "未"}}读</span>
            <span>{{item.creator}}</span>
          </div>
        </div>
      </session>
    </div>
  </view>

</template>
<script>
export default {
  data() {
    const day = this.$day().format("YYYY/MM/DD");
    return {
      days: day,
      num: 1,
      list: []
    };
  },
  onShow() {
    console.log(this.days);
    this.getList();
  },
  methods: {
    async getList() {
      const res = await this.$request.get("/dialog");
      this.list = res.data;
      console.log("this.list: ", this.list);
    }
  }
};
</script>
