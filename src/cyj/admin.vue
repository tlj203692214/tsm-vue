<template>
	<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
		<el-tab-pane label="员工管理">
			<div>
				<div class="query-form" style="margin-top: 15px">
				    <el-input clearable
				      v-model="pageInfo.input"
				      placeholder="请输入内容"
				      class="input-with-select"
					  style="width: 25rem;"
				    >
						<template #prepend>
							<el-select v-model="pageInfo.select" style="width: 90px">
							  <el-option label="姓名" value="1"></el-option>
							  <el-option label="手机号" value="2"></el-option>
							  <el-option label="岗位" value="3"></el-option>
							</el-select>
						</template>
						<template #append>
							<el-button :icon="Search" @click="selectAdmins()"></el-button>
						</template>
				    </el-input>
					<el-radio-group style="float: right;" v-model="pageInfo.radio" @change="selectAdmins">
						<el-radio :label="3">在职</el-radio>
						<el-radio :label="6">离职</el-radio>
					</el-radio-group>
					<el-button id="xzstaff" @click="centerDialogVisible = true">
						+ 新增员工
					</el-button>
				</div>
				<div class="showTableData">
					<el-table ref="mt" :data="adminData" @selection-change="handeselect" style="width: 100%;">
						<!-- <el-table-column prop="portraitUrl" label="头像" width="80">
							<template #default="scope"><img style="width: 3rem;height: 3rem;" src="../assets/img/headx/勾勾.jpg"></template>
						</el-table-column> -->
						<el-table-column prop="personalName" label="姓名"></el-table-column>
						<el-table-column prop="personalPhone" label="手机号" width="150"></el-table-column>
						<el-table-column prop="deptName" label="部门"></el-table-column>
						<el-table-column prop="staffId" label="员工工号"></el-table-column>
						<el-table-column prop="positionName" label="职位"></el-table-column>
						<el-table-column prop="entryTime" label="入职时间" width="120"></el-table-column>
						<el-table-column label="操作" width="150">
							<template #default="scope">
								<span v-if="scope.row.staffId==staffid">
									<el-button size="mini" @click="">详情</el-button>
									<el-button size="mini" disabled>辞退</el-button>
								</span>
								<span v-else-if="scope.row.administrationState==0">
									<el-button size="mini" @click="">详情</el-button>
									<el-button type="danger" size="mini" @click="tranmission(scope.row)">辞退</el-button>
								</span>
								<span v-else><el-button type="primary" size="mini" @click="tranmission(scope.row)">恢复</el-button></span>
							</template>
						</el-table-column>
					</el-table>
					<div class="block">
					    <el-pagination
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page="pageInfo.currentPage"
					      :page-sizes="[3, 6, 9]"
					      :page-size="pageInfo.pagesize"
					      layout="total, sizes, prev, pager, next, jumper"
					      :total="pageInfo.total">
					    </el-pagination>
					</div>
				</div>
				<el-dialog v-model="centerDialogVisible" title="新增员工信息" width="52%" @close="resetaddFrom('ruleForm')" center>
				    <el-form 
				        ref="ruleForm"
				        :model="ruleForm"
				        :rules="rules"
				        label-width="120px"
				        class="demo-ruleForm"
				    >
				        <el-form-item label="姓名" prop="name" style="float: left;">
				          <el-input style="width: 200px;" v-model="ruleForm.name"></el-input>
				        </el-form-item>
				        <el-form-item label="性别" prop="sex" style="width: 240px;">
				          <el-radio-group v-model="ruleForm.sex">
				            <el-radio label="男"></el-radio>
				            <el-radio label="女"></el-radio>
				          </el-radio-group>
				        </el-form-item>
				        <el-form-item label="联系电话" prop="phone" style="float: left;">
				        	<el-input onkeyup="value=value.replace(/[^\d]/g,'')" onafterpaste="value=value.replace(/[^\d]/g,'')"
							 maxlength="11" style="width: 200px;" v-model="ruleForm.phone"></el-input>
				        </el-form-item>
						<el-form-item label="年龄" prop="age" style="width: 240px;">
							<el-input type="number" min="18" max="60" v-model="ruleForm.age"></el-input>
						</el-form-item>
						<el-form-item label="身份证号" prop="card">
							<el-input maxlength="18" style="width: 200px;" v-model="ruleForm.card"></el-input>
						</el-form-item>
				    </el-form>
					<template #footer>
						<el-button @click="resetaddFrom('ruleForm')">取消</el-button>
						<el-button type="primary" @click="addstafffiles('ruleForm')">提交</el-button>
				    </template>
				</el-dialog>
				<el-dialog v-model="centerDel" title="提示" width="35%">
					<el-icon><i-warning-filled /></el-icon>
					<span>确定把员工【{{admin.sname}}】辞退？</span>
					<template #footer>
						<el-button @click="centerDel = false">取消</el-button>
						<el-button type="primary" @click="updateadmin()">确定</el-button>
					</template>
				</el-dialog>
				<el-dialog v-model="centerHuiFu" title="提示" width="35%">
					<el-icon><i-warning-filled /></el-icon>
					<span>确定把【{{admin.sname}}】恢复成机构员工？</span>
					<template #footer>
						<el-button @click="centerHuiFu = false">取消</el-button>
						<el-button type="primary" @click="updateadmin()">确定</el-button>
					</template>
				</el-dialog>
			</div>
		</el-tab-pane>
		<el-tab-pane label="员工转正">
			<div>
				<div class="query-form" style="margin-top: 15px">
				    <el-input clearable
				      v-model="pageInfo.input"
				      placeholder="请输入内容"
				      class="input-with-select"
					  style="width: 20rem;"
				    >
						<template #prepend>
							姓名
						  </template>
						  <template #append>
							<el-button @click="personals()" :icon="Search"></el-button>
						</template>
				    </el-input>
				</div>
				<div class="showTableData">
					<el-table ref="mt" :data="personalData" @selection-change="handeselect" style="width: 100%;">
						<el-table-column prop="personalId" label="实习编号">
							<template #default="scope">ID:{{scope.row.personalId}}</template>
						</el-table-column>
						<el-table-column prop="personalName" label="姓名"></el-table-column>
						<el-table-column prop="personalSex" label="性别"></el-table-column>
						<el-table-column prop="personalAge" label="年龄"></el-table-column>
						<el-table-column prop="personalPhone" label="手机号"></el-table-column>
						<el-table-column prop="entryTime" label="入职时间"></el-table-column>
						<el-table-column label="操作" width="200">
							<template #default="scope">
								<el-button type="primary" size="mini" @click="UpstaffFrom(scope.row)">员工转正</el-button>
								<el-button type="danger" size="mini" @click="staffctFrom(scope.row)">员工辞退</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="block">
					    <el-pagination
					      @size-change="personalSizeChange"
					      @current-change="personalCurrentChange"
					      :current-page="pageInfo.currentPage"
					      :page-sizes="[3, 6, 9]"
					      :page-size="pageInfo.pagesize"
					      layout="total, sizes, prev, pager, next, jumper"
					      :total="pageInfo.total">
					    </el-pagination>
					</div>
				</div>
				<el-dialog v-model="staffUpdate" title="员工转正" width="35%" @close="reststaffUp('form')" center>
					<el-form ref="form" :model="form" :rules="staffrules" label-width="120px">
						<el-form-item label="编号" prop="id" style="width: 360px;display: none;">
							<el-input disabled v-model="form.id"></el-input>
						</el-form-item>
						<el-form-item label="员工姓名" prop="name" style="width: 360px;">
							<el-input disabled v-model="form.name"></el-input>
						</el-form-item>
						<el-form-item label="部门名称" prop="deptid">
							<el-cascader :props="props" style="width: 240px;" v-model="form.deptid" />
						</el-form-item>
					</el-form>
					<template #footer>
						<el-button @click="reststaffUp('form')">取消</el-button>
						<el-button type="primary" @click="submitstaffUp('form')">确定</el-button>
					</template>
				</el-dialog>
				<el-dialog v-model="staffDel" title="提示" width="35%">
					<el-icon><i-warning-filled /></el-icon>
					<span>确定把实习员工【{{admin.sname}}】辞退？</span>
					<template #footer>
						<el-button @click="staffDel = false">取消</el-button>
						<el-button type="primary" @click="DelstaffFrom()">确定</el-button>
					</template>
				</el-dialog>
			</div>
		</el-tab-pane>
	</el-tabs>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { Search } from '@element-plus/icons'
