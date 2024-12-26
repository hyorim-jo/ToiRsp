from django.http import JsonResponse
from api.models import HighScore

def get_high_scores(request):
    try:
        # 상위 10개의 점수를 오름차순으로 가져옴
        high_scores = HighScore.objects.order_by("score")[:10]
        data = [
            {"nickname": score.nickname, "score": float(score.score)}
            for score in high_scores
        ]
        return JsonResponse({"highscores": data})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
