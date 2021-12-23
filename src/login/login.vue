<template>
  <div class="htmleaf-container">
    <div class="login">
      <el-form ref="staff" :model="staff" label-width="100px" :rules="rules">
        <el-form-item label="用户名" prop="staffName">
          <el-input v-model="staff.staffName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="staffPass">
          <el-input v-model="staff.staffPass" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login('staff')">登录</el-button
          >&nbsp;
          <el-button type="primary" @click="rest('staff')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      staff: {
        staffName: "",
        staffPass: "",
      },
      rules: {
        staffName: [
          {
            required: true,
            message: "名字不能为空",
            trigger: "blur",
          },
          {
            min: 2,
            message: "最少输入两个",
            trigger: "blur",
          },
        ],
        staffPass: [
          {
            required: true,
            message: "密码不能为空",
            tigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login(user) {
      let _this = this;
      this.$refs[user].validate((valid) => {
        if (valid) {
          this.axios
            .post("http://localhost:8088/TSM/staff/selectStaff", {
              staffName: _this.staff.staffName,
              staffPass: _this.staff.staffPass,
            })
            .then(function (res) {
              console.log(res);
              if (res.data !== "") {
                console.log(res.data.message);
                console.log("登录成功");
                sessionStorage.setItem("isLogin", true);
                _this.$router.push("/home");
                ElMessage({
                  message: "登录成功",
                  type: "success",
                });
              } else {
                ElMessage.error("登录失败,用户名或密码错误");
              }
            })
            .catch(function (error) {
              console.log(error);
              ElMessage.error("登录失败");
              _this.$router.push("/");
            });
        } else {
          return false;
        }
      });
    },
    rest(user) {
      console.log("开始重置");
      this.$refs[user].resetFields();
    },
  },
};
</script>

<style>
.login .el-form {
  margin: auto;
  width: 380px;
  text-align: center;
}
.login .el-button {
  width: 80px;
}
</style>

