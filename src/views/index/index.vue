<template>
  <div class="box" >
    <div class="flex_aa" v-if="user">
        <div><p style="color:#323232">欢迎</p>{{user.name}}</div>
        <img :src="user.img" alt="">
    </div>
     <el-button type="primary" plain @click="delData" class="right">退出登录</el-button>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item,index) in imgList" :key="index">
        <!--  <h3 class="medium">{{ item.imgUrl }}</h3> -->
        <img :src="item.imgUrl" alt @click="logId(item.id)" />
      </el-carousel-item>
    </el-carousel>
    <div v-for="(item,index) in list" :key="index" class="flex">
      <i>{{item.title}}</i>
      <i>{{item.label}}</i>
    </div>
    <el-input
      v-model="input"
      placeholder="请输入手机号码"
      @keyup.enter.native="goAxios"
      class="margin_top20"
    ></el-input>
    <!--  <input type="text" name="" v-model="input" id="" @keyup.enter="goAxios" class="margin_top20" placeholder="请输入提示内容"> -->
    <div v-if="obj">
      <div>{{obj.name}}</div>
      <img :src="obj.url" alt />
    </div>
    <div @click="goPost">点我发送post请求</div>
    <!-- 子组件  son -->
    <son :value="isShow" @alter="alter"></son>
  </div>
</template>

<script>
// 导入封装好的axios请求
import { hickyGet, hickyPost } from "../../hicky/index";
// 导入子组件son
import son from "../../components/son"
export default {
  data() {
    return {
      imgList: [],
      list: [],
      input: "",
      obj: {},
      isShow: true,
      user:{}
    };
  },
  async created() {
    let token = this.$store.state.token
    console.log(token);
    
    if(!token){
      this.$router.push("/")
      this.$message.error("请先登录");
    }
    if(token){
      let backData1 = await hickyGet('/index',{id:this.$store.state.token})
      if(backData1.status == '200'){
        this.user = backData1.data
      }
    }
    // 利用mack弄的假数据  3张图片
    let backData = await hickyGet("/swipes");
    if (backData.status == "200") {
      this.imgList = backData.data;
    }
    // 信息
    let res = await hickyGet("/patients");
    if (res.status == "200") {
      this.list = res.data;
    }
  },
  methods: {
    async goAxios() {
      let res = await hickyGet("/main.index", { key: this.input });
      if (res.data.msg == "200") {
        this.obj = res.data;
        this.$notify({
          title: "成功",
          message: "获取成功",
          type: "success"
        });
      } else {
        this.$notify.error({
          title: "错误",
          message: res.data.error
        });
        this.obj = {};
      }
    },
    async goPost() {
      let backData = await hickyPost("/study", { id: "10", name: "谢宇" });
      if (backData.status == "200") {
        console.log(backData);
      }
    },
    delData(){
      this.$store.commit('delToken')
      this.$router.push("/")
    },
    logId(e) {
      console.log(e);
    },
    /* 子组件传过来的事件 */
    alter(){
      /* this.$store.commit('increment') */  /* mutations方法 */
      /* console.log(this.$store.getters.setCount)  */  /* 打印为数字0  getters方法 */
      /* this.$store.dispatch('add') */  /* actions方法  用来操作mutations来执行异步代码 */
    }
  },
  components:{
    son
  }
};
</script>

<style lang="less" scoped>
.box {
  width: 800px;
  margin: 160px auto;
  .right{
    position: absolute;
    right: 280px;
    top: 28px;
  }
  .flex_aa{
    display: flex;
    position: absolute;
    top: 20px;
    right: 400px;
    height: 50px;
    width: 130px;
    justify-content: space-between;
    align-items: center;
    div{
      font-size: 14px;
      color: #409EFF;
      p{
        display: inline;
        margin-right: 5px;
      }
    }
    img{
      width: 50px;
      height: 50px;
      border-radius: 25px;
    }
  }
  .box img {
    width: 100%;
    height: 100%;
  }
  .flex {
    width: 300px;
    display: flex;
    justify-content: space-between;
    color: red;
    font-size: 30px;
  }
  .margin_top20 {
    margin-top: 20px;
  }
  /* elmentUi 样式 */
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
