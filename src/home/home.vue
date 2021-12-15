<template>
	<div>
		<div class="box-header">
			<tou></tou>
		</div>
		<el-container>
		<el-aside :width="iscollapse ? '64px' :'200px' ">
			<div class="toggle-button" @click="toggleCollapse">|||</div>
			<el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
				default-active="2" text-color="#fff" :unique-opened="true" :collapse="iscollapse" :collapse-transition="false">
					
					<el-menu-item index="1">
						<img src="../assets/img/工作台.png">
						<span><router-link to='workbench'>工作台</router-link></span>
					</el-menu-item>
		
					<el-sub-menu index="2">
						<template #title>
							<img src="../assets/img/招生管理.png">
							<span><router-link to="recruit">招生管理</router-link></span>
						</template>
						<el-menu-item index="2-1">item one</el-menu-item>
						<el-menu-item index="2-1-1">item two</el-menu-item>
						<el-sub-menu index="2-1">
							<template #title>item three</template>
							<el-menu-item index="2-1-1">item one</el-menu-item>
						</el-sub-menu>
					</el-sub-menu>
		
					<el-sub-menu index="3">
						<template #title>
							<img src="../assets/img/xingzhengguanli.png">
							<span><router-link to="administration">行政管理</router-link></span>
						</template>
						<el-menu-item index="3-1">item one</el-menu-item>
					</el-sub-menu>
		
		
					<el-sub-menu index="4">
						<template #title>
							<img src="../assets/img/jiaowuguanli.png">
							<span><router-link to="educational">教务管理</router-link></span>
						</template>
						<el-menu-item index="4-1">item one</el-menu-item>
					</el-sub-menu>
		
					<el-sub-menu index="5">
						<template #title>
							<img src="../assets/img/个人管理.png">
							<span><router-link to="personal">个人管理</router-link></span>
						</template>
						<el-menu-item index="5-1">item one</el-menu-item>
					</el-sub-menu>
		
					<el-sub-menu index="6">
						<template #title>
							<img src="../assets/img/caiwuguanli.png">
							<span>财务管理</span>
						</template>
						<el-menu-item index="6-1"><router-link to="paymoney">报班缴费管理</router-link></el-menu-item>
						<el-menu-item index="6-2"><router-link to="Refund">学员退费管理</router-link></el-menu-item>
						<el-menu-item index="6-2"><router-link to="expenditure">校务支出管理</router-link></el-menu-item>
					</el-sub-menu>
		
					<el-sub-menu index="7">
						<template #title>
							<img src="../assets/img/xiaoxiguanli.png">
							<span><router-link to="news">消息管理</router-link></span>
						</template>
						<el-menu-item index="7-1">item one</el-menu-item>
					</el-sub-menu>
		
					<el-sub-menu index="8">
						<template #title>
							<img src="../assets/img/xitongguanli.png">
							<span><router-link to="system">系统管理</router-link></span>
						</template>
						<el-menu-item index="8-1">item one</el-menu-item>
					</el-sub-menu>
		
		
				</el-menu>
		</el-aside>
		<el-main><router-view></router-view></el-main>
		</el-container>
	</div>
</template>

<script setup>
import tou from '../components/header.vue'
</script>

<script type="text/javascript">
	export default{
		data(){
			return{
				//是否折叠
				iscollapse:false
			}
		},methods:{
			//点击按钮，切换菜单的折叠与展开
			toggleCollapse(){
				this.iscollapse = !this.iscollapse
			}
		}
	}
</script>




<style>
	* {
		margin: 0;
		padding: 0;
	}
	a{
		text-decoration: none;
		color: #fff;
	}

	.box-header {
		width: 100%;
		height: 60px;
		line-height: 60px;
		background-color: #b3c0d1;
	}

	.el-aside {
		/* width: 200px; */
		min-height: 666px;
		background-color: #545c64;
		.el-menu{
			/* height: 664px; */
			border-right: none;
		}
	}
	.el-main{
		background-color: #FFF;
		color: #000000;
		font-size: 16px;
	}
	
	.el-menu img {
		width: 32px;
		height: 32px;
		margin-right: 10px;
	}
	
	.toggle-button{
		background-color: #4A5064;
		text-align: center;
		color: #fff;
		font-size: 10px;
		line-height: 24px;
		letter-spacing: 0.2em;
		cursor: pointer;
		position: relative;
		z-index: 1000;
	}
</style>
