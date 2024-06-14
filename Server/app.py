from flask import Flask
from flask_cors import CORS
from routes.password import password_bp 

app = Flask(__name__)
CORS(app)

app.register_blueprint(password_bp, url_prefix='/password')

if __name__ == '__main__':
    app.run(debug=True)
