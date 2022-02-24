<template>
	<div style="background-color:white" :style="{display:add}">
		<el-button style="background-color: #f60;color: white;" :icon="CircleCloseFilled" size="mini" @click="addNotepad('ruleForm')"><el-icon><folder-checked /></el-icon>保存并新建</el-button>
		<el-button style="background-color: #f60;color: white;" :icon="CircleCloseFilled" size="mini" @click="addNotepadf('ruleForm')"><el-icon><folder-delete /></el-icon>保存并返回</el-button>
	<el-button style="background-color: #f60;color: white;" :icon="CircleCloseFilled" size="mini"  @click="fh()"><el-icon><d-arrow-left /></el-icon>返回</el-button>
	</div>
	<div style="background-color:white;height:50px;line-height:50px;" :style="{display:update}">
		
		<el-button style="background-color: #f60;color: white;" :icon="CircleCloseFilled" size="mini" @click="updateNotepad('ruleForm')"><el-icon><folder-delete /></el-icon>保存并返回</el-button>
		<el-button style="background-color: #f60;color: white;" :icon="CircleCloseFilled" size="mini" @click="delectNotepad()"><el-icon><delete-filled /></el-icon>删除</el-button>
	<el-button style="background-color: #f60;color: white;" :icon="CircleCloseFilled" size="mini"  @click="fh()"><el-icon><d-arrow-left /></el-icon>返回</el-button>
	</div>	
	<el-form ref="ruleForm"  class="demo-ruleForm" :model="ruleForm" :rules="rules">
	<div style="margin-top:20px" class="notepadTheme">
		<el-form-item label="主题:" style="float: left" prop="notepadTheme">
		
					<el-input v-model="ruleForm.notepadTheme"></el-input> 
		</el-form-item>
		
		</div>
	<div class="notepadType">
		<el-form-item label="类型:" style="float: left" prop="notepadType">
		         <select v-model="ruleForm.notepadType" @change="sszt" class="notepadType" style="margin-right:40px">
		           <option value="0">任务</option>
		           <option value="1">约会</option>
		           <option value="2">来访</option>
				   <option value="3">会议</option>
				   <option value="4">假期</option>
				   <option value="5">外出</option>
				   <option value="6">走访</option>
				   <option value="7">出差</option>
		         </select>
		</el-form-item>
		<el-form-item label="地点:" style="float: left" prop="notepadPlace">
					<el-input v-model="ruleForm.notepadPlace" ></el-input> 
		</el-form-item>
		</div>
	<div class="time">
		<el-form-item label="开始时间:" style="float: left" prop="beginTime" >
		       <el-date-picker
		         v-model="ruleForm.beginTime"
		         type="date"
			value-format="YYYY-MM-DD"
		       >
		       </el-date-picker>
		</el-form-item>
		<el-form-item label="结束时间:" style="float: left" prop="endTime">
		       <el-date-picker
		         v-model="ruleForm.endTime"
		         type="date"
				 value-format="YYYY-MM-DD"
		       >
		       </el-date-picker>
		</el-form-item>
		</div>
		<div class="notepadContent">
		
			<el-form-item label="内容:" style="float: left" prop="notepadContent">
						<el-input v-model="ruleForm.notepadContent"    type="textarea"></el-input> 
			</el-form-item>
			</div>
	</el-form>
	 <div>
	    <el-radio v-model="radio1" label="1" size="large" style="margin-left:20px;color:green">已完成</el-radio>
	    <el-radio v-model="radio1" label="0" size="large" style="margin-left:20px;color:red" >未完成</el-radio>
	  </div>
</template>

