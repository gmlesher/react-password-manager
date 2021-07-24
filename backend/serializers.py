from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Vault, Account
from .encrypt import retrieve_encrypted_pw

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.SerializerMethodField(method_name='get_password')
    class Meta:
        model = Account
        fields = ('id', 'account_name', 'password', 'username', 'email', 'url')

    def get_password(self, obj):
        """Decrypts password and overwrites result in password field 
        for class Meta.Does not overwrite model password field or 
        change encrypted password in .json files."""
        queryset = Account.objects.all()
        for a in queryset:
            if a.id == obj.id and a.account_name == obj.account_name:
                obj.password = retrieve_encrypted_pw(obj.account_name, str(obj.id), \
                    obj.vault.owner.id)
                return obj.password
        return "No password found"

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
