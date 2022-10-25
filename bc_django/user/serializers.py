from django.db import transaction
from .models import CustomUser
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from allauth.account.adapter import get_adapter
from dj_rest_auth.registration.serializers import RegisterSerializer

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['url', 'phone', 'email', 'is_active', 'password', 'rating', 'username']
        #fields = '__all__'
        extra_kwargs = {'username': {'required': False},
                        'password': {'write_only': False, 'required': True},
                        'is_active': {'read_only': True},
                        'rating': {'read_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

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
        )
        read_only_fields = ('email', 'phone')