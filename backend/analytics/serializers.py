from rest_framework import serializers
from .models import CustomerMetrics

class CustomerMetricsSerializer(serializers.ModelSerializer):
    last_purchase_date = serializers.SerializerMethodField()

    class Meta:
        model = CustomerMetrics
        fields = '__all__'

    def get_last_purchase_date(self, obj):
        # Convert datetime to date
        return obj.last_purchase_date.date() if obj.last_purchase_date else None
