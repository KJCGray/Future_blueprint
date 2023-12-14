const db = require('../db');

// 建立一個 userModel 物件，裡面放存取資料的方法（function）

// {email	certificate	language	edu	exp	other	}
const userModel = {
  // 用 callback 來拿取資料
  //新增user功能
  check:(user, cb) => {
    var str = 'SELECT COUNT(*) AS CNT FROM user WHERE username =  ?';
    db.query(str,[user.username] ,(err, result) =>{
      if (err) return cb(err);
      console.log("check",result);
      cb(null, result);
    })
  },
  checkemail:(user, cb) => {
    var str = 'SELECT COUNT(*) AS CNT  FROM user WHERE email =  ?';
    db.query(str, [user.email] ,(err, result) =>{
      if (err) return cb(err);
      console.log("checkemail",result);
      cb(null, result);
    })
  },
  add: (user, cb) => {
    console.log(user);
    db.query(
      'INSERT INTO user(username, password, email,	certificate,	language,	edu,	exp,	other	) VALUES(?, ?, ?, ?, ?, ?, ?, ? )',
      [user.username, user.password, user.email, '', '', '', '', ''],
      (err, results) => {
      if (err) return cb(err);
      // cb: 第一個參數為是否有錯誤，沒有的話就是 null，第二個才是結果
      console.log("user");
      console.log(results)
      cb(null, results.insertId);
      }
  );
},
  //登入->讀取user功能
  get: (username, cb) => {
    db.query(
      'SELECT * FROM user WHERE username = ?', [username], (err, results) => {
        if (err) return cb(err);
        // console.log('12',results);
        cb(null, results[0]);
      });
  },
  getpage:(token, cb) => {
    db.query(
      'SELECT * FROM user WHERE token = ?', [token], (err, results) => {
        if (err) return cb(err);
        console.log("getpage",results);
        cb(null, results);
      });
  },
  updateToken:(id, Token, cb) => {
    var str = "UPDATE user SET token= ? WHERE id= ?";
    db.query(str,[Token, id],(err, results) => {
      if (err) return cb(err);
        // console.log("12",results);
        cb(null, results);
    } )
  },
  updataUserData:(user, cb) =>{
    var str = "UPDATE user SET username = ?, email = ?,	certificate = ?,	language = ?,	edu = ?,	exp = ?,	other = ? WHERE  id = ?";
    db.query(str,[user.username, user.email, user.certificate, user.language, user.edu, user.exp, user.other, user.id],(err, results) => {
      if (err) return cb(err);
        console.log(results);
        cb(null, results[0]);
    } )
  }
}
  
module.exports = userModel;