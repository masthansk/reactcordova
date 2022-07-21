const express = require('express');
const app = express();
var fs = require("fs");
var cors = require('cors');

app.use(express.json());
app.use(cors());
 
app.get('/agency',cors(), function(req, res){
  res.set('Access-Control-Allow-Origin', '*');
  res.sendFile(__dirname + '/data.json');
});



 
app.get('/search/:predictiveSearch', function(req, res) {
    
    var seartxt = req.params.predictiveSearch ? req.params.predictiveSearch : "";
    seartxt = seartxt.split("=")[1];
    var ressearch = [];
    var resObj = {
            result:[],
            isSuccess:true,
            msg:""
        };
        if(seartxt != undefined || seartxt != ""){
            fs.readFile( __dirname + "/" + "data.json", 'utf8', function (err, data) {
                data = JSON.parse( data );
                ressearch = [];
                 data.agency.prospect.rankingObject.filter(function(item){   
                    if(item.agentName.indexOf(seartxt)  > -1 || item.agentCode.indexOf(seartxt) > -1){
                        ressearch.push(item);
                     }
                }); 
                if(ressearch.length >0){
                    resObj.result = ressearch;
                    resObj.isSuccess = true;
                    resObj.msg = "Success"
                }else{
                    resObj.result = [];
                    resObj.isSuccess = false;
                    resObj.msg = ""
                }
                res.send( resObj);
             });
        }
        
});
 
app.listen(3001, () => {
  console.log('Our express server is up on port 3001');
});