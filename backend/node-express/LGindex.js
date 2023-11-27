const express = require('express');
let bodyParser = require('body-parser')

const app = express();
const port = 5001;


// 設定 view engine
app.set('view engine', 'ejs')
// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('index')
})

app.get('/hello', (req, res) => {
// 叫 express 去 render views 底下叫做 hello 的檔案，副檔名可省略
  res.render('hello')
})

app.post('/hello', function(req, res){
  const username = req.body.username;
  const password = req.body.password;
  // console.log(req.body.username);
  // console.log(req.body.password);
    // const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  // connection.query('SELECT * from list', function (error, results, fields) {
  //       if (error) throw error;
        // console.log(results);
  // });  
  // res.render('tmp', { username: username, password: password });
  res.render('hello');
  
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})