<template>
  <div>
    <div class="query-form" style="margin-top: 15px">
      <el-input
        v-model="pageInfo.input"
        placeholder="请输入内容"
        class="input-with-select"
        style="width: 32.5rem"
      >
        <template #prepend> 部门名称 </template>
        <template #append>
          <el-button :icon="Search" @click="depts()"></el-button>
        </template>
      </el-input>
      <el-button id="xzstaff"> + 新增部门 </el-button>
    </div>
    <div class="showTableData">
      <el-table
        ref="mt"
        :data="deptData"
        @selection-change="handeselect"
        style="width: 100%"
      >
        <el-table-column width="100"></el-table-column>
        <el-table-column prop="deptId" label="部门编号">
          <template #default="scope">ID:{{ scope.row.deptId }}</template>
        </el-table-column>
        <el-table-column prop="deptName" label="部门名称"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="text" style="color: #f60">编辑</el-button>
            <el-button type="text" style="color: #f60">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-sizes="[3, 6, 9]"
          :page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Search } from "@element-plus/icons";
const radio = ref(3);
</script>
<script lang="ts">
import qs from "qs";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      deptData: [],
      pageInfo: {
        input: "",
        currentPage: 1,
        pagesize: 3,
        total: 0,
      },
    };
  },
  methods: {
    depts() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/dept/depts", { params: this.pageInfo })
        .then(function (response) {
          console.log(response.data);
          _this.deptData = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleCurrentChange(page) {
      var _this = this;
      this.pageInfo.currentPage = page;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/dept/depts", { params: this.pageInfo })
        .then(function (response) {
          console.log("1-------------------------------------------");
          console.log(response.data);
          _this.deptData = response.data.records;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleSizeChange(size) {
      var _this = this;
      this.pageInfo.pagesize = size;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/dept/depts", { params: this.pageInfo })
        .then(function (response) {
          console.log("2-------------------------------------------");
          console.log(response.data);
          _this.deptData = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    var _this = this;
    this.axios
      .get("http://localhost:8088/TSM/dept/depts", { params: this.pageInfo })
      .then(function (response) {
        console.log(response.data);
        _this.deptData = response.data.records;
        _this.pageInfo.total = response.data.total;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
.query-form {
  background: #fff;
  margin-bottom: 12px;
  padding: 12px 16px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
#xzstaff {
  color: #ffffff;
  margin-left: 1rem;
  background-color: #ff6600;
  border: none;
}
#xzstaff:hover {
  background-color: #ff7e00;
}
.showTableData {
  background: #fff;
  padding: 14px;
}
</style>
