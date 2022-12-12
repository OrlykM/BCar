from .models import Car
from rest_framework import serializers
from django.core.validators import RegexValidator
class CarSerializer(serializers.HyperlinkedModelSerializer):
    registration_number = serializers.RegexField("^[A-Z]{2}[0-9]{4}[A-Z]{2}$")
    class Meta:
        model = Car
        fields = ['make',
                  'model',
                  'year',
                  'number_of_seats',
                  'body_type',
                  'category_type',
                  'fuel_type',
                  'vin_code',
                  'registration_number',
                  'insure_number',
                  'price_per_min',
                  'photo',
                  'longitude',
                  'latitude']

class CarSerializerUpdate(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Car
        fields = ['available_now']

class CarSerializerApprove(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Car
        fields = ['vin_code',
                  'is_approved'
                  ]