
from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.Home.as_view(),name='home'),
    path('select/', views.SelectHome.as_view(),name='home'),
    # path('',include('searchapp.urls')),
    path('search/', views.SearchData.as_view(),name='search'),
    path('unique/', views.UniqueData.as_view(),name='search'),
]
