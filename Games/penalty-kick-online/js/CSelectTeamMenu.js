function CSelectTeamMenu(){
    var _aFlagButs;
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    
    var _oButExit;
    var _oAudioToggle;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oContainerFlag;
    var _oContainer;
    var _oTeamContainer;
    var _oTextWaiting;
    
    var _oSpriteMsgBox;
    var _oTextTitle;
    
    var _oSelectionGender;
    var _pStartPosMale;
    var _oButMale;
    var _pStartPosFemale;
    var _oButFemale;
    
    var _iTeam;
    var _oLoaderController;
    
    
    
    var _oThis = this;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_levelselect'));
        _oContainer.addChild(oBg);

        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("#000").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        oFade.alpha = 0.5;
        _oContainer.addChild(oFade);

        _oTeamContainer = new createjs.Container();
        _oTeamContainer.x = CANVAS_WIDTH_HALF-60;
        _oTeamContainer.y = CANVAS_HEIGHT_HALF;
        var iPanelScale = 0.9;
        _oTeamContainer.scale = iPanelScale;
        _oContainer.addChild(_oTeamContainer);

        _oSpriteMsgBox = s_oSpriteLibrary.getSprite('msg_box');
        var oMsgBox = createBitmap(_oSpriteMsgBox);  
        _oTeamContainer.addChild(oMsgBox);
        
        _oTeamContainer.regX = _oSpriteMsgBox.width * 0.5;
        _oTeamContainer.regY = _oSpriteMsgBox.height * 0.5;
        
        _oTextTitle = new CTLText(_oTeamContainer, 
                    0 ,  -50, _oSpriteMsgBox.width , 50, 
                    50, "center", TEXT_COLOR, PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_SELECT_TEAM,
                    true, true, false,
                    false );
                    

        _oTextTitle.setShadow("#000000", 2, 2, 4);
        
        _oTextWaiting = new CTLText(_oContainer, 
                    CANVAS_WIDTH / 2 - _oSpriteMsgBox.width/2 +50,  CANVAS_HEIGHT_HALF-70, _oSpriteMsgBox.width - 100, 140, 
                    70, "center", TEXT_COLOR, PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_WAIT_OPPONENT,
                    true, true, true,
                    false );

        _oTextWaiting.setShadow("#000000", 2, 2, 4);
        
        //INIT BUTTON TEAM
        _oContainerFlag = new createjs.Container();
        _oContainerFlag.x =  _oSpriteMsgBox.width/2+50;
        _oContainerFlag.y = _oSpriteMsgBox.height/2-10;
        _oTeamContainer.addChild(_oContainerFlag);
        
        _aFlagButs = new Array();
        var iX = 4;
        var iY = 45;
        for(var i=0;i<NUM_TEAMS;i++){
            var oFlag = new CButTeam(iX,iY,i,_oContainerFlag);
            oFlag.addEventListener(ON_MOUSE_UP,this._onSelectFlag,this);
            
            _aFlagButs[i] = oFlag;
            
            if(i>0 && (i+1)%8 === 0){
                iX = 4;
                iY += 120;
            }else{
                iX += 108;
            }
        }
        
        
        _oContainerFlag.regX = _oContainerFlag.getBounds().width/2;
        _oContainerFlag.regY = _oContainerFlag.getBounds().height/2;

        
        var oSpriteSelect = s_oSpriteLibrary.getSprite("selection_gender");
        _oSelectionGender = createBitmap(oSpriteSelect);
        _oSelectionGender.regX = oSpriteSelect.width/2;
        _oSelectionGender.regY = oSpriteSelect.height/2;
        s_oStage.addChild(_oSelectionGender);
        
        _pStartPosMale = {x:_oTeamContainer.x+555*iPanelScale,y:CANVAS_HEIGHT/2-80};
        _oButMale = new CGfxButton(_pStartPosMale.x,_pStartPosMale.y,s_oSpriteLibrary.getSprite("but_male"),s_oStage);
        _oButMale.addEventListenerWithParams(ON_MOUSE_UP,this._onChangeGender,this,GENDER_MALE);
        
        _pStartPosFemale = {x:_pStartPosMale.x,y:_pStartPosMale.y + 170};
        _oButFemale = new CGfxButton(_pStartPosFemale.x,_pStartPosFemale.y,s_oSpriteLibrary.getSprite("but_female"),s_oStage);
        _oButFemale.addEventListenerWithParams(ON_MOUSE_UP,this._onChangeGender,this,GENDER_FEMALE);
        
        s_szGenderSelected = s_oLocalStorage.getGenericVar(LOCALSTORAGE_GENDER) || GENDER_MALE;
        this._onChangeGender(s_szGenderSelected);
        
        //////GUI
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _pStartPosAudio = {x: _oButExit.getX() - oSprite.width - 10, y: (oSprite.height / 2) + 10};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, s_oSpriteLibrary.getSprite('audio_icon'), s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x:oSprite.width/4 + 10,y:_pStartPosExit.y};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        if(s_bMultiplayer){
            s_oNetworkManager.addEventListener(ON_STATUS_OFFLINE, this._onConnectionCrashed, this);
            
            _oTextWaiting.setVisible(false);

        }else {
            _oTextWaiting.setVisible(false);
        }
        
        _oLoaderController = new CLoaderResourcesPanel(s_oStage);
        _oLoaderController.addEventListener(ON_END_LOADING,this._onEndLoading,this);
        
        this.refreshButtonPos();
    };
    
    this.unload = function(){
        _oLoaderController.unload();
        
        _oButMale.unload();
        _oButFemale.unload();
        
        for(var i=0;i<_aFlagButs.length;i++){
            _aFlagButs[i].unload();
        }
        
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }
        _oButExit.unload();
        _oButExit = null;
        
        s_oStage.removeAllChildren();
        
        s_oSelectMenu = null;
    };

    this.opponentLeaveTheGame = function(){        
        _oTeamContainer.visible = false;
        _oTextWaiting.setVisible(true);
        
        _oButMale.setVisible(false);
        _oButFemale.setVisible(false);
        _oSelectionGender.visible = false;
        
        _oTextWaiting.refreshText(TEXT_OPPONENT_LEFT);
    };
    
    this.refreshButtonPos = function () {
        _oButExit.setPosition(_pStartPosExit.x - s_iOffsetX, _pStartPosExit.y + s_iOffsetY);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - s_iOffsetX, s_iOffsetY + _pStartPosAudio.y);
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + s_iOffsetX,_pStartPosFullscreen.y + s_iOffsetY);
        }

    };
    
    this._onChangeGender = function(szGender){
        s_szGenderSelected = s_szGenderOpponent = szGender;

        s_oLocalStorage.saveGenericVar(LOCALSTORAGE_GENDER, szGender);
       
        if(s_szGenderSelected === GENDER_MALE){
            _oSelectionGender.x = _pStartPosMale.x;
            _oSelectionGender.y = _pStartPosMale.y;
        }else{
            _oSelectionGender.x = _pStartPosFemale.x;
            _oSelectionGender.y = _pStartPosFemale.y;
        }
    };
    
    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onExit = function () {
        this.unload();
        s_oMain.gotoMenu();
        
        s_oNetworkManager.disconnect();
    };
    
    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen && screenfull.enabled){
		_oButFullscreen.setActive(s_bFullscreen);
	}
    };
    
    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();

    };
    
    this._onSelectFlag = function(iTeam){
        _iTeam = iTeam;
        
        var aResources = s_oMain.getGenderSprites(s_szGenderSelected);
     
        _oLoaderController.start(aResources);
    };
    
    this._onEndLoading = function(){
        _oLoaderController.hide();
        
        s_oSocialManager.onCountryPick(_iTeam);
        
        if(!s_bMultiplayer){
            _oThis.unload();
            
            s_oLocalStorage.saveTeam(_iTeam);
            s_oMain.gotoLevelPanel();
        }else {
            s_iTeamSelected = _iTeam;

            _oTeamContainer.visible = false;
            _oTextWaiting.setVisible(true);

            _oButMale.setVisible(false);
            _oButFemale.setVisible(false);
            _oSelectionGender.visible = false;

            if(s_bPlayWithBot){
                setTimeout(function(){
                    ////SELECT RANDOM TEAM
                    s_oSelectMenu.onGameStart([_iTeam]);

                }, 1000 + Math.random()*1000);
            }else {
                ///SEND MESSAGE
                var oSelection = {iTeamIndex:_iTeam, szGender: s_szGenderSelected, playerID: s_oNetworkManager.getPlayerOrderID()};
                s_oNetworkManager.sendMsg(MSG_TEAM_SELECTED, JSON.stringify(oSelection));
            }
        }
    };
    
    this.gotoTeamSelect = function(iTeamAlreadySelected){
        _aFlagButs[iTeamAlreadySelected].block(true);
        _aFlagButs[iTeamAlreadySelected].setAlpha(0.3);
        
        _oTeamContainer.visible = true;
        _oTextWaiting.setVisible(false);
    };
    
    this.onGameStart = function(aPlayerTeam){
        this.unload();
        s_aMatches = new Array();

        if(s_bPlayWithBot){
            var iBotTeamIndex;
            do{
                iBotTeamIndex = Math.floor( Math.random()*NUM_TEAMS );
            }while(iBotTeamIndex === s_iTeamSelected);
            
            var iRandomDifficulty = 5 + Math.floor( Math.random()*4 );
            
            s_aMatches[iRandomDifficulty-1]= iBotTeamIndex;
            
            s_oMain.gotoGameWithBot(iRandomDifficulty);
        }else {
            if(aPlayerTeam[0].team_id === aPlayerTeam[1].team_id){
                var iNewTeamID = this._chooseRandomTeamExcept(aPlayerTeam[0].team_id);
                aPlayerTeam[0].team_id = iNewTeamID;
                aPlayerTeam[1].team_id = iNewTeamID;
            }
            
            if(s_oNetworkManager.isUserA()){
                s_aMatches.push(aPlayerTeam[1]);
                s_szGenderOpponent = aPlayerTeam[1].gender;
                //console.log(s_szGenderOpponent)
            }else {
                s_aMatches.push(aPlayerTeam[0]);
                s_szGenderOpponent = aPlayerTeam[0].gender;
                //console.log(s_szGenderOpponent)
            }
            
            
            var aResources = s_oMain.getGenderSprites(s_szGenderOpponent);
            _oLoaderController.addEventListener(ON_END_LOADING,this._onEndLoadingOpponent,this);
            
            _oLoaderController.start(aResources);
            
            
        }
    };
    
    this._onEndLoadingOpponent = function(){
        s_oMain.gotoGameMulti();
    };
    
    this._chooseRandomTeamExcept = function(iExceptionTeamID){
        var aTeamID = new Array();
        for(var i=0; i<NUM_TEAMS-1; i++){
            if(i===iExceptionTeamID){
                continue;
            }
            aTeamID.push(i);
        }
        
        var iRandomTeamID = aTeamID[Math.floor( Math.random()*aTeamID.length )];
        
        return iRandomTeamID;
    };
    
    this._onConnectionCrashed = function(){
        s_oNetworkManager.disconnect();

        this.unload();

        s_oMain.gotoOfflineMenu();
    };
    
    s_oSelectMenu = this;
    this._init();
}

var s_oSelectMenu = null;