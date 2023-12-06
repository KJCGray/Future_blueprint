const express = require('express');
let bodyParser = require('body-parser');
const getDataController = require('./controllers/getDataController');
const homeDataController = require('./controllers/homeController');
const db = require('./db')


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


app.get('/', (req, res) => {
  res.render('indexlogin')
});
app.get('/getDB', getDataController.getAll);
app.get('/getDB/:id', getDataController.get);
app.post('/getDB', getDataController.post);

app.get('/home',(req, res) => {
    res.render('home')
});
app.post('/home', homeDataController.postlanguage);
app.get('/home/next', homeDataController.postALLlanguage);


app.post('/api/searchwork',homeDataController.post);


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