var account = {};



account.init = function(){
    var initList = { num : 0 , currentID : null, LLID : null}; 
    localStorage["KingyoAccountList"] = JSON.stringify(initList);
}

account.pointResponse = function(res){
    if(res["msg"] ==  "pointOK"){
	chrome.tabs.getSelected(null,function(tab){
	    var updateProperties = {url : "sukui.html", selected : true};
	    chrome.tabs.update(tab.id,updateProperties,null);
	})
    }
    else{
	alert("Your point is not sufficient.");
	return false;

    }
}

account.setLLID = function(LLID){
    var accountList = JSON.parse(localStorage["KingyoAccountList"]);
    accountList.LLID = LLID;
    localStorage["KingyoAccountList"] = JSON.stringify(accountList);
}

account.getLLID = function(){
    var accountList = JSON.parse(localStorage["KingyoAccountList"]);
    return accountList.LLID;
}

account.sendPointRequest = function(cost){
    var accountList = JSON.parse(localStorage["KingyoAccountList"]);
    var currentAccount = accountList[accountList["currentID"]];
    var id = currentAccount["id"];
    var pass = currentAccount["password"];

    LL.getPoint(id,pass,cost,account.pointResponse);
}

account.accountNum = function(){
    var accountList = JSON.parse(localStorage["KingyoAccountList"]);
    return accountList["num"];
}

account.getNameOfCurrentAccount = function(){
    var accountList = JSON.parse(localStorage["KingyoAccountList"]);
    return accountList["currentID"];
}

account.addAccount = function(id, pass){
    var accountList = JSON.parse(localStorage["KingyoAccountList"]);
    if(accountList[id] || id == 'num' || id == 'currentID'){
	alert("This username has already been used.");
	return false;
    }
    var addedAccount = {
	id : id,
	password : pass,
	kingyoNum : 0,
	kingyoList : {}
    };
    accountList[id] = addedAccount;
    accountList["currentID"] = id;
    accountList["num"]++;
    localStorage["KingyoAccountList"] = JSON.stringify(accountList);
}

account.addKingyo = function(kingyo){
    var accountList = JSON.parse(localStorage["KingyoAccountList"]);
    var currentID = accountList["currentID"];
    var currentAccount = accountList[currentID];

    var kingyoList = currentAccount["kingyoList"];

    kingyoList[currentAccount["kingyoNum"]++] = kingyo;
    localStorage["KingyoAccountList"] = JSON.stringify(accountList);
}

account.changeCurrentAccount = function(id,pass){
    var accountList = JSON.parse(localStorage["KingyoAccountList"]);
    var requiredAccount = accountList[id];
    if(requiredAccount["password"] != pass){
	alert("Your password is incorrect");
	return false;
    }
    else{
	accountList["currentID"] = id;
	localStorage["KingyoAccountList"] = JSON.stringify(accountList);
    }
}


account.removeAccount = function(id,pass){
    var accountList = JSON.parse(localStroge["KingyoAccountList"]);
    var requiredStorage = accountList[id];
    if(requiredStorage["password"] != pass){
	alert("Your password is incorrect");
	return false;
    }
    else{
	accountList[id] = null;
	localStorage["KingyoAccountList"] = JSON.stringify(accountList);
    }
}

