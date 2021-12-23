<template>
<div class="header">
     <el-row>
        <el-col :span="20" class="headerlogo">
          <div class="bg-purple" style="position: relative;">
            <img src="../assets/培训机构管理.png" alt="无法显示图片"/>
			<span id="bg-size">培训机构管理</span>
          </div>
        </el-col>
        <el-col :span="4" class="rightsection">
          <div class="bg-purple-light">
            <span class="el-dropdown-link userinfo-inner">欢迎管理员</span>
            <span class="userinfo-inner">退出</span>
             </div>
          </div>
      </el-row>
</div>
</template>

<style>	
.header	.el-row{
		background-color: #2d8ab7;
    font-size: 18px;
	  height: 60px;
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

</style>