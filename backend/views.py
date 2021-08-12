from django.contrib.auth.models import User, Group
from rest_framework import serializers, views, viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Vault, Account
from .pw_generator import generate_password
from .serializers import (
                        AccountReadSerializer, 
                        AccountSerializer,
                        GeneratePasswordSerializer,
                        VaultSerializer, 
                        UserSerializer, 
                        GroupSerializer,
                                        )

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
    # serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Account.objects.filter(vault__owner=user)\
            .filter(vault=self.kwargs['vault_pk'])

    def perform_create(self, serializer):
        """finds vault_id value from request path and saves"""
        # print(self.request.user.is_authenticated)
        request_path  = self.request.path
        start = request_path.find("/vaults/") + len("/vaults/")
        end = request_path.find("/accounts/")
        vault_id = request_path[start:end] 
        serializer.save(vault_id=vault_id)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return AccountReadSerializer
        return AccountSerializer

    
@api_view()
def generate_password_view(request):
    password = generate_password()
    return Response({'generated_password': password})