<template>
  <el-tabs type="card" @tab-click="handleClick" v-model="activeNamec" >
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
      activeNamec:sessionStorage.getItem("activeNamec"),
    }
  },
  methods: {
    handleClick(tab, event) {
 
	 
	  if(this.activeNamec=='0'){
		  sessionStorage.setItem("activeNamec",'0')
		  this.$router.push("/commentsreceived")
		  
	  }else{
		  sessionStorage.setItem("activeNamec",'1')
		  this.$router.push("/commentsissued")
	  }
    }
  },
  created(){	
	 
	if(this.activeNamec==null){
		this.activeNamec='0'
		sessionStorage.setItem("activeNamec",'0')
	}
  this.handleClick()
	  	 
  }
}
</script>




<style>
</style>
