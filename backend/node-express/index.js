const express = require('express');
let bodyParser = require('body-parser');
const getDataController = require('./controllers/getDataController');
const homeDataController = require('./controllers/homeController');
const workDataController = require('./controllers/WorkController');
const userController = require('./controllers/userController');
const PageController = require('./controllers/userpageController');
const db = require('./db')
const cors = require('cors');



const app = express();
const port = 5000;
const session = require('express-session');
const flash = require("connect-flash");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const yourPassword = "someRandomPasswordHere";
// 建立一個不易產生衝突的 port 用來測試
const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// 設定 view engine
app.set('view engine', 'ejs')
// app.use(bodyParser.urlencoded({extended:false}))

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: secret,
    username: null,
    isLogin: false
}));

app.use(cors());
app.use(flash());
app.use((req, res, next) => {
	//放在 res.locals 裡的資料，所有的 view 都可以存取。
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.errorMessage = req.flash('errorMessage')  // 設定 warning_msg 訊息
  next()
})

app.get('/', (req, res) => {
    if(req.session.username == null){
        req.session.username = undefined
    }
    res.render('index', {username:req.session.username});
})

// app.get('/getDB', getDataController.getAll);
// app.get('/getDB/:id', getDataController.get);
// app.post('/getDB', getDataController.post);

app.get('/home',(req, res) => {
    res.render('home')
});
app.post('/home', homeDataController.postlanguage);


//顯示搜尋結果的api
app.post('/api/searchwork/', homeDataController.post);
// app.get('/api/searchwork/', homeDataController.post);


//顯示搜尋結果工作中所有需要語言統計結果的api

app.post('/api/searchlanguage/', homeDataController.postlanguage);
// app.get('/api/searchlanguage/', homeDataController.postlanguage);

//顯示搜尋結果工作中所有需要語言統計結果前三項詳細結果的api

app.post('/api/searchALLlanguage/', workDataController.postALLlanguage);
// app.get('/api/searchALLlanguage/', workDataController.postALLlanguage);

//顯示技能統整的api
app.post('/api/searchskill/', workDataController.postSkill);

//留言區
app.post('/api/msg',workDataController.InsertMessage );
app.post('/api/Selectmsg',workDataController.postMessage );

//個人葉面
app.post()
// app.get('/login', userController.login)
// app.post('/login', userController.handleLogin)
app.post('/api/logout', userController.logout)

// // 建立註冊路由
// app.get('/register', userController.register)
// // app.post('/register', userController.handleRegister)

// app.post('/api/msg',workDataController.InsertMessage )
// app.get('/api/Selectmsg',workDataController.postMessage )
// app.get('/Page', PageController.postALL)
//login
app.post('/api/login', userController.handleLogin);

app.post('/api/register', userController.handleRegister);

// app.get('/logout', userController.logout);

app.listen(port, () => {
    try{
        db.connect()
    }catch(err){
        console.error('An error occurred:', err);
        return false;
    }finally{
        console.log(`Example app listening at http://localhost:${port}`)
    }
    
    
  })