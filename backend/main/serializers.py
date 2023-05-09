from rest_framework import serializers
from . import models


class StationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CitybikeStations
        fields = '__all__'


class RidesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CitybikeRides
        fields = '__all__'
