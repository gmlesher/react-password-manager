from django.db import models
from django.contrib.auth.hashers import make_password
from .encrypt import load_and_dump

"""Each USER can have many VAULTS. Under a VAULT, there are a set number of 
CATEGORIES (LOGINS, NOTES, CREDIT CARDS, PASSPORTS, PERSONAL INFO, etc.), 
determined by the developer. A LOGIN has a model for an ACCOUNT with relevant
username, password, etc. Under NOTES, there is a model for a single note. 
CREDIT CARDS has a model for company 
(mastercard, visa, amex, etc.), number, name, & cvv. PASSPORTS has a model for 
all the info associatd with a passport. PERSONAL INFO has a model for any 
relevant personal information (name, birthday, addresses, )"""

class Vault(models.Model):
    """Defines a user in application"""
    vault_name = models.CharField(max_length=25)
    owner = models.ForeignKey('auth.User', 
                                on_delete=models.CASCADE, related_name="vaults")

    class Meta:
        ordering = ['vault_name']

    def __str__(self):
        """Return a string representation of the model."""
        return self.vault_name

# class AllItems(models.Model):
#     """Displays all items in vault for each category"""


class Account(models.Model):
    """Defines an account in application"""
    account_name = models.CharField(max_length=25)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=25)
    email = models.EmailField(blank=True)
    url = models.URLField()
    vault = models.ForeignKey(Vault, on_delete=models.CASCADE, 
                                related_name='accounts')

    class Meta:
        ordering = ['account_name']

    def __str__(self):
        """Return a string representation of the model."""
        return self.account_name

    def save(self, *args, **kwargs):
        """Saves account names in title case. Account
        names with multiple words will be capitalized"""
        self.account_name = self.account_name.title()
        # save first time to set id 
        super(Account, self).save(*args, **kwargs)
        # load_and_dump stores encrypted passwds in separate file for each user
        # must come before "make password" in order to not encrypt the hashed pw
        load_and_dump(self.account_name, str(self.id), \
            self.password, self.vault.owner.id) 
        self.password = make_password(self.password)
        # save a second time to set password as hash and call 
        # load_and_dump with an account_id
        return super(Account, self).save()



# class Note(models.Model):
#     """Defines a note in application"""


# class CreditCard(models.Model):
#     """Defines a credit card in applicaiton"""


# class Passport(models.Model):
#     """Defines a passport in application"""


# class PersonalInfo(models.Model):
#     """Defines personal information in application"""



