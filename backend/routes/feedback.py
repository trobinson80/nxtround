from flask import Blueprint, request, jsonify
from services.openai_service import evaluate_response

feedback_bp = Blueprint('feedback', __name__)

@feedback_bp.route('/feedback', methods=['POST'])
def get_feedback():
    try:
        data = request.json
        user_response = data.get("response", "")
        question = data.get("question", "")

        if not user_response:
            return jsonify({"error": "No response provided"}), 400

        feedback = evaluate_response(question, user_response)
        return jsonify({"feedback": feedback})

    except Exception as e:
        return jsonify({"error": f"Failed to generate feedback: {str(e)}"}), 500
