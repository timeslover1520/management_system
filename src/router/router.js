import Vue from "vue"
import VueRouter from 'vue-router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueRouter)
Vue.use(elementUI)

import login from "../views/login.vue"
const route = new VueRouter({
    routes: [{
            path: "/",
            component: login
        },
        {
            path: "/login",
            component: login
        }
    ]
})

export default route