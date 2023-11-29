import pandas as pd
import sys

# 設置輸出編碼為 UTF-8
sys.stdout.reconfigure(encoding='utf-8')
csv_file_path = '20231128.csv'

df = pd.read_csv(csv_file_path)

columns = ', '.join([f'{col} TEXT' for col in df.columns])
columnsName = [col for col in df.columns]

print(columnsName)

cnt = 0
for index, row in df.iterrows():
    values = ', '.join([f'"{str(val)}"' for val in row])
    cnt+=1
    if cnt ==148: 
        print(row[columnsName[10]], columnsName[10])
        print(values)
        insert_query = f'INSERT INTO work VALUES ({values});'
        print(insert_query)
        break
# print(df.head(10))