const { render } = require("ejs");
const workDataModel = require("../models/workData")
const languageDataModel = require("../models/languageData");

const lanName = ["英文", "越文", "日文", "中文", "西班牙文", "泰文", "菲律賓文", "韓文", "其他外文", "不拘" ]

const homeController = {
    post: (req, res) => {
        var str = Array.isArray(req.body.job_L_class) ? req.body.job_L_class.join(',') : req.body.job_L_class;
        var tmpJobClass = str.split(',');
        str = Array.isArray(req.body.job_type) ? req.body.job_type.join(',') : req.body.job_type;
        var tmpJobType = str.split(',');
        str = Array.isArray(req.body.area) ? req.body.area.join(',') : req.body.area;
        var tmpArea = str.split(',');
        var arr = {"job_L_class": tmpJobClass, "job_type": tmpJobType, "area": tmpArea};
        // console.log(tmp.length);
        workDataModel.post(arr, (err, results) => {
          if (err) console.log(err);
          if(results && results.length >0){
            // console.log(results);
            res.json(results);
            // res.render('results', {
            //   // 注意回傳的結果 array，必須取 results[0] 才會是一個 todo
            //   results: results
            // })
          }
          else{
            // console.log('資料庫沒有回傳資料');
            res.render('NoDb');
          }
        })
      },
      postSkill:(req, res) => { //垃圾
        var arr = {"job_L_class": req.body.job_L_class,"area": req.body.area};
        workDataModel.language(arr, (err, results) => {
          if (err) console.log(err);
          if(results && results.length >0){
            res.render('SkillResults', {
              // 注意回傳的結果 array，必須取 results[0] 才會是一個 todo
              results: results
            })
          }
          else{
            // console.log('資料庫沒有回傳資料');
            res.render('NoDb');
          }
        });
        
      },
      postlanguage:(req, res) => {
        var arr = {"job_L_class": req.body.job_L_class,"area": req.body.area};

        var results = [];
        req.session.job_L_class = req.body.job_L_class;
        req.session.area = req.body.area;
        var flag = false;
        function fetchData(index) {
          return new Promise((resolve, reject) => {
            languageDataModel.postlanguage(arr, lanName[index], (err, tmpresults) => {
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
          for (let i = 0; i < lanName.length; i++) {
            await fetchData(i);
          }
      
          // console.log("results", results[0]);
          results.sort((a, b) => b.job_count - a.job_count);
          var cnt = 3, i = 0, bestarr = [];
          while(cnt--){
              if(results[i].language == '不拘'){
                i++;
              }
              bestarr.push(results[i].language)
              i++;
          }
          // console.log(bestarr);
          req.session.languages = bestarr;
          if (!flag) {
            if (results && results.length > 0) {
              // console.log(results);
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
      postALLlanguage:(req, res) => {
        var arr = {"job_L_class": req.session.job_L_class,"area": req.session.area};
        var bestlist = req.session.languages;
        // console.log("b");
        // console.log(bestlist);
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
      
          // console.log("results", results[0]);
          // results.sort((a, b) => b.job_count - a.job_count);
          // var cnt = 3, i = 0, bestarr = [];
          // while(cnt--){
          //     if(results[i].language == '不拘'){
          //       i++;
          //     }
          //     bestarr.push(results[i].language)
          //     i++;
          // }
          // console.log(bestarr);
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

module.exports = homeController