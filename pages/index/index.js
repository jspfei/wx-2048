//index.js
//获取应用实例
const app = getApp()

var config ={
  data: {
     disable:false,
     gameList:['2048']
  },
  
  onLoad: function () {
     
  },
  
}
config.data.gameList.forEach(function(v){
  config['start'+v] = function(){
     config.data.disable = true;
     wx.navigateTo({
       url: '../'+v+'/'+v
     })
  }
})
Page(config)
