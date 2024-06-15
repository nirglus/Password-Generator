import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.password import password_bp
from utils import keep_alive 

load_dotenv()

app = Flask(__name__)
CORS(app)

app.register_blueprint(password_bp, url_prefix='/password')

if __name__ == '__main__':
    app.run(debug=True)
