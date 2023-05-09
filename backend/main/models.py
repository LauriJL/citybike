from django.db import models


class CitybikeStations(models.Model):
    id = models.IntegerField(primary_key=True)
    name_fi = models.CharField(unique=True, max_length=50)
    name_se = models.CharField(max_length=50)
    name_en = models.CharField(max_length=50)
    address_fi = models.CharField(max_length=50)
    address_se = models.CharField(max_length=50)
    city_fi = models.CharField(max_length=25)
    city_se = models.CharField(max_length=25)
    bike_operator = models.CharField(max_length=50)
    capacity = models.IntegerField()
    x_coord = models.FloatField()
    y_coord = models.FloatField()

    def __str__(self):
        return str(self.name_fi)

    class Meta:
        managed = True
        db_table = 'citybike_stations'


class CitybikeRides(models.Model):
    id = models.IntegerField(primary_key=True)
    dep_time = models.DateTimeField()
    ret_time = models.DateTimeField()
    dep_station_id = models.ForeignKey(
        'CitybikeStations', models.DO_NOTHING, db_column='dep_station_id', to_field='id', related_name='dep_station')
    dep_station_name = models.CharField(max_length=50)
    ret_station_id = models.ForeignKey(
        'CitybikeStations', models.DO_NOTHING, db_column='ret_station_id', to_field='id', related_name='ret_station')
    ret_station_name = models.CharField(max_length=50)
    dist = models.FloatField(blank=True, null=True)
    duration = models.IntegerField()

    def __str__(self):
        return str('From {} to {} ({}).'.format(self.dep_station_name, self.ret_station_name, self.dep_time))

    class Meta:
        managed = True
        db_table = 'citybike_rides'
