<template>
	快速检索:<select v-model="pageInfo.js" class="c">
		<option value="标题">标题</option>
		<option value="接收人">接收人</option>
	</select>
	<span class="drafts">
	<el-input style="width:200px;height:auto;" v-model="inputs"  :placeholder="a+this.pageInfo.js+b" clearable/>
	<el-button @click="ksjs(inputs)">搜索</el-button>
	</span>
	
	<div class="e">
		<el-button style="background-color: blue;color: white;" :icon="CircleCloseFilled" @click="deleteFileOrDirectory(cgxsz)" :disabled="this.cgxsz.length === 0"><el-icon><delete-filled /></el-icon>删除</el-button>
	</div>
	<el-table border ref="mt" :data="draftData" style="width: 100%"  @selection-change="cgxszchange" :row-class-name="tableRowClassName">
		<el-table-column type="selection" width="55" ></el-table-column>                                                                 
		
		<el-table-column label="标题" width="300" >
			<template #default="scope">
				<span class="a" @click="zxyj(scope.row)">{{scope.row.draftTitle}}</span>
			</template>
		</el-table-column>
	
		<el-table-column prop="staffName2" label="接收人"  width="160"></el-table-column>
		
		<el-table-column prop="draftDate" label="草稿日期" show-overflow-tooltip ></el-table-column>
	
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
	import {
			defineComponent,
			ref
		} from 'vue'
		import qs from 'qs'
	export default{
		data(){
			return{
				cgxsz:[],
				a:"根据",
				b:"查询",
				inputs:"",
				draftData:[],
				pageInfo:{
					currentPage:1,
					pagesize:3,
					total:0,
					js:"标题",		
					input:"",
					StaffNames:sessionStorage.getItem("staffName")
				}
			}
		},
		methods:{
			zxyj(row){       //将草稿内容保存进sessionStorage
				sessionStorage.setItem("draftId",row.draftId),
				sessionStorage.setItem("draftTitle",row.draftTitle),
				sessionStorage.setItem("draftContent",row.draftContent),
				sessionStorage.setItem("staffName2",row.staffName2),
				sessionStorage.setItem("qkcs","cg"),
				
			this.$router.replace("/draftscontent");
			},
			handeDel(row){
						let _this=this
							this.axios.post("http://localhost:8088/TSM/draft/delectdraft",
							{
								draftId:row.draftId,
								
							})
							.then(res=>{
								console.log("bianhaobianhao")
								
							_this.creat()
							
							}).catch(function(error){
								console.log(error)
							})
							
					},creat(){
									
						var _this=this
						this.axios.get("http://localhost:8088/TSM/draft/Draft"
						                ,{params:this.pageInfo})
						.then(function(response){
							console.log(response.data)
							_this.draftData=response.data.records
							_this.pageInfo.total=response.data.total
						}).catch(function(error){
							console.log(error)
						})
					},
					deleteFileOrDirectory(cgxsz){
						for(var i=0;i<cgxsz.length;i++){
							this.handeDel(cgxsz[i])
						}
					},
					cgxszchange(cgxsz){
						this.cgxsz=cgxsz
					},
				tableRowClassName({row, rowIndex}){
					if(rowIndex%2===0){
						return  'gray';
					}
					return '';
				},
					
			ksjs(inputs){
					
				this.pageInfo.input=inputs
				
				var _this=this
				this.axios.get("http://localhost:8088/TSM/draft/Draft"
				                ,{params:this.pageInfo})
				.then(function(response){
					console.log(response.data)
					_this.draftData=response.data.records
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
					this.axios.get("http://localhost:8088/TSM/draft/Draft",{params:this.pageInfo})
					.then(function(response){
						console.log("1-------------------------------------------")
						console.log(response.data)
						_this.draftData=response.data.records
					}).catch(function(error){
						console.log(error)
					})
				},
				handleSizeChange(size){
					var _this=this
					this.pageInfo.pagesize=size
					var ps=qs.stringify(this.pageInfo)
					console.log(ps)
					this.axios.get("http://localhost:8088/TSM/draft/Draft",{params:this.pageInfo})
					.then(function(response){
						console.log("2-------------------------------------------")
						console.log(response.data)
						_this.draftData=response.data.records
						_this.pageInfo.total=response.data.total
					}).catch(function(error){
						console.log(error)
					})
				}
		},
		created(){
				
				console.log("aaaaaaaaaa")
				var _this=this
				this.axios.get("http://localhost:8088/TSM/draft/Draft"
				                ,{params:this.pageInfo})
				.then(function(response){
				console.log(response.data)
					_this.draftData=response.data.records
					_this.pageInfo.total=response.data.total
					
				}).catch(function(error){
					console.log(error)
				})
			
			
		}
		
	}
</script>

<style>
	.drafts .el-input .el-input__inner {
	  height: 30px;
	
	}
</style>
