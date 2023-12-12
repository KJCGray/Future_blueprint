const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const crypto = require('crypto');


function generateRandomToken(length) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        const token = buffer.toString('hex');
        resolve(token);
      }
    });
  });
}

// 建立一個 todoController 物件，透過方法來存取 model 的資料
const userController = {
  // 傳入參數 req, res
  //渲染註冊頁面
  register: (req, res) => {
    //把路徑設在 user 資料夾，較方便管理
    res.render('user/register');
  },
  //驗證註冊
  handleRegister: (req, res, next) => {
    //從request body 拿取 user 資料
    username = req.body.username;
    password = String(req.body.password);
    email = req.body.email;

    if(!username || !password || !email) {
      //這裡用return 可避免 if-else 寫法增加層數
      // console.log('缺少必要欄位');
      // req.flash('errorMessage', '缺少必要欄位');
      // res.redirect('/register');
      res.json({
        error:'缺少必要欄位'
      });
      return next();
    }
    // 利用 bcrypt 套件對密碼進行雜湊處理

    bcrypt.hash(password, saltRounds, function (err, hash) {
      // 若有 err 就直接顯示錯誤訊息
      if (err) {
        console.log(err);
        // req.flash('errorMessage', err.toString());
        // res.redirect('/register');
        res.json({
          error:'登入失敗，請再嘗試一次'
        });
        return next();
      }
      //資料都沒問題的話，就可透過 userModel 寫入資料
      //傳入一個物件，若有錯誤會回傳 cb

      userModel.check({ username, password: hash,email}, (err,Exist)=>{
        if(err) {
          res.json({
            error:'登入失敗，請再嘗試一次'
          });
        }
        
        if(Exist[0]['CNT'] < 1){
          userModel.add({
            username,
            password: hash,
            email
          }, (err,userId) => {
            // 若有 err 就直接顯示錯誤訊息
            if(err) {
              res.json({
                error:'登入失敗，請再嘗試一次'
              });
            }
          //註冊成功保持登入狀態，並導回首頁
          generateRandomToken(32)
          .then((token) => {
            usertoken = token;
            // console.log('Generated Token:', token);
            userModel.updateToken(userId, usertoken, (err, r) => {
              if(err) {console.log(err)}
              else{
                req.session.username =  username;
                req.session.userId = userId;
                req.session.token = usertoken;
                res.json({
                  error:null,
                  username: req.session.username,
                  userId:req.session.userId,
                  token:req.session.token
                });
                //console.log("User ID in session:", req.session.userId);
                // res.render('index', { username: req.session.username , userId: req.session.userId});
              }
            })
          })
          .catch((err) => {
            console.error('Error generating token:', err);
          });
          });
        }
        else{
          res.json({
            error:'已存在相同用戶名'
          });
          // console.log('已存在相同用戶名');
          // req.flash('errorMessage', '已存在相同用戶名');
          // res.redirect('/register');
          return next();
        }
        
      })
      
    });
  },

  //渲染登入畫面
  login: (req, res) => {
    res.render('user/login')
  },

  //驗證登入狀態
  handleLogin: (req, res, next) => {
    const {username, password} = req.body;
    // 確認是否有填入資料
    console.log(1);
    if(!username ||!password){
      res.json({
        error:'請輸入您的帳密!'
      });
      
      // console.log('請輸入您的帳密!');
      // req.flash('errorMessage', '請輸入您的帳密!');
      // res.redirect('/login');
      // 每當呼叫 next 時，就會將控制權給下一個中間介 redirectBack(導回上一頁)
      return next();
    }
    
    // 輸入正確就從 userModel 找出 user 資料
    userModel.get(username, (err, user) => {
      //console.log(user);
      if (err) {
        req.flash('errorMessage', err.toString());
        return next();
      }
      if (!user) {
        
        res.json({
          error:'使用者不存在'
        });
        // console.log('使用者不存在');

        // req.flash('errorMessage', '使用者不存在');
        // res.redirect('/login');
        return next();
      }
      // 驗證密碼是否正確，三個參數代表: 明碼, 雜湊密碼, 方法
      bcrypt.compare(password, user.password, function (err, isSccess) {
        // 若出現錯誤或比對不成功，就顯示錯誤訊息
        if (err || !isSccess) {
          // console.log(isSccess);
          res.json({
            error:'密碼錯誤'
          });
          // req.flash('errorMessage', '密碼錯誤');
          // res.redirect('/login');
          return next();
        }
       
        var usertoken;
        
        // 调用函数生成一个长度为32的随机token
        generateRandomToken(32)
          .then((token) => {
            usertoken = token;
            // console.log('Generated Token:', token);
            userModel.updateToken(user.id, usertoken, (err, r) => {
              if(err) {console.log(err)}
              else{
                req.session.username = user.username;
                req.session.userId = user.id;
                req.session.token = usertoken;
                res.json({
                  error:null,
                  username: req.session.username,
                  userId:req.session.userId,
                  token:req.session.token
                });
                //console.log("User ID in session:", req.session.userId);
                // res.render('index', { username: req.session.username , userId: req.session.userId});
              }
            })
          })
          .catch((err) => {
            console.error('Error generating token:', err);
          });
      
       

        
      });
    })
  },
  //登出: 清除session 並導回首頁
  logout: (req, res) => {
    req.session.username = null;
    req.session.userId = null;
    res.redirect('/');
  }
}

module.exports = userController;