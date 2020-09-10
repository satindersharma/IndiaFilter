from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.
from django.http import JsonResponse
from .models import India
from django.core import serializers


class Home(TemplateView):
    template_name = 'home.html'

    def get(self, request, format=None):
        # /?district=hell&city=die
        district = request.GET.get('district')
        city = request.GET.get('city')
        print(district)
        print(city)
        # ff = India.objects.filter(
        #     districtname__icontains='ludhiana').values().distinct()
        # print(ff.count())
        # sff = serializers.serialize('json', ff)
        context = {'data': 'ff'}
        return render(request, "home.html", context)


class SearchData(TemplateView):
    def get(self, request, format=None):

        district = request.GET.get('district')
        city = request.GET.get('city')
        pincode = request.GET.get('pincode')
        print('diss',district)
        print('city',city)
        print('pincode',pincode)

        if city and ((not district) and (not pincode)):
            print('only city')
            k = India.objects.filter(taluk__icontains=city).values('districtname','taluk').distinct()
            print(k.query)
            return JsonResponse(list(k), safe=False)
        if pincode and ((not city) and (not district)):
            k = India.objects.filter(pincode=pincode).values('districtname','taluk','pincode').distinct()

            return JsonResponse(list(k), safe=False)

        if district and city and pincode:
            k = India.objects.filter(districtname__exact=district,taluk__exact=city).values('districtname','taluk','pincode').distinct()

            return JsonResponse(list(k), safe=False)
        if district and city:
            k = India.objects.filter(districtname__iexact=district).values('districtname','taluk').distinct()
            return JsonResponse(list(k), safe=False)
        if district:
            k = India.objects.filter(districtname__icontains=district).values('districtname','taluk').distinct()
            # print(k)
            return JsonResponse(list(k), safe=False)
        return render(request, "home.html", context)
class UniqueData(TemplateView):
    def get(self, request, format=None):
        k =India.objects.values('districtname','taluk','pincode').distinct()
        print(k.query)
        print(len(k))
        return JsonResponse(list(k), safe=False)