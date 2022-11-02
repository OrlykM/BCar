from .models import Car
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import generics
from rest_framework import filters
from .serializers import CarSerializer
from django_filters.rest_framework import DjangoFilterBackend


class CarViewFilterSet(generics.ListAPIView):
    queryset = Car.objects.filter(is_approved=True, available_now=True)
    serializer_class = CarSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['number_of_seats', 'category_type', 'body_type', 'fuel_type']
    ordering_fields = ['number_of_seats', 'price_per_min']
    #permission_classes = [permissions.IsAuthenticated]

class CarViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticated]
