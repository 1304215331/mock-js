<template>
    <div class="a">
        <p>{{$store.state.count}}</p>
        <el-button  type="primary" round @click="toFather">点我该改变vuex的数据</el-button>
    </div>
    
</template>

<script>
export default {
    props:['value'],
    data(){
        return{
        }
    },
    created(){
    },
    methods:{
        toFather(){
            this.$emit('alter')
        }
    }
}
</script>

<style lang="less">
    .a{
        margin-top: 50px;
    }
</style>