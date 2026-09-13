function CGoalKeeper(iXPos, iYPos,iColor,szGender,oParentContainer) {

    var _pStartPos;
    var _oContainer;
    var _aAnimContainer;
    var _oParentContainer = oParentContainer;

    var _iAnimType = IDLE;
    

    this._init = function (iXPos, iYPos, iColor,szGender) {


        _pStartPos = {x: iXPos, y: iYPos};
        _oContainer = new createjs.Container();
        
        _oContainer.x = _pStartPos.x;
        _oContainer.y = _pStartPos.y;
        _oParentContainer.addChild(_oContainer);

        _aAnimContainer = new Array();
        
        var iCont = 0;
        for(var k=0;k<SPRITE_NAME_GOALKEEPER.length;k++){
            _aAnimContainer[iCont] = new CGoalKeeperAnim(iColor,SPRITE_NAME_GOALKEEPER[k],szGender,_oContainer);
            _aAnimContainer[iCont].setVisible(false);

            iCont++;
        }
        
        _aAnimContainer[_iAnimType].setVisible(true);
        _aAnimContainer[_iAnimType].playAnim();

    };

/*
    this.getAnimArray = function () {
        return _aAllAnim[_iAnimType];
    };

    this.loadAnim = function (szSprite, iNum, oContainer) {
        var aAnim = new Array();
        for (var i = 0; i < iNum; i++) {
            aAnim.push(createBitmap(s_oSpriteLibrary.getSprite(szSprite + "_" +iType + "_" + i)));
            aAnim[i].visible = false;
            oContainer.addChild(aAnim[i]);
        }
        return aAnim;
    };
*/
    this.getX = function () {
        return _oContainer.x;
    };

    this.getY = function () {
        return _oContainer.y;
    };

    this.disableAllAnim = function () {
        for (var i = 0; i < _aAnimContainer.length; i++) {
            _aAnimContainer[i].setVisible( false);
        }
    };

    this.setPosition = function (iXPos, iYPos) {
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
    };

    this.resetPosition = function(){
        _oContainer.x = _pStartPos.x;
        _oContainer.y = _pStartPos.y;
    };

    this.setVisible = function (bVal) {
        _oContainer.visible = bVal;
    };

    this.fadeAnimation = function (fVal) {
        createjs.Tween.get(_oContainer, {override: true}).to({alpha: fVal}, 500);
    };

    this.setAlpha = function (fVal) {
        _oContainer.alpha = fVal;
    };

    this.getObject = function () {
        return _oContainer;
    };

    this.getFrame = function () {
        //return _iAnimKeeper;
    };

    this.viewFrame = function (aAnim, iFrame) {
        //aAnim[iFrame].visible = true;
    };

    this.hideFrame = function (aAnim, iFrame) {
        //aAnim[iFrame].visible = false;
    };

    this.getDepthPos = function () {
        return GOAL_KEEPER_DEPTH_Y;
    };

    this.animGoalKeeper = function (aAnim, iEndFrame) {/*
        _fBuffer += s_iTimeElaps;
        if (_fBuffer > BUFFER_ANIM_PLAYER) {
            this.hideFrame(aAnim, _iAnimKeeper);
            if (_iAnimKeeper + 1 < iEndFrame) {
                this.viewFrame(aAnim, _iAnimKeeper + 1);
                _iAnimKeeper++;

            } else {
                _iAnimKeeper = 0;
                _fBuffer = 0;
                this.viewFrame(aAnim, _iAnimKeeper);
                return false;
            }
            _fBuffer = 0;
            //_oContainer.updateCache();
        }
        return true;*/
    };

    this.resetAnimation = function (iType) {
        _aAnimContainer[iType].reset();
        //this.resetAnimFrame(_aAllAnim[iType], NUM_SPRITE_GOALKEEPER[iType]);
    };

    this.resetAnimFrame = function (aAnim, iNum) {/*
        for (var i = 1; i < iNum; i++) {
            aAnim[i].visible = false;
        }
        aAnim[0].visible = true;*/
    };

    this.setVisibleContainer = function (iType, bVal) {
        _aAnimContainer[iType].setVisible(bVal);
    };

    this.runAnim = function (iVal) {
        console.log(iVal)
        this.disableAllAnim();
        this.resetAnimation(iVal);
        _iAnimType = iVal;
        
        _aAnimContainer[_iAnimType].setVisible(true);
        _aAnimContainer[_iAnimType].playAnim();

    };

    this.runAnimAndShift = function (iVal, pBallFinalPos) {
        console.log(iVal)
        this.disableAllAnim();
        this.resetAnimation(iVal);
        _iAnimType = iVal;
        
        _aAnimContainer[_iAnimType].setVisible(true);
        _aAnimContainer[_iAnimType].playAnim();
        
        var pOriginImpact = ORIGIN_POINT_IMPACT_ANIMATION[iVal];

        var iX = (pBallFinalPos.x - pOriginImpact.x);
        if(pOriginImpact.x === null){
            iX = 0;
        }
        var iY = (pBallFinalPos.y - pOriginImpact.y);
        if(pOriginImpact.y === null){
            iY = 0;
        }
        
        var pCorrection = {x: iX, y:  iY};
        createjs.Tween.get(_oContainer).to({x:_pStartPos.x + pCorrection.x, y:_pStartPos.y +pCorrection.y}, 600).call(function(){
            ///VARIABLE IF RETURN IN POSITION? GENERALLY, ALL THE JUMPING ANIM SHOULD RETURN IN POSITION;
            if(iY !== 0){
                createjs.Tween.get(_oContainer).to({x:_pStartPos.x, y:_pStartPos.y}, 300);
            }
        });
        
    };

    this.update = function () {
        //return this.animGoalKeeper(_aAllAnim[_iAnimType], NUM_SPRITE_GOALKEEPER[_iAnimType]);
    };

    this._init(iXPos, iYPos, iColor,szGender);

    return this;
}

