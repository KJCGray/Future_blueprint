const { render } = require("ejs");
const workDataModel = require("../models/workData")


const workDataController = {
    post: (req, res) => {
        var arr = {"job_L_class": req.body.job_L_class, "job_M_class": req.body.job_M_class, "job_S_class": req.body.job_S_class, "area": req.body.area};
        workDataModel.post(arr, (err, results) => {
          if (err) console.log(err);
          if(results && results.length >0){
            res.render('results', {
              // 注意回傳的結果 array，必須取 results[0] 才會是一個 todo
              results: results
            })
          }
          else{
            // console.log('資料庫沒有回傳資料');
            res.render('NoDb');
          }
        })
      },
      postSkill:(req, res) => {
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
}

module.exports = workDataController