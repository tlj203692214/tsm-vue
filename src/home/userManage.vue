<template>
  <div>
    <div class="user_top">
      <el-button>新增</el-button>
      <el-button>删除</el-button>
    </div>
    <div class="user_content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<style>
.user_top {
  width: 100%;
  height: 60px;
  background: #e5e5e5;
  margin-bottom: 30px;
  line-height: 60px;
}

.user_top .el-button {
  width: 100px;
  background: #f60;
  color: white;
  text-align: center;
}

</style>
