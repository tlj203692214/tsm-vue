<template>
  <div
    style="
      background-color: white;
      height: 60px;
      line-height: 60px;
    "
    class="diva"
  >
    阅读状态:<select v-model="pageInfo.zt" @change="sszt" class="d">
      <option value="a">全部邮件</option>
      <option value="b">已读邮件</option>
      <option value="c">未读邮件</option>
    </select>
    <div class="b">
      快速检索:<select v-model="pageInfo.js" class="c">
        <option value="标题">
          <el-icon><delete-filled /></el-icon>标题
        </option>
        <option value="发送人">
          <el-icon><delete-filled /></el-icon>发送人
        </option>
      </select>
    </div>
    <el-input
      style="width: 200px"
      v-model="pageInfo.input"
      :placeholder="a + this.pageInfo.js + b"
      clearable
    />
    <el-button @click="ksjs()"
      ><el-icon><search /></el-icon>搜索</el-button
    >
  </div>
  <div class="e">
    <el-button
      style="background-color: #f60; color: white"
      :icon="CircleCloseFilled"
      @click="deleteFileOrDirectory(sjxsz)"
      :disabled="this.sjxsz.length === 0"
      ><el-icon><delete-filled /></el-icon>删除</el-button
    >
  </div>

  <el-table
    border
    ref="mt"
    :data="receivingData"
    style="width: 100%"
    @selection-change="sjxszchange"
    :row-class-name="tableRowClassName"
  >
    <el-table-column type="selection" width="55"></el-table-column>

    <el-table-column prop="receivingsState" label="状态" width="120">
      <template #default="scope">
        <span v-if="scope.row.receivingsState.includes(this.staffName)"
          >已读</span
        >
        <span v-else>未读</span>
      </template>
    </el-table-column>
    <!-- <el-table-column   v-else prop="receivingsState"  label="状态" width="120"> -->

    <!-- </el-table-column> -->

    <el-table-column label="标题" width="300">
      <template #default="scope">
        <span class="a" @click="cknr(scope.row)">{{
          scope.row.receivingsTitle
        }}</span>
      </template>
    </el-table-column>

    <el-table-column
      prop="staffName2"
      label="全部收件人"
      width="160"
    ></el-table-column>
    <el-table-column
      prop="staffName1"
      label="发件人"
      width="200"
    ></el-table-column>
    <el-table-column
      prop="receivingsDate"
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
</template>

<script>
import { defineComponent, ref } from "vue";
import qs from "qs";
import {
  ArrowLeft,
  Edit,
  Share,
  Delete,
  ArrowRight,
  Close,
  Apple,
  Search,
  ArrowDown,
  CircleCloseFilled,
} from "@element-plus/icons";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      staffName: sessionStorage.getItem("staffName"),
      a: "根据",
      b: "查询",
      sjxsz: [],
      inputs: "",
      receivingData: [],
      pageInfo: {
        currentPage: 1,
        pagesize: 3,
        total: 0,
        js: "标题",
        zt: "a",
        input: "",
        StaffNames: sessionStorage.getItem("staffName"),
      },
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "gray";
      }
      return "";
    },
    handeDel(row) {
      let _this = this;
      this.axios
        .post("http://localhost:8088/TSM/receiving/delectreceiving", {
          receivingsId: row.receivingsId,
          staffName2: this.staffName,
        })
        .then((res) => {
          _this.creat();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    creat() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/receiving/receiving", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.receivingData = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteFileOrDirectory(sjxsz) {
      for (var i = 0; i < sjxsz.length; i++) {
        this.handeDel(sjxsz[i]);
      }
      ElMessage({ message: "删除成功！", type: "success" });
    },
    sjxszchange(sjxsz) {
      this.sjxsz = sjxsz;
    },
    cknr(scope) {
      this.axios
        .post("http://localhost:8088/TSM/receiving/xgreceiving", {
          receivingsId: scope.receivingsId,
          staffName2: this.pageInfo.StaffNames,
        })
        .then((response) => {
          console.log("sadasdas");
        })
        .catch(function (error) {
          console.log(error);
        });
      this.axios
        .post("http://localhost:8088/TSM/sendAndReceiving/xgsandr", {
          sendId: scope.receivingsId,
          staffName2: this.staffName,
        })
        .then((response) => {
          console.log("打撒打死");
        })
        .catch(function (error) {
          console.log(error);
        });
      sessionStorage.setItem("id", scope.receivingsId),
        sessionStorage.setItem("title", scope.receivingsTitle),
        sessionStorage.setItem("staffName1", scope.staffName1),
        sessionStorage.setItem("staffName2", scope.staffName2),
        sessionStorage.setItem("receivingContent", scope.receivingsContent),
        sessionStorage.setItem("receivingDate", scope.receivingsDate),
        this.$router.push("/Inboxcontent");
    },
    // sjxszchange(sjxsz){
    // 	// const myDate = new Date()
    // 	//       this.week = '星期' + '日一二三四五六'.charAt(myDate.getDay())
    // 	// 	  alert(this.week)
    // 	this.sjxsz=sjxsz

    // },
    sszt() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/receiving/receiving", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.receivingData = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    ksjs() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/receiving/receiving", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.receivingData = response.data.records;
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
        .get("http://localhost:8088/TSM/receiving/receiving", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log("1-------------------------------------------");
          console.log(response.data);
          _this.receivingData = response.data.records;
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
        .get("http://localhost:8088/TSM/receiving/receiving", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log("2-------------------------------------------");
          console.log(response.data);
          _this.receivingData = response.data.records;
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
      .get("http://localhost:8088/TSM/receiving/receiving", {
        params: this.pageInfo,
      })
      .then(function (response) {
        console.log(response.data);
        _this.receivingData = response.data.records;
        _this.pageInfo.total = response.data.total;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
.a {
  color: blue;
}

.b {
  /* width: 913px; */
  margin-left: 32px;
  margin-top: -2%;
  display: inline-block;
}

.c {
  width: 15%;
  height: 36px;
  border: 1px solid #d4cfcf;
  border-radius: 5px;
}
.diva .el-input .el-input__inner {
  height: 36px;
  margin-left: 30px;
  width: 200px;
}
.diva .d {
  width: 15%;
  height: 36px;
  border: 1px solid #d4cfcf;
  border-radius: 5px;
}
.diva .el-button {
  margin-left: 30px;
  background: #f60;
  color: white;
}

/* .el-table .gray{
		background-color:lightgray;
	} */
</style>
