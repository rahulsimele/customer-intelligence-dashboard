from rest_framework.generics import ListAPIView
from .models import Customer
from .serializers import CustomerSerializer


class CustomerListAPI(ListAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
