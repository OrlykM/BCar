from django.urls import path, include
from .views import *

urlpatterns = (
    path('', index, name=''),
    path('user/', include(('user.urls', 'user'), namespace='user')),
)