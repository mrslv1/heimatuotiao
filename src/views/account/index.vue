<template>
  <el-card v-loading="loading">
    <!-- 头部 -->
    <bread-crumb slot="header">
        <template slot="title">账户信息</template>
    </bread-crumb>
    <!-- 表单容器 -->
    <el-form ref="myFrom" :model="formData" :rules="rules" style="margin-left:100px" label-width="100px">
        <el-form-item prop="name" label="用户名:">
            <el-input v-model="formData.name" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item prop="intro" label="简介:">
            <el-input v-model="formData.intro" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱:">
            <el-input v-model="formData.email" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号:">
            <el-input disabled v-model="formData.mobile" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="saveUserlnfo" type="primary">保存信息</el-button>
        </el-form-item>
    </el-form>
    <!-- 上传组件 -->
    <el-upload :http-request="uploadlmg" class="head-upload" action="" :show-file-list="false">
        <img :src="formData.photo ? formData.photo : defaultlmg" alt="">
    </el-upload>
</el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      loading: false,
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      defaultlmg: require('../../assets/img/chihuo.jpg'),
      rules: {
        // 用户名  邮箱
        name: [{ required: true, message: '用户名不能为空' }, {
          min: 1, max: 7, message: '用户名长度在1到7'
        }],
        email: [{ required: true, message: '邮箱不能为空' }, {
          pattern: /^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/,
          message: '邮箱格式不正确'
        }]
      }
    }
  },
  methods: {
    // 头像上传更新
    uploadlmg (params) {
      this.loading = true // 打开弹层
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        this.loading = false // 关闭弹层
        this.formData.photo = result.data.photo //  给当前头像赋值
      })
    },
    // 获取用户个人信息
    getUserlnfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    },
    //   保存用户信息
    saveUserlnfo () {
      this.$refs.myFrom.validate().then(result => {
        // 调用保存接口
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(result => {
          this.$message({
            type: 'success',
            message: '保存用户信息成功'
          })
          // 保存成功后 通知头部更新
          eventBus.$emit('updateUserlnfo')
        })
      })
    }
  },
  created () {
    this.getUserlnfo()
  }
}

</script>

<style lang='less' scoped>
    .head-upload{
        position: absolute;
        right: 210px;
        top: 150px;
        img{
            width: 400px;
            height: 300px;
            border-radius: 50%;
        }
    }
</style>
