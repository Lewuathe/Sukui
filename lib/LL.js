var LL = {};


LL.confirmAccount = function(id,pass,response){
    chrome.extension.sendRequest(account.getLLID()
				 ,{ msg : "syncAccount" , id : id , password : pass, point : 0}
				 , response);
}

LL.getPoint = function(id,pass,point,response){
    chrome.extension.sendRequest(account.getLLID()
				 ,{msg : "pointAccount" , id : id , password : pass, point : point}
				 , response);
}


