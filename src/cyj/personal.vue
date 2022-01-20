<template>
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
			<el-button id="xzstaff" @click="centerDialogVisible = true">
				+ 新增员工档案
			</el-button>
		</div>
		<div class="showTableData">
			<el-table ref="mt" :data="personalData" @selection-change="handeselect" style="width: 100%;">
				<el-table-column prop="personalId" label="档案编号">
					<template #default="scope">ID:{{scope.row.personalId}}</template>
				</el-table-column>
				<el-table-column prop="personalName" label="姓名"></el-table-column>
				<el-table-column prop="personalSex" label="性别"></el-table-column>
				<el-table-column prop="personalAge" label="年龄"></el-table-column>
				<el-table-column prop="personalPhone" label="手机号"></el-table-column>
				<el-table-column prop="entryTime" label="存档时间" width="150"></el-table-column>
				<el-table-column label="操作">
					<template #default="scope">
						<el-button size="mini" @click="handeEdit(scope.$index,scope.row)">编辑</el-button>
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
	</div>
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
				personalData: [],
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
			handleCurrentChange(page){
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
			handleSizeChange(size){
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
		},
		created(){
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
