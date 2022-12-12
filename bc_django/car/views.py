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
from .permissions import *
class CarViewFilterSet(generics.ListAPIView):
    queryset = Car.objects.filter(is_approved=True, available_now=True)
    serializer_class = CarSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['number_of_seats', 'category_type', 'body_type', 'fuel_type']
    ordering_fields = ['number_of_seats', 'price_per_min']
class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    def get_permissions(self):
        if self.action in ['post']:
            permission_classes = (permissions.IsAuthenticated, )
            return [permission() for permission in permission_classes]
        if self.action in ['show']:
            permission_classes = (permissions.IsAuthenticated, )
            return [permission() for permission in permission_classes]

        if self.action in ['update', 'destroy', 'show2']:
            permission_classes = (IsOwner, )
            return [permission() for permission in permission_classes]

        if self.action in ['approve', 'show_all_status']:
            permission_classes = (IsModerator, )
            return [permission() for permission in permission_classes]

        if self.action in ['show_approve_status'] and self.request.user.is_staff == 1:
            permission_classes = (IsModerator,)
            return [permission() for permission in permission_classes]
        else:
            permission_classes = (IsOwner,)
            return [permission() for permission in permission_classes]
    def get_serializer_class(self):
        # print(self.request.method)
        if hasattr(self.request, 'method'):
            if self.request.method == 'POST':
                return CarSerializer
            elif self.request.method == 'PUT':
                return CarSerializerUpdate
    def show(self, request, *args, **kwargs):
        all = Car.objects.filter(id=kwargs['pk']).last()
        if all is None:
            return Response({"Car": "Not fount"}, status=status.HTTP_404_NOT_FOUND)
        return Response(CarSerializer(all).data)
    def show2(self, request, *args, **kwargs):
        all = Car.objects.filter(id=kwargs['pk']).last()
        if all is None:
            return Response({"Car": "Not fount"}, status=status.HTTP_404_NOT_FOUND)
        return Response(CarSerializer(all).data)
    def post(self, request, *args, **kwargs):
        super().create(request)
        current_car = Car.objects.get(vin_code=request.data['vin_code'])
        data = ({'user': request.user.id,
                 'car': current_car.pk,
                 'order_type': 'owning'})
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
    def show_all_status(self, request, *args, **kwargs):
        all = self.queryset
        return Response(CarSerializerApprove(all, many=True).data)
    def show_approve_status(self, request, *args, **kwargs):
        car_obj = Car.objects.filter(id=kwargs['pk']).last()
        if car_obj is None:
            return Response({"Car": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(CarSerializerApprove(car_obj).data)
    def approve(self, request, *args, **kwargs):
        super().update(request, *args, **kwargs)
        car_obj = Car.objects.filter(id=kwargs['pk']).last()
        if car_obj is None:
            return Response({"Car": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(CarSerializerApprove(car_obj).data)