<template>
  <div class="position_top">
    <span class="paysize">角色名称：</span>
    <el-input
      v-model="pageInfo.posName"
      placeholder="请输入名字"
      style="margin-right: 30px; width: 180px; height: 36px"
    />
    <el-button @click="selectPosName()">查询</el-button>
  </div>
  <div class="position_content">
    <el-table
      :data="role"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="positionId" label="编号" width="80">
        <template #default="scope">{{ scope.row.positionId }}</template>
      </el-table-column>
      <el-table-column prop="positionName" label="角色名字" width="120" />
      <el-table-column prop="positionCode" label="角色编码" width="140" />
      <el-table-column prop="positionRemark" label="角色描述" width="200" />
      <el-table-column prop="positionCreated" label="创建时间" width="120" />
      <el-table-column prop="positionUpdated" label="修改时间" width="120" />
      <el-table-column prop="positionState" label="角色状态">
        <template #default="scope">
          <span v-if="scope.row.positionState == 0">可用</span>
          <span v-else>不可用</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.currentPage"
      :page-sizes="[2, 3, 6, 10]"
      :page-size="pageInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import qs from "qs";
import { ref, defineComponent } from "vue";
export default {
  data() {
    return {
      role: [],
      pageInfo: {
        stuname: ref(""),
        currentPage: 1,
        pagesize: 3,
        total: 0,
        posName: ref(""),
      },
    };
  },
  methods: {
    handleCurrentChange(page) {
      var _this = this;
      this.pageInfo.currentPage = page;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/position/selectPosition", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.role = response.data.records;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //总页数
    handleSizeChange(size) {
      var _this = this;
      this.pageInfo.pagesize = size;
      var ps = qs.stringify(this.pageInfo);
      this.axios
        .get("http://localhost:8088/TSM/position/selectPosition", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.role = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 查询用户
    selectPosName() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/position/selectPosition", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.flesh();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 刷新方法
    flesh() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/position/selectPosition", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response);
          _this.role = response.data.records;
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
      .get("http://localhost:8088/TSM/position/selectPosition", {
        params: this.pageInfo,
      })
      .then(function (response) {
        console.log(response);
        _this.role = response.data.records;
        _this.pageInfo.total = response.data.total;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
.position_top {
  height: 60px;
  width: 100%;
  background-color: white;
  margin-bottom: 30px;
  line-height: 60px;
}

.position_top .el-input__inner {
  height: 36px;
}

.position_top .el-button {
  width: 100px;
  background: #f60;
  color: white;
  border: 1px solid white;
  text-align: center;
}
.position_top .el-button:hover {
  background: #ff5500;
}
</style>
