
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


def getuniquejson():
    k = India.objects.values('districtname','taluk','pincode').distinct().annotate(hereiscount = Count('taluk')).order_by('-hereiscount')
    # k = India.objects.values('pincode').annotate(Max('pincode'),Min('pincode')).distinct()
    print(k.query)
    print('total',k.count())
    for x in k[:10]:
        print(x)

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

def showqeryfun():

    # if city and ((not district) and (not pincode)):
    k = India.objects.filter(taluk__istartswith='ludh').values('districtname','taluk','pincode').distinct()
    # SELECT DISTINCT `india`.`districtname`, `india`.`taluk`, `india`.`pincode` FROM `india` WHERE `india`.`taluk` LIKE ludh%
    print(k.query)
    # return JsonResponse(list(k), safe=False)

    # if pincode and ((not city) and (not district)):
    k = India.objects.filter(pincode=141001).values('districtname','taluk','pincode').distinct()
    # SELECT DISTINCT `india`.`districtname`, `india`.`taluk`, `india`.`pincode` FROM `india` WHERE `india`.`pincode` = 141001
    print(k.query)
    # return JsonResponse(list(k), safe=False)

    # if district and city and pincode:
    k = India.objects.filter(districtname__exact='Ludhiana',taluk__exact='Ludhiana').values('districtname','taluk','pincode').distinct()
    # SELECT DISTINCT `india`.`districtname`, `india`.`taluk`, `india`.`pincode` FROM `india` WHERE (`india`.`districtname` = Ludhiana AND `india`.`taluk` = Ludhiana)
    print(k.query)
    # return JsonResponse(list(k), safe=False)

    # if district and city:
    k = India.objects.filter(districtname__iexact='Ludhiana').values('districtname','taluk').distinct()
    # SELECT DISTINCT `india`.`districtname`, `india`.`taluk` FROM `india` WHERE `india`.`districtname` LIKE Ludhiana
    print(k.query)
    # return JsonResponse(list(k), safe=False)


    # if district:
    k = India.objects.filter(districtname__icontains='Ludh').values('districtname','taluk').distinct()
    # SELECT DISTINCT `india`.`districtname`, `india`.`taluk` FROM `india` WHERE `india`.`districtname` LIKE %Ludh%
    print(k.query)
    # return JsonResponse(list(k), safe=False)









# getdist('ludhiana','Ludhiana')
# getdist('ludhiana')
# getuniquejson()
showqeryfun()