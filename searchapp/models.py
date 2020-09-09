from django.db import models

# Create your models here.
class India(models.Model):
    officename = models.CharField(max_length=50)
    pincode = models.IntegerField()
    officetype = models.CharField(max_length=3)
    deliverystatus = models.CharField(max_length=12)
    divisionname = models.CharField(max_length=23)
    regionname = models.CharField(max_length=23)
    circlename = models.CharField(max_length=16)
    taluk = models.CharField(max_length=42)
    districtname = models.CharField(max_length=24)
    statename = models.CharField(max_length=25)
    stateshort = models.CharField(max_length=5)
    
    class Meta:
        db_table = 'india'
