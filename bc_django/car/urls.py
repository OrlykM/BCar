from django.contrib import admin
from django.urls import path, include
from car.views import *

urlpatterns = (
    path('search', CarViewFilterSet.as_view(), name='car_search'),
    # path('list/', ''),
    # path('single/', ''),
    path('add/<int:user_id>/', CarViewSet.as_view({'post': 'post'}), name='car_add'),
    path('change/<int:pk>/', CarViewSet.as_view({'put': 'update'}),
         name='car_update'),
    path('delete/<int:pk>/', CarViewSet.as_view({'delete': 'destroy'}),
         name='car_destroy'),
    # path('approve/', ''),
    # path('order/', ''),
    # path('review/', ''),
)