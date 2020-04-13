// 导入axios 
import axios from 'axios'
// 封装axios代码
/* get请求 */
function hickyGet (url,params={}){
    return new Promise((resolve,reject)=>{
        axios({
            method: 'GET',
            url,
            params
        }).then((res)=>{
            resolve(res)
        }).catch((error)=>{
            reject(error)
        })
    })
}

// post请求
function hickyPost(url,data={}){
    return new Promise((resolve,reject)=>{
        axios({
            method: 'POST',
            url,
            data
        }).then((res)=>{
            resolve(res)
        }).catch((error)=>{
            reject(error)
        })
    })
}

// 暴露出去
export  {hickyGet,hickyPost} 