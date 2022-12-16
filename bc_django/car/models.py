from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
import datetime
from user.models import *
# from article.models import *
def upload(instance, filename):
    return 'licence/{filename}'.format(filename=filename)
def year_choices():
    return [(r,r) for r in range(2012, datetime.date.today().year+1)]
def current_year():
    return datetime.date.today().year
class Car(models.Model):
    make = models.CharField(max_length=45)
    model = models.CharField(max_length=45)
    vin_code = models.CharField(unique=True, max_length=17)
    registration_number = models.CharField(unique=True, max_length=8)

    sedan = 'sedan'
    estate = 'estate'
    hatchback = 'hatchback'
    liftback = 'liftback'
    coupe = 'coupe'
    convertible = 'convertible'
    minivan = 'minivan'
    van = 'van'
    suv = 'suv'
    carbody_enum = (
        (sedan, 'sedan'),
        (estate, 'estate'),
        (hatchback, 'hatchback'),
        (liftback, 'liftback'),
        (coupe, 'coupe'),
        (convertible, 'convertible'),
        (minivan, 'minivan'),
        (van, 'van'),
        (suv, 'suv'),
    )
    body_type = models.CharField(choices=carbody_enum, max_length=50)

    standart = 'standard'
    premium = 'premium'
    commercial = 'commercial'
    carcategory_enum = (
        (standart, 'standard'),
        (premium, 'premium'),
        (commercial, 'commercial'),
    )
    category_type = models.CharField(choices=carcategory_enum, max_length=50)

    insure_number = models.CharField(unique=True, max_length=13)
    year = models.IntegerField(choices=year_choices(), default=current_year())
    number_of_seats = models.IntegerField(default=2)

    a92 = 'Petrol (A92)'
    a95 = 'Petrol (A95)'
    a98 = 'Petrol (A98)'
    diesel = 'Diesel'
    electric = 'Electric'
    gas = 'Gas'
    carfueltype_enum = (
        (a92, 'Petrol (A92)'),
        (a95, 'Petrol (A95)'),
        (a98, 'Petrol (A98)'),
        (diesel, 'Diesel'),
        (electric, 'Electric'),
        (gas, 'Gas'),
    )
    fuel_type = models.CharField(choices=carfueltype_enum, max_length=12)
    fuel_tank_left = models.FloatField(default=0)
    price_per_min = models.FloatField(default=0)
    available_now = models.IntegerField(default=False)
    photo = models.ImageField(upload_to="images/", blank=True, null=True)
    longitude = models.FloatField(default=0.0000)
    latitude = models.FloatField(default=0.0000)
    is_approved = models.IntegerField(default=False)
    class Meta:
        managed = True
        db_table = 'car'

    def __str__(self):
        return self.vin_code
