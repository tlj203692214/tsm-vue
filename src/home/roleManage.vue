<template>
  <!-- 名称搜索框 -->
  <div class="position_top">
    <span class="paysize">角色名称：</span>
    <el-input
      v-model="pageInfo.posName"
      placeholder="请输入角色名字"
      style="margin-right: 30px; width: 180px; height: 36px"
    />
    <el-button @click="selectPosName()" style="height: 36px; margin-top: 10px">
      <search
        style="width: 1em; height: 1em; margin-right: 8px"
      />查询</el-button
    >
    <el-button @click="insertPopup()" style="height: 36px; margin-top: 10px">
      <plus
        style="width: 1em; height: 1em; margin-right: 8px"
      />添加角色</el-button
    >
  </div>
  <!-- 角色数据显示表格 -->
  <div class="position_content">
    <el-table
      :data="role"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
      :row-style="{ height: '23px' }"
      :cell-style="{ padding: '0px' }"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="positionId" label="编号" width="80">
        <template #default="scope">{{ scope.row.positionId }}</template>
      </el-table-column>
      <el-table-column prop="positionName" label="角色名字" />
      <el-table-column prop="positionRemark" label="角色描述" />
      <el-table-column prop="positionCreated" label="创建时间" />
      <el-table-column prop="positionUpdated" label="修改时间" />
      <el-table-column prop="positionState" label="角色状态">
        <template #default="scope">
          <span v-if="scope.row.positionState == 0">可用</span>
          <span v-else>不可用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="updatePopup(scope.row)"
            >修改</el-button
          >
          <el-button
            type="text"
            @click="selectcheckNav(scope.row), selectNavAll()"
            >授权</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 添加弹窗 -->
  <el-dialog title="添加角色" center v-model="roleDialogVisible">
    <el-form
      :model="roleInfo"
      ref="roleInfo"
      :label-position="right"
      :rules="rules"
    >
      <el-row gutter="24">
        <el-col :span="12">
          <el-form-item label="角色名称：" prop="positionName">
            <el-input v-model="roleInfo.positionName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色描述：" prop="positionRemark">
            <el-input v-model="roleInfo.positionRemark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="角色状态：" prop="positionState">
            <el-radio-group v-model="roleInfo.positionState">
              <el-radio :label="0">可用</el-radio>
              <el-radio :label="1">不可用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门：" prop="deptId">
            <el-select v-model="roleInfo.deptId" placeholder="请选择部门">
              <el-option
                v-for="item in deptInfo"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <div class="foot-button">
          <el-button @click="rest('roleInfo')">取 消</el-button>
          <el-button type="primary" @click="insertPosition('roleInfo')"
            >确 定</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- 修改的弹窗 -->
  <el-dialog title="权限修改" center v-model="updateroleDialogVisible">
    <el-form
      :model="roleInfo"
      ref="roleInfo"
      :label-position="right"
      :rules="rules"
    >
      <el-row gutter="24">
        <el-col :span="12">
          <el-form-item label="角色名称：" prop="positionName">
            <el-input v-model="roleInfo.positionName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色描述：" prop="positionRemark">
            <el-input v-model="roleInfo.positionRemark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="角色状态：" prop="positionState">
            <el-radio-group v-model="roleInfo.positionState">
              <el-radio :label="0">可用</el-radio>
              <el-radio :label="1">不可用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <div class="foot-button">
          <el-button @click="updateroleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateRoleInfo()">确 定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- 角色授权 -->
  <el-dialog title="角色授权" v-model="forGrantDialogVisible">
    <el-tree
      :data="NavList"
      :props="defaultProps"
      show-checkbox
      :default-checked-keys="this.checkedNav"
      node-key="navigationId"
      ref="tree"
      width="35%"
      @check="currentChecked"
    >
    </el-tree>
    <div slot="footer">
      <el-button @click="forGrantDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="toGranforposition()">确 定</el-button>
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
<script>
import qs from "qs";
import { ref, defineComponent } from "vue";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      role: [],
      deptInfo: [],
      // 选中的数据
      checkedInfo: [],
      checkedNav: [],
      checkedMenu: [],
      // 所有的数据
      NavList: [],
      checked: false,
      // 角色授权弹窗
      forGrantDialogVisible: false,
      // 默认的树形控件数据格式
      defaultProps: {
        label: "navigationName",
        children: "childern",
      },
      // 是否有相同的角色
      isRoleName: true,
      roleDialogVisible: false,
      updateroleDialogVisible: false,
      menuId: "",
      navId: "",
      pageInfo: {
        currentPage: 1,
        pagesize: 3,
        total: 0,
        posName: ref(""),
      },
      // 角色信息
      roleInfo: {
        positionId: "",
        positionName: "",
        positionRemark: "",
        positionState: "",
        deptId: "",
      },
      rules: {
        positionName: [
          {
            required: true,
            message: "名字不能为空",
            trigger: "blur",
          },
        ],
        positionRemark: [
          {
            required: true,
            message: "角色描述不能为空",
            trigger: "blur",
          },
        ],
        positionCreated: [
          {
            required: true,
            message: "创建时间不能为空",
            trigger: "blur",
          },
        ],
        positionUpdated: [
          {
            required: true,
            message: "修改时间不能为空",
            trigger: "blur",
          },
        ],
        positionState: [
          {
            required: true,
            message: "角色状态不能为空",
            trigger: "blur",
          },
        ],
        deptId: [
          {
            required: true,
            message: "部门不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 选中的节点
    currentChecked(nodeObj, SelectedObj) {
      console.log(SelectedObj.checkedKeys, "键"); // 这是选中节点的key数组
      console.log(SelectedObj.halfCheckedKeys, "键数组"); // 这是选中节点数组
      console.log(nodeObj, "节点数组"); // 这是选中节点数组
      this.checkedMenu = [SelectedObj.checkedKeys, SelectedObj.halfCheckedKeys];
      console.log(this.checkedMenu + "编号");
    },
    // 添加角色弹窗
    insertPopup() {
      this.roleInfo = "";
      this.roleDialogVisible = true;
      this.selectDept();
    },
    // 修改的弹窗
    updatePopup(row) {
      this.updateroleDialogVisible = true;
      this.roleInfo = row;
      this.menuId = row.positionId;
    },
    // 角色授权（选中的权限菜单）
    selectcheckNav(row) {
      this.forGrantDialogVisible = true;
      this.navId = row.positionId;
      this.axios
        .post("http://localhost:8088/TSM/positionNav/selectPosById", {
          positionId: row.positionId,
        })
        .then((res) => {
          console.log("选择的角色", res.data);
          this.checkedNav = res.data;
          this.checkedMenu = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 查询所有的菜单权限
    selectNavAll() {
      this.axios
        .get("http://localhost:8088/TSM/navigation/selectNavigation2")
        .then((res) => {
          this.NavList = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 给角色授权
    toGranforposition() {
      console.log(this.checkedMenu, "shouqu");
      for (var a = 0; a < this.checkedMenu.length; a++) {
        if (this.checkedNav !== this.checkedMenu && this.checkedNav !== "") {
          this.axios
            .post(
              "http://localhost:8088/TSM/position-nav/insertPosAndNav/" +
                this.navId,
              this.checkedMenu[a]
            )
            .then((res) => {
              this.forGrantDialogVisible = false;
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          this.forGrantDialogVisible = false;
        }
      }
      ElMessage({ message: "授权成功", type: "success" });
    },
    // 添加方法
    insertPosition(roleInfo) {
      this.$refs[roleInfo].validate((valid) => {
        if (valid) {
          for (var name = 0; name < this.role.length; name++) {
            if (this.role[name].positionName == this.roleInfo.positionName) {
              this.isRoleName = false;
              break;
            } else {
              this.isRoleName = true;
            }
          }
          if (this.isRoleName == false) {
            ElMessage({
              message: "该角色已存在,请重新输入！",
              type: "warning",
            });
          } else {
            this.axios
              .post("http://localhost:8088/TSM/position/insertPosition", {
                positionName: this.roleInfo.positionName,
                positionRemark: this.roleInfo.positionRemark,
                positionState: this.roleInfo.positionState,
                deptId: this.roleInfo.deptId,
              })
              .then((res) => {
                console.log(res);
                ElMessage({ message: "添加成功", type: "success" });
                this.flesh();
                this.roleDialogVisible = false;
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
    // 取消按钮的清空方法
    rest(roleInfo) {
      this.$refs[roleInfo].resetFields();
      this.roleDialogVisible = false;
    },
    // 修改方法
    updateRoleInfo() {
      this.axios
        .post("http://localhost:8088/TSM/position/updatePosition", {
          positionId: this.roleInfo.positionId,
          positionName: this.roleInfo.positionName,
          positionRemark: this.roleInfo.positionRemark,
          positionState: this.roleInfo.positionState,
          deptId: this.roleInfo.deptId,
        })
        .then(() => {
          console.log("修改成功");
          this.flesh();
          this.updateroleDialogVisible = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 查询部门所有信息
    selectDept() {
      this.axios
        .get("http://localhost:8088/TSM/dept/listDept")
        .then((res) => {
          console.log(res);
          this.deptInfo = res.data;
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
  width: 110px;
  background: #f60;
  color: white;
  border: 1px solid white;
  text-align: center;
}
.position_top .el-button:hover {
  background: #ff5500;
}
</style>
