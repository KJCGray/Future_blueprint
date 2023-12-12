const express = require('express');
// 引入 db 資料庫: mys
// ql 模組 & 連線資料
const db = require('./db')
const session = require('express-session');
const flash = require("connect-flash");
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const yourPassword = "someRandomPasswordHere";
// 建立一個不易產生衝突的 port 用來測試
const port = process.env.PORT || 3001;
const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: secret,
    username: null,
    isLogin: false
}));

app.use(flash());
app.use((req, res, next) => {
	//放在 res.locals 裡的資料，所有的 view 都可以存取。
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.errorMessage = req.flash('errorMessage')  // 設定 warning_msg 訊息
  next()
})
//設定view engine
app.set('view engine','ejs')

// 建立首頁
app.get('/', (req, res) => {
  if(req.session.username == null){
    req.session.username = undefined
  }
  res.render('index', {username:req.session.username});
})

bcrypt.hash(yourPassword, saltRounds, function(err, hash) {
  // Store hash in your password DB.
});

// 引入 controller，定新增userController處理 login 和 logout 的路由
const userController = require('./controllers/userController')
app.get('/login', userController.login)
app.post('/login', userController.handleLogin)
app.get('/logout', userController.logout)

//建立註冊路由
app.get('/register', userController.register)
app.post('/register', userController.handleRegister)

// 透過 locals 傳值: session 功能和 errorMessage
app.use((req, res, next) => {
  // 有username 代表有登入狀態
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash('errorMessage');
  next();
})

// 運行這個 port，參數分別為 port 和要執行的 function
app.listen(port, () => {
  // 連線資料庫
  db.connect();
  console.log(`Example app listening at http://localhost:${port}`)
})