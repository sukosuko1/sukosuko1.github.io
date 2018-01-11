"use strict";

var AWS = require("aws-sdk");

AWS.config.update({
	region:"us-west-2",
	endpoint:"https://dynamodb.us-west-2.amazonaws.com"
	}
);

var secretAwsId = process.env.AYAID;
var secretAwsKey = process.env.AYAKEY;

var docClient = new AWS.DynamoDB.DocumentClient();

var datatable = "jsondata";
var datauser = "sukosuko1";
//var key = "key" + Math.floor(Math.random() * 1000);
var datakey = "keytest2";

var datajson = {"imagesrc" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT24Cb5-cQZNdQBid1Rw7pvR_Jvq21w2LePDt5mwKB0CKb4uhIwnQ",
			   "title":"my second not as cool webpage"};


var params = {
	TableName:datatable,
	Item: {
		"user":datauser,
		"key":datakey,
		"info": datajson
	}
}

console.log("adding a new item..");
docClient.put(params, function(err,data) {
	if (err){
		console.error("Unablet o add item:", JSON.stringify(err,null,2));
	} else {
		console.log("added:", JSON.stringify(data,null,2));
	}
});


