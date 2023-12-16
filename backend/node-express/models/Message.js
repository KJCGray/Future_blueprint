const db = require('../db')

const MessageModel = {
    Insert: (data, cb) =>{
        // console.log(data);
        var str = "INSERT INTO  message(userID, username, time, content, area,	job_type, job_L_class) VALUES(?, ?, ?, ?,?, ?, ?) ";
        db.query(str,[data.id, data.username, data.time,  data.content, data.area,data.job_type, data.job_L_class],(err, results)=>{
            if (err) return cb(err);
            cb(null, results);
        })  
    },
    postMsg:(SelectList, cb) => {
        var SelectStr = "SELECT * FROM message ";
        var flag = 0;
        for (const [key, value] of Object.entries(SelectList)) {
            if(value != '' && value != "不限" && typeof value !== 'undefined' && value.length>0){
                if(!flag){
                    SelectStr+="WHERE (";
                    flag = 1;
                }
                else SelectStr+="AND ( ";
                SelectStr = SelectStr + ` ${key} LIKE '%${value[0]}%'`;
                for(var i = 1; i < value.length; i++){
                    console.log(value[i]);
                    SelectStr = SelectStr + ` OR ${key} LIKE '%${value[i]}%' `;
                }
                SelectStr = SelectStr + ") ";
            }
        }
        searchstr = SelectStr;
        console.log(SelectStr);
        db.query(SelectStr, (err, results) => {
            if (err) return cb(err);
            // console.log(results);
            cb(null, results)
        })
    }
}

module.exports = MessageModel;