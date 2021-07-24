from django.urls import path
from django.urls import include, path
from rest_framework_nested import routers
from . import views

router = routers.SimpleRouter()
router.register('users', views.UserViewSet)

vaults_router = routers.NestedSimpleRouter(router, 'users', lookup='user')
vaults_router.register('vaults', views.VaultListSet, basename='user-vaults')

accounts_router = routers.NestedSimpleRouter(vaults_router, 'vaults', lookup='vault')
accounts_router.register('accounts', views.AccountListSet, basename='vault-accounts')


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/', include(vaults_router.urls)),
    path('api/', include(accounts_router.urls)),
]