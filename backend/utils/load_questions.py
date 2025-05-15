import json
import random

def get_random_question():
    with open("behavioral_questions.json", "r") as f:
        data = json.load(f)
        questions = data.get("behavioral_questions", [])
    return random.choice(questions)
