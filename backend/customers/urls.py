from django.urls import path
from .views import CustomerListAPI

urlpatterns = [
    path('', CustomerListAPI.as_view(), name='customer-list'),
]
