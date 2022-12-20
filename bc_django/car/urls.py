from django.contrib import admin
from django.urls import path, include
from car.views import *

urlpatterns = (
    path('search/', CarViewFilterSet.as_view(), name='car_search'),
    path('<int:car_id>/get_one/',CarGetOne.as_view({"get": "show"}), ),
    path('add/<int:user_id>/', CarViewSet.as_view({'post': 'post'}), ),   # auth_user
    path('<int:pk>', CarViewSet.as_view({"get":"show"}), ), # auth_user
    path('<int:pk>/settings', CarViewSet.as_view({"get":"show2", "put":"update", "delete": "destroy"}), ), #owner

    path('status/', CarViewSet.as_view({"get":"show_all_status"}), ),   # moderator
    path('<int:pk>/status', CarViewSet.as_view({"get":"show_approve_status",
                                                "put": "approve"}), ), #owner, moderator
    path('show_all/', CarViewShowAll.as_view({"get": "show_all"}), ),
)