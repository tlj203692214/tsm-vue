<template>
  <!-- 包住所有内容 -->
  <div>
    <!-- 头部 -->
    <div
      style="
        padding-top: 3%;
        border-bottom: 3px solid #eee;
        padding-bottom: 1%;
        margin-left: 7.5%;
        width: 85%;
      "
    >
      <span style="margin-left: 0%; color: #303133; font-size: 14px"
        >报名方式：</span
      >
      <span
        style="
          border: none;
          color: #f60;
          background-color: white;
          font-size: 14px;
          margin-left: 1%;
          cursor: pointer;
        "
        @click="centerDialogVisible = true"
        >选课报名</span
      >
    </div>
    <!-- 中间部分 -->
    <div style="padding-top: 2%; margin-left: 6%; padding-bottom: 1%">
      <span
        style="
          background-color: #409eff;
          width: 0.5%;
          height: 0.5%;
          margin-left: 2%;
        "
        >&nbsp;</span
      >
      <div style="margin-top: -1.5%; margin-left: 3.5%">
        <span style="color: #303133; font-size: 14px; font-weight: 700"
          >选择的课程</span
        >
      </div>
    </div>
    <!-- 
    ========================================================================================================================  
      表格
       -->
    <div>
      <el-table
        class="tableOne"
        :data="tableData"
        style="width: 84%; margin-left: 2%; margin-top: 2%; margin: 0 auto;max-height=300"
      >
        <el-table-column
          prop="courname"
          style="margin: 0 auto"
          label="课程名称"
          width="160"
        >
        </el-table-column>
        <el-table-column prop="couramount" label="课程金额" width="160">
        </el-table-column>
        <el-table-column prop="courhours" label="课时数量" width="160">
        </el-table-column>
        <el-table-column prop="courprice" label="课时单价" width="160">
        </el-table-column>
        <el-table-column prop="courbook" label="书本费" width="160">
        </el-table-column>
        <el-table-column prop="courpayable" label="应付金额" width="160">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button
              @click="open(), handleClick(scope.row)"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 
      ========================================================================================================================
      选课报名弹框 
      -->
    <el-dialog
      v-model="centerDialogVisible"
      title="选择课程"
      width="45%"
      destroy-on-close
      center
    >
      <!-- 弹框： 搜索文本框 -->
      <el-input
        placeholder="请输入课程名称"
        style="width: 25%"
        size="small"
        v-model="input"
        clearable
      >
      </el-input>
      <!-- 弹框： 搜索按钮 -->
      <div class="searchbutton">
        <el-icon color="white"><search /></el-icon>
     
      </div>
      <!-- 重置 -->
      <el-link
        :underline="false"
        style="color: rgb(0, 0, 0); margin-top: -8%; margin-left: 36%"
        >重&nbsp;置</el-link
      >
      <!--
      ==========================================================================================================================   
        弹框表格 -->
      <div class="wrap">
         <div class="myTable">
        <el-table
          :data="tableDataTwo"
          class="tableTwo"
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
         
           @select="select"
    @row-click="rowClick"
    @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="curnameTwo" label="课程名称" width="120">
          </el-table-column>
          <el-table-column prop="courhoursTwo" label="课程数量" width="120">
          </el-table-column>
          <el-table-column prop="courpriceTwo" label="课时单价" width="120">
          </el-table-column>
          <el-table-column prop="courbookTwo" label="书本费" width="120">
          </el-table-column>
          <el-table-column
            prop="couramountTwo"
            label="课时金额"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
        </div>
      </div>
      <br />
      <!-- 
        ==========================================================================================================================
        分页
         -->
      <div class="block" style="margin-left: 1%">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="sizes"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="4"
        >
        </el-pagination>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
// 弹框
import { defineComponent, ref } from "vue";

export default {
  methods: {
    // 表格
    handleClick(row) {
      console.log(row);
    },
   // 表格的选中 可以获得当前选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }, 
    select(selection, row) {
	// 清除 所有勾选项
	this.$refs.multipleTable.clearSelection()
	// 当表格数据都没有被勾选的时候 就返回
	// 主要用于将当前勾选的表格状态清除
	if(selection.length == 0) return 
	this.$refs.multipleTable.toggleRowSelection(row, true);
},
// 表格某一行的单击事件
rowClick(row, column) {
    const selectData = this.multipleSelection
    this.$refs.multipleTable.clearSelection()
    if( selectData.length==1 ) {
        selectData.forEach(item => {
        	// 判断 如果当前的一行被勾选, 再次点击的时候就会取消选中
            if (item == row) {
                this.$refs.multipleTable.toggleRowSelection(row, false);
            }
            // 不然就让当前的一行勾选
            else {
                this.$refs.multipleTable.toggleRowSelection(row, true);
            }
        })
    } 
    else {
        this.$refs.multipleTable.toggleRowSelection(row, true);
    }
},


    
    
    
    // 分页
    handleSizeChange(val) {
      this.size = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    // 表格删除弹框
    open() {
      this.$confirm("确定删除此课程吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },

  data() {
    return {
      multipleSelection:[],
      radio:false,
      // 表格
      tableData: [
        {
          courname: "java",
          couramount: "2300",
          courhours: "23",
          courprice: "100",
          courbook: "800",
          courpayable: "40000",
        },
        {
          courname: "java",
          couramount: "2300",
          courhours: "23",
          courprice: "100",
          courbook: "800",
          courpayable: "40000",
        },
        {
          courname: "java",
          couramount: "2300",
          courhours: "23",
          courprice: "100",
          courbook: "800",
          courpayable: "40000",
        },
        {
          courname: "java",
          couramount: "2300",
          courhours: "23",
          courprice: "100",
          courbook: "800",
          courpayable: "40000",
        },
      ],
      // 弹框的表格
      tableDataTwo: [
        {
          curnameTwo: "java",
          courhoursTwo: "22",
          courpriceTwo: "200",
          courbookTwo: "800",
          couramountTwo: "3200",
        },
        {
          curnameTwo: "java",
          courhoursTwo: "22",
          courpriceTwo: "200",
          courbookTwo: "800",
          couramountTwo: "3200",
        },
        {
          curnameTwo: "java",
          courhoursTwo: "22",
          courpriceTwo: "200",
          courbookTwo: "800",
          couramountTwo: "3200",
        },
        {
          curnameTwo: "java",
          courhoursTwo: "22",
          courpriceTwo: "200",
          courbookTwo: "800",
          couramountTwo: "3200",
        },
      ],
      // 弹框
      centerDialogVisible: ref(false),
      //  弹框内容：  搜索文本框
      input: "",
      // 分页
      sizes: [1, 2, 3, 4],
      size: 1,
      currentPage: 1,
    };
  },
};
</script>
<style>
/* 搜索按钮 */
.searchbutton {
  background-color: #f60;
  width: 4%;
  margin-top: -5%;
  margin-left: 25%;
  padding: 1%;
  padding-left: 2%;
  border-top-right-radius: 10%;
  border-bottom-right-radius: 10%;
}
/* 表格 */
.tableOne.el-table--border th.el-table__cell {
  background: #ebeff3;
}
/* 弹框表格 */
.tableTwo.el-table--border th.el-table__cell {
  background: #ebeff3;
}

</style>

<style lang="less" scoped>
.wrap {
 
  /deep/ .myTable {
    /*  审查DOM也可以找到这个结构，同上  */
    .el-table__header-wrapper {
      .el-checkbox__inner {
        display: none !important;
      }
    }
  }
}
</style>
