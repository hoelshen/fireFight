<template>



</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        onEusre(){
            this.$router.push({query:{active: "home"},path: "/pages/home/index"})
        }
    },
}
</script>
