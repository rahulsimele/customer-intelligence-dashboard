from rest_framework.generics import ListAPIView
from .models import CustomerMetrics
from .serializers import CustomerMetricsSerializer


class CustomerMetricsAPI(ListAPIView):
    queryset = CustomerMetrics.objects.all()
    serializer_class = CustomerMetricsSerializer
