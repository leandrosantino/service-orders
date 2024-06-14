import pandas as pd
import sqlite3

connection = sqlite3.connect('D:\\dev\\QuickOS\\database\\app.db')

def getSqlCommand():
    command = ''
    with open('./scripts/query.sql', 'r', encoding='utf-8') as file:
        command = file.read()
    return command

preventiveActions = pd.read_sql(
    sql= getSqlCommand(),
    con= connection
)

week = { 1: '2023-W23', 4: '2023-W04', 8: '2023-W04', 12: '2023-W11', 24: '2023-W02', 52: '2023-W50'}

preventiveServiceOrders = {}

preventiveActions['serviceOrderId'] = None

i = 1
for index, action in preventiveActions.iterrows():
    code = action['machineName'] + action['nature'] + str(action['frequency'])
    _id = None
    if code in preventiveServiceOrders:
        _id = preventiveServiceOrders[code]['id']
    else:
        preventiveServiceOrders[code] = {
            'id': i,
            'machineName': action['machineName'],
            'nature': action['nature'],
            'frequency': action['frequency'],
            'nextExecution': week[action['frequency']]
        }
        _id = i
        i += 1

    preventiveActions.at[index, 'serviceOrderId'] = _id
    pass

preventiveServiceOrders = pd.DataFrame(list(preventiveServiceOrders.values()))

print(preventiveActions.head(100))
print(preventiveServiceOrders.head())

preventiveActions.to_excel('./scripts/out/preventive_actions.xlsx', index=False)
preventiveServiceOrders.to_excel('./scripts/out/preventive_service_orders.xlsx', index=False)

connection.close()