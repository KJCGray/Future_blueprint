const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const WorkModel = require('../models/joblist');
const { minify } = require('next/dist/build/swc');
const saltRounds = 10;
const lunr = require('lunr');

function initializeLunrIndex() {
    const idx = lunr(function () {
      this.field('tool_expect');
      this.field('job_skill');
      this.field('edu');
      this.field('language_req');
      this.field('certificates');
      this.ref('job_url');
    });
  
    return idx;
}

const PageController = {
    postALL:(req, res) =>{
        username = req.body.username;
        token = req.body.token;

        // username = req.session.username;
        // token = req.session.token;
        console.log(username,token);
        if(username == null || token == null){
            res.status(403).json({message:"請登入"});   
        }
        else {
            userModel.getpage(token, (err, user) =>{
                if(err || !user) {
                    console.log(err);
                    res.status(403).json({message:"請登入"});   
                }
                
                if(user[0].username != username){
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
        userID = req.body.userID
        username = req.body.username;
        token = req.body.token;
        
        // username = req.session.username;
        // token = req.session.token;
        console.log(username,token);
        userModel.getpage(token, (err, user) =>{
            if(err) {
                console.log(err)
                res.status(403).json({message:"請登入"});
            }
            if(user.username != username){
                console.log(user.username, username, user.token, token);
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
        console.log(req.body);
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

          var searchValues = {
            certificates:tmpcertificates,
            language_req:tmplanguage,
            edu:tmpedu,
            job_skill:tmpskill,
            tool_expect:tmpskill
          }
          console.log(searchValues);

          var tmpstr = req.body.certificates+ req.body.language_req+req.body.edu+req.body.job_skill;
          tmpstr = tmpstr.replace(',', ' ');

          console.log(tmpstr);

          var arr = {"certificates":tmpcertificates, "language_req": tmplanguage, "edu": tmpedu, "job_skill": tmpskill , "tool_expect":tmptool};

          console.log(arr);

          const idx = initializeLunrIndex();
          console.log(idx);

          function performAsyncOperations(result) {
            return new Promise((resolve, reject) => {
              if (result.length > 0) {
                const promises = result.map((doc) => {
                  return new Promise((innerResolve, innerReject) => {
                    // 可能的異步操作
                    someAsyncOperation(() => {
                      idx.add(doc);
                      innerResolve();  // 異步操作完成後 resolve 內部的 Promise
                    });
                  });
                });
          
                // 等待所有內部 Promise 都完成後再 resolve 外部的 Promise
                Promise.all(promises).then(() => {
                  resolve();
                });
              } else {
                resolve();
              }
            });
          }

          WorkModel.post(arr, (err, result) =>{
            if(err) console.log(err);
            else if(result.length > 0){
                
                // performAsyncOperations(result).then(() => {
                //     // 所有異步操作完成後，這裡執行 add 方法後的後續邏輯
                //   });
                // result.forEach(function (doc) {
                //     console.log(doc);
                //     idx.add(doc);
                // });

                // var results = idx.search(tmpstr);

                console.log(result);
                const cntMap = new Map();

                for (let i = 0; i < result.length; i++) {
                    for (const [key, value] of Object.entries(searchValues)) {
                        for(var j = 0; j < value.length; j++){
                            if(result[i][key].indexOf(value[j]) >=0){
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
            if(user.id != id){
                console.log(user.username, username, user.token, token);
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