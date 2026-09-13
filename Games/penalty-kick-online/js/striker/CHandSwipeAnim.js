function CHandSwipeAnim(oStartPoint, aEndPoint, oSprite, oParentContainer) {
    var _oParentContainer = oParentContainer;
    var _oHandSwipe;
    var _oContainer;
    var _oStartPoint = oStartPoint;
    var _aEndPoint = aEndPoint;
    var _bAnimation = false;

    this._init = function (oSprite) {
        _oContainer = new createjs.Container();
        _oHandSwipe = createBitmap(oSprite);
        _oHandSwipe.x = _oStartPoint.x;
        _oHandSwipe.y = _oStartPoint.y;
        _oHandSwipe.regX = oSprite.width * 0.5;
        _oHandSwipe.regY = oSprite.height * 0.5;
        _oHandSwipe.alpha = 0;

        _oParentContainer.addChild(_oContainer);
        _oContainer.addChild(_oHandSwipe);
    };

    this.animAllSwipe = function () {
        _oHandSwipe.x = _oStartPoint.x;
        _oHandSwipe.y = _oStartPoint.y;
        createjs.Tween.get(_oHandSwipe,{loop:-1}).to({x: _aEndPoint[0].x, y: _aEndPoint[0].y,alpha:1},MS_TIME_SWIPE_END, createjs.Ease.quartOut).to({x:_oStartPoint.x,y:_oStartPoint.y,alpha:0.5},0).
                to({x: _aEndPoint[1].x, y: _aEndPoint[1].y,alpha:1},MS_TIME_SWIPE_END, createjs.Ease.quartOut).to({x:_oStartPoint.x,y:_oStartPoint.y,alpha:0.5},0).
                to({x: _aEndPoint[2].x, y: _aEndPoint[2].y,alpha:1},MS_TIME_SWIPE_END, createjs.Ease.quartOut).to({x:_oStartPoint.x,y:_oStartPoint.y,alpha:0.5},0);
    };

    this.fadeAnim = function (fVal) {
        createjs.Tween.get(_oContainer, {override: true}).to({alpha: fVal}, 250);
    };

    this.isAnimate = function () {
        return _bAnimation;
    };

    this.setVisible = function (bVal) {
        _oHandSwipe.visible = bVal;
    };

    this.removeTweens = function () {
        createjs.Tween.removeTweens(_oHandSwipe);
        _bAnimation = false;
    };

    this.unload = function(){
        this.removeTweens();
        _oContainer.removeChild(_oHandSwipe);
    };

    this._init(oSprite);

    return this;
}