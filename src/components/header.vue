<template>
  <div class="header">
    <el-row>
      <el-col :span="20" class="headerlogo">
        <div class="bg-purple" style="position: relative">
          <img src="../assets/培训机构管理.png" alt="无法显示图片" />
          <span id="bg-size">智高科技</span>
        </div>
      </el-col>
      <el-col :span="4" class="rightsection">
        <div class="bg-purple-light">
          <div class="pricture">
            <img :src="imgUrl.portraitUrl" alt="" />
          </div>
          <el-dropdown trigger="click">
            <span style="color: #303133; font-size: 18px">
              {{ staffName }}
              <el-icon class="el-icon--right"><caret-bottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  class="clearfix"
                  @click="personalinformation(), selectPosition()"
                >
                  查看个人资料
                </el-dropdown-item>
                <el-dropdown-item class="clearfix" @click="changePass = true">
                  修改个人密码
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span class="userinfo-inner" @click="loginout">退出</span>
        </div>
      </el-col>
    </el-row>
  </div>

  <!-- 个人信息-->
  <el-dialog v-model="centerDialogVisible" title="用户信息" center>
    <div id="photo">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8088/TSM/photo/upload"
        :on-success="handleAvatarSuccess"
      >
        <img :src="imageUrl" class="avatar" />
      </el-upload>
    </div>
    <div id="details">
      <el-form :model="personal" :label-position="right" label-width="120px">
        <el-row :gutter="24">
          <el-col :span="12">
            姓名:<span v-for="a in personalData">
              {{ a.personalName }}
            </span>
          </el-col>
          <el-col :span="12">
            性别:<span v-for="a in personalData">
              {{ a.personalSex }}
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            年龄：<span v-for="a in personalData"> {{ a.personalAge }}岁 </span>
          </el-col>
          <el-col :span="12">
            生日：<span v-for="a in personalData">
              {{ a.personalBirthday }}
            </span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            个人电话：<span v-for="a in personalData">
              {{ a.personalPhone }}
            </span>
          </el-col>
          <el-col :span="12">
            入职日期：<span v-for="a in personalData">
              {{ a.entryTime }}
            </span>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            所在部门：<span v-for="a in positionData">
              {{ a.deptName }}
            </span>
          </el-col>
          <el-col :span="12">
            个人岗位：<span v-for="a in positionData">
              {{ a.positionName }}
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            岗位职责：<span v-for="a in positionData">
              {{ a.positionRemark }}
            </span>
          </el-col>
        </el-row>
      </el-form>
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
  <!--修改密码界面-->
  <el-dialog
    v-model="changePass"
    title="用户信息"
    center
    @close="rest('ruleForm')"
  >
    <el-form
      ref="ruleForm"
      label-width="200px"
      class="demo-ruleForm"
      :model="ruleForm"
      :rules="rules"
    >
      <el-form-item label="原登陆密码:" prop="passWord">
        <el-input v-model="ruleForm.passWord" type="password"></el-input>
      </el-form-item>

      <el-form-item label="新登录密码:" prop="newPass">
        <el-input v-model="ruleForm.newPass" type="password"></el-input>
      </el-form-item>

      <el-form-item label="确认新密码:" prop="qrnewPass">
        <el-input v-model="ruleForm.qrnewPass" type="password"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="rest('ruleForm')">取消</el-button>
        <el-button @click="qrbc('ruleForm')">确认保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import qs from "qs";
