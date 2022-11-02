from django.contrib import admin
from django.urls import path, include
from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView
from dj_rest_auth.views import LoginView, LogoutView, PasswordResetConfirmView, PasswordResetView

from user.views import *

urlpatterns = [
    # user authori3ation
    path(
        'auth/register/account-confirm-email/<str:key>/',
        ConfirmEmailView.as_view(),
    ),
    path('auth/login/', LoginView.as_view(), name='login_page'),
    path('auth/logout/', LogoutView.as_view(), name='logout_page'),
    path('auth/register/', include('dj_rest_auth.registration.urls')),
    #path('auth/licregister/', LicenseViewSet.as_view({'post':'create'}), name='licence_register_page'),
    path(
        'auth/account-confirm-email/',
        VerifyEmailView.as_view(),
        name='account_email_verification_sent'
    ),
    path(
        'auth/password/reset/',
        PasswordResetView.as_view(), name='password_reset'
    ),
    path(
        'auth/password/reset/confirm/<slug:uidb64>/<slug:token>/',
        PasswordResetConfirmView.as_view(), name='password_reset_confirm'
    ),
    #
    #path('stats/', ''),
    #path('settings/', ''),
]