from django.urls import path
from django.urls import include, path
from rest_framework_nested import routers
# from rest_framework import routers
from . import views

router = routers.SimpleRouter()
router.register('users', views.UserViewSet)

vaults_router = routers.NestedSimpleRouter(router, 'users', lookup='user')
vaults_router.register('vaults', views.VaultListSet, basename='user-vaults')

accounts_router = routers.NestedSimpleRouter(vaults_router, 'vaults', lookup='vault')
accounts_router.register('accounts', views.AccountListSet, basename='vault-accounts')



# router = routers.SimpleRouter()
# router.register('users', views.UserViewSet)
# router.register('vaults', views.VaultListSet)
# router.register('accounts', views.AccountListSet)


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/', include(vaults_router.urls)),
    path('api/', include(accounts_router.urls)),
    path('api/gen_pw/', views.generate_password_view, name='gen_pw'),
    
    # for use without tokens to login/logout of browsable api
    path('api-auth', include('rest_framework.urls', namespace='rest_framework'))
]