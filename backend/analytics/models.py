from django.db import models


class CustomerMetrics(models.Model):
    customer_id = models.IntegerField(primary_key=True)
    total_spent = models.FloatField()
    total_orders = models.IntegerField()
    last_purchase_date = models.DateField()

    class Meta:
        managed = False
        db_table = 'customer_metrics'
