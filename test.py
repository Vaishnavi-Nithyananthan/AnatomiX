from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.json  # Parse JSON payload
    print("Received submission:", data)
    return jsonify({"message": "Webhook received!"}), 200

if __name__ == '__main__':
    app.run(port=5000)
