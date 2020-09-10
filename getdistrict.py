
import django
from django.db.models.functions import TruncDay, Now, TruncMonth, TruncYear, TruncHour
from datetime import timedelta, date, datetime
from calendar import monthrange
import django
from sys import argv
import os
from django.utils import timezone
import random
from time import sleep
from django.db.models import Avg, Max, Min, Count, F, ExpressionWrapper, DecimalField
# the below line is copied from wsgi file
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'IndiaSearch.settings')
django.setup()
from searchapp.models import India




def getdist(ds=None,ct=None):

    if None not in (ds,ct):
        k = India.objects.filter(districtname__iexact=ds,taluk__iexact=ct).values('districtname','taluk','pincode').distinct()
        print(k.query)
        print('total',k.count())
        for x in k[:10]:
            print(x)

    if ds is not None:
        k = India.objects.filter(districtname__icontains=ds).values('districtname').distinct()
        print(k.query)
        print('total',k.count())
        for x in k[:10]:
            print(x)

getdist('ludhiana','Ludhiana')
# getdist('ludhiana')
