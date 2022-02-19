<template>
  <div>
    <div
      style="
        border: solid 1px white;
        background-color: #e1fff7;
        border-width: 100%;
        height: 40px;
      "
    >
      <el-button
        style="background-color: #0000ff; color: aliceblue"
        @click="hf()"
        ><el-icon><position /></el-icon>回复</el-button
      >
      <el-button
        style="background-color: #0000ff; color: aliceblue"
        @click="zf()"
        ><el-icon><share /></el-icon>转发</el-button
      >
      <el-button
        style="background-color: #0000ff; color: aliceblue"
        @click="scs()"
        ><el-icon><delete-filled /></el-icon>删除</el-button
      >
      <el-button
        style="background-color: #0000ff; color: aliceblue"
        @click="fhs()"
        ><el-icon><toilet-paper /></el-icon>返回</el-button
      >
    </div>
    <div class="inbox">
      <p>信件标题：{{ title }}</p>
      <p>收件人：{{ staffName2 }}</p>
      <p>
        发件人：{{ staffName1
        }}<span style="padding-left: 40%">发件时间:{{ receivingDate }}</span>
      </p>
      <p>
        <span style="font-size: 20px">发件内容:</span
        ><span style="font-size: 50px">{{ receivingContent }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import qs from "qs";
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
    };
  },
  methods: {
    fhs() {
      sessionStorage.setItem("activeName", "0");
      this.$router.replace("/mymail");
    },

    scs() {
      let _this = this;
      this.axios
        .post("http://localhost:8088/TSM/receiving/delectreceiving", {
          receivingsId: this.id,
          staffName2: this.staffName,
        })
        .then((res) => {
          console.log("bianhaobianhao");

          sessionStorage.setItem("activeName", "0");
          _this.$router.replace("/mymail");
          ElMessage({ message: "删除成功！", type: "success" });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    zf() {
      sessionStorage.setItem("zfbt", "转发：" + this.title);
      sessionStorage.setItem("zfnr", this.receivingContent);
      sessionStorage.setItem("qkcs", "zf");
      sessionStorage.setItem("activeName", "3");
      this.$router.push("mymail");
    },
    hf() {
      sessionStorage.setItem("hfbt", "回复：" + this.title);
      sessionStorage.setItem("hfnr", this.receivingContent);
      sessionStorage.setItem("fjr", this.staffName1);
      sessionStorage.setItem("qkcs", "hf");
      sessionStorage.setItem("activeName", "3");
      this.$router.replace("/mymail");
    },
  },

  // watch: {
  //     '$route' (to, from) {

  //     }
  // },
  created() {
    console.log("shabi");
    this.id = sessionStorage.getItem("id");
    this.title = sessionStorage.getItem("title");
    (this.staffName1 = sessionStorage.getItem("staffName1")),
      (this.staffName2 = sessionStorage.getItem("staffName2")),
      (this.receivingDate = sessionStorage.getItem("receivingDate")),
      (this.receivingContent = sessionStorage.getItem("receivingContent"));
  },
};
</script>

<style>
.inbox p {
  margin: 30px 0;
}
</style>
