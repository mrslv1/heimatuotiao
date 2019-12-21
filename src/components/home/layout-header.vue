<template>
<!-- el-row -->
  <el-row class="layout-header" type="flex" align="middle">
      <el-col class="left" :span="12">
          <i class="el-icon-s-fold"></i>
          <span>江苏传智博客教育科技股份有限公司</span>
      </el-col>
      <el-col class="right" :span="12">
          <el-row type="flex" justify="end" align="middle">
              <img :src="userlnfo.photo ? userlnfo.photo : '../../assets/img/2020.png'" alt="">
              <!-- 下拉菜单 -->
              <el-dropdown>
                  <!-- 匿名插槽  下拉菜单的内容 -->
                <span>{{userlnfo.mame}}</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>git管理</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>

                </el-dropdown-menu>
              </el-dropdown>
          </el-row>
      </el-col>

  </el-row>
</template>

<script>

export default {
  data () {
    return {
      userlnfo: {}, // 定义一个用户对象
      defaultlmg: require('../../assets/img/2020.png') // 先将图片传换成了一个变量
    }
  },
  created () {
    let token = localStorage.getItem('user-token') // 获取用户令牌
    this.$axios({
      url: '/user/profile',
      headers: {
        // header 的参数
        Authorization: `Bearer ${token} `
      }
    }).then(result => {
      this.userlnfo = result.data.data
    })
  }
}
</script>

<style lang="less" scoped>
.layout-header {
    height: 60px;
    .left {
        font-size: 20px;
        span {
        color: #2c3e50;
        margin-left: 4px;
        font-size: 16px;

        }
    }
    .right{
        img{
            width: 70px;
            height: 50px;
            border-radius: 50%;
            margin-right: 5px;
        }
    }
}

</style>
