import RPi.GPIO as GPIO
import time
import random

# GPIO 설정
GPIO.setmode(GPIO.BCM)

# LED와 버튼 핀 설정
LED_PINS = {'blue':17, 'yello': 27}
BUTTON_PINS = {'blue': 5, 'yello': 6}
SCORE = 21

# LED와 버튼 핀 초기화
for pin in LED_PINS.values():
    GPIO.setup(pin, GPIO.OUT)
for pin in BUTTON_PINS.values():
    GPIO.setup(pin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

# 변수 설정
n_trials = 5  # 사용자가 연속으로 성공해야 하는 횟수
max_fails = 3  # 게임 자동 종료 전 최대 실패 횟수
reaction_time_limit = 3  # LED 켜진 상태로 반응을 기다리는 시간 (초)
debounce_time = 0.2  # 디바운싱 시간 (초)

# 게임 상태 변수
total_score = 0
successful_trials = 0
fail_count = 0

# 마지막 버튼 눌린 시간 저장 변수
last_pressed_time = time.time()

# 디바운싱 처리를 위한 함수
def button_pressed_with_debounce(button_pin, last_time, debounce_time=0.2):
    """버튼 눌림을 감지하고 디바운싱을 처리"""
    current_time = time.time()
    if current_time - last_time > debounce_time:  # debounce_time 이상 지난 후 눌린 버튼만 감지
        if GPIO.input(button_pin) == GPIO.HIGH:  # 버튼이 눌렸을 때
            return True, current_time
    return False, last_time

def light_random_led():
    color = random.choice(list(LED_PINS.keys()))
    GPIO.output(LED_PINS[color], GPIO.HIGH)
    return color

def clear_leds():
    for pin in LED_PINS.values():
        GPIO.output(pin, GPIO.LOW)

def reset_signal():
    for pin in LED_PINS.values():
        GPIO.output(pin, GPIO.HIGH)
    time.sleep(1)
    clear_leds()

try:
    while True:
        if fail_count >= max_fails:
            print("실격 처리되었습니다! 총 점수:", total_score)
            break

        clear_leds()
        color_to_press = light_random_led()
        start_time = time.time()
        pressed = False

        while time.time() - start_time < reaction_time_limit:
            # 버튼이 눌렸는지 확인하고, 디바운싱 처리
            button_pressed, last_pressed_time = button_pressed_with_debounce(BUTTON_PINS[color_to_press], last_pressed_time, debounce_time)
            
            if button_pressed:
                reaction_time = time.time() - start_time
                total_score += reaction_time
                print(f"{color_to_press} 버튼을 {reaction_time:.2f}초 만에 눌렀습니다.")
                successful_trials += 1
                pressed = True
                break

        clear_leds()

        if not pressed:
            fail_count += 1
            successful_trials = 0
            reset_signal()
            print("실패했습니다. 처음부터 다시 시작하세요.")
            
        time.sleep(1)

        if successful_trials == n_trials:
            print("축하합니다! 게임 종료. 최종 점수:", total_score)
            break

finally:
    clear_leds()
    GPIO.cleanup()