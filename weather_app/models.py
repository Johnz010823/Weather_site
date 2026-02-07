from django.db import models

class WeatherSearch(models.Model):
    """Model to store weather search history"""
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100, blank=True)
    temperature = models.FloatField()
    description = models.CharField(max_length=200)
    humidity = models.IntegerField()
    wind_speed = models.FloatField()
    searched_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-searched_at']
        verbose_name_plural = "Weather Searches"

    def __str__(self):
        return f"{self.city} - {self.searched_at.strftime('%Y-%m-%d %H:%M')}"
