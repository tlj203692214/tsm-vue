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
					<el-button @click="staffleaves()" :icon="Search"></el-button>
				</template>
		    </el-input>
			<el-select @change="staffleaves()" v-model="pageInfo.select" style="margin-left:15px; width:150px">
			  <el-option label="全部请假信息" value="1"></el-option>
			  <el-option label="请假未审批" value="2"></el-option>
			  <el-option label="请假已通过" value="3"></el-option>
			  <el-option label="请假未通过" value="4"></el-option>
			</el-select>
			<el-button id="xzstaff" @click="centerDialogVisible = true">
				+ 员工请假
			</el-button>
		</div>
		<div class="showTableData">
			<el-table ref="mt" :data="leaveData" @selection-change="handeselect" style="width: 100%;">
				<el-table-column prop="leaveId" label="编号">
					<template #default="scope">ID:{{scope.row.leaveId}}</template>
				</el-table-column>
				<el-table-column prop="personalName" label="请假人"></el-table-column>
				<el-table-column prop="leaveContent" label="请假原因"></el-table-column>
				<el-table-column prop="beginTime" label="请假开始时间"></el-table-column>
				<el-table-column prop="endTime" label="请假结束时间"></el-table-column>
				<el-table-column prop="staffId2" label="审批人">
					<template #default="scope">
						<span v-for="aa in personalDate">
							<span v-if="scope.row.staffId2==aa.staffId">
								{{aa.personalName}}
							</span>
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="leaveState" label="状态">
					<template #default="scope">
						<span v-if="scope.row.leaveState==0">未通过</span>
						<span v-else>已通过</span>
					</template>
				</el-table-column>
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
	export default{
		data() {
			return {
				leaveData: [],
				personalDate:[],
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
			SelPersonal(){
				var _this=this
				this.axios.get("http://localhost:8088/TSM/personal/selectpersonal")
				.then(function(response){
					console.log(response.data)
					_this.personalDate=response.data
				}).catch(function(error){
					console.log(error)
				})
			},
			staffleaves(){
				var _this=this
				this.axios.get("http://localhost:8088/TSM/staffleavesvo"
				                ,{params:this.pageInfo})
				.then(function(response){
					console.log(response.data)
					_this.leaveData=response.data.records
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
				this.axios.get("http://localhost:8088/TSM/staffleavesvo",{params:this.pageInfo})
				.then(function(response){
					console.log("1-------------------------------------------")
					console.log(response.data)
					_this.leaveData=response.data.records
				}).catch(function(error){
					console.log(error)
				})
			},
			handleSizeChange(size){
				var _this=this
				this.pageInfo.pagesize=size
				var ps=qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/TSM/staffleavesvo",{params:this.pageInfo})
				.then(function(response){
					console.log("2-------------------------------------------")
					console.log(response.data)
					_this.leaveData=response.data.records
					_this.pageInfo.total=response.data.total
				}).catch(function(error){
					console.log(error)
				})
			},
		},
		created(){
			var _this=this
			this.axios.get("http://localhost:8088/TSM/staffleavesvo"
			                ,{params:this.pageInfo})
			.then(function(response){
				console.log(response.data)
				_this.leaveData=response.data.records
				_this.pageInfo.total=response.data.total
			}).catch(function(error){
				console.log(error)
			})
			this.SelPersonal()
		}
	}
</script>

<style>
	
</style>
