const { render } = require("ejs");
const workDataModel = require("../models/workData")
const languageDataModel = require("../models/languageData");

const workController = {
    postlanguage: (req, res) => {
        var arr = {"job_L_class": req.body.job_L_class,"area": req.body.area};
        var results = [];
        var Languagelist = req.session.languages;
        var ALLlanguage = [];
        for(var i = 0; i < Languagelist.length; i++){
            ALLlanguage.push(Languagelist[i]+"聽");
            ALLlanguage.push(Languagelist[i]+"說");
            ALLlanguage.push(Languagelist[i]+"讀");
            ALLlanguage.push(Languagelist[i]+"寫");
        }


        var flag = false;
        function fetchData(index) {
            return new Promise((resolve, reject) => {
              languageDataModel.postlanguage(arr, ALLlanguage[index], (err, tmpresults) => {
                if (err) {
                  flag = true;
                  console.log(err);
                }
                if (tmpresults && tmpresults.length > 0) {
                  results.push({ "language":lanName[index] ,"job_count":tmpresults[0][lanName[index]] });
                  // console.log("results", results[index] );
                }
                resolve();
              });
            });
          }
        
          // 使用 async/await 处理异步操作
          async function processResults() {
            for (let i = 0; i < ALLlanguage.length; i++) {
              await fetchData(i);
            }
        
            // console.log("results", results[0]);
            // results.sort((a, b) => b.job_count - a.job_count);
            var cnt = 3, i = 0, bestarr = [];
            while(cnt--){
                if(results[i].language == '不拘'){
                  i++;
                }
                bestarr.push(results[i].language)
                i++;
            }
            console.log(bestarr);
            req.session.languages = bestarr;
            if (!flag) {
              if (results && results.length > 0) {
                console.log(results);
                res.render('language', {
                  data: results
                });
              } else {
                res.render('NoDb');
              }
            }
          }
          
          processResults();
          
        

    }
}

module.exports = workController