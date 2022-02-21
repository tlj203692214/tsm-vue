<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="员工请假">
      <div>
        <div class="query-form" style="margin-top: 15px">
          <el-input
            clearable
            v-model="pageInfo.input"
            placeholder="请输入内容"
            class="input-with-select"
            style="width: 20rem"
          >
            <template #prepend> 姓名 </template>
            <template #append>
              <el-button @click="staffleaves()" :icon="Search"></el-button>
            </template>
          </el-input>
          <el-select
            @change="staffleaves()"
            v-model="pageInfo.select"
            style="margin-left: 15px; width: 150px"
          >
            <el-option label="全部请假信息" value="1"></el-option>
            <el-option label="请假未审批" value="2"></el-option>
            <el-option label="请假已通过" value="3"></el-option>
            <el-option label="请假未通过" value="4"></el-option>
          </el-select>
          <el-button id="xzstaff" @click="dakaddleave()">
            + 员工请假
          </el-button>
        </div>
        <div class="showTableData">
          <el-table
            ref="mt"
            :data="leaveData"
            @selection-change="handeselect"
            style="width: 100%"
          >
            <el-table-column prop="leaveId" label="编号">
              <template #default="scope">ID:{{ scope.row.leaveId }}</template>
            </el-table-column>
            <el-table-column
              prop="personalName"
              label="请假人"
            ></el-table-column>
            <el-table-column
              prop="leaveContent"
              width="150"
              :show-overflow-tooltip="true"
              label="请假原因"
            ></el-table-column>
            <el-table-column
              prop="beginTime"
              label="请假开始时间"
            ></el-table-column>
            <el-table-column
              prop="endTime"
              label="请假结束时间"
            ></el-table-column>
            <el-table-column prop="staffId2" label="审批人">
              <template #default="scope">
                <span
                  v-if="
                    scope.row.staffId2 == '' || scope.row.staffId2 == 'null'
                  "
                >
                  未审批
                </span>
                <span v-else>
                  <span v-for="aa in personalDate">
                    <span v-if="scope.row.staffId2 == aa.staffId">
                      {{ aa.personalName }}
                    </span>
                  </span>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="leaveState" label="状态">
              <template #default="scope">
                <span v-if="scope.row.leaveState == 0">未通过</span>
                <span v-else-if="scope.row.leaveState == 1">已通过</span>
                <span v-else>待审批</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <span v-if="scope.row.leaveState == 2">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="updateLeaves(scope.row)"
                    >审批</el-button
                  >
                </span>
                <span v-else>
                  <el-button
                    size="mini"
                    @click="handeEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                </span>
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
        <el-dialog
          v-model="insertLeave"
          title="新增员工请假条"
          width="52%"
          center
        >
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="请假人" prop="name">
              <span v-for="ps in personalDate">
                <span v-if="this.StaffId == ps.staffId">
                  <el-button disabled>{{ ps.personalName }}</el-button>
                </span>
              </span>
            </el-form-item>
            <el-form-item label="请假原因" prop="content">
              <el-input
                type="textarea"
                maxlength="100"
                v-model="ruleForm.content"
              ></el-input>
            </el-form-item>
            <el-form-item label="请假时间">
              <el-date-picker
                v-model="ruleForm.value"
                type="daterange"
                range-separator="To"
                :disabled-date="disabledDate"
                start-placeholder="请假开始时间"
                end-placeholder="请假结束时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
          <template #footer>
            <el-button @click="insertLeave = false">取消</el-button>
            <el-button type="primary" @click="insertleave('ruleForm')"
              >提交</el-button
            >
          </template>
        </el-dialog>
        <el-dialog v-model="updateLeave" title="请假审批" width="44%" center>
          <el-form
            ref="ruleupForm"
            :model="ruleupForm"
            :rules="Uprules"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="请假人" prop="name">
              <el-input disabled v-model="ruleupForm.name"></el-input>
            </el-form-item>
            <el-form-item label="请假原因" prop="content">
              <el-input
                disabled
                type="textarea"
                maxlength="100"
                v-model="ruleupForm.content"
              ></el-input>
            </el-form-item>
            <el-form-item label="请假时间">
              <el-input
                disabled
                style="width: 150px"
                v-model="ruleupForm.kaidate"
              ></el-input>
              ——
              <el-input
                disabled
                style="width: 150px"
                v-model="ruleupForm.jiedate"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否通过">
              <el-radio-group
                v-model="ruleupForm.leaveState"
                style="float: left"
              >
                <el-radio label="通过"></el-radio>
                <el-radio label="未通过"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <template #footer>
            <el-button @click="insertLeave = false">取消</el-button>
            <el-button type="primary" @click="insertleave('ruleForm')"
              >提交</el-button
            >
          </template>
        </el-dialog>
      </div>
    </el-tab-pane>
    <el-tab-pane label="员工出差">
      <div>
        <div class="query-form" style="margin-top: 15px">
          <el-select
            @change="business()"
            v-model="pageInfo.select"
            style="width: 150px"
          >
            <el-option label="全部出差信息" value="1"></el-option>
            <el-option label="出差未审批" value="2"></el-option>
            <el-option label="出差已通过" value="3"></el-option>
            <el-option label="出差未通过" value="4"></el-option>
          </el-select>
          <el-button id="xzstaff" @click="dakaddbusiness()">
            + 员工出差
          </el-button>
        </div>
        <div class="showTableData">
          <el-table
            ref="mt"
            :data="businessData"
            @selection-change="handeselect"
            style="width: 100%"
          >
            <el-table-column prop="staffbusinessId" label="编号">
              <template #default="scope"
                >ID:{{ scope.row.staffbusinessId }}</template
              >
            </el-table-column>
            <el-table-column prop="staffId1" label="出差人">
              <template #default="scope">
                <span v-for="ps in personalDate">
                  <span v-if="scope.row.staffId1 == ps.staffId">
                    {{ ps.personalName }}
                  </span>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="staffbusinessContent"
              width="150"
              :show-overflow-tooltip="true"
              label="出差原因"
            ></el-table-column>
            <el-table-column
              prop="beginTime"
              label="出差开始时间"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="endTime"
              label="出差结束时间"
              width="150"
            ></el-table-column>
            <el-table-column prop="staffId2" label="审批人">
              <template #default="scope">
                <span v-for="ps in personalDate">
                  <span v-if="scope.row.staffId2 == ps.staffId">
                    {{ ps.personalName }}
                  </span>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="staffbusinessState" label="状态">
              <template #default="scope">
                <span v-if="scope.row.staffbusinessState == 0">未通过</span>
                <span v-else-if="scope.row.staffbusinessState == 1"
                  >已通过</span
                >
                <span v-else>待审批</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <span v-if="scope.row.staffbusinessState == 2">
                  <el-button type="primary" size="mini" @click=""
                    >审批</el-button
                  >
                </span>
                <span v-else>
                  <el-button
                    size="mini"
                    @click="handeEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                </span>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @size-change="businessSizeChange"
              @current-change="businessCurrentChange"
              :current-page="pageInfo.currentPage"
              :page-sizes="[3, 6, 9]"
              :page-size="pageInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total"
            >
            </el-pagination>
          </div>
        </div>
        <el-dialog
          v-model="addBusiness"
          title="新增员工出差信息"
          width="52%"
          center
        >
          <el-form
            ref="businessForm"
            :model="businessForm"
            :rules="rules"
            label-width="120px"
            class="demo-businessForm"
          >
            <el-form-item label="出差人" prop="name">
              <span v-for="ps in personalDate">
                <span v-if="this.StaffId == ps.staffId">
                  <el-button disabled>{{ ps.personalName }}</el-button>
                </span>
              </span>
            </el-form-item>
            <el-form-item label="出差原因" prop="content">
              <el-input
                type="textarea"
                maxlength="100"
                v-model="businessForm.content"
              ></el-input>
            </el-form-item>
            <el-form-item label="出差时间">
              <el-date-picker
                v-model="businessForm.value"
                type="daterange"
                range-separator="To"
                :disabled-date="disabledDate"
                start-placeholder="请假开始时间"
                end-placeholder="请假结束时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
          <template #footer>
            <el-button @click="addBusiness = false">取消</el-button>
            <el-button type="primary" @click="addbusiness()">提交</el-button>
          </template>
        </el-dialog>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Search } from "@element-plus/icons";
