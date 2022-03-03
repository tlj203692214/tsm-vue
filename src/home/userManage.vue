<template>
  <div>
    <div class="user_top">
      <div class="user_section">
        <span>用户名字：</span>
        <el-input
          v-model="pageInfo.userName"
          placeholder="请输入用户名字"
        ></el-input>
      </div>
      <div class="user_button">
        <el-button @click="selectByName" style="height: 36px; margin-top: 10px">
          <search style="width: 1em; height: 1em; margin-right: 8px" />查询
        </el-button>
      </div>
    </div>

    <div class="user_content">
      <el-table
        :data="usertable"
        style="width: 100%"
        border
        :row-style="{ height: '23px' }"
        :cell-style="{ padding: '0px' }"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column label="用户id" prop="staffId">
          <template #default="sc">{{ sc.row.staffId }}</template>
        </el-table-column>
        <el-table-column
          prop="staffPosition_id"
          label="编号"
          width="80"
          v-if="show"
        >
          <template #default="scope">{{ scope.row.personalId }} </template>
        </el-table-column>
        <el-table-column prop="staffName" label="用户名字" />
        <el-table-column prop="deptName" label="部门名字" />
        <el-table-column prop="positionName" label="角色名字">
          <template #default="scope">
            <span v-if="scope.row.spDel == '1'"></span>
            <span v-else>{{ scope.row.positionName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="entryTime" label="入职时间" />
        <el-table-column prop="staffState" label="用户状态">
          <template #default="scope">
            <span v-if="scope.row.staffState == 1">不可用</span>
            <span v-else>可用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="text" @click="detailsUp(scope.row)"
              >详情</el-button
            >
            <el-button
              type="text"
              @click="toUserPopup(scope.row), selectPosition()"
              >分配角色</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <!-- 详情弹窗 -->
  <el-dialog v-model="centerDialogVisible" title="用户信息" center>
    <div id="details">
      <el-form :model="personal" :label-position="right" label-width="120px">
        <input type="text" :value="personal.personalId" style="display: none" />
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="用户名字：">
              <el-input v-model="personal.personalName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性别：">
              <el-radio-group v-model="personal.personalSex">
                <el-radio label="男" value="男">男</el-radio>
                <el-radio label="女" value="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="用户年龄：">
              <el-input v-model="personal.personalAge" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期：">
              <el-date-picker
                v-model="personal.personalBirthday"
                type="date"
                value-format="YYYY-MM-DD"
                @change="suan()"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="用户身份证：">
              <el-input v-model="personal.personalIdcard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户电话：">
              <el-input
                v-model.number="personal.personalPhone"
                maxlength="11"
                minlength="11"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="用户入职时间：">
              <el-input v-model="personal.entryTime" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户状态：">
              <el-radio-group v-model="personal.staffState">
                <el-radio :label="0" value="0">可用</el-radio>
                <el-radio :label="1" value="1">不可用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateDetails(), updateStaffState()"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>

  <!-- 给用户分配角色 -->
  <el-dialog title="给用户分配角色" v-model="toUserforPosDialogVisible">
    <div>
      <el-tree
        :data="roleList"
        :props="defaultProps"
        show-checkbox
        :default-checked-keys="this.checkedRole"
        node-key="positionId"
        ref="tree"
        width="35%"
        @check="currentChecked"
      >
      </el-tree>
    </div>
    <div slot="footer">
      <el-button @click="toUserforPosDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="toGranforUser()">确 定</el-button>
    </div>
  </el-dialog>

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
<script setup>
const value2 = ref(true);
</script>
<script>
import qs from "qs";
import { ref } from "vue";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      // 用户分配角色信息
      toUserforPosDialogVisible: false,
      // 默认的树形控件数据格式
      defaultProps: {
        label: "positionName",
        children: "childern",
      },

      // 表格隐藏
      show: false,
      centerDialogVisible: false,
      // 选中的角色
      checkedRole: [],
      checkedInfo: [],
      // 所有角色集合
      roleList: [],
      userId: "",
      imageUrl: "",
      usertable: [],
      pageInfo: {
        currentPage: 1,
        pagesize: 3,
        total: 0,
        userName: ref(""),
      },
      personal: {
        personalName: "",
        personalSex: "",
        personalAge: 0,
        personalBirthday: "",
        personalIdcard: "",
        personalPhone: "",
        entryTime: "",
        portraitUrl: ref(""),
        personalState: 1,
        personalId: "",
        portraitId: "",
        staffId: "",
      },
      deptId: "",
    };
  },
  methods: {
    // 选中的节点
    currentChecked(nodeObj, SelectedObj) {
      console.log(SelectedObj.checkedKeys, "键"); // 这是选中节点的key数组

      this.checkedInfo = SelectedObj.checkedKeys;
    },
    //修改用户的状态
    updateStaffState() {
      this.axios
        .post(
          "http://localhost:8088/TSM/staff/upstaffstate/" +
            this.personal.staffId
        )
        .then(() => {
          console.log("修改成功");
          this.centerDialogVisible = false;
          this.flesh();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //日期转换成年龄
    suan() {
      const birthStr1 = this.personal.personalBirthday;
      let a = new Date();
      var b = new Date(birthStr1);
      let age =
        a.getFullYear() -
        b.getFullYear() -
        (a.getMonth() < b.getMonth() ||
        (a.getMonth() == b.getMonth() && a.getDate() < b.getDate())
          ? 1
          : 0);
      this.personal.personalAge = age;
      console.log("年龄", age);
    },

    // 给用户分配权限弹窗(该用户下的角色，选中)
    toUserPopup(row) {
      this.toUserforPosDialogVisible = true;
      this.userId = row.staffId;
      this.axios
        .post("http://localhost:8088/TSM/staff-position/selectPosById", {
          staffId: row.staffId,
        })
        .then((res) => {
          this.checkedRole = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 查询所有的角色信息
    selectPosition() {
      this.axios
        .get("http://localhost:8088/TSM/position/selectPositionAll")
        .then((res) => {
          console.log(res);
          this.roleList = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //弹出详情方法
    detailsUp(row) {
      console.log(row);
      this.centerDialogVisible = true;
      this.personal = row;
      console.log(row, "详情信息");
      this.personal.staffId = row.staffId;
      this.personal.personalId = row.personalId;
      this.personal.portraitId = row.portraitId;
      this.deptId = row.deptId;
    },
    // 给用户授权
    toGranforUser() {
      console.log(this.userId, "选择的编号");
      this.axios
        .post(
          "http://localhost:8088/TSM/staff-position/insertStaffPosition/" +
            this.userId,
          this.checkedInfo
        )
        .then(() => {
          console.log("添加成功");
          ElMessage({ message: "授权成功", type: "success" });
          this.flesh();
          this.toUserforPosDialogVisible = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 修改用户信息
    updateDetails() {
      console.log(this.personal.personalId);
      console.log(this.personal.portraitId);
      this.axios
        .post("http://localhost:8088/TSM/personal/updatePersonal", {
          personalId: this.personal.personalId,
          personalSex: this.personal.personalSex,
          personalAge: this.personal.personalAge,
          personalBirthday: this.personal.personalBirthday,
          personalIdcard: this.personal.personalIdcard,
          personalPhone: this.personal.personalPhone,
          entryTime: this.personal.entryTime,
          personalState: this.personal.personalState,
          staffId: this.personal.staffId,
          portraitId: this.personal.portraitId,
        })
        .then((res) => {
          console.log(res);
          console.log("修改成功");
          this.centerDialogVisible = false;
          this.flesh();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //根据员工名字模糊查询
    selectByName() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/staffVo/selectStaffVoAll", {
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

    handleCurrentChange(page) {
      var _this = this;
      this.pageInfo.currentPage = page;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/staffVo/selectStaffVoAll", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response);
          _this.usertable = response.data.records;
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
        .get("http://localhost:8088/TSM/staffVo/selectStaffVoAll", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.usertable = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //刷新方法
    flesh() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/staffVo/selectStaffVoAll", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.usertable = response.data.records;
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
      .get("http://localhost:8088/TSM/staffVo/selectStaffVoAll", {
        params: this.pageInfo,
      })
      .then(function (response) {
        console.log(response);
        _this.roleList = response.data.records;
        _this.usertable = response.data.records;
        _this.pageInfo.total = response.data.total;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
.user_top {
  width: 100%;
  height: 60px;
  background: white;
  margin-bottom: 30px;
  line-height: 60px;
}

.user_section {
  margin-left: 10px;
  float: left;
  margin-right: 30px;
}

.user_section .el-input {
  display: inline;
}

.user_section .el-input .el-input__inner {
  width: 180px;
  height: 36px;
}

.user_top .el-button {
  width: 110px;
  background: #f60;
  color: white;
  text-align: center;
}

.user_button {
  display: inline-block;
  float: left;
}

#photo {
  width: 200px;
  height: 150px;
  margin: auto;
  margin-bottom: 60px;
}

#details .el-input .el-input__inner {
  border: 1px solid lightslategray;
  width: 220px;
  height: 36px;
}

.el-radio-group {
  float: none;
  line-height: 0px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar-uploader .el-upload {
  width: 200px;
  height: 150px;
  line-height: 150px;
}
.avatar {
  width: 200px;
  height: 150px;
}
</style>
