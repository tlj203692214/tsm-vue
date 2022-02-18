<template>
  <div class="header">
    <el-row>
      <el-col :span="20" class="headerlogo">
        <div class="bg-purple" style="position: relative">
          <img src="../assets/培训机构管理.png" alt="无法显示图片" />
          <span id="bg-size">培训机构管理</span>
        </div>
      </el-col>
      <el-col :span="4" class="rightsection">
        <div class="bg-purple-light">
          <div class="pricture"><img :src="imgUrl.portraitUrl" alt="" /></div>
          <span>{{ staffName }}</span>
          <span class="userinfo-inner" @click="loginout">退出</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      staffName: "",
      Id: 0,
      imgUrl: "",
    };
  },
  methods: {
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/");
    },
  },
  created() {
    this.staffName = sessionStorage.getItem("staffName");
    this.Id = sessionStorage.getItem("staffId");

    var _this = this;
    this.axios
      .get("http://localhost:8088/TSM/portrait/selectPortrait/" + this.Id)
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
</style>
