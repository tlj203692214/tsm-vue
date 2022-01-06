import {
    createRouter,
    createWebHashHistory,
    createWebHistory
} from "vue-router"
import login from '../login/login.vue'
import home from '../home/home.vue'
import workbench from '../home/workbench.vue'
import Refund from '../finance/Refund.vue'
import paymoney from '../finance/payMoney.vue'
import expenditure from '../finance/expenditure.vue'
import income from '../finance/income.vue'
import users from '../home/userManage.vue'
import position from '../home/roleManage.vue'
import menu from '../home/menuManage.vue'


import admin from '../cyj/admin.vue'
import dept from '../cyj/dept.vue'
import stafffiles from '../cyj/stafffiles.vue'
import staffsign from '../cyj/staffsign.vue'

import shitu from '../pzw/recruit/shitu.vue'
import course from '../pzw/educational/course.vue'
import kebiao from '../pzw/educational/kebiao.vue'
import qudao from '../pzw/recruit/qudao.vue'

import mymail from '../zjy/Mymail/mymail.vue'
import composemail from '../zjy/Mymail/composemail.vue'
import drafts from '../zjy/Mymail/drafts.vue'
import Inbox from '../zjy/Mymail/Inbox.vue'
import outbox from '../zjy/Mymail/outbox.vue'
import Inboxcontent from '../zjy/Mymail/Inboxcontent.vue'
import outboxcontent from '../zjy/Mymail/outboxcontent.vue'
import draftscontent from '../zjy/Mymail/draftscontent.vue'
import bulletinbox from '../zjy/Messagemanagement/bulletinbox.vue'
import suggestions from '../zjy/Messagemanagement/suggestions.vue'
import comments from '../zjy/Mysuggestionbox/comments.vue'
import commentsreceived from '../zjy/Mysuggestionbox/commentsreceived.vue'
import commentsissued from '../zjy/Mysuggestionbox/commentsissued.vue'
import notepad from '../zjy/Notepad/notepad.vue'
import addnotepad from '../zjy/Notepad/addnotepad.vue'
const routes = [{
        path: '/',
        name: 'login',
        component: login
    },
    {
        path: "/outlogin",
        name: 'outlogin',
        component: () =>
            import ("../login/login.vue")
    },
    {
        path: '/home',
        name: 'home',
        component: home,
        children: [{
                path: '/workbench',
                name: 'workbench',
                component: workbench
            },
            {
                path: '/users',
                name: 'users',
                component: users
            },
            {
                path: '/position',
                name: 'position',
                component: position
            },
            {
                path: '/menu',
                name: 'menu',
                component: menu
            },
            {
                path: '/refund',
                name: 'refund',
                component: Refund,
            },
            {
                path: '/paymoney',
                name: 'paymoney',
                component: paymoney
            },
            {
                path: '/expenditure',
                name: 'expenditure',
                component: expenditure
            },
            {
                path: '/income',
                name: 'income',
                component: income
            },
            {
                path: '/shitu',
                name: 'shitu',
                component: shitu
            },
            {
                path: '/course',
                name: 'course',
                component: course
            },
            {
                path: '/channel',
                name: 'channel',
                component: qudao
            },
            {
                path: '/Timetable',
                name: 'Timetable',
                component: kebiao
            },
            {
                path: '/admin',
                name: 'admin',
                component: admin
            },
            {
                path: '/dept',
                name: 'dept',
                component: dept
            },
            {
                path: '/stafffiles',
                name: 'stafffiles',
                component: stafffiles
            },
            {
                path: '/staffsign',
                name: 'staffsign',
                component: staffsign
            },
            {
                path: '/mymail',
                name: 'mymail',
                component: mymail,
                children: [{
                        path: '/Inbox',
                        name: "Inbox",
                        component: Inbox
                    },
                    {
                        path: '/outbox',
                        name: "outbox",
                        component: outbox
                    },
                    {
                        path: '/drafts',
                        name: 'drafts',
                        component: drafts,
                    },
                    {
                        path: '/composemail',
                        name: 'composemail',
                        component: composemail
                    }
                ]
            },
            {
                path: '/Inboxcontent',
                name: 'Inboxcontent',
                component: Inboxcontent
            },
            {
                path: '/outboxcontent',
                name: 'outboxcontent',
                component: outboxcontent
            },
            {
                path: '/draftscontent',
                name: 'draftscontent',
                component: draftscontent
            },
            {
                path: '/bulletinbox',
                name: 'bulletinbox',
                component: bulletinbox
            },
            {
                path: '/suggestions',
                name: 'suggestions',
                component: suggestions
            },
            {
                path: '/comments',
                name: 'comments',
                component: comments,
                children: [{
                        path: '/commentsreceived',
                        name: 'commentsreceived',
                        component: commentsreceived
                    },
                    {
                        path: '/commentsissued',
                        name: 'commentsissued',
                        component: commentsissued
                    }
                ]
            },
            {
                path: '/notepad',
                name: 'notepad',
                component: notepad
            },
            {
                path: '/addnotepad',
                name: 'addnotepad',
                component: addnotepad
            }


        ]
    },
]




const router = createRouter({
    history: createWebHistory(),
    routes

})

// router.beforeEach((to, from, next) => {
//     if (to.name === 'login') {
//         next();
//     } else if (sessionStorage.getItem("isLogin") === "true") {
//         next();
//     } else {
//         next("/");
//     }
// })

export default router