$(function(){
    $("#addKingyo").click(add({name : "Deme", size : 16}));
});

function add(kingyo){
    return function(){
	account.addKingyo(kingyo);
    }
}