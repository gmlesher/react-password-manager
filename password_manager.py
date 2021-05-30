import bcrypt
import os
from menu import menu, create, find_pw, find_apps
from dotenv import load_dotenv
load_dotenv()

def main():
    """Prompts user for password to enter into the application. Based on
    user input to menu, this function redirects to other functions to 
    access data related to user input."""
    salt = bcrypt.gensalt()
    master_pw = os.getenv('MASTER_PW').encode("utf-8")
    hashed_master = bcrypt.hashpw(master_pw, salt)
    password = input("Provide the master password to access PWManager: ").encode("utf-8")
    if bcrypt.checkpw(password, hashed_master):
        print("\nYou're in!\n")
        choice = menu()
        while choice != 'Q':
            if choice == '1':
                create()
            if choice == '2':
                find_pw()
            if choice == '3':
                find_apps()
            else:
                choice = menu()
    else:
        print("Password incorrect")
        restart()


def restart():
    """Prompts user if they would like to try entering application
    password again if previous attempt was incorrect."""
    ask = input('\nWould you like to try again (y/n): ')
    if ask.lower() == 'y':
        main()
    elif ask.lower() == 'n':
        quit()
    else:
        print("\nI didn't understand that input. Please type 'y' or 'n'")
        restart()

main()