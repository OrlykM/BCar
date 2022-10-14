from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from article.models import *
from car.models import *

class CustomAccountManager(BaseUserManager):
    def create_user(self, phone,email, first_name, password, **other_fields):
        if not email:
            raise ValueError(gettext_lazy('You must provide email address'))
        email = self.normalize_email(email)
        user = self.model(phone=phone, email=email,
                          first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return  user

    def create_superuser(self,phone, email, first_name, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser=True.')
        return self.create_user(phone ,email, first_name, password, **other_fields)

    def create_staff(self,phone, email, first_name, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_active', True)
        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser=True.')
        return self.create_user(phone, email, first_name, password, **other_fields)
class CustomUser(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=150, blank=True)
    middle_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    car_right_photo = models.CharField(max_length=250, null=True, blank=True)
    photo = models.CharField(max_length=250, null=True, blank=True)
    password = models.CharField(max_length=250)
    phone = models.CharField(max_length=10, unique=True)
    username = models.CharField(max_length=250, null=False, unique=False)
    email = models.EmailField(_('email address'), max_length=254, unique=True)
    rating = models.IntegerField(default=100)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(default=timezone.now)
    objects = CustomAccountManager()

    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = ['email', 'first_name']

    def __str__(self):
        return self.phone

class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    second_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    salary = models.FloatField()
    postition = models.CharField(max_length=50)
    hire_date = models.DateTimeField()
    country = models.CharField(max_length=50)
    recidence_city = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    phone = models.IntegerField(unique=True)
    email = models.CharField(max_length=250, db_collation='big5_chinese_ci', unique=True)
    banck_account = models.CharField(max_length=1000)
    passport_data = models.IntegerField(unique=True)

    class Meta:
        managed = False
        db_table = 'employee'

    def __str__(self):
        return (self.phone)

class Maintain(models.Model):
    id = models.BigAutoField(primary_key=True)
    employee = models.ForeignKey(Employee, models.DO_NOTHING)
    car = models.ForeignKey(Car, models.DO_NOTHING)
    last_maintain = models.DateTimeField()
    address = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'maintain'
        unique_together = (('id', 'employee', 'car'),)
class Order(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey('user.CustomUser', models.DO_NOTHING)
    car = models.ForeignKey(Car, models.DO_NOTHING)
    order_type = models.CharField(max_length=9)
    date_creation = models.DateTimeField()
    date_end = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'order'
        unique_together = (('id', 'user', 'car'),)
class Review(models.Model):
    user = models.ForeignKey('user.CustomUser', models.DO_NOTHING)
    car = models.ForeignKey(Car, models.DO_NOTHING)
    review_text = models.TextField(blank=True, null=True)
    rate = models.FloatField()
    published = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'review'
        unique_together = (('id', 'user', 'car'),)