import { ElMessage } from "element-plus";
// import {createRequire} from 'module';
// 	const require = createRequire(import.meta.url);
export default {
  data() {
    return {
      fileList: [],
      imageUrl: "",
      staffName: "",
      Id: 0,
      imgUrl: "",
      centerDialogVisible: ref(false), //个人资料弹窗
      changePass: ref(false), //修改密码弹窗
      staffId: sessionStorage.getItem("staffId"),
      staffPass: sessionStorage.getItem("staffPass"),
      personalData: [], //个人资料
      positionData: [], //个人岗位职责
      ruleForm: {
        passWord: "", //旧密码
        newPass: "", //新密码
        qrnewPass: "", //确认新密码
      },
      rules: {
        passWord: [
          {
            required: true,
            message: "此项不能为空！",
            trigger: "blur",
          },
        ],
        newPass: [
          {
            required: true,
            message: "此项不能为空！",
            trigger: "blur",
          },
        ],
        qrnewPass: [
          {
            required: true,
            message: "此项不能为空！",
            trigger: "blur",
          },
        ],
        noticeContent: [
          {
            required: true,
            message: "公告内容不能为空！",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    handleAvatarSuccess(file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    qrbc(formName) {
      //密码修改保存

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post(
              "http://localhost:8088/TSM/staff/md5/" + this.ruleForm.passWord
            )
            .then((res) => {
              var a = res.data;
              if (a != this.staffPass) {
                ElMessage({ message: "原密码输入有误！", type: "warning" });
              } else if (this.ruleForm.newPass != this.ruleForm.qrnewPass) {
                ElMessage({
                  message: "新密码两次输入不一致！",
                  type: "warning",
                });
              } else {
                this.axios
                  .post(
                    "http://localhost:8088/TSM/staff/md5/" +
                      this.ruleForm.newPass
                  )
                  .then((res) => {
                    var pass = res.data;
                    this.axios
                      .post("http://localhost:8088/TSM/staff/updatePass", {
                        staffId: this.staffId,
                        staffPass: pass,
                      })
                      .then((res) => {
                        sessionStorage.setItem("staffPass", pass);
                        this.staffPass = pass;
                        ElMessage({ message: "修改成功！", type: "success" });
                        this.$refs[formName].resetFields();
                        this.changePass = false;
                        this.loginout();
                      });
                  });
              }
            });
        } else {
          ElMessage({ message: "请完善信息！", type: "warning" });
          return false;
        }
      });
    },

    personalinformation() {
      this.centerDialogVisible = true; //打开个人资料弹窗
      this.imageUrl = this.imgUrl.portraitUrl;
      this.axios
        .get(
          "http://localhost:8088/TSM/personalVo/selectPersonal/" + this.staffId
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.personalData = res.data;
        });
    },
    selectPosition() {
      this.axios
        .get("http://localhost:8088/TSM/staffVo/selectPosition/" + this.staffId)
        .then((res) => {
          console.log(res);
          console.log(res.data + "sssssss");
          this.positionData = res.data;
        });
    },
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/outlogin");
    },
    rest(ruleForm) {
      console.log("开始重置");
      this.$refs[ruleForm].resetFields();
    },
  },
  created() {
    this.staffName = sessionStorage.getItem("staffName");
    this.Id = sessionStorage.getItem("staffId");

    var _this = this;
    this.axios
      .get("http://localhost:8088/TSM/personalVo/selectById/" + this.Id)
      .then(function (response) {
        console.log(response.data);
        _this.imgUrl = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
.header .el-row {
  background-color: #2d8ab7;
  font-size: 18px;
  height: 60px;
}

.bg-purple img {
  width: 60px;
  height: 55px;
}

.bg-purple span {
  font-size: 18px;
  position: absolute;
}

.userinfo-inner {
  margin-left: 30px;
  cursor: pointer;
}

.pricture {
  float: left;
  background-color: aqua;
  width: 40px;
  height: 40px;
  margin-top: 9px;
  border-radius: 50%;
  margin-right: 10px;
}

.pricture img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
#photo {
  width: 200px;
  height: 150px;
  margin: auto;
  margin-bottom: 60px;
}

#details .el-input .el-input__inner {
  border: 1px solid lightslategray;
  width: 220px;
  height: 36px;
}

.el-radio-group {
  float: none;
  line-height: 0px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  width: 200px;
  height: 150px;
  line-height: 150px;
}
</style>
