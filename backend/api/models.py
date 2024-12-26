from django.db import models

class HighScore(models.Model):
    nickname = models.CharField(max_length=50)
    score = models.DecimalField(max_digits=6, decimal_places=3)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["score"]  # 기본 정렬: score 오름차순
