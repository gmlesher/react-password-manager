from database import find_app_name


class AskAgainMixin:
    """responsible for asking user if they would like to repeat action they just completed"""
    ask = None
    return_function = None

    def another(self):
        if self.ask.lower() == 'y':
            self.return_function
        elif self.ask.lower() == 'n':
            return
        else:
            print("\nI didn't understand that input. Please type 'y' or 'n'")
            self.another()


def prevent_duplicates(app_name):
    """prevents user from making two entries of data for one app/website"""
    check = find_app_name(app_name)
    if check == True:
        print('')
        print('*'*30)
        print(f'The app/website "{app_name}" already exits in database.')
        print('You may not create an account with the same name!')
        print('*'*30)
        print('')
        return True
    else:
        return False