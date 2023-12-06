const db = require('../db')

var lanName = ["英文", "越文", "日文", "中文", "西班牙文", "泰文", "菲律賓文", "韓文", "其他外文", "不拘" ]
var label = ["略懂", "中等","精通"]

const languageDataModel = {
    postlanguage: (SelectList, Languagelabel, cb) => {
        var SelectStr = "SELECT COUNT(*) AS "+Languagelabel+" FROM work ";
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

        SelectStr = SelectStr + ` AND language_req LIKE '%${Languagelabel}%' `;
        // console.log(SelectStr);
        
        
        
        // Sqlstr = Sqlstr + " ORDER BY job_count DESC;"
        db.query(SelectStr, (err, results) => {
            if (err) return cb(err);
            // console.log(results);
            cb(null, results)
        })
    },
    postALLlanguage : (SelectList, Languagelabel, cb) => {
        var SelectStr = "SELECT "+Languagelabel+", COUNT("+Languagelabel+") AS CNT"+" FROM joblaguage ";
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

        SelectStr = SelectStr + "GROUP BY "+Languagelabel+" HAVING "+Languagelabel+" <> '0'"+" ORDER BY CNT DESC;";
        console.log(SelectStr);
        
        
        
        // Sqlstr = Sqlstr + " ORDER BY job_count DESC;"
        db.query(SelectStr, (err, results) => {
            if (err) return cb(err);
            console.log("DB");
            console.log(results);
            cb(null, results)
        })
        
    }
}

module.exports = languageDataModel


// SELECT DISTINCT
//    英文聽,COUNT(英文聽) AS CNT
// FROM joblaguage
// GROUP BY 英文聽
// ORDER BY CNT DESC;