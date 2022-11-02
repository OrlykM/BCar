from .models import Car
from rest_framework import serializers

class CarSerializer(serializers.HyperlinkedModelSerializer):
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
                  'photo']
