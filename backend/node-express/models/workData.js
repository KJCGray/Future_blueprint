const db = require('../db')

var ALLColumnName = ['serial_number', 'company_name', 'company_numcompany_typeNum', 'company_type', 'company_url', 'job_name', 'Nature_of_position', 'job_L_class', 'job_M_class', 'job_S_class', 'job_num', 'job_content', 'update_date', 'job_url', 'label', 'company_address', 'area', 'exp', 'edu', 'job_exp', 'Academic_requirements', 'Major_requirements', 'language_req', 'tool_expect', 'job_skill', 'other']

var search = "";

const workDataModel ={
    post: (SelectList, cb) => {
        var SelectStr = "SELECT job_name, serial_name, area,exp,edu,job_content,job_url, company_type  FROM work ";
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
}

module.exports = workDataModel

// SELECT DISTINCT
//     英文聽,COUNT(英文聽) AS CNT
//  FROM joblaguage, work
//  WHERE work.job_url = joblaguage.job_url AND work.area LIKE '%台北市%'
//  GROUP BY 英文聽
//  ORDER BY CNT DESC;