</script>
<script lang="ts">
	import qs from 'qs'
	import { ElMessage } from 'element-plus'
	export default{
		data() {
			return {
				props: {
				  checkStrictly: true,
				  lazy: true,
				  lazyLoad: this.getCheckedNodes,
				},
				activeName:'0',
				ruleForm: {
				    name: '',
				    sex: '',
					phone: '',
					age: '',
					card: '',
				},
				rules: {
					name: [
				    {
				        required: true,
				        message: '姓名不可为空',
				        trigger: 'blur',
				    },
				    {
				        min: 2,
				        message: '名字长度太短',
				        trigger: 'blur',
				    },
				    ],
				    sex: [
				        {
				        required: true,
				        message: '请选择您的性别',
						trigger: 'change',
				        },
				    ],
					phone: [
						{
						required: true,
						message: '电话不可为空',
						trigger: 'blur',
						},
						{
						 min: 11,
						 max: 11,
						 message: '请输入11位的手机号',
						 trigger: 'blur',   
						},
					],
					age: [
						{
						required: true,
						message: '年龄不可为空',
						trigger: 'blur',	
						},
						{
						 min: 2,
						 max: 2,
						 message: '年龄不符合标准',
						 trigger: 'blur',   
						},
					],
				},
				staffrules:{
					deptid: [
					    {
					        required: true,
					        message: '部门名称不可为空',
					        trigger: 'blur',
					    },
					],
				},
				staffid: sessionStorage.getItem("staffId"),
				adminData: [],
				personalData: [],
				pageInfo:{
					radio:3,
					select:'1',
					input:'',
					currentPage:1,
					pagesize:3,
					total:0
				},
				centerDialogVisible: ref(false),
				centerDel:ref(false),
				centerHuiFu:ref(false),
				staffUpdate:ref(false),
				staffDel:ref(false),
				admin:{
					sname:'',
					state:'',
					staffid:'',
				},
				form:{
					id:'',
					name:'',
					deptid:'',
				},
			}
		},
		methods:{
			getCheckedNodes(node, resolve) {
			  const { data, level } = node;
			  if (level === 0) {
			    this.axios.post("http://localhost:8088/TSM/dept/selectDept", {})
			      .then((response) => {
			        this.axios
			          .post("http://localhost:8088/TSM/dept/selectDeptjl/" + 0)
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
			  } else {
			    this.axios.post("http://localhost:8088/TSM/dept/selectDept", {})
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
			UpstaffFrom(row){
				this.form.id = row.personalId
 				this.form.name = row.personalName
				this.staffUpdate = true
			},
			reststaffUp(updatestaff){
				this.$refs[updatestaff].resetFields()
				this.staffUpdate = false
			},
			submitstaffUp(updatestaff){//添加员工账号
				var staffname = this.form.name+this.form.id
				this.$refs[updatestaff].validate((valid) => {
					if(valid){
						var _this=this
						this.axios.post("http://localhost:8088/TSM/staff/addstaff",{
							staffName:staffname,
							staffPass:123456,
						}).then(function(response){
							console.log("添加员工账号信息",response.data)
							_this.personalUp(response.data)
							_this.Addadministration(response.data)
							_this.personals()
						}).catch(function(error){
							console.log(error)
						})
					}else {
						console.log('error submit!!')
						return false
					}
				})
			},
			personalUp(sid){
				var _this=this
				this.axios.post("http://localhost:8088/TSM/personal/updatePersonal",{
					personalId:this.form.id,
					staffId:sid,
					personalState:1,
				}).then(function(response){
					console.log(response.data)
				}).catch(function(error){
					console.log(error)
				})
				console.log("员工转正成功")
			},
			Addadministration(sid){
				console.log("jjjjj ",sid)
				alert(this.form.deptid)
				var tid = this.form.deptid[this.form.deptid.length-1]
				console.log("sssssss",tid)
				var _this=this
				this.axios.post("http://localhost:8088/TSM/administration/addAdministration",{
					staffId:sid,
					deptId:tid,
					positionId:9,
				}).then(function(response){
					console.log(response.data)
				}).catch(function(error){
					console.log(error)
				})
				this.staffUpdate = false
				console.log("员工转正成功!!员工管理表关联成功")
			},
			resetaddFrom(addformName){
				this.$refs[addformName].resetFields()
				this.centerDialogVisible = false
			},
			addstafffiles(addformName){
				this.$refs[addformName].validate((valid) => {
					if(valid){
						var _this=this
						this.axios.post("http://localhost:8088/TSM/personal/addpersonal",{
							personalName:this.ruleForm.name,
							personalSex:this.ruleForm.sex,
							personalAge:this.ruleForm.age,
							entryTime:new Date,
							personalPhone:this.ruleForm.phone,
							personalIdcard:this.ruleForm.card,
						}).then(function(response){
							console.log(response.data)
						}).catch(function(error){
							console.log(error)
						})
						ElMessage({message: '员工新增成功！',type: 'success',})
						this.centerDialogVisible = false
						this.$refs[addformName].resetFields()
					}else {
						console.log('error submit!!')
						return false
					}
				})
			},
			staffctFrom(row){
				this.admin.staffid = row.personalId
				this.admin.sname = row.personalName
				this.staffDel = true
			},
			DelstaffFrom(){
				console.log("iddddd",this.admin.staffid)
				var _this=this
				this.axios.post("http://localhost:8088/TSM/personal/updatePersonal",{
					personalId:this.admin.staffid,
					deleted:1,		
				}).then(function(response){
					console.log(response.data)
					_this.personals()
				}).catch(function(error){
					console.log(error)
				})
				ElMessage({message: '员工辞退成功！',type: 'success',})
				this.staffDel = false
			},
			tranmission(row){
				this.admin.staffid=row.staffId
				this.admin.sname=row.personalName
				this.admin.state=row.administrationState
				if(row.administrationState==0){
					this.centerDel = true
				}else{
					this.centerHuiFu = true
				}
			},
			updateadmin(){
				var _this=this
				this.axios.post("http://localhost:8088/TSM/administration/upAdministration/"+this.admin.staffid
				).then(function(response){
					console.log(response.data)
					_this.upstaffstate()
				}).catch(function(error){
					console.log(error)
				})
			},
			upstaffstate(){
				if(this.admin.state==0){
					var _this=this
					this.axios.post("http://localhost:8088/TSM/staff/upstaffstate/"+this.admin.staffid)
					.then(function(response){
						console.log(response.data)
					}).catch(function(error){
						console.log(error)
					})
					ElMessage({message: '辞退员工【'+this.admin.sname+'】成功！',type: 'success',})
					this.centerDel = false
				}else{
					var _this=this
					this.axios.post("http://localhost:8088/TSM/staff/upstaffstate/"+this.admin.staffid)
					.then(function(response){
						console.log(response.data)
					}).catch(function(error){
						console.log(error)
					})
					ElMessage({message: '恢复员工【'+this.admin.sname+'】成功！',type: 'success',})
					this.centerHuiFu = false
				}
				this.selectAdmins()
			},
			selectAdmins(){
				var _this=this
				this.axios.get("http://localhost:8088/TSM/findsadminvo"
				                ,{params:this.pageInfo})
				.then(function(response){
					console.log(response.data)
					_this.adminData=response.data.records
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
				this.axios.get("http://localhost:8088/TSM/findsadminvo",{params:this.pageInfo})
				.then(function(response){
					console.log("1-------------------------------------------")
					console.log(response.data)
					_this.adminData=response.data.records
				}).catch(function(error){
					console.log(error)
				})
			},
			handleSizeChange(size){
				var _this=this
				this.pageInfo.pagesize=size
				var ps=qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/TSM/findsadminvo",{params:this.pageInfo})
				.then(function(response){
					console.log("2-------------------------------------------")
					console.log(response.data)
					_this.adminData=response.data.records
					_this.pageInfo.total=response.data.total
				}).catch(function(error){
					console.log(error)
				})
			},
			personals(){
				var _this=this
				this.axios.get("http://localhost:8088/TSM/personal/findpersonals"
				                ,{params:this.pageInfo})
				.then(function(response){
					console.log(response.data)
					_this.personalData=response.data.records
					_this.pageInfo.total=response.data.total
				}).catch(function(error){
					console.log(error)
				})
			},
			personalCurrentChange(page){
				var _this=this
				this.pageInfo.currentPage=page
				var ps=qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/TSM/personal/findpersonals",{params:this.pageInfo})
				.then(function(response){
					console.log("1-------------------------------------------")
					console.log(response.data)
					_this.personalData=response.data.records
				}).catch(function(error){
					console.log(error)
				})
			},
			personalSizeChange(size){
				var _this=this
				this.pageInfo.pagesize=size
				var ps=qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/TSM/personal/findpersonals",{params:this.pageInfo})
				.then(function(response){
					console.log("2-------------------------------------------")
					console.log(response.data)
					_this.personalData=response.data.records
					_this.pageInfo.total=response.data.total
				}).catch(function(error){
					console.log(error)
				})
			},
			handleClick(teb,event){
				if(this.activeName=='0'){
					this.selectAdmins()
					sessionStorage.setItem("activeName","0")
				}else if(this.activeName=='1'){
					this.personals()
					sessionStorage.setItem("activeName","1")
				}
			}
		},
		created(){
			this.handleClick()
		}
	}
</script>

<style>
	.query-form {
	    background: #fff;
	    margin-bottom: 12px;
	    padding: 12px 16px;
	}
	.input-with-select .el-input-group__prepend {
	  background-color: #fff;
	}
	#xzstaff{
		color: #FFFFFF; 
		margin-left: 1rem;
		background-color: #FF6600;
		border: none;
	}
	#xzstaff:hover{
		background-color: #FF7E00;
	}
	.showTableData{
		background: #fff;
		padding: 14px;
	}
</style>
