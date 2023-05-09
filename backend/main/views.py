from rest_framework import viewsets, generics, filters
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from .models import CitybikeRides, CitybikeStations
from .serializers import RidesSerializer, StationsSerializer

# Get stations


class StationList(viewsets.ModelViewSet):
    serializer_class = StationsSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(CitybikeStations, id=item)

    def get_queryset(self):
        return CitybikeStations.objects.all().order_by('name_fi')

# Search for stations


class StationSearch(generics.ListAPIView):
    queryset = CitybikeStations.objects.all().order_by('name_fi')
    serializer_class = StationsSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^name_fi']

# Get rides


class RideList(viewsets.ModelViewSet, PageNumberPagination):
    serializer_class = RidesSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(CitybikeRides, id=item)

    def get_queryset(self):
        return CitybikeRides.objects.all().order_by('dep_time')

# Search for rides


class RideSearch(generics.ListAPIView):
    serializer_class = RidesSerializer

    def get_queryset(self):
        dep_station = self.kwargs['pk1']
        ret_station = self.kwargs['pk2']
        rides = CitybikeRides.objects.filter(
            dep_station=dep_station, ret_station=ret_station).order_by('-dep_time')
        return rides


# Get rides to, from and returned to station


class RidesTo(generics.ListAPIView):
    serializer_class = RidesSerializer

    def get_queryset(self):
        ret_station_id = self.kwargs['pk']
        rides = CitybikeRides.objects.filter(
            ret_station_id=ret_station_id).order_by('-ret_time')
        return rides


class RidesFrom(generics.ListAPIView):
    serializer_class = RidesSerializer

    def get_queryset(self):
        dep_station_id = self.kwargs['pk']
        rides = CitybikeRides.objects.filter(
            dep_station_id=dep_station_id).order_by('-dep_time')
        return rides


class RidesReturn(generics.ListAPIView):
    serializer_class = RidesSerializer

    def get_queryset(self):
        dep_station_id = self.kwargs['pk']
        ret_station_id = self.kwargs['pk']
        rides = CitybikeRides.objects.filter(
            dep_station_id=dep_station_id, ret_station_id=ret_station_id)
        return rides
