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
					姓名
				</template>
				<template #append>
					<el-button :icon="Search" @click="staffsigns()"></el-button>
				</template>
		    </el-input>
			<span v-for="sg in signlistData">
				<span v-if="sg.staffId==this.StaffId">
					<span v-if="sg.signState==0">
						<el-button type="primary" style="margin-left: 1rem;" @click="updatesigns(sg)">打卡</el-button>
					</span>
					<span v-else>
						<el-button type="danger" disabled style="margin-left: 1rem;">打卡</el-button>
					</span>
				</span>
			</span>
		</div>
		<div class="showTableData">
			<el-table ref="mt" :data="signData" @selection-change="handeselect" style="width: 100%;">
				<el-table-column prop="signId" label="编号" width="200">
					<template #default="scope">ID:{{scope.row.signId}}</template>
				</el-table-column>
				<el-table-column prop="personalName" label="员工姓名" width="200"></el-table-column>
				<el-table-column prop="signDate" label="上次打卡时间" width="240"></el-table-column>
				<el-table-column prop="signState" label="状态" width="200">
					<template #default="scope">
						<span v-if="scope.row.signState==0">未打卡</span>
						<span v-else>已打卡</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template #default="scope">
						<!-- <span v-if="scope.row.signState==0">
							<el-button type="primary" size="mini" @click="updatesigns(scope.row)">打卡</el-button>
						</span>
						<span v-else>
							<el-button type="danger" disabled size="mini">打卡</el-button>
						</span> -->
						<el-button type="primary" size="mini" @click="attendanceByid(scope.row)">本月考勤</el-button>
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
		<el-dialog v-model="kaoqing" title="本月考勤" width="40%" center>
		    <el-calendar ref="calendar">
		        <template #header="{ date }">
					<span>考勤员工：{{xy}}</span>
					<span>{{ date }}️</span>
		        </template>
				<template #dateCell="{ data }">
				    <p>
				        {{ data.day.split('-').slice(1).join('-') }}
				    </p>
					<span v-for="kq in attendance">
						<span v-if="kq.attendanceDate==data.day">
							✔️
						</span>
					</span>
				</template>
		      </el-calendar>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { Search } from '@element-plus/icons'
	const calendar = ref()
	const selectDate = (val: string) => {
	  calendar.value.selectDate(val)
	}
</script>
<script lang="ts">
	import qs from 'qs'
	import { ElMessage } from 'element-plus'
	export default{
		data() {
			return {
				signData: [],
				attendance:[],
				signlistData: [],
				pageInfo:{
					input: '',
					currentPage:1,
					pagesize:3,
					total:0
				},
				xy: '',
				StaffId:sessionStorage.getItem("staffId"),
				kaoqing:false
			}
		},
		methods:{
			attendanceByid(row){
				var _this=this
				this.xy = row.personalName
				this.axios.get("http://localhost:8088/TSM/attendance/attendancebyid/"+row.staffId)
				.then(function(response){
					console.log(response.data)
					_this.attendance=response.data
				}).catch(function(error){
					console.log(error)
				})
				this.kaoqing = true
			},
			updatesigns(sg){
				var _this=this
				console.log("idididiidididi ",sg.signId)
				this.axios.post("http://localhost:8088/TSM/updatestaffsign",{signId: sg.signId,})
				.then(function(response){
					console.log(response.data)
					ElMessage({message: '打卡成功！',type: 'success',})
					_this.addAttendance()
					_this.staffsigns()
				}).catch(function(error){
					console.log(error)
				})
			},
			addAttendance(){
				var _this=this
				this.axios.post("http://localhost:8088/TSM/attendance/addattendance",{
					staffId: sessionStorage.getItem("staffId"),
				}).then(function(response){
					console.log(response.data)
					alert("新增数据！！")
				}).catch(function(error){
					console.log(error)
				})				
			},
			staffsigns(){
				var _this=this
				this.axios.get("http://localhost:8088/TSM/Staffsignvo"
				                ,{params:this.pageInfo})
				.then(function(response){
					console.log(response.data)
					_this.signData=response.data.records
					_this.pageInfo.total=response.data.total
				}).catch(function(error){
					console.log(error)
				})
				this.signList()
			},
			handleCurrentChange(page){
				var _this=this
				this.pageInfo.currentPage=page
				var ps=qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/TSM/Staffsignvo",{params:this.pageInfo})
				.then(function(response){
					console.log("1-------------------------------------------")
					console.log(response.data)
					_this.signData=response.data.records
				}).catch(function(error){
					console.log(error)
				})
			},
			handleSizeChange(size){
				var _this=this
				this.pageInfo.pagesize=size
				var ps=qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/TSM/Staffsignvo",{params:this.pageInfo})
				.then(function(response){
					console.log("2-------------------------------------------")
					console.log(response.data)
					_this.signData=response.data.records
					_this.pageInfo.total=response.data.total
				}).catch(function(error){
					console.log(error)
				})
			},
			signList(){
				var _this=this
				this.axios.get("http://localhost:8088/TSM/staffsignlist")
				.then(function(response){
					console.log(response.data)
					_this.signlistData=response.data
				}).catch(function(error){
					console.log(error)
				})
			},
		},
		created(){
			var _this=this
			this.axios.get("http://localhost:8088/TSM/Staffsignvo"
			                ,{params:this.pageInfo})
			.then(function(response){
				console.log(response.data)
				_this.signData=response.data.records
				_this.pageInfo.total=response.data.total
			}).catch(function(error){
				console.log(error)
			})
			this.signList()
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
	.showTableData{
		background: #fff;
		padding: 14px;
	}
</style>
