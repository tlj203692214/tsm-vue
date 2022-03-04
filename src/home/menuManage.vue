<template>
  <!-- 名称搜索框 -->
  <div class="nav_top">
    <span class="paysize">权限名称：</span>
    <el-input
      v-model="pageInfo.navName"
      placeholder="请输入权限名字"
      style="margin-right: 30px; width: 180px; height: 36px"
    />
    <el-button @click="selectPosName()" style="height: 36px; margin-top: 10px">
      <search
        style="width: 1em; height: 1em; margin-right: 8px"
      />查询</el-button
    >
    <el-button @click="insertPopup(), selectPid()">
      <plus
        style="width: 1em; height: 1em; margin-right: 8px"
      />添加权限</el-button
    >
  </div>
  <!-- 权限表格显示数据 -->
  <div class="position_content">
    <el-table
      :data="nav"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
      :row-style="{ height: '23px' }"
      :cell-style="{ padding: '0px' }"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="navigationId" label="编号">
        <template #default="scope">{{ scope.row.navigationId }}</template>
      </el-table-column>
      <el-table-column prop="navigationName" label="权限名字" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="updatePopup(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" @click="deletePopup(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 添加弹窗 -->
  <el-dialog title="权限添加" center v-model="navDialogVisible" @close="rest('naviation')">
    <el-form ref="naviation" :model="naviation" :rules="rules">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="权限名字:" prop="navName">
            <el-input v-model="naviation.navName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="选择父id：" prop="navPid">
            <el-select v-model="naviation.navPid" placeholder="请选择父级菜单">
              <el-option
                v-for="item in pid"
                :key="item.navigationId"
                :label="item.navigationName"
                :value="item.navigationId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <div class="foot-button">
          <el-button @click="rest('naviation')">取消</el-button>
          <el-button type="primary" @click="insertNav('naviation')"
            >确认</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 修改的弹窗 -->
  <el-dialog title="权限修改" center v-model="updateNavDialogVisible">
    <el-form
      ref="navInfo"
      :model="navInfo"
      :rules="rules"
      :label-position="right"
    >
      <input type="text" :value="navInfo.navigationId" style="display: none" />
      <el-row gutter="24">
        <el-col :span="12">
          <el-form-item label="权限名字：">
            <el-input v-model="navInfo.navigationName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="父id：">
            <el-input v-model="navInfo.navigationPid"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row gutter="24">
        <el-col :span="12">
          <el-form-item label="路由路径：">
            <el-input v-model="navInfo.navigationUrl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权限图标：">
            <el-input v-model="navInfo.navigationIcon"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <div class="foot-button">
          <el-button @click="updateNavDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateNav()">确认</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 删除弹窗 -->
  <el-dialog v-model="menuDel" title="提示" width="30%">
    <span>确定删除【{{ navInfo.navigationName }}】权限？</span>
    <template #footer>
      <el-button @click="menuDel = false">取消</el-button>
      <el-button type="primary" @click="deleteNav()">确定</el-button>
    </template>
  </el-dialog>
  <!-- 页数 -->
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
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      nav: [],
      pid: [],
      isNavName: true,
      navDialogVisible: false,
      updateNavDialogVisible: false,
      menuDel: false,
      navInfo: {
        navigationId: "",
        navigationName: "",
        navigationPid: "",
        navigationUrl: "",
        navigationIcon: "",
      },
      pageInfo: {
        currentPage: 1,
        pagesize: 3,
        total: 0,
        navName: ref(""),
      },
      naviation: {
        navName: "",
        navPid: "",
      },
      rules: {
        navName: [
          {
            required: true,
            message: "名字不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 新增弹窗方法
    insertPopup() {
      this.navDialogVisible = true;
    },
    // 修改按钮的弹窗和修改方法
    updatePopup(row) {
      this.updateNavDialogVisible = true;
      this.navInfo = row;
    },
    // 删除弹窗
    deletePopup(row) {
      this.navInfo.navigationId = row.navigationId;
      this.navInfo.navigationName = row.navigationName;
      this.menuDel = true;
    },
    //, 新增权限
    insertNav(naviation) {
      this.$refs[naviation].validate((valid) => {
        if (valid) {
          for (var i = 0; i < this.nav.length; i++) {
            if (this.nav[i].navigationName == this.navInfo.navigationName) {
              this.isNavName = false;
            } else {
              this.isNavName = true;
            }
          }
          if (this.isNavName == false) {
            ElMessage({
              message: "该权限已存在,请重新输入！",
              type: "warning",
            });
          } else {
            this.axios
              .post("http://localhost:8088/TSM/navigation/insertNav", {
                navigationName: this.naviation.navName,
                navigationPid: this.naviation.navPid,
              })
              .then((res) => {
                console.log(res.data);
                ElMessage({ message: "添加成功", type: "success" });
                this.flesh();
                this.navDialogVisible = false;
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        } else {
          return false;
        }
      });
    },
    // 修改权限方法
    updateNav() {
      this.axios
        .post("http://localhost:8088/TSM/navigation/updateNav", {
          navigationId: this.navInfo.navigationId,
          navigationName: this.navInfo.navigationName,
          navigationPid: this.navInfo.navigationPid,
          navigationUrl: this.navInfo.navigationUrl,
          navigationIcon: this.navInfo.navigationIcon,
        })
        .then((res) => {
          console.log("修改成功" + res);
          this.updateNavDialogVisible = false;
          this.flesh();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 删除权限的方法
    deleteNav() {
      this.axios
        .post("http://localhost:8088/TSM/navigation/deleteNav", {
          navigationId: this.navInfo.navigationId,
        })
        .then((res) => {
          console.log(res);
          console.log("删除成功");
          this.flesh();
          this.menuDel = false;
          // this.menuDel = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 查询权限的父id
    selectPid() {
      this.axios
        .get("http://localhost:8088/TSM/navigation/selectPid")
        .then((res) => {
          this.pid = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 取消按钮的清空方法
    rest(naviation) {
      this.$refs[naviation].resetFields();
      this.navDialogVisible = false;
    },
    handleCurrentChange(page) {
      var _this = this;
      this.pageInfo.currentPage = page;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/navigation/selectNavigationAll", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.nav = response.data.records;
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
        .get("http://localhost:8088/TSM/navigation/selectNavigationAll", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.nav = response.data.records;
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
        .get("http://localhost:8088/TSM/navigation/selectNavigationAll", {
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
        .get("http://localhost:8088/TSM/navigation/selectNavigationAll", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response);
          _this.nav = response.data.records;
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
      .get("http://localhost:8088/TSM/navigation/selectNavigationAll", {
        params: this.pageInfo,
      })
      .then(function (response) {
        console.log(response);
        _this.nav = response.data.records;
        _this.pageInfo.total = response.data.total;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
.nav_top {
  height: 60px;
  width: 100%;
  background-color: white;
  margin-bottom: 30px;
  line-height: 60px;
}

.nav_top .el-input__inner {
  height: 36px;
}

.nav_top .el-button {
  height: 36px;
  margin-top: 10px;
  width: 110px;
  background: #f60;
  color: white;
  border: 1px solid white;
  text-align: center;
}
.nav_top .el-button:hover {
  background: #ff5500;
}
.foot-button {
  text-align: center;
}
.el-dialog__body {
  padding: calc(var(--el-dialog-padding-primary) + 5px)
    var(--el-dialog-padding-primary);
}
</style>
