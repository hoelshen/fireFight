<template>
    <div>
        <div v-for="item in data" :key="item._id">
            <div>
                _id:{{item._id}}
            </div>
            <br/>
            <div class="userid">
                _openid:{{item._openid}}
            </div>
            <br/>
            <div>
                body:{{item.body}}
            </div>
            <br/>
            <div class="time">
                createdAt:{{item.createdAt}}
            </div>
            <br/>
            <div>
                lauchOpts:{{item.lauchOpts}}
            </div>
            <br/>
            <div class="mess">
                message:{{item.message}}
            </div>
            <br/>
            <div>
                systemInfo:{{item.systemInfo}}
            </div>
        </div>        
    </div>
</template>

<script>
import {errors} from "@/utils/errors";

export default {
    data(){
        return{
            data:[]
        }
    },
    async onShow(){
        let result = await errors();
        const { result:{ data } } = result;
        this.data = data;
        // console.log("data", data);
    }
}
</script>

<style lang="less" scoped>
    .userid{
        background-color: orange
    }
    .mess{
        background-color: aqua
    }
    .time{
        background-color: red;
    }
</style>
