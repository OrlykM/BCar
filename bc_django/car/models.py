from django.db import models
from user.models import *
from article.models import *


class Car(models.Model):
    model_name = models.CharField(max_length=45)
    photo = models.CharField(max_length=45, blank=True, null=True)
    category_cars = models.ForeignKey('CategoryCar', models.DO_NOTHING)
    registration_number = models.CharField(max_length=8)
    vin_code = models.CharField(max_length=45)
    insure_number = models.IntegerField()
    maker = models.CharField(max_length=3)
    year_registration = models.DateField()

    new_status = 'new'
    old_status = 'old'
    status_enum = ((new_status, 'new'),(old_status, 'old'))
    status = models.CharField(choices=status_enum, max_length=5)
    num_of_sits = models.IntegerField()
    fuel_tank = models.FloatField()
    price_per_min = models.FloatField()
    available_now = models.BooleanField(default=False)

    class Meta:
        managed = False
        db_table = 'car'

    def __str__(self):
        return self.vin_code


class CategoryCar(models.Model):
    passenger_car = 'passenger car'
    sedan = 'sedan'
    coupe = 'coupe'
    hatch_back = 'hatch-back'
    hybrid = 'hybrid'
    minivan = 'minivan'
    suv = 'suv'
    convertible = 'convertible'
    sports_car = 'sports car'

    cars_enum = (
        (passenger_car, 'passenger car'),
        (sedan, 'sedan'),
        (coupe, 'coupe'),
        (hatch_back, 'hatch-back'),
        (hybrid, 'hybrid'),
        (minivan, 'minivan'),
        (suv, 'suv'),
        (convertible, 'convertible'),
        (sports_car, 'sports car')
    )

    category_name = models.CharField(choices=cars_enum, max_length=50)

    class Meta:
        managed = False
        db_table = 'category_car'

    def __str__(self):
        return self.category_name