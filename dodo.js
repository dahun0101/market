var arr = [aaa,bbb,ccc];
var aaa_data =new Array();
var bbb_data =new Array();
var ccc_data =new Array();

for(var i in arr){
	arr[i]+"_data" = 1;
}

console.log(aaa_data);