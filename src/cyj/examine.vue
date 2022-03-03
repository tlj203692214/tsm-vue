<template>
	<el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
		<el-tab-pane label="员工请假">
			<div>
				<div class="query-form" style="margin-top: 15px">
					<el-input clearable v-model="pageInfo.input" placeholder="请输入内容" class="input-with-select"
						style="width: 20rem">
						<template #prepend> 姓名 </template>
						<template #append>
							<el-button @click="staffleaves()" :icon="Search"></el-button>
						</template>
					</el-input>
					<el-select @change="staffleaves()" v-model="pageInfo.select"
						style="margin-left: 15px; width: 150px">
						<el-option label="全部请假信息" value="1"></el-option>
						<el-option label="请假未审批" value="2"></el-option>
						<el-option label="请假已通过" value="3"></el-option>
						<el-option label="请假未通过" value="4"></el-option>
						<el-option label="请假已过期" value="5"></el-option>
					</el-select>
					<el-button id="xzstaff" @click="insertLeave = true">
						+ 员工请假
					</el-button>
				</div>
				<div class="showTableData">
					<el-table ref="mt" :data="leaveData" @selection-change="handeselect" style="width: 100%">
						<el-table-column prop="leaveId" label="编号">
							<template #default="scope">ID:{{ scope.row.leaveId }}</template>
						</el-table-column>
						<el-table-column prop="personalName" label="请假人"></el-table-column>
						<el-table-column prop="leaveContent" width="150" :show-overflow-tooltip="true" label="请假原因">
						</el-table-column>
						<el-table-column prop="beginTime" label="请假开始时间"></el-table-column>
						<el-table-column prop="endTime" label="请假结束时间"></el-table-column>
						<el-table-column prop="staffId2" label="审批人">
							<template #default="scope">
								<span v-if="scope.row.staffId2 == '' || scope.row.staffId2 == 'null'">
									未审批
								</span>
								<span v-else>
									<span v-for="aa in personalDate">
										<span v-if="scope.row.staffId2 == aa.staffId">
											{{ aa.personalName }}
										</span>
									</span>
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="leaveState" label="状态">
							<template #default="scope">
								<span v-if="scope.row.leaveState == 0">未通过</span>
								<span v-else-if="scope.row.leaveState == 1">已通过</span>
								<span v-else-if="scope.row.leaveState == 2">待审批</span>
								<span v-else-if="scope.row.leaveState == 3">已过期</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="160">
							<template #default="scope">
								<span v-if="scope.row.leaveState == 2">
									<el-button type="primary" size="mini" @click="updateLeaves(scope.row)">审批</el-button>
								</span>
								<span v-else-if="scope.row.leaveState == 1">
									<el-button type="success" size="mini" @click="byleavexq(scope.row)">详情</el-button>
								</span>
								<span v-else>
									<el-button type="success" size="mini" @click="byleavexq(scope.row)">详情</el-button>
									<el-button type="danger" size="mini" @click="dakaidelleave(scope.row)">删除</el-button>
								</span>
							</template>
						</el-table-column>
					</el-table>
					<div class="block">
						<el-pagination 
							@size-change="handleSizeChange" 
							@current-change="handleCurrentChange"
							:current-page="pageInfo.currentPage" 
							:page-sizes="[3, 6, 9]" :page-size="pageInfo.pagesize"
							layout="total, sizes, prev, pager, next, jumper" 
							:total="pageInfo.total">
						</el-pagination>
					</div>
				</div>
				<el-dialog v-model="insertLeave" title="新增员工请假条" width="52%" @close="resetleaveForm('ruleForm')" center>
					<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
						<el-form-item label="请假人" prop="name">
							<span v-for="ps in personalDate">
								<span v-if="this.StaffId == ps.staffId">
									<el-button disabled>{{ ps.personalName }}</el-button>
								</span>
							</span>
						</el-form-item>
						<el-form-item label="请假原因" prop="content">
							<el-input type="textarea" maxlength="100" v-model="ruleForm.content"></el-input>
						</el-form-item>
						<el-form-item label="请假时间" prop="value">
							<el-date-picker v-model="ruleForm.value" type="daterange" range-separator="To"
								:disabled-date="disabledDate" start-placeholder="请假开始时间" end-placeholder="请假结束时间">
							</el-date-picker>
						</el-form-item>
					</el-form>
					<template #footer>
						<el-button @click="resetleaveForm('ruleForm')">取消</el-button>
						<el-button type="primary" @click="insertleave('ruleForm')">提交</el-button>
					</template>
				</el-dialog>
				<el-dialog v-model="updateLeave" title="请假审批" width="44%" @close="resetUpleave('ruleupForm')" center>
					<el-form ref="ruleupForm" :model="ruleupForm" :rules="Uprules" label-width="120px"
						class="demo-ruleForm">
						<el-form-item label="请假人">
							<el-input disabled v-model="ruleupForm.name"></el-input>
						</el-form-item>
						<el-form-item label="请假原因">
							<el-input disabled type="textarea" maxlength="100" v-model="ruleupForm.content"></el-input>
						</el-form-item>
						<el-form-item label="请假时间">
							<el-input disabled style="width: 150px" v-model="ruleupForm.kaidate"></el-input>
							——
							<el-input disabled style="width: 150px" v-model="ruleupForm.jiedate"></el-input>
						</el-form-item>
						<el-form-item label="是否通过" prop="leaveState">
							<el-radio-group v-model="ruleupForm.leaveState" style="float: left">
								<el-radio label="1">通过</el-radio>
								<el-radio label="0">未通过</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
					<template #footer>
						<el-button @click="resetUpleave('ruleupForm')">取消</el-button>
						<el-button type="primary" @click="upStaffleave('ruleupForm')">提交</el-button>
					</template>
				</el-dialog>
				<el-dialog v-model="staffleavexq" title="请假详情" width="30%" center>
					<p style="margin-left: 20px;">请假人：{{ruleupForm.name}}</p>
					<p style="margin: 20px;">请假原由：{{ruleupForm.content}}</p>
					<p style="margin: 20px;">请假时间：{{ruleupForm.kaidate}} —— {{ruleupForm.jiedate}}</p>
					<p style="margin: 20px;">状态：
					<span v-if="this.ruleupForm.leaveState==0">未通过</span>
					<span v-else-if="this.ruleupForm.leaveState==1">已通过</span>
					<span v-else-if="this.ruleupForm.leaveState==2">待审批</span>
					<span v-else>已过期</span>
					</p>
				</el-dialog>
				<el-dialog v-model="delleave" title="提示" width="30%" center>
					<span style="margin-left: 66px;">是否删除ID【{{delruleForm.sid}}】的该条请假信息？</span>
					<template #footer>
						<el-button @click="delleave = false">取消</el-button>
						<el-button type="primary" @click="delStaffleave()">确定</el-button>
					</template>
				</el-dialog>
			</div>
		</el-tab-pane>
		<el-tab-pane label="员工出差">
			<div>
				<div class="query-form" style="margin-top: 15px">
					<el-select @change="business()" v-model="pageInfo.select" style="width: 150px">
						<el-option label="全部出差信息" value="1"></el-option>
						<el-option label="出差未审批" value="2"></el-option>
						<el-option label="出差已通过" value="3"></el-option>
						<el-option label="出差未通过" value="4"></el-option>
						<el-option label="出差已过期" value="5"></el-option>
					</el-select>
					<el-button id="xzstaff" @click="addBusiness = true">
						+ 员工出差
					</el-button>
				</div>
				<div class="showTableData">
					<el-table ref="mt" :data="businessData" @selection-change="handeselect" style="width: 100%">
						<el-table-column prop="staffbusinessId" label="编号">
							<template #default="scope">ID:{{ scope.row.staffbusinessId }}</template>
						</el-table-column>
						<el-table-column prop="staffId1" label="出差人">
							<template #default="scope">
								<span v-for="ps in personalDate">
									<span v-if="scope.row.staffId1 == ps.staffId">
										{{ ps.personalName }}
									</span>
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="staffbusinessContent" width="150" :show-overflow-tooltip="true"
							label="出差原因"></el-table-column>
						<el-table-column prop="beginTime" label="出差开始时间" width="150"></el-table-column>
						<el-table-column prop="endTime" label="出差结束时间" width="150"></el-table-column>
						<el-table-column prop="staffId2" label="审批人">
							<template #default="scope">
								<span v-for="ps in personalDate">
									<span v-if="scope.row.staffId2 == ps.staffId">
										{{ ps.personalName }}
									</span>
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="staffbusinessState" label="状态">
							<template #default="scope">
								<span v-if="scope.row.staffbusinessState == 0">未通过</span>
								<span v-else-if="scope.row.staffbusinessState == 1">已通过</span>
								<span v-else-if="scope.row.staffbusinessState == 2">待审批</span>
								<span v-else>已过期</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="160">
							<template #default="scope">
								<span v-if="scope.row.staffbusinessState == 2">
									<el-button type="primary" size="mini" @click="updatebusiness(scope.row)">审批</el-button>
								</span>
								<span v-else-if="scope.row.staffbusinessState == 1">
									<el-button type="success" size="mini" @click="bybusinessxq(scope.row)">详情</el-button>
								</span>
								<span v-else>
									<el-button type="success" size="mini" @click="bybusinessxq(scope.row)">详情</el-button>
									<el-button type="danger" size="mini" @click="dakdelbusiness(scope.row)">删除</el-button>
								</span>
							</template>
						</el-table-column>
					</el-table>
					<div class="block">
						<el-pagination @size-change="businessSizeChange" @current-change="businessCurrentChange"
							:current-page="pageInfo.currentPage" :page-sizes="[3, 6, 9]" :page-size="pageInfo.pagesize"
							layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
						</el-pagination>
					</div>
				</div>
				<el-dialog v-model="addBusiness" title="新增员工出差信息" width="52%" @close="resetbusinForm('businessForm')" center>
					<el-form ref="businessForm" :model="businessForm" :rules="ccrules" label-width="120px"
						class="demo-businessForm">
						<el-form-item label="出差人" prop="name">
							<span v-for="ps in personalDate">
								<span v-if="this.StaffId == ps.staffId">
									<el-button disabled>{{ ps.personalName }}</el-button>
								</span>
							</span>
						</el-form-item>
						<el-form-item label="出差原因" prop="content">
							<el-input type="textarea" maxlength="100" v-model="businessForm.content"></el-input>
						</el-form-item>
						<el-form-item label="出差时间" prop="value">
							<el-date-picker v-model="businessForm.value" type="daterange" range-separator="To"
								:disabled-date="disabledDate" start-placeholder="出差开始时间" end-placeholder="出差结束时间">
							</el-date-picker>
						</el-form-item>
					</el-form>
					<template #footer>
						<el-button @click="resetbusinForm('businessForm')">取消</el-button>
						<el-button type="primary" @click="addbusiness('businessForm')">提交</el-button>
					</template>
				</el-dialog>
				<el-dialog v-model="upbusiness" title="出差审批" width="44%" @close="resetUpbusin('ruleupForm')" center>
					<el-form ref="ruleupForm" :model="ruleupForm" :rules="Uprules" label-width="120px"
						class="demo-ruleForm">
						<el-form-item label="出差人" prop="name">
							<span v-for="ps in personalDate">
								<span v-if="this.ruleupForm.sqid == ps.staffId">
									<el-button disabled>{{ ps.personalName }}</el-button>
								</span>
							</span>
						</el-form-item>
						<el-form-item label="出差原因">
							<el-input disabled type="textarea" maxlength="100" v-model="ruleupForm.content"></el-input>
						</el-form-item>
						<el-form-item label="出差时间">
							<el-input disabled style="width: 150px" v-model="ruleupForm.kaidate"></el-input>
							——
							<el-input disabled style="width: 150px" v-model="ruleupForm.jiedate"></el-input>
						</el-form-item>
						<el-form-item label="是否通过" prop="leaveState">
							<el-radio-group v-model="ruleupForm.leaveState" style="float: left">
								<el-radio label="1">通过</el-radio>
								<el-radio label="0">未通过</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
					<template #footer>
						<el-button @click="resetUpbusin('ruleupForm')">取消</el-button>
						<el-button type="primary" @click="upStaffbusin('ruleupForm')">提交</el-button>
					</template>
				</el-dialog>
				<el-dialog v-model="staffbusinessxq" title="出差详情" width="30%" center>
					<span v-for="ps in personalDate">
						<span v-if="this.ruleupForm.sqid == ps.staffId">
							<p style="margin-left: 20px;">出差人：{{ ps.personalName }}</p>
						</span>
					</span>
					<p style="margin: 20px;">出差原由：{{ruleupForm.content}}</p>
					<p style="margin: 20px;">出差时间：{{ruleupForm.kaidate}} —— {{ruleupForm.jiedate}}</p>
					<p style="margin: 20px;">状态：
						<span v-if="this.ruleupForm.leaveState==0">未通过</span>
						<span v-else-if="this.ruleupForm.leaveState==1">已通过</span>
						<span v-else-if="this.ruleupForm.leaveState==2">待审批</span>
						<span v-else>已过期</span>
					</p>
				</el-dialog>
				<el-dialog v-model="delbusiness" title="提示" width="30%" center>
					<span style="margin-left: 66px;">是否删除ID【{{delruleForm.sid}}】的该条出差信息？</span>
					<template #footer>
						<el-button @click="delbusiness = false">取消</el-button>
						<el-button type="primary" @click="delStaffbusin()">确定</el-button>
					</template>
				</el-dialog>
			</div>
		</el-tab-pane>
	</el-tabs>
