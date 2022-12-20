from django.db import transaction
from .models import CustomUser, Order, Car
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.serializers import ValidationError
from rest_framework.validators import UniqueValidator
from django.core.validators import RegexValidator, MinValueValidator
from allauth.account.adapter import get_adapter
from dj_rest_auth.registration.serializers import RegisterSerializer

def required(value):
    if value is None:
        raise Exeption('This field is required')
class WalletSerializer(serializers.ModelSerializer):
    money = serializers.FloatField(validators=[MinValueValidator(0)], required=True)

    class Meta:
        model = CustomUser
        fields = (
            "money",
        )
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
    phone_regex = RegexValidator(regex=r'^[+]{1}?1?\d{9,12}$',
                                 message="Phone number must be entered in the format: '+380991234567'.")

    phone = serializers.CharField(max_length=13,
                                  validators=[UniqueValidator(
                                      queryset=CustomUser.objects.all()),
                                      phone_regex])

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
class CustomUserInfo(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            "first_name",
            "last_name",
            "phone",
            "email",
            "lic_serial",
            "is_active",
            "rating",
        )

class LicSerializerGET(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            "lic_date_birth",
            "lic_serial",
            "lic_photo"
        )

class GetOrderInfo(serializers.ModelSerializer):
    car_id = serializers.IntegerField(read_only=True)
    make = serializers.CharField(read_only=True)
    model = serializers.CharField(read_only=True)
    registration_number = serializers.CharField(read_only=True)
    price_per_min = serializers.FloatField(read_only=True)

    class Meta:
        model = Order
        fields = (
            "car_id",
            "id",
            "user_id",
            "date_creation",
            "date_end",
            "order_price",
            "order_type",
            "make",
            "model",
            "price_per_min",
            "registration_number",
        )