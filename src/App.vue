<template>
  <div class="box">
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
  </div>
</template>

<script>
// 导入封装好的axios请求
import { hickyGet, hickyPost } from "./hicky/index";
export default {
  data() {
    return {
      imgList: [],
      list: [],
      input: "",
      obj: {}
    };
  },
  async created() {
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
    logId(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  width: 800px;
  margin: 300px auto;
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
