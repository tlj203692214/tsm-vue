<template>
  <el-form
    ref="ruleForm"
    class="demo-ruleForm"
    :model="ruleForm"
    :rules="rules"
    :label-position="left"
  >
    <el-form-item label="标题:" prop="title">
      <el-input
        style="width: 1000px; height: 0.625rem; margin-top: 1%"
        v-model="ruleForm.title"
        clearable
      />
    </el-form-item>
    <el-form-item label="收件人:" prop="sjr">
      <el-input
        style="width: 1000px; height: 0.625rem"
        readonly="readonly"
        v-model="ruleForm.sjr"
        @click="(centerDialogVisible = true), cx(), qk(), selectDept()"
      />
    </el-form-item>
    <el-form-item label="信件内容:" prop="content">
      <el-input
        type="textarea"
        style="width:1000px;height:0.625rem;"
        v-model="ruleForm.content"
        clearable
      />
    </el-form-item>
    <el-button
      type="primary"
      @click="qrfs('ruleForm')"
      style="background-color: #f60; margin-top: 2%"
      >确认发送</el-button
    >
    <el-button
      type="primary"
      @click="bccg('ruleForm')"
      style="background-color: #f60; margin-top: 2%"
      >保存草稿</el-button
    >
  </el-form>
  <el-dialog
    v-model="centerDialogVisible"
    title="选择用户"
    width="50%"
    style="background-color: #f60"
  >
    <div>
      <el-button @click="xzwc()" style="background-color: #f60;color:white;"
        >选择并关闭</el-button
      >
    </div>
    部门查询：
    <el-cascader :props="props" @change="cx" v-model="DeptId" />

    姓名查询：<el-input
      style="width: 200px; height: auto"
      v-model="ruleForm.staffName"
      clearable
    /><el-button @click="cx()" style="background:#f60;color:white">
      <el-icon><search /></el-icon
    ></el-button>
    <el-checkbox-group v-model="yhsz">
      <el-checkbox
        v-for="staffData in staffData"
        :label="staffData.staffName"
        :key="staffData.staffName"
        ><span>{{ staffData.staffName }}</span></el-checkbox
      >
    </el-checkbox-group>
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
        checkStrictly: true,
        lazy: true,
        lazyLoad: this.getCheckedNodes,
      },
      DeptId: "0", //部门id(数组)
      deptId: "", //部门id（字符串）
      DeptData: [], //部门表信息
      staffData: [], //员工表信息
      yhsz: [], //所有用户
      centerDialogVisible: ref(false),
      ruleForm: {
        staffName: "",
        deleted: 0,
        staffNamef: sessionStorage.getItem("staffName"),
        staffNames: "",
        title: "", //邮件标题
        content: "", //邮件内容
        sjr: [], //收件人
      },
      rules: {
        title: [
          {
            required: true,
            message: "信件标题不能为空！",
            trigger: "blur",
          },
        ],
        sjr: [
          {
            required: true,
            message: "收件人不能为空！",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "信件内容不能为空！",
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
    bccg(formName) {
      //保存草稿  在草稿箱中添加一条数据
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for (var i = 0; i < this.ruleForm.sjr.length; i++) {
            this.ruleForm.staffNames += this.ruleForm.sjr[i] + ","; //将数组转化为字符串
          }
          //去掉最后一个逗号
          if (this.ruleForm.staffNames.length > 0) {
            this.ruleForm.staffNames = this.ruleForm.staffNames.substr(
              0,
              this.ruleForm.staffNames.length - 1
            );
          }

          this.axios
            .post("http://localhost:8088/TSM/draft/addDraft", {
              draftTitle: this.ruleForm.title,
              draftContent: this.ruleForm.content,
              staffName1: this.ruleForm.staffNamef,
              staffName2: this.ruleForm.staffNames,
            })
            .then(function (res) {
              console.log(_this.yhsz);
              _this.ruleForm.staffNames = "";

              _this.ruleForm.title = "";
              (_this.ruleForm.content = ""),
                (_this.ruleForm.sjr = []),
                (_this.yhsz = []), //清空参数
                ElMessage({ message: "保存成功！", type: "success" });
            })
            .catch(function (erreo) {
              console.log(erreo);
            });
        } else {
          ElMessage({ message: "请完善信息！", type: "warning" });
          return false;
        }
      });
    },
    qk() {
      this.yhsz = this.ruleForm.sjr; //读取文本框用户
      this.ruleForm.staffName = ""; //清空之前的数据
    },
    cx() {
      //查询用户

      this.deptId = this.DeptId[this.DeptId.length - 1];
      this.axios
        .post("http://localhost:8088/TSM/staff/cxyh", {
          staffId: this.deptId,
          staffName: this.ruleForm.staffName,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.staffData = res.data;
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

    xzwc() {
      this.centerDialogVisible = false;

      this.ruleForm.sjr = this.yhsz; //将数组读取
    },
    aa(sz, id) {
      //添加收件表和发件表的中间表数据方法

      this.axios
        .post("http://localhost:8088/TSM/sendAndReceiving/addsandr", {
          staffName2: sz,
          sendId: id,
        })
        .then((response) => {})
        .catch(function (erreo) {
          console.log(erreo);
        });
    },
    tjsjx(id) {
      //添加收件箱数据方法
      let _this = this;
      this.axios
        .post("http://localhost:8088/TSM/receiving/addreceiving", {
          receivingsId: id,
          receivingsTitle: this.ruleForm.title,
          receivingsContent: this.ruleForm.content,
          staffName1: this.ruleForm.staffNamef,
          staffName2: this.ruleForm.staffNames,
        })
        .then((response) => {
          _this.ruleForm.staffNames = "";
        })
        .catch(function (erreo) {
          console.log(erreo);
        });
    },
    qrfs(formName) {
      //点击确认发送添加数据
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for (var i = 0; i < this.ruleForm.sjr.length; i++) {
            this.ruleForm.staffNames += this.ruleForm.sjr[i] + ",";
          } //将数组转化为字符串

          //去掉最后一个逗号
          if (this.ruleForm.staffNames.length > 0) {
            this.ruleForm.staffNames = this.ruleForm.staffNames.substr(
              0,
              this.ruleForm.staffNames.length - 1
            );
          }
          this.axios
            .post("http://localhost:8088/TSM/send/addsend", {
              //添加发件箱
              sendTitle: this.ruleForm.title,
              sendContent: this.ruleForm.content,
              staffName1: this.ruleForm.staffNamef,
              staffName2: this.ruleForm.staffNames,
            })
            .then(function (res) {
              _this.tjsjx(res.data.sendId); //调用添加收件箱方法
              for (var i = 0; i < _this.ruleForm.sjr.length; i++) {
                _this.aa(_this.ruleForm.sjr[i], res.data.sendId); //调用添加收件表和发件表的中间表数据方法
              }

              var id = sessionStorage.getItem("draftId");
              if (sessionStorage.getItem("qkcs") == "delectdarfts") {
                //如果参数为草稿邮件发出后删除草稿箱
                _this.axios
                  .post("http://localhost:8088/TSM/draft/delectdraft", {
                    draftId: id,
                  })
                  .then((res) => {
                    console.log("bianhaobianhao");
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                sessionStorage.setItem("qkcs", "");
              }
              (_this.ruleForm.staffNames = ""), (_this.ruleForm.title = "");
              (_this.ruleForm.content = ""),
                (_this.ruleForm.sjr = []),
                (_this.yhsz = []), //清空参数
                ElMessage({ message: "发送成功！", type: "success" });
            })
            .catch(function (erreo) {
              console.log(erreo);
            });
        } else {
          ElMessage({ message: "请完善信息！", type: "warning" });
          return false;
        }
      });
    },
  },
  created() {
    if (sessionStorage.getItem("qkcs") == "zf") {
      //读取收件箱内容做转发操作

      this.ruleForm.title = sessionStorage.getItem("zfbt"); //读取转发标题

      this.ruleForm.content = sessionStorage.getItem("zfnr"); //读取转发内容

      sessionStorage.setItem("qkcs", ""); //清空参数
    } else if (sessionStorage.getItem("qkcs") == "hf") {
      //读取收件箱内容做回复操作

      this.ruleForm.title = sessionStorage.getItem("hfbt"); //读取回复标题

      this.ruleForm.sjr = sessionStorage.getItem("fjr").split(","); //将字符串转化为数组读取回复人

      sessionStorage.setItem("qkcs", ""); //清空参数
    } else if (sessionStorage.getItem("qkcs") == "cg") {
      //读取草稿箱发邮件

      this.ruleForm.title = sessionStorage.getItem("draftTitle"); //读取草稿标题

      this.ruleForm.content = sessionStorage.getItem("draftContent"); //读取草稿内容

      this.ruleForm.sjr = sessionStorage.getItem("staffName2").split(","); //将字符串转化为数组读取收件人
      sessionStorage.setItem("qkcs", "delectdarfts");
    }
  },
};
</script>

<style></style>
