from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views

urlpatterns = (
    path('', userpage, name='userpage'),
    path('register/', user_register, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('change_password/', change_password,
         name='change_password'),
    path('change_phone/', change_phone,
         name='change_phone'),

    path('activate/<uidb64>/<token>', activate, name='activate'),

    path('password_reset/done/',
         auth_views.PasswordResetDoneView.as_view(template_name='user/password/password_reset_done.html'),
         name='password_reset_done'),
    path('reset/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(template_name="user/password/password_reset_confirm.html"),
         name='password_reset_confirm'),
    path('reset/done/',
         auth_views.PasswordResetCompleteView.as_view(template_name='user/password/password_reset_complete.html'),
         name='password_reset_complete'),
    path('password_reset', password_reset_request, name="password_reset")
)