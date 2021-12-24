<template>
  <el-tabs type="card" @tab-click="handleClick" v-model="activeName" >
    <el-tab-pane label="收到的意见">
</el-tab-pane>
    <el-tab-pane label="发出的意见">
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
		  this.$router.push("/commentsreceived")
		  
	  }else{
		  sessionStorage.setItem("activeName",'1')
		  this.$router.push("/commentsissued")
	  }
    }
  },
  created(){	
	  console.log("dassadadasdasa"+sessionStorage.getItem("activeName"))
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
