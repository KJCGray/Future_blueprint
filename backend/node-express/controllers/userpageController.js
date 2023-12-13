const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const PageController = {
    postALL:(req, res) =>{
       userModel.get(req.session.username, (err, user) =>{
        if(err) {
            console.log(err)
            res.json({error:"請登入"});
        }
        console.log(user);
        if(user.token != req.session.token){
            res.json({erroe:"登入驗證錯誤，請再次登入"});
        }
        else{
            res.json({
                id:user.id,
                username:user.username,
                email:user.email,
                certificate:user.certificate,
                language:user.language,
                edu:user.edu,
                exp:user.exp,
                other:user.other
            })
        }
       })
       
    },
    update:(req, res) =>{
        userModel.get(req.session.username, (err, user) =>{
            if(err) {
                console.log(err)
                res.json({error:"請登入"});
            }
            if(user.token != req.session.token){
                res.json({erroe:"登入驗證錯誤，請再次登入"});
            }
            else{
                var UpDateuser = {
                    id:req.session.id,
                    username:req.session.username,
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
                        console.log(result)
                    }
                } )
            }
           })
    }
}
module.exports = PageController;