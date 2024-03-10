from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/gamepad', methods=['POST'])
def handle_gamepad_input():
    data = request.json  # This is the data sent from the client-side
    print(data)  # Prints the data to the terminal
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)
