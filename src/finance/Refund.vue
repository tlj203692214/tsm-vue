<template>
	<div class="payheader">
		 
		<span class="paysize">审核状态：</span>
		<el-select v-model="value" placeholder="Select">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
		</el-select>
		<span class="paysize">学员名称：</span>
		<el-select v-model="value" placeholder="Select">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
		</el-select>
		<span class="kong"></span>
		<el-button>查询</el-button>
		<el-button>审核通过</el-button>
		<el-button>删除</el-button>
	
	</div>
	
	 
		<el-table ref="tableDate" :data="refundDate" border style="width: 100%;">
			<el-table-column type="selection" width="50"></el-table-column>
			<el-table-column prop="refundId" label="编号" width="120">
				<template #default="scope">{{scope.row.refundId}}</template>
			</el-table-column>
			<el-table-column prop="refundDate" label="退费时间" width="180" />
			<el-table-column prop="refundMoney" label="退费金额" width="180" />
			<el-table-column prop="refundState" label="退费状态" width="100" >
			<template #default="scope">
				<span v-if="scope.row.refundState=='1'">未退</span>
				<span v-else>已退</span>
			</template>
			</el-table-column>
			<el-table-column prop="leaveschoolId" label="学员退学状态" />
			<el-table-column prop="classrecordId" label="上课记录" />
			<el-table-column prop="courseId" label="退费课程" />
			<el-table-column prop="staffId" label="批准人" />
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
					refundDate:[],
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
					this.axios.get("http://localhost:8088/TSM/selectRefund", {
							params: this.pageInfo
						})
						.then(function(response) {
							console.log("1-------------------------------------------")
							console.log(response.data.data)
							_this.refundDate = response.data.records
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
					this.axios.get("http://localhost:8088/TSM/selectRefund", {
							params: this.pageInfo
						})
						.then(function(response) {
							console.log("2-------------------------------------------")
							console.log(response.data)
							_this.refundDate = response.data.records
							_this.pageInfo.total = response.data.total
						}).catch(function(error) {
							console.log(error)
						})
				},
			},
		created(){
			var _this = this
			this.axios.get("http://localhost:8088/TSM/selectRefund", {
					params: this.pageInfo
				})
				.then(function(response) {
					console.log(response.data)
					_this.refundDate = response.data.records
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
		float: left;
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
	
	.kong{
		width: 235px;
		display: inline-block;
	}
</style>
