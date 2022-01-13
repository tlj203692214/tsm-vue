import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

/**
 *以下代码为2021年12月13日最新加入代码，主要是解决最新
 *版本的icons导入问题。注：el官方目前尚在不断升级，
 *暂无统一导出，只能单独注册组件，该形式为自行拓展
 **/
//element-plus最新版本导入，该版本支持vue3
import 'element-plus/dist/index.css'
// 统一导入el-icon图标
import * as ElIcons from '@element-plus/icons-vue'
const app = createApp(App).use(ElementPlus).use(router).use(VueAxios, axios)
    // 统一注册el-icon图标
for (let iconName in ElIcons) {
    app.component(iconName, ElIcons[iconName])
}
/**以上代码为最新代码**/
app.mount('#app')