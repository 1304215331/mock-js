// vuex
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  /* 储存数据 */
    state: {
      count: 0,
      token: '111'
    },
   /* 唯一一个修改state的方法 */
    mutations: {
      increment (state) {
        state.count++
      },
      addToken(state,num){
        state.token = num
      },
      delToken(stare){
        stare.token = ''
      }
    },
    /* 相当于计算属性 */
    getters:{
      setCount(state){
        return `数字${state.count}`
      }
    },
    /* 操作mutations修改state数据 不过是异步的 */
    actions:{
      add(context,payload){
        return new Promise((reslove,reject)=>{
          setTimeout(()=>{
            context.commit('increment',payload)
            reslove()
          },2000)
        })
      }
    },
    modules:{
      /* 用来管理vuex  可以将store模块化  把数据独立出来 */
    }
  })

  export default store