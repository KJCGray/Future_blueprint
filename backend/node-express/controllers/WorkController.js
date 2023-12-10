const { render } = require("ejs");
const workDataModel = require("../models/workData")
const languageDataModel = require("../models/languageData");

const workController = {
  postALLlanguage:(req, res) => { //回傳需要的前三個語言的聽說讀寫分別要什麼程度    
    var arr = {"job_L_class": req.session.job_L_class,"area": req.session.area};
    var bestlist = req.session.languages;
    var bestName = [];
    for(var i = 0; i < bestlist.length; i++){
        bestName.push(bestlist[i]+"聽");
        bestName.push(bestlist[i]+"說");
        bestName.push(bestlist[i]+"讀");
        bestName.push(bestlist[i]+"寫");
    }
    var results = [];
    // req.session.job_L_class = req.body.job_L_class;
    // req.session.area = req.body.area;
    var flag = false;
    function fetchData(index) {
      return new Promise((resolve, reject) => {
        languageDataModel.postALLlanguage(arr, bestName[index], (err, tmpresults) => {
          if (err) {
            flag = true;
            console.log(err);
          }
          if (tmpresults && tmpresults.length > 0) {
            results.push({ "language":bestName[index] ,"Label":tmpresults[0][bestName[index]],"job_count":tmpresults[0]['CNT'] });
            console.log("results", results );
          }
          resolve();
        });
      });
    }
  
    // 使用 async/await 处理异步操作
    async function processResults() {
      for (let i = 0; i < bestName.length; i++) {
        await fetchData(i);
      }
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
    
  },
  postSkill:(req, res) => {

  }
}

module.exports = workController