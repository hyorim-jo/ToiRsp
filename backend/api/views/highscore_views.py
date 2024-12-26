from api.models import HighScore  # 절대 경로로 수정
from api.serializers import HighScoreSerializer
from rest_framework import viewsets

class HighScoreViewSet(viewsets.ModelViewSet):
    queryset = HighScore.objects.all()
    serializer_class = HighScoreSerializer
