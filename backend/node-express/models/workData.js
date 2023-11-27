const db = require('../db')

var ALLColumnName = ['serial_number', 'company_name', 'company_numcompany_typeNum', 'company_type', 'company_url', 'job_name', 'Nature_of_position', 'job_L_class', 'job_M_class', 'job_S_class', 'job_num', 'job_content', 'update_date', 'job_url', 'label', 'company_address', 'area', 'exp', 'edu', 'job_exp', 'Academic_requirements', 'Major_requirements', 'language_req', 'tool_expect', 'job_skill', 'other']


const workDataModel ={
    post: (SelectList, cb) => {
        var SelectStr = "SELECT * FROM work ";
        var flag = 0;
        for (const [key, value] of Object.entries(SelectList)) {
            if(value != "不限" && typeof value !== 'undefined'){
                if(!flag){
                    SelectStr+="WHERE";
                    flag = 1;
                }
                else SelectStr+="AND";
                SelectStr = SelectStr + ` ${key} LIKE '%${value}%' `;
            }
        }
        console.log(SelectStr);
        db.query(SelectStr, (err, results) => {
            if (err) return cb(err);
            // console.log(results);
            cb(null, results)
        })
    },
    postSkill: (SelectList, cb) => {
        var SelectStr = "SELECT language_req, COUNT(job_num) AS N FROM work ";
        var flag = 0;
        for (const [key, value] of Object.entries(SelectList)) {
            if(value != "不限" && typeof value !== 'undefined'){
                if(!flag){
                    SelectStr+="WHERE";
                    flag = 1;
                }
                else SelectStr+="AND";
                SelectStr = SelectStr + ` ${key} LIKE '%${value}%' `;
            }
        }
        console.log(SelectStr);
        SelectStr = SelectStr + "GROUP BY language_req ORDER BY N DESC;"
        db.query(SelectStr, (err, results) => {
            if (err) return cb(err);
            // console.log(results);
            cb(null, results)
        })
    }
}

module.exports = workDataModel