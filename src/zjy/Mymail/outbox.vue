<template>


	<div class="fjx">
		快速检索:<select v-model="pageInfo.js" class="c">
			<option value="标题">标题</option>
			<option value="接收人">接收人</option>
		</select>
		
		<el-input style="width:200px;height:auto;" v-model="inputs" :placeholder="a+this.pageInfo.js+b" clearable />
		<el-button @click="ksjs(inputs)">搜索</el-button>
	</div>


	<div class="e">
		<el-button style="background-color: blue;color: white;" :icon="CircleCloseFilled"
			@click="deleteFileOrDirectory(fjxsz)" :disabled="this.fjxsz.length === 0">
			<el-icon><delete-filled /></el-icon>删除
		</el-button>
	</div>


	<el-table border ref="mt" :data="SendfData" style="width: 100%;" @selection-change="fjxszchange"
		:row-class-name="tableRowClassName">
		<el-table-column type="selection" width="55"></el-table-column>
		<el-table-column label="标题" width="300">
			<template #default="scope">
				<span class="a" @click="cknr(scope.row)">{{scope.row.sendTitle}}</span>
			</template>
		</el-table-column>


		<el-table-column prop="staffName2" label="全部收件人" width="160"></el-table-column>

		<el-table-column prop="sendDate" label="日期" show-overflow-tooltip></el-table-column>

	</el-table>

	<!-- <el-button @click="deleteFileOrDirectory(usersz)" :disabled="this.usersz.length === 0"> 批量删除</el-button> -->
	<div class="block">
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="pageInfo.currentPage" :page-sizes="[2, 3, 6, 10]" :page-size="pageInfo.pagesize"
			layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
		</el-pagination>
	</div>


</template>

<script>
	import {
		defineComponent,
		ref
	} from 'vue'
	import qs from 'qs'
import { ElMessage } from 'element-plus'
	export default {
		data() {
			return {
				fjxsz: [],
				a: "根据",
				b: "查询",
				inputs: "",
				SendfData: [],
				pageInfo: {
					currentPage: 1,
					pagesize: 3,
					total: 0,
					js: "标题",
					input: "",
					StaffNames: sessionStorage.getItem("staffName")
				}
			}

		},
		methods: {
			cknr(scope) {

				sessionStorage.setItem("id", scope.sendId),
					sessionStorage.setItem("title", scope.sendTitle),
					sessionStorage.setItem("staffName1", scope.staffName1),
					sessionStorage.setItem("staffName2", scope.staffName2),
					sessionStorage.setItem("sendContent", scope.sendContent),
					sessionStorage.setItem("sendDate", scope.sendDate),
					sessionStorage.setItem("b", "block"),

					this.$router.push("/outboxcontent");

			},
			handeDel(row) {  //删除单个数据
				console.log("扁午"+row.sendId);
				let _this = this
				this.axios.post("http://localhost:8088/TSM/send/delectsend", {
						sendId:row.sendId,
                        deleted:"1",
					})
					.then(res => {
						console.log("bianhaobianhao")

						_this.creat()

					}).catch(function(error) {
						console.log(error)
					})

			},
			creat() { //删除数据之后做查询刷新操作
				var _this = this
				this.axios.get("http://localhost:8088/TSM/send/Send", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.SendfData = response.data.records
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})  
			},
			deleteFileOrDirectory(fjxsz) {
				for (var i = 0; i < fjxsz.length; i++) {
					
					this.handeDel(fjxsz[i])   //利用数组循环id做删除
				}
				 ElMessage({message: '删除成功！',type: 'success',})
			},
			fjxszchange(fjxsz) {
				this.fjxsz = fjxsz  //将数据添加到数组
				
			},
			
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (rowIndex % 2 === 0) {
					return 'gray';
				}
				return '';
			},

			ksjs(inputs) {

				this.pageInfo.input = inputs

				var _this = this
				this.axios.get("http://localhost:8088/TSM/send/Send", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.SendfData = response.data.records
						_this.pageInfo.total = response.data.total

					}).catch(function(error) {
						console.log(error)

					})

			},
			handleCurrentChange(page) {
				var _this = this
				this.pageInfo.currentPage = page

				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/TSM/send/Send", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log("1-------------------------------------------")
						console.log(response.data)
						_this.SendfData = response.data.records
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(size) {
				var _this = this
				this.pageInfo.pagesize = size
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/TSM/send/Send", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log("2-------------------------------------------")
						console.log(response.data)
						_this.SendfData = response.data.records
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			}
		},
		created() {
			console.log("bbbbbbbbbbbbb")

			var _this = this
			this.axios.get("http://localhost:8088/TSM/send/Send", {
					params: this.pageInfo
				})
				.then(function(response) {
					console.log(response.data)
					_this.SendfData = response.data.records
					_this.pageInfo.total = response.data.total
				}).catch(function(error) {
					console.log(error)
				})


		}
	}
</script>

<style>
	.fjx .el-input .el-input__inner {
		height: 30px;
		margin-left: 0px;
		margin-top: -5%;
	}

	.c {
		width: 193px;
		height: 30px;
	}

	.el-button {
		margin-left: 8px;
		margin-top: 0%;

	}

	.el-table .gray {
		background-color: lightgray;
	}
</style>
