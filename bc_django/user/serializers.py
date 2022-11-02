from django.db import transaction
from .models import CustomUser
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.serializers import ValidationError
from rest_framework.validators import UniqueValidator

from allauth.account.adapter import get_adapter
from dj_rest_auth.registration.serializers import RegisterSerializer


class CustomRegisterSerializer(RegisterSerializer):
    phone = serializers.CharField(max_length=10,
                                  validators=[UniqueValidator(queryset=CustomUser.objects.all())])
    lic_serial = serializers.CharField(max_length=9,
                                       validators=[UniqueValidator(queryset=CustomUser.objects.all())])

    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()
        return {
            'phone': self.validated_data.get('phone', ''),
            'email': self.validated_data.get('email', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password1', ''),
            'lic_serial': self.validated_data.get('lic_serial', ''),
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