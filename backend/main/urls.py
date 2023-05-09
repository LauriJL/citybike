from rest_framework.routers import DefaultRouter
from django.urls import path

# Assets
from .views import StationList, RideList, RidesTo, RidesFrom, RidesReturn, StationSearch, RideSearch
app_name = 'main'

router = DefaultRouter()

router.register('stations', StationList, basename='station')
router.register('rides', RideList, basename='ride')
urlpatterns = [
    path('ret_station/<int:pk>/', RidesTo.as_view()),
    path('dep_station/<int:pk>/', RidesFrom.as_view()),
    path('return/<int:pk>/', RidesReturn.as_view()),
    path('stations/', StationSearch.as_view(), name='stationsearch'),
    path('rides/<str:pk1>&<str:pk2>', RideSearch.as_view(), name='ridesearch')
]
urlpatterns += router.urls
