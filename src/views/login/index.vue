<template>
  <div class="login">
    <div class="box">
      <div class="flex">
        <el-input placeholder="请输入账号" v-model="ursename" clearable></el-input>
      </div>
      <div class="flex">
        <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
      </div>
      <div class="flex">
        <el-button type="primary" @click="register">登录</el-button>
        <el-button type="primary" @click="zhuce">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
/* 导入封装好的axios */
import { hickyGet, hickyPost } from "../../hicky/index";
export default {
  data() {
    return {
      ursename: "15116703172",
      password: "xieyu8888"
    };
  },
  methods: {
    async register() {
      if (this.ursename.length !== 11) {
        this.$message.error("手机号必须为11位数哦");
        return;
      }
      if (this.password.length < 6 || this.password.length > 12) {
        this.$message.error("密码的长度不能小于6位或者大于12位");
        return;
      }
      let ursename = this.ursename;
      let password = this.password;
      let backData = await hickyPost("/login", { ursename, password });
      /* console.log(backData); */
      /* 登录成功 */
      if (backData.data.msg == "200") {
        this.$message({
          message: backData.data.information,
          type: "success"
        });
        this.$router.push({name: "index", params: {id:10}})
        this.$store.commit('addToken',10)
      }
      if (backData.data.msg == "201") {
        this.$message.error(backData.data.information);
      }
    },
    zhuce(){
     alert('此功能暂未开通')
    }
  },
  created() {},
  components: {}
};
</script>
<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
}
.login {
  width: 100%;
  height: 100%;
  background: url("https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2109031356,2106210903&fm=26&gp=0.jpg");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 600px;
    height: 300px;
    box-sizing: border-box;
    .flex {
      margin-top: 30px;
    }
  }
}
</style>