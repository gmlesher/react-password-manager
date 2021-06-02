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