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
          <div class="pricture" @click="personalinformation()"><img :src="imgUrl.portraitUrl" alt="" /></div>
          <span class="el-dropdown-link">{{ staffName }}</span>
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
  			     :show-file-list="false"
  			     :on-success="handleAvatarSuccess"
  			     :before-upload="beforeAvatarUpload"
  			   >
  			    <img
  			       v-if="portraitUrl"
  			       :src="portraitUrl"
  			       class="avatar"
  			       :fit="scale - down"
  			     /> 
  			     <img :src="imageUrl" alt="" v-if="imageUrl" />
  			     <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
  			   </el-upload>
  			 </div>
  			<div id="details">
  				<el-form :model="personal" :label-position="right" label-width="120px">
  					<el-row :gutter="24">
  						<el-col :span="12">
							姓名:<span v-for="a in personalData">
								{{a.personalName}}
							</span>
  						</el-col>
  						<el-col :span="12">
  							性别:<span v-for="a in personalData">
  								{{a.personalSex}}
  							</span>
							
  						</el-col>
  					</el-row>
  					<el-row :gutter="24">
  						<el-col :span="12">
  							年龄：<span v-for="a in personalData">
  								{{a.personalAge}}岁
  							</span>
  						</el-col>
  						<el-col :span="12">
  							生日：<span v-for="a in personalData">
  								{{a.personalBirthday}}
  							</span>
  						</el-col>
  					</el-row>
  	
  					<el-row :gutter="24">
  						<el-col :span="12">
							个人电话：<span v-for="a in personalData">
								{{a.personalPhone}}
							</span>
  							
  						</el-col>
  						<el-col :span="12">
							入职日期：<span v-for="a in personalData">
								{{a.entryTime}}
							</span>
  						
  						</el-col>
  					</el-row>
  	
  					<el-row :gutter="10">
  						<el-col :span="12">
  						用户名：<span v-for="a in personalData">
  							{{a.staffName}}
  						</span>
  						</el-col>
  						<el-col :span="12">
  						<span v-for="a in personalData">
  							密码：{{a.staffPass}}
  						</span>
  						</el-col>
  					</el-row>
  				</el-form>
  			</div>
  	
  			<template #footer>
  				<span class="dialog-footer">
  					<el-button @click="centerDialogVisible = false">取消</el-button>
  					<el-button type="primary" @click="centerDialogVisible = false">确认</el-button>
  				</span>
  			</template>
  		</el-dialog>
</template>

<script>
	import {
			defineComponent,
			ref,
			onMounted
		} from 'vue'
		import qs from 'qs'
		import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      staffName: "",
      Id:0,
	  portraitUrl:'',
	  imageUrl:"",
      imgUrl: "",
	  centerDialogVisible:ref(false),
	  staffId:sessionStorage.getItem("staffId"),
	  personalData:[]
    };
  },
  methods: {
	 handleAvatarSuccess(file) {
	  	console.log(file.url)
	  	this.dialogImageUrl = file.url;
	  	this.dialogVisible = true;
	  },
	  personalinformation(){   //打开信息界面
		  this.centerDialogVisible=true
		 
		  			
		  this.axios.get("http://localhost:8088/TSM/personalVo/selectPersonal/"+this.staffId)
		    .then(res=>{
		  		console.log(res)
		  	console.log(res.data)
		  	this.personalData=res.data
	
		  })
	  },
	  
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/outlogin");
    },
	
	 handleAvatarSuccess(res, file) {
	      console.log(res);
	      this.imageUrl = res;
	        // this.portraitUrl = URL.createObjectURL(file.raw);
	      this.portraitUrl = res;
	    },
	    beforeAvatarUpload(file) {
	      const isJPG = file.type === "image/jpeg";
	      const isLt2M = file.size / 1024 / 1024 < 2;
	
	      if (!isJPG) {
	        this.$message.error("上传头像图片只能是 JPG 格式!");
	      }
	      if (!isLt2M) {
	        this.$message.error("上传头像图片大小不能超过 2MB!");
	      }
	
	      return isJPG && isLt2M;
	    }
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

 .avatar-uploader .el-upload{
    width: 200px;
    height: 150px;
    line-height:150px;
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
  
  .avatar-uploader .el-upload {
    width: 200px;
    height: 150px;
    line-height: 150px;
  }
  .avatar {
    width: 200px;
    height: 150px;
  }
</style>
