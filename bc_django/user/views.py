from django.db import IntegrityError
from rest_framework.exceptions import APIException
from rest_framework.status import HTTP_400_BAD_REQUEST

from .models import CustomUser, DrivingLicence
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import DriverLicSerializer

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

class LicenseViewSet(viewsets.ModelViewSet):
    queryset = DrivingLicence.objects.all()
    serializer_class = DriverLicSerializer

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError as e:
            raise APIException(detail=str(e), code=HTTP_400_BAD_REQUEST)

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
