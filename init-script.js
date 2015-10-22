//TODO: push in all the history data

var config = require('config');
var MongoClient = require('mongodb').MongoClient;

var data = require('./db/2014/catchshoot.json');

var headers = data.resultSets[0].headers;
var type = data.parameters;
type.DataType = data.resultSets[0].name;

// console.log(type);
var perfromace = data.resultSets[0].rowSet;

// console.log(perfromace.length)
MongoClient.connect(config.get('db.url'), function(err, db) {
  if(err) { return console.dir(err); }
  var collection = db.collection('playertracking');

  perfromace.forEach(function(element){
    var record = {};
    record.parameters = type;
    for (index=0; index < headers.length;index++){
      var key = headers[index];
      var value = element[index];
      record[key] = value;
    }
    collection.insert(record, function(err, result){
      if(err){console.log('ohhhh')}
        console.log('yeeee')
    });
  });
});
