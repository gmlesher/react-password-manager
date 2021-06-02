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


def find_app_name(app_name):
    """Checks database for app name. If app name exists, true is returned, else false.
    Used in conjunction with prevent_duplicates function"""
    try:
        conn = connect()
        cur = conn.cursor()
        postgres_select_query = f"SELECT app_name FROM accounts WHERE app_name = '{app_name}';"
        cur.execute(postgres_select_query, app_name)
        result = cur.fetchall()
        conn.commit()
        cur.close()
        conn.close()
        if not result:
            return False
        else:
            return True
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


def update_password(new_password, app_name):
    try:
        conn = connect()
        cur = conn.cursor()
        postgres_update_query = f"UPDATE accounts SET password = '{new_password}' WHERE app_name = '{app_name}'"
        cur.execute(postgres_update_query, new_password)
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


def return_all_data(app_name):
    """allows user to retrieve all data in database associated with account"""
    try:
        conn = connect()
        cur = conn.cursor()
        postgres_select_query = f"SELECT * FROM accounts WHERE app_name = '{app_name}';"
        get_database_headers = f"SELECT * FROM accounts LIMIT 0;"
        cur.execute(get_database_headers)
        # puts database headers in a list except for "id" header
        col_names = [desc[0] for desc in cur.description][1:] 
        cur.execute(postgres_select_query, app_name)
        # puts account data in a tuple except for "id" number
        result = cur.fetchone()[1:]
        get_encrypted_pw = retrieve_encrypted_pw(app_name)
        decrypted_pw = decrypt(get_encrypted_pw)
        print(f'app name: {app_name}')
        # retireves unhashed password from database and prints from the "check_hashed" function
        check_hashed(decrypted_pw, result[0])
        # getting the range of the length of the "result" tuple - 1 to remove the "app_name"
        # header and data because it is already printed first above
        for i in range(len(result)-1):
            col_header = col_names[i]
            result_data = result[i]
            # if 'password' in 'col_names', skip. Password is already coming from 'check_hashed', 
            # so skip over password (which is hashed) in 'result' tuple. 
            # Don't want to display a useless hashed password to user, want plaintext password
            if col_header == 'password':
                continue
            else:
                print(f"{col_header}: {result_data}")
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