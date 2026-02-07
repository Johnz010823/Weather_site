# 🌦️ WeatherNow - Professional Weather Application

A modern, fully-functional weather application built with Django framework featuring a professional UI design, real-time weather data, and search history functionality.

![Django](https://img.shields.io/badge/Django-4.2-green.svg)
![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ Features

### Core Features
- **Real-Time Weather Data**: Get current weather information for any city worldwide
- **Comprehensive Weather Metrics**: 
  - Current temperature with "feels like" temperature
  - Min/Max temperature
  - Humidity levels
  - Wind speed
  - Atmospheric pressure
  - Visibility
  - Sunrise and sunset times
- **Search History**: Track and view your previous weather searches
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Professional UI**: Modern, gradient-based design with smooth animations
- **Error Handling**: User-friendly error messages for invalid inputs

### Technical Features
- Django 4.2 framework
- SQLite database for search history
- OpenWeatherMap API integration
- RESTful architecture
- CSRF protection
- Admin panel integration
- Comprehensive test suite

## 🎨 UI Design Features

- **Modern Gradient Design**: Eye-catching purple gradient theme
- **Smooth Animations**: Fade-in, slide, and hover effects
- **Card-based Layout**: Clean, organized information display
- **Google Fonts**: Poppins and Outfit font families
- **Font Awesome Icons**: Professional iconography
- **Responsive Grid System**: Adapts to all screen sizes
- **Interactive Elements**: Hover effects and transitions

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- Virtual environment (recommended)
- OpenWeatherMap API key (free tier available)

## 🚀 Installation & Setup

### 1. Clone or Download the Project

```bash
# If using git
git clone <repository-url>
cd weather_project

# Or simply extract the downloaded folder
```

### 2. Create Virtual Environment (Recommended)

```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Get OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API keys section
4. Copy your API key

### 5. Configure API Key

Open `weather_project/settings.py` and update:

```python
# Replace 'your_api_key_here' with your actual API key
OPENWEATHER_API_KEY = 'your_actual_api_key_here'
```

**Note**: The app will work with sample data if you don't set an API key, but real-time data requires a valid key.

### 6. Run Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 7. Create Superuser (Optional - for Admin Access)

```bash
python manage.py createsuperuser
```

Follow the prompts to create admin credentials.

### 8. Run Development Server

```bash
python manage.py runserver
```

### 9. Access the Application

Open your browser and navigate to:
- **Main Application**: http://127.0.0.1:8000/
- **Admin Panel**: http://127.0.0.1:8000/admin/

## 📁 Project Structure

```
weather_project/
│
├── weather_project/          # Project configuration
│   ├── __init__.py
│   ├── settings.py          # Settings including API key
│   ├── urls.py              # Main URL configuration
│   ├── wsgi.py
│   └── asgi.py
│
├── weather_app/              # Main application
│   ├── migrations/          # Database migrations
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css    # Professional styling
│   │   ├── js/
│   │   │   └── script.js    # Interactive features
│   │   └── images/
│   ├── templates/
│   │   ├── base.html        # Base template
│   │   ├── index.html       # Home page
│   │   └── history.html     # Search history page
│   ├── __init__.py
│   ├── admin.py             # Admin configuration
│   ├── apps.py
│   ├── models.py            # Database models
│   ├── tests.py             # Test cases
│   ├── urls.py              # App URLs
│   └── views.py             # View logic
│
├── manage.py                # Django management script
├── requirements.txt         # Python dependencies
├── README.md               # This file
└── db.sqlite3              # Database (created after migration)
```

## 🎯 Usage Guide

### Searching for Weather

1. Enter a city name in the search box (e.g., "London", "Tokyo", "New York")
2. Click "Get Weather" or press Enter
3. View comprehensive weather information including:
   - Current temperature and conditions
   - Weather description and icon
   - Min/Max temperatures
   - Humidity, wind speed, and pressure
   - Visibility and sunrise/sunset times

### Viewing Search History

1. Click "History" in the navigation menu
2. Browse all your previous weather searches
3. View detailed information for each search including timestamp
4. Click "Back to Home" to return to the main page

### Admin Panel Features

1. Access admin panel at `/admin/`
2. Log in with superuser credentials
3. View and manage weather search records
4. Filter searches by date, city, or country
5. Export data for analysis

## 🧪 Running Tests

```bash
python manage.py test weather_app
```

This will run the test suite including:
- Page load tests
- Model creation tests
- Form validation tests

## 🎨 Customization

### Changing Color Scheme

Edit `weather_app/static/css/style.css` and modify the CSS variables:

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --secondary-color: #ec4899;    /* Secondary color */
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Modifying Layout

Edit the template files in `weather_app/templates/`:
- `base.html` - Overall layout and navigation
- `index.html` - Home page content
- `history.html` - History page layout

### Adding Features

1. Create new views in `views.py`
2. Add URL patterns in `urls.py`
3. Create corresponding templates
4. Update models if database changes needed

## 📊 API Reference

### OpenWeatherMap API

This app uses the OpenWeatherMap Current Weather Data API:
- **Endpoint**: `http://api.openweathermap.org/data/2.5/weather`
- **Method**: GET
- **Parameters**:
  - `q`: City name
  - `appid`: Your API key
  - `units`: metric (for Celsius)

**Free Tier Limits**:
- 60 calls/minute
- 1,000,000 calls/month

## 🔒 Security Considerations

### For Production Deployment:

1. **Change SECRET_KEY** in `settings.py`
2. **Set DEBUG = False**
3. **Configure ALLOWED_HOSTS** properly
4. **Use environment variables** for sensitive data:

```python
import os
SECRET_KEY = os.environ.get('SECRET_KEY')
OPENWEATHER_API_KEY = os.environ.get('OPENWEATHER_API_KEY')
```

5. **Use HTTPS** for production
6. **Set up proper database** (PostgreSQL recommended)
7. **Configure static files** for production
8. **Implement rate limiting** to prevent API abuse

## 🐛 Troubleshooting

### API Key Issues
- **Error**: "City not found"
  - **Solution**: Check city name spelling and API key validity
  
### Database Errors
- **Error**: "No such table"
  - **Solution**: Run `python manage.py migrate`

### Static Files Not Loading
- **Error**: CSS/JS not working
  - **Solution**: Run `python manage.py collectstatic` for production
  - Check `STATIC_URL` in settings.py

### Port Already in Use
- **Error**: "Port 8000 is already in use"
  - **Solution**: Use a different port: `python manage.py runserver 8080`

## 📱 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Django](https://www.djangoproject.com/) - Web framework
- [OpenWeatherMap](https://openweathermap.org/) - Weather data API
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact the development team
- Check documentation

## 🔄 Version History

### v1.0.0 (Initial Release)
- Real-time weather data fetching
- Search history functionality
- Professional UI design
- Responsive layout
- Admin panel integration
- Comprehensive error handling

## 🎓 Learning Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Python Documentation](https://docs.python.org/)
- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

**Built with ❤️ using Django Framework**

⭐ Star this repository if you find it helpful!
