<template>
    <div>1</div>
</template>

<script>
import {errors} from "@/utils/errors";

export default {
    async onShow(){
        let data = await errors();
        console.log(data);
    }
}
</script>

<style lang="less" scoped>

</style>
