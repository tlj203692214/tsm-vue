<template>
  <div class="payheader">
    <span class="paysize">学员名称：</span>
    <el-input v-model="input" placeholder="请输入名字" />
    <span class="kong"></span>
    <el-button>查询</el-button>
    <el-button>删除</el-button>
  </div>

  <!--校务支出分页查询-->
  <el-table ref="tableDate" :data="expenditureDate" border style="width: 100%">
    <el-table-column type="selection" width="50"></el-table-column>
    <el-table-column prop="expenditureId" label="编号" width="120">
      <template #default="scope">{{ scope.row.expenditureId }}</template>
    </el-table-column>
    <el-table-column prop="expenditureMoney" label="校务支出金额" width="180">
      <template #default="scope">
        <span v-if="scope.row.purchaseId == null">{{
          scope.row.courseMoney + scope.row.bookFee
        }}</span>
        <span v-else-if="scope.row.refundId == 0">{{
          scope.row.purchaseNumber * scope.row.purchasePrice
        }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="expenditureDate" label="校务支出时间" width="180" />
    <el-table-column label="支出类型" width="180">
      <template #default="scope">
        <span v-if="scope.row.purchaseId == null" @click="refundEdit(scope.row)"
          >退费支出</span
        >
        <span
          v-else-if="scope.row.refundId == 0"
          @click="purchaseEdit(scope.row)"
          >采购支出</span
        >
      </template>
    </el-table-column>
    <el-table-column prop="deleted" label="是否可用">
      <template #default="scope">
        <span v-if="scope.row.deleted == '1'">不可用</span>
        <span v-else>可用</span>
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
    <el-button
      style="
        width: 100px;
        background: #f60;
        color: white;
        border: 1px solid white;
        text-align: center;
      "
      >审核通过</el-button
    >
    <el-table :data="refundData" border style="width: 100%">
      <el-table-column prop="refundDate" label="退费时间" width="180" />
      <el-table-column prop="refundMoney" label="退费金额" width="180">
        <template #default="scope">
          {{ scope.row.courseMoney + scope.row.bookFee }}
        </template>
      </el-table-column>
      <el-table-column prop="courseMoney" v-if="hidden"></el-table-column>
      <el-table-column prop="bookFee" v-if="hidden"></el-table-column>
      <el-table-column prop="refundState" label="退费状态" width="180">
        <template #default="scope">
          <span v-if="scope.row.refundState == 1">未退</span>
          <span v-else>已退</span>
        </template>
      </el-table-column>
      <el-table-column prop="studentName" label="退费学员" width="180" />
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
    <el-table :data="purchaseData" border style="width: 100%">
      <el-table-column prop="purchaseName" label="教材采购名字" width="180" />
      <el-table-column prop="purchaseNumber" label="教材采购数量" width="180" />
      <el-table-column prop="purchasePrice" label="教材采购价格" width="180" />
      <el-table-column prop="purchaseAount" label="教材采购总价" width="180">
        <template #defalut="scope">{{
          scope.row.purchaseNumber * scope.row.purchasePrice
        }}</template>
      </el-table-column>
      <el-table-column prop="purchaseDate" label="教材采购时间" width="180" />
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
import { ElConfigProvider } from "element-plus";

export default {
  data() {
    return {
      input: ref(""),
      dialogVisible: ref(false),
      dialogVisible2: ref(false),
      purchaseData: [],
      refundData: [],
      expenditureDate: [],
      pageInfo: {
        currentPage: 1,
        pagesize: 3,
        total: 0,
      
      },
    }
  },
  methods: {
    handleCurrentChange(page) {
      var _this = this;
      this.pageInfo.currentPage = page;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/expenditureVo/selectExpenditureVo", {
          params: this.pageInfo,
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
        .get("http://localhost:8088/TSM/expenditureVo/selectExpenditureVo", {
          params: this.pageInfo,
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
    //根据状态查询
    selectState() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/expenditureVo/selectExpenditureVo", {
          params: this.pageInfo,
        })
        .then(function (response) {
          _this.expenditureDate = response.data.records;
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
      .get("http://localhost:8088/TSM/expenditureVo/selectExpenditureVo", {
        params: this.pageInfo,
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
}

.payheader .el-select .el-input__inner {
  height: 36px;
  /* border: 1px solid #000000; */
  color: #000000;
}

.payheader .el-select {
  margin-right: 30px;
}

.payheader {
  margin-top: 40px;
  margin-bottom: 40px;
  float: left;
}

.payheader .el-input {
  width: 180px;
}

.paybox {
  margin-top: 30px;
}

.payheader .el-button {
  width: 100px;
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
