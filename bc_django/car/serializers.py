from .models import Car, CarImage
from rest_framework import serializers
from django.core.validators import RegexValidator


class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        exclude = ('car', )

class CarSerializer(serializers.HyperlinkedModelSerializer):
    registration_number = serializers.RegexField("^[A-Z]{2}[0-9]{4}[A-Z]{2}$")
    photos = CarImageSerializer()
    """
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=1000000, allow_empty_file=False, use_url=False),
        write_only=True)
    """
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
                  'photos'
                  ]
    """
    def create(self, validated_data):
        uploaded_data = validated_data.pop('uploaded_images')
        new_product = Car.objects.create(**validated_data)
        for uploaded_item in uploaded_data:
            new_product_image = CarImage.objects.create(car=new_product, photo=uploaded_item)
        return new_product
    """

class CarSerializerCreate(serializers.HyperlinkedModelSerializer):
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
                  ]
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