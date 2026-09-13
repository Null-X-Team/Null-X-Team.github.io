function CGoalKeeperAnim(iColor,szAnim,szGender,oParentContainer){
    var _szAnim = szAnim;
    var _aPiecesSprite;
    
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    this._init = function(iColor,szGender){
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);

        _aPiecesSprite = new Array();

        var oInfos = GOALKEEPER_ANIM_INFOS[szGender][_szAnim];
        for(var k=0;k<GOALKEEPER_PIECES.length;k++){
            var iColor = 0;
          
            if(GOALKEEPER_PIECES[k] === "kit"){
                iColor = s_iGoalkeeperColor;
            }
            var oSprite = s_oSpriteLibrary.getSprite(szGender+"_"+_szAnim+"_"+GOALKEEPER_PIECES[k]+"-"+iColor);
            
            var oData = {   
                            images: [oSprite], 
                            framerate:30,
                            // width, height & registration point of each sprite
                            frames: oInfos[GOALKEEPER_PIECES[k]].frames, 
                            animations: {start:0,anim:[0,oInfos.num_frames-1,oInfos.next_anim],stop_anim:oInfos.num_frames-1}
            };
            //console.log(szGender+"_"+_szAnim+"_"+GOALKEEPER_PIECES[k]+"-"+iColor)
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            var oCurSprite = createSprite(oSpriteSheet,"start");
            
            oCurSprite.x = oInfos[GOALKEEPER_PIECES[k]].x;
            oCurSprite.y = oInfos[GOALKEEPER_PIECES[k]].y;
            oCurSprite.regX = oInfos["regX"];
            oCurSprite.regY = oInfos["regY"];
            oCurSprite.on("animationend",this._onAnimEnd,this);
            _oContainer.addChild(oCurSprite);

            
            _aPiecesSprite.push(oCurSprite);
        }
        
    };
    
    this.updateCostumeColor = function(evt) {	
            evt.currentTarget.updateCache();
    };
    
    this.reset = function(){
        for(var k=0;k<_aPiecesSprite.length;k++){
            _aPiecesSprite[k].gotoAndStop("start");
        }
    };
    
    this.setVisible = function(bVisible){
        _oContainer.visible = bVisible;
    };
    
    this.playAnim = function(){
        for(var k=0;k<_aPiecesSprite.length;k++){
            _aPiecesSprite[k].gotoAndPlay("anim");
        }
        
    };
    
    this._onAnimEnd = function(evt){
        if(evt.name === "stop_anim"){
            createjs.Tween.get(_oContainer).to({alpha: 0}, 500, createjs.Ease.quartOut);
        }
    };

    
    this._init(iColor,szGender);
}