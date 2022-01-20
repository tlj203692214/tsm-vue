<template>
	<div>
		<div class="query-form" style="margin-top: 15px">
		    <el-input clearable
		      v-model="pageInfo.input"
		      placeholder="请输入内容"
		      class="input-with-select"
			  style="width: 32.5rem;"
		    >
				<template #prepend>
					部门名称
				</template>
				<template #append>
					<el-button :icon="Search" @click="depts()"></el-button>
				</template>
		    </el-input>
			<el-button id="xzstaff" @click="addtranmisi()">
				+ 新增部门
			</el-button>
		</div>
		<div class="showTableData">
			<el-table ref="mt" :data="deptData" @selection-change="handeselect" style="width: 100%;">
				<el-table-column width="100"></el-table-column>
				<el-table-column prop="deptId" label="部门编号">
					<template #default="scope">ID:{{scope.row.deptId}}</template>
				</el-table-column>
				<el-table-column prop="deptName" label="部门名称"></el-table-column>
				<el-table-column label="操作">
					<template #default="scope">
						<el-button type="text" style="color: #f60;" @click="updatedept(scope.row)">编辑</el-button>
						<el-button type="text" style="color: #f60;" @click="tranmission(scope.row)">删除</el-button>
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
		<el-dialog v-model="centerAdd" title="添加部门" width="35%" center>
			<el-form ref="addform" :model="addform" :rules="addrules" label-width="120px">
				<el-form-item label="部门名称" prop="name" style="width: 360px;">
					<el-input v-model="addform.name"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button @click="resetaddFrom('addform')">取消</el-button>
				<el-button type="primary" @click="insertForm('addform')">确定</el-button>
			</template>
		</el-dialog>
		<el-dialog v-model="centerUpdate" title="修改部门" width="35%" center>
			<el-form ref="form" :model="form" :rules="rules" label-width="120px">
				<el-form-item label="编号" prop="id" style="display: none;">
					<el-input v-model="form.id"></el-input>
				</el-form-item>
				<el-form-item label="部门名称" prop="name" style="width: 360px;">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button @click="resetForm('form')">取消</el-button>
				<el-button type="primary" @click="submitForm('form')">确定</el-button>
			</template>
		</el-dialog>
		<el-dialog v-model="centerDel" title="提示" width="35%">
			<el-icon><i-warning-filled /></el-icon>
			<span>是否删除【{{dept.dname}}】部门？</span>
			<template #footer>
				<el-button @click="centerDel = false">取消</el-button>
				<el-button type="primary" @click="deldept()">确定</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { Search } from '@element-plus/icons'
	const radio = ref(3)
