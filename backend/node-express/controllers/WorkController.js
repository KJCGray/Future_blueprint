const { render } = require("ejs");
const workDataModel = require("../models/workData")
const languageDataModel = require("../models/languageData");
const skillDataModel = require("../models/skillData");
const MsgDataModel = require("../models/Message");
const userModel = require('../models/user');

const workController = {
    postALLlanguage:(req, res) => { //回傳需要的前三個語言的聽說讀寫分別要什麼程度    
        var arr = {"job_L_class": req.session.job_L_class,"area": req.session.area, "job_type": req.session.job_type};
        console.log (req.session.languages);
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
                // console.log("results", results );
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
              // console.log(results);
              res.status(200).json(results)
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
          var toolMap = {};
          for (var i = 0; i < results.length; i++) {
            if(results[i]['job_skill'] == null || results[i]['job_skill'] == '') results[i]['job_skill'] = '不拘';
            if(results[i]['tool_expect'] == null || results[i]['tool_expect'] == '') results[i]['tool_expect'] = '不拘';
            var tmpstr = results[i]['job_skill'].split(',');
            var tmpstr1 = results[i]['tool_expect'].split(',');
            for (var j = 0; j < tmpstr.length; j++) {
              if (cntMap.hasOwnProperty(tmpstr[j]) && tmpstr[j] != "不拘") {
                cntMap[tmpstr[j]]++;
              } else if(tmpstr[j] != "不拘"){
                cntMap[tmpstr[j]] = 1;
              }
            }
            for (var j = 0; j < tmpstr1.length; j++) {
              if (toolMap.hasOwnProperty(tmpstr1[j]) && tmpstr1[j] != "不拘") {
                toolMap[tmpstr1[j]]++;
              } else if(tmpstr1[j] != "不拘"){
                toolMap[tmpstr1[j]] = 1;
              }
            }
          }
          var cntArray = [];
          for (var skill in cntMap) {
            if(cntMap[skill] >= 5){
              cntArray.push({ skill: skill, count: cntMap[skill] });
            }
          }
          for (var tool in toolMap) {
            if(toolMap[tool] >= 5){
              cntArray.push({ tool: tool, count: toolMap[tool] });
            }
          }
          // 根據技能計數排序陣列
          cntArray.sort(function (a, b) {
            return b.count - a.count; // 以降序排序
          });
          // console.log(cntArray)
          res.status(200).json(cntArray);
        }
      })

    },
    postCertificate:(req, res) => {
      function processProperty(property) {
        if (Array.isArray(req.body[property])) {
          return req.body[property].join(',');
        } else if (typeof req.body[property] === 'string') {
          return req.body[property];
        }
        return '';
      }
      //將post資料用,分割成陣列
      var tmpJobClass = processProperty('job_L_class').split(',');
      var tmpJobType = processProperty('job_type').split(',');
      var tmpArea = processProperty('area').split(',');

      var arr = {"job_L_class": tmpJobClass, "job_type": tmpJobType, "area": tmpArea};
      skillDataModel.certificateData(arr, (err, results) =>{
        if (err) console.log(err);
        else{
          var cntMap = {};
          for (var i = 0; i < results.length; i++) {
            if(results[i]['certificates'] == null || results[i]['certificates'] == '') results[i]['certificates'] = '不拘';
            var tmpstr = results[i]['certificates'].split(',');
            for (var j = 0; j < tmpstr.length; j++) {
              if (cntMap.hasOwnProperty(tmpstr[j]) && tmpstr[j] != "不拘") {
                cntMap[tmpstr[j]]++;
              } else if(tmpstr[j] != "不拘"){
                cntMap[tmpstr[j]] = 1;
              }
            }
          }
          var cntArray = [];
          for (var skill in cntMap) {
            if(cntMap[skill] >= 5){
              cntArray.push({ certificates: skill, count: cntMap[skill] });
            }
          }
          // 根據技能計數排序陣列
          cntArray.sort(function (a, b) {
            return b.count - a.count; // 以降序排序
          });
          // console.log(cntArray);
          res.status(200).json(cntArray);
        }
      })

    },
    
    postMessage:(req, res) => {
      function processProperty(property) {
        if (Array.isArray(req.body[property])) {
          return req.body[property].join(',');
        } else if (typeof req.body[property] === 'string') {
          return req.body[property];
        }
        return '';
      }
      
      var tmpJobClass = processProperty('job_L_class').split(',');
      // var tmpJobType = processProperty('job_type').split(',');
      // var tmpArea = processProperty('area').split(',');

      var arr = {"job_L_class": tmpJobClass};
      
      MsgDataModel.postMsg(arr, (err, results) =>{
        if (err) console.log(err);
        if(results && results.length > 0){
          res.status(200).json(results);
        }
      })
    },

    InsertMessage:(req, res) => {
      const content = req.body.content;
      const job_L_class = req.body.job_L_class;
      const userId = req.body.userId;
      const username = req.body.username;
      const token = req.body.token;
      
      console.log(req.body);
      userModel.getpage(token, (err, user) =>{
        if(err) {
            console.log(err)
            res.status(403).json({message:"請登入"});
        }
        else if(user.username != username){
            console.log(user.username, username, user.token, token);
            res.status(403).json({message:"登入驗證錯誤，請再次登入"});
        }
        else{
          var WriteMsg = {
            "id":userId,
            "username":username,
            "time":new Date().toLocaleString(),
            "content":content,
            "area":"",
            "job_type":"",
            "job_L_class": job_L_class
          };
          MsgDataModel.Insert(WriteMsg, (err, results) =>{
            if (err) console.log(err);
            else{
              res.state(200).send("完成留言");
            }
          })
        }
      })

    }
}

module.exports = workController