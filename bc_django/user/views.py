from django.db import IntegrityError
from rest_framework.exceptions import APIException
from rest_framework import status
from .models import CustomUser, Order, Car
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import generics
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from user.serializers import OrderSerializer
from user.serializers import OwnerInfoSerializer
from car.serializers import CarSerializerUpdate
from datetime import datetime
from dateutil.relativedelta import relativedelta, MO
from django.utils import timezone
from django.db.models import Sum
from collections import defaultdict
from .serializers import *
from .perms import *
import json
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser, JSONParser


class GetCurrentUserId(viewsets.ModelViewSet):
    def get(self, request, **kwargs):
        return Response(request.user.id)


class WalletView(viewsets.ModelViewSet):
    serializer_class = WalletSerializer

    def get(self, request, **kwargs):
        user = CustomUser.objects.get(pk=request.user.id)
        return Response(user.money)
    def put(self, request, **kwargs):
        if float(request.data['money']) < 0:
            return Response({'message': 'Cannot add less than 0'},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            user = CustomUser.objects.get(pk=kwargs['user_id'])
            data = ({'money': user.money + float(request.data['money'])})
            wallet_serializer = WalletSerializer(user, data=data)
        except CustomUser.DoesNotExist:
            return Response({'message': 'This user is not exists'},
                            status=status.HTTP_400_BAD_REQUEST)

        if wallet_serializer.is_valid():
            wallet_serializer.save()
            return Response(data['money'], status=status.HTTP_201_CREATED)
        return Response(wallet_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OwnerInfoView(viewsets.ModelViewSet):
    queryset = Car.objects.all()

    def get_serializer_class(self):
        # print(self.request.method)
        if hasattr(self.request, 'method'):
            if self.request.method == 'GET':
                return OwnerInfoSerializer

    def get_permissions(self):
        if self.action in ['list'] and self.request.user.is_staff == 1:
            permission_classes = (IsModerator,)
            return [permission() for permission in permission_classes]
        elif self.action in ['list'] and self.request.user.is_staff == 0:
            permission_classes = (IsOwner,)
            return [permission() for permission in permission_classes]
        if self.action in ['update']:
            permission_classes = (IsOwner,)
            return [permission() for permission in permission_classes]
        if self.action in ['delete'] and self.request.user.is_superuser == 1:
            permission_classes = (permissions.IsAdminUser,)
            return [permission() for permission in permission_classes]
        elif self.action in ['delete'] and self.request.user.is_superuser == 0:
            permission_classes = (IsOwner,)
            return [permission() for permission in permission_classes]
        if self.action in ['show2']:
            permission_classes = (IsOwner,)
            return [permission() for permission in permission_classes]
        if self.action in ['show']:
            permission_classes = (IsModerator,)
            return [permission() for permission in permission_classes]

    def list(self, request, *args, **kwargs):
        serializer_tmp = OwnerInfoSerializer(data=request.data)
        if not serializer_tmp.is_valid():
            return Response({"error": serializer_tmp.errors},
                            status=status.HTTP_400_BAD_REQUEST)
        order_cur = Order.objects.filter(order_type='owning',
                                         user_id=kwargs['user_id']).all()
        order_cur_count = Order.objects.filter(
            order_type='owning',
            user_id=kwargs['user_id']
        ).count()

        order_count = []
        for i in order_cur.iterator():
            tmp = Order.objects.filter(
                order_type='renting',
                car_id=i.car_id).count()
            order_count.append(tmp)

        date_end = timezone.now()
        # days_data = serializer_tmp.data.get('number_of_days')
        days_data = request.GET.get('number_of_days')
        if days_data is None:
            return Response({"Error": "This fields(days) is required"},
                            status=status.HTTP_400_BAD_REQUEST)

        pickup_records = []
        for i in range(order_cur_count):
            car = Car.objects.filter(pk=order_cur[i].car_id).first()
            car_sum = 0
            for j in range(int(order_count[i])):
                order_data = Order.objects.filter(
                    order_type='renting',
                    car_id=order_cur[i].car_id)[j].date_creation

                result = (date_end - order_data).days
                print(result)

                if result <= int(days_data):
                    car_sum += Order.objects.filter(
                        order_type='renting',
                        car_id=order_cur[i].car_id)[j].order_price

            setattr(car, 'profit', car_sum)
            setattr(car, 'number_of_days', int(days_data))
            pickup_records.append(car)

        serializer = self.get_serializer(pickup_records, many=True)
        return Response(serializer.data)

    def show(self, request, *args, **kwargs):
        user_obj = CustomUser.objects.filter(id=kwargs['user_id']).last()
        if user_obj is None:
            return Response({"User": "Not fount"},
                            status=status.HTTP_404_NOT_FOUND)
        return Response(CustomUserInfo(user_obj).data)

    def show2(self, request, *args, **kwargs):
        user_obj = CustomUser.objects.filter(id=kwargs['user_id']).last()
        if user_obj is None:
            return Response({"User": "Not fount"},
                            status=status.HTTP_404_NOT_FOUND)
        return Response(CustomUserInfo(user_obj).data)

    def update(self, request, *args, **kwargs):
        user_obj = CustomUser.objects.filter(id=kwargs['user_id']).last()
        if user_obj is None:
            return Response({"User": "Not fount"},
                            status=status.HTTP_404_NOT_FOUND)
        super().update(request, *args, **kwargs)
        user_obj2 = CustomUser.objects.filter(id=kwargs['user_id']).last()
        return Response(CustomUserInfo(user_obj2).data)

    def delete(self, request, *args, **kwargs):
        user_obj = self.get_object()
        if user_obj is not None:
            car_object.delete()
            return Response({'user': 'Account was deleted'})
        else:
            return Response({'user': 'Not found'},
                            status=status.HTTP_404_NOT_FOUND)


class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.action in ['put', 'post']:
            permission_classes = (IsOwner,)
        return [permission() for permission in permission_classes]

    def post(self, request, **kwargs):
        if CustomUser.objects.get(pk=kwargs['user_id']).lic_serial is None or CustomUser.objects.get(pk=kwargs['user_id']).lic_serial == '':
            return Response("User has no driver license",
                            status=status.HTTP_403_FORBIDDEN)
        if CustomUser.objects.get(pk=kwargs['user_id']).money < 400:
            return Response("User has no money for order",
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            data = ({'user': kwargs['user_id'],
                     'car': kwargs['car_id'],
                     'order_type': 'renting'}
            )
            order_serializer = self.get_serializer(data=data)
            rented_car = Car.objects.get(pk=kwargs['car_id'], available_now=1)
            car_data = ({'available_now': 0})
            car_serializer = CarSerializerUpdate(rented_car, data=car_data)
        except Car.DoesNotExist:
            return Response({'message': 'This car is not available'},
                            status=status.HTTP_400_BAD_REQUEST)

        if order_serializer.is_valid() and car_serializer.is_valid():
            order_serializer.save()
            car_serializer.save()
            return Response(order_serializer.data,
                            status=status.HTTP_201_CREATED)
        return Response(order_serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, **kwargs):
        try:
            date_end = timezone.now()

            data = ({'user': kwargs['user_id'],
                     'car': kwargs['car_id'],
                     'order_type': 'renting'}
            )
            data.update({'date_end': date_end})
            order = Order.objects.filter(user=kwargs['user_id'],
                                         car=kwargs['car_id']).last()

            rented_car = Car.objects.get(pk=kwargs['car_id'], available_now=0)
            car_data = ({'available_now': 1})
            car_serializer = CarSerializerUpdate(rented_car, data=car_data)

            order_price = 20 + ((date_end - order.date_creation).total_seconds() / 60) * rented_car.price_per_min
            data.update({'date_end': date_end,
                         'order_price': order_price})
            order_serializer = OrderSerializer(order, data=data)

            user = CustomUser.objects.get(pk=kwargs['user_id'])
            user_data = ({'money': user.money - order_price})
            user_serializer = WalletSerializer(user, data=user_data)
        except Order.DoesNotExist:
            return Response({'message': 'This order is not exists'},
                            status=status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist:
            return Response({'message': 'This user is not exists'},
                            status=status.HTTP_400_BAD_REQUEST)
        except Car.DoesNotExist:
            return Response({'message': 'This car is not available'},
                            status=status.HTTP_400_BAD_REQUEST)

        if order_serializer.is_valid() and car_serializer.is_valid() and user_serializer.is_valid():
            order_serializer.save()
            car_serializer.save()
            user_serializer.save()
            return Response(order_price, status=status.HTTP_201_CREATED)
        return Response(order_serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


class LastOrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.action in ['get']:
            permission_classes = (IsOwner,)
        return [permission() for permission in permission_classes]


    def get(self, request, **kwargs):
        try:
            order = Order.objects.filter(user_id=kwargs['user_id'], date_end=None, order_type='renting').last()
            car_id = order.car_id
            return Response(car_id)
        except:
            return Response(0)


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })


class UploadLic(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = LicSerializerGET

    def put(self, request, *args, **kwargs):
        user_obj = CustomUser.objects.filter(pk=kwargs['pk']).last()
        if user_obj is None:
            return Response({"User": "Not found"},  status=status.HTTP_404_NOT_FOUND)
        super().update(request, *args, **kwargs)
        return Response('Changed')

    def get(self, request, *args, **kwargs):
        user_obj = CustomUser.objects.filter(pk=kwargs['pk']).last()
        if user_obj is None:
            return Response({"User": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(
                        {
                           "lic_serial":user_obj.lic_serial,
                        }
                    )


class GetInfoOrder(viewsets.ModelViewSet):
    def get(self, request, **kwargs):
        user_id_in = request.user.id
        print(request.user.id)
        if user_id_in is None:
            return Response({"Error": "not authorized "},
                            status=status.HTTP_401_UNAUTHORIZED)

        print("User_id", user_id_in, sep=" ")
        order = Order.objects.filter(user_id=user_id_in, order_type='renting').exclude(
            date_end__isnull=False).last()
        print("Order", order, sep=" ")
        if order is None:
            return Response({"Error": "Order not found"},
                            status=status.HTTP_404_NOT_FOUND)

        print("CAr_id", order.car_id)

        car_obj = Car.objects.get(id=order.car_id)

        if car_obj:
            setattr(order, 'make', car_obj.make)
            setattr(order, 'model', car_obj.model)
            setattr(order, 'price_per_min', car_obj.price_per_min)
            setattr(order, 'registration_number', car_obj.registration_number)
            setattr(order, 'car_id', car_obj.id)

        order_serializer = GetOrderInfo(order)
        print(order_serializer)
        # order = GetInfoOrder(order_serializer)
        return Response(order_serializer.data)