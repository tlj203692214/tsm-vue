<template>
  <el-tabs type="card" @tab-click="handleClick" v-model="activeName" >
    <el-tab-pane label="收件箱">
</el-tab-pane>
    <el-tab-pane label="发件箱">
</el-tab-pane>
    <el-tab-pane label="草稿箱">
</el-tab-pane>
    <el-tab-pane label="撰写邮件">
</el-tab-pane>
  </el-tabs>
  <router-view></router-view>
  
</template>
<script lang="ts">
export default {
  data() {
    return {
      activeName:sessionStorage.getItem("activeName"),
    }
  },
  methods: {
    handleClick(tab, event) {
 
	  console.log(this.activeName)
	  if(this.activeName=='0'){
		  sessionStorage.setItem("activeName",'0')
		  this.$router.push("/Inbox")
		  
	  }else if(this.activeName=='1'){
		  sessionStorage.setItem("activeName",'1')
		  this.$router.push("/outbox")
	  }else if(this.activeName=='2'){
		  sessionStorage.setItem("activeName",'2')
		  this.$router.push("/drafts")
	  }else{
		  sessionStorage.setItem("activeName",'3')
		    this.$router.push("/composemail")
	  }
    },
  },
  created(){	
	 console.log("sssss+sssSdsds"+this.activeName)
	if(this.activeName==null){
		this.activeName='0'
		sessionStorage.setItem("activeName",'0')
	}
  
	  	 this.handleClick()
		
  }
}
</script>




<style>
</style>
