from .models import Car, CategoryCar
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import generics
from rest_framework import filters
from .serializers import CarSerializer, CategoryCarSerializer
from django_filters.rest_framework import DjangoFilterBackend


class CarViewFilterSet(generics.ListAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['number_of_seats', 'class_field']
    ordering_fields = ['number_of_seats', 'class_field']
    #permission_classes = [permissions.IsAuthenticated]

class CarViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticated]

class CategoryCarViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CategoryCar.objects.all()
    serializer_class = CategoryCarSerializer
    permission_classes = [permissions.AllowAny]