<script>
	import { ElMessage } from 'element-plus'
	export default{
		data(){
			return{
				radio1:sessionStorage.getItem("notepadState"),//记事本状态
				add:"",
				update:"",
				ruleForm: {
                      notepadTheme:"", //主题
					  notepadType:"",//类型
					  beginTime:"",//开始时间
					  endTime:"",//结束时间
					  notepadPlace:"",//地点
					  notepadContent:"",//内容
					  staffId:sessionStorage.getItem("staffId")
				},
				rules: {
					notepadTheme: [{
						required: true,
						message: '主题不能为空！',
						trigger: 'blur',
					}],
					notepadType: [{
						required: true,
						message: '类型不能为空！',
						trigger: 'blur',
					}],
					beginTime: [{
						required: true,
						message: '开始时间不能为空！',
						trigger: 'blur',
					}],
					endTime: [{
						required: true,
						message: '结束时间不能为空！',
						trigger: 'blur',
					}],
					notepadPlace: [{
						required: true,
						message: '地点不能为空！',
						trigger: 'blur',
					}],
					notepadContent: [{
						required: true,
						message: '内容不能为空！',
						trigger: 'blur',
					}]
				}
			}
		},
		methods:{
			delectNotepad(){
				this.axios.post('http://localhost:8088/TSM/notepad/delectNotepad', {
					notepadId:sessionStorage.getItem("notepadId"),
					notepadType:this.ruleForm.notepadType,
				    staffId:this.ruleForm.staffId,
					deleted:"1",
					})
					.then((response) => {
					
					
					this.$router.push("notepad")
					ElMessage({message: '删除成功！',type: 'success',})
					this.$router.push("/notepad")	
					}).catch(function(error) {
						console.log(error)
					})
			},
			fh(){   //返回到日历
				this.$router.push("/notepad")
			},
			updateNotepad(formName) {    //修改意见
				
							let _this=this
							this.$refs[formName].validate((valid) => {
								if (valid) {
			 				if(this.ruleForm.beginTime<=this.ruleForm.endTime){
			this.axios.post('http://localhost:8088/TSM/notepad/updateNotepad', {
				notepadId:sessionStorage.getItem("notepadId"),
				notepadTheme:this.ruleForm.notepadTheme,
				notepadType:this.ruleForm.notepadType,
				beginTime:this.ruleForm.beginTime,
				endTime:this.ruleForm.endTime,
			    notepadPlace:this.ruleForm.notepadPlace,
			    notepadContent:this.ruleForm.notepadContent,
			    staffId:this.ruleForm.staffId,
				notepadState:this.radio1,
				})
				.then((response) => {
				this.$refs[formName].resetFields();
				ElMessage({message: '修改成功！',type: 'success',})
				this.$router.push("/notepad")	
				}).catch(function(error) {
					console.log(error)
				})
				}else{
					ElMessage({message: '开始时间不能大于结束时间！',type: 'warning',})
				}
								} else {
									ElMessage({message: '请完善信息！',type: 'warning',})
									
									return false
								}
							})
						},
			addNotepad(formName) {    //新增并新建记事本
		
							let _this=this
							this.$refs[formName].validate((valid) => {
								if (valid) {
				if(this.ruleForm.beginTime<=this.ruleForm.endTime){
			this.axios.post('http://localhost:8088/TSM/notepad/addNotepad', {
				notepadTheme:this.ruleForm.notepadTheme,
				notepadType:this.ruleForm.notepadType,
				beginTime:this.ruleForm.beginTime,
				endTime:this.ruleForm.endTime,
			notepadPlace:this.ruleForm.notepadPlace,
			notepadContent:this.ruleForm.notepadContent,
			staffId:this.ruleForm.staffId,
				})
				.then((response) => {
				this.$refs[formName].resetFields();
				
				
		ElMessage({message: '新增成功！',type: 'success',})
					
				}).catch(function(error) {
					console.log(error)
				})
				}else{
					ElMessage({message: '开始时间不能大于结束时间！',type: 'warning',})
				}
								} else {
									ElMessage({message: '请完善信息！',type: 'warning',})
									
									return false
								}
							})
						},
						addNotepadf(formName) {    //新增意见并返回记事本
					        
										let _this=this
										this.$refs[formName].validate((valid) => {
											if (valid) {
						if(this.ruleForm.beginTime<=this.ruleForm.endTime){
						this.axios.post('http://localhost:8088/TSM/notepad/addNotepad', {
							notepadTheme:this.ruleForm.notepadTheme,
							notepadType:this.ruleForm.notepadType,
							beginTime:this.ruleForm.beginTime,
							endTime:this.ruleForm.endTime,
						    notepadPlace:this.ruleForm.notepadPlace,
						    notepadContent:this.ruleForm.notepadContent,
						    staffId:this.ruleForm.staffId,
							})
							.then((response) => {
							this.$refs[formName].resetFields();
							
							this.$router.push("notepad")
							ElMessage({message: '新增成功！',type: 'success',})
								
							}).catch(function(error) {
								console.log(error)
							})
							}else{
								ElMessage({message: '开始时间不能大于结束时间！',type: 'warning',})
							}
											} else {
											ElMessage({message: '请完善信息！',type: 'warning',})
												
												return false
											}
										})
									}
		},
		created(){
			if(sessionStorage.getItem("notepad")=="update"){
				this.ruleForm.notepadTheme=sessionStorage.getItem("notepadTheme"),
				this.ruleForm.notepadType=sessionStorage.getItem("notepadType"),
				this.ruleForm.notepadPlace=sessionStorage.getItem("notepadPlace"),
				this.ruleForm.beginTime=sessionStorage.getItem("beginTime"),
				this.ruleForm.endTime=sessionStorage.getItem("endTime"),
				this.ruleForm.notepadContent=sessionStorage.getItem("notepadContent"),
				this.update="true",
				this.add="none"
			}else{
				this.ruleForm.beginTime=sessionStorage.getItem("beginTime"),
				this.add="true",
				this.update="none"
			}
		}
	}
</script>

<style>
	
	.notepadTheme .el-input .el-input__inner{
		height:30px;
		width:1200px;
	}
	.notepadType .notepadType {
	  width: 500px;
	  height: 30px;
	}
	.notepadType .el-input .el-input__inner {
	  width: 607px;
	  height: 30px;
	}
	.time .el-input__inner{
		width:600px;
		height:30px;
	}
	.notepadContent .el-textarea .el-textarea__inner{
		width:1000px;
		height:80px;
	}
</style>
