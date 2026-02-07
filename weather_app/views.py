from django.shortcuts import render
from django.conf import settings
from .models import WeatherSearch
import requests
from datetime import datetime

def get_weather_data(city):
    """Fetch weather data from OpenWeatherMap API"""
    api_key = settings.OPENWEATHER_API_KEY
    
    # For demo purposes, if API key is not set, return sample data
    if api_key == 'your_api_key_here':
        return {
            'city': city.title(),
            'country': 'Sample',
            'temperature': 25.5,
            'feels_like': 26.2,
            'description': 'Partly cloudy',
            'humidity': 65,
            'wind_speed': 3.5,
            'pressure': 1013,
            'visibility': 10,
            'icon': '02d',
            'temp_min': 23.0,
            'temp_max': 28.0,
            'sunrise': '06:30',
            'sunset': '18:45',
            'error': None
        }
    
    base_url = "http://api.openweathermap.org/data/2.5/weather"
    params = {
        'q': city,
        'appid': api_key,
        'units': 'metric'
    }
    
    try:
        response = requests.get(base_url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        # Parse the response
        weather_data = {
            'city': data['name'],
            'country': data['sys']['country'],
            'temperature': round(data['main']['temp'], 1),
            'feels_like': round(data['main']['feels_like'], 1),
            'description': data['weather'][0]['description'].title(),
            'humidity': data['main']['humidity'],
            'wind_speed': round(data['wind']['speed'], 1),
            'pressure': data['main']['pressure'],
            'visibility': data.get('visibility', 0) / 1000,  # Convert to km
            'icon': data['weather'][0]['icon'],
            'temp_min': round(data['main']['temp_min'], 1),
            'temp_max': round(data['main']['temp_max'], 1),
            'sunrise': datetime.fromtimestamp(data['sys']['sunrise']).strftime('%H:%M'),
            'sunset': datetime.fromtimestamp(data['sys']['sunset']).strftime('%H:%M'),
            'error': None
        }
        
        return weather_data
        
    except requests.exceptions.RequestException as e:
        return {'error': 'Unable to fetch weather data. Please check your internet connection.'}
    except KeyError as e:
        return {'error': 'City not found. Please check the city name and try again.'}
    except Exception as e:
        return {'error': f'An unexpected error occurred: {str(e)}'}


def index(request):
    """Main view for weather application"""
    context = {
        'weather': None,
        'recent_searches': WeatherSearch.objects.all()[:5]
    }
    
    if request.method == 'POST':
        city = request.POST.get('city', '').strip()
        
        if city:
            weather_data = get_weather_data(city)
            
            if not weather_data.get('error'):
                # Save to database
                try:
                    WeatherSearch.objects.create(
                        city=weather_data['city'],
                        country=weather_data['country'],
                        temperature=weather_data['temperature'],
                        description=weather_data['description'],
                        humidity=weather_data['humidity'],
                        wind_speed=weather_data['wind_speed']
                    )
                except Exception as e:
                    print(f"Error saving to database: {e}")
                
                context['weather'] = weather_data
                context['recent_searches'] = WeatherSearch.objects.all()[:5]
            else:
                context['error'] = weather_data['error']
    
    return render(request, 'index.html', context)


def history(request):
    """View for weather search history"""
    searches = WeatherSearch.objects.all()[:20]
    context = {
        'searches': searches
    }
    return render(request, 'history.html', context)