</script>
<script lang="ts">
	import qs from 'qs'
	import { ElMessage } from 'element-plus'
	export default{
		data() {
			return {
				deptData: [],
				listDept:[],
				fordept:'',
				pageInfo:{
					input: '',
					currentPage:1,
					pagesize:3,
					total:0
				},
				dept:{
					deptid:'',
					dname:'',
				},
				centerDel:ref(false),
				centerUpdate:ref(false),
				centerAdd:ref(false),
				addform:{
					name:'',
				},
				form:{  
					id:'',
					name:'',
				},
				rules: {
				    name: [
				        {
				            required: true,
				            message: '部门名称不可为空',
				            trigger: 'blur',
				        },
				    ],
				},
				addrules:{
				    name: [
				        {
				            required: true,
				            message: '部门名称不可为空',
				            trigger: 'blur',
				        },
				    ],
				},
			}
		},
		methods:{
			addtranmisi(addformName){
				this.addform.name = ''
				this.centerAdd = true
				this.listDepts()
			},
			insertForm(addformName){
				for(var i=0;i<this.listDept.length;i++){
					console.log("集合",this.listDept)
					if(this.listDept[i].deptName==this.addform.name){
						this.fordept=false;
						console.log("循环")
						break;
					}else{
						this.fordept=true;
						console.log("嘻嘻嘻嘻嘻")
					}
				}
				if(this.fordept==false){
					ElMessage({message: '该部门已存在！！！',type: 'warning',})	
				}else{
					this.$refs[addformName].validate((valid) => {
					    if (valid) {
							var _this=this
							this.axios.post("http://localhost:8088/TSM/dept/addDept",{deptName:this.addform.name})
							.then(function(response){
								console.log(response.data)
							}).catch(function(error){
								console.log(error)
							})
						    ElMessage({message: '添加【'+this.addform.name+'】部门成功！',type: 'success',})
						    this.centerAdd = false
					    } else {
					        console.log('error submit!!')
					        return false
					    }
					})
					this.depts()
				}
			},
			submitForm(formName) {
				for(var i=0;i<this.listDept.length;i++){
					console.log("集合",this.listDept)
					if(this.listDept[i].deptName==this.form.name){
						this.fordept=false;
						console.log("循环")
						break;
					}else{
						this.fordept=true;
						console.log("嘻嘻嘻嘻嘻")
					}
				}
				if(this.fordept==false){
					ElMessage({message: '该部门已存在！！！',type: 'warning',})	
				}else{
					this.$refs[formName].validate((valid) => {
					    if (valid) {
							var _this=this
							this.axios.post("http://localhost:8088/TSM/dept/updept",{
								deptId:this.form.id,
								deptName:this.form.name
							})
							.then(function(response){
								console.log(response.data)
							}).catch(function(error){
								console.log(error)
							})
						    ElMessage({message: '部门修改成功！',type: 'success',})
						    this.centerUpdate = false
					    } else {
					        console.log('error submit!!')
					        return false
					    }
					})
					this.depts()
				}
			},
			updatedept(row){
				this.form.id = row.deptId
				this.form.name = row.deptName
				this.centerUpdate = true
				this.listDepts()
			},
			resetaddFrom(addformName){
				this.$refs[addformName].resetFields()
				this.centerAdd = false
			},
			resetForm(formName) {
			    this.$refs[formName].resetFields()
				this.centerUpdate = false
			},
			tranmission(row){
				this.dept.deptid = row.deptId
				this.dept.dname = row.deptName 
				this.centerDel = true
			},
			deldept(){
				var _this=this
				this.axios.post("http://localhost:8088/TSM/dept/deldept/"+this.dept.deptid)
				.then(function(response){
					console.log(response.data)
				}).catch(function(error){
					console.log(error)
				})
				ElMessage({message: '删除部门【'+this.dept.dname+'】成功！',type: 'success',})
				this.centerDel = false
				this.depts()
			},
			depts(){
				var _this=this
				this.axios.get("http://localhost:8088/TSM/dept/depts"
				                ,{params:this.pageInfo})
				.then(function(response){
					console.log(response.data)
					_this.deptData=response.data.records
					_this.pageInfo.total=response.data.total
				}).catch(function(error){
					console.log(error)
				})
			},
			listDepts(){
				var _this=this
				this.axios.get("http://localhost:8088/TSM/dept/listDept")
				.then(function(response){
					console.log(response.data)
					_this.listDept=response.data
				}).catch(function(error){
					console.log(error)
				})
			},
			handleCurrentChange(page){
				var _this=this
				this.pageInfo.currentPage=page
				var ps=qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/TSM/dept/depts",{params:this.pageInfo})
				.then(function(response){
					console.log("1-------------------------------------------")
					console.log(response.data)
					_this.deptData=response.data.records
				}).catch(function(error){
					console.log(error)
				})
			},
			handleSizeChange(size){
				var _this=this
				this.pageInfo.pagesize=size
				var ps=qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/TSM/dept/depts",{params:this.pageInfo})
				.then(function(response){
					console.log("2-------------------------------------------")
					console.log(response.data)
					_this.deptData=response.data.records
					_this.pageInfo.total=response.data.total
				}).catch(function(error){
					console.log(error)
				})
			},
		},
		created(){
			var _this=this
			this.axios.get("http://localhost:8088/TSM/dept/depts"
			                ,{params:this.pageInfo})
			.then(function(response){
				console.log(response.data)
				_this.deptData=response.data.records
				_this.pageInfo.total=response.data.total
			}).catch(function(error){
				console.log(error)
			})
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
