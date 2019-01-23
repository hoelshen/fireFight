<template>
  <view>
    <div>封信正在邮寄的路上</div>
    <div>

      <session class="list">
        <div
          class="list_item flex column j-between"
          v-for="(item,index) in list"
          @click="show(index)"
          :key="index"
        >
          <div class="list_item-sendName flex wrap j-between">
            <div class="flex column j-between">
              <div class="list_item-receiverName">
                <span class="list_item-receiverNameSpan">{{item.aliasName}}</span>
                <span>收</span>
              </div>
              <div class="list_item-content ">
                <span>{{item.content}}</span>
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

          <div class="list_item-sendName flex j-end">
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
      days: day
    };
  },
  onShow() {
    console.log(this.days);
    this.getList();
  },
  methods: {
    async getList() {
      const res = await this.$request.get("/dailog");
      this.list = res.data;
      console.log("this.list: ", this.list);
    }
  }
};
</script>
