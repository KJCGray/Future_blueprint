const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const WorkModel = require('../models/joblist');
const { minify } = require('next/dist/build/swc');
const saltRounds = 10;






const PageController = {
    postALL:(req, res) =>{
        username = req.body.username;
        token = req.body.token;

        // username = req.session.username;
        // token = req.session.token;
        console.log(username,token);
        if(username == null || token == null || token == undefined || username == undefined){
            res.status(403).json({message:"請登入"});   
        }
        else {
            userModel.getpage(token, (err, user) =>{
                if(err || !user) {
                    console.log(err);
                    console.log(username,token);
                    res.status(403).json({message:"請登入"});   
                }
                else if(user.length < 1){
                    res.status(403).json({message:"請登入"});
                }
                else if(user[0].username != username){
                    // console.log(user[0].token, token);
                    console.log(user.username, username, user.token, token);
                    res.status(403).json({message:"登入驗證錯誤，請再次登入"});
                }
                else{
                    res.status(200).json(
                        {
                        message:"驗證成功",
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
        userID = req.body.userid
        username = req.body.username;
        token = req.body.token;
        
        if(username == null || token == null || token == undefined || username == undefined){
            res.status(403).json({message:"請登入"});   
        }
        // username = req.session.username;
        // token = req.session.token;
        console.log(username,token);
        console.log(req.body);

        userModel.getpage(token, (err, user) =>{
            if(err) {
                console.log(err);
                res.status(403).json({message:"請登入"});
            }
            else if(user.length < 1){
                res.status(403).json({message:"請登入"});
            }
            else if(user[0].username != username){
                console.log(user[0].username, username, user[0].token, token);
                res.status(403).json({message:"登入驗證錯誤，請再次登入"});
            }
            else{
                var UpDateuser = {
                    id:userID,
                    certificate:req.body.certificate,
                    language:req.body.language,
                    edu:req.body.edu,
                    other:req.body.skill
                }

                userModel.updataUserData(UpDateuser,(err, result) =>{
                    if(err) {
                        console.log(err)
                        res.status(404).json({message:"更新失敗，請在試一次"});
                    }
                    else{
                       res.status(200).json({
                            message:"更新成功"
                       });
                    }
                } )
            }
           })
    },
    joblist: (req, res) => {
        console.log("body", req.body);
        function processProperty(property) {
            if (Array.isArray(req.body[property]) && req.body[property].length > 0) {
              return req.body[property].join(',');
            } else if (typeof req.body[property] === 'string' && req.body[property] !== '') {
              return req.body[property];
            }
            return '';
          }
          
          var tmpcertificates = processProperty('certificates').split(',');
          var tmplanguage = processProperty('language_req').split(',');
          var tmpedu = processProperty('edu').split(',');
          var tmpskill = processProperty('job_skill').split(',');
          var tmptool = tmpskill;
          var tmpcontent = tmpskill;

          var searchValues = {
            certificates:tmpcertificates,
            language_req:tmplanguage,
            edu:tmpedu,
            job_skill:tmpskill,
            tool_expect:tmpskill,
            job_content:tmpskill
          }

          console.log(searchValues);

          var tmpstr = req.body.certificates+ req.body.language_req+req.body.edu+req.body.job_skill;
          tmpstr = tmpstr.replace(',', ' ');

          console.log(tmpstr);

          var arr = {"certificates":tmpcertificates, "language_req": tmplanguage, "edu": tmpedu, "job_skill": tmpskill , "tool_expect":tmptool, "job_content":tmpcontent};

          console.log(arr);


          WorkModel.post(arr, (err, result) =>{
            if(err) console.log(err);
            else if(result.length > 0){

                console.log(result);
                const cntMap = new Map();

                for (let i = 0; i < result.length; i++) {
                    for (const [key, value] of Object.entries(searchValues)) {
                        for(var j = 0; j < value.length; j++){
                            // console.log("tmp",result[i][key],key);
                            if(result[i][key]!='' &&result[i][key]!= undefined&&result[i][key].indexOf(value[j]) >=0){
                                cntMap.set(result[i]['job_url'], (cntMap.get(result[i]['job_url']) || 0) + 1);   
                            }
                        }
                    }
                }

                    // 将 Map 转为数组，并按计数降序排序
                const cntArray = Array.from(cntMap, ([job_url, count]) => ({ job_url, count }));
                cntArray.sort((a, b) => b.count - a.count);

                // 获取前 20 项
                const S = Math.min(20, cntArray.length);
                const resultarr = cntArray.slice(0, S).map((item) => item.job_url);
                // console.log(cntMap);

                console.log(cntArray.length);
                console.log(resultarr);
                WorkModel.searchjob(resultarr,(err, r)=>{
                    if(err){console.log(err)}
                    else{
                        r.forEach(r => {
                            if (r.job_name) {
                              // 將 &amp; 替換為 &
                              r.job_name = decodeHtmlEntities(r.job_name);
                            //   r.job_content = r.job_content.replace(/&amp;/g, '');
                            }
                            if(r.job_content){
                                r.job_content = decodeHtmlEntities(r.job_content);
                                r.job_content = r.job_content.replace(/\\u([a-fA-F0-9]{4})/g, (_, codePoint) => String.fromCodePoint(parseInt(codePoint, 16)));
                                r.job_content = r.job_content.replace(/_x000D_/g, '\n');
                            }
                        });
                        res.status(200).json(r);
                    }
                })
                
            }
            else{
                res.status(404).json({message:"目前沒有推薦工作"})
            }
          })
    },
    updatepass:(req, res)=>{
        const id = req.body.id;
        const token = req.body.token;
        const password = req.body.password;
        userModel.getpage(token, (err, user) =>{
            if(err) {
                console.log(err)
                res.status(403).json({message:"請登入"});
            }
            else if(user.length < 1){
                res.status(403).json({message:"請登入"});
            }
            if(user[0].id != id){
                // console.log(user.username, username, user.token, token);
                res.status(403).json({message:"登入驗證錯誤，請再次登入"});
            }
            else{
                bcrypt.hash(password, saltRounds, function (err, hash) {
                    // 若有 err 就直接顯示錯誤訊息
                    if (err) {
                        console.log(err);
                        // req.flash('errorMessage', err.toString());
                        // res.redirect('/register');
                        res.status(400).json({
                            message:'請按照正確格式輸入密碼'
                        });
                        return next();
                    }

                    var user = {
                        id :id,
                        password: hash
                    }
                    userModel.updatepass(user, (err, result) =>{
                        if(err) {
                            console.log(err)
                            res.status(404).json({message:"更新失敗，請在試一次"});
                        }
                        else{
                            res.status(200).json({
                                message:"更新成功"
                            });
                        }
                    } )
                })
            }
        })

    }
}
module.exports = PageController;