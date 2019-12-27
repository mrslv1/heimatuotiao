<template>
  <el-card class="articles">
      <bread-crumb slot="header">
        <template slot="title">文章列表</template>
      </bread-crumb>
      <!-- 表单容器 -->
      <el-form style="padding-left:px">
          <el-form-item label="文章状态:">
              <!-- 单选组 -->
              <el-radio-group v-model="searchForm.status">
                  <el-radio :label="5">全部</el-radio>
                  <el-radio :label="0">草稿</el-radio>
                  <el-radio :label="1">待审核</el-radio>
                  <el-radio :label="2">审核通过</el-radio>
                  <el-radio :label="3">审核失败</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="频道列表:">
              <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
                  <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="时间选择:">
              <!-- 日期选择器 -->
              <el-date-picker v-model="searchForm.dateRange" type="daterange"></el-date-picker>
          </el-form-item>
      </el-form>
      <el-row class="total" type="flex" align="middle">
          <span>共找到10000条符合条件的内容</span>
      </el-row>
      <div class="articles-item" v-for="item in 100" :key="item">
          <!-- 左侧 -->
          <div class="left">
              <img src="../../assets/img/log.jpg" alt="">
              <div class="info">
                  <span class="tag">89期的妹妹们，哈哈哈哈哈哈哈哈哈哈</span>
                  <el-tag class="date">标签一</el-tag>
                  <span>2019-12-24 15:07:01</span>
              </div>
          </div>
          <!-- 右侧 -->
          <div class="right">
              <span class="el-icon-edit">修改</span>
              <span class="el-icon-delete">删除</span>
          </div>
      </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 默认选择
        channel_id: null, // 默认不选中任何一个分类
        dateRange: [] // 日期范围
      },
      channels: [], // 接受所有的频道
      list: []
    }
  },
  methods: {
    //   获取所有的频道
    getChannels () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 获取文章列表数据
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        this.list = result.data.results // 获取文章列表
      })
    }
  },
  created () {
    this.getChannels() // 获取文章数据
    this.getArticles() // 获取文章列表数据
  }
}
</script>

<style lang="less" scoped>
    .articles{
        .total{
            height: 60px;
            border-bottom: 1px dashed #ccc;
        }
        .articles-item{
            display: flex;
            justify-content: space-between;
            padding: 20px 0;
            border-bottom: 1px solid #f2f3f5;
            .left{
                display: flex;
                img{
                    width: 180px;
                    height: 100px;
                    border-radius: 5px;
                }
                .info{
                    height: 100px;
                    margin-left: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    .date{
                        color: #999;
                        font-size: 12px;
                    }
                    // .tag{

                    //     height: 35px;
                    //     text-align: center;
                    //     line-height: 35px;
                    // }
                    .date{
                        width: 60px;
                        height: 35px;
                        line-height: 35px;
                        text-align: center;
                    }
                }
            }
            .right{
                cursor: pointer;
                span{
                    font-size: 14px;
                    margin: 0 5px;
                }
            }
        }
    }

</style>
