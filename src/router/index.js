import {
	createRouter,
	createWebHashHistory,
	createWebHistory
} from "vue-router"
import login from '../login/login.vue'
import home from '../home/home.vue'
import workbench from '../home/workbench.vue'
import recruit from '../home/recruit.vue'
import administration from '../home/administration.vue'
import educational from '../home/educational.vue'
import personal from '../home/personal.vue'
import Refund from '../finance/Refund.vue'
import paymoney from '../finance/payMoney.vue'
import expenditure from '../finance/expenditure.vue'
import news from '../home/news.vue'
import system from '../home/system.vue'
const routes = [{
		path: '/',
		name: 'login',
		component: login
	},
	{
		path: '/home',
		name: 'home',
		component: home,
		children: [{
				path: '/workbench',
				name: 'workbech',
				component: workbench
			},
			{
				path: '/recruit',
				name: 'recruit',
				component: recruit
			},
			{
				path: '/administration',
				name: 'administration',
				component: administration
			},
			{
				path: '/educational',
				name: 'educational',
				component: educational
			},
			{
				path: '/personal',
				name: 'personal',
				component: personal
			},
			{
				path: '/Refund',
				name: 'Refund',
				component: Refund,
			},
			{
				path: '/paymoney',
				name: 'paymoney',
				component: paymoney
			},
			{
				path:'/expenditure',
				name:'expenditure',
				component:expenditure
			},
			
			{
				path: '/news',
				name: 'news',
				component: news
			},
			{
				path: '/system',
				name: 'system',
				component: system
			}
		]
	},
]




const router = createRouter({
	history: createWebHistory(),
	routes

})

router.beforeEach((to, from, next) => {
	if (to.name === 'login') {
		next();
	} else if (sessionStorage.getItem("isLogin") === "true") {
		next();
	} else {
		next("/");
	}
})

export default router
