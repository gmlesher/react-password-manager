from encrypt import encrypt, load_and_dump
from hash_me import hash_password
from database import store_passwords, update_password, find_password, find_app_or_website, return_all_data
from pw_generator import generate_password
from another_prev_dup_utils import AskAgainMixin, prevent_duplicates

def menu():
    """Prints password manager menu and prompts for input of numbered options"""
    print('-'*30)
    print(('-'*13) + 'Menu'+ ('-' *13))
    print('1. Create new password')
    print('2. Update an existing password')
    print('3. Find a password for a site or app')
    print('4. Find all data for a site or app')
    print('5. Find all accounts associated with an email')
    print('Q. Exit')
    print('-'*30)
    return input(': ')


def create():
    """Prompts user for each step required to store password and account information"""
    app_name = input('Please provide the name of the site or app you want to generate a password for: ')
    check = prevent_duplicates(app_name)
    if check:
        return create()
    plaintext = generate_password(app_name)
    encrypted = encrypt(plaintext)
    load_and_dump(app_name, encrypted)
    password = hash_password(plaintext)
    email = input('Please provide a user email for this app or site: ')
    username = input('Please provide a username for this app or site (if applicable): ')
    if username == None:
        username = ''
    url = input('Please paste the url to the site that you are creating the password for: ')
    store_passwords(password, email, username, url, app_name)
    create_another()

def update_pw():
    """prompts user for app/website name to update associated password"""
    app_name = input('Please provide the name of the site or app you want to update the password for: ')
    plaintext = generate_password(app_name)
    encrypted = encrypt(plaintext)
    load_and_dump(app_name, encrypted)
    password = hash_password(plaintext)
    update_password(password, app_name)
    update_another()

def find_pw():
    """prompts user for app/website name to access associated password"""
    app_name = input('\nPlease provide the name of app/website you want to find the password to: ')
    find_password(app_name)
    find_another_pw()


def find_all():
    """prompts user for app/website name to access all data associated with that account"""
    app_name = input('\nPlease provide the name of app/website you want to find all data for: ')
    return_all_data(app_name)
    find_other_data()


def find_apps():
    """prompts user for email, then finds all accounts associated with that email"""
    email = input('\nPlease proivide an email to see all apps/websites associated with email: ') 
    find_app_or_website(email)
    find_another_account()



# ***********************************************************************************

def create_another():
    """prompts user if they would like to create another 
    account after finishing a previous account creation"""
    ask = input('\nWould you like to add another account and password? (y/n): ')
    if ask.lower() == 'y':
        create()
    elif ask.lower() == 'n':
        return
    else:
        print("\nI didn't understand that input. Please type 'y' or 'n'")
        create_another()


def update_another():
    """prompts user if they would like to update another 
    password after finishing a previous update"""
    ask = input('\nWould you like to update another password? (y/n): ')
    if ask.lower() == 'y':
        update_pw()
    elif ask.lower() == 'n':
        return
    else:
        print("\nI didn't understand that input. Please type 'y' or 'n'")
        update_another()


def find_another_pw():
    """prompts user if they would like to find another password associated 
    with another account"""
    ask = input('\nWould you like to find another password? (y/n): ')
    if ask.lower() == 'y':
        find_pw()
    elif ask.lower() == 'n':
        return
    else:
        print("\nI didn't understand that input. Please type 'y' or 'n'")
        find_another_pw()


def find_other_data():
    """prompts user if they would like to find another account 
    based on a given email"""
    ask = input('\nWould you like to find all data associated with another account? (y/n): ')
    if ask.lower() == 'y':
        find_all()
    elif ask.lower() == 'n':
        return
    else:
        print("\nI didn't understand that input. Please type 'y' or 'n'")
        find_other_data()


def find_another_account():  
    """prompts user if they would like to find another account(s) 
    based on a given email"""
    ask = input('\nWould you like to find accounts associated with another email? (y/n): ')
    if ask.lower() == 'y':
        find_apps()
    elif ask.lower() == 'n':
        return
    else:
        print("\nI didn't understand that input. Please type 'y' or 'n'")
        find_another_account()




"""Possibly use classes with mixin from 'another_utils.py'in order to keep DRY. 
Something like this... when refactoring codebase"""
# class CreateAnother(AskAgainMixin):
#     """prompts user if they would like to create another 
#     account after finishing a previous account creation"""
#     ask = input('\nWould you like to add another account and password? (y/n): ')
#     return_function = create()


# class UpdateAnother(AskAgainMixin):
#     """prompts user if they would like to update another 
#     password after finishing a previous password update"""
#     ask = input('\nWould you like to update another password? (y/n): ')
#     return_function = update_pw()


# class FindAnotherPassword(AskAgainMixin):
#     """prompts user if they would like to find another password associated 
#     with another account"""
#     ask = input('\nWould you like to find another password? (y/n): ')
#     return_function = find_pw()


# class FindOtherData(AskAgainMixin):
#     """prompts user if they would like to find all data for another account 
#     based on a given app name"""
#     ask = input('\nWould you like to find all data associated with another account? (y/n): ')
#     return_function = find_all()



# class FindAnotherAccount(AskAgainMixin):
#     """prompts user if they would like to find another account(s) 
#     based on a given email"""
#     ask = input('\nWould you like to find accounts associated with another email? (y/n): ')
#     return_function = find_apps()