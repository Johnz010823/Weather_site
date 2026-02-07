# 🔧 Detailed Setup Guide for WeatherNow

This guide provides step-by-step instructions for setting up the WeatherNow Django application in PyCharm.

## Table of Contents
1. [PyCharm Setup](#pycharm-setup)
2. [Project Configuration](#project-configuration)
3. [Database Setup](#database-setup)
4. [API Configuration](#api-configuration)
5. [Running the Application](#running-the-application)
6. [Common Issues](#common-issues)

## PyCharm Setup

### Step 1: Open Project in PyCharm

1. Launch PyCharm
2. Click **File** → **Open**
3. Navigate to the `weather_project` folder
4. Click **OK**

### Step 2: Configure Python Interpreter

1. Go to **File** → **Settings** (Windows/Linux) or **PyCharm** → **Preferences** (macOS)
2. Navigate to **Project: weather_project** → **Python Interpreter**
3. Click the gear icon ⚙️ → **Add**
4. Select **Virtual Environment** → **New**
5. Choose location and base interpreter (Python 3.8+)
6. Click **OK**

### Step 3: Install Dependencies

#### Option A: Using PyCharm Terminal
1. Open Terminal in PyCharm (bottom panel)
2. Ensure virtual environment is activated (you should see `(venv)` in prompt)
3. Run:
```bash
pip install -r requirements.txt
```

#### Option B: Using PyCharm Package Manager
1. Go to **File** → **Settings** → **Python Interpreter**
2. Click the **+** button
3. Search for and install:
   - Django (version 4.2 or higher)
   - requests (version 2.31 or higher)

## Project Configuration

### Step 1: Verify Project Structure

Ensure your project has this structure:
```
weather_project/
├── manage.py
├── weather_project/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
└── weather_app/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── tests.py
    ├── urls.py
    ├── views.py
    ├── static/
    │   ├── css/
    │   │   └── style.css
    │   └── js/
    │       └── script.js
    └── templates/
        ├── base.html
        ├── index.html
        └── history.html
```

### Step 2: Configure Run Configuration

1. Click **Run** → **Edit Configurations**
2. Click **+** → **Django Server**
3. Configure:
   - **Name**: WeatherNow Server
   - **Host**: 127.0.0.1
   - **Port**: 8000
   - **Python interpreter**: Select your virtual environment
   - **Environment variables**: Leave default
4. Click **OK**

## Database Setup

### Step 1: Create Initial Migrations

In PyCharm Terminal, run:
```bash
python manage.py makemigrations
python manage.py migrate
```

**Expected Output:**
```
Migrations for 'weather_app':
  weather_app/migrations/0001_initial.py
    - Create model WeatherSearch
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions, weather_app
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  ...
  Applying weather_app.0001_initial... OK
```

### Step 2: Create Superuser (Optional)

For admin panel access:
```bash
python manage.py createsuperuser
```

Follow prompts:
- **Username**: admin (or your choice)
- **Email**: your-email@example.com
- **Password**: (enter secure password)
- **Password (again)**: (confirm password)

## API Configuration

### Step 1: Get OpenWeatherMap API Key

1. Visit: https://openweathermap.org/api
2. Click **Sign Up** (if new) or **Sign In**
3. Navigate to **API keys** tab
4. Copy your default API key or create new one

### Step 2: Add API Key to Settings

1. Open `weather_project/settings.py`
2. Scroll to bottom
3. Replace the API key:

```python
# Find this line
OPENWEATHER_API_KEY = 'your_api_key_here'

# Replace with
OPENWEATHER_API_KEY = 'YOUR_ACTUAL_API_KEY_FROM_OPENWEATHERMAP'
```

4. Save file (Ctrl+S or Cmd+S)

**Security Note**: For production, use environment variables instead:

```python
import os
OPENWEATHER_API_KEY = os.environ.get('OPENWEATHER_API_KEY', 'your_api_key_here')
```

## Running the Application

### Method 1: Using PyCharm Run Button

1. Click the green **Run** button (▶️) in top-right
2. Or press **Shift+F10** (Windows/Linux) or **Ctrl+R** (macOS)
3. Wait for server to start

**Console Output:**
```
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
February 07, 2024 - 12:00:00
Django version 4.2.x, using settings 'weather_project.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

### Method 2: Using Terminal

```bash
python manage.py runserver
```

### Step 2: Access Application

1. Open browser
2. Navigate to: http://127.0.0.1:8000/
3. You should see the WeatherNow homepage

### Step 3: Access Admin Panel

1. Navigate to: http://127.0.0.1:8000/admin/
2. Login with superuser credentials
3. Explore Weather Search records

## Testing the Application

### Test Weather Search

1. Enter a city name (e.g., "London")
2. Click **Get Weather**
3. Verify weather data displays correctly
4. Check that search appears in recent searches

### Test History Page

1. Click **History** in navigation
2. Verify your search appears in the table
3. Click **Back to Home** to return

### Run Automated Tests

In Terminal:
```bash
python manage.py test weather_app
```

**Expected Output:**
```
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
...
----------------------------------------------------------------------
Ran 3 tests in 0.XXXs

OK
Destroying test database for alias 'default'...
```

## Common Issues

### Issue 1: Port Already in Use

**Error:**
```
Error: That port is already in use.
```

**Solution:**
Use different port:
```bash
python manage.py runserver 8080
```

Or find and kill process on port 8000:
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID [PID_NUMBER] /F

# macOS/Linux
lsof -ti:8000 | xargs kill -9
```

### Issue 2: ModuleNotFoundError

**Error:**
```
ModuleNotFoundError: No module named 'django'
```

**Solution:**
1. Ensure virtual environment is activated
2. Reinstall dependencies:
```bash
pip install -r requirements.txt
```

### Issue 3: Database Errors

**Error:**
```
django.db.utils.OperationalError: no such table: weather_app_weathersearch
```

**Solution:**
Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

### Issue 4: Static Files Not Loading

**Error:**
CSS/JavaScript not working, styles missing

**Solution:**
1. Check `STATIC_URL` in `settings.py`
2. Ensure `{% load static %}` is in templates
3. For production, run:
```bash
python manage.py collectstatic
```

### Issue 5: API Not Working

**Error:**
"City not found" or no weather data

**Solution:**
1. Verify API key in `settings.py`
2. Check API key is active on OpenWeatherMap
3. Ensure internet connection is working
4. Check API rate limits (60 calls/minute free tier)

### Issue 6: CSRF Verification Failed

**Error:**
```
Forbidden (403): CSRF verification failed
```

**Solution:**
1. Ensure `{% csrf_token %}` is in forms
2. Check Django middleware settings
3. Clear browser cookies

## PyCharm Debugging

### Setting Breakpoints

1. Click left margin next to line number
2. Red dot appears
3. Run in Debug mode (Shift+F9)

### Viewing Variables

1. In Debug mode
2. Check **Variables** panel
3. Inspect object values

### Django Console

1. **Tools** → **Run manage.py Task**
2. Use Django management commands
3. Example: `makemigrations`, `migrate`, `createsuperuser`

## Production Deployment Checklist

Before deploying to production:

- [ ] Set `DEBUG = False` in settings.py
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Change `SECRET_KEY`
- [ ] Use environment variables for secrets
- [ ] Set up PostgreSQL or MySQL database
- [ ] Configure static files serving
- [ ] Set up HTTPS/SSL
- [ ] Implement proper logging
- [ ] Set up error monitoring
- [ ] Configure backup system
- [ ] Implement rate limiting

## Additional Resources

### Django Documentation
- Official Docs: https://docs.djangoproject.com/
- Tutorial: https://docs.djangoproject.com/en/4.2/intro/tutorial01/

### PyCharm Help
- Django Support: https://www.jetbrains.com/help/pycharm/django-support7.html
- Run/Debug: https://www.jetbrains.com/help/pycharm/running-and-debugging.html

### OpenWeatherMap
- API Docs: https://openweathermap.org/api
- Current Weather: https://openweathermap.org/current

## Getting Help

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review Django error messages carefully
3. Check PyCharm's Event Log (bottom-right)
4. Search Django documentation
5. Check Stack Overflow

## Next Steps

After successful setup:

1. Customize the UI in `style.css`
2. Add new features in `views.py`
3. Extend models in `models.py`
4. Create new templates
5. Add more comprehensive tests
6. Implement caching for API calls
7. Add weather forecasts feature
8. Implement user authentication

---

**Happy Coding! 🚀**
