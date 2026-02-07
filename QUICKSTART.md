# ⚡ Quick Start Guide - WeatherNow

Get up and running in 5 minutes!

## Prerequisites
✅ Python 3.8+ installed
✅ pip installed
✅ Text editor or PyCharm IDE

## Quick Setup (5 Steps)

### 1. Open Terminal/Command Prompt in project folder
```bash
cd weather_project
```

### 2. Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install django requests
```

### 4. Setup Database
```bash
python manage.py migrate
```

### 5. Run Server
```bash
python manage.py runserver
```

## 🎉 That's It!

Open browser: http://127.0.0.1:8000/

## Optional: Get Real Weather Data

1. Visit: https://openweathermap.org/api
2. Sign up (free)
3. Copy API key
4. Edit `weather_project/settings.py`
5. Replace: `OPENWEATHER_API_KEY = 'your_api_key_here'`

## Features to Try

✨ Search any city (e.g., "London", "Tokyo", "New York")
✨ View detailed weather info
✨ Check search history at /history/
✨ Access admin panel at /admin/ (create superuser first)

## Need Help?

📖 Read README.md for full documentation
🔧 Check SETUP_GUIDE.md for detailed instructions
❓ Search error messages online

---

**Built with Django - Professional Weather App**
