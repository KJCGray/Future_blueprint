const { render } = require("ejs");
const workDataModel = require("../models/workData")
const languageDataModel = require("../models/languageData");
const skillDataModel = require("../models/skillData");

const workController = {
    postALLlanguage:(req, res) => { //回傳需要的前三個語言的聽說讀寫分別要什麼程度    
        var arr = {"job_L_class": req.session.job_L_class,"area": req.session.area, "job_type": req.session.job_type};
        var bestlist = req.session.languages;
        var bestName = [];
        for(var i = 0; i < bestlist.length; i++){
            bestName.push(bestlist[i]+"聽");
            bestName.push(bestlist[i]+"說");
            bestName.push(bestlist[i]+"讀");
            bestName.push(bestlist[i]+"寫");
        }
        var results = [];
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
              res.json(results)
              // res.render('language', {
              //   data: results
              // });
            } else {
              res.render('NoDb');
            }
          }
        }
        
        processResults();
        
    },
    postSkill:(req, res) => {
      function processProperty(property) {
        if (Array.isArray(req.body[property])) {
          return req.body[property].join(',');
        } else if (typeof req.body[property] === 'string') {
          return req.body[property];
        }
        return '';
      }
      
      var tmpJobClass = processProperty('job_L_class').split(',');
      var tmpJobType = processProperty('job_type').split(',');
      var tmpArea = processProperty('area').split(',');

      var arr = {"job_L_class": tmpJobClass, "job_type": tmpJobType, "area": tmpArea};
      skillDataModel.post(arr, (err, results) =>{
        if (err) console.log(err);
        else{
          var cntMap = {};
          for (var i = 0; i < results.length; i++) {
            var tmpstr = results[i]['job_skill'].split(',');
            for (var j = 0; j < tmpstr.length; j++) {
              if (cntMap.hasOwnProperty(tmpstr[j])) {
                cntMap[tmpstr[j]]++;
              } else {
                cntMap[tmpstr[j]] = 1;
              }
            }
          }
          var cntArray = [];
          for (var skill in cntMap) {
            cntArray.push({ skill: skill, count: cntMap[skill] });
          }
          // 根據技能計數排序陣列
          cntArray.sort(function (a, b) {
            return b.count - a.count; // 以降序排序
          });
          res.json(cntArray);
        }
      })

    },
    postMessage:(req, res) => {

    },
    InsertMessage:(req, res) => {
      
    },
}

module.exports = workController