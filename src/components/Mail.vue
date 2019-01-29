<template>
  <div class="list_item flex column j-between" :class="isRead ? 'read' :''" @tap="toMail">
    
  </div>
</template>
<script>
export default {
  name: "Mail",
  props: {
    mail: {
      type: Object,
      requred: true
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    toMail() {}
  }
};
</script>

<style lang="less" scoped>

</style>