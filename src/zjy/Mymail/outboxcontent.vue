<template>
  <div>
    <div
      style="
        background-color: white;
        border-width: 100%;
        height: 50px;
        line-height:50px;
      "
    >
      <el-button
        style="background-color: #f60; color: aliceblue"
        @click="scf()"
        >删除</el-button
      >
      <el-button
        style="background-color: #f60; color: aliceblue"
        @click="fhf()"
        >返回</el-button
      >
    </div>
    <div class="inbox">
      <p>信件标题：{{ title }}</p>
      <p>收件人：{{ staffName2 }}</p>
      <p>
        发件人：{{ staffName1
        }}<span style="padding-left:25%">发件时间:{{ sendDate }}</span>
      </p>
      <p>
        <span style="font-size: 20px">发件内容:</span
        ><span style="font-size: 40px">{{ sendContent }}</span>
      </p>
    </div>
  </div>
  <el-table border ref="mt" :data="sandrData" style="width: 100%">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column label="收件人" width="300" prop="staffName2">
    </el-table-column>

    <el-table-column
      prop="sandrState"
      label="阅读状态"
      width="160"
    ></el-table-column>

    <el-table-column
      prop="sandrDate"
      label="阅读日期"
      show-overflow-tooltip
    ></el-table-column>
  </el-table>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      staffName: sessionStorage.getItem("staffName"),
      qkcs: "",
      id: "",
      title: "",
      staffName1: "",
      staffName2: "",
      receivingDate: "",
      receivingContent: "",
      sendDate: "",
      sendContent: "",
      a: "none",
      b: "none",
      sandrData: [],
    };
  },
  methods: {
    fhf() {
      sessionStorage.setItem("activeName", "1");
      this.$router.replace("/mymail");
    },
    scf() {
      let _this = this;
      this.axios
        .post("http://localhost:8088/TSM/send/delectsend", {
          sendId: this.id,
          deleted: "1",
        })
        .then((res) => {
          sessionStorage.setItem("activeName", "1");
          _this.$router.replace("/mymail");
          ElMessage({ message: "删除成功！", type: "success" });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    console.log("shabi");
    this.id = sessionStorage.getItem("id");
    this.title = sessionStorage.getItem("title");
    (this.staffName1 = sessionStorage.getItem("staffName1")),
      (this.staffName2 = sessionStorage.getItem("staffName2")),
      (this.sendDate = sessionStorage.getItem("sendDate")),
      (this.sendContent = sessionStorage.getItem("sendContent"));
    let _this = this;

    this.axios
      .post("http://localhost:8088/TSM/sendAndReceiving/findsandr/" + this.id)

      .then((res) => {
        console.log(res);
        console.log(res.data);
        _this.sandrData = res.data;
      });
  },
};
</script>

<style></style>
