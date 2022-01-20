<template>
	<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
	  <el-tab-pane label="员工请假"></el-tab-pane>
	  <el-tab-pane label="员工出差"></el-tab-pane>
	  <el-tab-pane label="Role">Role</el-tab-pane>
	  <el-tab-pane label="Task">Task</el-tab-pane>
	</el-tabs>  
	<router-view></router-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
</script>
<script lang="ts">
	import qs from 'qs'
	export default{
		data() {
			return {
				activeName:0
			}
		},
		methods:{
			handleClick(teb,event){
				if(this.activeName=='0'){
					
					this.$router.push("/staffleave")
				}else if(this.activeName=='1'){
					// sessionStorage.setItem("activeName","1")
					this.$router.push("/business")
				}
			}
		},
		created(){
			this.handleClick()
		}
	}
</script>

<style>
</style>
