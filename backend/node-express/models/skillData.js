const db = require('../db')

const skillDataModel = {
    post:(SelectList, cb) => {

        var SelectStr = "SELECT job_skill, tool_expect FROM work ";
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
                    // console.log(value[i]);
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

    },
    certificateData:(SelectList, cb) => {
        var SelectStr = "SELECT certificates FROM work ";
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
                    // console.log(value[i]);
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

    },
    ALLcertificate:(SelectList, cb) => {

        var SelectStr = "SELECT certificate FROM work ";
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
                    // console.log(value[i]);
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

module.exports = skillDataModel