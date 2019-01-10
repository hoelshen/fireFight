<template>
    <div v-for="(item, i) in list" :key="item">
    {{ i }} - <slot :item="item"></slot>
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[
            {
                name: 'sjh',
                sex: 'nan',
                age: '4'
            },{
                name: 'unclexiao',
                sex: 'nan',
                age: '5'
            }]
        }
    }
}
</script>
