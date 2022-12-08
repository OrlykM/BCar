import sys
sys.path.append("..")

from .models import Car
from user.models import CustomUser
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import generics
from rest_framework import filters
from rest_framework import status
from .serializers import *
from user.serializers import OrderSerializer
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import BasePermission, IsAuthenticated


class CarViewFilterSet(generics.ListAPIView):
    queryset = Car.objects.filter(is_approved=True, available_now=True)
    serializer_class = CarSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['number_of_seats', 'category_type', 'body_type', 'fuel_type']
    ordering_fields = ['number_of_seats', 'price_per_min']
    #permission_classes = [permissions.IsAuthenticated]


class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    # permission_classes = [IsAuthenticated]
    def get_serializer_class(self):
        # print(self.request.method)
        if hasattr(self.request, 'method'):
            if self.request.method == 'POST':
                return CarSerializer
            elif self.request.method == 'PUT':
                return CarSerializerUpdate

    def post(self, request, *args, **kwargs):

        user_obj = CustomUser.objects.filter(id=kwargs['user_id']).first()
        print(user_obj)
        if not user_obj:
            return Response({"Error": "User not found"},
                            status=status.HTTP_404_NOT_FOUND)

        super().create(request)
        current_car = Car.objects.get(vin_code=request.data['vin_code'])
        data = ({'user': kwargs['user_id'],
                 'car': current_car.pk,
                 'order_type': 'owning'}
        )
        order_serializer = OrderSerializer(data=data)

        if order_serializer.is_valid():
            order_serializer.save()
            return Response(order_serializer.data, status=status.HTTP_201_CREATED)
        return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def update(self, request, *args, **kwargs):
        super().update(request, *args, **kwargs)
        instance = self.get_object()
        if instance is not None:
            return Response(CarSerializerUpdate(instance.available_now).data)
        else:
            return Response({'car': 'it is available now'})

    def destroy(self, request, *args, **kwargs):
        car_object = self.get_object()
        if car_object is not None and car_object.available_now == 0:
            car_object.delete()
            return Response({'car': 'item was deleted'})
        else:
            return Response({'car': 'is available now'},
                            status=status.HTTP_404_NOT_FOUND)

    # permission_classes = [permissions.IsAuthenticated]