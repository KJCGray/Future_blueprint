const { render } = require("ejs");
const workDataModel = require("../models/workData")
const languageDataModel = require("../models/languageData");

const lanName = ["英文", "越文", "日文", "中文", "西班牙文", "泰文", "菲律賓文", "韓文", "其他外文", "不拘" ]

const homeController = {
    post: (req, res) => { //回傳搜尋後的工作
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
        console.log(arr);

        const startTime = new Date().getTime();
        workDataModel.post(arr, (err, results) => {
          if (err) console.log(err);
          if(results && results.length >0){
            console.log('Time taken:', new Date().getTime() - startTime, 'ms');
            console.log(results.length);
            results.forEach(result => {
              if (result.job_name) {
                // 將 &amp; 替換為 &
                result.job_name = result.job_name.replace(/&amp;/g, '&');
              }
              if(result.job_content){
                
                // result.job_content = result.job_content.replace(/\\u([a-fA-F0-9]{4})/g, (_, codePoint) => String.fromCodePoint(parseInt(codePoint, 16)));
                result.job_content = result.job_content.replace(/_x000D_/g, '\n');
              }
            });
            // var decodedObject = JSON.parse("'"+results+"'");
            res.status(200).json(results); //回傳資料
            // next();
          }
          else{
            // console.log('資料庫沒有回傳資料');
            res.status(404).json({message:"目前沒有該項職缺"});
            // next();
          }
        })
      },
      postPage: (req, res) => { //回傳搜尋後的工作
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
        console.log(arr);
        const startTime = new Date().getTime();
        workDataModel.post(arr, (err, results) => {
          if (err) console.log(err);
          if(results && results.length >0){
            console.log('Time taken:', new Date().getTime() - startTime, 'ms');
            console.log(results.length);
            const page = parseInt(req.body.page) || 1;
            const itemsPerPage = parseInt(req.body.itemsPerPage) || 10;
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedResults = results.slice(startIndex, endIndex);

            // res.status(200).json(results); //回傳資料
            // next();
            res.status(200).json({ 
              total: results.length, // 總項目數
              results: paginatedResults // 分頁後的結果
            });
          }
          else{
            // console.log('資料庫沒有回傳資料');
            res.status(404).json({message:"目前沒有該項職缺"});
            // next();
          }
        })
      },


      postlanguage:(req, res) => {  //回傳需要的語言
          // 將post 的資料
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
        // var arr = {"job_L_class": req.body.job_L_class,"area": req.body.area};

        var results = [];
      
        req.session.job_L_class = tmpJobClass;
        req.session.area = tmpArea;
        req.session.job_type = tmpJobType;

        var flag = false;

        function fetchData(index) {
          return new Promise((resolve, reject) => {
            languageDataModel.postlanguage(arr, lanName[index], (err, tmpresults) => {
              if (err) {
                flag = true;
                console.log(err);
              }
              if (tmpresults && tmpresults.length > 0) {
                if(tmpresults[0][lanName[index]] != 0 && lanName[index] != '不拘'){
                  results.push({ "language":lanName[index] ,"job_count":tmpresults[0][lanName[index]] });
                // console.log("results", results[index] );
                }
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
      
          // console.log("results", results);
          results.sort((a, b) => b.job_count - a.job_count);
          var cnt = 3, i = 0, bestarr = [];
          if(results.length < 3);
          cnt = results.length;
          while(cnt--){
              if(results[i].language == '不拘' || results[i].job_count == 0){
                i++;
              }
              bestarr.push(results[i].language)
              i++;
          }
          // console.log(bestarr);
          req.session.languages = bestarr;
          if (!flag) {
            if (results && results.length > 0) {
              // console.log(req.session.languages);
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
    postexp:(req, res) => {
      
    }
}

module.exports = homeController