from django.contrib import admin
from django.urls import path, include
from car.views import *

urlpatterns = (
    path('search', CarViewFilterSet.as_view(), name='car_search'),
    #path('list/', ''),
    #path('single/', ''),
    #path('add/', ''),
    #path('approve/', ''),
    #path('order/', ''),
    #path('review/', ''),
)