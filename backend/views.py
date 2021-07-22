from django.contrib.auth.models import User, Group
from rest_framework import views, viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Vault, Account
from .serializers import (VaultSerializer, 
                        AccountSerializer, 
                        UserSerializer, 
                        GroupSerializer)

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(id=user.pk)

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class VaultListSet(viewsets.ModelViewSet):
    """
    API endpoint that allows vaults to be viewed or edited.
    """
    queryset = Vault.objects.all()
    serializer_class = VaultSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Vault.objects.filter(owner=user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class AccountListSet(viewsets.ModelViewSet):
    """
    API endpoint that allows accounts to be viewed or edited.
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Account.objects.filter(vault__owner=user)\
            .filter(vault=self.kwargs['vault_pk'])


    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)