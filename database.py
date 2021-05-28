import psycopg2
import psycopg2.extras
import os
from hash_me import check_hashed
from encrypt import decrypt, retrieve_encrypted_pw
from dotenv import load_dotenv
load_dotenv()

DB_HOST = os.getenv('DB_HOST')
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASS = os.getenv('DB_PASS')

def connect():
    """Connects to postgres database based on database variables above."""
    try:
        conn = psycopg2.connect(user=DB_USER, password=DB_PASS, host=DB_HOST, dbname=DB_NAME)
        return conn
    except (Exception, psycopg2.Error) as error:
        print(error)


def store_passwords(password, email, username, url, app_name):
    """Stores user data in database"""
    try:
        conn = connect()
        cur = conn.cursor()
        postgres_insert_query = "INSERT INTO accounts (password, email, username, url, app_name) VALUES (%s, %s, %s, %s, %s)"
        record_to_insert = (password, email, username, url, app_name,)
        cur.execute(postgres_insert_query, record_to_insert)
        conn.commit()
        cur.close()
        conn.close()
    except (Exception, psycopg2.Error) as error:
        print(error)


def find_password(app_name):
    """Retrieves hashed password from database, calls for decryption of 
    password stored in .json, compares the plaintext (decrypted) password against
    hashed database password. Returns plaintext password to user if True"""
    try:
        conn = connect()
        cur = conn.cursor()
        postgres_select_query = f"SELECT password FROM accounts WHERE app_name = '{app_name}';"
        cur.execute(postgres_select_query, app_name)
        result = cur.fetchone()
        get_encrypted_pw = retrieve_encrypted_pw(app_name)
        decrypted_pw = decrypt(get_encrypted_pw)
        check_hashed(decrypted_pw, result[0])
        conn.commit()
        cur.close()
        conn.close()
    except (Exception, psycopg2.Error) as error:
        print(error)


def find_app_or_website(email):
    """Finds all applications/websites that are associated with an email"""
    try:
        conn = connect()
        cur = conn.cursor()
        postgres_select_query = f"SELECT app_name FROM accounts WHERE email = '{email}';"
        cur.execute(postgres_select_query, email)
        result = cur.fetchall()
        print('')
        print('RESULT')
        print('') 
        if not result:
            print(f'No email "{email}" found in database\n')
        else:
            for i in result:
                print(i[0])
        conn.commit()
        cur.close()
        conn.close()
    except (Exception, psycopg2.Error) as error:
        print(error)
