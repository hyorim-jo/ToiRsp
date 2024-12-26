from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HighScoreViewSet, get_game_logs, get_high_scores

router = DefaultRouter()
router.register(r'highscores', HighScoreViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('game-logs/', get_game_logs, name='game-logs'),
    path("highscores/", get_high_scores, name="get-high-scores"),
]
