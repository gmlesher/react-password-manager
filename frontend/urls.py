from django.urls import path
from . import views

app_name="frontend"
urlpatterns = [
    # Home page
    path('', views.index ),
]