from django.db import models
from user.models import *
from article.models import *


class Car(models.Model):
    make = models.CharField(max_length=45)
    model = models.CharField(max_length=45)
    class_field = models.CharField(db_column='class',
                                   max_length=10)  # Field renamed because it was a Python reserved word.
    vin_code = models.CharField(unique=True, max_length=17)
    registration_number = models.CharField(unique=True, max_length=8)
    category_cars = models.ForeignKey('CategoryCar', models.DO_NOTHING)
    insure_number = models.CharField(unique=True, max_length=13)
    year = models.TextField()  # This field type is a guess.
    number_of_seats = models.IntegerField(db_column='number of seats')  # Field renamed to remove unsuitable characters.
    fuel_tank_left = models.FloatField(default=0)
    price_per_min = models.FloatField(default=0)
    available_now = models.IntegerField(default=0)
    photo = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = True
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
        managed = True
        db_table = 'category_car'

    def __str__(self):
        return self.category_name

class DrivingLicence(models.Model):
    is_valid = models.IntegerField()
    date_of_birdth = models.DateField()
    date_of_issue = models.DateField()
    date_of_complition = models.DateField()
    issued_by = models.CharField(max_length=7)
    series_number = models.CharField(unique=True, max_length=9)
    car_photo_front = models.CharField(max_length=254, blank=True, null=True)
    car_photo_back = models.CharField(max_length=254, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'driving_licence'