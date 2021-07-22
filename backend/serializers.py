from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Vault, Account

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'account_name', 'password', 'username', 'email', 'url')

class VaultSerializer(serializers.HyperlinkedModelSerializer):
    accounts = AccountSerializer(many=True, read_only=True)
    class Meta:
        model = Vault
        fields = ('id', 'vault_name', 'accounts')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    vaults = VaultSerializer(many=True, read_only=True)
    accounts = AccountSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'email', 'groups', 'vaults', 'accounts']
