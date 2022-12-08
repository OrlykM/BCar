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
import json


class OwnerInfoView(viewsets.ModelViewSet):
    queryset = Car.objects.all()

    def get_serializer_class(self):
        # print(self.request.method)
        if hasattr(self.request, 'method'):
            if self.request.method == 'GET':
                return OwnerInfoSerializer

    def list(self, request, *args, **kwargs):

        # change it from list to post, because get method can`t have a request
        # body in http
        # request body = {"number_of_days" : n"}

        # days_data = json.loads(request.body)
        # print(days_data)

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


class OrderView(generics.GenericAPIView):
    serializer_class = OrderSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request, **kwargs):
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

            order_price = ((
                                   date_end - order.date_creation).total_seconds() / 60) * rented_car.price_per_min
            data.update({'date_end': date_end,
                         'order_price': order_price})
            order_serializer = OrderSerializer(order, data=data)
        except Order.DoesNotExist:
            return Response({'message': 'This order is not exists'},
                            status=status.HTTP_400_BAD_REQUEST)
        except Car.DoesNotExist:
            return Response({'message': 'This car is not available'},
                            status=status.HTTP_400_BAD_REQUEST)

        if order_serializer.is_valid() and car_serializer.is_valid():
            order_serializer.save()
            car_serializer.save()
            return Response(order_price, status=status.HTTP_201_CREATED)
        return Response(order_serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


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
