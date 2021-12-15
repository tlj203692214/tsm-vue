<template>
     <el-row>
        <el-col :span="20" class="headerlogo">
          <div class="grid-content bg-purple" style="position: relative;">
            <img src="../assets/培训机构管理.png" alt="无法显示图片"/>
			<span id="bg-size">培训机构管理</span>
          </div>
        </el-col>
        <el-col :span="4" class="rightsection">
          <div class="grid-content bg-purple-light">
            <span class="el-dropdown-link userinfo-inner">欢迎管理员</span>
            <span class="userinfo-inner" @click="signout">退出</span>
          </div>
        </el-col>
      </el-row>

</template>

<style>	
	.el-row{
		background-color: #2d8ab7;
	}
	
.bg-purple img{
	width:60px;
	height: 55px;

}

.bg-purple span{
	font-size:18px;
	position: absolute;
}

.userinfo-inner{
	margin-left: 30px;
}

.el-row{
	font-size: 18px;
	height: 60px;
}
</style>