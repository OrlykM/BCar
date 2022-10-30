from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from user.views import *
from car.views import *

router = routers.DefaultRouter()
router.register(r'cars', CarViewSet)
router.register(r'car_category', CategoryCarViewSet)
router.register(r'lic_register', LicenseViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    #path('auth/', CustomAuthToken.as_view()),
    #path('', include('main.urls')),
    path('user/', include('user.urls')),
    path('car/', include('car.urls')),

]
