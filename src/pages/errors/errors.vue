<template>
    <div>1</div>
</template>

<script>
import {errors} from "@/utils/errors";

export default {
    methods: {
        error(){
            errors() 
        }
    },
    onShow(){
        this.error();
    }
}
</script>

<style lang="less" scoped>

</style>
