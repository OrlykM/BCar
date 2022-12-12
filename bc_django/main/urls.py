from django.urls import path, include
from .views import *
from django.views.generic import TemplateView

urlpatterns = (
    #path('', TemplateView.as_view(template_name='index.html'), name=''),
    #path('', index, name=''),
    #path('user/', include(('user.urls', 'user'), namespace='user')),
)