import json
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

For each part, return:
- response (string)
- clarity_score (integer 1–10)
- completeness_score (integer 1–10)

Also include:
- overall_score (e.g., "7 out of 10")
- feedback (summary of strengths and areas for improvement)

Respond in ONLY the following JSON format:
{{
  "situation": {{
    "response": "...",
    "clarity_score": ...,
    "completeness_score": ...
  }},
  "task": {{
    "response": "...",
    "clarity_score": ...,
    "completeness_score": ...
  }},
  "action": {{
    "response": "...",
    "clarity_score": ...,
    "completeness_score": ...
  }},
  "result": {{
    "response": "...",
    "clarity_score": ...,
    "completeness_score": ...
  }},
  "overall_score": "...",
  "feedback": "..."
}}
"""

    res = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a senior engineering interviewer."},
            {"role": "user", "content": prompt}
        ]
    )

    content = res.choices[0].message.content.strip()

    # Try parsing the content to make sure it’s valid JSON
    try:
        parsed_json = json.loads(content)
        return parsed_json
    except json.JSONDecodeError as e:
        raise ValueError(f"OpenAI response is not valid JSON:\n{content}\n\nError: {e}")
