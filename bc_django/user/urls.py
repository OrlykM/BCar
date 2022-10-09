from django.urls import path
from .views import *

urlpatterns = (
    path('', userpage, name='userpage'),
    path('register/', register, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('change_password/', change_password,
         name='change_password'),
    path('change_phone/', change_phone,
         name='change_phone'),
)