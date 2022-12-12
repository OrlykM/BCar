from django.contrib import admin
from .models import *

class CarAdmin(admin.ModelAdmin):
    list_display = ('id', 'registration_number', 'vin_code', 'make', 'model', 'price_per_min', 'available_now')
    list_display_links = ('id', 'registration_number', 'vin_code')
    search_fields = ('id', 'model', 'registration_number', 'vin_code')

admin.site.register(Car,CarAdmin)
