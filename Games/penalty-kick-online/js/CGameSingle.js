var CGameSingle = function(oData, iLevel){

    CGameBase.call(this, oData, iLevel);
    
    this._init(iLevel);
    
};

CGameSingle.prototype = Object.create(CGameBase.prototype);

CGameSingle.prototype._init = function(iLevel){
    CGameBase.prototype._init(iLevel);
    this._startGame(iLevel);
};

CGameSingle.prototype._startGame = function(iLevel){
    //this._oInterface = new CInterface(this._iCurLevel,this._iTotScore,this._oContainer);

    s_oGameStriker = this._oCurScenario = new CGameStrikerSingle(this._oContainerGame,this._iCurLevel);   

    //this.changeScenario();

    this._oQuizPanel.addEventListener(ON_ANSWER, this._onAnswer, this);
    this._oQuizPanel.addEventListener(ON_QUIZ_TIMEOUT, this._onQuizTimeout, this);
    
    this._oInterface.showVsPanel(s_aMatches[this._iCurLevel-1],this._iCurLevel);
    
    this.setPlayersName();


    this.callCMGLevelEvent(iLevel);

    /*
    s_oGame = this;
    _oFinalPanel = new CFinalPanel(1,s_oStage);
    //_oFinalPanel.show(szResult,iTotScore,iLevelScore,bGameOver,bLastLevel);
    _oFinalPanel.show(3,0,1,2,false,true);
    */
};

CGameSingle.prototype.callCMGLevelEvent = function (iLevel) {
    var szTag = iLevel.toString();
    szTag = szTag.length === 1 ? "0"+szTag : szTag;
    var szParam = "startAiMatch";
    console.log(szParam+szTag)
    if(parent.cmgGameEvent){
        parent.cmgGameEvent("start",szParam+szTag);
    }
};

CGameSingle.prototype.onBeginShot = function () {
    var bMatchPoint = this.checkMatchPoint();
    if(bMatchPoint){
        s_oInterface.showMatchPointText(TEXT_MATCHPOINT);
    }
};

CGameSingle.prototype.changeScenario = function(){
    this._bBonusShot = false;
    
    this.tryIncreaseStage();
        
    var bPlayerWins = this.checkPlayerWins();
    var bOpponentWins = this.checkOpponentWins();
    var bCanEnd = (bPlayerWins ||  bOpponentWins);
   
    this._iNumKicks++;

    if(bCanEnd){
        //GAME OVER
        this._aResults.push({player:this._iPlayerGoals,cpu:this._iOpponentGoals});

        var bGameOver = false;
        if( this._iPlayerGoals < this._iOpponentGoals){
            bGameOver = true;
        }

        s_oGame.triggerEvent(ON_MATCH_RESULT, {res: !bGameOver, playergoals: this._iPlayerGoals, opponentgoals: this._iOpponentGoals, level: this._iCurLevel});

        var bLastMatch = false;
        if(this._iCurLevel===NUM_MATCHES){
            bLastMatch = true;
        }else if(!bGameOver){
            s_oLocalStorage.saveLevel(this._iCurLevel+1);
        }

        //setVolume("soundtrack",1);
        stopSound("crowd");

        if(bPlayerWins){
            if(this._iNumKicks-1 === NUM_KICKS){
            ///REGULAR
                this._iLevelScore = SCORE_NORMAL;
            }else if(this._iNumKicks-1 < NUM_KICKS){
                /// BONUS
                this._iLevelScore = SCORE_BONUS;
            } else {
                /// EXTRA NO BONUS
                this._iLevelScore = SCORE_NOBONUS;
            }
        }
        
        this._iTotScore += this._iLevelScore;

        $(s_oMain).trigger("end_level", this._iCurLevel);
        this._oInterface.setFinalPanel();
        var iOpponentFlag = s_aMatches[s_oGame.getCurLevel()-1];
        this._oInterface.showFinalPanel( this._iPlayerGoals, this._iOpponentGoals ,this._iTotScore,this._iLevelScore,bGameOver,bLastMatch,iOpponentFlag);   

        if(bPlayerWins){
            s_oLocalStorage.saveMatch(this._iCurLevel,s_aMatches[this._iCurLevel-1],this._iPlayerGoals + "-" + this._iOpponentGoals,this._iLevelScore,this._iTotScore);
        }
        


    }else{
        this._oCurScenario.unload();
        this._oCurScenario = null;
        
        if(s_iCurState === STRIKER_MODE){
            s_iCurState = GOALKEEPER_MODE;
            refreshSettings(s_iCurState);

            if(this._iNumKicks > NUM_KICKS){
                this._bExtraPenalty = true;
                if(BALL_FORCE_Y[this._iCurLevel] < HIT_BALL_MAX_FORCE){
                    BALL_FORCE_Y[this._iCurLevel] += 2;
                }
            }

            s_oGameKeeper = this._oCurScenario = new CGameGoalkeeperSingle(this._iCurLevel,BALL_FORCE_Y[this._iCurLevel-1],this._oContainerGame);
        }else{
            s_iCurState = STRIKER_MODE;
            refreshSettings(s_iCurState);
            if(this._iNumKicks > NUM_KICKS){
                this._bExtraPenalty = true;
            }

            s_oGameStriker = this._oCurScenario = new CGameStrikerSingle(this._oContainerGame,this._iCurLevel);
        }
        if( this._iRemainingPlayerKicks === 0 && this._iRemainingOpponentKicks === 0){
            this.setExtraPenalty();
        }
        
        this.onBeginShot();
    }
};

