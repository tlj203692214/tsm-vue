<template>
  <div style="margin-top: 2%" class="diva">
    公告状态:<select v-model="pageInfo.zt" class="d" @change="creat">
      <option value="a">全部公告</option>
      <option value="b">已录入公告</option>
      <option value="c">已发布公告</option>
      <option value="d">已停用公告</option>
    </select>
    <div class="b">
      快速检索:<select v-model="pageInfo.js" class="c">
        <option value="公告主题">
          <el-icon><delete-filled /></el-icon>公告主题
        </option>
        <option value="部门范围">
          <el-icon><delete-filled /></el-icon>部门范围
        </option>
      </select>
    </div>
    <el-input
      style="width: 200px"
      v-model="pageInfo.input"
      :placeholder="'根据' + this.pageInfo.js + '查询'"
      clearable
    />
    <el-button @click="this.creat()"
      ><el-icon><search /></el-icon>搜索</el-button
    >
  </div>
  <div class="e">
    <el-button
      style="background-color: blue; color: white"
      :icon="CircleCloseFilled"
      @click="(xzjm = true), qk()"
      ><el-icon><circle-plus-filled /></el-icon>新增</el-button
    >
    <el-button
      style="background-color: blue; color: white"
      :icon="CircleCloseFilled"
      @click="releaseNotices(ggxsz)"
      :disabled="this.ggxsz.length === 0"
      ><el-icon><reading /></el-icon>发布</el-button
    >
    <el-button
      style="background-color: blue; color: white"
      :icon="CircleCloseFilled"
      @click="DeactivateNotices(ggxsz)"
      :disabled="this.ggxsz.length === 0"
      ><el-icon><lock /></el-icon>暂停</el-button
    >
    <el-button
      style="background-color: blue; color: white"
      :icon="CircleCloseFilled"
      @click="delectnotice(ggxsz)"
      :disabled="this.ggxsz.length === 0"
      ><el-icon><delete-filled /></el-icon>删除</el-button
    >
  </div>

  <el-table
    border
    ref="mt"
    :data="bulletinboxData"
    style="width: 100%"
    @selection-change="ggxszchange"
    :row-class-name="tableRowClassName"
  >
    <el-table-column type="selection" width="55"></el-table-column>

    <el-table-column prop="noticeState" label="状态" width="70">
      <template #default="scope">
        <span v-if="scope.row.noticeState === 0">录入</span>
        <span v-else-if="scope.row.noticeState === 1">发布</span>
        <span v-else>停用</span>
      </template>
    </el-table-column>

    <!-- <el-table-column   v-else prop="receivingsState"  label="状态" width="120"> -->

    <!-- </el-table-column> -->

    <el-table-column label="公告主题" width="200">
      <template #default="scope">
        <span class="a" @click="cknr(scope.row), (xgjm = true)">{{
          scope.row.noticeTheme
        }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="noticeType" label="公告类型" width="100">
      <template #default="scope">
        <span v-if="scope.row.noticeType === 1">活动安排</span>
        <span v-else-if="scope.row.noticeType === 2">值班公告</span>
        <span v-else-if="scope.row.noticeType === 3">公务接待</span>
        <span v-else-if="scope.row.noticeType === 4">温馨提示</span>
        <span v-else-if="scope.row.noticeType === 5">业主通知</span>
        <span v-else>其他公告</span>
      </template>
    </el-table-column>
    <el-table-column prop="deptName" label="部门范围" width="510">
      <template #default="scope">
        <span v-for="deptName in scope.row.deptName">
          <span v-if="deptName === '0'">所有部门，</span>
          <span v-else>
            <span v-for="DeptData in DeptData">
              <span v-if="deptName == DeptData.deptId">
                {{ DeptData.deptName }}，
              </span>
            </span>
          </span>
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="staffId" label="录入人" width="100">
      <template #default="scope">
        <span v-for="staffData in staffData">
          <span v-if="scope.row.staffId == staffData.staffId">{{
            staffData.staffName
          }}</span>
        </span>
      </template>
    </el-table-column>
    <el-table-column
      prop="noticeDate"
      label="日期"
      show-overflow-tooltip
    ></el-table-column>
  </el-table>

  <!-- <el-button @click="deleteFileOrDirectory(usersz)" :disabled="this.usersz.length === 0"> 批量删除</el-button> -->
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
  <!-- 新增界面-->
  <el-dialog
    v-model="xzjm"
    title="新增信息"
    width="50%"
    center
    :show-close="false"
  >
    <el-form
      ref="ruleForm"
      label-width="200px"
      class="demo-ruleForm"
      :model="ruleForm"
      :rules="rules"
    >
      <el-form-item label="公告类型:" prop="noticeType">
        <select v-model="ruleForm.noticeType" class="d">
          <option value="1">活动安排</option>
          <option value="2">值班公告</option>
          <option value="3">公务接待</option>
          <option value="4">温馨提示</option>
          <option value="5">业主通知</option>
          <option value="6">其他公告</option>
        </select>
      </el-form-item>

      <el-form-item label="选择部门:" prop="deptName">
        <el-cascader :props="props" v-model="ruleForm.deptName" />
      </el-form-item>

      <el-form-item label="公告主题:" prop="noticeTheme">
        <el-input v-model="ruleForm.noticeTheme"></el-input>
      </el-form-item>

      <el-form-item label="公告内容:" prop="noticeContent">
        <el-input v-model="ruleForm.noticeContent"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="addNotice('ruleForm')">
          保存并新建</el-button
        >
      </span>
      <span class="dialog-footer">
        <el-button type="primary" @click="addNoticeg('ruleForm')">
          保存并关闭</el-button
        >
      </span>
      <span class="dialog-footer">
        <el-button type="primary" @click="gbjm('ruleForm')"> 关闭</el-button>
      </span>
    </template>
    <!-- 	{{sss[sss.length-1][sss[sss.length-1].length-1]}} -->
  </el-dialog>
  <!-- 修改界面-->
  <el-dialog
    v-model="xgjm"
    title="修改信息"
    width="50%"
    center
    :show-close="false"
  >
    <el-form
      ref="ruleForm"
      label-width="200px"
      class="demo-ruleForm"
      :model="ruleForm"
      :rules="rules"
    >
      <el-form-item label="公告类型:" prop="noticeType">
        <select v-model="ruleForm.noticeType" class="d">
          <option value="1">活动安排</option>
          <option value="2">值班公告</option>
          <option value="3">公务接待</option>
          <option value="4">温馨提示</option>
          <option value="5">业主通知</option>
          <option value="6">其他公告</option>
        </select>
      </el-form-item>

      <el-form-item label="公告主题:" prop="noticeTheme">
        <el-input v-model="ruleForm.noticeTheme"></el-input>
      </el-form-item>

      <el-form-item label="公告内容:" prop="noticeContent">
        <el-input v-model="ruleForm.noticeContent"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="updateNotice('ruleForm')">
          保存</el-button
        >
      </span>
      <span class="dialog-footer">
        <el-button type="primary" @click="gbjm('ruleForm')"> 关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import qs from "qs";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      props: {
        multiple: true,
        checkStrictly: true,
        lazy: true,
        lazyLoad: this.getCheckedNodes,
      },
      deptNames: "", //部门范围（字符串）

      a: "",

      staffData: [],
      ggxsz: [],
      DeptData: [],
      staffId: sessionStorage.getItem("staffId"),
      xzjm: ref(false),
      xgjm: ref(false),
      bulletinboxData: [],
      pageInfo: {
        currentPage: 1,
        pagesize: 3,
        total: 0,
        js: "公告主题",
        zt: "a",
        input: "",
      },
      ruleForm: {
        noticeId: "",
        noticeType: "",
        noticeTheme: "",
        noticeContent: "",
        deptName: [["0"]], //部门范围（数组）
        noticeState: "",
      },
      rules: {
        noticeType: [
          {
            required: true,
            message: "公告类别不能为空！",
            trigger: "blur",
          },
        ],
        deptName: [
          {
            required: true,
            message: "部门范围不能为空！",
            trigger: "blur",
          },
        ],
        noticeTheme: [
          {
            required: true,
            message: "公告主题不能为空！",
            trigger: "blur",
          },
        ],
        noticeContent: [
          {
            required: true,
            message: "公告内容不能为空！",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    getCheckedNodes(node, resolve) {
      const { data, level } = node;

      if (level === 0) {
        const nodes = Array.from({ length: 1 }).map((item) => {
          return {
            value: "0",
            label: "所有部门",
            leaf: false,
          };
        });
        resolve(nodes);
      } else {
        this.axios
          .post("http://localhost:8088/TSM/dept/selectDept", {})
          .then((response) => {
            this.axios
              .post("http://localhost:8088/TSM/dept/selectDeptjl/" + node.value)
              .then((res) => {
                const nodes = res.data.map((item) => {
                  for (var a = 0; a < response.data.length; a++) {
                    if (item.deptId == response.data[a].deptDid) {
                      var c = false;
                      break;
                    } else {
                      var c = true;
                    }
                  }

                  return {
                    value: item.deptId,
                    label: item.deptName,
                    leaf: c,
                  };
                });

                resolve(nodes);
              });
          });
      }
    },

    gbjm(formName) {
      this.$refs[formName].resetFields();
      this.xzjm = false;
      this.xgjm = false;
    },
    updateNotice(formName) {
      //修改公告
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for (var i = 0; i < this.ruleForm.deptName.length; i++) {
            this.deptNames +=
              this.ruleForm.deptName[i][this.ruleForm.deptName[i].length - 1] +
              ",";
          } //将数组转化为字符串

          //去掉最后一个逗号
          if (this.deptNames.length > 0) {
            this.deptNames = this.deptNames.substr(
              0,
              this.deptNames.length - 1
            );
          }
          this.axios
            .post("http://localhost:8088/TSM/notice/updateNotice", {
              noticeId: this.ruleForm.noticeId,
              noticeType: this.ruleForm.noticeType,
              noticeTheme: this.ruleForm.noticeTheme,
              noticeContent: this.ruleForm.noticeContent,
              noticeState: this.ruleForm.noticeState,
              staffId: this.staffId,
            })
            .then((response) => {
              this.$refs[formName].resetFields();
              this.deptNames = "";
              console.log(response.data);
              _this.creat();
              _this.xgjm = false;
              ElMessage({ message: "修改成功！", type: "success" });
            })
            .catch(function (erre) {
              console.log(erre);
            });
        } else {
          ElMessage({ message: "请完善信息！", type: "warning" });

          return false;
        }
      });
    },
    cknr(row) {
      //查看公告箱内容可进行修改
      this.ruleForm.noticeId = row.noticeId;
      this.ruleForm.noticeType = row.noticeType;
      this.ruleForm.noticeTheme = row.noticeTheme;
      this.ruleForm.noticeContent = row.noticeContent;
      this.ruleForm.noticeState = row.noticeState;
    },
    DeactivateNotice(row) {
      //暂停公告方法
      let _this = this;
      this.axios
        .post("http://localhost:8088/TSM/notice/DeactivateNotice", {
          noticeId: row.noticeId,
        })
        .then((res) => {
          _this.creat();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    DeactivateNotices(ggxsz) {
      //暂停公告
      for (var i = 0; i < ggxsz.length; i++) {
        this.DeactivateNotice(ggxsz[i]);
      }
      ElMessage({ message: "暂停成功！", type: "success" });
    },
    releaseNotice(row) {
      //发布公告方法
      let _this = this;
      this.axios
        .post("http://localhost:8088/TSM/notice/releaseNotice", {
          noticeId: row.noticeId,
        })
        .then((res) => {
          console.log("bianhaobianhao");

          _this.creat();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    releaseNotices(ggxsz) {
      //发布公告
      for (var i = 0; i < ggxsz.length; i++) {
        this.releaseNotice(ggxsz[i]);
      }
      ElMessage({ message: "发布成功！", type: "success" });
    },
    handeDel(row) {
      let _this = this;
      this.axios
        .post("http://localhost:8088/TSM/notice/delectnotice", {
          noticeId: row.noticeId,
        })
        .then((res) => {
          console.log("bianhaobianhao");

          _this.creat();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    delectnotice(ggxsz) {
      //删除公告
      for (var i = 0; i < ggxsz.length; i++) {
        this.handeDel(ggxsz[i]);
      }
      ElMessage({ message: "删除成功！", type: "success" });
    },

    ggxszchange(ggxsz) {
      //将多选框勾选的内容放入数组
      this.ggxsz = ggxsz;
    },
    qk() {
      //将之前的记录清空
      this.ruleForm.noticeType = "";
      this.ruleForm.noticeTheme = "";
      this.ruleForm.noticeContent = "";
    },
    addNoticeg(formName) {
      //新增公告并关闭弹窗
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for (var i = 0; i < this.ruleForm.deptName.length; i++) {
            this.deptNames +=
              this.ruleForm.deptName[i][this.ruleForm.deptName[i].length - 1] +
              ",";
          } //将数组转化为字符串

          //去掉最后一个逗号
          if (this.deptNames.length > 0) {
            this.deptNames = this.deptNames.substr(
              0,
              this.deptNames.length - 1
            );
          }

          this.axios
            .post("http://localhost:8088/TSM/notice/addNotice", {
              noticeType: this.ruleForm.noticeType,
              noticeTheme: this.ruleForm.noticeTheme,
              noticeContent: this.ruleForm.noticeContent,
              staffId: this.staffId,
              deptName: this.deptNames,
            })
            .then((response) => {
              this.$refs[formName].resetFields();
              this.deptNames = "";
              _this.creat();
              ElMessage({ message: "新增成功！", type: "success" });
              this.xzjm = false;
            })
            .catch(function (erre) {
              console.log(erre);
            });
        } else {
          ElMessage({ message: "请完善信息！", type: "warning" });

          return false;
        }
      });
    },
    addNotice(formName) {
      //新增公告并新建
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for (var i = 0; i < this.ruleForm.deptName.length; i++) {
            this.deptNames +=
              this.ruleForm.deptName[i][this.ruleForm.deptName[i].length - 1] +
              ",";
          } //将数组转化为字符串

          //去掉最后一个逗号
          if (this.deptNames.length > 0) {
            this.deptNames = this.deptNames.substr(
              0,
              this.deptNames.length - 1
            );
          }
          this.axios
            .post("http://localhost:8088/TSM/notice/addNotice", {
              noticeType: this.ruleForm.noticeType,
              noticeTheme: this.ruleForm.noticeTheme,
              noticeContent: this.ruleForm.noticeContent,
              staffId: this.staffId,
              deptName: this.deptNames,
            })
            .then((response) => {
              this.$refs[formName].resetFields();
              this.deptNames = "";

              _this.creat();
              ElMessage({ message: "新增成功！", type: "success" });
            })
            .catch(function (erre) {
              console.log(erre);
            });
        } else {
          ElMessage({ message: "请完善信息！", type: "warning" });

          return false;
        }
      });
    },
    creat() {
      console.log(this.pageInfo.StaffNames);
      console.log("aaaaaaaaaa");
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/notice/bulletinbox", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          for (var a = 0; a < response.data.records.length; a++) {
            response.data.records[a].deptName =
              response.data.records[a].deptName.split(",");
          }
          _this.bulletinboxData = response.data.records;
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
        .get("http://localhost:8088/TSM/notice/bulletinbox", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log("1-------------------------------------------");
          console.log(response.data);
          for (var a = 0; a < response.data.records.length; a++) {
            response.data.records[a].deptName =
              response.data.records[a].deptName.split(",");
          }
          _this.bulletinboxData = response.data.records;
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
        .get("http://localhost:8088/TSM/notice/bulletinbox", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log("2-------------------------------------------");
          console.log(response.data);
          for (var a = 0; a < response.data.records.length; a++) {
            response.data.records[a].deptName =
              response.data.records[a].deptName.split(",");
          }
          _this.bulletinboxData = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    cxyh() {
      //查询用户
      let _this = this;

      this.axios
        .post("http://localhost:8088/TSM/staff/cxyh", {
          staffId: 0,
          staffName: "",
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          _this.staffData = res.data;
        });
    },
    selectDept() {
      //查询部门
      let _this = this;

      this.axios
        .post("http://localhost:8088/TSM/dept/selectDept", {})
        .then((res) => {
          console.log(res);
          console.log(res.data);
          _this.DeptData = res.data;
        });
    },
  },
  created() {
    this.cxyh(); //查询所有用户
    this.selectDept(); // 查询所有部门
    console.log(this.pageInfo.StaffNames);
    console.log("aaaaaaaaaa");
    var _this = this;
    this.axios
      .get("http://localhost:8088/TSM/notice/bulletinbox", {
        params: this.pageInfo,
      })
      .then(function (response) {
        for (var a = 0; a < response.data.records.length; a++) {
          response.data.records[a].deptName =
            response.data.records[a].deptName.split(",");
        }

        _this.bulletinboxData = response.data.records;
        _this.pageInfo.total = response.data.total;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
.d {
  width: 30%;
  height: 30px;
}
</style>
