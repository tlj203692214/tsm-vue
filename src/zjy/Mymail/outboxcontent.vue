<template>
	<div>
	<div style="border: solid 1px white;background-color: #e1fff7;border-width: 100%;height:40px;">
	
		<el-button style="background-color: #0000FF;color: aliceblue;" @click="scf()">删除</el-button>
		<el-button style="background-color: #0000FF;color: aliceblue;" @click="fhf()">返回</el-button>
	</div>
	<div class="inbox">
		<p>邮件标题：{{title}}</p>
		<p>收件人：{{staffName2}}</p>
		<p>发件人：{{staffName1}}<span style="padding-left: 40%;">发件时间:{{sendDate}}</span></p>
		<p><span style="font-size: 20px;">发件内容:</span><span style="font-size: 50px;">{{sendContent}}</span></p>
	</div>
	</div>
	<el-table  border ref="mt" :data="sandrData" style="width: 100%;">
		<el-table-column type="selection" width="55" ></el-table-column>
		<el-table-column  label="收件人" width="300" prop="staffName2">
		
		</el-table-column>
	
	
		<el-table-column prop="sandrState" label="阅读状态"  width="160"></el-table-column>
		
		<el-table-column prop="sandrDate" label="阅读日期" show-overflow-tooltip ></el-table-column>
		
	</el-table>
</template>

<script>
	export default{
		data(){
			return{	
				staffName:sessionStorage.getItem("staffName"),
				qkcs:"",
				id:"",
				title:"",
				staffName1:"",
				staffName2:"",
				receivingDate:"",
				receivingContent:"",
				sendDate:"",
				sendContent:"",
				a:"none",
				b:"none",
				sandrData:[]
			}
		},
		methods:{
			fhf(){
				sessionStorage.setItem("activeName",'1')
				this.$router.replace("/mymail");
			
			},
			scf(){
				
			
				let _this=this
					this.axios.post("http://localhost:8088/TSM/send/delectsend",
					{
						sendId:this.id,
						
					})
					.then(res=>{
						console.log("bianhaobianhao")
						
				sessionStorage.setItem("activeName",'1')
				_this.$router.replace("/mymail");
					
					}).catch(function(error){
						console.log(error)
					})
					
			}
		},
		created(){
			console.log("shabi")
			  this.id=sessionStorage.getItem("id")
			this.title=sessionStorage.getItem("title")
			this.staffName1=sessionStorage.getItem("staffName1"),
			this.staffName2=sessionStorage.getItem("staffName2"),
	
			this.sendDate=sessionStorage.getItem("sendDate"),
			this.sendContent=sessionStorage.getItem("sendContent")
	      let _this=this
	       			
	       this.axios.post("http://localhost:8088/TSM/sendAndReceiving/findsandr/"+this.id)
	         
			 .then(res=>{
	       		console.log(res)
	       	console.log(res.data)
	       	_this.sandrData=res.data
	       	
	       	
	       })
		
	
		}
		}
</script>

<style>
</style>
