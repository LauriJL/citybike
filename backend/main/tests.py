from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from rest_framework import status
from django.test import TestCase


class URLTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_stations(self):
        url = '/api/stations/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_ridess(self):
        url = '/api/rides/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
