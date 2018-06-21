'use strict';

//分页类
var Pagination = function (data) {
    if (data) {
        //data = JSON.parse(data);
        this.rows = parseInt(data.rows);
        this.page = parseInt(data.page);
        this.sidx = data.sidx;
        this.sord = data.sord;
        this.records = parseInt(data.records);
        if (this.records > 0) {
            this.total = (this.records % this.rows == 0) ? parseInt(this.records / this.rows) : parseInt(this.records / this.rows) + 1;
        }
        else {
            this.total = 0;
        }
    } else {
        this.rows = 0;
        this.page = 0;
        this.sidx = '';
        this.sord = '';
        this.records = 0;
        this.total = 0
    }
};

Pagination.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

//平台抽取20%作为网站的维护
var _deduct = 0.8;

//1个NAS是10^18个代币
function NAS2WEI(bonus) {
    var times = Math.pow(10, 8);
    return bonus * times * Math.pow(10, 18) / times;
};

//1个NAS是10^18个代币
function WEI2NAS(bonus) {
    return bonus / Math.pow(10, 18);
};

//调试时记录操作
function mylog() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift("AVG-->")
    console.log.apply(console, args);
};

var AvgSystem = function () {
    //key:游戏id,value:作者id
    LocalContractStorage.defineMapProperty(this, 'gameKeysMap', null);
    //key:游戏id,value:玩家ids
    LocalContractStorage.defineMapProperty(this, 'gamePayedMap', null);
    //key:作者id,value:制作游戏ids
    LocalContractStorage.defineMapProperty(this, 'userPubMap', null);
    //key:用户id,value:拥有游戏ids
    LocalContractStorage.defineMapProperty(this, 'userPayMap', null);

    //key:游戏id,value:游戏信息
    LocalContractStorage.defineMapProperty(this, 'gameInfosMap', null);

    //key:游戏id,value:段落ids
    LocalContractStorage.defineMapProperty(this, 'gameSectionsMap', null);
    //key:段落id,value:段落基础信息
    LocalContractStorage.defineMapProperty(this, 'sectionInfosMap', null);
    //key:段落id,value:段落文本内容
    LocalContractStorage.defineMapProperty(this, 'sectionContentsMap', null);
    //key:段落id,value:段落选项跳转段落ids
    LocalContractStorage.defineMapProperty(this, 'sectionChoicesMap', null);

    //key:游戏id,value:评论ids
    LocalContractStorage.defineMapProperty(this, 'gameCommentMap', null);
    //key:游戏id,value:评论的玩家ids
    LocalContractStorage.defineMapProperty(this, 'gameCommentUserMap', null);
    //key:评论id,value:评论详细内容
    LocalContractStorage.defineMapProperty(this, 'allCommentMap', null);

    //key:map的key,value:自增
    LocalContractStorage.defineMapProperty(this, 'cntMap', null);

    //合约创建者
    LocalContractStorage.defineProperty(this, 'admin', null);
    //People die if they are killed
    LocalContractStorage.defineProperty(this, 'stella', null);

    this._LIMIT = 50;
    this._TitleLimit = 50;
    this._DescLimit = 500;
    this._ContentLimit = 4000;
}

