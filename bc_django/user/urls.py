from django.contrib import admin
from django.urls import path, include
from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView

urlpatterns = (
    # user authori3ation
    path(
        'auth/register/account-confirm-email/<str:key>/',
        ConfirmEmailView.as_view(),
    ),
    path('auth/login/', include('dj_rest_auth.urls')),
    path('auth/register/', include('dj_rest_auth.registration.urls')),
    path(
        'auth/account-confirm-email/',
        VerifyEmailView.as_view(),
        name='account_email_verification_sent'
    ),
    #
    #path('stats/', ''),
    #path('settings/', ''),
)