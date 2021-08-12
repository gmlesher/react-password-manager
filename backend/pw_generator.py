import string, secrets
from random import randint

def generate_password():
    """generates a random password for user """
    alph_digits_punct = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(secrets.choice(alph_digits_punct) for i in range(randint(10, 30)))
    if (any(c.islower() for c in password) # if a lowercase letter exists
        and any(c.isupper() for c in password) # if an uppercase letter exists
        and any(c.isdigit() for c in password) # if a number exists
        and any(not c.isalnum() for c in password)): # if a non alphanumeric character exists
        return password
    else:
        return generate_password()