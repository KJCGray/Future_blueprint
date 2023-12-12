const { render } = require("ejs");
const getDataModel = require("../models/getData")

//這裡是我的小抄

const getDataController = {
  getAll: (req, res) => {
    // 改成 callback 非同步操作
    getDataModel.getAll((err, results) => {
      // 如果有 err 就印出錯誤訊息
      if (err) console.log(err);
      // console.log(results);
      if(results && results.length >0){
        res.render('DB', {
          // 注意回傳的結果 array，必須取 results[0] 才會是一個 todo
          user: results
        })
      }
      else{
        // console.log('資料庫沒有回傳資料');
        res.render('NoDb');
      }
    })
  },

  get: (req, res) => {
    const id = req.params.id
    getDataModel.get(id, (err, results) => {
      if (err) console.log(err);
      // console.log(results);
      if(results.length >0){
        // console.log('有回傳資料');
        res.render('DB', {
          // 注意回傳的結果 array，必須取 results[0] 才會是一個 todo
          user: results
        })
      }
      else{
        // console.log('資料庫沒有回傳資料');
        res.render('NoDb');
      }
    })
  },

  post: (req, res) => {
    const id = req.body.id
    getDataModel.post(id, (err, results) => {
      if (err) console.log(err);
      // console.log(results);
      if(results && results.length >0){
        res.render('DB', {
          // 注意回傳的結果 array，必須取 results[0] 才會是一個 todo
          user: results
        })
      }
      else{
        // console.log('資料庫沒有回傳資料');
        res.render('NoDb');
      }
    })
  }
}

module.exports = getDataController
