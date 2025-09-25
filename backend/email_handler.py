from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

EMAIL_FILE = "emails.txt"

@app.route('/subscribe', methods=['POST', 'OPTIONS'])
def subscribe():
    if request.method == 'OPTIONS':
        print(">>> OPTIONS запрос")
        return make_response("", 200)

    data = request.get_json()
    print(">>> Получены данные:", data)

    if not data:
        return jsonify({"error": "No data provided"}), 400

    email = data.get('email')
    print(">>> Email:", email)

    if not email or '@' not in email:
        return jsonify({"error": "Invalid email"}), 400

    try:
        directory = os.path.dirname(EMAIL_FILE) or "."
        os.makedirs(directory, exist_ok=True)

        with open(EMAIL_FILE, 'a') as f:
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            f.write(f"{timestamp} - {email}\n")

        print(">>> Email сохранён")
        return jsonify({"message": "Email saved successfully"}), 200

    except Exception as e:
        print(">>> Ошибка при сохранении:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # Allow port override via ENV; default 5001 per frontend expectation
    port = int(os.environ.get("PORT", 5001))
    host = os.environ.get("HOST", "0.0.0.0")
    debug = os.environ.get("FLASK_DEBUG", "1") == "1"
    print(f">>> Starting Flask on http://{host}:{port} (debug={debug})")
    app.run(host=host, port=port, debug=debug)