</template>

<script setup lang="ts">
	import {
		ref
	} from "vue";
	import {
		Search
	} from "@element-plus/icons";
	const disabledDate = (time: Date) => {
		return time.getTime() <= Date.now();
	};
</script>
<script lang="ts">
	import qs from "qs";
	import {
		ElMessage
	} from "element-plus";
	export default {
		data() {
			return {
				activeName: "0",
				leaveData: [],
				leavelistData: [],
				leavelistvoData: [],
				personalDate: [],
				businessData: [],
				businlistData:[],
				StaffId: sessionStorage.getItem("staffId"),
				insertLeave: ref(false),
				addBusiness: ref(false),
				updateLeave: ref(false),
				upbusiness: ref(false),
				staffleavexq: ref(false),
				staffbusinessxq: ref(false),
				delleave: ref(false),
				delbusiness: ref(false),
				ruleForm: {
					content: "",
					value: "",
				},
				ruleupForm: {
					id: "",
					sqid: "",
					pid: "",
					name: "",
					content: "",
					kaidate: "",
					jiedate: "",
					leaveState: "",
				},
				delruleForm:{
					sid: "",
				},
				rules: {
					content: [{
						required: true,
						message: "请假原因不可为空",
						trigger: "blur",
					}, ],
					value: [{
						type: "date",
						required: true,
						message: "请假时间不可为空",
						trigger: "change",
					}, ],
				},
				ccrules: {
					content: [{
						required: true,
						message: "出差原因不可为空",
						trigger: "blur",
					}, ],
					value: [{
						type: "date",
						required: true,
						message: "出差时间不可为空",
						trigger: "change",
					}, ],
				},
				Uprules: {
					leaveState: [{
						required: true,
						message: '请选择审批结果',
						trigger: 'change',      
					}]
				},
				businessForm: {
					content: "",
					value: "",
				},
				pageInfo: {
					select: "1",
					input: "",
					currentPage: 1,
					pagesize: 3,
					total: 0,
				},
			};
		},
		methods: {
			byleavexq(row){
				this.ruleupForm.name = row.personalName;
				this.ruleupForm.content = row.leaveContent;
				this.ruleupForm.kaidate = row.beginTime;
				this.ruleupForm.jiedate = row.endTime;
				this.ruleupForm.leaveState = row.leaveState;
				this.staffleavexq = true
			},
			bybusinessxq(row){
				this.ruleupForm.sqid = row.staffId1;
				this.ruleupForm.content = row.staffbusinessContent;
				this.ruleupForm.kaidate = row.beginTime;
				this.ruleupForm.jiedate = row.endTime;
				this.ruleupForm.leaveState = row.staffbusinessState;
				this.staffbusinessxq = true
			},
			dakaidelleave(row){
				this.delruleForm.sid = row.leaveId,
				this.delleave = true
			},
			delStaffleave(){
				var _this = this;
				this.axios
					.post("http://localhost:8088/TSM/staffleave/delstaffleave/"+this.delruleForm.sid)
					.then(function(response) {
						console.log(response.data);
						_this.handleClick();
					})
					.catch(function(error) {
						console.log(error);
					});
				ElMessage({
					message: "删除成功！",
					type: "success"
				});
				this.delleave = false
			},
			dakdelbusiness(row){
				this.delruleForm.sid = row.staffbusinessId,
				this.delbusiness = true
			},
			delStaffbusin(){
				var _this = this;
				this.axios
					.post("http://localhost:8088/TSM/staffbusiness/delstaffbusiness/"+this.delruleForm.sid)
					.then(function(response) {
						console.log(response.data);
						_this.handleClick();
					})
					.catch(function(error) {
						console.log(error);
					});
				ElMessage({
					message: "删除成功！",
					type: "success"
				});
				this.delbusiness = false
			},
			updatebusiness(row){
				this.ruleupForm.id = row.staffbusinessId;
				this.ruleupForm.sqid = row.staffId1;
				this.ruleupForm.content = row.staffbusinessContent;
				this.ruleupForm.kaidate = row.beginTime;
				this.ruleupForm.jiedate = row.endTime;
				this.upbusiness = true;
			},
			resetUpbusin(updateformName){
				this.$refs[updateformName].resetFields()
				this.upbusiness = false
			},
			upStaffbusin(updateformName){
				this.$refs[updateformName].validate((valid) => {
					if (valid) {
						var _this = this;
						this.axios
							.post("http://localhost:8088/TSM/staffbusiness/upstaffbusiness", {
								staffbusinessId: this.ruleupForm.id,
								staffId1: this.ruleupForm.sqid,
								staffId2: this.StaffId,
								staffbusinessState: this.ruleupForm.leaveState,
							})
							.then(function(response) {
								console.log(response.data);
								_this.UpstatePersonal()
								_this.handleClick();
							})
							.catch(function(error) {
								console.log(error);
							});
						ElMessage({
							message: "审批完成！",
							type: "success"
						});
					} else {
						console.log("error submit!!");
						return false;
					}
					this.upbusiness = false
				});
			},
			resetUpleave(upformName){
				this.$refs[upformName].resetFields()
				this.updateLeave = false
			},
			updateLeaves(row) {
				this.ruleupForm.id = row.leaveId;
				this.ruleupForm.sqid = row.staffId1;
				this.ruleupForm.pid = row.personalId;
				this.ruleupForm.name = row.personalName;
				this.ruleupForm.content = row.leaveContent;
				this.ruleupForm.kaidate = row.beginTime;
				this.ruleupForm.jiedate = row.endTime;
				this.updateLeave = true;
			},
			upStaffleave(upforName){
				this.$refs[upforName].validate((valid) => {
					if (valid) {
						var _this = this;
						this.axios
							.post("http://localhost:8088/TSM/staffleave/upstaffleave", {
								leaveId: this.ruleupForm.id,
								staffId1: this.ruleupForm.sqid,
								staffId2: this.StaffId,
								leaveState: this.ruleupForm.leaveState,
							})
							.then(function(response) {
								console.log(response.data);
								_this.UpstatePersonal()
								_this.handleClick();
							})
							.catch(function(error) {
								console.log(error);
							});
						ElMessage({
							message: "审批完成！",
							type: "success"
						});
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			UpstatePersonal(){
				var _this=this
				this.axios.post("http://localhost:8088/TSM/personal/upstatePersonal/"+this.ruleupForm.pid)
				.then(function(response){
					console.log(response.data)
				}).catch(function(error){
					console.log(error)
				})
				console.log("个人资料编号",this.ruleupForm.pid)
				console.log("员工休假中。。。。")
				this.updateLeave = false;
			},
			resetleaveForm(aveformName){
				this.$refs[aveformName].resetFields()
				this.insertLeave = false
			},
			insertleave(addformName) {
				this.$refs[addformName].validate((valid) => {
					if (valid) {
						var _this = this;
						this.axios
							.post("http://localhost:8088/TSM/staffleave/insetleave", {
								leaveContent: this.ruleForm.content,
								beginTime: this.ruleForm.value[0],
								endTime: this.ruleForm.value[1],
								staffId1: this.StaffId,
								staffId2: 4,
								leaveState: 2,
							})
							.then(function(response) {
								console.log(response.data);
							})
							.catch(function(error) {
								console.log(error);
							});
						ElMessage({
							message: "请假条新增成功！",
							type: "success"
						});
						this.insertLeave = false;
						this.handleClick();
						console.log(this.ruleForm.value[0], "这是开始时间的值");
						console.log(this.ruleForm.value[1], "这是结束时间的值");
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			resetbusinForm(essformName){
				this.$refs[essformName].resetFields()
				this.addBusiness = false
			},
			addbusiness(addformName) {
				this.$refs[addformName].validate((valid) => {
					if (valid) {
						var _this = this;
						this.axios
							.post("http://localhost:8088/TSM/staffbusiness/insertbusiness", {
								staffbusinessContent: this.businessForm.content,
								beginTime: this.businessForm.value[0],
								endTime: this.businessForm.value[1],
								staffId1: this.StaffId,
								staffId2: 4,
								staffbusinessState: 2,
							})
							.then(function(response) {
								console.log(response.data);
							})
							.catch(function(error) {
								console.log(error);
							});
						ElMessage({
							message: "出差请求新增成功！",
							type: "success"
						});
						this.addBusiness = false;
						this.handleClick();
						console.log(this.ruleForm.value[0], "这是开始时间的值");
						console.log(this.ruleForm.value[1], "这是结束时间的值");
					} else {
						console.log("error submit!!");
						return false;
					}
				});
				console.log(this.businessForm.value[0], "这是开始时间的值");
				console.log(this.businessForm.value[1], "这是结束时间的值");
			},
			SelPersonal() {
				var _this = this;
				this.axios
					.get("http://localhost:8088/TSM/personal/selectpersonal")
					.then(function(response) {
						console.log(response.data);
						_this.personalDate = response.data;
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			staffleaves() {
				var _this = this;
				this.axios
					.get("http://localhost:8088/TSM/staffleavesvo", {
						params: this.pageInfo,
					})
					.then(function(response) {
						console.log(response.data);
						_this.leaveData = response.data.records;
						_this.pageInfo.total = response.data.total;
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			handleCurrentChange(page) {
				var _this = this;
				this.pageInfo.currentPage = page;
				var ps = qs.stringify(this.pageInfo);
				console.log(ps);
				this.axios
					.get("http://localhost:8088/TSM/staffleavesvo", {
						params: this.pageInfo,
					})
					.then(function(response) {
						console.log("1-------------------------------------------");
						console.log(response.data);
						_this.leaveData = response.data.records;
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			handleSizeChange(size) {
				var _this = this;
				this.pageInfo.pagesize = size;
				var ps = qs.stringify(this.pageInfo);
				console.log(ps);
				this.axios
					.get("http://localhost:8088/TSM/staffleavesvo", {
						params: this.pageInfo,
					})
					.then(function(response) {
						console.log("2-------------------------------------------");
						console.log(response.data);
						_this.leaveData = response.data.records;
						_this.pageInfo.total = response.data.total;
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			business() {
				var _this = this;
				this.axios
					.get("http://localhost:8088/TSM/staffbusiness/business", {
						params: this.pageInfo,
					})
					.then(function(response) {
						console.log(response.data);
						_this.businessData = response.data.records;
						_this.pageInfo.total = response.data.total;
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			businessCurrentChange(page) {
				var _this = this;
				this.pageInfo.currentPage = page;
				var ps = qs.stringify(this.pageInfo);
				console.log(ps);
				this.axios
					.get("http://localhost:8088/TSM/staffbusiness/business", {
						params: this.pageInfo,
					})
					.then(function(response) {
						console.log("1-------------------------------------------");
						console.log(response.data);
						_this.businessData = response.data.records;
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			businessSizeChange(size) {
				var _this = this;
				this.pageInfo.pagesize = size;
				var ps = qs.stringify(this.pageInfo);
				console.log(ps);
				this.axios
					.get("http://localhost:8088/TSM/staffbusiness/business", {
						params: this.pageInfo,
					})
					.then(function(response) {
						console.log("2-------------------------------------------");
						console.log(response.data);
						_this.businessData = response.data.records;
						_this.pageInfo.total = response.data.total;
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			handleClick(teb, event) {
				if (this.activeName == "0") {
					var _this = this;
					this.axios
						.get("http://localhost:8088/TSM/staffleavesvo", {
							params: this.pageInfo,
						})
						.then(function(response) {
							console.log(response.data);
							_this.leaveData = response.data.records;
							_this.pageInfo.total = response.data.total;
						})
						.catch(function(error) {
							console.log(error);
						});
					this.SelPersonal();
					sessionStorage.setItem("activeName", "0");
					// this.$router.push("/staffleave")
				} else if (this.activeName == "1") {
					var _this = this;
					this.axios
						.get("http://localhost:8088/TSM/staffbusiness/business", {
							params: this.pageInfo,
						})
						.then(function(response) {
							console.log(response.data);
							_this.businessData = response.data.records;
							_this.pageInfo.total = response.data.total;
						})
						.catch(function(error) {
							console.log(error);
						});
					this.SelPersonal();
					sessionStorage.setItem("activeName", "1");
					// this.$router.push("/business")
				}
			},
			listStaffleave() {
				var _this = this;
				this.axios.get("http://localhost:8088/TSM/staffleave/booleanleave")
					.then(function(response) {
						console.log("请假请假请假请假请假请假请假请假",response.data);
						_this.leavelistData = response.data
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			listStaffbusiness(){
				var _this = this;
				this.axios.get("http://localhost:8088/TSM/staffbusiness/listbusiness")
					.then(function(response) {
						console.log("出差出差出差出差出差出差",response.data);
						_this.businlistData = response.data
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			UpStaffleaveVo(){
				var _this = this;
				this.axios.get("http://localhost:8088/TSM/Upstateleavevo")
					.then(function(response) {
						console.log("休假结束休假结束",response.data);
						_this.leavelistvoData = response.data
					})
					.catch(function(error) {
						console.log(error);
					});
			},
		},
		created() {
			this.handleClick();
			this.listStaffleave()
			this.listStaffbusiness()
			this.UpStaffleaveVo()
		},
	};
</script>

<style></style>
