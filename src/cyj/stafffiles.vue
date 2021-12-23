<template>
	<div>
		<div class="query-form" style="margin-top: 15px">
		    <el-input
		      v-model="pageInfo.input"
		      placeholder="请输入内容"
		      class="input-with-select"
			  style="width: 20rem;"
		    >
				<template #prepend>
					<el-select v-model="pageInfo.select" style="width: 90px">
					  <el-option label="姓名" value="1"></el-option>
					  <el-option label="手机号" value="2"></el-option>
					  <el-option label="岗位" value="3"></el-option>
					</el-select>
				  </template>
				  <template #append>
					<el-button @click="stafffiles()" :icon="Search"></el-button>
				</template>
		    </el-input>
			<el-button id="xzstaff" @click="centerDialogVisible = true">
				+ 新增员工档案
			</el-button>
		</div>
		<div class="showTableData">
			<el-table ref="mt" :data="stafffData" @selection-change="handeselect" style="width: 100%;">
				<el-table-column prop="stafffilesId" label="档案编号" width="80">
					<template #default="scope">ID:{{scope.row.stafffilesId}}</template>
				</el-table-column>
				<el-table-column prop="stafffilesName" label="姓名" width="80"></el-table-column>
				<el-table-column prop="stafffilesSex" label="性别" width="80"></el-table-column>
				<el-table-column prop="stafffilesAge" label="年龄" width="80"></el-table-column>
				<el-table-column prop="stafffilesPhone" label="手机号"></el-table-column>
				<el-table-column prop="stafffilesMonney" label="期望薪资"></el-table-column>
				<el-table-column prop="stafffilesPosition" label="面试岗位" width="100"></el-table-column>
				<el-table-column prop="stafffilesDate" label="存档时间" width="200"></el-table-column>
				<el-table-column label="操作" width="200">
					<template #default="scope">
						<el-button size="mini" @click="handeEdit(scope.$index,scope.row)">编辑</el-button>
						<el-button type="danger" size="mini" @click="handeDel(scope.row)">删除</el-button>
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
		<el-dialog v-model="centerDialogVisible" title="新增员工档案信息" width="55%" center>
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
		        <el-form-item label="性别" prop="resource" style="width: 240px;">
		          <el-radio-group v-model="ruleForm.resource">
		            <el-radio label="男"></el-radio>
		            <el-radio label="女"></el-radio>
		          </el-radio-group>
		        </el-form-item>
		        <el-form-item label="联系电话" prop="phone" style="float: left;">
		        	<el-input style="width: 200px;" v-model="ruleForm.phone"></el-input>
		        </el-form-item>
				<el-form-item label="年龄" prop="age" style="width: 200px;">
					<el-input v-model="ruleForm.age"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" prop="card" style="float: left;">
					<el-input style="width: 200px;" v-model="ruleForm.card"></el-input>
				</el-form-item>
				<el-form-item label="民族" prop="minzu" style="width: 200px;">
					<el-input v-model="ruleForm.minzu"></el-input>
				</el-form-item>
				<el-form-item label="学历" prop="xueli" style="float: left;">
					<el-input style="width: 200px;" v-model="ruleForm.xueli"></el-input>
				</el-form-item>
				<el-form-item label="毕业学校" prop="graduat">
					<el-input style="width: 200px;" v-model="ruleForm.graduat"></el-input>
				</el-form-item>
				<el-form-item label="期望薪资" prop="xinzi" style="float: left;">
					<el-input style="width: 200px;" v-model="ruleForm.xinzi"></el-input>
				</el-form-item>
				<el-form-item label="面试岗位" prop="position">
					<el-input style="width: 200px;" v-model="ruleForm.position"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="dizhi">
					<el-input v-model="ruleForm.dizhi" type="textarea"></el-input>
				</el-form-item>
		        <el-form-item label="工作经历" prop="desc">
		          <el-input v-model="ruleForm.desc" type="textarea"></el-input>
		        </el-form-item>
		    </el-form>
			<template #footer>
				<el-button @click="centerDialogVisible = false">取消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">提交</el-button>
		    </template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { Search } from '@element-plus/icons'
</script>
<script lang="ts">
	import qs from 'qs'
	export default{
		data() {
			return {
				ruleForm: {
				    name: '',
				    region: '',
				    resource: '',
				    desc: '',
			    },
				rules: {
					name: [
				    {
				        required: true,
				        message: 'Please input Activity name',
				        trigger: 'blur',
			        },
				    {
				        min: 3,
				        max: 5,
				        message: 'Length should be 3 to 5',
			            trigger: 'blur',
			        },
				    ],
				    resource: [
				        {
				        required: true,
				        message: 'Please select activity resource',
						trigger: 'change',
				        },
				    ],
				    desc: [
				        {
				        required: true,
				        message: '工作经历不可为空',
			            trigger: 'blur',
				        },
				    ],
				},
				centerDialogVisible: ref(false),
				stafffData: [],
				pageInfo:{
					select:'1',
					input:'',
					currentPage:1,
					pagesize:3,
					total:0
				},
			}
		},
		methods:{
			stafffiles(){
				var _this=this
				this.axios.get("http://localhost:8088/TSM/stafffs"
				                ,{params:this.pageInfo})
				.then(function(response){
					console.log(response.data)
					_this.stafffData=response.data.records
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
				this.axios.get("http://localhost:8088/TSM/stafffs",{params:this.pageInfo})
				.then(function(response){
					console.log("1-------------------------------------------")
					console.log(response.data)
					_this.stafffData=response.data.records
				}).catch(function(error){
					console.log(error)
				})
			},
			handleSizeChange(size){
				var _this=this
				this.pageInfo.pagesize=size
				var ps=qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/TSM/stafffs",{params:this.pageInfo})
				.then(function(response){
					console.log("2-------------------------------------------")
					console.log(response.data)
					_this.stafffData=response.data.records
					_this.pageInfo.total=response.data.total
				}).catch(function(error){
					console.log(error)
				})
			},
		},
		created(){
			var _this=this
			this.axios.get("http://localhost:8088/TSM/stafffs"
			                ,{params:this.pageInfo})
			.then(function(response){
				console.log(response.data)
				_this.stafffData=response.data.records
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
