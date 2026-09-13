function COpponent(iXPos, iYPos, iTeamId, oParentContainer) {
    var _aListeners;
    var _aPiecesSprite;
    var _oDir;
    
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    var _oThis = this;

    this._init = function (iXPos, iYPos, iTeamId ) {
        
        _oContainer = new createjs.Container();
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
        _oParentContainer.addChild(_oContainer);

        //CHECK IF THERE IS A JERSEY COLLISION BETWEEN TEAMS
        var szKit = "first_kit";
        var aSimilarKitTeams = TEAM_COLORS[s_iTeamSelected].similar_opponent;

        if(aSimilarKitTeams.includes(iTeamId)){
            szKit = "second_kit";
        }
        
        console.log(iTeamId)
        var iSkinColor = TEAM_COLORS[iTeamId].skin//Math.floor(Math.random()*2);
        _aPiecesSprite = new Array();
        for(var k=0;k<OPPONENT_PIECES.length;k++){
            if(TEAM_COLORS[iTeamId][szKit][OPPONENT_PIECES[k].type] === null){
                continue;
            }
            
            var iVariant = 0;
           
            switch(OPPONENT_PIECES[k].type){
                case "jersey":
                case "shorts":
                case "socks":
                case "stripes":
                case "band":{
                        iVariant = TEAM_COLORS[iTeamId][szKit][OPPONENT_PIECES[k].type];
                       
                        break;
                }
                case "skin":{
                        iVariant = iSkinColor;
                       
                        break;
                }
            }
            
            var oData = {   
                            images: [s_oSpriteLibrary.getSprite(s_szGenderOpponent+"_opponent_"+OPPONENT_PIECES[k].type+"_"+iVariant)], 
                            framerate:30,
                            // width, height & registration point of each sprite
                            frames: OPPONENT_SPRITESHEET_FRAMES[s_szGenderOpponent][OPPONENT_PIECES[k].type], 
                            animations: {start:0,kick:[0,48,"after_kick"],after_kick:[49,84,"stop_anim"],stop_anim:84}
            };

            var oSpriteSheet = new createjs.SpriteSheet(oData);
            var oPiece = createSprite(oSpriteSheet,"start");
            _oContainer.addChild(oPiece);
            
            
            _aPiecesSprite.push(oPiece);
        }
        
        _aPiecesSprite[0].on("animationend", this.onFinishAnimation,this);
    };
    
    

    this.setPosition = function (iXPos, iYPos) {
        if (iXPos === null) {

        } else {
            _oContainer.x = iXPos;
        }
        if (iYPos === null) {

        } else {
            _oContainer.y = iYPos;
        }
    };

    this.rotate = function (iValue) {
        _oContainer.scaleX = iValue;
    };

    this.setVisible = function (bVal) {
        _oContainer.visible = bVal;
    };
    
    this.removeListeners = function(){
        for(var k=0;k<_aPiecesSprite.length;k++){
            _aPiecesSprite[k].removeAllEventListeners();
        }
    };

    this.changeState = function (szState) {
        _aListeners = new Array();

        for(var k=0;k<_aPiecesSprite.length;k++){
            _aPiecesSprite[k].gotoAndPlay(szState);
        }

    };
    
    this.stopAnimation = function () {
        for(var k=0;k<_aPiecesSprite.length;k++){
            _aPiecesSprite[k].stop();
        }  
    };

    this.playAnimation = function () {
        _aListeners = new Array();
    
        for(var k=0;k<_aPiecesSprite.length;k++){
            _aPiecesSprite[k].play();
        }
        
    };
    
    this.startKick = function(oDir){
        _oDir = oDir;
        
        
        for(var k=0;k<_aPiecesSprite.length;k++){
            _aPiecesSprite[k].gotoAndPlay("kick");
        }
    };

    this.onFinishAnimation = function (evt) {
        if(evt.name === "kick"){
            if(_oDir){
                s_oGameKeeper.addRemoteImpulseToBall(_oDir);
            }else{
                s_oGameKeeper.addImpulseToBall();
            }
            
            playSound("kick", 0.3, false);
        }else if(evt.name === "stop_anim"){
            _oThis.removeListeners();
        }
    };

    this.fadeAnimation = function (fVal) {
        createjs.Tween.get(_oContainer).to({alpha: fVal}, 500);
    };

    this.removeTweens = function () {
        createjs.Tween.removeTweens(_oContainer);
    };
    
    this.getX = function () {
        return _oContainer.x;
    };

    this.getY = function () {
        return _oContainer.y;
    };
    
    this._init(iXPos, iYPos, iTeamId);

    return this;
}

