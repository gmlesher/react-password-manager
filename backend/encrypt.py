from cryptography.fernet import Fernet
import os
import json
from dotenv import load_dotenv
load_dotenv()

# key used for encryption, stored in .env 
key = os.getenv('ENC_KEY').encode('utf-8')


def encrypt(password):
    """Encrypts plain text password"""
    password = password.encode('utf-8')
    cipher_suite = Fernet(key)
    ciphered_text = cipher_suite.encrypt(password)
    plaintext_ciphered = ciphered_text.decode('utf-8')
    return plaintext_ciphered


def decrypt(encrypted_password):
    """Decrypts encrypted password stored in pw_data.json file"""
    encrypted_password = encrypted_password.encode('utf-8')
    cipher_suite = Fernet(key)
    unciphered_text = cipher_suite.decrypt(encrypted_password)
    plaintext_unciphered = unciphered_text.decode('utf-8')
    return plaintext_unciphered


def load_and_dump(acct, acct_id, password, user_id):
    """loads and writes .json files. Account name and encrypted passwords
    are stored in 'pw_data.json' file"""

    encrypted_password = encrypt(password)
    acct = acct.title()

    try:
        with open(f'pw_data_user_{user_id}.json', 'r') as current_json: 
            old_data = json.load(current_json)
    except (FileNotFoundError, ValueError) as exc:
        data = {}
        data['accounts'] = []
        data['accounts'].append({
            'account': {
                'name': f'{acct}',
                'id': f'{acct_id}',
                'password': f'{encrypted_password}',
            },  
        })
        with open(f'pw_data_user_{user_id}.json', 'w') as f: 
            json.dump(data, f, indent=4)
    else:
        data = old_data
        # if account name is already in json file, update the password with new 
        # password, to be written in new json file.
        # same passwords also get re-encrypted and stored in file
        for account in data['accounts']:
            if account['account']['id'] == acct_id and \
                account['account']['name'] == acct:
                account['account']['password'] = encrypted_password
                break
        # if account name is not already present, write new account and password 
        # to end of file
        else:
            data['accounts'].append({
                'account': {
                    'name': f'{acct}',
                    'id': f'{acct_id}',
                    'password': f'{encrypted_password}',
                },  
            })

        # Sorts data by account name
        sorted_data = sorted(data['accounts'], key = lambda json: json['account']['name'])
        new_data = {}
        new_data['accounts'] = []
        for item in sorted_data:
            new_data['accounts'].append(item)

        # makes new file with sorted data by account name
        with open(f'pw_data_user_{user_id}.json', 'w') as f: 
            json.dump(new_data, f, indent=4)


def retrieve_encrypted_pw(acct, acct_id, user_id):
    """opens .json file and retrieves encrypted password based on the account name 
    given in option #2 of the menu"""
    with open(f'pw_data_user_{user_id}.json', 'r') as current_json: 
            data = json.load(current_json)

    for account in data['accounts']:
        if account['account']['id'] == acct_id and \
            account['account']['name'] == acct:
            decrypted = decrypt(account['account']['password'])
            return decrypted
    
    return "No password found"