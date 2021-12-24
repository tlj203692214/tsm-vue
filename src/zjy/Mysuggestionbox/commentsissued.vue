<template>
	<div style="margin-top:2%;" class="diva">
	<div class="b">
	检索条件:<select v-model="pageInfo.zt" class="c">
		<option value="全部的意见"><el-icon><delete-filled /></el-icon>全部的意见</option>
		<option value="待回复的意见"><el-icon><delete-filled /></el-icon>待回复的意见</option>
		<option value="已回复的意见"><el-icon><delete-filled /></el-icon>已回复的意见</option>
	</select>
	</div>
	</div>
	<div class="e">
		<el-button style="background-color: blue;color: white;" :icon="CircleCloseFilled" @click="fsyj=true"><el-icon><delete-filled /></el-icon>新增</el-button>
	
	</div>
	<el-table border ref="mt" :data="commentsfData" style="width: 100%"  @selection-change="sjxszchange" :row-class-name="tableRowClassName">
		<el-table-column type="selection" width="55" ></el-table-column>                                                                 
		
		<el-table-column    prop="opinionTitle"  label="意见标题" width="320"></el-table-column>
		<!-- <el-table-column   v-else prop="receivingsState"  label="状态" width="120"> -->
			
		<!-- </el-table-column> -->
		
		<el-table-column prop="suggestionsId" label="意见箱" width="150" ></el-table-column>
	
		<el-table-column prop="staffId" label="发表人"  width="160"></el-table-column>
		<el-table-column prop="publicationTime" label="发表时间"  width="200"></el-table-column>
		<el-table-column prop="respondent" label="回复人"  width="200"></el-table-column>
		<el-table-column prop="replyTime" label="回复时间" show-overflow-tooltip ></el-table-column>
	</el-table>
	<div class="block">
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="pageInfo.currentPage"
	      :page-sizes="[2, 3, 6, 10]"
	      :page-size="pageInfo.pagesize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="pageInfo.total">
	    </el-pagination>
	  </div> 
	  
	  <!-- 新增界面-->
	  	<el-dialog v-model="fsyj" title="新增意见箱" width="70%" center>
	  		<el-form ref="ruleForm"  class="demo-ruleForm" :model="ruleForm" :rules="rules">
	  		
	  			<el-form-item label="选择意见箱:" style="float: left" prop="suggestionsId">
	  				<el-select v-model="ruleForm.suggestionsId" filterable   placeholder=" " allow-create  >
	  										  <el-option
	  											v-for="suggestionsData in suggestionsData"
	  											:key="suggestionsData.suggestionsName"
	  											:label="suggestionsData.suggestionsName"
	  											:value="suggestionsData.suggestionsId"
	  										  >
	  										  </el-option>
	  										</el-select>
	  			</el-form-item>
	  				<el-form-item label="意见标题:"  prop="suggestionsManage">
	  			  <el-input v-model="ruleForm.opinionTitle"  style="width:200px"></el-input>
	  				</el-form-item>
	  			<el-form-item label="意见内容:" prop="opinionContent">
	  				<el-input v-model="ruleForm.opinionContent"  style="width:200px"></el-input>
	  			</el-form-item>
	        	
	  		</el-form>
	  		<template #footer>
	  			<span class="dialog-footer">
	  				<el-button type="primary"  @click="addsuggestions('ruleForm')">
	  					保存并新建</el-button>
	  			</span>
	  				<span class="dialog-footer">
	  					<el-button type="primary"  @click="addNotice('ruleForm')">
	  						保存并关闭</el-button>
	  				</span>
	  				<span class="dialog-footer">
	  					<el-button type="primary"  @click="xzjm=false">
	  						关闭</el-button>
	  				</span>
	  		</template>
			</el-dialog>
</template>

<script>
	import {
			defineComponent,
			ref,
			onMounted
		} from 'vue'
		import qs from 'qs'
	export default{
		data(){
			return{
				fsyj:ref(false),
				commentsfData:[],
				pageInfo:{
					currentPage:1,
					pagesize:3,
					total:0,
					zt:"全部的意见",
					staffId:sessionStorage.getItem("staffId")
				},
				ruleForm: {
					suggestionsId:"",
					opinionTitle:"",
					opinionContent: ""
				},
				rules: {
					suggestionsId: [{
						required: true,
						message: '意见箱不能为空！',
						trigger: 'blur',
					}],
					opinionTitle: [{
						required: true,
						message: '意见标题不能为空！',
						trigger: 'blur',
					}],
					opinionContent: [{
						required: true,
						message: '意见内容不能为空！',
						trigger: 'blur',
					}]
				},
			}
		},
		methods:{
			handleCurrentChange(page){
						var _this=this
						this.pageInfo.currentPage=page
						
						var ps=qs.stringify(this.pageInfo)
						console.log(ps)
						this.axios.get("http://localhost:8088/TSM/bulletinbox",{params:this.pageInfo})
						.then(function(response){
							console.log("1-------------------------------------------")
							console.log(response.data)
							_this.commentsfData=response.data.records
						}).catch(function(error){
							console.log(error)
						})
					},
					handleSizeChange(size){
						var _this=this
						this.pageInfo.pagesize=size
						var ps=qs.stringify(this.pageInfo)
						console.log(ps)
						this.axios.get("http://localhost:8088/TSM/bulletinbox",{params:this.pageInfo})
						.then(function(response){
							console.log("2-------------------------------------------")
							console.log(response.data)
							_this.commentsfData=response.data.records
							_this.pageInfo.total=response.data.total
						}).catch(function(error){
							console.log(error)
						})
					}
		},
		created(){
			console.log(this.pageInfo.StaffNames)
			console.log("aaaaaaaaaa")
			var _this=this
			this.axios.get("http://localhost:8088/TSM/bulletinbox"
			                ,{params:this.pageInfo})
			.then(function(response){
			console.log(response.data)
				_this.commentsfData=response.data.records
				_this.pageInfo.total=response.data.total
				
			}).catch(function(error){
				console.log(error)
			})
							
		}
	}
</script>

<style>
</style>
