from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HighScoreViewSet

router = DefaultRouter()
router.register(r'highscores', HighScoreViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
