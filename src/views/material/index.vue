<template>
<!-- 素材管理 -->
  <el-card>
      <!-- 头部内容 -->
      <bread-crumb slot="header">
      <template slot="title">
          素材管理
      </template>
      </bread-crumb>
      <el-row type="flpe" justify="end">
        <el-upload action="" :http-request="uploadilmg" :show-file-list="false">
          <el-button size="small" type="primary">上传图片</el-button>
        </el-upload>
      </el-row>
      <!-- 标签页 -->
      <el-tabs v-model="activeName" @click="changeTab">
          <!-- 标签 -->
          <el-tab-pane label="全部图片" name="all">
          <!-- 生成页面结构 -->
            <div class="img-list">
                <!-- for  堆数据遍历 -->
                <el-card class="img-card" v-for="item in list" :key="item.id">
                    <img :src="item.url" alt="">
                    <el-row class="operate" type="flex" align="middle" justify="space-around">
                        <!-- 根据当前是否收藏的状态来决定  是否给字体颜色 -->
                        <i @click="collectOrCancel(item)" :style="{color:item.is_collected ?'red' : '#000'}" class="el-icon-star-on"></i>
                        <i @click="delMaterial(item.id)" class="el-icon-delete-solid"></i>
                    </el-row>
                </el-card>
            </div>

          </el-tab-pane>
          <el-tab-pane label="收藏图片" name="collect">
              <div class="img-list">
                  <el-card class="img-card" v-for="item in list" :key="item.id">
                      <img :src="item.url" alt="">
                  </el-card>
              </div>
          </el-tab-pane>
      </el-tabs>
      <!-- 公共分页组件 -->
            <el-row type="flex" justify="center">
                 <el-pagination
               :current-page="page.currentPage"
               :page-size="page.pageSize"
               :total="page.total"
               @current-change="changePage"
               background
               layout="prev, pager, next"
              >
           </el-pagination>
            </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前选中的标签
      list: [], //  接受素材数据
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },

  methods: {
    // 删除图片素材
    delMaterial (id) {
      this.$confirm('你真的要删除吗').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${id}`
        }).then(() => {
          this.getMaterial() // 重新拉取数据
        })
      })
    },
    // 取消或收藏
    collectOrCancel (item) {
      this.$axios({
        method: 'put',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected // 取反  点收藏就是取消
        }
      }).then(result => {
        this.getMaterial() // 重新拉取数据
      })
    },
    // 上传图片的
    uploadilmg (params) {
      this.logding = true // 弹层
      let data = new FormData()
      data.append('image', params.file) // 文件放到参数中
      this.$axios({
        method: 'post',
        url: '/user/images',
        data
      }).then(result => {
        this.logding = false // 关闭弹层
        this.getMaterial() // 直接调用拉取数据的方法
      })
    },
    //   改变页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    //   切换页签
    changeTab () {
      this.page.currentPage = 1 // 重置到第一页
      this.getMaterial() // 调用获取数据方法
    },
    //   获取素材的
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.currentPage,
          per_page: this.page.pageSize,
          collect: this.activeName === 'collect'
          // false是获取所有的数据，true 获取收藏数据
        }
      }).then(result => {
        this.list = result.data.results // 获取图片数据  可能是全部  页可能是收藏
        this.page.total = result.data.total_count // 总条数
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list{
    display: flex;
    flex-wrap: wrap;
    .img-card{
        width: 200px;
        height: 250px;
        margin: 20px 40px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
        .operate{
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
            font-size: 22px;
            height: 60px;
            background-color: #f4f5f6;
            i{
              cursor: pointer;
            }
        }
    }
}

</style>
