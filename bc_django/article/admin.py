from django.contrib import admin
from .models import *

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'published')
    list_display_links = ('id', 'title')
    search_fields = ('id', 'title')

class ArticleClassAdmin(admin.ModelAdmin):
    list_display = ('id', 'category_name')
    list_display_links = ('id', 'category_name')
    search_fields = ('id', 'category_name')

admin.site.register(Article, ArticleAdmin)
admin.site.register(ArticleCategory, ArticleClassAdmin)
