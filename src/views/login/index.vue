<template>
  <div class="login">
    <audio src="../../assets/audio/ไทย - ᥓᥣᥭᥰ ᥟᥣᥢ ᥐᥧᥭᥱ.mp3">
    <!-- autoplay="autoplay -->
    </audio>
    <!-- 卡片组件 -->
    <el-card class="login-caed">
      <!-- log图片 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
        <!-- 放置表单 -->
        <el-form>
          <!-- el-form 表单 -->
          <el-form-item>
            <!-- el-form-item  表单域 -->
            <el-input placeholder="请输入手机号"></el-input>
            <!-- el-input input 框 -->
          </el-form-item>
          <el-form-item>
            <!-- el-form-item  表单域 -->
            <el-input class="input" placeholder="请输入验证码"></el-input>
            <!-- el-input input 框 -->

           <el-button plain style="float: right;">获取验证码</el-button>
          </el-form-item>
          <el-checkbox v-model="checked">你是否同意我们得霸王条款，麻利得选得了 反正得选</el-checkbox>

        </el-form>
        <el-row><el-button type="primary" style="width:100% ; margin-top: 40px; " plain>登录</el-button></el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: true
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  background-image: url('../../assets/img/log2.jpg');
  height: 100vh;
  /* vh 当前屏幕分为100份 */
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-caed {
    width: 440px;
    height: 350px;
    .title {
      // justify-content: center;
      text-align: center;
      margin-bottom: 30px;
      img {
        height: 45px;

      }

    }
  }
  .input {
    width: 60%;
  }
}
</style>
