function CPlayer(iX, iY,iTeamId, oParentContainer) {
    var _bMustKick;
    var _aPiecesSprite;
    var _aListeners;
    var _pStartPos;
    var _oListener;
    
    var _oParentContainer = oParentContainer;
    var _oContainer;

    var _szGender;

    this._init = function (iX, iY,iTeamId) {
        _bMustKick = true;
        _pStartPos = {x: iX, y: iY};
        
        _oContainer = new createjs.Container();
        //_oContainer.visible = false;
        _oContainer.x = _pStartPos.x;
        _oContainer.y = _pStartPos.y;
        _oContainer.scale = 1.42;
        _oParentContainer.addChild(_oContainer);
        
        ///STRIKER ONLY MALE
        _szGender = GENDER_MALE;
        
        var iSkinColor = TEAM_COLORS[iTeamId].skin//Math.floor(Math.random()*2);
        
        _aPiecesSprite = new Array();
        for(var k=0;k<PLAYER_PIECES.length;k++){
            if(TEAM_COLORS[iTeamId]["first_kit"][PLAYER_PIECES[k].type] === null){
                continue;
            }
            
            var iVariant = 0;
            switch(PLAYER_PIECES[k].type){
                case "jersey":
                case "shorts":
                case "socks":
                case "stripes":
                case "band":{
                        iVariant = TEAM_COLORS[iTeamId]["first_kit"][PLAYER_PIECES[k].type];
                        break;
                }
                case "arms":
                case "legs":{
                        iVariant = iSkinColor;
                        break;
                }
            }

            var aSprites = new Array();
            for(var t=0;t<PLAYER_INFOS[_szGender][PLAYER_PIECES[k].type].num_spritesheet;t++){
                aSprites.push(s_oSpriteLibrary.getSprite(_szGender+"_player_"+PLAYER_PIECES[k].type+"_"+iVariant+"-"+t));
            }

            var oData = {   
                            images: aSprites, 
                            framerate:30,
                            // width, height & registration point of each sprite
                            frames: PLAYER_INFOS[_szGender][PLAYER_PIECES[k].type].frames ,
                            animations: {start:0,anim:[0,PLAYER_INFOS[_szGender].num_frames-1,"stop_anim"],stop_anim:PLAYER_INFOS[_szGender].num_frames-1}
            };  
            
            
                  
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            var oCurSprite = createSprite(oSpriteSheet,"start",0,0,PLAYER_INFOS[_szGender][PLAYER_PIECES[k].type].width,
                                                        PLAYER_INFOS[_szGender][PLAYER_PIECES[k].type].height);
            oCurSprite.x = PLAYER_INFOS[_szGender][PLAYER_PIECES[k].type].x;
            oCurSprite.y = PLAYER_INFOS[_szGender][PLAYER_PIECES[k].type].y;
            
            if(k === 0){
                _oListener = oCurSprite.on("change",this._onAnimChange,this);
            }
            _oContainer.addChild(oCurSprite);
            
            _aPiecesSprite.push(oCurSprite);
        }
        
    };
    
    
    this.startKick = function(){
        _oContainer.visible = true;
        _aListeners = new Array();
        for(var k=0;k<_aPiecesSprite.length;k++){
            _aPiecesSprite[k].gotoAndPlay("anim");
        }
    };

    this.setVisible = function (bVal) {
       
    };

    this.animFade = function (fAlpha) {
    };
    
    this._onAnimChange = function(evt){    
        if(_aPiecesSprite[0].currentFrame >= SHOOT_FRAME && _bMustKick){
            _bMustKick = false;
            s_oGameStriker.playerKick();
            createjs.Tween.get(_oContainer).to({alpha: 0}, 1000, createjs.Ease.quartOut);
        }else if(_aPiecesSprite[0].currentFrame === PLAYER_INFOS[_szGender].num_frames-1){
            _aPiecesSprite[0].off("change",_oListener);
            
        }
        
    };
    

    this.animPlayer = function () {

    }
    this._init(iX, iY,iTeamId);

    return this;
}