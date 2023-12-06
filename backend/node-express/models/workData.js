const db = require('../db')

var ALLColumnName = ['serial_number', 'company_name', 'company_numcompany_typeNum', 'company_type', 'company_url', 'job_name', 'Nature_of_position', 'job_L_class', 'job_M_class', 'job_S_class', 'job_num', 'job_content', 'update_date', 'job_url', 'label', 'company_address', 'area', 'exp', 'edu', 'job_exp', 'Academic_requirements', 'Major_requirements', 'language_req', 'tool_expect', 'job_skill', 'other']

var search = "";

const workDataModel ={
    post: (SelectList, cb) => {
        var SelectStr = "SELECT * FROM work ";
        var flag = 0;
        for (const [key, value] of Object.entries(SelectList)) {
            if(value != "不限" && typeof value !== 'undefined' && value.length>0){
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
    },
    postlanguage: (SelectList, cb) => {
        // var SelectStr = "SELECT language_req, COUNT(job_num) AS N FROM work ";
        var flag = 0;
        for (const [key, value] of Object.entries(SelectList)) {
            if(value != "不限" && typeof value !== 'undefined' && value.length>0){
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
        console.log(SelectStr);
        // SelectStr = SelectStr + "GROUP BY language_req ORDER BY N DESC;"
        db.query(SelectStr, (err, results) => {
            if (err) return cb(err);
            // console.log(results);
            cb(null, results)
        })
    }
}

module.exports = workDataModel

// SELECT DISTINCT
//     英文聽,COUNT(英文聽) AS CNT
//  FROM joblaguage, work
//  WHERE work.job_url = joblaguage.job_url AND work.area LIKE '%台北市%'
//  GROUP BY 英文聽
//  ORDER BY CNT DESC;