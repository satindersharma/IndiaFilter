from django.db import models

# Create your models here.
class India(models.Model):
    officename = models.CharField(max_length=256)
    pincode = models.IntegerField()
    officetype = models.CharField(max_length=256)
    deliverystatus = models.CharField(max_length=256)
    divisionname = models.CharField(max_length=256)
    regionname = models.CharField(max_length=256)
    circlename = models.CharField(max_length=256)
    taluk = models.CharField(max_length=256)
    districtname = models.CharField(max_length=256)
    statename = models.CharField(max_length=256)
    stateshort = models.CharField(max_length=256)
    
    class Meta:
        db_table = 'india'