AvgSystem.prototype = {
    init: function () {
        this.cntMap.set("gameCnt", 0);
        this.cntMap.set("sectionCnt", 0);
        this.cntMap.set("commentCnt", 0);

        this.admin = Blockchain.transaction.from;
        this.stella = 0;
    },


    /*************************************/
    /**
     * 使用循环的方式判断一个元素是否存在于一个数组中
     * @param {Object} arr 数组
     * @param {Object} value 元素值
     */
    _isInArray: function (arr, value) {
        if (!arr) {
            return false;
        }

        for (var i = 0; i < arr.length; i++) {
            if (value === arr[i]) {
                return true;
            }
        }
        return false;
    },


    /**
     * generate a new id for new article
     * @return {int} id for new article
     */

    //根据标志返回自增量
    _getAid: function (key) {
        var cnt = this.cntMap.get(key) + 1;
        this.cntMap.set(key, cnt);
        return cnt;
    },

    _checkGameOwner: function (id) {
        var from = Blockchain.transaction.from;
        var owner = this.gameKeysMap.get(id);
        var flag = false;
        if (from === owner) {
            //throw new Error('you are the owner of the article');
            flag = true;
        }
        //People die if they are killed
        //else if (from === this.admin) {}
        return flag;
    },

    _checkAdmin: function () {
        var flag = false;
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            flag = true;
        }
        return flag;
    },

    /**
    * add new title to userPubMap, when user add game
    * @param {string} from 
    * @param {int} aid  the id of game
    */
    _addUserPub: function (from, id) {
        var userGames = this.userPubMap.get(from);
        if (!userGames) {
            userGames = [id];
        } else {
            userGames.push(id);
        }

        this.userPubMap.set(from, userGames);
    },

    //添加游戏主信息(信息记录了开始的段落)	
    _addGameInfo: function (id, info) {
        var gameInfo = {};
        gameInfo.title = info.title;
        gameInfo.desc = info.desc;
        gameInfo.cost = new BigNumber(info.cost);
        gameInfo.income = 0;
        gameInfo.creTime = Blockchain.block.timestamp;
        gameInfo.pubTime = 0;
        gameInfo.isPub = 0;
        gameInfo.isBan = 0;
        gameInfo.likes = 0;
        gameInfo.dislikes = 0;
        gameInfo.startSection = info.startSection;
        var from = Blockchain.transaction.from;
        gameInfo.author = from;
        if (from === this.admin) {
            gameInfo.gameType = 1;
        } else {
            gameInfo.gameType = 0;
        }

        this.gameInfosMap.set(id, gameInfo);
    },

    addGameInfo: function (info) {

        var from = Blockchain.transaction.from;

        if (info.title.length >= this._TitleLimit) {
            throw new Error('Title limit:' + this._TitleLimit + ' words');
        }
        if (info.startSection.length >= this._TitleLimit) {
            throw new Error('StartSection limit:' + this._TitleLimit + ' words');
        }
        if (info.desc.length >= this._DescLimit) {
            throw new Error('Desc limit:' + this._DescLimit + ' words');
        }

        var id = this._getAid('gameCnt');

        this.gameKeysMap.set(id, from);
        this._addGameInfo(id, info);
        this._addUserPub(from, id);
        this._addUserPay(from, id);
    },


    //更新游戏主信息 校验
    updateGameInfo: function (info) {
        var id = info.id;
        if (!this._checkGameOwner(id)) {
            throw new Error('you are not the owner of the game');
        }

        if (info.title.length >= this._TitleLimit) {
            throw new Error('Title limit:' + this._TitleLimit + ' words');
        }
        if (info.startSection.length >= this._TitleLimit) {
            throw new Error('StartSection limit:' + this._TitleLimit + ' words');
        }
        if (info.desc.length >= this._DescLimit) {
            throw new Error('Title limit:' + this._DescLimit + ' words');
        }

        var gameInfo = this.gameInfosMap.get(id);
        if (gameInfo == null) {
            throw new Error("invilid game, it does not exist");
        }

        gameInfo.title = info.title;
        gameInfo.desc = info.desc;
        gameInfo.cost = new BigNumber(info.cost);
        gameInfo.startSection = info.startSection;

        this.gameInfosMap.set(id, gameInfo);
    },

    //获得游戏主信息 校验
    getOwnGameInfo: function (id) {
        this._checkStella();
        if (!this._checkGameOwner(id)) {
            throw new Error('you are not the owner of the game');
        }

        var gameInfo = this.gameInfosMap.get(id);
        return gameInfo;

    },

    //分页查询作者游戏列表 校验
    /*
	var param = {
            rows: 20,
            page: 1,
            sidx: "pubTime",
            sord: "desc",
            title: "",
            records:0
        };*/

    getOwnGames: function (param) {
        this._checkStella();
        param.records = 0;
        var pagination = new Pagination(param);

        if (!pagination.rows) {
            pagination.rows = this._LIMIT;
        }
        var offset = (pagination.page - 1) * pagination.rows;

        var from = Blockchain.transaction.from;
        var userPub = this.userPubMap.get(from);

        if (userPub.length == 0) {
            var data = { List: '', Page: pagination }
            return data;
        }


        if (offset > userPub.length) {
            throw new Error("offset is not valid");
        } else if (offset == userPub.length) {
            pagination.records = userPub.length;
            var data = { List: '', Page: pagination }
            return data;
        }


        var games = {};
        if (!this._isInArray(['pubTime', 'income', 'likes', 'creTime'], pagination.sidx)) {
            throw new Error('invilid sortField, it must be income or pubTime')
        }

        games = this._TopNByArray(pagination.sidx, pagination.sord, pagination.rows, offset, userPub, 'game');
        pagination.records = userPub.length;
        pagination = new Pagination(pagination);


        var data = { List: games, Page: pagination }
        return data;

    },

    //生成的游戏无法删除	
    //发布、暂停游戏 校验
    pubGameInfo: function (info) {
        var id = info.id;
        if (!this._checkGameOwner(id)) {
            throw new Error('you are not the owner of the game');
        }

        var gameInfo = this.gameInfosMap.get(id);
        if (gameInfo == null) {
            throw new Error("invilid game, it does not exist");
        }

        var isPub = gameInfo.isPub;
        if (!(isPub === parseInt(info.isPub))) {
            gameInfo.isPub = parseInt(info.isPub);
            if (gameInfo.isPub === 1 && gameInfo.pubTime === 0) {
                gameInfo.pubTime = Blockchain.block.timestamp;
            }

            this.gameInfosMap.set(id, gameInfo);
        }

    },

    //管理员ban游戏 校验	
    //管理员恢复游戏 校验
    banGameInfo: function (info) {
        var from = Blockchain.transaction.from;
        if (!(from === this.admin)) {
            throw new Error('permission denied');
        }

        var gameInfo = this.gameInfosMap.get(info.id);
        if (gameInfo == null) {
            throw new Error("invilid game, it does not exist");
        }

        var isBan = gameInfo.isPub;;
        if (!(isBan === parseInt(info.isPub))) {
            gameInfo.isBan == parseInt(info.isPub);
            this.gameInfosMap.set(info.id, gameInfo);
        }
    },



    //STELLA!!!!!!!!!!
    stella: function () {
        var from = Blockchain.transaction.from;
        if (!(from === this.admin)) {
            throw new Error('permission denied');
        }
        this.stella = 1;
    },

    reborn: function () {
        var from = Blockchain.transaction.from;
        if (!(from === this.admin)) {
            throw new Error('permission denied');
        }
        this.stella = 0;
    },



    _addGameSection: function (gid, id) {
        var gameSections = this.gameSectionsMap.get(gid);

        if (!gameSections) {
            gameSections = [id];
        } else {
            gameSections.push(id);
        }

        this.gameSectionsMap.set(gid, gameSections);
    },

    _deleteGameSection: function (gid, id) {
        var gameSections = this.gameSectionsMap.get(gid);
        if (gameSections && gameSections.length > 0) {
            var key = 0;
            for (key = 0; key < gameSections.length; key++) {
                var tmpid = gameSections[key];
                if (tmpid == id) {
                    break;
                }
            }
            gameSections.splice(key, 1);
        } else {
            gameSections = [];
        }

        this.gameSectionsMap.set(gid, gameSections);
    },

    //添加游戏主信息(信息记录了开始的段落)	
    _addGameSectionInfo: function (id, gid, info) {
        var sectionInfo = {};
        sectionInfo.title = info.title;
        sectionInfo.keyword = info.keyword;
        sectionInfo.sortNum = info.sortNum;
        sectionInfo.gid = gid;

        var sectionContent = {};
        sectionContent.content = info.content;

        this.sectionInfosMap.set(id, sectionInfo);
        this.sectionContentsMap.set(id, sectionContent);
    },



    //设置跳转语句
    _setGameSectionChoices: function (id, jump) {

        this.sectionChoicesMap.set(id, jump);
    },


    //作者添加段落 校验
    addSectionInfo: function (info, jump) {
        var gid = parseInt(info.gid);
        if (!this._checkGameOwner(gid)) {
            throw new Error('you are not the owner of the game');
        }

        if (info.title.length >= this._TitleLimit) {
            throw new Error('Title limit:' + this._TitleLimit + ' words');
        }
        if (info.keyword.length >= this._TitleLimit) {
            throw new Error('keyword limit:' + this._TitleLimit + ' words');
        }
        if (info.content.length >= this._ContentLimit) {
            throw new Error('Content limit:' + this._ContentLimit + ' words');
        }

        //校验jump里面的每一个值的大小
        for (var i = 0; i < jump.length; i++) {
            var choice = jump[i];
            if (choice.desc.length >= this._TitleLimit) {
                throw new Error('Desc limit:' + this._TitleLimit + ' words');
            }
        }


        var id = this._getAid('sectionCnt');

        this._addGameSection(gid, id);
        this._addGameSectionInfo(id, gid, info);
        this._setGameSectionChoices(id, jump);
    },

    _updateGameSectionInfo: function (id, info) {
        var sectionInfo = this.sectionInfosMap.get(id);
        if (!(sectionInfo == null)) {
            sectionInfo.title = info.title;
            sectionInfo.keyword = info.keyword;
            sectionInfo.sortNum = info.sortNum;
            //gid就不用更新了			
            this.sectionInfosMap.set(id, sectionInfo);
        }
        var sectionContent = this.sectionContentsMap.get(id);
        if (!(sectionContent == null)) {
            sectionContent.content = info.content;
            this.sectionContentsMap.set(id, sectionContent);
        }
    },

    _checkSectionOwner: function (gid, id) {
        var from = Blockchain.transaction.from;
        var owner = this.gameKeysMap.get(gid);
        var flag = false;
        if (from === owner) {

            var gameSections = this.gameSectionsMap.get(gid);

            if (this._isInArray(gameSections, id)) {
                flag = true;
            }
        }

        return flag;
    },

    //作者更新段落 校验(段落属于作者)
    updateSectionInfo: function (info, jump) {
        var id = parseInt(info.id);
        var gid = parseInt(info.gid);
        if (!this._checkSectionOwner(gid, id)) {
            throw new Error('you are not the owner of the game');
        }

        if (info.title.length >= this._TitleLimit) {
            throw new Error('Title limit:' + this._TitleLimit + ' words');
        }
        if (info.keyword.length >= this._TitleLimit) {
            throw new Error('keyword limit:' + this._TitleLimit + ' words');
        }
        if (info.content.length >= this._ContentLimit) {
            throw new Error('Content limit:' + this._ContentLimit + ' words');
        }

        //校验jump里面的每一个值的大小
        for (var i = 0; i < jump.length; i++) {
            var choice = jump[i];
            if (choice.desc.length >= this._TitleLimit) {
                throw new Error('Desc limit:' + this._TitleLimit + ' words');
            }
        }

        this._updateGameSectionInfo(id, info);
        this._setGameSectionChoices(id, jump);
    },

    //作者真删除段落 校验
    deleteSectionInfo: function (id) {
        var sectionInfo = this.sectionInfosMap.get(id);
        if (sectionInfo == null) {
            throw new Error("invilid section, it does not exist");
        }
        var gid = sectionInfo.gid;
        id = parseInt(id);
        if (!this._checkSectionOwner(gid, id)) {
            throw new Error('you are not the owner of the game');
        }

        //删除		
        this._deleteGameSection(gid, id);
        this.sectionInfosMap.del(id);
        this.sectionContentsMap.del(id);
        this.sectionChoicesMap.del(id);
    },

    //作者只更新跳转 校验
    updateSectionChoice: function (id, jump) {
        var sectionInfo = this.sectionInfosMap.get(id);
        if (sectionInfo == null) {
            throw new Error("invilid section, it does not exist");
        }
        var gid = sectionInfo.gid;
        id = parseInt(id);
        if (!this._checkSectionOwner(gid, id)) {
            throw new Error('you are not the owner of the game');
        }

        this._setGameSectionChoices(id, jump);
    },

    //作者浏览段落 校验
    getOwnSections: function (gid, param) {
        this._checkStella();
        if (!this._checkGameOwner(gid)) {
            throw new Error('you are not the owner of the game');
        }

        param.records = 0;
        var pagination = new Pagination(param);

        if (!pagination.rows) {
            pagination.rows = this._LIMIT;
        }
        var offset = (pagination.page - 1) * pagination.rows;

        var gameSections = this.gameSectionsMap.get(gid);

        if (gameSections.length == 0) {
            var data = { List: '', Page: pagination }
            return data;
        }


        if (offset > gameSections.length) {
            throw new Error("offset is not valid");
        } else if (offset == gameSections.length) {
            pagination.records = gameSections.length;
            var data = { List: '', Page: pagination }
            return data;
        }


        var games = {};
        if (!this._isInArray(['sortNum'], pagination.sidx)) {
            throw new Error('invilid sortField, it must be sortNum');
        }

        var sections = this._TopNByArray(pagination.sidx, pagination.sord, pagination.rows, offset, gameSections, 'section');
        pagination.records = gameSections.length;
        pagination = new Pagination(pagination);


        var data = { List: sections, Page: pagination }
        return data;

    },


    //作者获得段落信息
    getOwnSection: function (id) {
        this._checkStella();
        var sectionInfo = this.sectionInfosMap.get(id);
        if (sectionInfo == null) {
            throw new Error("invilid section, it does not exist");
        }
        var gid = sectionInfo.gid;
        //mylog('gid', gid);
        id = parseInt(id);
        if (!this._checkSectionOwner(gid, id)) {
            throw new Error('you are not the owner of the game' + 'gid=' + gid);
        }
        var content = this.sectionContentsMap.get(id);
        var sectionChoices = this.sectionChoicesMap.get(id);

        sectionInfo.content = content.content;
        sectionInfo.sectionChoices = sectionChoices;

        return sectionInfo;

    },


    //debug
    getSectionAdmin: function (id) {
        var from = Blockchain.transaction.from;
        if (!(from === this.admin)) {
            throw new Error('permission denied');
        }

        var sectionInfo = this.sectionInfosMap.get(id);
        if (sectionInfo == null) {
            throw new Error("invilid section, it does not exist");
        }

        var content = this.sectionContentsMap.get(id);
        var sectionChoices = this.sectionChoicesMap.get(id);

        sectionInfo.content = content.content;
        sectionInfo.sectionChoices = sectionChoices;

        return sectionInfo;

    },


    //购买的玩家获得段落内容包括跳转 校验 
    getSection: function (id) {
        this._checkStella();
        var sectionInfo = this.sectionInfosMap.get(id);
        if (sectionInfo == null) {
            throw new Error("invilid section, it does not exist");
        }
        var gid = sectionInfo.gid;
        var gameinfo = this.gameInfosMap.get(gid);
        if (gameinfo == null) {
            throw new Error("invilid game, it does not exist");
        }
        if (gameinfo.isPub === 0) {
            throw new Error("Under Maintenance");
        }

        if (gameinfo.cost == 0 || !this._checkUserPayMap(gid)) {
            throw new Error('you do not have this game');
        }
        var content = this.sectionContentsMap.get(id);
        var sectionChoices = this.sectionChoicesMap.get(id);

        sectionInfo.content = content.content;
        sectionInfo.sectionChoices = sectionChoices;

        return sectionInfo;

    },

    getOwnSectionByKeyword: function (info) {
        this._checkStella();

        var gid = parseInt(info.gid);
        var keyword = info.keyword;

        if (!this._checkGameOwner(gid)) {
            throw new Error('you are not the owner of the game');
        }


        var gameinfo = this.gameInfosMap.get(gid);
        if (gameinfo == null) {
            throw new Error("invilid game, it does not exist");
        }


        var gameSections = this.gameSectionsMap.get(gid);
        if (!gameSections) {
            throw new Error('invilid section, it does not exist');
        }

        var id = -1;
        var sectionInfo = null;
        for (var i = 0; i <= gameSections.length; i++) {
            sectionInfo = this.sectionInfosMap.get(gameSections[i]);
            if (keyword == sectionInfo.keyword) {
                id = gameSections[i];
                break;
            }
        }

        if (sectionInfo == null) {
            throw new Error("invilid section, it does not exist");
        }

        var content = this.sectionContentsMap.get(id);
        var sectionChoices = this.sectionChoicesMap.get(id);

        sectionInfo.content = content.content;
        sectionInfo.sectionChoices = sectionChoices;

        return sectionInfo;

    },

    getSectionAdminByKeyword: function (info) {
        var from = Blockchain.transaction.from;
        if (!(from === this.admin)) {
            throw new Error('permission denied');
        }

        var gid = parseInt(info.gid);
        var keyword = info.keyword;

        var gameinfo = this.gameInfosMap.get(gid);
        if (gameinfo == null) {
            throw new Error("invilid game, it does not exist");
        }

        var gameSections = this.gameSectionsMap.get(gid);

        if (!gameSections) {
            throw new Error('invilid section, it does not exist');
        }

        var id = -1;
        var sectionInfo = null;
        for (var i = 0; i <= gameSections.length; i++) {
            sectionInfo = this.sectionInfosMap.get(gameSections[i]);
            if (keyword == sectionInfo.keyword) {
                id = gameSections[i];
                break;
            }
        }

        if (sectionInfo == null) {
            throw new Error("invilid section, it does not exist");
        }

        var content = this.sectionContentsMap.get(id);
        var sectionChoices = this.sectionChoicesMap.get(id);

        sectionInfo.content = content.content;
        sectionInfo.sectionChoices = sectionChoices;

        return sectionInfo;

    },

    getSectionByKeyword: function (info) {
        this._checkStella();
        var gid = parseInt(info.gid);
        var keyword = info.keyword;

        var gameinfo = this.gameInfosMap.get(gid);
        if (gameinfo == null) {
            throw new Error("invilid game, it does not exist");
        }
        if (gameinfo.isPub === 0) {
            throw new Error("Under Maintenance");
        }

        if (gameinfo.cost > 0 && !this._checkUserPayMap(gid)) {
            throw new Error('you do not have this game');
        }


        var gameSections = this.gameSectionsMap.get(gid);

        if (!gameSections) {
            throw new Error('invilid section, it does not exist');
        }

        var id = -1;
        var sectionInfo = null;
        for (var i = 0; i <= gameSections.length; i++) {
            sectionInfo = this.sectionInfosMap.get(gameSections[i]);
            if (keyword == sectionInfo.keyword) {
                id = gameSections[i];
                break;
            }
        }

        //var sectionInfo = this.sectionInfosMap.get(id);
        if (sectionInfo == null) {
            throw new Error("invilid section, it does not exist");
        }


        var content = this.sectionContentsMap.get(id);
        var sectionChoices = this.sectionChoicesMap.get(id);

        sectionInfo.content = content.content;
        sectionInfo.sectionChoices = sectionChoices;

        return sectionInfo;

    },


    //玩家购买和收藏的免费游戏
    getGamesP: function (param) {
        param.records = 0;
        var pagination = new Pagination(param);

        if (!pagination.rows) {
            pagination.rows = this._LIMIT;
        }
        var offset = (pagination.page - 1) * pagination.rows;

        var from = Blockchain.transaction.from;
        var userPay = this.userPayMap.get(from);

        if (userPay == null || userPay.length == 0) {
            var data = { List: '', Page: pagination }
            return data;
        }
        var arrayList = [];
        for (var i = 0; i < userPay.length; i++) {
            var gameInfo = this.gameInfosMap.get(userPay[i]);
            if (gameInfo.isPub == 1) {
                arrayList.push(userPay[i]);
            }
        }

        if (arrayList == null || arrayList.length == 0) {
            var data = { List: '', Page: pagination }
            return data;
        }


        if (offset > arrayList.length) {
            throw new Error("offset is not valid");
        } else if (offset == arrayList.length) {
            pagination.records = arrayList.length;
            var data = { List: '', Page: pagination }
            return data;
        }

        var games = {};
        games = this._GetArray(pagination.sord, pagination.rows, offset, arrayList, 'game');

        pagination.records = arrayList.length;
        pagination = new Pagination(pagination);

        var data = { List: games, Page: pagination }
        return data;

    },

    _addUserPay: function (from, id) {

        //update aPayedMap
        var gamePayed = this.gamePayedMap.get(id);
        if (!gamePayed) {
            gamePayed = [from];
        } else {
            gamePayed.push(from);
        }
        this.gamePayedMap.set(id, gamePayed);

        //update userPayMap
        var userPayed = this.userPayMap.get(from);
        if (!userPayed) {
            userPayed = [id];
        } else {
            userPayed.push(id);
        }
        this.userPayMap.set(from, userPayed);


    },

    //玩家买游戏
    payGame: function (id) {
        if (!id) {
            throw new Error('id is neccessay, please set');
        }

        id = parseInt(id);
        var from = Blockchain.transaction.from;
        var owner = this.gameKeysMap.get(id);
        if (!owner) {
            throw new Error('invilid id, it does not exist')
        }

        //if (from === owner) {
        //    throw new Error('you are the owner of the game')
        //}

        var userPayed = this.userPayMap.get(from);
        if (this._isInArray(userPayed, id)) {
            throw new Error('you have payed for the game before')
        }

        //transfer
        var gameInfo = this.gameInfosMap.get(id);
        var cost = new BigNumber(gameInfo.cost);
        var value = new BigNumber(Blockchain.transaction.value);
        if (value < NAS2WEI(cost)) {
            throw new Error('you payed so little, it must bigger than ' + cost);
        }

        var v2Owner = parseInt(NAS2WEI(cost) * _deduct);
        var v2Admin = value - v2Owner;
        mylog(' owner: ' + owner);
        mylog(' admin: ' + this.admin);
        mylog(value + ' -> ' + v2Admin + ' -> ' + v2Owner);

        var transferO = this._trasaction(owner, v2Owner);
        var transferA = this._trasaction(this.admin, v2Admin);

        if (!(transferO && transferA)) {
            throw new Error('transfer failed' + 'transferO:' + transferO + 'transferA:' + transferA);
        }

        //update gameInfosMap
        var income = gameInfo.income;
        income = income + WEI2NAS(v2Owner);
        gameInfo.income = income;
        this.gameInfosMap.set(id, gameInfo);

        this._addUserPay(from, id);

        return "success";
    },



    //玩家浏览游戏 
    getGames: function (param) {

        param.records = 0;
        var pagination = new Pagination(param);

        if (!pagination.rows) {
            pagination.rows = this._LIMIT;
        }
        var offset = (pagination.page - 1) * pagination.rows;


        //var games = {};
        if (!this._isInArray(['pubTime', 'income', 'likes', 'creTime'], pagination.sidx)) {
            throw new Error('invilid sortField, it must be income or pubTime')
        }


        var pageInfo = this._TopPage(pagination.sidx, pagination.sord, param.title, pagination.rows, offset, 'game');
        pagination.records = pageInfo.records;
        pagination = new Pagination(pagination);
        var games = this._updatePayStatus(pageInfo.games);

        var data = { List: games, Page: pagination }
        return data;



    },

    //玩家收藏游戏  检查是否已存在  检查是否真的免费
    payFreeGame: function (id) {
        if (!id) {
            throw new Error('id is neccessay, please set');
        }

        id = parseInt(id);
        var from = Blockchain.transaction.from;
        var owner = this.gameKeysMap.get(id);
        if (!owner) {
            throw new Error('invilid id, it does not exist')
        }

        //if (from === owner) {
        //    throw new Error('you are the owner of the article')
        //}
        var gameInfo = this.gameInfosMap.get(id);
        var cost = new BigNumber(gameInfo.cost);

        if (cost > 0) {
            throw new Error('this game is not free');
        }

        var userPayed = this.userPayMap.get(from);
        if (this._isInArray(userPayed, id)) {
            throw new Error('you have this game before')
        }

        this._addUserPay(from, id);
        return "success";
    },


    //校验游戏是否在玩家付费名单里
    _checkUserPayMap: function (id) {

        var from = Blockchain.transaction.from;
        var userPay = this.userPayMap.get(from);

        var flag = false;
        id = parseInt(id);
        if (userPay && (this._isInArray(userPay, id))) {
            flag = true;
        }
        return flag;
    },

    _checkStella: function () {
        var from = Blockchain.transaction.from;
        if (this.stella == 1 && !(from === this.admin)) {
            throw new Error('something happens')
        }
    },



    //获得游戏详细信息
    getGameInfo: function (id) {
        this._checkStella();

        var gameInfo = this.gameInfosMap.get(id);
        if (gameInfo.pubTime === 0) {
            throw new Error('access deneyed');
        }
        //添加是否已经购买
        if (this._checkUserPayMap(id)) {
            gameInfo.pay = 1;
        } else {
            gameInfo.pay = 0;
        }

        //添加是否已经评论
        var from = Blockchain.transaction.from;
        var gameCommentUser = this.gameCommentUserMap.get(id);
        if (this._isInArray(gameCommentUser, from)) {
            gameInfo.isComment = 1;
        }
        else {
            gameInfo.isComment = 0;
        }


        return gameInfo;
    },



    //添加游戏主信息(信息记录了开始的要跳转的章节)	
    _addCommentInfo: function (id, info) {
        var commentInfo = {};
        commentInfo.content = info.content;
        commentInfo.creTime = Blockchain.block.timestamp;
        commentInfo.like = info.like;
        commentInfo.dislike = info.dislike;
        commentInfo.author = Blockchain.transaction.from;

        this.allCommentMap.set(id, commentInfo);
    },

    _addGameCommentId: function (gid, id) {

        var gameComment = this.gameCommentMap.get(gid);
        if (!gameComment) {
            gameComment = [id];
        } else {
            gameComment.push(id);
        }
        this.gameCommentMap.set(gid, gameComment);



        var from = Blockchain.transaction.from;
        var gameCommentUser = this.gameCommentUserMap.get(gid);
        if (!gameCommentUser) {
            gameCommentUser = [from];
        } else {
            gameCommentUser.push(from);
        }

        this.gameCommentUserMap.set(gid, gameCommentUser);
    },

    //玩家对游戏进行评论(只能一次) 校验
    addCommentInfo: function (info) {
        var gid = parseInt(info.gid);
        //gid = parseInt(gid);
        if (!this._checkUserPayMap(gid)) {
            throw new Error('you do not have this game');
        }
        var from = Blockchain.transaction.from;
        var gameCommentUser = this.gameCommentUserMap.get(gid);
        if (this._isInArray(gameCommentUser, from)) {
            throw new Error('you have commented before')
        }

        var gameInfo = this.gameInfosMap.get(gid);
        if (gameInfo == null) {
            throw new Error("invilid game, it does not exist");
        }


        if (info.content.length >= this._DescLimit) {
            throw new Error('Content limit:' + this._DescLimit + ' words');
        }


        var id = this._getAid('commentCnt');
        this._addGameCommentId(gid, id);
        this._addCommentInfo(id, info);

        if (info.like > 0 && info.dislike == 0) {
            gameInfo.likes = gameInfo.likes + 1;
        }
        else if (info.dislike > 0 && info.like == 0) {
            gameInfo.dislikes = gameInfo.dislikes + 1;
        }
        this.gameInfosMap.set(gid, gameInfo);

        return "success";
    },

    //读取一个游戏下方玩家评论
    getGameComments: function (param) {
        this._checkStella();
        param.records = 0;
        var pagination = new Pagination(param);

        if (!pagination.rows) {
            pagination.rows = this._LIMIT;
        }
        var offset = (pagination.page - 1) * pagination.rows;

        //var from = Blockchain.transaction.from;
        var gameComment = this.gameCommentMap.get(param.id);

        if (gameComment.length == 0) {
            var data = { List: '', Page: pagination }
            return data;
        }


        if (offset > gameComment.length) {
            throw new Error("offset is not valid");
        } else if (offset == gameComment.length) {
            pagination.records = gameComment.length;
            var data = { List: '', Page: pagination }
            return data;
        }

        var games = {};
        games = this._GetArray(pagination.sord, pagination.rows, offset, gameComment, 'comment');
        pagination.records = gameComment.length;
        pagination = new Pagination(pagination);

        var data = { List: games, Page: pagination }
        return data;


    },

    _getMinInfo: function (rankMap, funcW) {
        var rankKey = Object.keys(rankMap).sort(
            function (a, b) {
                return funcW(rankMap[a]) - funcW(rankMap[b]);
            }
        );

        var kMin = rankKey[0];
        var wMin = funcW(rankMap[kMin]);
        return [wMin, kMin]
    },

    _getMInfo: function (rankMap, funcW, sord) {
        var rankKey = Object.keys(rankMap).sort(
            function (a, b) {
                if (sord == 'desc') {
                    return funcW(rankMap[a]) - funcW(rankMap[b]);
                } else {
                    return funcW(rankMap[b]) - funcW(rankMap[a]);
                }

            }
        );

        var kMin = rankKey[0];
        var wMin = funcW(rankMap[kMin]);
        return [wMin, kMin]
    },


    _sort: function (rankMap, funcW, N, offset, sord) {
        var result = [];
        var rankKey = Object.keys(rankMap).sort(
            function (a, b) {
                if (sord == 'desc') {
                    return funcW(rankMap[a]) - funcW(rankMap[b]);
                } else {
                    return funcW(rankMap[b]) - funcW(rankMap[a]);
                }
            }
        );


        var total = N + offset;
        if (offset < rankKey.length) {
            //for (var i = rankKey.length - 1; i >= offset; i--) {
            for (var i = rankKey.length - 1 - offset; i > -1; i--) {
                var id = rankKey[i];
                var info = rankMap[id];
                info.id = id;
                result.push(info);
            }
        }


        return result;
    },


    _rankN: function (rankMap, info, key, funcW, N, randCnt, wMin, kMin) {
        var weight = funcW(info);
        weight = parseInt(weight);

        if (randCnt < N) {
            randCnt++;
            rankMap[key] = info;
            if (randCnt === N) {
                var tmp = this._getMinInfo(rankMap, funcW);
                wMin = tmp[0];
                kMin = tmp[1];
            }
        } else {
            if ((weight > wMin) && (!rankMap[key])) {
                rankMap[key] = info;
                //用delete而不是替换是为了在后面排序直接返回key
                delete rankMap[kMin];
                var tmp = this._getMinInfo(rankMap, funcW);
                wMin = tmp[0];
                kMin = tmp[1];
            }
        }

        return [rankMap, randCnt, wMin, kMin]
    },


    _rankPage: function (rankMap, info, key, funcW, N, offset, randCnt, wMin, kMin, sortField, sord) {
        var weight = funcW(info);
        if (sortField != 'income') {
            weight = parseInt(weight);
        }
        var total = N + offset

        if (randCnt < total) {
            randCnt++;
            rankMap[key] = info;
            if (randCnt === total) {
                var tmp = this._getMInfo(rankMap, funcW, sord);
                wMin = tmp[0];
                kMin = tmp[1];
            }
        } else {
            if ((((weight > wMin) && (sord == 'desc')) || ((weight < wMin) && (sord == 'asc'))) && (!rankMap[key])) {
                rankMap[key] = info;
                //用delete而不是替换是为了在后面排序直接返回key
                delete rankMap[kMin];
                var tmp = this._getMInfo(rankMap, funcW, sord);
                wMin = tmp[0];
                kMin = tmp[1];
            }
        }

        return [rankMap, randCnt, wMin, kMin]
    },


    _TopPage: function (sortField, sord, title, N, offset, mapFlag) {
        var Cnt = 0;
        var total = 0;
        if (mapFlag == 'game') {
            Cnt = this.cntMap.get('gameCnt');
        } else if (mapFlag == 'section') {
            Cnt = this.cntMap.get('sectionCnt');
        } else if (mapFlag == 'comment') {
            Cnt = this.cntMap.get('commentCnt');
        }

        var randCnt = 0;
        var rankMap = {};
        var wMin = 0;
        var kMin = '';

        var getW = function (info) {
            return info[sortField];
        }

        for (var key = 1; key <= Cnt; key++) {
            var info = {};
            if (mapFlag == 'game') {
                info = this.gameInfosMap.get(key);
            } else if (mapFlag == 'section') {
                info = this.sectionInfosMap.get(key);
            } else if (mapFlag == 'comment') {
                info = this.allCommentMap.get(key);
            }
            if (info.isBan != null && info.isBan != 1 && info.title.indexOf(title) > -1 && info.isPub == 1) {
                total++;
                var tmp = this._rankPage(rankMap, info, key, getW, N, offset, randCnt, wMin, kMin, sortField, sord);
                rankMap = tmp[0];
                randCnt = tmp[1];
                wMin = tmp[2];
                kMin = tmp[3];
            }
        }

        var rankList = this._sortByArray(rankMap, getW, N, offset, sord);
        return { records: total, games: rankList };
    },

    _sortByArray: function (rankMap, funcW, N, offset, sord) {
        var result = [];
        var rankKey = Object.keys(rankMap).sort(
            function (a, b) {
                if (sord == 'desc') {
                    return funcW(rankMap[a]) - funcW(rankMap[b]);
                } else {
                    return funcW(rankMap[b]) - funcW(rankMap[a]);
                }
            }
        );

        var total = N + offset;
        if (offset < rankKey.length) {

            for (var i = rankKey.length - 1 - offset; i > -1; i--) {
                var id = rankKey[i];
                var info = rankMap[id];
                info.id = id;
                result.push(info);
            }
        }

        return result;
    },


    _rankNByArray: function (rankMap, info, key, funcW, N, offset, randCnt, wMin, kMin, sortField, sord) {
        var weight = funcW(info);
        if (sortField != 'income') {
            weight = parseInt(weight);
        }
        var total = N + offset

        if (randCnt < total) {
            randCnt++;
            rankMap[key] = info;
            if (randCnt === total) {
                var tmp = this._getMInfo(rankMap, funcW, sord);
                wMin = tmp[0];
                kMin = tmp[1];
            }
        } else {
            if ((((weight > wMin) && (sord == 'desc')) || ((weight < wMin) && (sord == 'asc'))) && (!rankMap[key])) {
                rankMap[key] = info;
                //用delete而不是替换是为了在后面排序直接返回key
                delete rankMap[kMin];
                var tmp = this._getMInfo(rankMap, funcW, sord);
                wMin = tmp[0];
                kMin = tmp[1];
            }
        }

        return [rankMap, randCnt, wMin, kMin]
    },

    _TopNByArray: function (sortField, sord, N, offset, arrayTmp, mapFlag) {
        var Cnt = arrayTmp.length;
        var randCnt = 0;
        var rankMap = {};
        var wMin = 0;
        var kMin = '';

        var getW = function (info) {
            return info[sortField];
        }

        for (var key = 0; key < Cnt; key++) {

            var info = {};
            if (mapFlag == 'game') {
                info = this.gameInfosMap.get(arrayTmp[key]);
            } else if (mapFlag == 'section') {
                info = this.sectionInfosMap.get(arrayTmp[key]);
            } else if (mapFlag == 'comment') {
                info = this.allCommentMap.get(arrayTmp[key]);
            }

            var tmp = this._rankNByArray(rankMap, info, arrayTmp[key], getW, N, offset, randCnt, wMin, kMin, sortField, sord);
            rankMap = tmp[0];
            randCnt = tmp[1];
            wMin = tmp[2];
            kMin = tmp[3];
        }

        var rankList = this._sortByArray(rankMap, getW, N, offset, sord);
        return rankList;
    },

    _GetArray: function (sord, N, offset, arrayTmp, mapFlag) {
        var Cnt = arrayTmp.length;
        var randCnt = 0;
        var rankList = [];


        var total = N + offset;
        if (total > Cnt) {
            total = Cnt;
        }


        for (var key = offset; key < total; key++) {

            var info = {};
            var num = key;
            if (sord == 'desc') {
                num = Cnt - 1 - key;
            }


            if (mapFlag == 'game') {
                info = this.gameInfosMap.get(arrayTmp[num]);
            } else if (mapFlag == 'section') {
                info = this.sectionInfosMap.get(arrayTmp[num]);
            } else if (mapFlag == 'comment') {
                info = this.allCommentMap.get(arrayTmp[num]);
            }
            info.id = arrayTmp[num];
            rankList.push(info);
        }

        return rankList;
    },


    _trasaction: function (to, value) {
        var result = Blockchain.transfer(to, value);
        return result;
    },


    _updatePayStatus: function (games) {
        var from = Blockchain.transaction.from;
        var gidPay = this.userPayMap.get(from);
        mylog('gidPay', gidPay);
        for (var i = games.length - 1; i > -1; i--) {
            var id = parseInt(games[i].id);
            var pay = 0;
            mylog('id', id);
            if (this._isInArray(gidPay, id)) {
                pay = 1;
            } else if (from === this.gameKeysMap.get(id)) {
                pay = 1;
            }
            mylog('pay', pay);

            games[i].pay = pay;
            //if (pay === 0) {
            //    delete games[i]['url'];
            //}
        }
        mylog('games', games);
        return games;
    },

    /***************debug**********************/
    setTitleLimit: function (limit) {
        if (this._checkAdmin()) {
            this._TitleLimit = parseInt(limit);
        }
        else {
            throw new Error('permission denied');
        }
    },
    setDescLimit: function (limit) {
        if (this._checkAdmin()) {
            this._DescLimit = parseInt(limit);
        }
        else {
            throw new Error('permission denied');
        }
    },
    setContentLimit: function (limit) {
        if (this._checkAdmin()) {
            this._ContentLimit = parseInt(limit);
        }
        else {
            throw new Error('permission denied');
        }
    },
    getgameKeysMap: function (key) {
        if (this._checkAdmin()) {
            return this.gameKeysMap.get(key);
        }
        else {
            throw new Error('permission denied');
        }
    },
    getgamePayedMap: function (key) {
        if (this._checkAdmin()) {
            return this.gamePayedMap.get(key);
        }
        else {
            throw new Error('permission denied');
        }
    },
    getuserPubMap: function (key) {
        if (this._checkAdmin()) {
            return this.userPubMap.get(key);
        }
        else {
            throw new Error('permission denied');
        }
    },
    getuserPayMap: function (key) {
        if (this._checkAdmin()) {
            return this.userPayMap.get(key);
        }
        else {
            throw new Error('permission denied');
        }
    },
    getgameInfosMap: function (key) {
        if (this._checkAdmin()) {
            return this.gameInfosMap.get(key);
        }
        else {
            throw new Error('permission denied');
        }
    },
    getgameSectionsMap: function (key) {
        if (this._checkAdmin()) {
            return this.gameSectionsMap.get(key);
        }
        else {
            throw new Error('permission denied');
        }
    },
    getsectionInfosMap: function (key) {
        if (this._checkAdmin()) {
            return this.sectionInfosMap.get(key);
        }
        else {
            throw new Error('permission denied');
        }
    },
    getsectionContentsMap: function (key) {
        if (this._checkAdmin()) {
            return this.sectionContentsMap.get(key);
        }
        else {
            throw new Error('permission denied');
        }
    },
    getsectionChoicesMap: function (key) {
        if (this._checkAdmin()) {
            return this.sectionChoicesMap.get(key);
        }
        else {
            throw new Error('permission denied');
        }
    },
    getgameCommentMap: function (key) {
        if (this._checkAdmin()) {
            return this.gameCommentMap.get(key);
        }
        else {
            throw new Error('permission denied');
        }
    },
    getgameCommentUserMap: function (key) {
        if (this._checkAdmin()) {
            return this.gameCommentUserMap.get(key);
        }
        else {
            throw new Error('permission denied');
        }
    },
    getallCommentMap: function (key) {
        if (this._checkAdmin()) {
            return this.allCommentMap.get(key);
        }
        else {
            throw new Error('permission denied');
        }
    },
    getcntMap: function () {
        if (this._checkAdmin()) {
            var cntstring = this.cntMap.get("gameCnt") + " " + this.cntMap.get("sectionCnt") + " " + this.cntMap.get("commentCnt");
            return cntstring;
        }
        else {
            throw new Error('permission denied');
        }
    }
    /***************debug**********************/


}

module.exports = AvgSystem;
