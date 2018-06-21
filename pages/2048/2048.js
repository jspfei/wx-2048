var app = getApp();

 
var GameManager = require('./game_manager.js')
var config = 
{

  /**
   * 页面的初始数据
   */
  data: {
      grids:[],
      over:false,
      win:false,
      score:0,
      highscore:0,
      overMsg:'游戏结束'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GameManager = new GameManager(4);
      var e = this;
      this.setData({
        grids: e.GameManager.setup(),
        highscore:wx.getStorageSync('highscore')|0
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  
  //更新视图数据
  updateView:function(data){
    //游戏结束
    if(data.over){
       data.overMsg = '游戏结束'
    }

    //获胜
    if(data.win){
      data.overMsg ="恭喜"
    }

    this.setData(data);
  },
  //重新开始
  restart:function(){
      this.updateView({
         grids:this.GameManager.restart(),
         over:false,
         won:false,
         score:0
      });
  }, 

  touchStartClientX:0,
  touchStartClientY:0,
  touchEndClientX:0,
  touchEndClientY:0,
  isMultiple:false,

  touchStart:function(events){
     //多指操作
     this.isMultiple = events.touches.length >1;
     if(this.isMultiple){
       return;
     }

     var touch = events.touches[0];
     this.touchStartClientX = touch.clientX;
     this.touchStartClientY = touch.clientY;
     
  },

  touchMove:function(events){
    var touch = events.touches[0];
    this.touchEndClientX = touch.clientX;
    this.touchEndClientY = touch.clientY;
  },

  touchEnd:function(events){
    if(this.isMultiple){
      return;
    }

    var dx = this.touchEndClientX - this.touchStartClientX;
    var absDx = Math.abs(dx);
    var dy = this.touchEndClientY - this.touchStartClientY;
    var absDy = Math.abs(dy);

    if(Math.max(absDx,absDy) > 10){
      var direction = absDx > absDy ? (dx > 0 ? 1 :3):(dy > 0? 2:0);

      var data = this.GameManager.move(direction) || {
        grids: this.data.grids,
        over: this.data.over,
        won: this.data.won,
        score: this.data.score
      };

      var highscore = wx.getStorageSync('highscore') || 0;
      if(data.score > highscore){
        wx.setStorageSync('highscore', data.score);
      }

      this.updateView({
        grids:data.grids,
        over:data.over,
        won:data.won,
        score:data.score,
        highscore:Math.max(highscore,data.score)
      });
    }
  }
}


Page(config)