from flask import Flask
from flask_cors import CORS
from routes.feedback import feedback_bp
from routes.questions import questions_bp

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(feedback_bp)
app.register_blueprint(questions_bp)

if __name__ == '__main__':
    app.run(debug=True)
