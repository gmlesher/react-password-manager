from django.contrib import admin
from .models import Vault, Account

class AccountAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

admin.site.register(Vault)
admin.site.register(Account, AccountAdmin)