from rest_framework.test import APIClient
from rest_framework import status
from django.test import TestCase


class URLTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_stations(self):
        url = '/api/stations/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_rides(self):
        url = '/api/rides/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
