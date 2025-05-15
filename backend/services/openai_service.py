from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def evaluate_response(question, user_response):
    prompt = f"""
You are simulating a behavioral interview for a software engineering role.

Question: {question}
Candidate's Answer:
\"\"\"{user_response}\"\"\"

Evaluate the response using the STAR method:
- Situation
- Task
- Action
- Result

For each part, rate clarity and completeness.
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
