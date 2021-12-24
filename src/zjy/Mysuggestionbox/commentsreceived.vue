<template>
	<div style="margin-top:2%;" class="diva">
	<div class="b">
	快速检索:<select v-model="pageInfo.js" class="c">
		<option value="待回复的意见"><el-icon><delete-filled /></el-icon>待回复的意见</option>
		<option value="已回复的意见"><el-icon><delete-filled /></el-icon>已回复的意见</option>
	</select>
	<el-input style="width:200px;" v-model="pageInfo.input" :placeholder="'根据'+this.pageInfo.js+'查询'" clearable />
	<el-button @click="this.creat()"><el-icon><search /></el-icon>搜索</el-button>
	</div>
	</div>
	<el-table border ref="mt" :data="commentsData" style="width: 100%"  @selection-change="sjxszchange" :row-class-name="tableRowClassName">
		<el-table-column type="selection" width="55" ></el-table-column>                                                                 
		
		<el-table-column    prop="opinionTitle"  label="意见标题" width="320"></el-table-column>
		<!-- <el-table-column   v-else prop="receivingsState"  label="状态" width="120"> -->
			
		<!-- </el-table-column> -->
		
		<el-table-column prop="suggestionsId" label="意见箱" width="150" ></el-table-column>
	
		<el-table-column prop="publisher" label="发表人"  width="160"></el-table-column>
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
</template>

<script>
	export default{
		data(){
			return{
				commentsData:[],
				pageInfo:{
					currentPage:1,
					pagesize:3,
					total:0,
					js:"待回复的意见",
					zt:"a",
					input:""
				}
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
							_this.commentsData=response.data.records
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
							_this.commentsData=response.data.records
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
				_this.commentsData=response.data.records
				_this.pageInfo.total=response.data.total
				
			}).catch(function(error){
				console.log(error)
			})
							
		}
	}
</script>

<style>
</style>
