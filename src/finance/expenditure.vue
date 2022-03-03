<template>
  <div class="payheader">
    <span class="paysize">支出时间段：</span>
    <el-date-picker
      v-model="timeSlot"
      value-format="YYYY-MM-DD"
      @change="expendDate"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
    </el-date-picker>
    <span class="kong"></span>
  </div>

  <!--校务支出分页查询-->
  <el-table
    ref="tableDate"
    :data="expenditureDate"
    style="width: 100%"
    @row-click="ddd"
    border
    :row-style="{ height: '23px' }"
    :cell-style="{ padding: '0px' }"
  >
    <el-table-column type="selection" width="50"></el-table-column>
    <el-table-column prop="expenditureId" label="编号">
      <template #default="scope">{{ scope.row.expenditureId }}</template>
    </el-table-column>
    <el-table-column prop="expenditureMoney" label="校务支出金额">
      <template #default="scope">
        <span v-if="scope.row.purchaseId == 0">{{
          scope.row.courseMoney + scope.row.bookFee
        }}</span>
        <span v-else-if="scope.row.refundId == 0">{{
          scope.row.purchaseNumber * scope.row.purchasePrice
        }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="expenditureDate" label="校务支出时间" />
    <el-table-column label="支出类型">
      <template #default="scope">
        <span
          v-if="scope.row.purchaseId == 0"
          @click="refundEdit(scope.row)"
          style="cursor: pointer; color: rgb(9, 130, 211)"
          >退费支出</span
        >
        <span
          v-else-if="scope.row.refundId == 0"
          @click="purchaseEdit(scope.row)"
          style="cursor: pointer; color: rgb(9, 130, 211)"
          >采购支出</span
        >
      </template>
    </el-table-column>
  </el-table>

  <!-- 退费的弹窗-->
  <el-dialog
    v-model="dialogVisible2"
    title="学员退费信息"
    width="70%"
    center
    :show-close="false"
  >
    <el-table
      :data="refundData"
      border
      style="width: 100%"
      :row-style="{ height: '30px' }"
      :cell-style="{ padding: '0px' }"
    >
      <el-table-column prop="refundDate" label="退费时间" />
      <el-table-column prop="refundMoney" label="退费金额">
        <template #default="scope">
          {{ scope.row.courseMoney + scope.row.bookFee }}
        </template>
      </el-table-column>
      <el-table-column prop="courseMoney" v-if="hidden"></el-table-column>
      <el-table-column prop="bookFee" v-if="hidden"></el-table-column>
      <el-table-column prop="refundState" label="退费状态">
        <template #default="scope">
          <span v-if="scope.row.refundState == 1">未退</span>
          <span v-else>已退</span>
        </template>
      </el-table-column>
      <el-table-column prop="studentName" label="退费学员" />
      <el-table-column prop="staffName" label="财务名字" />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="(dialogVisible2 = false), (this.refundData = [])"
          >取消</el-button
        >
      </span>
    </template>
  </el-dialog>

  <!-- 采购的弹窗-->
  <el-dialog
    v-model="dialogVisible"
    title="教材采购信息"
    width="70%"
    center
    :show-close="false"
  >
    <el-table
      :data="purchaseData"
      border
      style="width: 100%"
      :row-style="{ height: '30px' }"
      :cell-style="{ padding: '0px' }"
    >
      <el-table-column prop="purchaseName" label="教材采购名字" />
      <el-table-column prop="purchaseNumber" label="教材采购数量" />
      <el-table-column prop="purchasePrice" label="教材采购价格" />
      <el-table-column prop="purchaseAount" label="教材采购总价">
        <template #defalut="scope">{{
          scope.row.purchaseNumber * scope.row.purchasePrice
        }}</template>
      </el-table-column>
      <el-table-column prop="purchaseDate" label="教材采购时间" />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="(dialogVisible = false), (this.purchaseData = [])"
          >取消</el-button
        >
      </span>
    </template>
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
import { formatDate } from "./formDate";
export default {
  data() {
    return {
      timeSlot: "",
      Earliest: "",
      nowTime: "",
      dialogVisible: ref(false),
      dialogVisible2: ref(false),
      purchaseData: [],
      refundData: [],
      expenditureDate: [],
      minTime: "",
      pageInfo: {
        currentPage: 1,
        pagesize: 3,
        total: 0,
      },
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd HH:mm:ss");
    },
  },
  methods: {
    // 日期段时间选择器
    expendDate() {
      this.axios
        .get("http://localhost:8088/TSM/expenditureVo/selectExpendByDate", {
          params: {
            currentPage: this.pageInfo.currentPage,
            pagesize: this.pageInfo.pagesize,
            startTime: this.timeSlot[0],
            endTime: this.timeSlot[1],
          },
        })
        .then((res) => {
          this.expenditureDate = res.data.records;
          this.pageInfo.total = res.data.total;
          this.Refresh();
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
        .get("http://localhost:8088/TSM/expenditureVo/selectExpendByDate", {
          params: {
            currentPage: this.pageInfo.currentPage,
            pagesize: this.pageInfo.pagesize,
            startTime: this.timeSlot[0],
            endTime: this.timeSlot[1],
          },
        })
        .then(function (response) {
          console.log(response.data.data);
          _this.expenditureDate = response.data.records;
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
        .get("http://localhost:8088/TSM/expenditureVo/selectExpendByDate", {
          params: {
            currentPage: this.pageInfo.currentPage,
            pagesize: this.pageInfo.pagesize,
            startTime: this.timeSlot[0],
            endTime: this.timeSlot[1],
          },
        })
        .then(function (response) {
          console.log(response.data);
          _this.expenditureDate = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //查询采购支出类型的详情
    purchaseEdit(row) {
      (this.dialogVisible = true), this.purchaseData.push(row);
    },

    //查询退费支出详情
    refundEdit(row) {
      (this.dialogVisible2 = true), this.refundData.push(row);
    },
    // 刷新方法
    Refresh() {
      var _this = this;
      console.log(1);
      this.axios
        .get("http://localhost:8088/TSM/expenditureVo/selectExpendByDate", {
          params: {
            currentPage: this.pageInfo.currentPage,
            pagesize: this.pageInfo.pagesize,
            startTime: this.timeSlot[0],
            endTime: this.timeSlot[1],
          },
        })
        .then(function (response) {
          console.log(response.data);
          _this.expenditureDate = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 查询最早时间
    selectDate() {
      this.axios
        .get("http://localhost:8088/TSM/expenditure/selectMinDate")
        .then((res) => {
          this.minTime = res.data.substring(0, 10);
          this.Earliest = formatDate(this.minTime, "yyyy-MM-dd");
          console.log(this.Earliest);
          this.nowTime = formatDate(new Date(), "yyyy-MM-dd");
          this.timeSlot = [this.Earliest, this.nowTime];
          console.log(this.minTime + "时间");
        })
        .catch(function (error) {
          console.log(error);
        });
    },

  },
  created() {
    this.selectDate();
    console.log(this.timeSlot);

    var _this = this;
    this.axios
      .get("http://localhost:8088/TSM/expenditureVo/selectExpenditureVo", {
        params: {
          currentPage: this.pageInfo.currentPage,
          pagesize: this.pageInfo.pagesize,
          startTime: this.timeSlot[0],
          endTime: this.timeSlot[1],
        },
      })
      .then(function (response) {
        console.log(response.data);
        _this.expenditureDate = response.data.records;
        _this.pageInfo.total = response.data.total;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
.paysize {
  font-size: 16px;
  margin-right: 5px;
  font-weight: 500;
  margin-left: 10px;
}

.payheader .el-select .el-input__inner {
  height: 36px;
  color: #000000;
}

.payheader .el-select {
  margin-right: 30px;
}

.payheader {
  margin-bottom: 15px;
  background-color: white;
  width: 100%;
  height: 64px;
  line-height: 64px;
}

.payheader .el-input {
  width: 180px;
}

.paybox {
  margin-top: 30px;
}

.payheader .el-button {
  width: 115px;
  background: #f60;
  color: white;
  border: 1px solid white;
  text-align: center;
}

.payheader .el-button:hover {
  background: #ff5500;
}

.kong {
  width: 235px;
  display: inline-block;
}
</style>
