from django.db import transaction
from .models import CustomUser, Order, Car
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.serializers import ValidationError
from rest_framework.validators import UniqueValidator

from allauth.account.adapter import get_adapter
from dj_rest_auth.registration.serializers import RegisterSerializer

def required(value):
    if value is None:
        raise Exeption('This field is required')


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    car = serializers.PrimaryKeyRelatedField(queryset=Car.objects.all())

    class Meta:
        model = Order
        fields = ['user',
                  'car',
                  'order_type',
                  'date_creation',
                  'date_end',
                  'order_price'
                  ]


class CustomRegisterSerializer(RegisterSerializer):
    phone = serializers.CharField(max_length=10,
                                  validators=[UniqueValidator(
                                      queryset=CustomUser.objects.all())])
    # uncomment lic_serial for registration here and in return

    # lic_serial = serializers.CharField(max_length=9,
    #                                    validators=[UniqueValidator(
    #                                        queryset=CustomUser.objects.all())])

    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()

        return {
            'phone': self.validated_data.get('phone', ''),
            'email': self.validated_data.get('email', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password1', ''),
            # 'lic_serial': self.validated_data.get('lic_serial', ''),
        }

    # Define transaction.atomic to rollback the save operation in case of error

    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.phone = self.data.get('phone')
        user.lic_serial = self.data.get('lic_serial')
        user.save()
        return user


class CustomUserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'email',
            'phone',
            'rating',
        )
        read_only_fields = ('email', 'phone', 'rating')


class OwnerInfoSerializer(serializers.ModelSerializer):
    profit = serializers.FloatField(required=False, read_only=True)
    # number_of_days = serializers.IntegerField(required=True)

    class Meta:
        model = Car
        fields = (
            'make',
            'model',
            'category_type',
            'registration_number',
            'profit',
            # 'number_of_days',
           )

        read_only_fields = (
            'make', 'model', 'category_type', 'registration_number', 'profit')