CGameSingle.prototype.setBonusShotScenario = function(){
    this._oCurScenario.unload();
    this._oCurScenario = null;
    
    s_iCurState = STRIKER_MODE;
    refreshSettings(s_iCurState);
    if(this._iNumKicks > NUM_KICKS){
        this._bExtraPenalty = true;
    }

    s_oGameStriker = this._oCurScenario = new CGameStrikerSingle(this._oContainerGame,this._iCurLevel);
    s_oGameStriker.setBonusShot();
    
    this.onBeginShot();
};

CGameSingle.prototype.setBonusKeeperScenario = function(){
    this._oCurScenario.unload();
    this._oCurScenario = null;
        
    s_iCurState = GOALKEEPER_MODE;
    refreshSettings(s_iCurState);

    if(this._iNumKicks > NUM_KICKS){
        this._bExtraPenalty = true;
        if(BALL_FORCE_Y[this._iCurLevel] < HIT_BALL_MAX_FORCE){
            BALL_FORCE_Y[this._iCurLevel] += 2;
        }
    }

    s_oGameKeeper = this._oCurScenario = new CGameGoalkeeperSingle(this._iCurLevel,BALL_FORCE_Y[this._iCurLevel-1],this._oContainerGame);
    s_oGameKeeper.setBonusShot();
    
    this.onBeginShot();
};

///////////////////////////////// QUIZ
CGameSingle.prototype._onAnswer = function(iAnswerIndex){
    this._oQuizPanel.setAnswer(iAnswerIndex);
};

CGameSingle.prototype._onQuizTimeout = function(){
    this._oQuizPanel.setAnswer(-1);
};

///////////////////////////////////

CGameSingle.prototype.setPlayersName = function(){
    var iPlayerName = TEXT_TEAM[ s_iTeamSelected ];
    var iOpponentName = TEXT_TEAM[ s_aMatches[this._iCurLevel-1] ];
    this._oInterface.setPlayersInfo(iPlayerName, iOpponentName);
};

CGameSingle.prototype.isStartingUser = function(){
    return s_iCurState === STRIKER_MODE ? true : false;
};

CGameSingle.prototype.retryLevel = function(){
    this._iCurLevel--;
    this.nextRound();

    this._oInterface.hideFinalPanel();

    $(s_oMain).trigger("restart_level", this._iCurLevel);
};

CGameSingle.prototype.onExit = function () {
    s_oCMGApi.showAd();
    
    this.unload();

    $(s_oMain).trigger("show_interlevel_ad");
    $(s_oMain).trigger("end_session");
    if(!isPlaying("soundtrack")){
        playSound("soundtrack", SOUNDTRACK_GENERAL_VOLUME, true);
    }
    stopSound("crowd");
    s_oMain.gotoMenu();
};

CGameSingle.prototype.nextRound = function(){
    s_oCMGApi.showAd();
    
    this._iCurLevel++;
    
    this.callCMGLevelEvent(this._iCurLevel);
    
    this.reset();

    this._oCurScenario.unload();
    this._oCurScenario = null;
    
    var iOpponentFlag = s_aMatches[this._iCurLevel-1];
    this._oResultPanel.update(iOpponentFlag);
    
    this.setPlayersName();

    this._oInterface.reset(s_aMatches[this._iCurLevel-1],this._iCurLevel);
    this._oInterface.showVsPanel(s_aMatches[this._iCurLevel-1],this._iCurLevel);
    this._oInterface.hideFinalPanel();

    this._oResultPanel.reset();

    s_oGameStriker = this._oCurScenario = new CGameStrikerSingle(this._oContainerGame,this._iCurLevel);
    
    this.onBeginShot();
};