const disabledDate = (time: Date) => {
  return time.getTime() <= Date.now();
};
</script>
<script lang="ts">
import qs from "qs";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      activeName: "0",
      leaveData: [],
      personalDate: [],
      businessData: [],
      StaffId: sessionStorage.getItem("staffId"),
      insertLeave: ref(false),
      addBusiness: ref(false),
      updateLeave: ref(false),
      ruleForm: {
        content: "",
        value: "",
      },
      ruleupForm: {
        name: "",
        content: "",
        kaidate: "",
        jiedate: "",
      },
      rules: {
        content: [
          {
            required: true,
            message: "请假原因不可为空",
            trigger: "blur",
          },
        ],
        value: [
          {
            type: "date",
            required: true,
            message: "Please pick a date",
            trigger: "change",
          },
        ],
      },
      businessForm: {
        content: "",
        value: "",
      },
      pageInfo: {
        select: "1",
        input: "",
        currentPage: 1,
        pagesize: 3,
        total: 0,
      },
    };
  },
  methods: {
    updateLeaves(row) {
      this.ruleupForm.name = row.personalName;
      this.ruleupForm.content = row.leaveContent;
      this.ruleupForm.kaidate = row.beginTime;
      this.ruleupForm.jiedate = row.endTime;
      this.updateLeave = true;
    },
    dakaddleave() {
      this.ruleForm.content = "";
      this.ruleForm.value = "";
      this.insertLeave = true;
    },
    insertleave(addformName) {
      this.$refs[addformName].validate((valid) => {
        if (valid) {
          var _this = this;
          this.axios
            .post("http://localhost:8088/TSM/staffleave/insetleave", {
              leaveContent: this.ruleForm.content,
              beginTime: this.ruleForm.value[0],
              endTime: this.ruleForm.value[1],
              staffId1: this.StaffId,
              staffId2: null,
              leaveState: 2,
            })
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
          ElMessage({ message: "请假条新增成功！", type: "success" });
          this.insertLeave = false;
          this.handleClick();
          console.log(this.ruleForm.value[0], "这是开始时间的值");
          console.log(this.ruleForm.value[1], "这是结束时间的值");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    dakaddbusiness() {
      this.businessForm.content = "";
      this.businessForm.value = "";
      this.addBusiness = true;
    },
    addbusiness(addformName) {
      this.$refs[addformName].validate((valid) => {
        if (valid) {
          var _this = this;
          this.axios
            .post("http://localhost:8088/TSM/staffbusiness/insertbusiness", {
              staffbusinessContent: this.businessForm.content,
              beginTime: this.businessForm.value[0],
              endTime: this.businessForm.value[1],
              staffId1: this.StaffId,
              staffId2: null,
              staffbusinessState: 2,
            })
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
          ElMessage({ message: "请假条新增成功！", type: "success" });
          this.insertLeave = false;
          this.handleClick();
          console.log(this.ruleForm.value[0], "这是开始时间的值");
          console.log(this.ruleForm.value[1], "这是结束时间的值");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log(this.businessForm.value[0], "这是开始时间的值");
      console.log(this.businessForm.value[1], "这是结束时间的值");
    },
    SelPersonal() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/personal/selectpersonal")
        .then(function (response) {
          console.log(response.data);
          _this.personalDate = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    staffleaves() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/staffleavesvo", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.leaveData = response.data.records;
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
        .get("http://localhost:8088/TSM/staffleavesvo", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log("1-------------------------------------------");
          console.log(response.data);
          _this.leaveData = response.data.records;
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
        .get("http://localhost:8088/TSM/staffleavesvo", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log("2-------------------------------------------");
          console.log(response.data);
          _this.leaveData = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    business() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/staffbusiness/business", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.businessData = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    businessCurrentChange(page) {
      var _this = this;
      this.pageInfo.currentPage = page;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/staffbusiness/business", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log("1-------------------------------------------");
          console.log(response.data);
          _this.businessData = response.data.records;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    businessSizeChange(size) {
      var _this = this;
      this.pageInfo.pagesize = size;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/staffbusiness/business", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log("2-------------------------------------------");
          console.log(response.data);
          _this.businessData = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleClick(teb, event) {
      if (this.activeName == "0") {
        var _this = this;
        this.axios
          .get("http://localhost:8088/TSM/staffleavesvo", {
            params: this.pageInfo,
          })
          .then(function (response) {
            console.log(response.data);
            _this.leaveData = response.data.records;
            _this.pageInfo.total = response.data.total;
          })
          .catch(function (error) {
            console.log(error);
          });
        this.SelPersonal();
        sessionStorage.setItem("activeName", "0");
        // this.$router.push("/staffleave")
      } else if (this.activeName == "1") {
        var _this = this;
        this.axios
          .get("http://localhost:8088/TSM/staffbusiness/business", {
            params: this.pageInfo,
          })
          .then(function (response) {
            console.log(response.data);
            _this.businessData = response.data.records;
            _this.pageInfo.total = response.data.total;
          })
          .catch(function (error) {
            console.log(error);
          });
        this.SelPersonal();
        sessionStorage.setItem("activeName", "1");
        // this.$router.push("/business")
      }
    },
  },
  created() {
    this.handleClick();
    // this.personalName()
  },
};
</script>

<style></style>
