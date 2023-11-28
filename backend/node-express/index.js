const express = require('express');
let bodyParser = require('body-parser');
const getDataController = require('./controllers/getDataController');
const testControllers =  require('./controllers/testController');
const homeDataController = require('./controllers/homeController');
const db = require('./db')


const app = express();
const port = 5000;

// 設定 view engine
app.set('view engine', 'ejs')
// app.use(bodyParser.urlencoded({extended:false}))

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('indexlogin')
});
app.get('/getDB', getDataController.getAll);
app.get('/getDB/:id', getDataController.get);
app.post('/getDB', getDataController.post);

app.get('/home',(req, res) => {
    res.render('home')
});
app.post('/home', homeDataController.postSkill);


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