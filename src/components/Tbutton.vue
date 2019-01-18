<template>
  <div @click="sjh">
    <form
      class="flex"
      @submit="mail"
      report-submit="true"
    >
      <button
        class=" flex column center"
        form-type="submit"
      >
        <image
          class="mail"
          src="/static/svgs/mail_tab.svg"
        />
      </button>
    </form>

  </div>

</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    sjh() {
      console.log("sjh: ");
    },
    mail(e) {
      this.$router.push("page/mail/index");
    }
  }
};
</script>
