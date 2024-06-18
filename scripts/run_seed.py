import os
import sqlite3
from create_scripts import *

def insert_data_from_files(directory):

    conn = sqlite3.connect('./database/database.sqlite')
    cursor = conn.cursor()

    sql_files = [f for f in os.listdir(directory) if f.endswith('.sql')]

    print("Iniciando as inserções...")

    for sql_file in sql_files:
        file_path = os.path.join(directory, sql_file)
        print(f"Processando o arquivo: {sql_file}")

        with open(file_path, 'r', encoding='utf-8') as file:
            sql_commands = file.readlines()

        for command in sql_commands:
            try:
                cursor.execute(command)
                conn.commit()
                pass
            except Exception as e:
                print(f"Erro ao inserir a linha: {command.strip()}")
                print(f"Erro: {e}")

    print("Finalizando as inserções...")

    conn.close()

if __name__ == "__main__":
    create_scripts()
    directory = './scripts/seed'
    insert_data_from_files(directory)
