from flask import Flask, jsonify, request
import string
import random

app = Flask(__name__)

def generate_password(length=12, use_special_chars=False):
    chars = string.ascii_letters + string.digits
    if use_special_chars:
        chars += string.punctuation
    password = ''.join(random.choice(chars) for _ in range(length))
    return password

@app.route('/', methods=['GET'])
def generate_password_route():
    try:
       length = int(request.args.get('length'))
    except (ValueError):
        return jsonify({'error': 'Length must be a number'}), 400
    use_special_chars_str = request.args.get('use_special_chars', '').lower()
    if use_special_chars_str == 'true':
        use_special_chars = True
    elif use_special_chars_str == 'false':
        use_special_chars = False
    else:
        return jsonify({'error': 'Invalid value for use_special_chars. Must be true or false'}), 400
    
    password = generate_password(length, use_special_chars)
    return jsonify({'password': password})

if __name__ == '__main__':
    app.run(debug=True)

