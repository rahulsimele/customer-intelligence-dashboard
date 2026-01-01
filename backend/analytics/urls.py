from django.urls import path
from .views import CustomerMetricsAPI

urlpatterns = [
    path('', CustomerMetricsAPI.as_view(), name='customer-metrics'),
]
