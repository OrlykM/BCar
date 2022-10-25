from .models import Car, CategoryCar
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import CarSerializer, CategoryCarSerializer

# Create your views here.
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