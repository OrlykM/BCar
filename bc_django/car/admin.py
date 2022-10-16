from django.contrib import admin
from .models import *

class CarAdmin(admin.ModelAdmin):
    list_display = ('id', 'registration_number', 'vin_code', 'model', 'price_per_min', 'available_now')
    list_display_links = ('id', 'registration_number', 'vin_code')
    search_fields = ('id', 'model', 'registration_number', 'vin_code')

class CategoryCarAdmin(admin.ModelAdmin):
    list_display = ('id', 'category_name')
    list_display_links = ('id', 'category_name')
    search_fields = ('id', 'category_name')

admin.site.register(Car,CarAdmin)
admin.site.register(CategoryCar, CategoryCarAdmin)
