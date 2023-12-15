// models/workModel.js
const db = require('../db'); // 假设你的数据库连接配置在这个文件中

const WorkModel = {
    post: (SelectList, cb) => {
        var SelectStr = "SELECT * FROM work ";
        var flag = 0;
        var values = [];
        for (const [key, value] of Object.entries(SelectList)) {
            if(value != '' && value != "不限" && typeof value !== 'undefined' && value.length>0){
                if(!flag){
                    SelectStr+="WHERE (";
                    flag = 1;
                }
                else SelectStr+="AND ( ";
                SelectStr = SelectStr + ` ${key} LIKE ?`;
                values.push(`%${value[0]}%`);
                for(var i = 1; i < value.length; i++){
                    // console.log(value[i]);
                    SelectStr = SelectStr + ` OR ${key} LIKE ? `;
                    values.push(`%${value[i]}%`);
                }
                if(key == 'job_type'){
                    SelectStr = SelectStr + ` OR ${key} LIKE '%不限%' `;   
                }
                SelectStr = SelectStr + ") ";
            }
        }
        searchstr = SelectStr;
        console.log(SelectStr);
        db.query(SelectStr,values, (err, results) => {
            if (err) return cb(err);
            // console.log(results);
            cb(null, results)
        })
    }
};

module.exports = WorkModel;
