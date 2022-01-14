# React Password Manager
Same idea of an application as the CLI [pwmanager](https://github.com/gmlesher/pwmanager), but with a nice web app interface. Project was initially intended to remain similar to pwmanager, but got large enough to take it to its own repo. 

## Purposes
I only want to remember one password!

React Password Manager was built out of a personal need and interest to have one password in order to access all my online account information

The purposes for building the project this way were as follows:
1. Learning about postgres databases
2. Learning about how hashing works with the [bcrypt](https://pypi.org/project/bcrypt/) library
3. Learning how encryption works with the [cryptography](https://pypi.org/project/cryptography/) library
4. Learning how to append, replace, and delete JSON data with python
5. Learn secure ways to generate high quality passwords for users

## Features
- Built using Django REST API framework
- Passwords are hashed and stored in postrgres database
- Passwords are encrypted and stored in a local file that is secured with other data
- Optional secure password generator when adding an account
- Multiple user vaults can be added

## Future
In the future, I would like to give this application more functionality. 

Here are some ideas:
- Add option to enable two-factor authorization to log in
- Allow mulitple users to create their own vault and give permission to share vault info with other trusted users
- Restructue code into class based functions for reusability where applicable
- Ability to save username and password data when logging into accounts

## Demo

#### Application Overview
![overview](https://user-images.githubusercontent.com/70789983/149445048-56271396-8191-4b47-92c0-9fddc502ee54.gif)
