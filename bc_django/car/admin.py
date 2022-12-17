from django.contrib import admin
from .models import *

class CarImageAdmin(admin.ModelAdmin):
  pass

class CarImageInline(admin.StackedInline):
  model = CarImage
  max_num = 10
  extra = 0

class CarAdmin(admin.ModelAdmin):
    inlines = [CarImageInline,]
    list_display = ('id', 'registration_number', 'vin_code', 'make', 'model', 'price_per_min', 'available_now')
    list_display_links = ('id', 'registration_number', 'vin_code')
    search_fields = ('id', 'model', 'registration_number', 'vin_code')


admin.site.register(CarImage, CarImageAdmin)
admin.site.register(Car,CarAdmin)
