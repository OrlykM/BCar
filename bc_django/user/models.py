from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from article.models import *
from car.models import *
from datetime import datetime
from django.utils import timezone


class CustomAccountManager(BaseUserManager):
    def create_user(self, phone, email, lic_serial, password, **other_fields):
        if not phone:
            raise ValueError(gettext_lazy('You must provide phone number'))
        if not email:
            raise ValueError(gettext_lazy('You must provide email address'))
        if not lic_serial:
            raise ValueError(gettext_lazy('You must provide driver license serial number'))
        email = self.normalize_email(email)
        user = self.model(phone=phone, email=email, lic_serial=lic_serial, **other_fields)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, phone, email, lic_serial, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser=True.')
        return self.create_user(phone, email, lic_serial, password, **other_fields)
    def create_staff(self, phone, email, lic_serial, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_active', True)
        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser=True.')
        return self.create_user(phone, email, lic_serial, password, **other_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=150)
    middle_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    photo = models.CharField(max_length=250, blank=True, null=True)
    username = models.CharField(max_length=250)
    password = models.CharField(max_length=250)
    phone = models.CharField(unique=True, max_length=13)
    email = models.CharField(unique=True, max_length=254)
    rating = models.IntegerField(default=100)
    is_staff = models.IntegerField(default=False)
    is_active = models.IntegerField(default=True)
    is_superuser = models.IntegerField(default=False)
    is_allowed_orders = models.IntegerField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(default=timezone.now)

    lic_date_birth = models.DateField(null=True)
    lic_date_issue = models.DateField(null=True)
    lic_date_completion = models.DateField(null=True)
    lic_serial = models.CharField(unique=True, max_length=9, null=True)
    lic_photo = models.CharField(max_length=254, blank=True, null=True)

    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = ['email', 'lic_serial']
    objects = CustomAccountManager()

    def __str__(self):
        return self.phone


class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    second_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    salary = models.FloatField()
    postition = models.CharField(max_length=14)
    hire_date = models.DateTimeField()
    recidence_city = models.CharField(max_length=4)
    address = models.CharField(max_length=45)
    status = models.CharField(max_length=17)
    phone = models.IntegerField(unique=True)
    email = models.CharField(unique=True, max_length=45)
    banck_account = models.CharField(unique=True, max_length=254)
    passport_data = models.IntegerField(unique=True)

    class Meta:
        managed = True
        db_table = 'employee'

    def __str__(self):
        return (self.phone)


class Maintain(models.Model):
    employee = models.ForeignKey(Employee, models.DO_NOTHING)
    car = models.ForeignKey(Car, models.DO_NOTHING)
    last_maintain = models.DateTimeField()
    address = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'maintain'
        unique_together = (('id', 'employee', 'car'),)


class Order(models.Model):
    user = models.ForeignKey('user.CustomUser', models.DO_NOTHING)
    car = models.ForeignKey(Car, models.DO_NOTHING)
    order_type = models.CharField(max_length=9)
    order_price = models.FloatField(default=0)
    date_creation = models.DateTimeField(default=timezone.now)
    date_end = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'order'
        unique_together = (('id', 'user', 'car'),)


class Review(models.Model):
    user = models.ForeignKey('user.CustomUser', models.DO_NOTHING)
    car = models.ForeignKey(Car, models.DO_NOTHING)
    review_text = models.TextField(blank=True, null=True)
    rate = models.FloatField()
    published = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'review'
        unique_together = (('id', 'user', 'car'),)
