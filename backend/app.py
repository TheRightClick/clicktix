from flask import Flask, jsonify, g, request, session
from dotenv import load_dotenv
from flask_cors import CORS
import os
import jwt
from functools import wraps
from flask_login import LoginManager, current_user
import models
from resources.dogs import dogs
from resources.users import users 
DEBUG=True 
PORT=8000

load_dotenv() 

app = Flask(__name__) 

app.secret_key = os.environ.get("APP_SECRET")

login_manager = LoginManager()

login_manager.init_app(app)


@login_manager.user_loader
def load_use(user_id):
    return models.Users.get(models.Users.id == user_id)





CORS(dogs, origins=['http://localhost:3000', 'http://localhost:3000/'], supports_credentials=True, url_prefix='api/v1/dogs') 

CORS(users, origins=['http://localhost:3000', 'http://localhost:3000/'], supports_credentials=True, url_prefix='/api/v1/users/')



@app.before_request
def before_request():
    """Connect to the database before each request."""
    session.permanent = True
    g.db = models.DATABASE
    g.db.connect()

@app.after_request
def after_request(response):
    """Close the database connection after each request."""
   
    g.db.close()
    return response

app.register_blueprint(dogs, url_prefix='/api/v1/dogs/') 

app.register_blueprint(users, url_prefix='/api/v1/users/' )


if __name__ == '__main__':
    models.initialize()
    app.run(debug=DEBUG, port=PORT)