from datetime import date, timedelta

def calculate_streak(querysets):
    today=date.today()
    current_streak = 0
    for queryset in reversed(querysets):
        if queryset['date'] == today -timedelta(days=current_streak):
            current_streak += 1
        else:
            break
    return current_streak
