import pandas as pd
import sqlite3
import re

connection = sqlite3.connect('D:\\dev\\QuickOS\\database\\app.db')

def getSqlCommand():
    command = ''
    with open('./scripts/query.sql', 'r', encoding='utf-8') as file:
        command = file.read()
    return command

report = pd.read_sql(
    sql= getSqlCommand(),
    con= connection
)

idMap = { 1: 1, 4: 2, 8: 3, 12: 4, 24: 5, 52: 6}
weekMap = { 1: '2023-W23', 2: '2023-W04', 3: '2023-W04', 4: '2023-W11', 5: '2023-W02', 6: '2023-W50'}

report['serviceOrderId'] = report['frequency'].map(idMap)

print(report.head(100))
report.to_excel('./scripts/out/preventive_actions.xlsx', index=False)

connection.close()
