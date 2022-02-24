<template>
  <div style="background-color: white;
	width: 100%;
	height: 60px;
	line-height: 60px;margin-bottom:30px;" class="diva">
    <div class="b">
      检索条件:<select v-model="pageInfo.zt" class="c" @change="creat()">
        <option value="全部的意见">
          <el-icon><delete-filled /></el-icon>全部的意见
        </option>
        <option value="待回复的意见">
          <el-icon><delete-filled /></el-icon>待回复的意见
        </option>
        <option value="已回复的意见">
          <el-icon><delete-filled /></el-icon>已回复的意见
        </option>
      </select>
    </div>
     
    <el-button
      style="background-color: #f60; color: white"
      :icon="CircleCloseFilled"
      @click="fsyj = true"
      ><el-icon><circle-plus-filled /></el-icon>新增</el-button
    >

  </div>
 
  <el-table
    border
    ref="mt"
    :data="commentsfData"
    style="width: 100%"
    @selection-change="sjxszchange"
    :row-class-name="tableRowClassName"
  >
    <el-table-column type="selection" width="55"></el-table-column>

    <el-table-column prop="opinionTitle" label="意见标题" width="320">
      <template #default="scope">
        <span class="a" @click="cknr(scope.row), (xgyj = true)">{{
          scope.row.opinionTitle
        }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="suggestionsId" label="意见箱" width="150">
      <template #default="scope">
        <span v-for="suggestionsDatas in suggestionsDatas">
          <span
            v-if="scope.row.suggestionsId == suggestionsDatas.suggestionsId"
            >{{ suggestionsDatas.suggestionsName }}</span
          >
        </span>
      </template>
    </el-table-column>

    <el-table-column prop="staffId" label="管理员" width="160">
      <template #default="scope">
        <span v-for="suggestionsDatas in suggestionsDatas">
          <span
            v-if="scope.row.suggestionsId == suggestionsDatas.suggestionsId"
          >
            <span v-for="staffData in staffData">
              <span v-if="suggestionsDatas.staffId == staffData.staffId"
                >{{ staffData.staffName }}
              </span>
            </span>
          </span>
        </span>
      </template>
    </el-table-column>
    <el-table-column
      prop="publisher"
      label="发表人"
      width="100"
    ></el-table-column>
    <el-table-column
      prop="publicationTime"
      label="发表时间"
      width="200"
    ></el-table-column>
    <el-table-column
      prop="respondent"
      label="回复人"
      width="100"
    ></el-table-column>
    <el-table-column
      prop="replyTime"
      label="回复时间"
      show-overflow-tooltip
    ></el-table-column>
  </el-table>
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
    v-model="fsyj"
    title="新增意见"
    width="70%"
    center
    :show-close="false"
  >
    <el-form
      ref="ruleForm"
      class="demo-ruleForm"
      :model="ruleForm"
      :rules="rules"
    >
      <el-form-item
        label="选择意见箱:"
        style="float: left"
        prop="suggestionsId"
      >
        <el-select
          v-model="ruleForm.suggestionsId"
          @change="selectstaffId()"
          filterable
          placeholder=" "
          allow-create
        >
          <el-option
            v-for="suggestionsData in suggestionsData"
            :key="suggestionsData.suggestionsName"
            :label="suggestionsData.suggestionsName"
            :value="suggestionsData.suggestionsId"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="意见标题:" prop="opinionTitle">
        <el-input
          v-model="ruleForm.opinionTitle"
          style="width: 200px"
        ></el-input>
      </el-form-item>

      <el-form-item label="意见内容:" prop="opinionContent">
        <div class="wenbenyu">
          <el-input
            v-model="ruleForm.opinionContent"
            type="textarea"
          ></el-input>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="addOpinion('ruleForm')">
          <el-icon><check /></el-icon>保存</el-button
        >
      </span>

      <span class="dialog-footer">
        <el-button type="primary" @click="gbjm('ruleForm')">
          <el-icon><circle-close-filled /></el-icon>关闭</el-button
        >
      </span>
    </template>
  </el-dialog>

  <!-- 修改界面-->
  <el-dialog v-model="xgyj" title="编辑意见" width="55%" :show-close="false">
    <el-form
      ref="ruleForm"
      class="demo-ruleForm"
      :model="ruleForm"
      :rules="rules"
    >
      <div class="yjxx" style="background-color: white">
        <div :style="{ display: b }" style="float: left; margin-right: 5px">
          <el-button
            type="primary"
            style="background-color: #f60; color: white"
            :icon="CircleCloseFilled"
            size="mini"
            @click="updateopinion('ruleForm')"
            ><el-icon><check /></el-icon>保存</el-button
          >
          <el-button
            style="background-color: #f60; color: white"
            :icon="CircleCloseFilled"
            size="mini"
            @click="delectopinion()"
            ><el-icon><delete-filled /></el-icon>删除</el-button
          >
        </div>
        <el-button
          type="primary"
          style="background-color: #f60; color: white"
          :icon="CircleCloseFilled"
          size="mini"
          @click="gbjm('ruleForm')"
          ><el-icon><circle-close-filled /></el-icon>关闭</el-button
        >
      </div>
      意见信息
      <div class="yjxx" style="border: 1px solid; height: 20%">
        <p>意见标题：{{ this.xx.opinionTitle }}</p>
        <p>
          <span>发表人：{{ this.xx.publisher }}</span
          ><span style="margin-left: 50%"
            >发表时间：{{ this.xx.publicationTime }}</span
          >
        </p>
      </div>
      意见内容
      <el-form-item prop="opinionContent">
        <div class="wenbenyu">
          <el-input
            :disabled="a"
            v-model="this.ruleForm.opinionContent"
            type="textarea"
          ></el-input>
        </div>
      </el-form-item>
    </el-form>
    回复信息
    <div class="yjxx" style="border: 1px solid; height: 20%">
      <p>回复内容：{{ this.xx.replyContent }}</p>
      <p>
        <span>回复人：{{ this.xx.respondent }}</span
        ><span style="margin-left: 50%">回复时间：{{ this.xx.replyTime }}</span>
      </p>
    </div>
  </el-dialog>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import qs from "qs";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      a: "", //div显示隐藏参数
      b: "", //div显示隐藏参数
      ads: "", //管理员编号
      xgyj: ref(false),
      suggestionsDatas: [], //所有意见集合
      staffData: [], //员工集合
      suggestionsData: [], //该用户可使用意见箱范围集合
      staffName: sessionStorage.getItem("staffName"), //登陆用户姓名
      fsyj: ref(false),
      commentsfData: [], //意见集合
      pageInfo: {
        //分页模糊查询参数
        currentPage: 1,
        pagesize: 3,
        total: 0,
        zt: "全部的意见",
        staffId: sessionStorage.getItem("staffId"),
        staffName: sessionStorage.getItem("staffName"),
      },
      xx: {
        suggestionsId: "", //管理员
        staffId: "", //管理员
        opinionId: "", //意见编号
        opinionTitle: "", //意见标题
        opinionContent: "", //意见内容
        publisher: "", //发表人
        publicationTime: "", //发表时间
        respondent: "", //回复人
        replyContent: "", //回复内容
        replyTime: "", //回复时间
      },
      ruleForm: {
        suggestionsId: "",
        opinionTitle: "",
        opinionContent: "",
      },
      rules: {
        suggestionsId: [
          {
            required: true,
            message: "意见箱不能为空！",
            trigger: "blur",
          },
        ],
        opinionTitle: [
          {
            required: true,
            message: "意见标题不能为空！",
            trigger: "blur",
          },
        ],
        opinionContent: [
          {
            required: true,
            message: "意见内容不能为空！",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    gbjm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.opinionContent = "";
      this.xgyj = false;
      this.fsyj = false;
    },
    delectopinion() {
      //删除意见
      let _this = this;
      this.axios
        .post("http://localhost:8088/TSM/opinion/delectOpinion/"+this.xx.opinionId)
        .then((response) => {
          _this.xgyj = false;
          _this.creat();

          ElMessage({ message: "删除成功！", type: "success" });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updateopinion(formName) {
      //修改意见
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post("http://localhost:8088/TSM/opinion/updateOpinion", {
              opinionId: this.xx.opinionId,
              staffId: this.xx.staffId,
              opinionContent: this.ruleForm.opinionContent,
              suggestionsId: this.xx.suggestionsId,
            })
            .then((response) => {
              _this.$refs[formName].resetFields();
              _this.ruleForm.opinionContent = "";
              _this.xgyj = false;
              _this.creat();
              ElMessage({ message: "修改成功！", type: "success" });
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          ElMessage({ message: "内容不能为空！", type: "warning" });

          return false;
        }
      });
    },
    cknr(row) {
      (this.xx.suggestionsId = row.suggestionsId),
        (this.xx.staffId = row.staffId),
        (this.xx.opinionId = row.opinionId),
        (this.xx.opinionTitle = row.opinionTitle),
        (this.ruleForm.opinionContent = row.opinionContent),
        (this.xx.publisher = row.publisher),
        (this.xx.publicationTime = row.publicationTime),
        (this.xx.respondent = row.respondent),
        (this.xx.replyContent = row.replyContent);
      if (this.xx.replyContent == null) {
        this.a = "true";
        this.b = "";
      } else {
        this.a = "disabled";
        this.b = "none";
      }
      this.xx.replyTime = row.replyTime;
    },
    addOpinion(formName) {
      //新增意见
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post("http://localhost:8088/TSM/opinion/addOpinion", {
              suggestionsId: this.ruleForm.suggestionsId,
              opinionTitle: this.ruleForm.opinionTitle,
              opinionContent: this.ruleForm.opinionContent,
              publisher: this.staffName,
              staffId: this.ads,
            })
            .then((response) => {
              this.$refs[formName].resetFields();
              console.log(response.data);
              _this.fsyj = false;
              _this.creat();
              ElMessage({ message: "新增成功！", type: "success" });
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          ElMessage({ message: "请完善信息！", type: "warning" });

          return false;
        }
      });
    },
    creat() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/opinion/opinion", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.commentsfData = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectsuggestions() {
      //查询该用户可使用意见箱范围
      let _this = this;

      this.axios
        .post(
          "http://localhost:8088/TSM/suggestions/selectSuggestions/" +
            this.staffName
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
          _this.suggestionsData = res.data;
        });
    },
    selectstaffId() {
      //查询管理员编号

      this.axios
        .post(
          "http://localhost:8088/TSM/suggestions/selectStaffId/" +
            this.ruleForm.suggestionsId
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.ads = res.data[0].staffId;
        });
    },
    selectsuggestionss() {
      //查询所有意见箱
      let _this = this;

      this.axios
        .post("http://localhost:8088/TSM/suggestions/selectSuggestionss")
        .then((res) => {
          console.log(res);
          console.log(res.data);
          _this.suggestionsDatas = res.data;
        });
    },
    handleCurrentChange(page) {
      var _this = this;
      this.pageInfo.currentPage = page;

      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/opinion/opinion", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log("1-------------------------------------------");
          console.log(response.data);
          _this.commentsfData = response.data.records;
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
        .get("http://localhost:8088/TSM/opinion/opinion", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log("2-------------------------------------------");
          console.log(response.data);
          _this.commentsfData = response.data.records;
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
  },
  created() {
    this.cxyh();
    this.selectsuggestions();
    this.selectsuggestionss();
    console.log("集合" + this.suggestionsData);

    console.log("aaaaaaaaaa");
    var _this = this;
    this.axios
      .get("http://localhost:8088/TSM/opinion/opinion", {
        params: this.pageInfo,
      })
      .then(function (response) {
        console.log(response.data);
        _this.commentsfData = response.data.records;
        _this.pageInfo.total = response.data.total;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
.yjxx p {
  margin: 20px 2rem 0;
}
.wenbenyu .el-textarea .el-textarea__inner {
  height: 100px;
}
</style>
