from django.db import models


class Customer(models.Model):
    customer_id = models.IntegerField(primary_key=True)
    customer_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=1)
    age = models.IntegerField()
    city = models.CharField(max_length=50)
    signup_date = models.DateField()

    class Meta:
        managed = False
        db_table = 'customers'
