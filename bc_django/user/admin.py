from django.contrib import admin
from .models import *
# Register your models here.

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'username', 'is_staff', 'is_superuser', 'is_active', 'rating')
    list_display_links = ('id', 'email', 'username')
    search_field = ('id', 'email', 'username', 'rating')

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'address', 'salary')
    list_display_links = ('id', 'email')
    search_field = ('id', 'email')
admin.site.register(CustomUser,CustomUserAdmin)
admin.site.register(Employee, EmployeeAdmin)
