<template>
  <div class="box" style="height: 710px">
    <div class="login">
      <el-form
        ref="staff"
        :model="staff"
        label-width="100px"
        :rules="rules"
        class="login_form"
        style="margin-top: 80px"
      >
        <el-form-item label="用户名" prop="staffName" style="color:white">
          <el-input
            v-model="staff.staffName"
            style="background: none"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="staffPass" style="color:white">
          <el-input v-model="staff.staffPass" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="login('staff')"
            style="margin-right: 60px; margin-left: 10px"
            @keyup.enter="login('staff')"
            >登录</el-button
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
              if (res.data !== "" && res.data.staffState == 0) {
                console.log(res.data.message);
                console.log("登录成功");
                sessionStorage.setItem("isLogin", true);
                sessionStorage.setItem("staffName", res.data.staffName);
                sessionStorage.setItem("staffPass", res.data.staffPass);
                sessionStorage.setItem("staffId", res.data.staffId);
                _this.$router.push("/home");
                ElMessage({
                  message: "登录成功",
                  type: "success",
                });
              } else if (res.data.staffState == 1) {
                ElMessage.error("登录失败，该用户状态为不可用");
              } else{
                ElMessage.error("登录失败，用户名或密码错误");
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
    keyDown(e) {
      if (e.keyCode === 13) {
        this.login("staff");
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.keyDown);
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false);
  },
};
</script>

<style>
.box {
  width: 100%;
  background-image: url(../assets/img/demo-1-bg.jpg);
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  z-index: 1;
}
.login {
  width: 390px;
  height: 300px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 35px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -220px;
  box-shadow: 0px 0px 10px black;
}
.login .el-form-item__label{
  color: white;
}

.login_form .el-input .el-input__inner {
  width: 85%;
  border: 1px solid gray;
  color: white;
  background: none;
}
</style>
