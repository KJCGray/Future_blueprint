import pandas as pd #這個要pip install pandas
import mysql.connector #這個要pip install mysql.connector
import sys
import numpy as np

# 設置輸出編碼為 UTF-8
sys.stdout.reconfigure(encoding='utf-8')
# 設置 MySQL 連接參數
mysql_config = {
    'host': 'localhost',
    'user': 'root',
    'password':'',
    'database': 'test'
}


# 讀取 CSV 檔案
csv_file_path = '20231128.xlsx'
df = pd.read_excel(csv_file_path, dtype={'column_19': 'str', 'column_20': 'str', 'column_21': 'str', 'column_22': 'str', 'column_23': 'str', 'column_24': 'str'})

# with open(csv_file_path, 'r', encoding='utf-8', errors=' ') as file:
#     try:
#         df = pd.read_csv(file, dtype={'column_19': 'str', 'column_20': 'str', 'column_21': 'str', 'column_22': 'str', 'column_23': 'str', 'column_24': 'str'})
#     except pd.errors.ParserError as e:
#         print(f"Error parsing CSV file: {e}")
#         pass

df.fillna(np.nan, inplace=True)
# df.fillna('', inplace=True)
# 連接到 MySQL 資料庫
conn = mysql.connector.connect(**mysql_config)
cursor = conn.cursor()

# 獲取 CSV 檔案中的欄位和數據類型，用於建立 MySQL 表格
columns = ', '.join([f'{col} LONGTEXT' for col in df.columns])

columnsName = [col for col in df.columns] #所有欄位名字的陣列

# 建立 MySQL 表格
create_table_query = f'CREATE TABLE IF NOT EXISTS work ({columns});'
cursor.execute(create_table_query)

# 將數據插入到 MySQL 表格中
cnt = 0
for index, row in df.iterrows():
    
    check_query = f"SELECT COUNT(*) FROM work WHERE job_num = '{row[columnsName[10]]}' AND job_url = '{row[columnsName[13]]}';"
    cursor.execute(check_query)
    result = cursor.fetchone()
    cnt+=1
    if result[0] == 0:
        # 如果資料庫中不存在相同的資料，則執行插入
        row = tuple(None if pd.isna(value) else value for value in row)
        insert_query = f'INSERT INTO work VALUES ({", ".join(["%s" for _ in row])});'
        cursor.execute(insert_query, tuple(row))
        # insert_query = f'INSERT INTO work VALUES ({", ".join(["%s" for _ in row])});'
        # cursor.execute(insert_query, tuple(row))

    else:
        print(f"Data already exists for row {index + 1}. Skipping insertion.")
        print(check_query)
    # if cnt == 599 : 
        # print(check_query)
        # break 

    # if cnt == 10 : break; 


# 提交變更並關閉連接
conn.commit()
cursor.close()
conn.close()

print('CSV 檔案數據成功上傳到 MySQL 資料庫！')
