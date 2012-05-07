var options = {};


$(function(){
    options.init();
    kingyo.threeStart();
    $("#register").click(options.registerAccount);
    $("div#account").delegate("#changeAccount","click",options.changeAccount);
    $("div#account").delegate("#changeAccountSubmit","click",options.changeAccountSubmit);
    $("div#account").delegate("#addAccount","click",options.addAccount);
});

options.init = function(){
    if(account.accountNum() == 0){
	$("div#account").html("Username : <input type='text' size='30' id='registeredID'/>Password : <input type='password' size='30' id='registeredPass'/>Confirm : <input type='password' size='30'id='registeredPassConfirm'/><br><div id='explanation'>If you don't have any account, please make your own account.</div><input type='text' id='LLID'  size='50'/><input type='button' value='Register' id='register'/>");
    }
    else{
	var currentID = account.getNameOfCurrentAccount();
	$("div#account").html("Current Username : "+ currentID + "<br><input type='button' value='Chanege Account' id='changeAccount' /><input type='button' value='Add Account' id='addAccount' />");    
    }
}

options.registerAccount = function(){
    var id = $("#registeredID").val();
    var pass = $("#registeredPass").val();
    account.setLLID($("#LLID").val());
    if(!id || !pass){
	alert("Please input your username and password!");
	return false;
    }
    var confirm_pass = $("#registeredPassConfirm").val();
    if(pass != confirm_pass){
	alert("Please your password");
	return false;
    }
    else{
	LL.confirmAccount(id,pass,options.response(id,pass));
    }
}

options.response = function(id,pass){
    return function(res){
	if(res['msg'] == "confirmOK"){
	    account.addAccount(id,pass);
	    chrome.tabs.getSelected(null,options.reload);
	}
	else{
	    alert("Confirm Error");
	}
    }
}


options.changeAccount = function(){
    $("div#account").html("Username :<input type='text' size='30' id='changeWithID' /> Password :<input type='password' size='30' id='changeWithPass'/><br><input type='button' value='change' id='changeAccountSubmit'/> Please input your username and password.");
}

options.changeAccountSubmit = function(){
    var id = $("#changeWithID").val();
    var pass = $("#changeWithPass").val();
    if(!id || !pass){
	alert("Please input your password");
	return false;
    }
    if(account.changeCurrentAccount(id,pass)){
	$("div#account").html("アカウントを"+id+"に変更しました");
    }
    chrome.tabs.getSelected(null,options.reload);
}

options.addAccount = function(){
    $("div#account").html("Username : <input type='text' size='30' id='registeredID'/>Password : <input type='password' size='30' id='registeredPass'/>Confirm : <input type='password' size='30'id='registeredPassConfirm'/><br><div id='explanation'>If you don't have any account, please make your own account.</div><input type='button' value='Register' id='register'/>");
    $("#register").click(options.registerAccount);
}


options.reload = function(tab){
    var tabURL = tab.url;
    var tabID = tab.id;
    var updateProperties = {url : tabURL , selected : true};
    chrome.tabs.update(tabID,updateProperties,null);
}

options.changeToSetting = function(){
    $(".setting-contents").css("visibility","visible");
    $(".information-contents").css("visibility","hidden");
}

options.changeToInformation = function(){
    $(".setting-contents").css("visibility","hidden");
    $(".information-contents").css("visibility","visible");
}