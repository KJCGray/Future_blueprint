const db = require('../db')

var lanName = ["英文", "越文", "日文", "中文", "西班牙文", "泰文", "菲律賓文", "韓文", "其他外文", "不拘" ]
var label = ["略懂", "中等","精通"]

const languageDataModel = {
    postlanguage: (SelectList, Languagelabel, cb) => {
        var SelectStr = "SELECT COUNT(*) AS "+Languagelabel+" FROM work ";
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

        if(flag == 0){
            SelectStr+="WHERE";
        }
        else{
            SelectStr+= " AND "
        }   
        SelectStr = SelectStr + ` language_req LIKE ? `;
        values.push(`%${Languagelabel}%`);
        // console.log(SelectStr);
        
        
        
        // Sqlstr = Sqlstr + " ORDER BY job_count DESC;"
        db.query(SelectStr,values, (err, results) => {
            if (err) return cb(err);
            // console.log(results);
            cb(null, results)
        })
    },
    postALLlanguage : (SelectList, Languagelabel, cb) => {
        var SelectStr = "SELECT "+Languagelabel+", COUNT("+Languagelabel+") AS CNT"+" FROM language ";
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

        SelectStr = SelectStr + "GROUP BY ? HAVING ? <> '0'"+" ORDER BY CNT DESC;";
        values.push(Languagelabel);
        values.push(Languagelabel);

        console.log(SelectStr);
        
        
        
        // Sqlstr = Sqlstr + " ORDER BY job_count DESC;"
        db.query(SelectStr,values, (err, results) => {
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