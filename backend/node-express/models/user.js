const db = require('../db');

// 建立一個 userModel 物件，裡面放存取資料的方法（function）

// {email	certificate	language	edu	exp	other	}
const userModel = {
  // 用 callback 來拿取資料
  //新增user功能
  check:(user, cb) => {
    var str = 'SELECT COUNT(*) AS CNT FROM user WHERE username = "'+ user.username+ '" ';
    db.query(str ,(err, result) =>{
      if (err) return cb(err);
      console.log(result);
      cb(null, result);
    })
  },
  add: (user, cb) => {
    console.log(user);
    db.query(
      'INSERT INTO user(username, password, email,	certificate,	language,	edu,	exp,	other	) VALUES(?, ?, ?, ?, ?, ?, ?, ? )',
      [user.username, user.password, '', '', '', '', '', ''],
      (err, results) => {
      if (err) return cb(err);
      // cb: 第一個參數為是否有錯誤，沒有的話就是 null，第二個才是結果
      cb(null, results.insertId);
      }
  );
},
  //登入->讀取user功能
  get: (username, cb) => {
    db.query(
      'SELECT * FROM user WHERE username = ?', [username], (err, results) => {
        if (err) return cb(err);
        console.log(results);
        cb(null, results[0]);
      });
  },
  // getpage:(username, cb) => {
  //   db.query(
  //     'SELECT * FROM user WHERE username = ?', [username], (err, results) => {
  //       if (err) return cb(err);
  //       console.log(results);
  //       cb(null, results[0]);
  //     });
  // },
  updateToken:(id, Token, cb) => {
    var str = "UPDATE user SET token='"+Token+"' WHERE id="+id+";";
    db.query(str,(err, results) => {
      if (err) return cb(err);
        console.log(results);
        cb(null, results[0]);
    } )
  }
}
  
module.exports = userModel;