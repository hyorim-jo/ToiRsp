from rest_framework import viewsets
from .models import HighScore
from .serializers import HighScoreSerializer

class HighScoreViewSet(viewsets.ModelViewSet):
    queryset = HighScore.objects.all()
    serializer_class = HighScoreSerializer
