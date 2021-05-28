import bcrypt

def hash_password(plaintext):
    """hashed plain text password entered by user during creation of new 
    account and password"""
    salt = bcrypt.gensalt()
    encoded_pw = plaintext.encode("utf-8")
    hashed_pw = bcrypt.hashpw(encoded_pw, salt)
    decode_hash = hashed_pw.decode("utf-8")
    return decode_hash

def check_hashed(password, database_hashed_pw):
    """checks hashed password from database against decrypted plain text 
    password retrieved from separate .json file (not in database)"""
    pw = password.encode('utf-8')
    encode_hash = database_hashed_pw.encode("utf-8")
    if bcrypt.checkpw(pw, encode_hash):
        print(f"Password is {pw.decode('utf-8')}")
        return pw.decode('utf-8') 
    else:
        print("Password didn't match")
        return 