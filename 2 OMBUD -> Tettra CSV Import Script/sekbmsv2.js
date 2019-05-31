/* 
SE KnowledgeBase Migration Script


This code takes an input from a OMBUD CSV Export, parses it into a csvcsvData json object.
It then loops through each article in the CSV, doing the following:
a) Pulls out the title, body HTML and OMBUD Section Name
b) It matches the OMBUD Section Name with the new Category ID and stamps it to categoryChecked
c) It then formats the article in JSON for the required API
d) It HTTP POSTs the processed articles to the new system
*/

//Pull in Packages

const csv=require('csvtojson')
const axios = require('axios')
const fs = require('fs');

//Define API Key (from Tettra Integration Settings)
var apiKey = "4721c2d7772fcb51a33e2e1709092a4b42deb13f536e7584ca22ca856e1b59a17260582bf7825a9f";


//SET THE CSV FILE PATH

const csvFilePath='Integrations.csv'

//Complete the CSVtoJSON Conversion (requries csvtojson https://www.npmjs.com/package/csvtojson)
csv()
.fromFile(csvFilePath)
.then((csvData)=>{
  var articleCount = csvData.length;
  console.log('\nNumber of Rows Imported from ' + csvFilePath + ' = '+ articleCount+'\nBeginning upload to Tettra')
  //console.log(csvData)


//Loops through csvData
  for(var i=0; i<articleCount; i++)
  {
    var row = csvData[i];

    var articleContent = {
      title : row['Entry Question'],
      body: row['Response'],
      category : row['Section Name']

    }

    var rowNumber=i+2;

    if(!articleContent.title){
      console.log('\nSkipping row ' + rowNumber + ', Title was undefined')
    }
    else if(!articleContent.body){
      console.log('\nSkipping row ' + rowNumber + ', Body was undefined')
    }
    else if(!articleContent.category){
      console.log('\nSkipping row ' + rowNumber + ', Category was undefined')
    }
    else{
      var tettraArticle = {api_key: apiKey,
      title : articleContent.title,
      body : articleContent.body,
      category_id : 161417
      }

      console.log('\n' + articleContent.title + ' is being sent to Tettra.')
   

      axios.post('https://app.tettra.co/api/teams/40043/pages',tettraArticle)
        .then(response => {
          console.log('\nTettra article created at ' +response.data.pageUrl);
          }
        )
        .catch(err => {
          console.log('Writing ' + err.data + ' to errorlog.txt')
          var data = err.data;
          fs.writeFile('errorlog.txt', data, function(err, data){
              console.log("Error written to errorlog.txt.");
          });//end of error fs.writefile call
        })//end of .catch(err)


    }//end of else
    

  }//End of For Loop




});//end of CSV parsing function/scope