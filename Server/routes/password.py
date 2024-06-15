from flask import Blueprint, jsonify, request
from utils.password_generator import generate_password

password_bp = Blueprint('password', __name__)

@password_bp.route('/', methods=['GET'])
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

@password_bp.route('/keep-alive', methods=['GET'])
def keep_alive():
    return jsonify({'message': 'Server is alive'}), 200