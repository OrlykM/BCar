from .models import Car, CategoryCar
from rest_framework import serializers

class CarSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Car
        fields = ['make',
                  'model',
                  'year',
                  'number_of_seats',
                  'class_field',
                  'vin_code',
                  'registration_number',
                  'insure_number',
                  'photo']

class CategoryCarSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CategoryCar
        fields = ['category_name']