<template>
  <el-card>
    <!-- 头部 -->
    <bread-crumb slot="header">
        <template slot="title">账户信息</template>
    </bread-crumb>
    <!-- 表单容器 -->
    <el-form :model="formData" style="margin-left:100px" label-width="100px">
        <el-form-item prop="name" label="用户名:">
            <el-input v-model="formData.name" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item label="简介:">
            <el-input v-model="formData.intro" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
            <el-input v-model="formData.email" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
            <el-input v-model="formData.mobile" disabled style="width:40%"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">保存信息</el-button>
        </el-form-item>
    </el-form>
    <!-- 上传组件 -->
    <el-upload class="head-upload" action="" :show-file-list="false">
        <img :src="formData.photo ? formData.photo : defaultlmg" alt="">
    </el-upload>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      defaultlmg: require('../../assets/img/chihuo.jpg')
    }
  },
  methods: {
    // 获取用户个人信息
    getUserlnfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
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
