import string, secrets

def generate_password(app_name):
    """either generates a random password for user or 
    lets them create their own for an account"""
    while True:
        ask_random = input(f'Would you like a randomly generated password for "{app_name}"? (y/n): ')
        if ask_random.lower() == 'y':
            alph_digits_punct = string.ascii_letters + string.digits + string.punctuation
            while True:
                password = ''.join(secrets.choice(alph_digits_punct) for i in range(25))
                if (any(c.islower() for c in password)
                        and any(c.isupper() for c in password)
                        and any(not c.isalnum() for c in password)):
                    break
            print(f'\nThe generated password is:\n\n{password}\n')
            return password
        elif ask_random.lower() == 'n':
            password = input('Please provide a password for this site: ')
            print(f'Your selected password is {password}')
            return password
        else:
            print("\nI didn't understand that input. Please type 'y' or 'n'")
            continue