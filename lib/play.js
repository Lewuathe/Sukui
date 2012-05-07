var play = {};

$(function(){
    play.init();
    $("#challenge").click(play.challenge);
});

play.cost = 5;

play.init = function(){
    if(account.accountNum() == 0){
	$("div#account").html("Please make your own account that is similar to your LowLoading account.");
    }
    else{
	var currentID = account.getNameOfCurrentAccount();
	$("div#account").html("Current Username : "+ currentID);
    }
}

play.challenge = function(){
    account.sendPointRequest(play.cost);
}

play.alert = function(){
    alert("Play alert");
}

