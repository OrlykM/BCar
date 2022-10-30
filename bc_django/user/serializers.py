from django.db import transaction
from .models import CustomUser, DrivingLicence
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from allauth.account.adapter import get_adapter
from dj_rest_auth.registration.serializers import RegisterSerializer


class DriverLicSerializer(serializers.ModelSerializer):
    date_of_birth = serializers.CharField(max_length=10)
    series_number = serializers.CharField(max_length=9)

    def create(self, validated_data):
        lic = DrivingLicence.objects.create(
            date_of_birth=validated_data['date_of_birth'],
            series_number=validated_data['series_number'],
        )
        lic.save()

        return lic
    class Meta:
        model = DrivingLicence
        fields = (
            'date_of_birth',
            'series_number',
        )
        required_fields = ('date_of_birth', 'series_number')



class CustomRegisterSerializer(RegisterSerializer):
    phone = serializers.CharField(max_length=10)

    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()
        return {
            'phone': self.validated_data.get('phone', ''),
            'email': self.validated_data.get('email', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password1', ''),
        }
    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.phone = self.data.get('phone')
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