from django.test import TestCase, Client
from django.urls import reverse
from .models import WeatherSearch

class WeatherAppTests(TestCase):
    
    def setUp(self):
        self.client = Client()
        
    def test_index_page_loads(self):
        """Test that the index page loads successfully"""
        response = self.client.get(reverse('weather_app:index'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')
    
    def test_history_page_loads(self):
        """Test that the history page loads successfully"""
        response = self.client.get(reverse('weather_app:history'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'history.html')
    
    def test_weather_search_model(self):
        """Test WeatherSearch model creation"""
        search = WeatherSearch.objects.create(
            city='London',
            country='GB',
            temperature=15.5,
            description='Clear sky',
            humidity=65,
            wind_speed=3.5
        )
        self.assertEqual(str(search), f"London - {search.searched_at.strftime('%Y-%m-%d %H:%M')}")
        self.assertEqual(WeatherSearch.objects.count(), 1)
