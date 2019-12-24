<template>
 <!-- 卡片组件 -->
 <el-card>
     <bread-crumb slot="header">
     <!-- 插槽内容 -->
     <template slot="title">
         评论管理
     </template>
     </bread-crumb>
     <!-- 表格 -->
     <el-table :data="list">
         <!-- 放置列组件 -->
         <el-table-column prop="title" width="600" label="标题"></el-table-column>
         <el-table-column :formatter="formatterBoolean" prop="comment_status" label="评论状态"></el-table-column>
         <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
         <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
         <el-table-column label="操作">
             <template slot-scope="obj">
                <!-- 作用域插槽 -->
                  <el-button size="small" type="text">修改</el-button>
             <!-- 根据状态进行判断是否关闭 -->
                  <el-button @click="openOrCloseState(obj.row)" size="small" type="text"> {{ obj.row.comment_status ? '关闭' : '打开' }}评论</el-button>
             </template>
         </el-table-column>
     </el-table>
     <!-- 分页组件 -->
     <el-row type="flex" justify="center" align="middle" style="height:80px">
       <el-pagination background layout="prev, pager, next"  @current-change="changePage" :current-page="page.currentPage" :page-size="page.pageSize" :total="page.total">
       </el-pagination>
     </el-row>

 </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        // 分页信息数据
        total: 0, // 总页数
        pageSize: 10, // 每一页页数
        currentPage: 1 // 默认页面为1
      }
    }
  },
  methods: {
    // 页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage // 最新页码
      this.getComment()
    },
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 获取 总页数
      })
    },
    formatterBoolean (row, column, cellValue, index) {
    // row  当前数据
    // column  当前列信息
    // cellvalue  当前的单元格的值
    // index  索引
      return cellValue ? '正常' : '关闭'
    // if (cellValue) {
    //   return '正常'
    // } else {
    //   return '关闭'
    // }
    },
    // 打开或者关闭评论
    openOrCloseState (row) {
    // 直接调用接口
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`确定${mess}评论吗？`, '提示', {
      }).then(() => {
        // 调接口
        this.$axios({
          method: 'put',
          url: '/commebts/status',
          params: { articles_id: row.id.toString() },
          // 取反：打开状态就关闭  关闭打开
          data: { allow_comment: !row.comment_status }
        }).then(result => {
          // 执行成功
          this.getComment() // 重新拉去数据
        })
      })
    }
  },
  // 定义一个格式化的函数

  // 打开评论或者关闭

  created () {
    this.getComment() // 获取数据
  }

}
</script>

<style>

</style>
