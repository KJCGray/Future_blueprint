

const db = require('../db')

const getDataModel = {
  // 這裡要用 callback 來拿取資料
  getAll: (cb) => {
    db.query(
      'SELECT * FROM test', (err, results) => {
        if (err) return cb(err);
        // cb: 第一個參數為是否有錯誤，沒有的話就是 null，第二個才是結果
        cb(null, results)
        
    });
  },

  get: (id, cb) => {
    db.query(
      'SELECT * FROM user WHERE id = ?', [id], (err, results) => {
        if (err) return cb(err);
        cb(null, results)
      });
  },
  post: (id, cb) => {
    db.query(
      'SELECT * FROM test WHERE id = ?', [id], (err, results) => {
        if (err) return cb(err);
        cb(null, results)
      });
  }
}

module.exports = getDataModel
