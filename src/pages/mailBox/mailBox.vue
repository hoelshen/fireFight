<template>
    <view>
        <div>封信正在邮寄的路上</div>
        <div>
            
            <div>

                <span>sjh </span>
                <span>收</span>
                <span></span>
            </div>
        </div>
    </view>


</template>
<script>
export default {
    data(){
        const day = this.$day().format('YYYY/MM/DD');
        return{
            days:day
        }
    },
    onShow(){
        console.log(this.days);
    }
}
</script>
