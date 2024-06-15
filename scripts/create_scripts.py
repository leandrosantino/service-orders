import pandas as pd
import sqlite3

connection = sqlite3.connect('D:\\dev\\QuickOS\\database\\app.db')

def createSqlMigration(file_name: str, content: list[str]):
    with open(file_name, 'w', encoding='utf-8') as file:
        for statement in content:
            file.write(statement + '\n')

preventiveActions = pd.read_sql(
    sql= """--sql
        select
            prev.description,
            prev.excution,
            prev.frequency,
            prev.machineId,
            m.tag as machineName,
            n.name as nature
        from (
            select distinct
                p.description,
                p.machineId,
                p.excution,
                p.frequency,
                p.natureId
            from PreventiveAction as p
            order by p.frequency desc
        ) as prev
        inner join Machine as m
        on m.id = prev.machineId
        inner join Nature as n
        on n.id = prev.natureId
    """,
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
    insert_statement = f"""
insert into preventive_action (description, execution, preventiveServiceOrderId) values ('{row["description"].replace("'", '"')}', '{row["excution"].replace("'", '"')}', {row["serviceOrderId"]});
    """.replace('\n', ' ').replace('\r', '')
    insert_statements.append(insert_statement)

createSqlMigration('./scripts/seed/preventive_action.sql', insert_statements)

insert_statements = []
for i, row in preventiveServiceOrders.iterrows():
    insert_statement = f"""
insert into preventive_service_order (id, nature, frequency_in_weeks, machineId) values ('{row["id"]}', '{row["nature"]}', {row["frequency"]}, {row["machineId"]});
    """.replace('\n', ' ').replace('\r', '')
    insert_statements.append(insert_statement)

createSqlMigration('./scripts/seed/preventive_service_order.sql', insert_statements)

connection.close()
