from flask import Blueprint, jsonify
from utils.load_questions import get_random_question

questions_bp = Blueprint('questions', __name__)

@questions_bp.route('/question', methods=['GET'])
def get_question():
    try:
        question = get_random_question()
        return jsonify({"question": question})
    except Exception as e:
        return jsonify({"error": f"Failed to load question: {str(e)}"}), 500
