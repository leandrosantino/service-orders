import pandas as pd
import sqlite3

connection = sqlite3.connect('D:\\dev\\QuickOS\\database\\app.db')

def getSqlCommand():
    command = ''
    with open('./scripts/query.sql', 'r', encoding='utf-8') as file:
        command = file.read()
    return command

def createSqlMigration(file_name: str, content: list[str]):
    with open(file_name, 'w', encoding='utf-8') as file:
        for statement in content:
            file.write(statement + '\n')

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
            'machineId': action['machineId'],
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


insert_statements = []
for i, row in preventiveActions.iterrows():
    desc = str(row["description"]).replace('\n', ' ')
    insert_statement = f"""
        INSERT INTO preventive_action 
        (description, execution, preventiveServiceOrderId) VALUES 
        ('{desc}', '{row["excution"]}', {row["serviceOrderId"]});
    """
    insert_statements.append(insert_statement)

createSqlMigration('./scripts/out/preventive_actions.sql', insert_statements)

insert_statements = []
for i, row in preventiveServiceOrders.iterrows():
    insert_statement = f"""
        INSERT INTO preventive_service_order 
        (id, nature, frequency_in_weeks, machineId) VALUES 
        ('{row["id"]}', '{row["nature"]}', {row["frequency"]}, {row["machineId"]});
    """
    insert_statements.append(insert_statement)
    
createSqlMigration('./scripts/out/preventive_service_orders.sql', insert_statements)
# preventiveActions.to_excel('./scripts/out/preventive_actions.xlsx', index=False)
# preventiveServiceOrders.to_excel('./scripts/out/preventive_service_orders.xlsx', index=False)

connection.close()
