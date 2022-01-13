<template>	
	
	<div style="margin-top:2%;" class="diva">
	 	意见箱状态:<select v-model="pageInfo.zt" class="d"  @change="creat">
			<option value="a">全部</option>
	 		<option value="b">可用</option>
	 		<option value="c">禁用</option>
	 	</select>
	<div class="b">
	快速检索:<select v-model="pageInfo.js" class="c">
		<option value="意见箱名称"><el-icon><delete-filled /></el-icon>意见箱名称</option>
		<option value="用户范围"><el-icon><delete-filled /></el-icon>用户范围</option>
		
	</select>
	</div>
	<el-input style="width:200px;" v-model="pageInfo.input" :placeholder="'根据'+this.pageInfo.js+'查询'" clearable />
	<el-button @click="this.creat()"><el-icon><search /></el-icon>搜索</el-button>
	</div>
	<div class="e">
		<el-button style="background-color: blue;color: white;" :icon="CircleCloseFilled" @click="xzyjx=true,cxyh(),xzqk()" ><el-icon><circle-plus-filled /></el-icon>新增</el-button>
	<el-button style="background-color: blue;color: white;" :icon="CircleCloseFilled"  @click="enablesuggestions(yjxsz)"><el-icon><check /></el-icon>启用</el-button>
	<el-button style="background-color: blue;color: white;" :icon="CircleCloseFilled"  @click="disablesuggestions(yjxsz)"><el-icon><close-bold /></el-icon>禁用</el-button>
	</div>
	<el-table border ref="mt" :data="suggestionsData" style="width: 100%"  @selection-change="yjxszchange" :row-class-name="tableRowClassName">
		<el-table-column type="selection" width="55" ></el-table-column>                                                                 
		
		<el-table-column    prop="suggestionsName"  label="意见箱名称" width="300">
			<template #default="scope">
					<span class="a" @click="cknr(scope.row),xgyjx=true,cxyh()">{{scope.row.suggestionsName}}</span>
			</template>
		</el-table-column>
	
		<el-table-column  prop="staffId"  label="管理员" width="120" >
			<template #default="scope">
			<span v-for="staffData in staffData">
				<span v-if="scope.row.staffId==staffData.staffId">{{staffData.staffName}}</span>
			</span>
			</template>
		</el-table-column>
	
		<el-table-column prop="deleted" label="状态"  width="60">
			<template #default="scope">
				
					<span v-if="scope.row.deleted==0">正常</span>
					<span v-else>禁用</span>
				</template>
		</el-table-column>
		<el-table-column prop="userScope" label="用户范围"  width="740"></el-table-column>
		
	
	</el-table>
	
	
	<div class="block">
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="pageInfo.currentPage"
	      :page-sizes="[2, 3, 6, 10]"
	      :page-size="pageInfo.pagesize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="pageInfo.total">
	    </el-pagination>
	  </div> 
	  <!-- 新增界面-->
	  	<el-dialog v-model="xzyjx" title="新增意见箱" width="70%" center>
	  		<el-form ref="ruleForm"  class="demo-ruleForm" :model="ruleForm" :rules="rules">
	  		
	  			<el-form-item label="意见箱名称:" style="float: left" prop="suggestionsName">
	  				<el-input v-model="ruleForm.suggestionsName"  style="width:200px"></el-input>
	  			</el-form-item>
				<el-form-item label="管理员:"  prop="staffId">
			   <el-select v-model="ruleForm.staffId" filterable   placeholder=" " allow-create  >
				  <el-option
					v-for="staffData in staffData"
					:key="staffData.staffName"
					:label="staffData.staffName"
					:value="staffData.staffId"
				  >
				  </el-option>
				</el-select>
				</el-form-item>
	  			<el-form-item label="用户范围:" prop="userScopesz">
	  				<el-input v-model="ruleForm.userScopesz"  readonly="readonly"  @click="centerDialogVisible=true,qk(),cx(),selectDept()"></el-input>
	  			</el-form-item>
				
					<el-form-item label="备注:">
	            <el-input v-model="ruleForm.remarks"></el-input> 
					</el-form-item>
	        	
	  		</el-form>
	  		<template #footer>
	  			<span class="dialog-footer">
	  				<el-button type="primary"  @click="addsuggestions('ruleForm')">
	  					保存并新建</el-button>
	  			</span>
	  				<span class="dialog-footer">
	  					<el-button type="primary"  @click="addsuggestionsgb('ruleForm')">
	  						保存并关闭</el-button>
	  				</span>
	  				<span class="dialog-footer">
	  					<el-button type="primary"  @click="gbjm('ruleForm')">
	  						关闭</el-button>
	  				</span>
	  		</template>
			
	  	</el-dialog>
		<!-- 修改界面-->
			<el-dialog v-model="xgyjx" title="修改意见箱" width="70%" center>
				<el-form ref="ruleForm"  class="demo-ruleForm" :model="ruleForm" :rules="rules">
				
					<el-form-item label="意见箱名称:" style="float: left" prop="suggestionsName">
						<el-input v-model="ruleForm.suggestionsName"  style="width:200px"></el-input>
					</el-form-item>
						<el-form-item label="管理员:"  prop="staffId">
					   <el-select v-model="ruleForm.staffId" filterable    allow-create  >
						  <el-option
							v-for="staffData in staffData"
							:key="staffData.staffName"
							:label="staffData.staffName"
							:value="staffData.staffId"
						  >
						  </el-option>
						</el-select>
						</el-form-item>
					<el-form-item label="用户范围:" prop="userScopesz">
						<el-input v-model="ruleForm.userScopesz"  readonly="readonly"  @click="centerDialogVisible=true,qk(),cx(),selectDept()"></el-input>
					</el-form-item>
						
							<el-form-item label="备注:">
		          <el-input v-model="ruleForm.remarks"></el-input> 
							</el-form-item>
		      	
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button type="primary"  @click="updatesuggestions('ruleForm')">
							保存</el-button>
					</span>
						
						<span class="dialog-footer">
							<el-button type="primary" @click="gbjm('ruleForm')">
								关闭</el-button>
						</span>
				</template>
				
			</el-dialog>
		
		<!-- 选择用户范围界面-->
		<el-dialog v-model="centerDialogVisible" title="选择用户" width="50%" style="background-color: blue;" >
			<div style="border: solid white;background-color:aliceblue;"><el-button @click="xzwc()" style="background-color: aqua;">选择并关闭</el-button></div>
		  部门查询：
		    <select style="width:15%;
			height:30px;margin-right:10%" v-model="DeptId" @change="cx" >
			<option value="0">所有部门</option>
			<option v-for="DeptData in DeptData" :value="DeptData.deptId">{{DeptData.deptName}}</option>
			
		</select>
		  
		  姓名查询：<el-input style="width:200px;height:auto;" v-model="ruleForm.staffName"  clearable/><el-button @click="cx()"> <el-icon><search /></el-icon></el-button>
		   <el-checkbox-group v-model="yhsz">
		      <el-checkbox v-for="staffData1 in staffData1" :label="staffData1.staffName" :key="staffData1.staffName"><span>{{staffData1.staffName}}</span></el-checkbox>
		 
			</el-checkbox-group>

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
	export default{

		data(){
			return{
				
				yhsz:[],//所有用户
				DeptData:[],  //部门集合
				DeptId:0,
				centerDialogVisible:ref(false),  //查询员工弹窗
				xzyjx:ref(false),     // 新增意见箱弹窗
				xgyjx:ref(false),   //修改意见箱弹窗
	           staffData1:[],      //查询员工集合（可条件模糊查询）
				staffData:[],  //查询所有员工的集合
				yjxsz:[],            //多选框选中的数据
				suggestionsData:[],  //存储意见箱数组
				pageInfo:{          //模糊分页查询数据
					currentPage:1,
					pagesize:3,
					total:0,
					zt:"a",
					js:"意见箱名称",
					input:""
				},
				ruleForm: {
					suggestionsId:"",    //意见箱编号
					suggestionsName:"",  //意见箱名称
					staffId:"",//意见箱管理员
					userScopesz:[],   //意见箱用户范围数组
					userScope:"",      //意见箱用户范围
					remarks: "" ,    //意见箱备注
					staffName:""    ,//员工姓名
					deleted:""      //意见箱状态
				},
				rules: {
					suggestionsName: [{
						required: true,
						message: '意见箱名称不能为空！',
						trigger: 'blur',
					}],
					staffId: [{
						required: true,
						message: '管理员不能为空！',
						trigger: 'blur',
					}],
					userScopesz: [{
						required: true,
						message: '用户范围不能为空！',
						trigger: 'blur',
					}]
				}
			}
		},
		methods:{ 
			gbjm(formName){
				this.$refs[formName].resetFields(),
									 this.ruleForm.remarks="",  
									this.ruleForm.userScope="",
									this.yhsz=[],              //清空所有数据
									this.xzyjx=false
									this.xgyjx=false
			},
			enable(row){  //启用意见箱
				let _this=this
				this.axios.post('http://localhost:8088/TSM/suggestions/updateSuggestions', {
					suggestionsId:row.suggestionsId,
					staffId:row.staffId,
					deleted:0,
					})
					.then((response) => {
					
					_this.creat();
					
						
					}).catch(function(erre) {
						console.log(erre)
					})
			},
			enablesuggestions(yjxsz){       //启用意见箱
				for(var i=0;i<yjxsz.length;i++){
					this.enable(yjxsz[i])
					
				}
				ElMessage({message: '启动成功！',type: 'success',})
			},
			disable(row){  //禁用意见箱
				let _this=this
				this.axios.post('http://localhost:8088/TSM/suggestions/updateSuggestions', {
					suggestionsId:row.suggestionsId,
					staffId:row.staffId,
					deleted:1,
					})
					.then((response) => {
					
					_this.creat();
					
						
					}).catch(function(erre) {
						console.log(erre)
					})
			},
			disablesuggestions(yjxsz){       //禁用意见箱
				for(var i=0;i<yjxsz.length;i++){
					this.disable(yjxsz[i])
				
				}
					ElMessage({message: '禁用成功！',type: 'success',})
			},
			yjxszchange(yjxsz){  //将多选框勾选的内容放入数组
				this.yjxsz=yjxsz
			},
			cknr(row){
					this.ruleForm.suggestionsId=row.suggestionsId  //读取意见箱编号
					
				this.ruleForm.suggestionsName=row.suggestionsName  //读取意见箱标题
				
		
					this.ruleForm.staffId=row.staffId  //读取管理员姓名
						
				this.ruleForm.userScopesz=row.userScope.split(","),   //读取意见箱用户范围
				
				this.ruleForm.remarks=row.remarks  //读取意见箱备注
				
				this.ruleForm.deleted=row.deleted  //读取意见箱状态
			},
	    qk(){
			this.yhsz=this.ruleForm.userScopesz,  //读取文本用户范围
			this.ruleForm.staffName=""      //清空参数
			this.DeptId=0                   //回到初始值     
		},
			
		xzqk(){    //新增按钮清空所有参数
		    this.ruleForm.staffId="",
			this.ruleForm.suggestionsManage="",
			this.ruleForm.suggestionsName="",
			this.ruleForm.remarks="",
			this.ruleForm.userScopesz=[],
			this.ruleForm.userScope="",
			this.ruleForm.staffName="",
			this.yhsz=[]
			
		},
			selectDept(){   //查询部门
					let _this=this
								
					this.axios.post("http://localhost:8088/TSM/dept/selectDept",{
					
								
					  })
					  .then(res=>{
							console.log(res)
						console.log(res.data)
						_this.DeptData=res.data
						
						
					})
				} ,
				
				
			xzwc(){
				    this.centerDialogVisible=false   
					
					this.ruleForm.userScopesz=this.yhsz   //将数组读取
					
				
			},
			updatesuggestions(formName) {    //修改意见箱
							let _this=this
							this.$refs[formName].validate((valid) => {
								if (valid) {
			for (var i = 0; i <this.ruleForm.userScopesz.length; i++) {
			  this.ruleForm.userScope += this.ruleForm.userScopesz[i]+ ",";  //将数组转化为字符串
			}
			//去掉最后一个逗号
			if (this.ruleForm.userScope.length > 0) {
			 this.ruleForm.userScope = this.ruleForm.userScope.substr(0, this.ruleForm.userScope.length - 1);
			}
			this.axios.post('http://localhost:8088/TSM/suggestions/updateSuggestions', {
				suggestionsId:this.ruleForm.suggestionsId,
				suggestionsName:this.ruleForm.suggestionsName,
				staffId:this.ruleForm.staffId,
				userScope:this.ruleForm.userScope,
				remarks:this.ruleForm.remarks,
				deleted:this.ruleForm.deleted,
				})
				.then((response) => {
				this.$refs[formName].resetFields();
									 _this.ruleForm.remarks="",  
									_this.ruleForm.userScope="",
									_this.yhsz=[],              //清空所有数据
				_this.creat();
				
			ElMessage({message: '修改成功！',type: 'success',})
				  _this.xgyjx=false
			}).catch(function(erre) {
					console.log(erre)
				})
								} else {
									ElMessage({message: '请完善信息！',type: 'warning',})
									
									return false
								}
							})
						},
						addsuggestionsgb(formName) {    //新增意见箱并关闭
										let _this=this
										this.$refs[formName].validate((valid) => {
											if (valid) {
						for (var i = 0; i <this.ruleForm.userScopesz.length; i++) {
						  this.ruleForm.userScope += this.ruleForm.userScopesz[i]+ ",";  //将数组转化为字符串
						}
						//去掉最后一个逗号
						if (this.ruleForm.userScope.length > 0) {
						 this.ruleForm.userScope = this.ruleForm.userScope.substr(0, this.ruleForm.userScope.length - 1);
						}
						this.axios.post('http://localhost:8088/TSM/suggestions/addSuggestions', {
							suggestionsName:this.ruleForm.suggestionsName,
							staffId:this.ruleForm.staffId,
							userScope:this.ruleForm.userScope,
							remarks:this.ruleForm.remarks,
							})
							.then((response) => {
						this.$refs[formName].resetFields();
											 _this.ruleForm.remarks="",  
											 _this.ruleForm.userScope="",
											 _this.yhsz=[],              //清空所有数据
								_this.xzyjx=false
							_this.creat();
							ElMessage({message: '新增成功！',type: 'success',})
								
							}).catch(function(erre) {
								console.log(erre)
							})
											} else {
												ElMessage({message: '请完善信息！',type: 'warning',})
												
												return false
											}
										})
									},
			addsuggestions(formName) {    //新增意见箱
							let _this=this
							this.$refs[formName].validate((valid) => {
								if (valid) {
			for (var i = 0; i <this.ruleForm.userScopesz.length; i++) {
			  this.ruleForm.userScope += this.ruleForm.userScopesz[i]+ ",";  //将数组转化为字符串
			}
			//去掉最后一个逗号
			if (this.ruleForm.userScope.length > 0) {
			 this.ruleForm.userScope = this.ruleForm.userScope.substr(0, this.ruleForm.userScope.length - 1);
			}
			this.axios.post('http://localhost:8088/TSM/suggestions/addSuggestions', {
				suggestionsName:this.ruleForm.suggestionsName,
				staffId:this.ruleForm.staffId,
				userScope:this.ruleForm.userScope,
				remarks:this.ruleForm.remarks,
				})
				.then((response) => {
				 this.$refs[formName].resetFields();
					 _this.ruleForm.remarks="",
					 _this.ruleForm.userScope="",
					 _this.yhsz=[],              //清空所有数据
							 
					console.log(response.data)
				_this.creat();
			ElMessage({message: '新增成功！',type: 'success',})
					
				}).catch(function(erre) {
					console.log(erre)
				})
								} else {
									ElMessage({message: '请完善信息！',type: 'waring',})
									
									return false
								}
							})
						},creat(){
							var _this=this
							this.axios.get("http://localhost:8088/TSM/suggestions/suggestions"
							                ,{params:this.pageInfo})
							.then(function(response){
							console.log(response.data)
								_this.suggestionsData=response.data.records
								_this.pageInfo.total=response.data.total
								
							}).catch(function(error){
								console.log(error)
							})
						},
			
			handleCurrentChange(page){
						var _this=this
						this.pageInfo.currentPage=page
						
						var ps=qs.stringify(this.pageInfo)
						console.log(ps)
						this.axios.get("http://localhost:8088/TSM/suggestions/suggestions",{params:this.pageInfo})
						.then(function(response){
							console.log("1-------------------------------------------")
							console.log(response.data)
							_this.suggestionsData=response.data.records
						}).catch(function(error){
							console.log(error)
						})
					},
					handleSizeChange(size){
						var _this=this
						this.pageInfo.pagesize=size
						var ps=qs.stringify(this.pageInfo)
						console.log(ps)
						this.axios.get("http://localhost:8088/TSM/suggestions/suggestions",{params:this.pageInfo})
						.then(function(response){
							console.log("2-------------------------------------------")
							console.log(response.data)
							_this.suggestionsData=response.data.records
							_this.pageInfo.total=response.data.total
						}).catch(function(error){
							console.log(error)
						})
					},
					cxyh(){   //查询用户
						
											
						this.axios.post("http://localhost:8088/TSM/staff/cxyh",{
						 staffId:0,     
						 staffName:"",
						  })
						  .then(res=>{
								console.log(res)
							console.log(res.data)
							this.staffData=res.data
							
							
						})
					},
					cx(){   //查询用户
				
					
						this.axios.post("http://localhost:8088/TSM/staff/cxyh",{
					     staffId:this.DeptId,     
						 staffName:this.ruleForm.staffName,
						  })
						  .then(res=>{
								console.log(res)
							console.log(res.data)
							this.staffData1=res.data
							
							
						})
					}
				
				},
				created(){
					this.cxyh();
					console.log("aaaaaaaaaa")
					var _this=this
					this.axios.get("http://localhost:8088/TSM/suggestions/suggestions"
					                ,{params:this.pageInfo})
					.then(function(response){
					console.log(response.data)
						_this.suggestionsData=response.data.records
						_this.pageInfo.total=response.data.total
						
					}).catch(function(error){
						console.log(error)
					})
				
				
			}
	}
</script>

<style>
</style>
