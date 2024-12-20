from django.db import models

# Create your models here.
class HighScore(models.Model):
    name = models.CharField(max_length=50)
    score = models.IntegerField()

    def __str__(self):
        return f"{self.name} - {self.score}"