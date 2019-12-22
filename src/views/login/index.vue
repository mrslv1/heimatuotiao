<template>
  <div class="login">
    <audio src="../../assets/audio/ไทย - ᥓᥣᥭᥰ ᥟᥣᥢ ᥐᥧᥭᥱ.mp3" autoplay>
    <!-- autoplay="autoplay  -->
    </audio>
    <!-- 卡片组件 -->
    <el-card class="login-caed">
      <!-- log图片 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
        <!-- 放置表单 -->
        <el-form ref="myForm" :model="loginForm" :rules="loginRules">
          <!-- el-form 表单 -->
          <el-form-item prop="mobile">
            <!-- el-form-item  表单域 -->
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
            <!-- el-input input 框 -->
          </el-form-item>
          <el-form-item prop="code">
            <!-- el-form-item  表单域 -->
            <el-input v-model="loginForm.code" class="input" placeholder="请输入验证码"></el-input>
            <!-- el-input input 框 -->
           <el-button plain style="float: right;">获取验证码</el-button>

          </el-form-item>
          <el-form-item prop="check">
            <el-checkbox v-model="loginForm.check">你是否同意我们得霸王条款，麻利得选得了 反正得选</el-checkbox>

          </el-form-item>

         <el-form-item>
           <el-button @click="submitLogin" type="primary" style="width:100% ;" plain>登录</el-button>
         </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否勾选
      },
      loginRules: {
        // 验证规则
        mobile: [{ required: true, message: '请输入你的手机号' }, {
          pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号'
        }],
        code: [{ required: true, message: '请输入您的验证码' }, {
          pattern: /^\d{6}$/, message: '验证码为6位数字'
        }],
        check: [{ validator: function (rule, value, callback) {
          // 自定义校验规则
          // rule  规则没啥用
          // value 要校验的字段的值
          // callback 是一个回调函数
          if (value) {
            // 认为已经勾选
            callback()
          } else {
            // 认为没有勾选
            callback(new Error('你必须同意我们的霸王条款，要不不带你玩'))
          }
        } }]
      },

      checked: true
    }
  },
  methods: {
    submitLogin () {
      // 手动校验
      this.$refs.myForm.validate((isOk) => {
        if (isOk) {
          //  说明校验通过 调接口
          this.$axios({
            url: 'authorizations', // 请求地址   默认get 类型
            method: 'post',
            data: this.loginForm // body参数
          }).then(result => {
            // 正确结果  前端缓存 前端缓存 登录成功返回给我们令牌
            window.localStorage.setItem('user-token', result.data.token)
            this.$router.push('/home') // 登录成功后到hone页面
          })
        }
      })
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
