function CLoaderResourcesPanel(oParentContainer){
    var _iContResources;
    var _iTotResourcesToLoad;
    var _aCbCompleted;
    var _aCbOwner;
    var _oListener;
    
    var _oFade;
    var _oLoader;
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    var _oThis = this;
    
    this._init = function(){
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oListener = _oFade.on("mousedown",function(){});
        _oContainer.addChild(_oFade);

        
        var oSpriteLoader = s_oSpriteLibrary.getSprite("progress_loading");
        _oLoader = createBitmap(oSpriteLoader);
        _oLoader.regX = oSpriteLoader.width/2;
        _oLoader.regY = oSpriteLoader.height/2;
        _oLoader.x = CANVAS_WIDTH/2;
        _oLoader.y = CANVAS_HEIGHT/2 + 130;
        _oContainer.addChild(_oLoader);
    };
    
    this.unload = function(){
        createjs.Tween.removeTweens(_oLoader);
        _oFade.off("mousedown",_oListener);
        _oParentContainer.removeChild(_oContainer);
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.removeEventListener = function(iEvent){
        _aCbCompleted[iEvent] = null;
        _aCbOwner[iEvent] = null;
    };
    
    this.start = function(aResourcesToLoad){
        s_oSpriteLibrary.init( this._onImageLoaded,this._onAllImagesLoaded, this );
        
        _iContResources = 0;
        _iTotResourcesToLoad = 0;
        for(var i=0;i<aResourcesToLoad.length;i++){
            if(s_oSpriteLibrary.addSprite(aResourcesToLoad[i].name,aResourcesToLoad[i].path)){
                _iTotResourcesToLoad++;
            };
        }
        
        if(_iTotResourcesToLoad > 0){
            s_oSpriteLibrary.loadSprites();
            
            new createjs.Tween.get(_oLoader,{loop:-1}).to({rotation:360},500);
            _oContainer.visible = true;
        }else{
            if(_aCbCompleted[ON_END_LOADING]){
                _aCbCompleted[ON_END_LOADING].call(_aCbOwner[ON_END_LOADING]);
            }
        }
        
        
    };
    
    this.hide = function(){
        createjs.Tween.removeTweens(_oLoader);
        _oContainer.visible = false;
    };
    
    this._onImageLoaded = function(){
        _iContResources++;
        
        if(_iContResources === _iTotResourcesToLoad){
            if(_aCbCompleted[ON_END_LOADING]){
                _aCbCompleted[ON_END_LOADING].call(_aCbOwner[ON_END_LOADING]);
            }
        }
    };
    
    this._onAllImagesLoaded = function(){
       
    };
    
    this._init();
}