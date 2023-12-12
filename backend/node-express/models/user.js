const db = require('../db');

// 建立一個 userModel 物件，裡面放存取資料的方法（function）

// {email	certificate	language	edu	exp	other	}
const userModel = {
  // 用 callback 來拿取資料
  //新增user功能
  add: (user, cb) => {
    db.query(
      'INSERT INTO user(username, password, email,	certificate,	language,	edu,	exp,	other	) VALUES(?, ?, ?, ?,?, ?, ?, ? )',
      [user.username, user.password, '', '', '', '','', ''],
      (err, results) => {
      if (err) return cb(err);
      // cb: 第一個參數為是否有錯誤，沒有的話就是 null，第二個才是結果
      cb(null);
      }
  );
},
  //登入->讀取user功能
  get: (username, cb) => {
    db.query(
      'SELECT * FROM user WHERE username = ?', [username], (err, results) => {
        if (err) return cb(err);
        cb(null, results[0]);
      });
  }
}
  
module.exports = userModel;