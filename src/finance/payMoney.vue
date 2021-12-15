<template>
	<div class="payheader">
		<span class="paysize">选择状态：</span>
		<el-select v-model="value" placeholder="Select">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
		</el-select>
		<span class="paysize">学员名称：</span>
		<el-select v-model="value" placeholder="Select">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
		</el-select>
		<span class="paysize">支付方式：</span>
		<el-select v-model="value" placeholder="Select">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
		</el-select>
		<el-button>查询</el-button>
		<el-button>审核通过</el-button>
		<el-button>删除</el-button>
	</div>
	
	 
		<el-table :data="tableData" border style="width: 100%;">
			
			<el-table-column type="selection" width="50"></el-table-column>
			
			<el-table-column prop="paymoneyId" label="编号" width="120">
				<template #default="scope">{{scope.row.paymoneyId}}</template>
			</el-table-column>
			<el-table-column prop="paymoneyMoney" label="缴费金额" width="180" />
			<el-table-column prop="paymoneyDate" label="缴费时间" width="180" />
			<el-table-column prop="paymoneyMode" label="缴费方式" />
			<el-table-column prop="courseId" label="缴费课程" />
			<el-table-column prop="staffId" label="收款人" />
			<el-table-column prop="studentId" label="缴费学员" />
			<el-table-column prop="deleted" label="是否可用" >
				<template #default="scope">
					<span v-if="scope.row.deleted=='1'">不可用</span>
					<span v-else>可用</span>
				</template>
			</el-table-column>
		</el-table>
		
	<div class="block">
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="pageInfo.currentPage" :page-sizes="[2, 3, 6, 10]" :page-size="pageInfo.pagesize"
			layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
		</el-pagination>
	</div>
</template>

<script>
	import qs from 'qs'
	import {
		ref,
		defineComponent
	} from 'vue'

	export default({
			data(){
				return{
					tableData:[],
					pageInfo: {
						currentPage: 1,
						pagesize: 3,
						total: 0
					},
					options:[
						{
						          value: 'Option1',
						          label: 'Option1',
						        },
						        {
						          value: 'Option2',
						          label: 'Option2',
						        },
						        {
						          value: 'Option3',
						          label: 'Option3',
						        },
					]
				}
			},
			methods:{
				handleCurrentChange(page) {
					var _this = this
					this.pageInfo.currentPage = page
					var ps = qs.stringify(this.pageInfo)
					console.log(ps)
					this.axios.get("http://localhost:80888/TSM/selectPayMoney", {
							params: this.pageInfo
						})
						.then(function(response) {
							console.log("1-------------------------------------------")
							console.log(response.data)
							_this.tableData = response.data.records
						}).catch(function(error) {
							console.log(error)
						})
				},
				
				//总页数
				handleSizeChange(size) {
					var _this = this
					this.pageInfo.pagesize = size
					var ps = qs.stringify(this.pageInfo)
					console.log(ps)
					this.axios.get("http://localhost:8088/TSM/selectPayMoney", {
							params: this.pageInfo
						})
						.then(function(response) {
							console.log("2-------------------------------------------")
							console.log(response.data)
							_this.tableData = response.data.records
							_this.pageInfo.total = response.data.total
						}).catch(function(error) {
							console.log(error)
						})
				},
			},
		created(){
			var _this = this
			this.axios.get("http://localhost:8088/TSM/selectPayMoney", {
					params: this.pageInfo
				})
				.then(function(response) {
					console.log(response)
					_this.tableData = response.data.records
					_this.pageInfo.total = response.data.total
				}).catch(function(error) {
					console.log(error)
				})
		}
	})
</script>

<style>
	.paysize {
		font-size: 16px;
		margin-right: 5px;
		font-weight: 500;
	}

	.el-select .el-input__inner {
		height: 30px;
		border: 1px solid #000000;
		color: #000000;
	}

	.el-select {
		margin-right: 30px;
	}
	.payheader{
		margin-top: 40px;
		margin-bottom: 40px;
	}

	.paybox {
		margin-top: 30px;
	}
	.payheader .el-button {
		width: 100px;
		background: #f60;
		color: white;
		border: 1px solid white;
		text-align: center;
		
	}
	.payheader .el-button:hover{
		background: #ff5500;
	}
</style>
