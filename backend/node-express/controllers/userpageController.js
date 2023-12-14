const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const PageController = {
    postALL:(req, res) =>{
        username = req.body.username;
        token = req.body.token;

        if(username == null || token == null){
            res.json({error:"請登入"});   
        }
        else {
            userModel.getpage(username, (err, user) =>{
                if(err || !user) {
                    console.log(err);
                    res.json({error:"請登入"});
                }
                
                if(user[0].token != token){
                    console.log(user[0].token, token);
                    res.json({erroe:"登入驗證錯誤，請再次登入"});
                }
                else{
                    res.json({
                        id:user[0].id,
                        username:user[0].username,
                        email:user[0].email,
                        certificate:user[0].certificate,
                        language:user[0].language,
                        edu:user[0].edu,
                        exp:user[0].exp,
                        other:user[0].other
                    });
                }
               })
        }
       
       
    },
    update:(req, res) =>{
        id = req.body.id
        username = req.body.username;
        token = req.body.token;
        

        userModel.get(username, (err, user) =>{
            if(err) {
                console.log(err)
                res.json({error:"請登入"});
            }
            if(user.token != token){
                res.json({erroe:"登入驗證錯誤，請再次登入"});
            }
            else{
                var UpDateuser = {
                    id:id,
                    username:username,
                    email:req.body.email,
                    certificate:req.body.certificate,
                    language:req.body.language,
                    edu:req.body.edu,
                    exp:req.body.exp,
                    other:req.body.other
                }
                userModel.updataUserData(UpDateuser,(err, result) =>{
                    if(err) {
                        console.log(err)
                        res.json({error:"更新失敗"});
                    }
                    else{
                       res.status(200);
                    }
                } )
            }
           })
    }
}
module.exports = PageController;