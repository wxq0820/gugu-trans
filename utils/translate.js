import md5 from './md5.min.js'

const appid='20200817000545222'
const key='SAFZgfRJApaPqCsdUCUv'

function translate(q,{from = 'auto',to = 'auto'} = {from:'auto',to:'auto'}){
    return new Promise(function(resolve,reject){

        let salt = Date.now()
        let sign = md5(`${appid}${q}${salt}${key}`)

        wx.request({
          url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
          data: {
              q,
              from,
              to,
              appid,
              salt,
              sign
          },
          success: function(res){
              if(res.data && res.data.trans_result){
                  resolve(res.data)
              }else{
                  reject({state:'error',msg:'翻译失败'})
                  wx.showToast({
                    title: '翻译失败',
                    icon: 'none',
                    duration: 3000
                  })
              }
          },
          fail: function(){
              reject({state: 'error',msg: '翻译失败'})
              wx.showToast({
                title: '网络异常',
                icon: 'none',
                duration: 3000
              })
          }
        })
    })
}
module.exports.translate = translate