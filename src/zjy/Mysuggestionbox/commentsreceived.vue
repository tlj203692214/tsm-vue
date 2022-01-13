<template>
	<div style="margin-top:2%;" class="diva">
	<div class="b">
	快速检索:<select v-model="pageInfo.zt" class="c" @change="creat">
		<option value="待回复的意见"><el-icon><delete-filled /></el-icon>待回复的意见</option>
		<option value="已回复的意见"><el-icon><delete-filled /></el-icon>已回复的意见</option>
	</select>
	
	</div>
	</div>
	<el-table border ref="mt" :data="commentsfData"  style="width: 100%"  @selection-change="sjxszchange" :row-class-name="tableRowClassName">
		<el-table-column type="selection" width="55" ></el-table-column>                                                                 
		
		<el-table-column    prop="opinionTitle"  label="意见标题" width="320">
			<template #default="scope">
					<span class="a" @click="cknr(scope.row),xxjm=true">{{scope.row.opinionTitle}}</span>
			</template>
		</el-table-column>
	
		
		<el-table-column prop="suggestionsId" label="意见箱" width="150" >
			<template #default="scope">
			<span v-for="suggestionsDatas in suggestionsDatas">
				<span v-if="scope.row.suggestionsId==suggestionsDatas.suggestionsId">{{suggestionsDatas.suggestionsName}}</span>
			</span>
			</template>
		</el-table-column>
	
		<el-table-column prop="publisher" label="发表人"  width="100"></el-table-column>
		<el-table-column prop="publicationTime" label="发表时间"  width="200"></el-table-column>
		<el-table-column prop="respondent" label="回复人"  width="100"></el-table-column>
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
	  <!-- 回复界面-->
	  <el-dialog v-model="xxjm" title="编辑意见" width="55%" :show-close="false">
		  <div class="yjxx" style="background-color:lightblue">
			  	<div :style="{display:b}" style="float:left;margin-right:5px;">
		  	<el-button  type="primary" style="background-color: blue;color: white;" :icon="CircleCloseFilled" size="mini"  @click="replyOpinion('ruleForm')"><el-icon><edit /></el-icon>确定回复</el-button>
			</div>
		  	<el-button style="background-color: blue;color: white;" :icon="CircleCloseFilled" size="mini"  @click="gbjm('ruleForm')"><el-icon><delete-filled /></el-icon>关闭</el-button>
		  </div>
		  <el-form ref="ruleForm"  class="demo-ruleForm" :model="xx" :rules="rules">
	  	意见信息
	  	<div class="yjxx" style="border:1px solid;height:30%">
	  		<div style="margin:10px">
				<p>意见标题：{{this.xx.opinionTitle}}</p>
				<p><span>发表人：{{this.xx.publisher}}</span><span style="margin-left:50%">发表时间：{{this.xx.publicationTime}}</span></p>		
				<p>
					内容:<div style="margin: -8px 40px 0px;font-size:20px;height:30%">{{this.xx.opinionContent}}
						</div>
					
				</p>
			</div>
		</div>
		
	 
	  	回复信息
	  	<div class="yjxx" style="border:1px solid;height:20%">
			<el-form-item label="回复内容:" prop="replyContent">
	  		<p><el-input 
			            :disabled=a
					    v-model="this.xx.replyContent"
					    type="textarea"
						></el-input></p>
	  		
	  		</el-form-item>
	  	</div>
			
		</el-form>
	  </el-dialog>
</template>

<script>
	import {
			defineComponent,
			ref,
			onMounted
		} from 'vue'
		import qs from 'qs'
		import { ElMessage } from 'element-plus'
	export default{
		data(){
			return{
				a:"",
				b:"",
				staffName:sessionStorage.getItem("staffName"),
			    xxjm:ref(false),
				staffData:[],//员工集合
				suggestionsDatas:[],//所有意见集合
				commentsfData:[],
				pageInfo:{
					currentPage:1,
					pagesize:3,
					total:0,
					zt:"待回复的意见",
					staffId:sessionStorage.getItem("staffId"),
				},
				xx:{
					suggestionsId:"", //管理员
					staffId:"",//管理员
					opinionId:"",//意见编号
					opinionTitle:"",  //意见标题
					opinionContent:"",//意见内容
					publisher:"",//发表人
					publicationTime:"", //发表时间
					replyContent:"",//回复内容
					replyTime:""   //回复时间
				},
				rules: {
					replyContent: [{
						required: true,
						message: '回复内容不能为空！',
						trigger: 'blur'
					}]
				}
			}
		},
		methods:{
			gbjm(formName){
				this.$refs[formName].resetFields()
				this.xxjm=false
			},
			replyOpinion(formName) {    //回复意见
							let _this=this
							
							
							this.$refs[formName].validate((valid) => {
								if (valid) {
			
			this.axios.post('http://localhost:8088/TSM/opinion/replyOpinion', {
				opinionId:this.xx.opinionId,
				staffId:this.xx.staffId,
				suggestionsId:this.xx.suggestionsId,
				respondent:this.staffName,
				replyContent:this.xx.replyContent,
				})
				.then((response) => {
					this.$refs[formName].resetFields()
				this.xxjm=false
				this.creat();
			ElMessage({message: '回复成功！',type: 'success',})
					
				}).catch(function(error) {
					console.log(error)
				})
								} else {
									ElMessage({message: '回复内容为必填项！',type: 'warning',})
									
									return false
								}
							})
						},
			cknr(row){   //查看意见内容
				this.xx.suggestionsId=row.suggestionsId,
			    this.xx.staffId=row.staffId,
				this.xx.opinionId=row.opinionId,
				this.xx.opinionTitle=row.opinionTitle,
				this.xx.opinionContent=row.opinionContent,
				this.xx.publisher=row.publisher,
				this.xx.publicationTime=row.publicationTime,
				this.xx.respondent=row.respondent,
				this.xx.replyContent=row.replyContent
				if (this.xx.replyContent == null){
					this.a="true";
				
						this.b="";
				}else{
					this.a="disabled";
					this.b="none";
				}
				this.xx.replyTime=row.replyTime
			},
			selectsuggestionss(){   //查询所有意见箱
				let _this=this
									
				this.axios.post("http://localhost:8088/TSM/suggestions/selectSuggestionss"
				)
				  .then(res=>{
						console.log(res)
					console.log(res.data)
					_this.suggestionsDatas=res.data
				})
			},
			creat(){
				let _this=this
				
				this.axios.get("http://localhost:8088/TSM/opinion/selectOpinion"
				                ,{params:this.pageInfo})
				.then(function(response){
				console.log(response.data)
					_this.commentsfData=response.data.records
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
						this.axios.get("http://localhost:8088/TSM/opinion/selectOpinion",{params:this.pageInfo})
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
						this.axios.get("http://localhost:8088/TSM/opinion/selectOpinion",{params:this.pageInfo})
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
			this.selectsuggestionss();
			
			var _this=this
			this.axios.get("http://localhost:8088/TSM/opinion/selectOpinion"
			                ,{params:this.pageInfo})
			.then(function(response){
			console.log(response.data+"ssssss")
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
