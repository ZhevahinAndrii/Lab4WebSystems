from django.test import TestCase, Client
from django.urls import reverse

class ApiTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_regular_request(self):
        response = self.client.get(reverse('products:product_detail',args=(1,)))
        self.assertEqual(response.status_code,200)
        self.assertIn('1 name', response.json().values())

    def test_broken_url(self):
        response = self.client.get('/products/random_string')
        self.assertEqual(response.status_code,404)