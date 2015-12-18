window.onload = function (){
  new initPage();
}

var initPage = function (){
  this.win = window;
  this.start = document.getElementById('begin');
  this.stop = document.getElementById('end');
  this.cup = document.getElementById('cup');
  this.surprise = document.getElementById('surprise');
  this.initListener();
}

initPage.prototype = {
  initListener : function (){
    var that = this;
    that.start.addEventListener('click',function (){
      that.startRandom();
    })

    that.stop.addEventListener('click',function (){
      that.stopRandom();
    })
  },
  reInit : function (that){
    var that = that;

    that.fadeOut(function() {
      that.tryAgain.remove();
      that.cup.style.display = 'block';
      that.cup.style.left = '180px';
      that.surprise.style.backgroundSize = 'cover';
      that.surprise.style.backgroundImage = 'url(./images/cat.png)';
      that.fadeIn(function (){
        that.stop.setAttribute('disabled','disabled');
        that.start.removeAttribute('disabled');
      });
    });
  },
  startRandom : function (){
    var that = this;
    var leftArray = [180,258,345];
    var parint = 0;
    that.start.setAttribute('disabled','disabled');
    that.stop.removeAttribute('disabled');
    that.setinterval = setInterval(function (){
      parint = parint > leftArray.length ? 0 : parint;
      that.cup.style.left = leftArray[parint++] + 'px';
    },100)
  },
  stopRandom : function (){
    var that = this;
    that.stop.setAttribute('disabled','disabled');
    clearInterval(that.setinterval);
    setTimeout(function (){
      that.fadeOut(function (){
        that.cup.style.display = 'none';
        that.randomImage();
      });
    },500);
  },
  fadeOut : function (cb){
    var x = 1;
    var that = this;
    that.fades = setInterval(function (){
      if(x <= 0){
        clearInterval(that.fades);
        cb && cb();
      }else{
        that.surprise.style.opacity = (x-=0.1);
      }
    },1000/60);
  },
  randomImage : function (){
    var that = this;
    var imageArray = [
      '0'
      ,'100'
      ,'askagain'
      ,'askyourmom'
      ,'maybe'
      ,'no'
      ,'yes']
    var string = "./images/" + imageArray[parseInt(Math.random() * 6)] + ".png";
    that.surprise.style.backgroundImage = "url("+ string +")";
    that.surprise.style.backgroundSize = 'contain';
    that.fadeIn(function (){
      that.tryAgain = document.createElement('button');
      that.tryAgain.innerHTML = 'Try Again';
      that.tryAgain.id = 'try';
      that.surprise.appendChild(that.tryAgain)
      that.tryAgain.addEventListener('click',function (){
        that.reInit(that);
      });
    });
  },
  fadeIn : function (cb){
    var x = 0;
    var that = this;
    that.fade = setInterval(function (){
      if(x >= 1){
        clearInterval(that.fade);
        cb && cb();
      }else{
        that.surprise.style.opacity = (x += 0.1);
      }
    },1000/60);
  }
}