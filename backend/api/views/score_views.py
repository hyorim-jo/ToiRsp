from django.http import JsonResponse
from ..models import HighScore
import subprocess
import re  # 정규 표현식 모듈

def get_game_logs(request):
    try:
        # 닉네임 파라미터 확인
        nickname = request.GET.get("nickname")
        if not nickname:
            return JsonResponse({"error": "Nickname is required"}, status=400)

        # 라즈베리파이 스크립트 실행
        result = subprocess.run(
            ["python3", "../raspberry_game.py"],
            capture_output=True,
            text=True
        )

        # 스크립트 실행 결과 처리
        if result.returncode != 0:
            return JsonResponse({
                "error": "Script execution failed",
                "details": result.stderr
            }, status=500)

        # 로그 데이터를 줄 단위로 분리
        logs = result.stdout.strip().split("\n")

        # 최종 점수 추출 (정규 표현식으로 "최종 점수"를 찾음)
        score_line = next((line for line in logs if "최종 점수" in line), None)
        if score_line:
            match = re.search(r"최종 점수:\s*([\d\.]+)", score_line)
            if match:
                score = round(float(match.group(1)), 3)  # 점수를 소수 셋째 자리까지 반올림

                # 데이터베이스에 저장
                HighScore.objects.create(nickname=nickname, score=score)

                return JsonResponse({"score": score, "logs": logs})

        # 점수를 찾지 못한 경우
        return JsonResponse({
            "error": "Score not found in logs",
            "logs": logs
        }, status=500)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
