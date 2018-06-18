import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.css'
import './assets/js/flexible.js'
import router from './router'
import store from './store/index'
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  store,
  template:'<App />',
  components:{
    App
  },
  data:{
    eventHub:new Vue()
  }
})
//导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path=='/person'||to.path=='/recharge'){
    if(store.state.isLogin){
      next()
    }else{
      router.push('/login')
    }
  }else{
    next()
  }
})
//自动登录
let account=sessionStorage.getItem('account')||localStorage.getItem('account')
if(account!==null){
  console.log(new Date().toLocaleTimeString())
    store.dispatch('login',{name:account,time:new Date().toLocaleTimeString()});
}