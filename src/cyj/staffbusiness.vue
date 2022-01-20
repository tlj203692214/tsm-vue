<template>
	<div>
		<div class="query-form" style="margin-top: 15px">
		    <el-select @change="business()" v-model="pageInfo.select" style="width: 150px">
		      <el-option label="全部出差信息" value="1"></el-option>
		      <el-option label="出差未审批" value="2"></el-option>
		      <el-option label="出差已通过" value="3"></el-option>
		      <el-option label="出差未通过" value="4"></el-option>
		    </el-select>
			<el-button id="xzstaff" @click="centerDialogVisible = true">
				+ 员工出差
			</el-button>
		</div>
		<div class="showTableData">
			<el-table ref="mt" :data="businessData" @selection-change="handeselect" style="width: 100%;">
				<el-table-column prop="staffbusinessId" label="编号">
					<template #default="scope">ID:{{scope.row.staffbusinessId}}</template>
				</el-table-column>
				<el-table-column prop="staffId1" label="出差人">
					<template #default="scope">
						<span v-for="ps in personalDate">
							<span v-if="scope.row.staffId1==ps.staffId">
								{{ps.personalName}}
							</span>
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="staffbusinessContent" label="出差原因"></el-table-column>
				<el-table-column prop="staffbusinessState" label="状态"></el-table-column>
				<el-table-column prop="beginTime" label="出差开始时间" width="150"></el-table-column>
				<el-table-column prop="endTime" label="出差结束时间" width="150"></el-table-column>
				<el-table-column prop="staffId2" label="审批人">
					<template #default="scope">
						<span v-for="ps in personalDate">
							<span v-if="scope.row.staffId2==ps.staffId">
								{{ps.personalName}}
							</span>
						</span>
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

<script lang="ts">
	import qs from 'qs'
	export default{
		data() {
			return {
				businessData: [],
				personalDate:[],
				pageInfo:{
					select:'1',
					currentPage:1,
					pagesize:3,
					total:0
				},
			}
		},
		methods:{
			Selpersonal(){
				var _this=this
				this.axios.get("http://localhost:8088/TSM/personal/selectpersonal")
				.then(function(response){
					console.log(response.data)
					_this.personalData=response.data
				}).catch(function(error){
					console.log(error)
				})
			},
			business(){
				var _this=this
				this.axios.get("http://localhost:8088/TSM/staffbusiness/business"
				                ,{params:this.pageInfo})
				.then(function(response){
					console.log(response.data)
					_this.businessData=response.data.records
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
				this.axios.get("http://localhost:8088/TSM/staffbusiness/business",{params:this.pageInfo})
				.then(function(response){
					console.log("1-------------------------------------------")
					console.log(response.data)
					_this.businessData=response.data.records
				}).catch(function(error){
					console.log(error)
				})
			},
			handleSizeChange(size){
				var _this=this
				this.pageInfo.pagesize=size
				var ps=qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/TSM/staffbusiness/business",{params:this.pageInfo})
				.then(function(response){
					console.log("2-------------------------------------------")
					console.log(response.data)
					_this.businessData=response.data.records
					_this.pageInfo.total=response.data.total
				}).catch(function(error){
					console.log(error)
				})
			},
		},
		created(){
			var _this=this
			this.axios.get("http://localhost:8088/TSM/staffbusiness/business"
			                ,{params:this.pageInfo})
			.then(function(response){
				console.log(response.data)
				_this.businessData=response.data.records
				_this.pageInfo.total=response.data.total
			}).catch(function(error){
				console.log(error)
			})
			this.Selpersonal()
		}
	}
</script>

<style>
</style>
