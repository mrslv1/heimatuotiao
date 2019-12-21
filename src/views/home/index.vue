<template>

 <!-- 大容器 -->
 <el-container>
   <!-- 左右 -->
   <el-aside style="height:100vh; background-color:#353b4e" width="230px">
     <layout-aside></layout-aside>
   </el-aside >
   <!-- 右侧 -->
   <el-container>
     <!-- 上下布局 -->
     <el-header>
       <!-- 头部 -->
       <layout-header></layout-header>
      </el-header>
     <el-main>
       主要区域
     </el-main>
   </el-container>
 </el-container>
</template>

<script>

export default {

}
</script>

<style lang="less" scoped>

</style>
