"""bc_django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from user.views import *
from car.views import *
from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'cars', CarViewSet)
router.register(r'car_category', CategoryCarViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    #path('', include('main.urls')),
    path('', include(router.urls)),
    #path('auth/', CustomAuthToken.as_view()),
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
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
]
