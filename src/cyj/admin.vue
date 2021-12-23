<template>
	<div>
		<div class="query-form" style="margin-top: 15px">
		    <el-input
		      v-model="input"
		      placeholder="请输入内容"
		      class="input-with-select"
			  style="width: 32.5rem;"
		    >
				<template #prepend>
					<el-select v-model="select" placeholder="姓名" style="width: 90px">
					  <el-option label="姓名" value="1"></el-option>
					  <el-option label="手机号" value="2"></el-option>
					  <el-option label="岗位" value="3"></el-option>
					</el-select>
				  </template>
				  <template #append>
					<el-button :icon="Search"></el-button>
				</template>
		    </el-input>
			<el-radio-group v-model="radio" style="margin-left: 1rem;">
			    <el-radio :label="3">在职</el-radio>
			    <el-radio :label="6">离职</el-radio>
			</el-radio-group>
			<el-button id="xzstaff">
				+ 新增员工
			</el-button>
		</div>
		<div class="showTableData">
			<el-table ref="mt" :data="adminData" @selection-change="handeselect" style="width: 100%;">
				<el-table-column prop="empno" label="头像" width="80">
					<template #default="scope">ID:{{scope.row.empno}}</template>
				</el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="iphone" label="手机号" width="200"></el-table-column>
				<el-table-column prop="dept" label="部门"></el-table-column>
				<el-table-column prop="job" label="职位" width="200"></el-table-column>
				<el-table-column prop="hiredate" label="入职时间" width="100"></el-table-column>
				<el-table-column prop="hiredate" label="是否在职"></el-table-column>
				<el-table-column label="操作" width="150">
					<template #default="scope">
						<el-button size="mini" @click="handeEdit(scope.$index,scope.row)">编辑</el-button>
						<el-button type="danger" size="mini" @click="handeDel(scope.row)">辞退</el-button>
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
	const input = ref('')
	const select = ref('')
	const radio = ref(3)
</script>
<script lang="ts">
	import qs from 'qs'
	export default{
		data() {
			return {
				adminData: [],
				pageInfo:{
					currentPage:1,
					pagesize:3,
					total:0
				},
			}
		},
		created(){
			var _this=this
			this.axios.get("http://localhost:8088/TSM/admins"
			                ,{params:this.pageInfo})
			.then(function(response){
				console.log(response.data)
				_this.adminData=response.data.records
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
