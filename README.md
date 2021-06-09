# pwmanager
Application for storing secured passwords locally

## Purposes
I only want to remember one password!

pwmanager was built out of a personal need and interest to have one password in order to access all my online account information

I realize there is built-in redundancy by hashing the passwords and storing them in 
the database as well as encrypting the passwords and storing them in tandem with 
the associated account name in a JSON file. 

The purposes for building the project this way were as follows:
1. Learning about postgres databases
2. Learning about how hashing works with the [bcrypt](https://pypi.org/project/bcrypt/) library
3. Learning how encryption works with the [cryptography](https://pypi.org/project/cryptography/) library
4. Learning how to append, replace, and delete JSON data with python
5. Learn secure ways to generate high quality passwords for users

## Future
In the future, I would like to give this application more functionality. 

Here are some ideas:
- Make a GUI for more user-friendly accessibility to account information
- Add option to enable two-factor authorization to log in
- Allow the project to run across different platforms including mobile (browser extension?, downloadable application?, etc.)
- Allow mulitple users to create their own vault and give permission to share vault info with other trusted users
- Restructure code for reducing redundancy (no need to hash and encrypt passwords in a live production version)
- Restructue code into class based functions for reusability where applicable

## Usage
#### Setup
- Install dependencies in requirements.txt
- Create and store master password in .env file (referenced in password_manager.py)
- Create a postgres database
- Add database host, name, user, and password to .env file to be used in database.py
- Allow [cryptography](https://pypi.org/project/cryptography/) library to create an encryption key for you, store key in .env (referenced in encrypt.py)

#### Login
- Use master password to log in to application
- Follow menu's numbered prompts to guide you though creating, updating, deleting, and finding account information in database

## Demo
Demo of each feature below (except 7):

#### Create Password
![create password](https://user-images.githubusercontent.com/70789983/121423250-0d1b9980-c93e-11eb-8e35-fa478903fa18.gif)

#### Update Password
![update password](https://user-images.githubusercontent.com/70789983/121423272-1147b700-c93e-11eb-8e80-6503336eaf99.gif)

#### Find Password
![find password](https://user-images.githubusercontent.com/70789983/121423282-16a50180-c93e-11eb-84b7-439e9b41a398.gif)

#### Find All Data
![find all data](https://user-images.githubusercontent.com/70789983/121423295-1ad11f00-c93e-11eb-82af-cf7cca5cd0be.gif)

#### Find All Accounts
![find all accounts](https://user-images.githubusercontent.com/70789983/121423322-20c70000-c93e-11eb-8531-5dad7ec158c3.gif)

#### Delete Data
![delete data](https://user-images.githubusercontent.com/70789983/121423338-245a8700-c93e-11eb-8d4c-dbaa64b58f0e.gif)