import pandas as pd
import sqlite3
import datetime

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

week = { 1: '2024-W23', 4: '2024-W04', 8: '2024-W04', 12: '2024-W11', 24: '2024-W02', 52: '2024-W50'}

def iso_to_date(iso_week):
    year, week = iso_week.split('-W')
    first_day_of_year = datetime.date(int(year), 1, 1)
    first_weekday = first_day_of_year.isoweekday()
    days_to_first_monday = (7 - first_weekday + 1) % 7
    first_monday = first_day_of_year + datetime.timedelta(days=days_to_first_monday)
    desired_date = first_monday + datetime.timedelta(weeks=int(week) - 1)
    return desired_date.strftime('%Y-%m-%d')

week = {k: iso_to_date(v) for k, v in week.items()}

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

createSqlMigration('./scripts/seed/3 - preventive_action.sql', insert_statements)

insert_statements = []
for i, row in preventiveServiceOrders.iterrows():
    insert_statement = f"""
insert into preventive_service_order (id, nature, frequency_in_weeks, next_execution, machineId) values ('{row["id"]}', '{row["nature"]}', {row["frequency"]}, '{row['nextExecution']}', {row["machineId"]});
    """.replace('\n', ' ').replace('\r', '')
    insert_statements.append(insert_statement)

createSqlMigration('./scripts/seed/2 - preventive_service_order.sql', insert_statements)

connection.close()
