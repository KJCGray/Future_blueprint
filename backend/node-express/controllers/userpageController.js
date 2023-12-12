const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const PageController = {
    postALL:(req, res) =>{
       userModel.get(req.session.username, (err, user) =>{
        if(err) {
            console.log(err)
            res.send("請登入");
        }
        if(user.token != req.session.token){
            res.send("登入驗證錯誤，請再次驗證");
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
        
    }
}
module.exports = PageController;