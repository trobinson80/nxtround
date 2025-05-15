from openai import OpenAI
from dotenv import load_dotenv

# Load from .env file
load_dotenv()
import os
api_key = os.getenv("OPENAI_API_KEY")  # Ensure your .env has this key set

client = OpenAI(api_key=api_key)  # Pass key directly to client

def ask_initial_question():
    return "Tell me about a time you had to deal with a difficult bug under pressure."


def evaluate_response(response):
    prompt = f"""
You are simulating a behavioral interview for a software engineering role.
The candidate gave this answer to a behavioral question:

"{response}"

Evaluate the response using the STAR method:
- Situation
- Task
- Action
- Result

Rate clarity and completeness of each part.
Then give an overall score out of 10 and a summary of what could be improved.
"""

    res = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a senior engineering interviewer."},
            {"role": "user", "content": prompt}
        ]
    )

    return res.choices[0].message.content


def run_loop():
    print("🤖 Interview Bot: Let's begin.\n")

    question = ask_initial_question()
    print(f"💬 {question}\n")

    user_response = input("🧑 Your response: ")

    print("\n🧠 Feedback:\n")
    feedback = evaluate_response(user_response)
    print(feedback)


if __name__ == "__main__":
    run_loop()
